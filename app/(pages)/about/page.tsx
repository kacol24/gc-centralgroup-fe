import Image from 'next/image';

import {
  backgroundBannerPageAbout,
  aboutPageBannerAttachmentTopLeft,
  aboutPageBannerAttachmentTopRight,
  aboutPageBannerAttachmentBottomLeft,
  aboutPageBannerAttachmentBottomRight,
  awardImageAsArray,
  principMuljadi,
  backgroundGoalPageAbout,
  patnerLogoAsArray,
} from '@/app/lib/utils/image';

export default function About() {
  return (
    <>
      <section
        className="h-[120vh] relative flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundBannerPageAbout.src})` }}
      >
        <div className="z-10 container w-[80%] m-auto md:w-[60%] lg:w-[40%]">
          <h1 className="mb-12 text-4xl text-center uppercase lg:text-6xl">The Best Developer in Batam</h1>
          <p className="mb-6 text-sm text-center md:w-[80%] md:mx-auto">
            The Best Developer in Batam by Property & Bank Award, dengan pengalaman lebih dari 34 Tahun sejak tahun 1989
            dalam membangun 3889 rumah impian Anda. Central Group telah berhasil mengembangkan beberapa proyek ternama
            dengan total lahan lebih dari 200 Ha di Kota Batam, beberapa diantaranya bekerjasama dengan developer
            bertaraf nasional seperti afiliasi Alam Sutera dan TDW Property.
          </p>
          <p className="mb-[25%] text-sm text-center md:w-[80%] md:mx-auto">
            Central Group berpegang pada nilai dan tanggung jawab terhadap pemilik properti, investor, management,
            masyarakat, lingkungan sekitar dan seluruh jajaran staff.
          </p>
        </div>

        <div className="hidden absolute w-[20%] left-0 bottom-[30%] md:block lg:w-[15%] lg:bottom-[40%]">
          <Image src={aboutPageBannerAttachmentTopLeft} alt="Banner Attachment Top Left" className="w-full h-full" />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="absolute w-[40%] right-[40%] bottom-[20%] md:w-[20%] md:right-0 md:bottom-[50%] lg:w-[15%] lg:bottom-[60%]">
          <Image src={aboutPageBannerAttachmentTopRight} alt="Banner Attachment Top Right" className="w-full h-full" />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="absolute left-0 bottom-0 w-[40%] md:w-[30%] md:left-[15%] lg:w-[25%]">
          <Image
            src={aboutPageBannerAttachmentBottomLeft}
            alt="Banner Attachment Bottom Left"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        </div>

        <div className="absolute right-0 bottom-0 w-[30%] md:w-[25%] md:right-[5%] lg:w-[20%]">
          <Image
            src={aboutPageBannerAttachmentBottomRight}
            alt="Banner Attachment Bottom Right"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        </div>
      </section>

      <section className="bg-backgroundWhite">
        <div className="w-full p-8 flex gap-6 overflow-x-auto md:align-middle md:justify-center md:gap-8 md:overflow-x-hidden lg:px-0 lg:gap-10">
          {awardImageAsArray?.map((award, index) => (
            <div key={index} className="w-[120px] min-w-[120px] grow relative">
              <Image
                src={award.src}
                alt={award.alt}
                width={120}
                height={0}
                className="w-full h-auto object-contain aspect-square"
              />
              <p className="mt-2 text-[9px] text-center text-textPrimary font-bold md:text-xs">{award.alt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-backgroundWhite md:p-16 md:pb-24 md:grid md:grid-cols-[5fr_6fr] lg:px-40 lg:grid-cols-[4fr_5fr]">
        <Image src={principMuljadi} alt="Princip Muljadi" className="w-full" />
        <div className="container w-auto h-fit mx-8 relative -top-8 bg-white shadow-lg md:mx-0 md:top-4 md:-left-8 lg:top-8">
          <div className="p-8 lg:p-16">
            <p className="mb-2 text-xs text-primary font-semibold">OUR CEO</p>
            <h2 className="mb-4 text-4xl text-textPrimary">PRINCIP MULJADI</h2>
            <p className="text-textSecondary font-medium">
              Princip Muljadi merupakan lulusan University of Technology Sidney Australia jurusan Finance and Banking.
              Selama lebih dari 7 tahun, malang melintang di dunia Finance dan perbankan, di tahun 1999, ia kembali ke
              Batam, dan tepat pada tahun 2005 fokus memajukan Central Group, hingga akhirnya saat ini Central Group
              telah memiliki proyek - proyek sekala besar seperti The Central Sukajadi, Central Raya Tiban, Central Raya
              Batuaji, Central Raya Tanjunguncang, Central Laguna Hills dan Central Hills
            </p>
          </div>
          <div className="p-8 bg-primary lg:p-16">
            <p className="mb-2 text-lg">FULFILLING DREAMS, BUILDING HOMES AND CREATING COMMUNITIES</p>
            <p className="text-xs text-textTertiary font-semibold uppercase">Princip Muljadi</p>
          </div>
        </div>
      </section>

      <section className="bg-backgroundWhite">
        <Image src={backgroundGoalPageAbout} alt="Backgound Beach" className="w-full" />
        <div className="container w-auto mx-8 p-6 relative -top-8 bg-white shadow-lg md:p-12 md:flex md:gap-12 md:-top-32 lg:m-auto lg:px-20 lg:py-16 lg:gap-16">
          <div className="text-center">
            <h3 className="mb-6 text-2xl text-primary">VISION</h3>
            <p className="text-textSecondary font-medium">
              Aliquam malesuada enim ut risus vulputate pretium morbi molestie. Sit non morbi libero nibh morbi in
              aliquet. Auctor quis nisl pretium leo mauris aliquet enim quis.
            </p>
          </div>

          <hr className="my-[40px] md:hidden"></hr>
          <div className="hidden md:block w-[1px] bg-gray-300 h-100"></div>

          <div className="text-center">
            <h3 className="mb-6 text-2xl text-primary">MISSION</h3>
            <p className="text-textSecondary font-medium">
              Cursus at pellentesque viverra convallis. Tincidunt turpis tincidunt purus luctus commodo pellentesque.
              Sit pellentesque sit molestie ultrices lefensa indanese.
            </p>
          </div>

          <hr className="my-[40px] md:hidden"></hr>
          <div className="hidden md:block w-[1px] bg-gray-300 h-100"></div>

          <div className="text-center">
            <h3 className="mb-6 text-2xl text-primary">PURPOSE</h3>
            <p className="text-textSecondary font-medium">
              Turpis eu accumsan platea malesuada aliquet sed egestas posuere vestibulum. Consectetur risus nascetur at
              id nibh ullamcorper. Euismod semper diam lacinia ut placerat massa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-backgroundWhite">
        <div className="container w-auto mx-8 pb-10 lg:m-auto">
          <p className="mb-5 text-xs text-primary font-semibold">OUR PATNERS</p>
          <div className="grid grid-cols-3 gap-8 md:flex md:justify-between md:gap-0">
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
