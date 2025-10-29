'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { iconFacebookFill, iconWhatsAppLine, iconLinksLine } from '@/app/lib/utils/svg';
import { useRouter } from '@/i18n/navigation';
import { requestOtp, verifyOtp, submitRaffle } from '@/lib/kpr-api-client';

export default function KprIsMeRoadshow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
  });
  const [otpData, setOtpData] = useState(['', '', '', '', '', '']);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmittingRaffle, setIsSubmittingRaffle] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [finalFormData, setFinalFormData] = useState({
    nik: '',
    nomorHandphone: '',
    mengetahuiDari: '',
    temanTeman: [
      { nama: '', nomor: '' },
      { nama: '', nomor: '' },
      { nama: '', nomor: '' },
      { nama: '', nomor: '' },
      { nama: '', nomor: '' },
    ],
    setujuSyarat: false,
  });

  useEffect(() => {
    AOS.init({
      once: false,
      startEvent: 'DOMContentLoaded',
    });

    // Preload thank you page for faster navigation
    router.prefetch('/kpr-is-me-roadshow/thankyou');

    // Add paste event listeners to all OTP inputs
    const addPasteListeners = () => {
      for (let i = 0; i < 6; i++) {
        const input = document.getElementById(`otp-${i}`);
        if (input) {
          input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = (e as ClipboardEvent).clipboardData?.getData('text') || '';

            // Extract only numbers from pasted text
            const numbers = pastedData.replace(/\D/g, '');

            if (numbers.length >= 6) {
              // Take first 6 digits
              const otpDigits = numbers.slice(0, 6).split('');
              setOtpData(otpDigits);

              // Focus on the last input field
              const lastInput = document.getElementById(`otp-5`);
              lastInput?.focus();
            } else if (numbers.length > 0) {
              // If less than 6 digits, fill what we can
              setOtpData((prevData) => {
                const newOtpData = [...prevData];
                for (let j = 0; j < Math.min(numbers.length, 6); j++) {
                  newOtpData[j] = numbers[j];
                }
                return newOtpData;
              });

              // Focus on the next empty field or last filled field
              const nextIndex = Math.min(numbers.length, 5);
              const nextInput = document.getElementById(`otp-${nextIndex}`);
              nextInput?.focus();
            }
          });
        }
      }
    };

    // Add listeners initially and when component updates
    const timer = setTimeout(addPasteListeners, 100);

    return () => {
      clearTimeout(timer);
      // Clean up event listeners
      for (let i = 0; i < 6; i++) {
        const input = document.getElementById(`otp-${i}`);
        if (input) {
          input.removeEventListener('paste', () => {});
        }
      }
    };
  }, [router, currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpData = [...otpData];
      newOtpData[index] = value;
      setOtpData(newOtpData);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpData[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleFinalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFinalFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFinalFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTemanChange = (index: number, field: 'nama' | 'nomor', value: string) => {
    setFinalFormData((prev) => ({
      ...prev,
      temanTeman: prev.temanTeman.map((teman, i) => (i === index ? { ...teman, [field]: value } : teman)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      // Request OTP
      setIsLoadingOtp(true);
      setOtpError(null);

      try {
        const response = await requestOtp(formData.email);
        console.log('OTP Request Response:', response);

        // Proceed to OTP step
        setCurrentStep(2);
        alert('OTP telah dikirim ke email Anda!');
      } catch (error) {
        console.error('Failed to request OTP:', error);
        setOtpError('Gagal mengirim OTP. Silakan coba lagi.');
        alert('Gagal mengirim OTP. Silakan coba lagi.');
      } finally {
        setIsLoadingOtp(false);
      }
    } else if (currentStep === 2) {
      // Verify OTP
      setIsVerifyingOtp(true);
      setOtpError(null);

      try {
        const otpCode = otpData.join('');
        if (otpCode.length !== 6) {
          throw new Error('Kode OTP harus 6 digit');
        }

        const response = await verifyOtp(otpCode, formData.email);
        console.log('OTP Verify Response:', response);

        if (response.verifyOtp.status) {
          setCurrentStep(3);
          alert('OTP berhasil diverifikasi!');
        } else {
          throw new Error(response.verifyOtp.message || 'OTP tidak valid');
        }
      } catch (error) {
        console.error('Failed to verify OTP:', error);
        const errorMessage = error instanceof Error ? error.message : 'Gagal memverifikasi OTP. Silakan coba lagi.';
        setOtpError(errorMessage);
        alert(errorMessage);
      } finally {
        setIsVerifyingOtp(false);
      }
    } else {
      // Final submission - submit to raffle API
      setIsSubmittingRaffle(true);

      try {
        // Validate NIK before submission
        if (finalFormData.nik.length !== 16) {
          throw new Error(`NIK harus 16 digit. Saat ini: ${finalFormData.nik.length} digit`);
        }

        if (!/^\d{16}$/.test(finalFormData.nik)) {
          throw new Error('NIK harus berisi 16 angka saja');
        }

        // Prepare submission data according to API schema
        const submissionData = {
          name: formData.nama,
          email: formData.email,
          phone: finalFormData.nomorHandphone.startsWith('62')
            ? `+${finalFormData.nomorHandphone}`
            : `+62${finalFormData.nomorHandphone}`,
          nik: finalFormData.nik,
          source: finalFormData.mengetahuiDari,
          friends: finalFormData.temanTeman.map((teman) => ({
            name: teman.nama,
            phone: teman.nomor.startsWith('62') ? `+${teman.nomor}` : `+62${teman.nomor}`,
          })),
        };

        console.log('Submitting raffle data:', submissionData);

        const response = await submitRaffle(submissionData);
        console.log('Raffle submission response:', response);

        // Stop loading immediately after getting response
        setIsSubmittingRaffle(false);

        if (response.submitRaffle.status) {
          // Set redirecting state for immediate UI feedback
          setIsRedirecting(true);

          // Immediate redirect - don't wait for sessionStorage
          router.push('/kpr-is-me-roadshow/thankyou');

          // Store submission data asynchronously (non-blocking)
          try {
            sessionStorage.setItem(
              'raffleSubmission',
              JSON.stringify({
                serialNumber: response.submitRaffle.serialNumber,
                submitAt: response.submitRaffle.submitAt,
              }),
            );
          } catch (storageError) {
            // Ignore storage errors - don't block navigation
            console.warn('Failed to store submission data:', storageError);
          }
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        console.error('Failed to submit raffle:', error);
        const errorMessage = error instanceof Error ? error.message : 'Gagal mengirim formulir. Silakan coba lagi.';
        alert(errorMessage);
        setIsSubmittingRaffle(false); // Only set false on error since we already set it false on success
      }
      // Remove finally block since we handle loading state manually
    }
  };

  const resendOtp = async () => {
    setOtpData(['', '', '', '', '', '']);
    setOtpError(null);
    setIsLoadingOtp(true);

    try {
      const response = await requestOtp(formData.email);
      console.log('OTP Resend Response:', response);
      alert('OTP baru telah dikirim ke email Anda!');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setOtpError('Gagal mengirim ulang OTP. Silakan coba lagi.');
      alert('Gagal mengirim ulang OTP. Silakan coba lagi.');
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const shareToFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToWhatsapp = () => {
    const url = window.location.href;
    const text = 'KPR IS ME Roadshow - Raih kesempatan menang!';
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link berhasil disalin!');
  };

  return (
    <section className="w-full h-auto pt-[120px] md:pt-[150px] lg:pt-[170px] xl:pt-[223px] bg-backgroundWhite min-h-screen pb-20 md:pb-28 lg:pb-36">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="text-2xl md:text-4xl lg:text-[64px] lg:leading-[70px] text-center mb-8 md:mb-12 lg:mb-16 font-marcellus text-textPrimary uppercase"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
        >
          KPR IS ME ROADSHOW
        </h1>

        {/* Hero Image */}
        <div data-aos="fade-up" data-aos-duration="1200" className="w-full mb-8 md:mb-12 lg:mb-16">
          <div className="w-full bg-gray-200 rounded-sm overflow-hidden">
            {/* Placeholder untuk gambar horizontal */}
            <Image
              src="/assets/image/kpr-roadshow-banner.webp"
              alt="KPR IS ME Roadshow Banner"
              width={1200}
              height={400}
              className="w-full h-auto object-cover"
              onError={(e) => {
                // Fallback jika gambar tidak ada
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML =
                  '<div class="w-full h-[300px] bg-gradient-to-r from-green-900 to-green-700 flex items-center justify-center text-white text-2xl font-bold">KPR IS ME ROADSHOW</div>';
              }}
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-[132px]">
          {/* Left Column - Description */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="space-y-4 md:space-y-6 flex flex-col justify-start"
          >
            <div className="text-sm leading-relaxed text-textPrimary space-y-4">
              <p>
                Interdum malesuada pretium id morbi dolor. In et tincidunt vitae auctor mi cras. Sed lacus malesuada
                lacinia ac adipiscing massa vitae ultrices. Fermentum donec donec aenean congue non pellentesque nulla
                neque. Eleifend fringilla tempor laoreet eget.
              </p>
              <p>
                Semper enim lobortis faucibus sodales facilisis et viverra justo. Eget tristique nunc quis tellus diam.
                Libero egestas pellentesque ac tellus cras mattis egestas rhoncus ultrices. Sit aliquam id sit eleifend
                sit. Consectetur ac fermentum est egestas. Hac dictum mattis eu dui. Lectus pretium integer est leo
                rutrum adipiscing dignissim dignissim. Sodales pellentesque mi euismod egestas.
              </p>
              <p>
                Ut egestas natoque risus tortor duis auctor commodo eget vel. Eu pulvinar molestie dui integer egestas
                enim urna. Nulla vulputate viverra a integer nulla cursus vitae arcu. Eget blandit est pretium ac tempus
                eu amet dui proin. Pellentesque dignissim massa commodo amet. In sagittis tristique facilisis urna
                eleifend.
              </p>
            </div>

            {/* Social Share Icons */}
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 pt-4">
              <button
                onClick={shareToFacebook}
                className="transition-colors hover:opacity-70"
                style={{ color: 'hsla(180, 29%, 19%, 1)' }}
                aria-label="Share to Facebook"
              >
                <Image src={iconFacebookFill} alt="Facebook" width={24} height={24} className="w-6 h-6" />
              </button>
              <button
                onClick={shareToWhatsapp}
                className="transition-colors hover:opacity-70"
                style={{ color: 'hsla(180, 29%, 19%, 1)' }}
                aria-label="Share to WhatsApp"
              >
                <Image src={iconWhatsAppLine} alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
              </button>
              <button
                onClick={copyLink}
                className="transition-colors hover:opacity-70"
                style={{ color: 'hsla(180, 29%, 19%, 1)' }}
                aria-label="Copy Link"
              >
                <Image src={iconLinksLine} alt="Copy Link" width={24} height={24} className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Column - Form */}
          <div data-aos="fade-left" data-aos-duration="1200" className="flex justify-center lg:justify-start">
            <div className="w-full">
              <div
                className="bg-white shadow-lg py-8 px-4 md:py-10 md:px-6 lg:py-12 lg:px-8 xl:p-[60px] border-0 w-full"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  borderRadius: '0px',
                }}
              >
                <h2
                  className="text-left mb-6 md:mb-8 font-marcellus text-textPrimary uppercase"
                  style={{ fontSize: 'clamp(18px, 4vw, 24px)' }}
                >
                  ISI DAN RAIH KESEMPATAN MENANG!
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  {/* Step 1 & 2: Show form fields */}
                  {currentStep <= 2 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="nama" className="text-[10px] font-semibold text-gray-900">
                          NAMA LENGKAP
                        </Label>
                        <Input
                          id="nama"
                          name="nama"
                          type="text"
                          placeholder="Masukkan nama lengkap Anda"
                          value={formData.nama}
                          onChange={handleInputChange}
                          required
                          disabled={currentStep === 2}
                          style={{
                            backgroundColor: currentStep === 2 ? '#f5f5f5' : 'white',
                            borderColor: '#E1E1E1',
                            borderRadius: '0px',
                            fontSize: '12px',
                            paddingTop: '23px',
                            paddingBottom: '23px',
                          }}
                          className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] font-semibold text-gray-900">
                          EMAIL
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Masukkan email Anda"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={currentStep === 2}
                          style={{
                            backgroundColor: currentStep === 2 ? '#f5f5f5' : 'white',
                            borderColor: '#E1E1E1',
                            borderRadius: '0px',
                            fontSize: '12px',
                            paddingTop: '23px',
                            paddingBottom: '23px',
                          }}
                          className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                    </>
                  )}

                  {/* Step 3: Show user info */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      {/* User Info Display */}
                      <div className="space-y-3">
                        <div className="flex text-xs text-gray-900">
                          <span className="w-16 font-semibold">NAMA</span>
                          <span className="ml-4">{formData.nama}</span>
                        </div>
                        <div className="flex text-xs text-gray-900">
                          <span className="w-16 font-semibold">EMAIL</span>
                          <span className="ml-4">{formData.email}</span>
                        </div>
                      </div>

                      {/* Separator */}
                      <div className="h-px bg-gray-300" style={{ backgroundColor: 'hsla(0, 0%, 88%, 1)' }}></div>

                      {/* Personal Info Fields */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="nik" className="text-[10px] font-semibold text-gray-900">
                            NIK (16 DIGIT)
                          </Label>
                          <Input
                            id="nik"
                            name="nik"
                            type="text"
                            inputMode="numeric"
                            maxLength={16}
                            placeholder="Masukkan 16 digit NIK Anda"
                            value={finalFormData.nik}
                            onChange={(e) => {
                              // Only allow numbers
                              const value = e.target.value.replace(/\D/g, '');
                              handleFinalFormChange({
                                ...e,
                                target: { ...e.target, name: 'nik', value },
                              } as React.ChangeEvent<HTMLInputElement>);
                            }}
                            required
                            style={{
                              backgroundColor: 'white',
                              borderColor: '#E1E1E1',
                              borderRadius: '0px',
                              fontSize: '12px',
                              paddingTop: '23px',
                              paddingBottom: '23px',
                            }}
                            className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                          />
                          {finalFormData.nik && finalFormData.nik.length !== 16 && (
                            <p className="text-red-600 text-xs mt-1">
                              NIK harus 16 digit ({finalFormData.nik.length}/16)
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nomorHandphone" className="text-[10px] font-semibold text-gray-900">
                            NOMOR HANDPHONE
                          </Label>
                          <div className="relative w-full">
                            <span className="absolute flex inset-y-0 left-3 items-center text-black text-xs pointer-events-none">
                              +62
                            </span>
                            <Input
                              id="nomorHandphone"
                              name="nomorHandphone"
                              type="text"
                              placeholder="87654321"
                              value={finalFormData.nomorHandphone}
                              onChange={handleFinalFormChange}
                              required
                              style={{
                                backgroundColor: 'white',
                                borderColor: '#E1E1E1',
                                borderRadius: '0px',
                                fontSize: '12px',
                                paddingLeft: '40px',
                                paddingTop: '23px',
                                paddingBottom: '23px',
                                width: '100%',
                              }}
                              className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400 w-full"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mengetahuiDari" className="text-[10px] font-semibold text-gray-900">
                            DARI MANA ANDA TAHU TENTANG KAMI?
                          </Label>
                          <div className="relative">
                            <select
                              id="mengetahuiDari"
                              name="mengetahuiDari"
                              value={finalFormData.mengetahuiDari}
                              onChange={handleFinalFormChange}
                              required
                              style={{
                                backgroundColor: 'white',
                                borderColor: '#E1E1E1',
                                borderRadius: '0px',
                                fontSize: '12px',
                                paddingTop: '12px',
                                paddingBottom: '12px',
                                paddingLeft: '12px',
                                paddingRight: '40px',
                                width: '100%',
                                lineHeight: '22px',
                              }}
                              className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400 appearance-none bg-white"
                            >
                              <option value="">Pilih salah satu</option>
                              <option value="Instagram">Instagram</option>
                              <option value="Facebook">Facebook</option>
                              <option value="YouTube">YouTube</option>
                              <option value="Google">Google</option>
                              <option value="Teman/Keluarga">Teman/Keluarga</option>
                              <option value="Media Online">Media Online</option>
                              <option value="Media Cetak">Media Cetak</option>
                              <option value="Radio">Radio</option>
                              <option value="Televisi">Televisi</option>
                              <option value="Pameran/Event">Pameran/Event</option>
                              <option value="Brosur/Iklan">Brosur/Iklan</option>
                              <option value="Lainnya">Lainnya</option>
                            </select>
                            {/* Custom Arrow */}
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                              <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 1.5L6 6.5L11 1.5"
                                  stroke="#374151"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Separator */}
                      <div className="h-px bg-gray-300" style={{ backgroundColor: 'hsla(0, 0%, 88%, 1)' }}></div>

                      {/* Friends Section */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-gray-900 mb-6 lg:mb-10">
                          ISI LIMA (5) NOMOR HANDPHONE AKTIF TEMAN.
                        </h3>

                        {finalFormData.temanTeman.map((teman, index) => (
                          <div key={index} className="grid grid-cols-5 gap-3">
                            <div className="col-span-2 space-y-2">
                              <Label className="text-[10px] font-semibold text-gray-900">NAMA {index + 1}</Label>
                              <Input
                                type="text"
                                placeholder="Nama teman"
                                value={teman.nama}
                                onChange={(e) => handleTemanChange(index, 'nama', e.target.value)}
                                required
                                style={{
                                  backgroundColor: 'white',
                                  borderColor: '#E1E1E1',
                                  borderRadius: '0px',
                                  fontSize: '12px',
                                  paddingTop: '23px',
                                  paddingBottom: '23px',
                                }}
                                className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                              />
                            </div>
                            <div className="col-span-3 space-y-2">
                              <Label className="text-[10px] font-semibold text-gray-900">
                                NOMOR HANDPHONE {index + 1}
                              </Label>
                              <div className="relative">
                                <span className="absolute flex inset-y-0 left-3 items-center text-black text-xs pointer-events-none">
                                  +62
                                </span>
                                <Input
                                  type="text"
                                  placeholder="87654321"
                                  value={teman.nomor}
                                  onChange={(e) => handleTemanChange(index, 'nomor', e.target.value)}
                                  required
                                  style={{
                                    backgroundColor: 'white',
                                    borderColor: '#E1E1E1',
                                    borderRadius: '0px',
                                    fontSize: '12px',
                                    paddingLeft: '40px',
                                    paddingTop: '23px',
                                    paddingBottom: '23px',
                                  }}
                                  className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Separator */}
                      <div className="h-px bg-gray-300" style={{ backgroundColor: 'hsla(0, 0%, 88%, 1)' }}></div>

                      {/* Terms Checkbox */}
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="setujuSyarat"
                          checked={finalFormData.setujuSyarat}
                          onCheckedChange={(checked) =>
                            setFinalFormData((prev) => ({ ...prev, setujuSyarat: Boolean(checked) }))
                          }
                          required
                          className="bg-white border border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=checked]:text-white"
                          style={{
                            backgroundColor: finalFormData.setujuSyarat ? '#016241' : 'white',
                            borderColor: finalFormData.setujuSyarat ? '#016241' : '#E1E1E1',
                            color: finalFormData.setujuSyarat ? 'white' : 'transparent',
                          }}
                        />
                        <Label htmlFor="setujuSyarat" className="text-xs leading-relaxed text-gray-900">
                          Dengan mengirimkan formulir ini, Anda setuju bahwa data Anda digunakan untuk keperluan undian
                          dan pengumuman pemenang. Pemenang akan dipilih secara acak dan keputusan panitia bersifat
                          final. Data Anda akan dijaga kerahasiaannya.
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* OTP Step */}
                  {currentStep === 2 && (
                    <div className="space-y-2">
                      <Label className="text-[10px] font-semibold text-gray-900">
                        MASUKKAN OTP YANG DIKIRIM KE EMAIL ANDA
                      </Label>

                      {/* Error Message */}
                      {otpError && (
                        <div className="text-red-600 text-xs mb-2 px-2 py-1 bg-red-50 border border-red-200 rounded">
                          {otpError}
                        </div>
                      )}

                      {/* Desktop Layout - OTP fields and button on same line */}
                      <div className="hidden md:flex justify-between items-end">
                        {/* OTP Input Fields */}
                        <div className="flex items-center gap-6">
                          {/* First group of 3 */}
                          <div className="flex gap-2">
                            {otpData.slice(0, 3).map((digit, index) => (
                              <Input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                disabled={isVerifyingOtp}
                                style={{
                                  backgroundColor: isVerifyingOtp ? '#f5f5f5' : 'white',
                                  borderColor: '#E1E1E1',
                                  borderRadius: '0px',
                                  fontSize: '12px',
                                  paddingTop: '23px',
                                  paddingBottom: '23px',
                                  textAlign: 'center',
                                  width: '36px',
                                }}
                                className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                              />
                            ))}
                          </div>
                          {/* Second group of 3 */}
                          <div className="flex gap-2">
                            {otpData.slice(3, 6).map((digit, index) => (
                              <Input
                                key={index + 3}
                                id={`otp-${index + 3}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index + 3, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index + 3, e)}
                                disabled={isVerifyingOtp}
                                style={{
                                  backgroundColor: isVerifyingOtp ? '#f5f5f5' : 'white',
                                  borderColor: '#E1E1E1',
                                  borderRadius: '0px',
                                  fontSize: '12px',
                                  paddingTop: '23px',
                                  paddingBottom: '23px',
                                  textAlign: 'center',
                                  width: '36px',
                                }}
                                className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                              />
                            ))}
                          </div>
                        </div>
                        {/* Resend OTP Button - Desktop */}
                        <button
                          type="button"
                          onClick={resendOtp}
                          disabled={isLoadingOtp}
                          className="text-[10px] font-semibold underline whitespace-nowrap self-end disabled:opacity-50"
                          style={{ color: 'hsla(180, 29%, 19%, 1)' }}
                        >
                          {isLoadingOtp ? 'Mengirim...' : 'Kirim Ulang OTP'}
                        </button>
                      </div>

                      {/* Mobile Layout - OTP fields and button stacked */}
                      <div className="md:hidden space-y-4">
                        {/* OTP Input Fields */}
                        <div className="flex justify-center items-center gap-4">
                          {/* First group of 3 */}
                          <div className="flex gap-2">
                            {otpData.slice(0, 3).map((digit, index) => (
                              <Input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                disabled={isVerifyingOtp}
                                style={{
                                  backgroundColor: isVerifyingOtp ? '#f5f5f5' : 'white',
                                  borderColor: '#E1E1E1',
                                  borderRadius: '0px',
                                  fontSize: '12px',
                                  paddingTop: '23px',
                                  paddingBottom: '23px',
                                  textAlign: 'center',
                                  width: '36px',
                                }}
                                className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                              />
                            ))}
                          </div>
                          {/* Second group of 3 */}
                          <div className="flex gap-2">
                            {otpData.slice(3, 6).map((digit, index) => (
                              <Input
                                key={index + 3}
                                id={`otp-${index + 3}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index + 3, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index + 3, e)}
                                disabled={isVerifyingOtp}
                                style={{
                                  backgroundColor: isVerifyingOtp ? '#f5f5f5' : 'white',
                                  borderColor: '#E1E1E1',
                                  borderRadius: '0px',
                                  fontSize: '12px',
                                  paddingTop: '23px',
                                  paddingBottom: '23px',
                                  textAlign: 'center',
                                  width: '36px',
                                }}
                                className="text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                              />
                            ))}
                          </div>
                        </div>
                        {/* Resend OTP Button - Mobile */}
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={resendOtp}
                            disabled={isLoadingOtp}
                            className="text-[10px] font-semibold underline whitespace-nowrap disabled:opacity-50"
                            style={{ color: 'hsla(180, 29%, 19%, 1)' }}
                          >
                            {isLoadingOtp ? 'Mengirim...' : 'Kirim Ulang OTP'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 md:pt-4">
                    <Button
                      type="submit"
                      variant="filled"
                      disabled={
                        isLoadingOtp ||
                        isVerifyingOtp ||
                        isSubmittingRaffle ||
                        isRedirecting ||
                        (currentStep === 3 && finalFormData.nik.length !== 16)
                      }
                      className="w-full font-medium text-xs py-[24px] uppercase disabled:opacity-50"
                      style={{
                        borderRadius: '0px',
                        backgroundColor: '#016241',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      {currentStep === 1
                        ? isLoadingOtp
                          ? 'MENGIRIM OTP...'
                          : 'LANJUT VERIFIKASI EMAIL'
                        : currentStep === 2
                          ? isVerifyingOtp
                            ? 'MEMVERIFIKASI...'
                            : 'VERIFIKASI OTP'
                          : isSubmittingRaffle
                            ? 'MENGIRIM FORMULIR...'
                            : isRedirecting
                              ? 'BERHASIL! MENGARAHKAN...'
                              : 'SAYA MAU IKUT!'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
