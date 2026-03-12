type Props = {
  search: string;
  filterType: string;
  sortType: string;
  onSearchChange: (value: string) => void;
  onFilterTypeChange: (value: string) => void;
  onSortTypeChange: (value: string) => void;
  onAddTransaction: () => void;
};

export default function TransactionsFilters({ search, filterType, sortType, onSearchChange, onFilterTypeChange, onSortTypeChange, onAddTransaction }: Props) {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-2">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full md:w-60 rounded-lg border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-sm outline-none transition"
          placeholder="Search transactions..."
          type="text"
        />
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value)}
            className="rounded-lg w-25 border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer outline-none"
          >
            <option className="rounded-lg bg-cyan-900/40" value="all">
              All types
            </option>
            <option className="bg-cyan-900/40" value="income">
              Income
            </option>
            <option className="bg-cyan-900/40" value="expense">
              Expense
            </option>
          </select>
          <select
            value={sortType}
            onChange={(e) => onSortTypeChange(e.target.value)}
            className="rounded-lg w-35 border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer outline-none"
          >
            <option className="rounded-lg bg-cyan-900/40" value="date_desc">
              Date (newest)
            </option>
            <option className="bg-cyan-900/40" value="date_asc">
              Date (oldest)
            </option>
            <option className="bg-cyan-900/40" value="amount_desc">
              Amount (high - low)
            </option>
            <option className="bg-cyan-900/40" value="amount_asc">
              Amount (low - high)
            </option>
          </select>
          <button
            onClick={onAddTransaction}
            className="rounded-lg border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer"
          >
            Add transaction
          </button>
        </div>
      </div>
    </>
  );
}