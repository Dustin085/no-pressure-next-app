'use client';

import RecentRecords from "@/components/RecentRecords";
import { LatestRecordTime } from "@/features/insights/components/LatestRecordTime";
import { RecentAverageBloodPressure } from "@/features/insights/components/RecentAverageBloodPressure";
import { useUser } from "@/features/auth/hooks/useUser";
import { BloodPressureTrendChart } from "@/features/insights/components/BloodPressureTrendChart";

// import TrendChart from '@/components/TrendChart';
// import QuickStats from '@/components/QuickStats';

export default function Dashboard() {
    const user = useUser()

    return (
        <main className="bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
            <div className="max-w-6xl mx-auto p-4 space-y-6">
                {/* Greeting */}
                <section>
                    <h1 className="text-2xl font-semibold">您好, {user.data?.user_metadata.name}!</h1>
                </section>

                {/* Summary Card */}
                <section>
                    <section className="bg-card dark:bg-card-dark rounded-lg p-4 shadow">
                        <h2 className="text-lg font-medium mb-2">概要</h2>
                        <div className="p-4">
                            <RecentAverageBloodPressure />
                            <br />
                            <LatestRecordTime />
                        </div>
                    </section>
                </section>

                {/* Trend Chart */}
                <section className="bg-card dark:bg-card-dark rounded-lg p-4 shadow">
                    <h2 className="text-lg font-medium mb-2">血壓趨勢</h2>
                    <BloodPressureTrendChart />
                </section>

                {/* Recent Records */}
                <section className="bg-card dark:bg-card-dark rounded-lg p-4 shadow">
                    <h2 className="text-lg font-medium mb-2">最近紀錄</h2>
                    <RecentRecords />
                    <div className="mt-4 text-right">
                        <button className="px-4 py-2 rounded bg-primary hover:bg-primary-hover text-white">
                            查看全部紀錄
                        </button>
                    </div>
                </section>

                {/* <button onClick={() => {
                    mutation.mutate({
                        systolic: 123,
                        diastolic: 84,
                        pulse: 80,
                        measured_at: new Date().toISOString(),
                    });
                }}>
                    New Record
                </button> */}
            </div>
        </main>
    );
}
