'use client';

import RecentRecords from "@/components/RecentRecords";
import { useRecentAverageBloodPressure } from "@/lib/queries/useRecentAverageBloodPressure";
import { useUser } from "@/lib/queries/useUser";

// import TrendChart from '@/components/TrendChart';
// import QuickStats from '@/components/QuickStats';

export default function Dashboard() {
    const user = useUser()

    const { data: averageBP, isLoading: isLoadingABP } = useRecentAverageBloodPressure()
    console.log(averageBP)

    return (
        <main className="bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
            <div className="max-w-6xl mx-auto p-4 space-y-6">
                {/* Greeting */}
                <section>
                    <h1 className="text-2xl font-semibold">早安, {user.data?.user_metadata.name}!</h1>
                    <p className="text-text-muted dark:text-text-muted-dark mt-1">
                        {isLoadingABP ? "正在獲取最近七日血壓..." :
                            !averageBP ? "最近血壓讀取失敗" :
                                averageBP.avg_systolic !== null ?
                                    `最近七日平均血壓${averageBP.avg_systolic.toFixed(0)}/${averageBP.avg_diastolic?.toFixed(0)} mmHg` :
                                    "最近七日無血壓紀錄"
                        }
                    </p>
                </section>

                {/* Quick Stats */}
                <section>
                    {/* <QuickStats /> */}
                </section>

                {/* Trend Chart */}
                <section className="bg-card dark:bg-card-dark rounded-lg p-4 shadow">
                    <h2 className="text-lg font-medium mb-2">血壓趨勢</h2>
                    {/* <TrendChart /> */}
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
