import Link from "next/link";

type PaginationProps = {
    page: number;
    totalPages: number;
    baseUrl: string; // Optional base URL for the links
};

export default function Pagination({ page, totalPages, baseUrl }: PaginationProps) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    //console.log(pages)
    const nextPage = Math.min(page + 1, totalPages); // no pasarse del total
    const prevPage = Math.max(page - 1, 1);

    return (
        <nav className="flex justify-center py-10 ">
            {page > 1 && (
                <Link
                    href={`${baseUrl}?page=${prevPage}`}
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >

                &laquo;
                
                </Link>
            )}

            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    href={`${baseUrl}?page=${currentPage}`}
                    className={` px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${currentPage === page ? 'bg-indigo-600 text-white' : ''}`}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    href={`${baseUrl}?page=${nextPage}`}
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >

                &raquo;
                
                </Link>
            )}

        </nav>
    );
}