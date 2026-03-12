"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
    { Month: "Jan", Income: 2400, Expenses: 1800 },
    { Month: "Feb", Income: 2800, Expenses: 1900 },
    { Month: "Mar", Income: 3000, Expenses: 1120 },
    { Month: "Apr", Income: 5000, Expenses: 2120 },
    { Month: "May", Income: 4000, Expenses: 1500 },
]

export default function MonthlyChart() {
    return (
        <>
            <div className="rounded-xl border border-cyan-900/40 bg-gray-950/20 p-6 mt-5 mb-5">
                <h2 className="text-lg font-bold mb-4">Monthly Overview</h2>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
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