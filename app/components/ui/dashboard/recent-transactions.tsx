"use client";

import { useState, useEffect } from "react";
import { Calendar, FileText, Tag, ArrowLeftRight, DollarSign } from "lucide-react";
import { Transaction } from "@/app/types/transaction";
import Badge from "@/app/components/ui/badge";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("api/transactions?limit=5")
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
      })
  }, []);

  return (
    <div className="">
      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-cyan-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cyan-950/40 text-gray-200">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-1"><Calendar size={14}/>Date</div>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-1"><FileText size={14}/>Description</div>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-1"><Tag size={14}/>Category</div>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-1"><ArrowLeftRight size={14}/>Type</div>
                </th>
                <th className="px-4 py-3 font-semibold text-left">
                  <div className="flex items-center gap-1"><DollarSign size={14}/>Amount</div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-cyan-900/30">
              {transactions.map((t) => {
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

                    <td className="px-4 py-3 capitalize">
                      <Badge>{t.category}</Badge>
                    </td>

                    <td
                      className={`px-4 py-3 whitespace-nowrap ${isIncome ? "text-green-300" : "text-red-300"}`}
                    >
                      <Badge>{isIncome ? "Income" : "Expense"}</Badge>
                    </td>

                    <td
                      className={`px-4 py-3 whitespace-nowrap text-left font-bold ${
                        isIncome ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {isIncome ? "+" : "-"}${t.amount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
