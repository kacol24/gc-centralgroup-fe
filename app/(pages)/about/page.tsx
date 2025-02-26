'use client';

import Image from 'next/image';
import {
  backgroundBannerPageAbout,
  aboutPageBannerAttachmentTopLeft,
  aboutPageBannerAttachmentTopRight,
  aboutPageBannerAttachmentBottomLeft,
  aboutPageBannerAttachmentBottomRight,
  principMuljadi,
  backgroundGoalPageAbout,
  patnerLogoAsArray,
  backgroundWaveTile,
} from '@/app/lib/utils/image';

import CarouselAwardeComponent from '@/app/components/landing-components/carousel-awarde-component';

export default function About() {
  return (
    <>
      <section
        className="h-[120vh] min-h-[1000px] relative flex flex-col justify-start bg-cover bg-center md:justify-center"
        style={{ backgroundImage: `url(${backgroundBannerPageAbout.src})` }}
      >
        <div className="z-10 container w-[80%] mt-36 mx-auto md:w-[60%] md:mt-0 lg:w-[50%] text-white">
          <h1 className="mb-10 text-4xl text-center uppercase lg:text-6xl  font-marcellus">
            The Best Developer in Batam
          </h1>
          <p className="mb-6 text-sm/6 text-center md:w-[80%] md:mx-auto text-white">
            The Best Developer in Batam by Property & Bank Award, dengan pengalaman lebih dari 34 Tahun sejak tahun 1989
            dalam membangun 3889 rumah impian Anda. Central Group telah berhasil mengembangkan beberapa proyek ternama
            dengan total lahan lebih dari 200 Ha di Kota Batam, beberapa diantaranya bekerjasama dengan developer
            bertaraf nasional seperti afiliasi Alam Sutera dan TDW Property.
          </p>
          <p className="mb-[25%] text-sm/6 text-center md:w-[80%] md:mx-auto text-white">
            Central Group berpegang pada nilai dan tanggung jawab terhadap pemilik properti, investor, management,
            masyarakat, lingkungan sekitar dan seluruh jajaran staff.
          </p>
        </div>

        <Image
          src={aboutPageBannerAttachmentTopLeft}
          alt="Banner Attachment Top Left"
          className="hidden absolute w-[20%] left-0 bottom-[30%] md:block lg:w-[15%] lg:bottom-[40%]"
        />

        <Image
          src={aboutPageBannerAttachmentTopRight}
          alt="Banner Attachment Top Right"
          className="absolute w-[40%] right-[40%] bottom-[20%] md:w-[20%] md:right-0 md:bottom-[50%] lg:w-[15%] lg:bottom-[60%]"
        />

        <Image
          src={aboutPageBannerAttachmentBottomLeft}
          alt="Banner Attachment Bottom Left"
          className="absolute left-0 bottom-[5%] w-[40%] md:w-[30%] md:left-[15%] lg:w-[25%]"
        />

        <Image
          src={aboutPageBannerAttachmentBottomRight}
          alt="Banner Attachment Bottom Right"
          className="absolute right-0 bottom-[3%] w-[30%] md:w-[25%] md:right-[5%] lg:w-[20%]"
        />
      </section>

      <CarouselAwardeComponent />

      <section className="bg-backgroundWhite ">
        <div className="container mx-auto md:p-16 md:pb-24 md:grid md:grid-cols-[5fr_6fr] lg:px-40 lg:grid-cols-[4fr_5fr]">
          <Image src={principMuljadi} alt="Princip Muljadi" className="w-full" />
          <div className="container w-auto h-fit mx-8 relative -top-8 bg-white shadow-custom md:mx-0 md:top-4 md:-left-8 lg:top-8">
            <div className="p-8 lg:p-16">
              <p className="mb-2 text-xs text-primary font-semibold">OUR CEO</p>
              <h2 className="mb-4 text-4xl text-textPrimary font-marcellus">PRINCIP MULJADI</h2>
              <p className="text-sm/6 text-textSecondary font-medium">
                Princip Muljadi merupakan lulusan University of Technology Sidney Australia jurusan Finance and Banking.
                Selama lebih dari 7 tahun, malang melintang di dunia Finance dan perbankan, di tahun 1999, ia kembali ke
                Batam, dan tepat pada tahun 2005 fokus memajukan Central Group, hingga akhirnya saat ini Central Group
                telah memiliki proyek - proyek sekala besar seperti The Central Sukajadi, Central Raya Tiban, Central
                Raya Batuaji, Central Raya Tanjunguncang, Central Laguna Hills dan Central Hills
              </p>
            </div>
            <div
              className="p-8 bg-primary bg-contain bg-repeat lg:p-16"
              style={{ backgroundImage: `url(${backgroundWaveTile.src})` }}
            >
              <p className="mb-2 text-lg font-marcellus text-white">
                &quot;FULFILLING DREAMS, BUILDING HOMES AND CREATING COMMUNITIES&quot;
              </p>
              <p className="text-xs text-textTertiary font-semibold uppercase">Princip Muljadi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-backgroundWhite">
        <Image src={backgroundGoalPageAbout} alt="Backgound Beach" className="w-full" />
        <div className="container w-auto mx-4 mb-4 p-6 relative -top-8 bg-white shadow-custom md:-mb-12 md:p-12 md:flex md:gap-12 md:-top-32 lg:mx-auto lg:px-20 lg:py-16 lg:gap-16">
          <div className="text-center">
            <h3 className="mb-6 text-2xl text-textPrimary font-marcellus">VISION</h3>
            <p className="text-sm/6 text-textSecondary font-medium">
              Aliquam malesuada enim ut risus vulputate pretium morbi molestie. Sit non morbi libero nibh morbi in
              aliquet. Auctor quis nisl pretium leo mauris aliquet enim quis.
            </p>
          </div>

          <hr className="my-[40px] md:hidden"></hr>
          <div className="hidden md:block w-[1px] bg-gray-300 h-100"></div>

          <div className="text-center">
            <h3 className="mb-6 text-2xl text-textPrimary font-marcellus">MISSION</h3>
            <p className="text-sm/6 text-textSecondary font-medium">
              Cursus at pellentesque viverra convallis. Tincidunt turpis tincidunt purus luctus commodo pellentesque.
              Sit pellentesque sit molestie ultrices lefensa indanese.
            </p>
          </div>

          <hr className="my-[40px] md:hidden"></hr>
          <div className="hidden md:block w-[1px] bg-gray-300 h-100"></div>

          <div className="text-center">
            <h3 className="mb-6 text-2xl text-textPrimary font-marcellus">PURPOSE</h3>
            <p className="text-sm/6 text-textSecondary font-medium">
              Turpis eu accumsan platea malesuada aliquet sed egestas posuere vestibulum. Consectetur risus nascetur at
              id nibh ullamcorper. Euismod semper diam lacinia ut placerat massa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-backgroundWhite">
        <div className="container mx-auto px-4 pb-10 lg:m-auto lg:pb-16">
          <p className="mb-5 text-xs text-primary font-semibold">OUR PROJECTS</p>
          <div className="grid grid-cols-3 gap-8 md:grid-cols-9">
            {patnerLogoAsArray?.map((patner, index) => (
              <Image
                key={index}
                src={patner.src}
                alt={patner.alt}
                width={0}
                className="w-full h-auto object-contain md:w-[70px] lg:w-[100px]"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
