'use client';

import {
  articleAuthor,
  ArticleAuthorModel,
  ArticleDetailContentModel,
  articleDetailContents,
  NewsCard,
  newsCards,
} from '@/app/lib/utils/article';
import Image from 'next/image';
import React from 'react';
import { use, useEffect, useState } from 'react';
import { FaFacebookF, FaWhatsapp, FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { RiLinksFill } from 'react-icons/ri';
import CardArticle from '@/app/components/card-article';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [article, setArticle] = useState<NewsCard | undefined>();
  const [contents, setContents] = useState<ArticleDetailContentModel[]>([]);
  const [author, setAuthor] = useState<ArticleAuthorModel | undefined>();

  const getData = () => {
    const data: NewsCard | undefined = newsCards.find((item) => item.id === parseInt(id));
    setArticle(data);
    setContents(articleDetailContents);
    setAuthor(articleAuthor);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <section className="pt-28 bg-backgroundWhite">
        <div className="container mx-auto lg:flex lg:flex-col-reverse">
          {article?.image && (
            <Image
              src={article?.image}
              alt="article image"
              className="aspect-[1.88/1] object-cover object-center lg:px-4"
            />
          )}

          <div className="px-4 py-10 text-center lg:text-start lg:flex lg:justify-between lg:gap-8">
            <div>
              <p className="text-xs text-primary font-semibold uppercase">{article?.category} UPDATE</p>
              <h1 className="mt-4 mb-8 text-4xl text-textPrimary font-marcellus uppercase lg:mb-0">{article?.title}</h1>
            </div>
            <div className="flex justify-center gap-8 lg:mt-auto lg:justify-end">
              <FaFacebookF className="w-5 h-5 text-textPrimary" />
              <FaWhatsapp className="w-5 h-5 text-textPrimary" />
              <RiLinksFill className="w-5 h-5 text-textPrimary" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-backgroundWhite">
        <div className="container mx-auto px-4 lg:pt-16 lg:pb-32 lg:grid lg:grid-cols-[1fr_3fr] lg:gap-24">
          <div className="h-fit mb-8 p-6 pb-8 bg-white lg:mb-0 lg:sticky lg:top-36">
            <h2 className="text-primary font-semibold">Table of Content</h2>
            <ol className="px-3 pt-6 space-y-4">
              {contents.map((item, index) => (
                <li key={item.id} className="flex gap-2 text-sm/6 text-textPrimary font-medium">
                  <span className="w-4">{index + 1}.</span>
                  <span>{item.topic}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="mb-8 text-textPrimary font-medium">{article?.description}</p>
            {contents.map((item) => (
              <React.Fragment key={item.id}>
                {item.image && <Image src={item.image} alt={`${item.topic} Image`} className="mb-8" />}
                <h3 className="mb-4 text-primary font-semibold">{item.topic}</h3>
                <p className="mb-8 text-sm/6 text-textPrimary font-medium">{item.description}</p>
              </React.Fragment>
            ))}

            <div className="mb-8 flex justify-start items-center gap-4">
              <span className="text-xs text-primary font-semibold">SHARE:</span>
              <div className="flex items-center gap-6">
                <FaFacebookF className="w-5 h-5 text-textPrimary" />
                <FaWhatsapp className="w-5 h-5 text-textPrimary" />
                <RiLinksFill className="w-5 h-5 text-textPrimary" />
              </div>
            </div>

            {author && (
              <div className="mb-10 p-8 rounded-md bg-gray-200 lg:mb-0">
                <div className="flex gap-4">
                  <Image
                    src={author.image}
                    alt={author.name}
                    className="w-14 aspect-square object-cover object-center"
                  />
                  <div>
                    <p className="mb-1 text-textPrimary font-semibold">{author.name}</p>
                    <p className="text-sm/6 text-textPrimary">{author.position}</p>
                  </div>
                </div>
                <hr className="my-6 border-[#0000001A]"></hr>
                <p className="text-xs/5 text-textPrimary font-medium opacity-80">{author.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-backgroundWhite">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline">
            <h2 className="font-marcellus text-3xl text-primary">RELATED ARTICLES</h2>
          </div>
          <hr className="my-8 border-primary opacity-20"></hr>

          <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 md:hidden">
            {newsCards.slice(0, 3).map((news) => (
              <CardArticle
                key={news.id}
                id={news.id}
                title={news.title}
                description={news.description}
                author={news.author}
                category={news.date}
                date={news.date}
                image={news.image}
              />
            ))}
          </div>

          <Carousel
            opts={{
              align: 'center',
              loop: true,
              slidesToScroll: 3,
            }}
            className="relative"
          >
            {/* Wrapper carousel */}
            <CarouselContent className="hidden lg:flex -ml-4 md:-ml-8">
              {newsCards.map((news, index) => (
                <CarouselItem key={index} className="basis-2/6 pl-4 md:pl-8">
                  <CardArticle
                    key={index}
                    id={news.id}
                    title={news.title}
                    description={news.description}
                    author={news.author}
                    category={news.category}
                    date={news.date}
                    image={news.image}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Button Next & Prev Desktop */}

            <div className="absolute hidden lg:flex right-12 -top-[90px] z-20 w-fit">
              <CarouselPrevious className="w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center transition">
                <HiArrowLeft className="text-textPrimary w-7 h-7 " />
              </CarouselPrevious>

              <CarouselNext className="w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
                <HiArrowRight className="text-textPrimary w-7 h-7" />
              </CarouselNext>
            </div>

            {/* Button Previous */}
            {/* <CarouselPrevious className="absolute lg:hidden left-5 top-1/2 -translate-y-1/2  z-10 w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
          <HiArrowLeft className="text-textPrimary w-7 h-7 " />
        </CarouselPrevious> */}

            {/* Button Next */}
            {/* <CarouselNext className="absolute lg:hidden right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
          <HiArrowRight className="text-textPrimary w-7 h-7" />
        </CarouselNext> */}
          </Carousel>

          <Link href="/article" className="w-fit mx-auto mb-8 px-12 py-4 block text-white bg-primary">
            ALL NEWS & UPDATE
          </Link>
        </div>
      </section>
    </>
  );
}
