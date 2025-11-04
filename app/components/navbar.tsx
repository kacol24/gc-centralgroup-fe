'use client';

import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import {
  iconWhatsApp,
  iconCaretDown,
  iconMenu,
  iconWhatsAppWhite,
  iconCaretDownWhite,
  iconMenuWhite,
} from '@/app/lib/utils/svg';
import { logoColGreen, logoColWhite, logoRowGreen, logo35white, logo35color } from '@/app/lib/utils/image';
import { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';
import { central } from '../lib/utils/cental';
import { useQuery } from '@urql/next';
import ProjectListQuery from '@/graphql/ProjectListQuery.graphql';
import { useLocale } from 'next-intl';
import LocaleSwitcher from '@/app/components/LocaleSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const locale = useLocale();

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
        return 'py-2 lg:py-2 text-black';
      case 'sticky':
        return 'bg-white py-2 lg:py-2 text-black shadow';
      default:
        return 'py-2 lg:py-2 text-black';
    }
  };

  const navbarElseStyle = () => {
    if (pathname.includes('/article')) {
      return 'bg-white shadow';
    }
  };

  const [variant, setVariant] = useState({
    text: 'text-white',
    logo: logoColWhite,
    logo2: logo35white,
    iconMenu: iconMenuWhite,
    iconWhatsApp: iconWhatsAppWhite,
    iconCaretDown: iconCaretDownWhite,
  });

  useEffect(() => {
    const allowPath = ['/development', '/contact', '/search', '/kprismeroadshow', '/kprismeroadshow/thankyou'];

    const handleResize = () => {
      const isMobile = window.innerWidth <= 1024;
      const isArticleDetailPath = pathname.includes('/article/');
      const isArticlePath = pathname.includes('/article');

      if (
        allowPath.includes(pathname) ||
        (isArticleDetailPath && isMobile) ||
        (isArticlePath && !isMobile) ||
        (isArticlePath && isMobile)
      ) {
        setVariant({
          text: 'text-black',
          logo: logoColGreen,
          logo2: logo35color,
          iconMenu,
          iconWhatsApp,
          iconCaretDown,
        });
      } else {
        setVariant({
          text: 'text-white',
          logo: logoColWhite,
          logo2: logo35white,
          iconMenu: iconMenuWhite,
          iconWhatsApp: iconWhatsAppWhite,
          iconCaretDown: iconCaretDownWhite,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname]);

  const menuStyle = (path: string) => {
    if (pathname === path) {
      return 'py-3 font-semibold cursor-pointer text-[18px]';
    } else {
      return 'py-3 font-marcellus text-textPrimary cursor-pointer text-[18px]';
    }
  };

  const subMenuStyle = (path: string) => {
    if (pathname === path) {
      return 'text-black font-semibold uppercase text-xs py-3 block';
    } else {
      return 'text-textPrimary font-medium uppercase text-xs py-3 block';
    }
  };

  useEffect(() => {
    if (isOpen && window.innerHeight < 800) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const [{ data: projectListResponse }] = useQuery({
    query: ProjectListQuery,
    variables: {
      lang: locale,
    },
  });
  const developments = projectListResponse.projects?.datas ?? [];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`w-full fixed z-50 transition-all duration-300 text-xs ${isScrolled ? navbarStyle() : navbarElseStyle()}`}
      >
        <div
          className={`w-full container mx-auto px-4 ${
            isScrolled
              ? navbarContainerStyle()
              : pathname.includes('/article')
                ? `py-2`
                : ` py-2 my-3 lg:py-6 bg-transparent ${variant.text}`
          }`}
        >
          <div className="flex items-center">
            {/* Left Side */}
            <div className="flex-1 p-4 pl-0">
              <button onClick={() => setIsOpen(true)} className="flex items-center gap-3">
                <h1 className="hidden md:flex">MENU</h1>
                <Image src={isScrolled ? iconMenu : variant.iconMenu} alt="Menu Icon" height={14} width={14} />
              </button>
            </div>

            {/* Center Side (Logo) */}
            <div className="flex items-center space-x-2">
              <a href={'/'}>
                <div className={isScrolled ? '' : 'md:relative md:-top-1'}>
                  <Image
                    // className={`w-[90px] ${isScrolled ? 'md:w-[138px]' : 'md:w-[112px]'}`}
                    className="w-[80px]"
                    src={isScrolled ? logoRowGreen : variant.logo}
                    alt="CG Logo"
                    height={1000}
                    width={1000}
                    unoptimized={true}
                  />
                </div>
              </a>
              <a href={'/'}>
                <div className={isScrolled ? '' : 'md:relative md:-top-1'}>
                  <Image
                    // className={`w-[90px] ${isScrolled ? 'md:w-[138px]' : 'md:w-[112px]'}`}
                    className="w-[80px]"
                    src={isScrolled ? logo35color : variant.logo2}
                    alt="CG Logo"
                    height={1000}
                    width={1000}
                    unoptimized={true}
                  />
                </div>
              </a>
            </div>

            {/* Right Side */}
            <div className="md:flex-1 hidden md:flex justify-end items-center gap-6 px-4 py-2 pr-0">
              <a href="https://wa.me/628117038868" target="_blank" rel="noopener noreferrer">
                <Image
                  src={isScrolled ? iconWhatsApp : variant.iconWhatsApp}
                  alt="WhatsApp Icon"
                  width={15}
                  height={15}
                />
              </a>

              <div className="w-px h-6 bg-gray-400"></div>

              <LocaleSwitcher isScrolled={isScrolled} />

              <div className="w-px h-6 bg-gray-400"></div>

              <Link href="/contact">
                <button className="uppercase font-medium tracking-wide ">Enquire</button>
              </Link>
            </div>

            <div className="flex-1 md:hidden justify-end items-center gap-6"></div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[380px] bg-white shadow-lg transition-transform duration-300 z-[60] overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Button CLOSE */}
        <div className="flex justify-start items-center p-8">
          <button onClick={() => setIsOpen(false)} className="text-xs uppercase underline text-textPrimary">
            Close
          </button>

          <IoCloseOutline className="cursor-pointer text-xl text-textPrimary ml-2" onClick={() => setIsOpen(false)} />
        </div>

        {/* Menu List */}
        <ul className="pl-8 pt-4 text-textPrimary">
          {/* HOME */}
          <li className={'block md:hidden'}>
            <Link href="/" className={menuStyle('/')} onClick={() => setIsOpen(false)}>
              <div className="my-3 font-marcellus text-textPrimary cursor-pointer text-[18px]">HOME</div>
            </Link>
          </li>

          {/* DEVELOPMENT */}
          <li>
            <div
              className="my-3 font-marcellus text-textPrimary flex justify-start gap-2 items-center cursor-pointer text-[18px]"
              onClick={() => toggleMenu('development')}
            >
              DEVELOPMENT
              <span>
                <Image
                  src={iconCaretDown}
                  alt="Caret Down Icon"
                  width={12}
                  height={12}
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
                    href={`/development/${item.slug}/${item.id}`}
                    className={subMenuStyle(`/development/${item.slug}/${item.id}`)}
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
              <div className="my-3 font-marcellus text-textPrimary cursor-pointer text-[18px]">ABOUT US</div>
            </Link>
          </li>

          {/* COMMUNITY ECOSYSTEM */}
          <li>
            <div
              className="my-3 font-marcellus text-textPrimary flex justify-start items-center gap-2 cursor-pointer text-[18px]"
              onClick={() => toggleMenu('community')}
            >
              CSR & COMMUNITY DEVELOPMENT
              <span>
                <Image
                  src={iconCaretDown}
                  alt="Caret Down Icon"
                  width={12}
                  height={12}
                  className={`transform transition-transform ${openMenus['community'] ? 'rotate-180' : 'rotate-0'}`}
                />
              </span>
            </div>
          </li>
          {openMenus['community'] && (
            <ul className="pl-4">
              {central(locale).map((item) => (
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
            <Link href="/article" className={menuStyle('/article')} onClick={() => setIsOpen(false)}>
              <div className="my-3 font-marcellus text-textPrimary cursor-pointer text-[18px]">NEWS & UPDATE</div>
            </Link>
          </li>
          <li>
            <Link href="/career" className={menuStyle('/career')} onClick={() => setIsOpen(false)}>
              <div className="my-3 font-marcellus text-textPrimary cursor-pointer text-[18px]">CAREERS</div>
            </Link>
          </li>
          <li>
            <Link href="/contact" className={menuStyle('/contact')} onClick={() => setIsOpen(false)}>
              <div className="my-3 font-marcellus text-textPrimary cursor-pointer text-[18px]">ENQUIRE</div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
