import { useRecentRecords } from "@/lib/queries/useRecentRecords";

export function LatestRecordTime() {
    const { data, isLoading, error } = useRecentRecords(1)

    if (isLoading) return <div className="">載入中...</div>;
    if (error) return <div className="text-error">載入失敗</div>;
    
    const latestRecord = data?.[0];
    if (!latestRecord) return <div className="">尚無紀錄</div>;

    const text = new Date(data[0].measured_at).toLocaleString()

    return (
        <p>最後一次 : {text}</p>
    )
}