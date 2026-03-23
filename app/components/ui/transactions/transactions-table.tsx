import { Calendar, FileText, Tag, ArrowLeftRight, DollarSign, Settings, Pencil, Trash2, SearchX } from "lucide-react";
import { Transaction } from "@/app/types/transaction";
import Badge from "@/app/components/ui/badge";

type Props = {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
};

export default function TransactionsTable({ transactions, onEdit, onDelete }: Props) {
  return (
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
              <th className="px-4 py-3 font-semibold">
                <div className="flex items-center gap-1"><Settings size={14}/>Actions</div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-cyan-900/30">
            {transactions.length > 0 ? (
              transactions.map((t) => {
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

                    <td className="px-4 py-3 capitalize"
                    >
                      <Badge>{t.category}</Badge>
                    </td>

                    <td
                      className={`px-4 py-3 whitespace-nowrap ${isIncome ? "text-green-300" : "text-red-300"}`}
                    >
                      <Badge>{isIncome ? "Income" : "Expense"}</Badge>
                    </td>

                    <td
                      className={`px-4 py-3 whitespace-nowrap text-left font-bold ${isIncome ? "text-green-300" : "text-red-300"}`}
                    >
                      {isIncome ? "+" : "-"}${t.amount.toLocaleString()}
                    </td>

                    <td className="flex px-4 py-3 whitespace-nowrap text-left gap-1">
                      <button
                        onClick={() => onEdit(t)}
                        className="rounded-lg border border-blue-900 bg-blue-900/40 p-2 text-sm text-white hover:bg-blue-900/20 transition cursor-pointer"
                      >
                        <Pencil size={14}/>
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
                        className="rounded-lg border border-red-900 bg-red-900/40 p-2 text-sm text-white hover:bg-red-900/20 transition cursor-pointer"
                      >
                        <Trash2 size={14}/>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <SearchX size={20} className="text-gray-400"/>
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
  );
}