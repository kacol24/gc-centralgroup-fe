import { ComboboxDemo } from '@/components/ui/combobox';
import { RiBuildingFill } from 'react-icons/ri';
import CardArticle from './card-article';
import { newsCards } from '@/app/lib/utils/article';

const propertyTypes = [
  {
    value: 'apartment',
    label: 'Apartment',
  },
  {
    value: 'house',
    label: 'House',
  },
  {
    value: 'villa',
    label: 'Villa',
  },
  {
    value: 'office',
    label: 'Office',
  },
];

export default function ArticleCore() {
  return (
    <section className="w-full lg:container lg:mx-auto bg-white px-4 pb-8">
      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
        <h1 className="text-[28px] font-marcellus uppercase text-textPrimary">News & Update</h1>
        <div className="w-full lg:w-auto">
          <ComboboxDemo
            dataPropertys={propertyTypes}
            placeholder="Property Types"
            icon={<RiBuildingFill className="text-white" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        {newsCards.map((news, index) => (
          <CardArticle
            key={index}
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
    </section>
  );
}
