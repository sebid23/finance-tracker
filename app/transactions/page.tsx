"use client";

import { useState } from "react";

const transactions = [
  { id: 1, date: "Mar 6, 2026", description: "Salary", category: "Income", type: "income", amount: 3000 },
  { id: 2, date: "Mar 5, 2026", description: "Groceries", category: "Food", type: "expense", amount: 42 },
  { id: 3, date: "Mar 4, 2026", description: "Netflix", category: "Entertainment", type: "expense", amount: 12 },
  { id: 4, date: "Mar 3, 2026", description: "Electricity bill", category: "Bills", type: "expense", amount: 85 },
  { id: 5, date: "Mar 2, 2026", description: "Freelance payment", category: "Income", type: "income", amount: 500 },
  { id: 6, date: "Mar 1, 2026", description: "Gym", category: "Fitness", type: "expense", amount: 100 },
  { id: 7, date: "Feb 28, 2026", description: "Internet", category: "Bills", type: "expense", amount: 150 },
  { id: 8, date: "Feb 27, 2026", description: "Discord Nitro", category: "Entertainment", type: "expense", amount: 100 },
]

function Badge({ children } : {children : React.ReactNode}) {
    return (
        <span className="inline-flex items-center rounded-lg border border-cyan-900/60 bg-cyan-950/40 px-2.5 py-1 text-xs font-semibold">
            {children}
        </span>
    )
}

export default function Transactions() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const filteredTransactions = transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "all" || t.type === filterType;

      return matchesSearch && matchesType;
    });

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
            <button className="rounded-lg border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer">
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
                </tr>
              </thead>

              <tbody className="divide-y divide-cyan-900/30">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((t) => {
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
      </div>
    );
}