import 'aos/dist/aos.css';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {Link} from "@/i18n/navigation";
import BlogsQuery from "@/graphql/BlogsQuery.graphql";
import {getLocale} from "next-intl/server";
import {getClient} from "@/app/lib/urqlClient";

export default async function ArticleHero() {
  const locale = await getLocale();
  const client = await getClient();

  const {data: featuredBlogResponse} = await client.query(BlogsQuery, {
    lang: locale,
    limit: 1,
    isFeatured: true
  });

  if(! featuredBlogResponse.blogs.datas.length) {
    return <></>;
  }

  const blog = featuredBlogResponse.blogs.datas[0];

  return (
    <section className="w-full  mx-auto  lg:bg-backgroundWhite bg-primary lg:px-4 px-4 pb-8  lg:pt-[145px] pt-[137px]">
      <div className="w-full bg-primary  p-4 lg:p-10 xl:p-14 flex flex-col lg:flex-row lg:gap-10 xl:gap-14 items-start justify-start">
        <Image
          data-aos="zoom-in"
          data-aos-duration="1000"
          src={blog.image}
          width={547}
          height={369}
          alt="Hero Article"
          className="w-full lg:w-[547px] lg:h-[369px]  object-contain"
        />
        <div className="w-full h-auto lg:h-[369px] flex flex-col justify-between">
          <div className="w-full flex flex-col items-start justify-start ">
            <p
              data-aos="zoom-in-right"
              data-aos-duration="1000"
              className="text-[12px] lg:text-[10px] font-medium text-textTertiary uppercase text-center mt-7 lg:mt-0 mb-4"
            >
              {blog.category.title}
            </p>

            <h1
              data-aos="zoom-in-right"
              data-aos-duration="1200"
              className="text-[22px] lg:text-lg xl:text-2xl font-marcellus text-white uppercase mb-4"
            >
              {blog.title}
            </h1>
            <p
              data-aos="zoom-in-right"
              data-aos-duration="1400"
              className="text-sm lg:text-xs xl:text-sm font-medium text-start text-backgroundWhite text-opacity-80 mb-10"
            >
              {blog.excerpt}
            </p>
          </div>

          <div className="">
            <div className="border-t lg:flex hidden  w-full flex-none  border-white mb-7 md:mt-0 opacity-20 " />
            <div className=" w-full block items-center lg:flex lg:flex-row">
              <div data-aos="zoom-in-right" data-aos-duration="1200" className="w-full flex gap-4 items-start">
                <div className="w-14 h-14  ">
                  <Image src={blog.author.avatar} alt="Hero Article" className="w-full h-full object-cover rounded-full" width={56} height={56}/>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start">
                  <h4 className="text-sm font-semibold text-white ">
                    {blog.author.name}
                  </h4>
                  <p className="text-xs font-medium text-white text-opacity-80 ">
                    {blog.author.title}
                  </p>
                </div>
              </div>

              <div className="border-t lg:hidden flex  w-full flex-none  border-white my-6 md:mt-0 opacity-20 md:order-1" />

              <Button
                data-aos="zoom-in-left"
                data-aos-duration="1200"
                variant="filled"
                className="rounded-none bg w-full !bg-white !text-primary lg:w-auto   font-medium text-xs px-0 lg:px-11 py-[24px] uppercase"
              >
                <Link href={`/article/${blog.slug}/${blog.id}`}>
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
