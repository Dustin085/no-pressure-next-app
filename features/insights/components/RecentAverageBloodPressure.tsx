import { useRecentAverageBloodPressureText } from "@/features/insights/hooks/useRecentAverageBloodPressureText";

export function RecentAverageBloodPressure() {
    const result = useRecentAverageBloodPressureText();

    if (result.status !== "success") {
        return <p>{result.text}</p>;
    }

    return (
        <p>
            最近 7 天平均
            <br />
            <span className="font-medium">
                {result.payload.systolic} / {result.payload.diastolic}
            </span>
            <span className="text-sm ml-1">
                {result.payload.unit}
            </span>
        </p>
    );
}