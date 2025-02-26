import { Button } from '@/components/ui/button';
import Link from 'next/link';
const stats = [
  { value: '35+', label: 'YEARS OF EXPERIENCE' },
  { value: '250+', label: 'HECTARE AREAS' },
  { value: '6600+', label: 'HOUSING BUILT OVER THE LAST 5 YEARS' },
  { value: '15+', label: 'PROJECTS' },
];

export default function IntroductionComponent() {
  return (
    <section className="w-full mx-auto container px-4 mt-10">
      <div className="lg:flex">
        <div className="flex flex-col lg:flex-[0.45] justify-start items-start w-full h-full lg:pr-[100px] mb-12 lg:mb-0 ">
          <h1 className="lg:text-[36px] text-[28px] font-marcellus text-start text-textPrimary mb-6 lg:mb-10 uppercase tracking-wider">
            The Best Developer <br /> in Batam
          </h1>
          <p className="font-medium font-mon lg:text-sm text-start text-textSecondary mb-10 lg:mb-12 leading-6 tracking-wide">
            The Best Developer in Batam by Property & Bank Award, dengan pengalaman lebih dari 34 Tahun sejak tahun 1989
            dalam membangun 3889 rumah impian Anda. Central Group telah berhasil mengembangkan beberapa proyek ternama
            dengan total lahan lebih dari 200 Ha di Kota Batam, beberapa diantaranya bekerjasama dengan developer
            bertaraf nasional seperti afiliasi Alam Sutera dan TDW Property. Central Group berpegang pada nilai dan
            tanggung jawab terhadap pemilik properti, investor, management, masyarakat, lingkungan sekitar dan seluruh
            jajaran staff.
          </p>

          <Button variant="filled" className="rounded-none text-xs py-[24px] px-[30px] lg:px-[38px]">
            <Link href={`/about`} passHref>
              ABOUT US
            </Link>
          </Button>
        </div>
        <div className="w-full flex flex-[0.55] h-[350px]">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-6 text-center mt-[100px] pt-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center ${
              index === 0
                ? 'border-b-2 lg:border-b-0 border-r-2'
                : index === 1
                  ? 'border-b-2 lg:border-b-0 '
                  : index === 2
                    ? ' border-b-0 border-r-2'
                    : 'border-none'
            } lg:border-r-2 border-[#E5E5E5] h-[170px]`}
          >
            <p className="text-[32px] lg:text-[52px] font-marcellus text-textPrimary">{stat.value}</p>
            <p
              className={`text-[10px] lg:text-xs font-semibold text-textPrimary uppercase mt-2 ${
                index === 2 ? 'pr-4' : 'pr-0'
              } lg:pr-6`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
