import Image from 'next/image';
import { imgDummyArticle } from '@/app/lib/utils/image';
import { Button } from '@/components/ui/button';

export default function ArticleHero() {
  return (
    <section className="w-full  mx-auto  lg:bg-backgroundWhite bg-primary lg:px-4 px-4 pb-8  lg:pt-[145px] pt-[137px]">
      <div className="w-full bg-primary  p-4 lg:p-10 xl:p-14 flex flex-col lg:flex-row lg:gap-10 xl:gap-14 items-start justify-start">
        <Image src={imgDummyArticle} alt="Hero Article" className="w-auto lg:w-[547px] lg:h-[369px]  object-contain" />
        <div className="w-full h-auto lg:h-[369px] flex flex-col justify-between">
          <div className="w-full flex flex-col items-start justify-start ">
            <p className="text-[12px] lg:text-[10px] font-medium text-textTertiary uppercase text-center mt-7 lg:mt-0 mb-4">
              News Update
            </p>

            <h1 className="text-[22px] lg:text-lg xl:text-2xl font-marcellus text-white uppercase mb-4">
              Surga Bagi Pecinta Kopi di <br className="block sm:hidden" /> Batam Hadir dengan{' '}
              <br className="block sm:hidden" /> Gaya Hidup Modern dan <br className="block sm:hidden" /> Fasilitas
              Lengkap
            </h1>
            <p className="text-sm lg:text-xs xl:text-sm font-medium text-start text-backgroundWhite text-opacity-80 mb-10">
              Kabar gembira bagi para pecinta kopi di Batam! Kini hadir Central Tiban, hunian modern yang dikelilingi
              oleh berbagai coffeeshop terkenal, menawarkan gaya hidup nyaman, modern, dan menyenangkan.
            </p>
          </div>

          <div className="">
            <div className="border-t lg:flex hidden  w-full flex-none  border-white mb-7 md:mt-0 opacity-20 " />
            <div className=" w-full block items-center lg:flex lg:flex-row">
              <div className="w-full flex gap-4 items-start">
                <div className="w-14 h-14  ">
                  <Image src={imgDummyArticle} alt="Hero Article" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex flex-col gap-2 items-start justify-start">
                  <h4 className="text-sm font-semibold text-white ">Bayu Agusto</h4>
                  <p className="text-xs font-medium text-white text-opacity-80 ">Marketing Head</p>
                </div>
              </div>

              <div className="border-t lg:hidden flex  w-full flex-none  border-white my-6 md:mt-0 opacity-20 md:order-1" />

              <Button
                variant="filled"
                className="rounded-none bg w-full !bg-white !text-primary lg:w-auto   font-medium text-xs px-0 lg:px-11 py-[24px] uppercase"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
