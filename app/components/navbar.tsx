'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  iconWhatsApp,
  iconCaretDown,
  iconMenu,
  iconWhatsAppWhite,
  iconCaretDownWhite,
  iconMenuWhite,
} from '@/app/lib/utils/svg';
import { logoRowGreen, logoColWhite } from '@/app/lib/utils/image';
import { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = (menuKey: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`w-full fixed z-50 transition-all duration-300 ${
          isScrolled ? 'pt-[34px] px-8 lg:px-20 w-[100%]' : ''
        }`}
      >
        <div
          className={`flex w-full items-center ${
            isScrolled
              ? 'bg-white px-8 py-2 lg:px-12 lg:py-4 text-black'
              : 'px-8 lg:px-20 py-6 lg:py-8 bg-transparent text-white'
          }`}
        >
          {/* Left Side */}
          <div className="flex-1 p-4 pl-0">
            <button onClick={() => setIsOpen(true)} className="flex items-center gap-3">
              <h1 className="hidden md:flex">MENU</h1>
              <Image src={isScrolled ? iconMenu : iconMenuWhite} alt="Menu Icon" height={24} width={24} />
            </button>
          </div>

          {/* Center Side (Logo) */}
          <div>
            <Link href={'/'}>
              <Image
                className="w-[90px] md:w-[150px]"
                src={isScrolled ? logoRowGreen : logoColWhite}
                alt="CG Logo"
                height={1000}
                width={1000}
                unoptimized={true}
              />
            </Link>
          </div>

          {/* Right Side */}
          <div className="md:flex-1 hidden md:flex justify-end items-center gap-6 p-4 pr-0">
            <a href="https://wa.me/6287835712129" target="_blank" rel="noopener noreferrer">
              <Image src={isScrolled ? iconWhatsApp : iconWhatsAppWhite} alt="WhatsApp Icon" width={24} height={24} />
            </a>

            <div className="w-px h-6 bg-gray-400"></div>

            <div className="flex items-center gap-1 cursor-pointer">
              <span>EN</span>
              <Image
                src={isScrolled ? iconCaretDown : iconCaretDownWhite}
                alt="Caret Down Icon"
                width={16}
                height={16}
              />
            </div>

            <div className="w-px h-6 bg-gray-400"></div>

            <button className="uppercase font-medium tracking-wide ">Enquire</button>
          </div>

          <div className="flex-1 md:hidden justify-end items-center gap-6"></div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[380px] bg-white shadow-lg transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Button CLOSE */}
        <div className="flex justify-start items-center p-8">
          <button onClick={() => setIsOpen(false)} className="text-sm uppercase underline text-textPrimary">
            Close
          </button>

          <IoCloseOutline className="cursor-pointer text-xl text-textPrimary ml-2" onClick={() => setIsOpen(false)} />
        </div>

        {/* Menu List */}
        <ul className="pl-16 pt-4 space-y-6 text-textPrimary">
          {/* DEVELOPMENT */}
          <li
            className="font-aboreto text-textPrimary flex justify-start gap-2 items-center cursor-pointer text-[18px]"
            onClick={() => toggleMenu('development')}
          >
            DEVELOPMENT
            <span>
              <Image
                src={iconCaretDown}
                alt="Caret Down Icon"
                width={16}
                height={16}
                className={`transform transition-transform ${openMenus['development'] ? 'rotate-180' : 'rotate-0'}`}
              />
            </span>
          </li>
          {openMenus['development'] && (
            <ul className="pl-4 space-y-6 text-textPrimary font-medium uppercase text-sm">
              <li>Serenity Central City</li>
              <li>The Icon</li>
              <li>Central Tiban</li>
              <li>Central Raya Batu Aji</li>
              <li>Central Batu Aji</li>
              <li>Central Laguna Hills</li>
              <li>Central Raja Tiban</li>
              <li>Central Hills</li>
              <li>Perumahan Barelang</li>
            </ul>
          )}

          {/* ABOUT US */}
          <li className="font-semibold cursor-pointer text-[18px]">
            <a href="/about">ABOUT US</a>
          </li>

          {/* COMMUNITY ECOSYSTEM */}
          <li
            className="font-aboreto text-textPrimary flex justify-start items-center gap-2 cursor-pointer text-[18px]"
            onClick={() => toggleMenu('community')}
          >
            COMMUNITY ECOSYSTEM
            <span>
              <Image
                src={iconCaretDown}
                alt="Caret Down Icon"
                width={16}
                height={16}
                className={`transform transition-transform ${openMenus['community'] ? 'rotate-180' : 'rotate-0'}`}
              />
            </span>
          </li>
          {openMenus['community'] && (
            <ul className="pl-4 space-y-6 text-textPrimary font-medium uppercase text-sm">
              <li>
                <a href="/central/berbagi">Central Berbagi</a>
              </li>
              <li>
                <a href="/central/property-academy">Central Property Academy</a>
              </li>
              <li>
                <a href="/central/connect">Central Connect</a>
              </li>
              <li>
                <a href="/central/home">Central Home</a>
              </li>
            </ul>
          )}

          <li className="font-aboreto text-textPrimary cursor-pointer text-[18px]">NEWS & UPDATE</li>
          <li className="font-aboreto text-textPrimary cursor-pointer text-[18px] ">CAREERS</li>
          <li className="font-aboreto text-textPrimary cursor-pointer text-[18px]">ENQUIRE</li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
