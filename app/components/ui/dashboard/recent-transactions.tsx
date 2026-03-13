import Badge from "@/app/components/ui/badge";
import { initialTransactions } from "@/app/lib/data";

export default function RecentTransactions() {
  return (
    <div className="">
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
              {initialTransactions.slice(0, 5).map((t) => {
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
