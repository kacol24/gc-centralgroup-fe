import Image from 'next/image';

export default async function SectionBankPartners() {
  const slides = [
    {
      id: 1,
      title: 'BANK BPR KARIMUN',
      desktop: '/assets/image/bank-partners/BANK BPR KARIMUN.webp',
    },
    {
      id: 2,
      title: 'BANK BPR SATYA',
      desktop: '/assets/image/bank-partners/BANK BPR SATYA.webp',
    },
    {
      id: 3,
      title: 'BANK BPR SB',
      desktop: '/assets/image/bank-partners/BANK BPR SB.webp',
    },
    // BANK DMS
    {
      id: 4,
      title: 'BANK DMS',
      desktop: '/assets/image/bank-partners/BANK DMS.webp',
    },
    // BANK JATIM
    {
      id: 5,
      title: 'BANK JATIM',
      desktop: '/assets/image/bank-partners/BANK JATIM.webp',
    },
    // BCA.webp
    {
      id: 6,
      title: 'BCA',
      desktop: '/assets/image/bank-partners/BCA.webp',
    },
    // BNI
    {
      id: 7,
      title: 'BNI',
      desktop: '/assets/image/bank-partners/BNI.webp',
    },
    // BPR DANA NAGOYA
    {
      id: 8,
      title: 'BPR DANA NAGOYA',
      desktop: '/assets/image/bank-partners/BPR DANA NAGOYA.webp',
    },
    // BPR MANGGALA
    {
      id: 9,
      title: 'BPR MANGGALA',
      desktop: '/assets/image/bank-partners/BPR MANGGALA.webp',
    },
    // BRI
    {
      id: 10,
      title: 'BRI',
      desktop: '/assets/image/bank-partners/BRI.webp',
    },
    // BSI SYARIAH
    {
      id: 11,
      title: 'BSI SYARIAH',
      desktop: '/assets/image/bank-partners/BSI SYARIAH.webp',
    },
    // BTN SYARIAH
    {
      id: 12,
      title: 'BTN SYARIAH',
      desktop: '/assets/image/bank-partners/BTN SYARIAH.webp',
    },
    //  BTN
    {
      id: 13,
      title: 'BTN',
      desktop: '/assets/image/bank-partners/BTN.webp',
    },
    // CCB
    {
      id: 14,
      title: 'CCB',
      desktop: '/assets/image/bank-partners/CCB.webp',
    },
    // CIMB NIAGA
    {
      id: 15,
      title: 'CIMB NIAGA',
      desktop: '/assets/image/bank-partners/CIMB NIAGA.webp',
    },
    // DANAMON
    {
      id: 16,
      title: 'DANAMON',
      desktop: '/assets/image/bank-partners/DANAMON.webp',
    },
    // Mandiri
    {
      id: 17,
      title: 'MANDIRI',
      desktop: '/assets/image/bank-partners/Mandiri.webp',
    },
    // OCBC
    {
      id: 18,
      title: 'OCBC',
      desktop: '/assets/image/bank-partners/OCBC.webp',
    },
    // PANIN BANK
    {
      id: 19,
      title: 'PANIN BANK',
      desktop: '/assets/image/bank-partners/PANIN BANK.webp',
    },
    // PERMATA BANK
    {
      id: 20,
      title: 'PERMATA BANK',
      desktop: '/assets/image/bank-partners/PERMATA BANK.webp',
    },
  ];

  return (
    <section className="bg-backgroundWhite">
      <h1
        data-aos="fade-up"
        className="text-[28px] lg:text-4xl text-center  mb-6 lg:mb-16 font-marcellus text-textPrimary uppercase"
      >
        Bank Partners
      </h1>
      <div className="w-full">
        <div className="container mx-auto px-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-3 md:gap-8 justify-start items-center">
              {slides?.map((slide, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-1 w-[72px] flex-shrink-0 relative"
                >
                  <Image
                    src={slide.desktop}
                    alt={slide.title}
                    width={72}
                    height={72}
                    className="w-full h-auto object-contain aspect-square"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
