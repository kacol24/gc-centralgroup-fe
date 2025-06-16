import Image from 'next/image';

// 1 BCA
// 2 MANDIRI
// 3 BNI
// 4 BTN
// 5 BTNS
// 6 BSI
// 7 PANIN
// 8 OCBC
// 9 CIMB NIAGA
// 10 CCB
// 11 PERMATA
// 12 BPR KARIMUN
// 13 DANAMON
// 14 BPR SB
// 15 BANK DMS
// 16 BANK JATIM
// 17 BANK MANGGALA
// 18 SATYA ARTHA4
// 19 BPR DANA NAGOYA

export default async function SectionBankPartners() {
  const slides = [
    // BCA.webp
    {
      id: 1,
      title: 'BCA',
      desktop: '/assets/image/bank-partners/BCA.webp',
    },
    // Mandiri
    {
      id: 2,
      title: 'MANDIRI',
      desktop: '/assets/image/bank-partners/Mandiri.webp',
    },
    // BNI
    {
      id: 3,
      title: 'BNI',
      desktop: '/assets/image/bank-partners/BNI.webp',
    },
    //  BTN
    {
      id: 4,
      title: 'BTN',
      desktop: '/assets/image/bank-partners/BTN.webp',
    },
    // BTN SYARIAH
    {
      id: 5,
      title: 'BTN SYARIAH',
      desktop: '/assets/image/bank-partners/BTN SYARIAH.webp',
    },
    // BSI SYARIAH
    {
      id: 6,
      title: 'BSI SYARIAH',
      desktop: '/assets/image/bank-partners/BSI SYARIAH.webp',
    },
    // BRI
    {
      id: 7,
      title: 'BRI',
      desktop: '/assets/image/bank-partners/BRI.webp',
    },
    // PANIN BANK
    {
      id: 8,
      title: 'PANIN BANK',
      desktop: '/assets/image/bank-partners/PANIN BANK.webp',
    },
    // OCBC
    {
      id: 9,
      title: 'OCBC',
      desktop: '/assets/image/bank-partners/OCBC.webp',
    },
    // CIMB NIAGA
    {
      id: 10,
      title: 'CIMB NIAGA',
      desktop: '/assets/image/bank-partners/CIMB NIAGA.webp',
    },
    // CCB
    {
      id: 11,
      title: 'CCB',
      desktop: '/assets/image/bank-partners/CCB.webp',
    },
    // PERMATA BANK
    {
      id: 12,
      title: 'PERMATA BANK',
      desktop: '/assets/image/bank-partners/PERMATA BANK.webp',
    },
    {
      id: 13,
      title: 'BANK BPR KARIMUN',
      desktop: '/assets/image/bank-partners/BANK BPR KARIMUN.webp',
    },
    // DANAMON
    {
      id: 14,
      title: 'DANAMON',
      desktop: '/assets/image/bank-partners/DANAMON.webp',
    },
    {
      id: 15,
      title: 'BANK BPR SB',
      desktop: '/assets/image/bank-partners/BANK BPR SB.webp',
    },
    // BANK DMS
    {
      id: 16,
      title: 'BANK DMS',
      desktop: '/assets/image/bank-partners/BANK DMS.webp',
    },
    // BANK JATIM
    {
      id: 17,
      title: 'BANK JATIM',
      desktop: '/assets/image/bank-partners/BANK JATIM.webp',
    },
    // BPR MANGGALA
    {
      id: 18,
      title: 'BPR MANGGALA',
      desktop: '/assets/image/bank-partners/BPR MANGGALA.webp',
    },
    {
      id: 19,
      title: 'BANK BPR SATYA',
      desktop: '/assets/image/bank-partners/BANK BPR SATYA.webp',
    },
    // BPR DANA NAGOYA
    {
      id: 20,
      title: 'BPR DANA NAGOYA',
      desktop: '/assets/image/bank-partners/BPR DANA NAGOYA.webp',
    },
  ];

  return (
    <section className="bg-backgroundWhite mb-6 lg:mb-16">
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
