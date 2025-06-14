import Image from 'next/image';
import {
  backgroundBannerPageAbout,
  aboutPageBannerAttachmentTopLeft,
  aboutPageBannerAttachmentTopRight,
  aboutPageBannerAttachmentBottomLeft,
  aboutPageBannerAttachmentBottomRight,
  principMuljadi,
  backgroundGoalPageAbout,
  backgroundWaveTile,
} from '@/app/lib/utils/image';

import CarouselAwardeComponent from '@/app/components/landing-components/carousel-awarde-component';
import BannersQuery from '@/graphql/BannersQuery.graphql';
import content from '@/app/lib/utils/content.json';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { getClient } from '@/app/lib/urqlClient';
import AosProvider from '@/components/AosProvider';

export const metadata: Metadata = {
  title: 'About Us | Central Group',
  description:
    'Central Group is the leading property developer in Batam, Indonesia, with over 35 years of experience and prestigious awards. Discover our innovative projects, trusted partnerships, and commitment to building dream homes and communities. Contact us today to learn more!',
};

export default async function About() {
  const locale = await getLocale();
  const client = await getClient();

  const { data: awardsResponse } = await client.query(BannersQuery, {
    lang: locale,
    type: 'award_banner',
  });

  const { data: partnersResponse } = await client.query(BannersQuery, {
    lang: locale,
    type: 'partner_banner',
  });

  return (
    <AosProvider>
      <section
        className={`min-h-[1140px] md:min-h-[1000px] h-[120vh] relative flex flex-col justify-start bg-cover bg-center md:justify-center`}
        style={{ backgroundImage: `url(${backgroundBannerPageAbout.src})` }}
      >
        <div className="z-10 container w-[80%] mt-36 mx-auto md:w-[60%] md:mt-0 lg:w-[50%] text-white">
          <h1 className="mb-10 text-4xl text-center uppercase lg:text-6xl  font-marcellus" data-aos="fade-up">
            The Best Developer in Batam
          </h1>
          <p
            className="mb-6 text-sm/6 text-center md:w-[80%] md:mx-auto text-white"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            The Best Developer in Batam by Property & Bank Award, dengan pengalaman lebih dari 35 Tahun sejak tahun 1989
            dalam membangun 6600 rumah impian Anda dalam 5 tahun ke belakang. Central Group telah berhasil mengembangkan
            beberapa proyek ternama dengan total lahan lebih dari 250 Ha di Kota Batam, beberapa diantaranya bekerjasama
            dengan developer bertaraf nasional seperti afiliasi Alam Sutera dan The Ascott Limited Singapura. Central
            Group berpegang pada nilai dan tanggung jawab terhadap seluruh shareholder dan stakeholder.
          </p>
          <p
            className="mb-[25%] text-sm/6 text-center md:w-[80%] md:mx-auto text-white"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Central Group berpegang pada nilai dan tanggung jawab terhadap seluruh shareholder dan stakeholder.
          </p>
        </div>

        <Image
          src={aboutPageBannerAttachmentTopLeft}
          alt="Banner Attachment Top Left"
          className="hidden absolute w-[20%] left-0 bottom-[30%] md:block lg:w-[15%] lg:bottom-[40%]"
          data-aos="zoom-in"
          data-aos-delay="500"
        />

        <Image
          src={aboutPageBannerAttachmentTopRight}
          alt="Banner Attachment Top Right"
          className="absolute w-[40%] right-[48%] bottom-[16%] md:w-[20%] md:right-0 md:bottom-[50%] lg:w-[15%] lg:bottom-[60%]"
          data-aos="zoom-in"
          data-aos-delay="300"
        />

        <Image
          src={aboutPageBannerAttachmentBottomLeft}
          alt="Banner Attachment Bottom Left"
          className="absolute left-0 bottom-[5%] w-[40%] md:w-[30%] md:left-[15%] lg:w-[25%]"
          data-aos="zoom-in"
        />

        <Image
          src={aboutPageBannerAttachmentBottomRight}
          alt="Banner Attachment Bottom Right"
          className="absolute right-0 bottom-[3%] w-[30%] md:w-[25%] md:right-[5%] lg:w-[20%]"
          data-aos="zoom-in"
          data-aos-delay="700"
        />
      </section>

      <CarouselAwardeComponent slides={awardsResponse.banners} />

      <section className="bg-backgroundWhite ">
        <div className="container mx-auto md:p-16 md:pb-24 md:grid md:grid-cols-[5fr_6fr] lg:px-40 lg:grid-cols-[4fr_5fr] overflow-hidden">
          <Image
            src={principMuljadi}
            alt="Princip Muljadi"
            className="w-full"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
          <div
            className="container w-auto h-fit mx-8 relative -top-8 bg-white shadow-custom md:mx-0 md:top-4 md:-left-8 lg:top-8"
            data-aos="fade-left"
            data-aos-delay="800"
          >
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
        <div
          className="container w-auto mx-4 px-6 py-8 relative -top-8 bg-white shadow-custom md:-mb-12 md:p-12 md:flex md:gap-12 md:-top-32 lg:mx-auto lg:px-20 lg:py-16 lg:gap-16"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="text-center">
            <h3 className="mb-6 text-2xl text-textPrimary font-marcellus">{content[locale].vision.title}</h3>
            <p className="text-sm/6 text-textSecondary font-medium">{content[locale].vision.content}</p>
          </div>

          <hr className="my-[40px] md:hidden"></hr>
          <div className="hidden md:block w-[1px] bg-gray-300 h-100"></div>

          <div className="text-center">
            <h3 className="mb-6 text-2xl text-textPrimary font-marcellus">{content[locale].mission.title}</h3>
            <p className="text-sm/6 text-textSecondary font-medium">{content[locale].mission.content}</p>
          </div>

          <hr className="my-[40px] md:hidden"></hr>
          <div className="hidden md:block w-[1px] bg-gray-300 h-100"></div>

          <div className="text-center">
            <h3 className="mb-6 text-2xl text-textPrimary font-marcellus">{content[locale].purpose.title}</h3>
            <p className="text-sm/6 text-textSecondary font-medium">{content[locale].purpose.content}</p>
          </div>
        </div>
      </section>

      <section className="bg-backgroundWhite">
        <div className="container mx-auto p-4 pb-10 lg:m-auto lg:pb-16">
          <p className="mb-5 text-xs text-primary font-semibold" data-aos="fade-up">
            OUR PARTNERS
          </p>
          {/* <div className="grid grid-cols-3 gap-8 md:grid-cols-9"> */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-4 lg:gap-6">
            {partnersResponse?.banners.map((partner, index) => (
              <Image
                key={partner.id}
                src={partner.desktop}
                alt={partner.title}
                width={218}
                height={114}
                // className="w-full h-auto object-contain md:w-[70px] lg:w-[100px]"
                className="w-[70px] lg:w-[100px] h-auto object-contain"
                data-aos="zoom-in-up"
                data-aos-delay={(index + 4) * 100}
              />
            ))}
          </div>
        </div>
      </section>
    </AosProvider>
  );
}
