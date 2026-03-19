"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Transaction } from "@/app/types/transaction";

type Props = {
    transactions: Transaction[];
}

export default function MonthlyChart({ transactions }: Props) {
    const chartData = transactions.reduce((accumulator, transaction) => {
        const month = new Date(transaction.date).toLocaleDateString("en-US", { month: "short" });

        if (!accumulator[month]) {
            accumulator[month] = { Month: month, Income: 0, Expenses: 0 };
        }
        
        if (transaction.type === "income") {
            accumulator[month].Income += transaction.amount;
        } else {
            accumulator[month].Expenses += transaction.amount;
        }
        return accumulator;
    }, {} as Record<string, { Month: string, Income: number, Expenses: number }>);

    const chartDataArray = Object.values(chartData);
    const monthOrder = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    chartDataArray.sort((a, b) => monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month));

    return (
        <>
            <div className="rounded-xl border border-cyan-900/40 bg-gray-950/20 p-6 mt-5 mb-5">
                <h2 className="text-lg font-bold mb-4">Monthly Overview</h2>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartDataArray}>
                            <XAxis dataKey="Month" stroke="#9ca3af" tick={{ fontSize: 14 }} />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 14 }} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                formatter={(value) => `$${value?.toLocaleString()}`}
                                cursor={{ fill: "#083344", opacity: 0.3}}
                                contentStyle={{
                                    backgroundColor: "#020617",
                                    border: "1px solid #164e63",
                                    borderRadius: "10px",
                                    color: "#e5e7eb",
                                    fontSize: "14px"
                                }}
                            />
                            <Legend
                                wrapperStyle={{
                                    color: "#9ca3af",
                                    fontSize: "13px"
                                }}
                            />

                            <Bar dataKey="Income" fill="#22c55e" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="Expenses" fill="#ef4444" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}