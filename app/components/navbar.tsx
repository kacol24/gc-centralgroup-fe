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
import { logoColGreen, logoColWhite } from '@/app/lib/utils/image';
import { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { developments } from '../lib/utils/developments';
import { usePathname, useSearchParams } from 'next/navigation';
import { central } from '../lib/utils/cental';

export default function Navbar() {
  const pathname = usePathname();
  const allowPath = ['/development', '/contact'];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const searchParams = useSearchParams();

  const nav = searchParams.get('nav') || 'fixed';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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

  const navbarStyle = () => {
    switch (nav) {
      case 'fixed':
        return 'bg-white shadow';
      case 'sticky':
        return 'fixed md:pt-[34px] px-8 lg:px-20 w-[100%] ';
      default:
        return 'bg-white shadow';
    }
  };

  const navbarContainerStyle = () => {
    switch (nav) {
      case 'fixed':
        return 'py-2 lg:py-4 text-black';
      case 'sticky':
        return 'bg-white py-2 lg:py-4 text-black shadow';
      default:
        return 'py-2 lg:py-4 text-black';
    }
  };

  const variantStyle = () => {
    if (allowPath.includes(pathname)) {
      return { text: 'text-black', logo: logoColGreen, iconMenu, iconWhatsApp, iconCaretDown };
    }
    return {
      text: 'text-white',
      logo: logoColWhite,
      iconMenu: iconMenuWhite,
      iconWhatsApp: iconWhatsAppWhite,
      iconCaretDown: iconCaretDownWhite,
    };
  };

  const menuStyle = (path: string) => {
    if (pathname === path) {
      return 'py-3 font-semibold cursor-pointer text-[18px]';
    } else {
      return 'py-3 font-aboreto text-textPrimary cursor-pointer text-[18px]';
    }
  };

  const subMenuStyle = (path: string) => {
    if (pathname === path) {
      return 'text-black font-semibold uppercase text-sm py-3 block';
    } else {
      return 'text-textPrimary font-medium uppercase text-sm py-3 block';
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`w-full fixed z-50 transition-all duration-300 ${isScrolled ? navbarStyle() : ''}`}>
        <div
          className={` w-full container mx-auto px-4   ${
            isScrolled ? navbarContainerStyle() : ` py-6 lg:py-8 bg-transparent ${variantStyle().text}`
          }`}
        >
          <div className="flex items-center">
            {/* Left Side */}
            <div className="flex-1 p-4 pl-0">
              <button onClick={() => setIsOpen(true)} className="flex items-center gap-3">
                <h1 className="hidden md:flex">MENU</h1>
                <Image src={isScrolled ? iconMenu : variantStyle().iconMenu} alt="Menu Icon" height={24} width={24} />
              </button>
            </div>

            {/* Center Side (Logo) */}
            <div>
              <Link href={'/'}>
                <Image
                  className="w-[90px] md:w-[100px]"
                  src={isScrolled ? logoColGreen : variantStyle().logo}
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
                <Image
                  src={isScrolled ? iconWhatsApp : variantStyle().iconWhatsApp}
                  alt="WhatsApp Icon"
                  width={24}
                  height={24}
                />
              </a>

              <div className="w-px h-6 bg-gray-400"></div>

              <div className="flex items-center gap-1 cursor-pointer">
                <span>EN</span>
                <Image
                  src={isScrolled ? iconCaretDown : variantStyle().iconCaretDown}
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
        <ul className="pl-16 pt-4 text-textPrimary">
          {/* DEVELOPMENT */}
          <li>
            <div
              className="py-3 font-aboreto text-textPrimary flex justify-start gap-2 items-center cursor-pointer text-[18px]"
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
            </div>
          </li>
          {openMenus['development'] && (
            <ul className="pl-4  ">
              {developments.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/development/${item.slug}`}
                    className={subMenuStyle(`/development/${item.slug}`)}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* ABOUT US */}
          <li>
            <Link href="/about" className={menuStyle('/about')} onClick={() => setIsOpen(false)}>
              ABOUT US
            </Link>
          </li>

          {/* COMMUNITY ECOSYSTEM */}
          <li>
            <div
              className="py-3 font-aboreto text-textPrimary flex justify-start items-center gap-2 cursor-pointer text-[18px]"
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
            </div>
          </li>
          {openMenus['community'] && (
            <ul className="pl-4">
              {central.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/central/${item.slug}`}
                    className={subMenuStyle(`/central/${item.slug}`)}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.bannerTitle}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <li>
            <div className="py-3 font-aboreto text-textPrimary cursor-pointer text-[18px]">NEWS & UPDATE</div>
          </li>
          <li>
            <Link href="/career" className={menuStyle('/career')} onClick={() => setIsOpen(false)}>
              CAREERS
            </Link>
          </li>
          <li>
            <Link href="/contact" className={menuStyle('/contact')} onClick={() => setIsOpen(false)}>
              <div className="py-3 font-aboreto text-textPrimary cursor-pointer text-[18px]">ENQUIRE</div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
