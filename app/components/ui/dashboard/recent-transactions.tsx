import Badge from "@/app/components/ui/badge";

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
                <th className="px-4 py-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-cyan-900/30">
              {transactions.slice(0, 5).map((t) => {
                const isIncome = t.type === "income"
                return (
                  <tr key={t.id} className="bg-gray-950/20 hover:bg-cyan-950/20 transition">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-200/90">{t.date}</td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-100">{t.description}</div>
                      <div className="text-xs text-gray-400">Status: Completed</div>
                    </td>

                    <td className="px-4 py-3">
                      <Badge>{t.category}</Badge>
                    </td>

                    <td
                      className={`px-4 py-3 whitespace-nowrap text-right font-bold ${
                        isIncome ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {isIncome ? "+" : "-"}${t.amount.toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}