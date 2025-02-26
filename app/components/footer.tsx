'use client';

import Image from 'next/image';
import { logoRowWhite, logoColWhite } from '../lib/utils/image';
import { HiOutlineArrowUp, HiOutlineArrowRight } from 'react-icons/hi';
import { FaEnvelope, FaMapMarkerAlt, FaYoutube, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              width={1000}
              height={1000}
              unoptimized={true}
              className="object-contain md:hidden w-[160px]"
            />
            {/* Logo for Desktop */}
            <Image
              src={logoColWhite}
              alt="Logo"
              width={1000}
              height={1000}
              className="object-contain hidden md:block w-[130px]"
              unoptimized={true}
            />{' '}
            <HiOutlineArrowUp onClick={scrollToTop} className="text-white text-3xl cursor-pointer mt-2 md:hidden" />
          </div>

          {/* Contact */}
          <div className="text-white space-y-4 md:flex-1 ">
            <div className="flex items-center gap-3">
              <IoLogoWhatsapp size="14" className="text-xl opacity-60" />
              <span>+62 811 703 8868</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope size="14" className="text-xl opacity-60" />
              <span>info@centralgroup.com</span>
            </div>
          </div>

          {/* Work Address */}
          <div className="mt-6 md:mt-0 text-white space-y-4 md:flex-1 ">
            <div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-lg opacity-60" size="14px" />
                <span className="font-bold leading-[25.2px]">Central Group Head Office</span>
              </div>
              <p className="ml-7 opacity-80 leading-[25.2px]">
                Jl. Central Raya No.1, Sukajadi, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29432
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-lg opacity-60" size="14px" />
                <span className="font-bold leading-[25.2px]">Representative Office</span>
              </div>
              <p className="ml-7 opacity-80 leading-[25.2px]">
                Ruko Campton A-03, Jl. Raya Cisauk Lapan, Sampora, Tangerang - Banten 15345
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-8 md:mt-0 w-full md:flex-1 ">
            <h3 className="text-white text-lg font-marcellus mb-4 tracking-wider">NEWSLETTER</h3>
            <div className="flex  rounded-lg overflow-hidden border border-[rgba(0,0,0,0.04)]">
              <input
                type="email"
                placeholder="Type your email"
                className="w-full px-4 py-4  bg-black bg-opacity-5 text-[#FAFAFA80] outline-none"
              />
              <button className="bg-black bg-opacity-5 text-sm tracking-wider  text-white px-5 py-4 flex items-center gap-2">
                SUBMIT <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col pb-6 md:flex-row md:flex-wrap md:items-center w-full">
          {/* Social Media */}
          <div className="flex justify-center gap-8 text-white text-2xl md:order-3 md:ml-auto">
            <FaYoutube />
            <FaLinkedinIn />
            <FaInstagram />
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
