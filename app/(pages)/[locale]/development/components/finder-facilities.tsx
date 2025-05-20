import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {useQuery} from "@urql/next";
import FacilitiesQuery from "@/graphql/FacilitiesQuery.graphql";
import {useLocale} from "next-intl";

export default function FinderFacilities({selectedFacilities, handleValueChange}) {
    const locale = useLocale();

    const [{data: facilitiesResponse}] = useQuery({
        query: FacilitiesQuery,
        variables: {
            lang: locale
        }
    });
    const facilities = facilitiesResponse.facilities;

    return (
        <div className="grid grid-cols-2 gap-4">
            {facilities.map((facility) => (
                <div key={facility.id} className="flex items-center space-x-2 ">
                    <Checkbox
                        id={facility.id}
                        checked={selectedFacilities.includes(facility.id)}
                        onCheckedChange={() => handleValueChange(facility.id)}
                    />
                    <Label htmlFor={facility.title} className="text-xs">
                        {facility.title}
                    </Label>
                </div>
            ))}
        </div>
    );
}
