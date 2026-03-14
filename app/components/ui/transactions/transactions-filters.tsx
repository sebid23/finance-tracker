import Dropdown from "@/app/components/ui/dropdown";

type Props = {
  search: string;
  filterCategory: string;
  filterType: string;
  sortType: string;
  onSearchChange: (value: string) => void;
  onFilterCategoryChange: (value: string) => void;
  onFilterTypeChange: (value: string) => void;
  onSortTypeChange: (value: string) => void;
  onAddTransaction: () => void;
};

const categoryOptions = [
  { value: "all", label: "All categories" },
  { value: "income", label: "Income" },
  { value: "food", label: "Food" },
  { value: "entertainment", label: "Entertainment" },
  { value: "bills", label: "Bills" },
  { value: "fitness", label: "Fitness" },
  { value: "others", label: "Others" }
]
const typeOptions = [
  { value: "all", label: "All types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" }
]

const sortOptions = [
  { value: "date_desc", label: "Date (newest)" },
  { value: "date_asc", label: "Date (oldest)" },
  { value: "amount_desc", label: "Amount (high - low)" },
  { value: "amount_asc", label: "Amount (low - high)" }
]

export default function TransactionsFilters({ search, filterCategory, filterType, sortType, onSearchChange, onFilterCategoryChange, onFilterTypeChange, onSortTypeChange, onAddTransaction }: Props) {
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
        <div className="flex flex-wrap items-center gap-2">
          <Dropdown
            value={filterCategory}
            onChange={onFilterCategoryChange}
            options={categoryOptions}
            className="flex-1"
          />
          <Dropdown
            value={filterType}
            onChange={onFilterTypeChange}
            options={typeOptions}
            className="flex-1"
          />
          <Dropdown
            value={sortType}
            onChange={onSortTypeChange}
            options={sortOptions}
            className="flex-1"
          />
          <button
            onClick={onAddTransaction}
            className="w-full md:w-fit whitespace-nowrap rounded-lg border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer"
          >
            Add transaction
          </button>
        </div>
      </div>
    </>
  );
}