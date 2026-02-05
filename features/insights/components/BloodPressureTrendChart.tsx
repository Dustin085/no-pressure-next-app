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

export function BloodPressureTrendChart({ days = 7 }: { days: number }) {
    // step.1 計算時間區間 (ISO)
    const { startISO, endISO } = getRecentNDaysISO(days)

    // step.2 獲取資料
    const { data, isLoading, error } = useRecordsWithinISORange(startISO, endISO)

    // step.3 loading / error / empty
    if (isLoading) return <div>載入中...</div>
    if (error) return <div>載入失敗： {error.message}</div>
    if (!data || data.length === 0) return <div>尚無紀錄</div>;

    // step.4 將資料轉換成 Rechart 可用格式
    // X軸使用 MM/DD ， Y軸用平均血壓值，Tooltips 用當日個別血壓值
    // 4.1 先建立「每天」的骨架（保證即使那天沒資料也會有刻度）
    const daysArray = Array.from({ length: days }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return {
            dateStr: d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }),
            isoDate: d.toISOString().split("T")[0], // "2025-02-03"
        }
    }).reverse() // 從舊 → 新

    // 4.2 按日期分組 + 計算平均
    const dataByDate = data.reduce((acc, record) => {
        const dateKey = new Date(record.measured_at).toISOString().split("T")[0]
        if (!acc[dateKey]) {
            acc[dateKey] = { systolic: [], diastolic: [] }
        }
        acc[dateKey].systolic.push(record.systolic)
        acc[dateKey].diastolic.push(record.diastolic)
        return acc
    }, {} as Record<string, { systolic: number[]; diastolic: number[] }>)

    // 4.3 產生最終 chartData
    const chartData = daysArray.map(({ dateStr, isoDate }) => {
        const dayData = dataByDate[isoDate]
        if (!dayData || dayData.systolic.length === 0) {
            return { date: dateStr, systolic: null, diastolic: null }
        }

        const avgSystolic = dayData.systolic.reduce((a, b) => a + b, 0) / dayData.systolic.length
        const avgDiastolic = dayData.diastolic.reduce((a, b) => a + b, 0) / dayData.diastolic.length

        return {
            date: dateStr,
            systolic: Math.round(avgSystolic),
            diastolic: Math.round(avgDiastolic),
            // 可選：給 Tooltip 用的原始資料
            details: dayData.systolic.length > 1 ? {
                count: dayData.systolic.length,
                systolic: dayData.systolic,
                diastolic: dayData.diastolic,
            } : undefined
        }
    })
    // const chartData = data
    //     .map((record) => ({
    //         date: new Date(record.measured_at).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }),
    //         systolic: record.systolic,
    //         diastolic: record.diastolic,
    //     }))
    //     .reverse()

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (!active || !payload?.[0]) return null
                            const data = payload[0].payload
                            if (!data.systolic) return <div>當天無測量</div>

                            if (data.details) {
                                return (
                                    <div className="bg-background text-foreground p-2 border rounded shadow">
                                        <p>{data.date}</p>
                                        <p>測量次數：{data.details.count} 次</p>
                                        <p>收縮壓：{data.systolic} (平均)</p>
                                        <p>原始值：{data.details.systolic.join(" / ")}</p>
                                        <p>舒張壓：{data.diastolic} (平均)</p>
                                        <p>原始值：{data.details.diastolic.join(" / ")}</p>
                                    </div>
                                )
                            }

                            return (
                                <div className="bg-background text-foreground p-2 border rounded shadow">
                                    <p>{data.date}</p>
                                    <p>收縮壓：{data.systolic}</p>
                                    <p>舒張壓：{data.diastolic}</p>
                                </div>
                            )
                        }}
                    />
                    <Legend verticalAlign="top" />
                    <Line type="monotone" dataKey="systolic" connectNulls={true} stroke="var(--bp-systolic-color)" name="收縮壓" />
                    <Line type="monotone" dataKey="diastolic" connectNulls={true} stroke="var(--bp-diastolic-color)" name="舒張壓" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}