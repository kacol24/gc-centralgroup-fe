import PropertyCard from "@/app/components/card-property";
import { imgProperty1 } from "@/app/lib/utils/image"; 
import { StaticImageData } from "next/image";

interface Property {
  id: number;
  image: string | StaticImageData;
  location: string;
  title: string;
}

const properties: Property[] = [
  { id: 1, image: imgProperty1, location: "Semarang", title: "Serenity Central City" },
  { id: 2, image: imgProperty1, location: "Jakarta", title: "Metropolitan Heights" },
  { id: 3, image: imgProperty1, location: "Surabaya", title: "Grand Emerald Residence" },
  { id: 4, image: imgProperty1, location: "Bali", title: "Tropical Paradise Villas" },
  { id: 5, image: imgProperty1, location: "Bandung", title: "Mountain View Estate" },
  { id: 6, image: imgProperty1, location: "Medan", title: "North Gate Residences" },
];

export default function CardListDevelopment() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 p-0">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            image={property.image} 
            location={property.location} 
            title={property.title} 
          />
        ))}
      </div>
  );
}
