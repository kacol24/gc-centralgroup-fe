'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaEnvelope } from 'react-icons/fa';
import { RiMapPin2Fill } from 'react-icons/ri';
import { IoLogoWhatsapp } from 'react-icons/io';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { imgLoadingMaps } from '@/app/lib/utils/image';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ContactForm from '@/graphql/ContactForm.graphql';
import { useMutation } from '@urql/next';

export default function Contact() {
  const MapContact = useMemo(
    () =>
      dynamic(() => import('./components/map-contact'), {
        loading: () => (
          <div className="w-full h-[127px] lg:h-[260px] p-0 lg:flex-grow mb-10 lg:mb-0 lg:pr-[75px]">
            <Image src={imgLoadingMaps} alt="Logo Property" unoptimized className="w-full h-full object-cover" />
          </div>
        ),
        ssr: false,
      }),
    [],
  );

  useEffect(() => {
    AOS.init({
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  const [, contactForm] = useMutation(ContactForm);

  const handleContactForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const res = await contactForm({
        name: name,
        phone: phone,
        email: email,
        message: message,
      });

      if (res.error) {
        const validationErrors = res.error.graphQLErrors?.[0]?.extensions?.validation;
        if (validationErrors) {
          const errors = {};
          for (const key in validationErrors) {
            const cleanKey = key.replace(/^input\./, '');
            const cleanMessages = validationErrors[key].map((msg) => msg.replace(/input\./g, ''));
            errors[cleanKey] = cleanMessages;
          }
          alert(Object.values(errors).flat().join('\n'));
          return;
        }
      }

      if (res?.data.contactForm?.status === 'CONTACT_FORM_SUBMITTED') {
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <section className="w-full h-auto pt-[170px] lg:pt-[223px] bg-backgroundWhite lg:pb-[90px] pb-0">
      <div className="container mx-auto px-4">
        <h1
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="text-4xl lg:px-0 px-6 lg:text-[64px] lg:leading-[70px] items-center justify-center text-center lg:mb-12 mb-8 font-marcellus text-textPrimary uppercase"
        >
          The Trusted Real <br className="block lg:hidden" /> Estate <br className="hidden lg:block" /> Authority{' '}
          <br className="block lg:hidden" /> For Those <br /> Seeking The Best.
        </h1>
        <p
          data-aos="zoom-in"
          data-aos-duration="1200"
          className="text-sm px-6 font-medium text-center text-textPrimary mb-[60px] lg:mb-20"
        >
          Thank you for visiting our site. As a dynamic digital platform, it will continuously update with new property{' '}
          <br className="hidden lg:block" />
          listings, sales outcomes, news articles, market trends and special Forbes event notifications. We encourage
          you to <br className="hidden lg:block" /> visit regularly to ensure you remain up to date with our ever
          changing sphere of influence.
        </p>
      </div>

      <div className="w-full relative lg:container lg:mx-auto lg:px-4 ">
        <div className="w-full px-8 py-12  lg:p-20 bg-[#192E2E] flex flex-col justify-start">
          <h3
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="text-2xl text-backgroundWhite tracking-wider font-marcellus uppercase"
          >
            Central Group Development
          </h3>
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="w-full xl:w-[55%] lg:flex items-start gap-28 mt-10"
          >
            <div className="text-white space-y-4">
              <div className="flex items-center gap-3">
                <Link href="https://wa.me/628117038868" target="_blank">
                  <IoLogoWhatsapp className="text-base text-textTertiary" />
                  <span>+62 811 703 8868</span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Link href="mailto:info@centralgroup.id" target="_blank">
                  <FaEnvelope className="text-base text-textTertiary" />
                  <span>info@centralgroup.id</span>
                </Link>
              </div>
            </div>

            {/* Work Address */}
            <div data-aos="zoom-in" data-aos-duration="1000" className="mt-6 md:mt-0 text-white space-y-4  ">
              <div>
                <div className="flex items-center gap-3">
                  <RiMapPin2Fill className="text-base text-textTertiary" />
                  <span className="font-bold">Central Group Head Office</span>
                </div>
                <p className="ml-8 opacity-80">
                  Jl. Central Raya No.1, Sukajadi, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29432
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <RiMapPin2Fill className="text-base text-textTertiary" />
                  <span className="font-bold">Representative Office</span>
                </div>
                <p className="ml-8 opacity-80">
                  Ruko Campton A-03, Jl. Raya Cisauk Lapan, Sampora, Tangerang - Banten 15345
                </p>
              </div>
            </div>
          </div>
        </div>
        <MapContact />

        <form onSubmit={handleContactForm}>
          <div className="w-full flex-col flex xl:hidden xl:flex-col ">
            <div className="p-12 bg-white shadow-xl rounded-sm">
              <h1 className="font-marcellus text-textPrimary text-2xl uppercase mb-8">GEt In touch</h1>

              <div className="space-y-4 mb-6">
                {/* Property Price */}
                <div data-aos="zoom-in" data-aos-duration="2000" className="space-y-2">
                  <Label htmlFor="property-price" className="text-[10px] font-semibold text-gray-900">
                    YOUR NAME
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      fontSize: '12px',
                      paddingTop: '23px',
                      paddingBottom: '23px',
                    }}
                    className=" text-gray-900"
                  />
                </div>

                <div data-aos="zoom-in" data-aos-duration="2000" className="space-y-2">
                  <Label htmlFor="down-payment" className="text-[10px] font-semibold text-gray-900">
                    NOMOR HANDPHONE
                  </Label>
                  <div className="relative">
                    <span className="absolute flex inset-y-0 left-3  items-center text-black text-[12px] pointer-events-none">
                      +62
                    </span>
                    <Input
                      id="phone"
                      placeholder="87654321"
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#E1E1E1',
                        borderRadius: '0px',
                        fontSize: '12px',
                        paddingLeft: '40px',
                        paddingTop: '23px',
                        paddingBottom: '23px',
                      }}
                      className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>

                <div data-aos="zoom-in" data-aos-duration="2000" className="space-y-2">
                  <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                    YOUR EMAIL
                  </Label>
                  <Input
                    id="email"
                    placeholder="Your Email"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      fontSize: '12px',
                      paddingTop: '23px',
                      paddingBottom: '23px',
                    }}
                    className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <div data-aos="zoom-in" data-aos-duration="2000" className="space-y-2">
                  <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                    YOUR MESSAGE
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your Message"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      fontSize: '12px',
                    }}
                    className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              <Button
                data-aos="zoom-in"
                data-aos-duration="1000"
                variant="filled"
                className="rounded-none w-full font-medium text-xs py-[24px] uppercase"
                type="submit"
              >
                Send Message
              </Button>
            </div>
          </div>
        </form>

        <form onSubmit={handleContactForm}>
          <div className="absolute top-1/2 -translate-y-[60%] right-20 hidden xl:block">
            <div className="w-[405px] hidden lg:flex lg:flex-col ">
              <div className="p-12 bg-white shadow-xl rounded-sm">
                <h1 className="font-marcellus text-textPrimary text-2xl uppercase mb-8">GEt In touch</h1>

                <div className="space-y-4 mb-6">
                  {/* Property Price */}
                  <div className="space-y-2">
                    <Label htmlFor="property-price" className="text-[10px] font-semibold text-gray-900">
                      YOUR NAME
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      name="name"
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#E1E1E1',
                        borderRadius: '0px',
                        fontSize: '12px',
                        paddingTop: '23px',
                        paddingBottom: '23px',
                      }}
                      className=" text-gray-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="down-payment" className="text-[10px] font-semibold text-gray-900">
                      NOMOR HANDPHONE
                    </Label>
                    <div className="relative">
                      <span className="absolute hidden lg:flex inset-y-0 left-3  items-center text-black text-[12px] pointer-events-none">
                        +62
                      </span>
                      <Input
                        id="phone"
                        placeholder="87654321"
                        name="phone"
                        style={{
                          backgroundColor: 'white',
                          borderColor: '#E1E1E1',
                          borderRadius: '0px',
                          fontSize: '12px',
                          paddingLeft: '40px',
                          paddingTop: '23px',
                          paddingBottom: '23px',
                        }}
                        className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                      YOUR EMAIL
                    </Label>
                    <Input
                      id="email"
                      placeholder="Your Email"
                      name="email"
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#E1E1E1',
                        borderRadius: '0px',
                        fontSize: '12px',
                        paddingTop: '23px',
                        paddingBottom: '23px',
                      }}
                      className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                      YOUR MESSAGE
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      name="message"
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#E1E1E1',
                        borderRadius: '0px',
                        fontSize: '12px',
                      }}
                      className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>

                <Button
                  variant="filled"
                  className="rounded-none w-full font-medium text-xs py-[24px] uppercase"
                  type="submit"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
