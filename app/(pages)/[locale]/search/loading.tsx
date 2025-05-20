import PropertyFinder from "@/app/(pages)/[locale]/development/components/property-finder";

export default function Loading() {
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
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 sm:gap-6 p-0">
                            {Array.from({length: 4}).map((_, i) => (
                                <div
                                    key={i}
                                    className="relative w-full aspect-[4/5] mx-auto overflow-hidden rounded-none lg:rounded-[3px] shadow-lg animate-pulse bg-gray-200"
                                    data-aos="fade-up"
                                    data-aos-delay={100 * (i + 1)}
                                >
                                    {/* Image skeleton */}
                                    <div className="w-full h-full absolute inset-0 bg-gray-300"/>

                                    {/* Overlay skeleton */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                                        {/* Title skeleton */}
                                        <div className="h-7 w-2/3 bg-gray-400 rounded mb-4"/>
                                        <div className="flex justify-between mt-2">
                                            <div className="flex items-center gap-4 text-[10px]">
                                              <span className="flex items-center gap-[6px]">
                                                <div className="w-4 h-4 bg-gray-500 rounded-full"/>
                                                <div className="w-20 h-3 bg-gray-400 rounded"/>
                                              </span>
                                                <span className="flex items-center gap-1">
                                                <div className="w-4 h-4 bg-gray-500 rounded-full"/>
                                                <div className="w-16 h-3 bg-gray-400 rounded"/>
                                              </span>
                                            </div>
                                            <div className="w-10 h-10 bg-gray-500 rounded-full"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
