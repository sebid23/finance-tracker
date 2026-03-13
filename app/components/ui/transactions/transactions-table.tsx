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
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold text-left">Amount</th>
              <th className="px-4 py-3 font-semibold text-left">Actions</th>
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

                    <td className="px-4 py-3">{t.category}</td>

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
                        className="rounded-lg border border-blue-900 bg-blue-900/40 px-2 py-1 text-sm text-white hover:bg-blue-900/20 transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
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
                <td colSpan={6} className="px-4 py-10 text-center">
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
  );
}