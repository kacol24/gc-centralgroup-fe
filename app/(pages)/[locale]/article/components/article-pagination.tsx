'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {parseAsInteger, useQueryState} from "nuqs";

export default function ArticlePagination({ totalPages }: {totalPages: number}) {
    const [pageParam, setPageParam] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
        scroll: true,
        shallow: false
    }));
    const handleChangePage = (page) => {
        setPageParam(page);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handleChangePage((prev) => Math.max(prev - 1, 1))}
                        className={
                            pageParam === 1
                                ? 'opacity-50 cursor-not-allowed bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary'
                                : 'bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary hover:text-white'
                        }
                    />
                </PaginationItem>

                {Array.from({length: totalPages}, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={pageParam === i + 1}
                            onClick={() => handleChangePage(i + 1)}
                            className="h-11 w-11 rounded-full border-[#F1F1F1] border-2 hover:bg-primary hover:text-white"
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handleChangePage((prev) => Math.min(prev + 1, totalPages))}
                        className={
                            pageParam === totalPages
                                ? 'opacity-50 cursor-not-allowed bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary'
                                : 'bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary hover:text-white'
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
