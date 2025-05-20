import PropertyFinder from "@/app/(pages)/[locale]/development/components/property-finder";
import SearchResult from "@/app/(pages)/[locale]/search/components/search-result";
import {createLoader, parseAsArrayOf, parseAsInteger, SearchParams} from "nuqs/server";

const filterSearchParams = {
    location: parseAsInteger,
    propertyType: parseAsInteger,
    facilities: parseAsArrayOf(parseAsInteger, ','),
    price: parseAsArrayOf(parseAsInteger, '-')
};

const loadSearchParams = createLoader(filterSearchParams);

type PageProps = {
    searchParams: Promise<SearchParams>
}

export default async function Search({searchParams}: PageProps) {
    const params = await loadSearchParams(searchParams);

    return (
        <div className="h-auto flex flex-col justify-center items-center">
            <h1
                className="text-[64px] leading-[70px]  text-center mt-56 mb-28 font-marcellus text-textPrimary uppercase lg:flex hidden">
                Search result
            </h1>
            <h1
                className="text-[32px] leading-[1.5]  text-center mt-44 mb-20  font-marcellus text-textPrimary uppercase lg:hidden flex">
                Search result
            </h1>
            <div className="container mx-auto px-4">
                <div className="pb-10 lg:pb-20 flex flex-col md:flex-row">
                    <div>
                        <PropertyFinder compact/>
                    </div>
                    <div className="flex flex-col flex-grow lg:pl-6">
                        <SearchResult params={params}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
