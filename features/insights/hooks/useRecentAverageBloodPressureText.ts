import { useRecentAverageBloodPressure } from "@/features/insights/hooks/useRecentAverageBloodPressure";

type ABPSuccessPayload = {
    systolic: number;
    diastolic: number;
    unit: "mmHg";
};

type ABPResult =
    | { status: "loading"; text: string }
    | { status: "error"; text: string }
    | { status: "empty"; text: string }
    | { status: "success"; payload: ABPSuccessPayload };

export function useRecentAverageBloodPressureText(): ABPResult {
    const { data, isLoading, isError } = useRecentAverageBloodPressure();

    if (isLoading) {
        return { status: 'loading', text: "正在獲取最近七日血壓..." };
    }

    if (isError) {
        return { status: 'error', text: "最近血壓讀取失敗" };
    }

    if (!data || data.avg_systolic === null || data.avg_diastolic === null) {
        return { status: 'empty', text: "最近七日無血壓紀錄" };
    }

    return {
        status: 'success',
        payload: {
            systolic: Math.round(data.avg_systolic),
            diastolic: Math.round(data.avg_diastolic),
            unit: "mmHg"
        }
    };
}