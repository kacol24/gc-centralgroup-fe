'use client';

import Image from 'next/image';
import { logoRowWhite, logoColWhite, logo36white } from '../lib/utils/image';
import { HiOutlineArrowUp, HiOutlineArrowRight } from 'react-icons/hi';
import { FaEnvelope, FaMapMarkerAlt, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaXTwitter } from 'react-icons/fa6';
import Subscribe from '@/graphql/Subscribe.graphql';
import { useMutation } from '@urql/next';

export default function Footer({ store }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [, subscribe] = useMutation(Subscribe);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    try {
      const res = await subscribe({
        email: email,
      });

      if (res?.data?.subscribe?.status === 'error') {
        alert(res?.data?.subscribe?.message || 'Error subscribing. Please try again.');
      }

      if (res?.data?.subscribe?.status === 'success') {
        alert(res?.data?.subscribe?.message || 'Thank you for subscribing.');
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting subscribe:', error);
    }
  };

  return (
    <footer className="w-full bg-primary text-sm">
      <div className="container mx-auto px-4 ">
        <div className="flex w-full flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-8 py-14 lg:py-[72px]">
          {/* Logo & Scroll Up */}
          <div className="flex md:max-w-[200px] md:flex-1 justify-between items-center mb-6">
            {/* Logo for Mobile */}
            <Image
              src={logoRowWhite}
              alt="Logo"
              width={100}
              height={100}
              unoptimized={true}
              className="object-contain md:hidden w-[120px]"
            />
            <Image
              src={logo36white}
              alt="Logo"
              width={100}
              height={100}
              unoptimized={true}
              className="object-contain md:hidden w-[120px]"
            />

            {/* Desktop logos (stacked vertically) */}
            <div className="hidden md:flex flex-col items-center">
              <Image
                src={logoColWhite}
                alt="Logo"
                width={1000}
                height={1000}
                className="object-contain w-[130px] mb-5"
                unoptimized={true}
              />
              <Image
                src={logo36white}
                alt="Logo"
                width={1000}
                height={1000}
                className="object-contain w-[130px]"
                unoptimized={true}
              />
            </div>

            {/* Scroll icon for mobile */}
            <HiOutlineArrowUp onClick={scrollToTop} className="text-white text-3xl cursor-pointer mt-2 md:hidden" />
          </div>

          {/* Contact */}
          <div className="text-white space-y-4 md:flex-[0.9] ">
            <div className="flex items-center gap-3">
              <IoLogoWhatsapp size="14" className="text-xl opacity-60" />
              <span>
                <a href={`https://wa.me/628117038868`} target="_blank">
                  +62 811 703 8868
                </a>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope size="14" className="text-xl opacity-60" />
              <span>
                {store?.contact_email && (
                  <a href={`mailto:${store.contact_email}`} target="_blank">
                    {store.contact_email}
                  </a>
                )}
              </span>
            </div>
          </div>

          {/* Work Address */}
          <div className=" text-white space-y-4 md:flex-[1.1] ">
            <div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-lg opacity-60" size="14px" />
                <span className="font-bold leading-[25.2px]">Central Group Head Office</span>
              </div>
              <div className="ml-7  opacity-80 leading-[25.2px]">
                Jl. Central Raya No.1,
                <br className="hidden lg:block" /> Sukajadi, Kec. Batam Kota,
                <br className="hidden lg:block" /> Kota Batam, Kepulauan Riau 29432
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-lg opacity-60" size="14px" />
                <span className="font-bold leading-[25.2px]">Representative Office</span>
              </div>
              <p className="ml-7 opacity-80 leading-[25.2px]">
                Ruko Campton A-03,
                <br className="hidden lg:block" /> Jl. Raya Cisauk Lapan, Sampora,
                <br className="hidden lg:block" /> Tangerang - Banten 15345
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe}>
            <div className="mt-8 md:mt-0 w-full md:flex-1 ">
              <h3 className="text-white text-lg font-marcellus mb-4 tracking-wider">NEWSLETTER</h3>
              <div className="flex  rounded-lg overflow-hidden border border-[rgba(0,0,0,0.04)]">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type your email"
                  className="w-full px-4 py-4  bg-black/10  text-[#FAFAFA80] outline-none"
                  required
                />
                <button
                  className="bg-black/10 text-sm tracking-wider  text-white px-5 py-4 flex items-center gap-2"
                  type="submit"
                >
                  SUBMIT <HiOutlineArrowRight />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col pb-6 md:flex-row md:flex-wrap md:items-center w-full">
          {/* Social Media */}
          <div className="flex justify-center gap-8 text-white text-2xl md:order-3 md:ml-auto">
            {store?.fb_account && (
              <a href={store.fb_account} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            )}
            {store?.tw_account && (
              <a href={store.tw_account} target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
            )}
            {store?.ig_account && (
              <a href={store.ig_account} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
            {store?.youtube_account && (
              <a href={store.youtube_account} target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="border-t  w-full flex-none  border-white my-6 md:mt-0 opacity-20 md:order-1" />

          {/* Copyright */}
          <p className="text-white  opacity-70 text-sm  text-center md:order-2">© 2025 Central Group Development</p>
        </div>
      </div>
    </footer>
  );
}
