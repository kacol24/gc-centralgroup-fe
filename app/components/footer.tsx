import Image from 'next/image';
import { logoRowGreen } from '../lib/utils/image';

export default function Footer() {
  // interface menuTypes {
  //   id: number
  //   menu: string
  //   href: string
  // }

  // const menu: menuTypes[] =[
  //   { id: 1, menu: "Tentang Kami", href: "/about" },
  //   { id: 2, menu: "Kritik Saran", href: "/suggestion" },
  //   { id: 3, menu: "Kontak", href: "/contact" },
  // ]

  return (
    <footer className="flex flex-col items-center justify-center py-14 px-5 bg-primary lg:py-[70px] lg:px-[400px]">
      <div className="flex justify-center flex-col items-center">
        <Image src={logoRowGreen} alt="Logo" width={170} height={77} className="object-contain" />
        <h2 className="text-white opacity-50 text-center text-[16px]">
          SD Muhammadiyah Birrul Walidain Kudus didirikan untuk mewujudkan generasi birrul walidain dan memenuhi
          kebutuhan akan pendidikan setelah TK
        </h2>
      </div>
      {/* <ul className="flex flex-col lg:flex-row text-base font-normal  gap-3 text-white pt-12 items-center justify-center">
              {menu.map((item: menuTypes) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <h3 className="hover-underline-footer">{item.menu}</h3>
                  </Link>
                </li>
              ))}

            </ul> */}
      {/* <ul className="flex gap-4 flex-row justify-center items-center pt-12">
        <li>
          <Link href="">
            <Image
              src="assets/svg/facebook.svg"
              width={10}
              height={20}
              alt="facebook"
              className="social-icon"
            />
          </Link>
        </li>
        <li>
          <Link href="">
            <Image
              src="assets/svg/twitter.svg"
              width={22}
              height={17}
              alt="twitter"
              className="social-icon"
            />
          </Link>
        </li>
        <li>
          <Link href="">
            <Image
              src="assets/svg/instagram.svg"
              width={22}
              height={22}
              alt="instagram"
              className="social-icon"
            />
          </Link>
        </li>
      </ul> */}
    </footer>
  );
}
