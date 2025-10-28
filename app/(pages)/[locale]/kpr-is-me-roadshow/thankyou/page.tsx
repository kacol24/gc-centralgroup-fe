'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { iconFacebookFill, iconWhatsAppLine, iconLinksLine } from '@/app/lib/utils/svg';
import { useRouter } from '@/i18n/routing';

export default function KprIsMeRoadshowThankYou() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  const shareToFacebook = () => {
    const url = window.location.href.replace('/thankyou', '');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToWhatsapp = () => {
    const url = window.location.href.replace('/thankyou', '');
    const text = 'KPR IS ME Roadshow - Raih kesempatan menang!';
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const copyLink = () => {
    const url = window.location.href.replace('/thankyou', '');
    navigator.clipboard.writeText(url);
    alert('Link berhasil disalin!');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <section className="w-full h-auto pt-[140px] md:pt-[160px] lg:pt-[180px] bg-white min-h-screen pb-[164px]">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Success Image */}
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="w-full max-w-[120px] md:max-w-[160px] lg:max-w-[200px]"
        >
          <Image
            src="/assets/image/success-icon.webp"
            alt="Pendaftaran Berhasil"
            width={200}
            height={200}
            className="w-full h-auto object-contain"
            onError={(e) => {
              // Fallback jika gambar tidak ada
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML =
                '<div class="w-full aspect-square bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center text-white text-4xl md:text-5xl lg:text-6xl font-bold rounded-full">✓</div>';
            }}
          />
        </div>

        {/* Title */}
        <h1
          data-aos="fade-up"
          data-aos-duration="1200"
          className="text-[24px] md:text-[28px] lg:text-[36px] leading-tight text-center mt-[32px] md:mt-[40px] lg:mt-[56px] font-marcellus text-textPrimary uppercase"
        >
          Pendaftaran Berhasil
        </h1>

        {/* Description */}
        <p
          data-aos="fade-up"
          data-aos-duration="1400"
          className="text-[13px] md:text-[14px] leading-relaxed text-center mt-[20px] md:mt-[24px] lg:mt-[32px] text-textPrimary max-w-[320px] md:max-w-[480px] lg:max-w-[624px] px-4"
        >
          Selamat, nama Anda sudah masuk ke daftar peserta undian. <strong>Cek Email</strong> Anda untuk mendapatkan
          Bukti Pendaftaran-nya.
        </p>

        {/* Back to Home Button */}
        <div data-aos="fade-up" data-aos-duration="1600" className="mt-[32px] md:mt-[40px] lg:mt-[48px]">
          <Button
            onClick={handleBackToHome}
            variant="filled"
            className="font-medium text-xs py-[20px] md:py-[24px] px-6 md:px-8 uppercase text-[12px] md:text-[14px]"
            style={{
              borderRadius: '0px',
              backgroundColor: '#016241',
              fontWeight: '600',
            }}
          >
            Kembali Ke Home
          </Button>
        </div>

        {/* Share Section */}
        <div
          data-aos="fade-up"
          data-aos-duration="1800"
          className="mt-[36px] md:mt-[44px] lg:mt-[52px] flex flex-col md:flex-row items-center gap-4 md:gap-6"
        >
          {/* Share Text */}
          <span className="text-[11px] md:text-[12px] font-semibold text-textPrimary uppercase">AJAK TEMAN</span>

          {/* Social Share Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={shareToFacebook}
              className="transition-colors hover:opacity-70"
              style={{ color: 'hsla(180, 29%, 19%, 1)' }}
              aria-label="Share to Facebook"
            >
              <Image src={iconFacebookFill} alt="Facebook" width={20} height={20} className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={shareToWhatsapp}
              className="transition-colors hover:opacity-70"
              style={{ color: 'hsla(180, 29%, 19%, 1)' }}
              aria-label="Share to WhatsApp"
            >
              <Image src={iconWhatsAppLine} alt="WhatsApp" width={20} height={20} className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={copyLink}
              className="transition-colors hover:opacity-70"
              style={{ color: 'hsla(180, 29%, 19%, 1)' }}
              aria-label="Copy Link"
            >
              <Image src={iconLinksLine} alt="Copy Link" width={20} height={20} className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
