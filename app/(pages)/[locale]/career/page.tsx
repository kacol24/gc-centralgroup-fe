'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
// import { CareerModel, careers } from '@/app/lib/utils/career';
import { careerPageBanner } from '@/app/lib/utils/image';
// import {Link} from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { TbGridDots } from 'react-icons/tb';
import { IoMdArrowDropdown } from 'react-icons/io';

import { useLocale } from 'next-intl';
import { useQuery } from '@urql/next';
import CareerQuery from '@/graphql/CareersQuery.graphql';
import CareerCategoryQuery from '@/graphql/CareerCategoriesQuery.graphql';

export default function Career() {
  //   const [careersData, setCareersData] = useState<CareerModel[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const locale = useLocale();

  const [{ data: careerResponse }] = useQuery({
    query: CareerQuery,
    variables: {
      lang: locale,
    },
  });

  const [{ data: categoryResponse }] = useQuery({
    query: CareerCategoryQuery,
    variables: {
      lang: locale,
    },
  });

  const categories = [
    'All',
    ...new Set(categoryResponse?.careercategories.map((category: { title: string }) => category.title) || []),
  ];

  const careers =
    careerResponse?.careers.map(
      (career: {
        id: string;
        title: string;
        content: string;
        category: {
          id: string;
          title: string;
        };
      }) => ({
        id: career.id,
        title: career.title,
        category: career.category.title,
        content: career.content,
      }),
    ) || [];

  const filteredCareers =
    selectedCategory === 'All' ? careers : careers.filter((career) => career.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const getData = () => {
    // const data: CareerModel[] = careers;
    // setCareersData(data);
  };

  useEffect(() => {
    getData();
    AOS.init({
      duration: 500,
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  return (
    <>
      <section
        className="relative min-h-[36rem] h-[80vh] flex flex-col justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${careerPageBanner.src})`,
        }}
      >
        <div className="absolute inset-0 bg-primary opacity-95" />

        <div className="z-10 container mx-auto px-4 text-center md:w-[80%] lg:w-[40%]">
          <h1 className="mb-8 text-4xl text-backgroundWhite font-marcellus" data-aos="fade-up">
            WORK WITH US
          </h1>
          <p className="text-sm/6 text-white font-medium" data-aos="fade-up" data-aos-delay="200">
            Saat ini Central Group membutuhkan beberapa posisi sebagai berikut. Kunjungi secara berkala halaman ini,
            untuk mendapatkan informasi karir di Central Group
          </p>
          <div className="relative md:w-[50%] w-full mt-8 mx-auto">
            <select
              className="w-full p-3 text-textPrimary rounded-sm focus:outline-none focus:ring-0 appearance-none bg-white border border-gray-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="p-4 text-textPrimary">
                  {category}
                </option>
              ))}
            </select>

            <IoMdArrowDropdown className="absolute top-[50%] -translate-y-1/2 right-4 text-textPrimary flex items-center pointer-events-none" />
          </div>
        </div>
      </section>

      <section className="bg-backgroundWhite">
        <div className="relative -top-16 container mx-auto px-4 py-8 -mb-16 space-y-4">
          {filteredCareers.map((item, index) => (
            <div key={index} className="bg-white shadow-custom" data-aos="fade-up" data-aos-delay={(index + 3) * 100}>
              <button
                className="w-full text-left p-4 font-semibold text-textPrimary flex justify-between items-center md:px-8 md:grid md:grid-cols-[3fr_1fr_1fr] lg:py-6"
                onClick={() => toggleAccordion(index)}
              >
                {item.title}

                <span className="md:hidden">
                  {openIndex === index ? (
                    <svg
                      className="w-6 h-6 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                  )}
                </span>

                <span className="hidden md:flex text-textPrimary items-center gap-2">
                  <TbGridDots />
                  {item.category}
                </span>
                <span className="hidden md:block text-end text-sm text-primary underline underline-offset-4">
                  {openIndex === index ? 'CLOSE' : 'DETAILS'}
                </span>
              </button>
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openIndex === index ? 'max-h-[1000vh]' : 'max-h-0'
                }`}
              >
                <div className="px-8 py-8 mb-3">
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>

                {/* <p className="p-4 pb-8 text-textPrimary font-medium md:pt-8 md:px-20 lg:pt-12 lg:px-40">
                  {item.detail}
                </p>
                <h4 className="px-4 text-primary font-semibold md:px-20 lg:px-40">Job Descriptions</h4>
                <p className="p-4 pb-8 text-textPrimary font-medium md:px-20 lg:px-40">{item.jobDescription}</p>
                <h4 className="px-4 text-primary font-semibold md:px-20 lg:px-40">Requirements</h4>
                <p className="p-4 pb-8 text-textPrimary font-medium md:px-20 md:pb-12 lg:px-40">{item.requirement}</p>
                <Link href="#" className="w-fit mx-auto mb-8 px-12 py-4 block text-white bg-primary md:mb-12 lg:mb-20">
                  APPLY JOB
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
