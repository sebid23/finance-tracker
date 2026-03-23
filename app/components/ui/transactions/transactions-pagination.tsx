import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function TransactionsPagination({ page, totalPages, onPageChange}: Props) {
    const isFirst = page === 1;
    const isLast = page === totalPages;

    return (
      <div className="mt-4 flex gap-2 justify-end items-center">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={isFirst}
          className={`rounded-lg border border-cyan-900 bg-cyan-900/40 px-2 py-1.5 text-sm text-white transition
                    ${isFirst ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-cyan-900/20'}`}
        >
          {<ChevronLeft size={16}/>}
        </button>
        <span
            className="rounded-lg border border-cyan-900 bg-cyan-900/40 px-2 py-1 text-sm text-white"
        >
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={isLast}
          className={`rounded-lg border border-cyan-900 bg-cyan-900/40 px-2 py-1.5 text-sm text-white transition
                    ${isLast ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-cyan-900/20'}`}
        >
          {<ChevronRight size={16}/>}
        </button>
      </div>
    );
}