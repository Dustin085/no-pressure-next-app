import { useRecordsWithinISORange } from "@/features/records/hooks/useRecordsWithinISORange"
import { getRecentNDaysISO } from "@/lib/utils"
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

export function BloodPressureTrendChart() {
    // step.1 計算時間區間 (ISO)
    const { startISO, endISO } = getRecentNDaysISO(7)

    // step.2 獲取資料
    const { data, isLoading, error } = useRecordsWithinISORange(startISO, endISO)

    // step.3 loading / error / empty
    if (isLoading) return <div>載入中...</div>
    if (error) return <div>載入失敗： {error.message}</div>
    if (!data || data.length === 0) return <div>尚無紀錄</div>;

    // step.4 將資料轉換成 Rechart 可用格式
    // X軸使用 MM/DD ， Y軸用血壓值
    const chartData = data
        .map((record) => ({
            date: new Date(record.measured_at).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }),
            systolic: record.systolic,
            diastolic: record.diastolic,
        }))
        .reverse()
    
    const root = document.documentElement;
    const systolicColor = getComputedStyle(root).getPropertyValue('--bp-systolic-color').trim();
    const diastolicColor = getComputedStyle(root).getPropertyValue('--bp-diastolic-color').trim();
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line type="monotone" dataKey="systolic" stroke={systolicColor} name="收縮壓" />
                    <Line type="monotone" dataKey="diastolic" stroke={diastolicColor} name="舒張壓" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}