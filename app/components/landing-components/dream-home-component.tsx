'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardListDevelopment from '@/app/(pages)/development/components/card-list-development';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DreamHomeComponent() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section className="h-auto flex flex-col mt-14 lg:mt-40 justify-center items-center ">
      <h1
        data-aos="fade-up"
        className="text-[28px] lg:text-4xl text-center  mb-6 lg:mb-16 font-marcellus text-textPrimary uppercase"
      >
        Your Dream Home
      </h1>
      <div className="container mx-auto md:px-4">
        <CardListDevelopment limit={6} />
      </div>
      <div className="px-24 block">
        <Button variant="filled" className="w-full my-8  rounded-none text-xs py-[24px] lg:my-16">
          <Link href={'/development'}>ALL DEVELOPMENT</Link>
        </Button>
      </div>
    </section>
  );
}
