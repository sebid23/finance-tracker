import Separator from "@/app/components/ui/separator";
import StatCard from "@/app/components/ui/stat-card";
import MonthlyChart from "@/app/components/ui/dashboard/monthly-chart";
import RecentTransactions from "@/app/components/ui/dashboard/recent-transactions";

const stats = [
  { title: "Total Income", value: "$3,000", border: "border-green-700", color: "bg-green-900/80" },
  { title: "Total Expenses", value: "-$1,120", border: "border-red-700", color: "bg-red-900/80" },
  { title: "Current Balance", value: "$1,880", border: "border-blue-700", color: "bg-blue-900/80" }
]

export default function Home() {
  return (
    // Dashboard Content
    <div className="py-6">

      {/* Overview Section */}
      <span className="text-lg font-bold">Overview</span>

      {/* Separator */}
      <Separator/>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5 mb-5 px-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <span className="text-lg font-bold">Analytics</span>

      {/* Separator */}
      <Separator/>

      {/* Chart */}

      <MonthlyChart />

      {/* Recent Transactions Section */}
      <span className="text-lg font-bold">Recent Transactions</span>

      {/* Separator */}
      <Separator/>

      {/* Table Header */}
      <div className="flex items-center justify-between mt-5">
          <div className="text-sm text-gray-300/80">Latest activity across your accounts</div>
      </div>

      <RecentTransactions />

      {/* Table Footer hint */}
      <div className="mt-3 text-xs text-gray-400">
        Tip: View all transactions from the Transactions page.
      </div>

    </div>
  );
}