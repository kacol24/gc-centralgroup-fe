import { StaticImageData } from 'next/image';
import { imgProperty1 } from './image';

interface NewsCard {
  id: number;
  date: string;
  category: string;
  author: string;
  title: string;
  description: string;
  image: string | StaticImageData;
}

const newsCards: NewsCard[] = [
  {
    id: 1,
    date: '17 JAN 2025',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'TIAP BULAN BAGI BAGI HADIAH HADIAH??',
    description:
      'Setiap bulan bagi bagi handphone gimana caranya? hanya dengan visit lokasi di proyek kami Anda berkesempatan memenangkan undian handphone.',
    image: imgProperty1,
  },
  {
    id: 2,
    date: '06 JAN 2025',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'Hubungan Prabowo, Trump, dan Xi Jinping Jadi Sorotan! Ada Apa?',
    description: 'Kunjungan Presiden RI ke-8 Prabowo Subianto ke Negeri Bambu, Beijing, China (Tiongkok) dalam...',
    image: imgProperty1,
  },
  {
    id: 3,
    date: '01 DEC 2024',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'GEBYAR MERDEKA!!! Central Raya Tanjung Uncang Memiliki Banyak PROMO MERDEKA Untuk Kamu!',
    description:
      'Dalam rangka menyambut hari Kemerdekaan Republik Indonesia yang ke-79, Central Group turut memberikan PROMO MERDEKA untuk kamu yang ingin memiliki hunian hingga unit bisnis.',
    image: imgProperty1,
  },
  {
    id: 4,
    date: '17 JAN 2025',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'Cari rumah dengan lokasi strategis di batu aji?',
    description:
      'Central Batu Aji memiliki rumah dengan Type Solitaire LB 80, rumah ini dibangun dengan konsep minimalist dan harganya sangat terjangkau, lokasinya di dekat minimarket, pasar, sekolah dan juga rumah sakit. Sangat strategis bagi keluarga muda yang ingin mencari hunian.',
    image: imgProperty1,
  },
  {
    id: 5,
    date: '06 JAN 2025',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'Mengenal Lebih Dalam Tentang CENTRAL RAYA TANJUNG UNCANG, Perumahan Eksklusif Harga Minimalist',
    description: 'Central Raya Tanjung Uncang merupakan salah satu project di CENTRAL GROUP yang sudah dikembangkan...',
    image: imgProperty1,
  },
  {
    id: 6,
    date: '01 DEC 2024',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'Rumah mewah tapi minimalis di daerah Batu Aji',
    description:
      'Central Batu Aji mendirikan rumah mewah ini dengan konsep minimalist, dibangun dengan ruangan yang luas karena konsepnya open space sehingga membuat ruangan terasa lebar dan luas, serta sirkulasi mudah masuk ke dalam rumah.',
    image: imgProperty1,
  },
  {
    id: 7,
    date: '17 JAN 2025',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'Percepat Pemulihan Ekonomi RI, KEK Pariwisata Kesehatan Internasional Batam Segera Terealisasi!',
    description: 'Dalam beberapa dekade terakhir, Batam telah menjadi pusat investasi dan perdagangan...',
    image: imgProperty1,
  },
  {
    id: 8,
    date: '06 JAN 2025',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'Central Hills Jadi "Best Choice Housing Project Batam and Surrounding" Versi Golden Property Awards 2024',
    description: 'Dalam upaya memahami kebutuhan dan keinginan masyarakat akan hunian nyaman dan strategis...',
    image: imgProperty1,
  },
  {
    id: 9,
    date: '01 DEC 2024',
    category: 'NEWS',
    author: 'Yunintiyas',
    title: 'Clover Hills Disebut Gen Z, Ramai Pembeli Sebelum Launching!',
    description: 'Dalam upaya memahami kebutuhan dan keinginan masyarakat akan hunian nyaman dan strategis...',
    image: imgProperty1,
  },
];

export { newsCards };
