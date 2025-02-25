import { StaticImageData } from 'next/image';
import { articleAuthorDummy, articleDetailDummy, imgProperty1 } from './image';

export interface NewsCard {
  id: number;
  date: string;
  category: string;
  author: string;
  title: string;
  description: string;
  image: string | StaticImageData;
}

export interface ArticleDetailContentModel {
  id: number;
  topic: string;
  description: string;
  image?: StaticImageData;
}

export interface ArticleAuthorModel {
  name: string;
  position: string;
  description: string;
  image: StaticImageData;
}

export const newsCards: NewsCard[] = [
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

export const articleDetailContents: ArticleDetailContentModel[] = [
  {
    id: 1,
    topic: 'Sit amet tempus ornare dictum commodo tellus. ',
    description:
      'Urna massa habitasse sed bibendum id. Ullamcorper tincidunt quis facilisi volutpat odio varius id tellus aliquet. Eget tristique vel diam aliquet. Felis mattis proin auctor diam. Morbi nibh purus arcu sed proin sed cursus id ullamcorper. At turpis elementum lectus lectus mi quam. Sed viverra nunc ac tristique sit sit semper. Cursus ipsum volutpat turpis sed enim. Pulvinar scelerisque tempus tempor aliquam tellus senectus turpis ultricies. Cursus libero auctor ac lorem sapien ac. Vestibulum eget adipiscing id lobortis. Quis sed scelerisque nec curabitur duis in amet senectus. Cras diam ultrices blandit cras nibh viverra adipiscing commodo. Libero diam dui quis elementum mi. Porta vitae pulvinar eget ullamcorper malesuada et odio in interdum. Tellus id id nec lectus. Enim eleifend gravida ipsum leo.',
  },
  {
    id: 2,
    topic: 'Sed fermentum augue semper consectetur sed euismod eu. Cras nisl adipiscing non sit sagitti.',
    description:
      'Tempus facilisis nibh at urna urna. Pulvinar vel semper elit a. Sed tempor aliquam arcu tincidunt arcu tincidunt ipsum leo in. Donec faucibus ornare nibh rhoncus id. Eget orci enim vitae euismod nisl sed nisl dolor phasellus. Morbi et ac sem nec sed. Egestas commodo morbi aliquet risus. Sed sed tortor enim tristique. Lorem venenatis maecenas pellentesque ac aliquam congue. Non et rhoncus laoreet id cras. Porta nullam integer pulvinar urna faucibus. Amet congue suspendisse volutpat pharetra sed. Egestas vehicula nunc consectetur sed sed augue ipsum. Sem habitant lorem dignissim sed ac urna. Vel aliquam sagittis pulvinar nullam. Eget egestas amet amet proin nunc vulputate sed nibh. Duis massa aliquam diam aliquam hendrerit nunc sagittis. Ullamcorper a vulputate arcu tellus auctor eget. Tincidunt arcu at molestie nunc donec. Arcu facilisis risus sem pellentesque augue.',
  },
  {
    id: 3,
    topic: 'Nullam porta bibendum quis aenean turpis proin tortor vulputate aenean.',
    description:
      'Tempus facilisis nibh at urna urna. Pulvinar vel semper elit a. Sed tempor aliquam arcu tincidunt arcu tincidunt ipsum leo in. Donec faucibus ornare nibh rhoncus id. Eget orci enim vitae euismod nisl sed nisl dolor phasellus. Morbi et ac sem nec sed. Egestas commodo morbi aliquet risus. Sed sed tortor enim tristique. Lorem venenatis maecenas pellentesque ac aliquam congue. Non et rhoncus laoreet id cras. Porta nullam integer pulvinar urna faucibus. Amet congue suspendisse volutpat pharetra sed. Egestas vehicula nunc consectetur sed sed augue ipsum. Sem habitant lorem dignissim sed ac urna. Vel aliquam sagittis pulvinar nullam. Eget egestas amet amet proin nunc vulputate sed nibh. Duis massa aliquam diam aliquam hendrerit nunc sagittis. Ullamcorper a vulputate arcu tellus auctor eget. Tincidunt arcu at molestie nunc donec. Arcu facilisis risus.',
    image: articleDetailDummy,
  },
  {
    id: 4,
    topic: 'Condimentum massa arcu lorem quam in malesuada interdum.',
    description:
      'Quisque lectus lacus id bibendum. Enim et dolor risus vitae aliquam commodo massa vel. Et dui nulla cum pretium. Imperdiet habitasse ut mollis duis odio aliquet tristique lacus parturient. Nibh nulla ut adipiscing lectus gravida hac ut. Sociis accumsan scelerisque cras adipiscing pellentesque. Turpis suspendisse viverra tellus habitant cum vestibulum nunc semper. Nam arcu elementum eget et. Varius adipiscing nulla quam adipiscing quam. Aliquet et cras ornare id sed lobortis. Id elementum elit sed viverra libero.',
  },
];

export const articleAuthor: ArticleAuthorModel = {
  name: 'John Doe',
  position: 'Marketing Head',
  description:
    'John Doe adalah Direktur Produksi dengan pengalaman lebih dari 15 tahun di industri teknologi dan kuliner. Sebagai ahli dalam manajemen produksi dan inovasi digital, John memiliki wawasan mendalam tentang penerapan teknologi untuk meningkatkan efisiensi operasional dan pengalaman pelanggan. Melalui artikel-artikelnya, John berbagi pengetahuan dan praktik terbaik yang telah membantu banyak bisnis sukses di era modern.',
  image: articleAuthorDummy,
};
