import {FaMapMarkerAlt} from "react-icons/fa";
import {ComboboxDemo} from "@/components/ui/combobox";
import {useQuery} from "@urql/next";
import LocationsQuery from "@/graphql/LocationsQuery.graphql";
import {useSearchParams} from "next/navigation";

export default function FinderLocations({ handleValueChange }) {
    const searchParams = useSearchParams();

    const [{data: locationsResponse}] = useQuery({
        query: LocationsQuery
    });

    const cities = locationsResponse.locations.map(location => {
        return {
            value: location.id,
            label: location.title
        }
    });

    return (
        <ComboboxDemo
            dataPropertys={cities}
            placeholder="Location"
            icon={<FaMapMarkerAlt className="text-white"/>}
            onValueChange={value => handleValueChange(value)}
            defaultValue={searchParams.get('location')}
            customClassName={{
                button: 'bg-black text-white hover:bg-black hover:opacity-80 py-6',
                popoverContent: 'bg-gray-800 text-white',
                input: 'border-gray-400',
                item: 'text-gray-700',
                itemActive: 'bg-blue-300 text-black',
            }}
        />
    );
}
