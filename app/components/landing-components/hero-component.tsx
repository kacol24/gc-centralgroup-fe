'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

export default function HeroComponent({slides}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = '.custom-prev';
      swiperRef.current.swiper.params.navigation.nextEl = '.custom-next';
      swiperRef.current.swiper.params.pagination.el = '.custom-pagination';
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
      swiperRef.current.swiper.pagination.init();
      swiperRef.current.swiper.pagination.update();
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  return (
    <section className="relative w-full h-[70vh] lg:h-[96vh] mb-20">
      <div className="relative w-full h-full mx-auto">
        <div className="absolute hidden lg:flex lg:top-full left-5 top-1/2 -translate-y-1/2 lg:left-[80%] z-10">
          {/* Custom Buttons */}
          <button className="custom-prev w-12 h-12 bg-white shadow-md border border-[#CFD5D5] rounded-none flex items-center justify-center  transition">
            <HiArrowLeft className="text-textPrimary w-4 h-4" />
          </button>

          <button className="custom-next w-12 h-12 bg-white shadow-md border border-[#CFD5D5] rounded-none flex items-center justify-center  transition">
            <HiArrowRight className="text-textPrimary w-4 h-4" />
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          navigation={{
            prevEl: '.custom-prev',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-full"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <Image src={slide.desktop} alt="logo" className="object-contain w-full h-full" width={1440} height={780}
                     priority/>
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1
                  data-aos="fade-up"
                  className="text-[48px] lg:text-[64px] leading-[1.2] font-marcellus mb-6 uppercase tracking-wide max-w-[300px] md:max-w-none"
                >
                  {slide.title}
                </h1>
                <p data-aos="fade-up" data-aos-delay="600" className="text-base lg:text-[20px]  tracking-widest mb-10">
                  {slide.cta}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination */}
      <div className="absolute  w-full flex justify-center items-center lg:block lg:top-full  lg:-translate-y-1/5  mt-4 z-10">
        <div className="custom-pagination w-12 "></div>
      </div>
    </section>
  );
}
