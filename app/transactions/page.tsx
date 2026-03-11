"use client";

import { useState } from "react";

type Transaction = {
  id: number,
  date: string,
  description: string,
  category: string,
  type: "income" | "expense",
  amount: number
}

function Badge({ children } : {children : React.ReactNode}) {
    return (
        <span className="inline-flex items-center rounded-lg border border-cyan-900/60 bg-cyan-950/40 px-2.5 py-1 text-xs font-semibold">
            {children}
        </span>
    )
}

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([
      { id: 1, date: "Mar 6, 2026", description: "Salary", category: "Income", type: "income", amount: 3000 },
      { id: 2, date: "Mar 5, 2026", description: "Groceries", category: "Food", type: "expense", amount: 42 },
      { id: 3, date: "Mar 4, 2026", description: "Netflix", category: "Entertainment", type: "expense", amount: 12 },
      { id: 4, date: "Mar 3, 2026", description: "Electricity bill", category: "Bills", type: "expense", amount: 85 },
      { id: 5, date: "Mar 2, 2026", description: "Freelance payment", category: "Income", type: "income", amount: 500 },
      { id: 6, date: "Mar 1, 2026", description: "Gym", category: "Fitness", type: "expense", amount: 100 },
      { id: 7, date: "Feb 28, 2026", description: "Internet", category: "Bills", type: "expense", amount: 150 },
      { id: 8, date: "Feb 27, 2026", description: "Discord Nitro", category: "Entertainment", type: "expense", amount: 100 }
    ]);

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [sortType, setSortType] = useState("date_desc");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [edit, setEdit] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState<"income" | "expense">("income");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const filteredTransactions = transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "all" || t.type === filterType;

      return matchesSearch && matchesType;
    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      if (sortType === "date_desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      if (sortType === "date_asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }

      if (sortType === "amount_desc") {
        return b.amount - a.amount;
      }

      if (sortType === "amount_asc") {
        return a.amount - b.amount;
      }

      return 0;
    })

    function handleAddTransaction() {
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      const newTransaction = {
        id: Date.now(),
        date: formattedDate,
        description,
        category,
        type,
        amount: Number(amount),
      };

      setTransactions((prevTransactions) => ([newTransaction, ...prevTransactions]));

      setDescription("");
      setCategory("");
      setType("income");
      setAmount("");
      setDate("");

      setIsModalOpen(false);
    }

    function handleDelete(id: number) {
      setTransactions(
        transactions.filter((t) => t.id !== id)
      )
    }

    function handleEdit(transaction: Transaction) {
      setEdit(transaction.id);

      setDescription(transaction.description);
      setCategory(transaction.category);
      setType(transaction.type);
      setAmount(String(transaction.amount));

      const parsedDate = new Date(transaction.date);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const day = String(parsedDate.getDate()).padStart(2, "0");

      setDate(`${year}-${month}-${day}`);

      setIsModalOpen(true);
    }

    return (
      <div className="py-6">
        <span className="text-lg font-bold">Transactions</span>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-60 rounded-lg border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-sm outline-none transition"
            placeholder="Search transactions..."
            type="text"
          />
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-lg w-25 border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer outline-none"
            >
              <option className="rounded-lg bg-cyan-900/40" value="all">All types</option>
              <option className="bg-cyan-900/40" value="income">Income</option>
              <option className="bg-cyan-900/40" value="expense">Expense</option>
            </select>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="rounded-lg w-35 border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer outline-none"
            >
              <option className="rounded-lg bg-cyan-900/40" value="date_desc">Date (newest)</option>
              <option className="bg-cyan-900/40" value="date_asc">Date (oldest)</option>
              <option className="bg-cyan-900/40" value="amount_desc">Amount (high - low)</option>
              <option className="bg-cyan-900/40" value="amount_asc">Amount (low - high)</option>
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer"
            >
              Add transaction
            </button>
          </div>
        </div>
        <div className="border-b border-cyan-900 mt-2"></div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-cyan-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cyan-950/40 text-gray-200">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold text-left">Amount</th>
                  <th className="px-4 py-3 font-semibold text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-cyan-900/30">
                {sortedTransactions.length > 0 ? (
                  sortedTransactions.map((t) => {
                  const isIncome = t.type === "income";
                  return (
                    <tr
                      key={t.id}
                      className="bg-gray-950/20 hover:bg-cyan-950/20 transition"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-gray-200/90">
                        {t.date}
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-100">
                          {t.description}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        {t.category}
                      </td>

                      <td className={`px-4 py-3 whitespace-nowrap ${isIncome ? "text-green-300" : "text-red-300"}`}>
                        <Badge>{isIncome ? "Income" : "Expense"}</Badge>
                      </td>

                      <td
                        className={`px-4 py-3 whitespace-nowrap text-left font-bold ${isIncome ? "text-green-300" : "text-red-300"}`}
                      >
                        {isIncome ? "+" : "-"}${t.amount.toLocaleString()}
                      </td>

                      <td
                        className="flex px-4 py-3 whitespace-nowrap text-left gap-1"
                      >
                        <button
                          onClick={() => handleEdit(t)}
                          className="rounded-lg border border-blue-900 bg-blue-900/40 px-2 py-1 text-sm text-white hover:bg-blue-900/20 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="rounded-lg border border-red-900 bg-red-900/40 px-2 py-1 text-sm text-white hover:bg-red-900/20 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-semibold text-gray-200">
                        No transactions found.
                      </span>
                      <span className="text-sm text-gray-400">
                        Try a different search term.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="w-full max-w-md rounded-lg border border-cyan-900/50 bg-cyan-950 p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Add transaction</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  X
                </button>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Description</label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Enter description"
                    className="w-full rounded-lg border border-cyan-900 bg-cyan-900/50 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Category</label>
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    placeholder="Enter category"
                    className="w-full rounded-lg border border-cyan-900 bg-cyan-900/50 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "income" | "expense")}
                    className="w-full rounded-lg border border-cyan-900 bg-cyan-900/50 px-3 py-2 text-sm outline-none"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Amount</label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    placeholder="0"
                    className="w-full rounded-lg border border-cyan-900 bg-cyan-900/50 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Date</label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="w-full rounded-lg border border-cyan-900 bg-cyan-900/50 px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  onClick={handleAddTransaction}
                  className="rounded-lg border border-cyan-900 bg-cyan-900/40 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-900/20 transition cursor-pointer"
                >
                  Add transaction
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}