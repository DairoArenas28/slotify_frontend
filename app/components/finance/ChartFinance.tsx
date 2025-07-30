"use client"
import { ChartDataListSchema } from "@/src/schemas";
import React, { PureComponent } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from "./CustomTooltip";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { formatHumanDate } from "@/src/utils";

export default function ChartFinance() {
    const { finance, date, type } = useFinanceStore();

    return (
        <div className="bg-white w-full h-80 max-w-6xl mx-auto p-6 rounded-2xl shadow-md border border-gray-200">
            <p className="mb-5">Ingresos del {type === "day" ? formatHumanDate(date.toLocaleDateString(), "/", "full") : formatHumanDate(date.toLocaleDateString(), "/", "monthYear", "YMD")}</p>
            <ResponsiveContainer>
                <LineChart
                    data={finance?.chartData ?? []}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}