'use client';

import { useRecentRecords } from '@/lib/queries/useRecentRecords';

export default function RecentRecords() {
    const { data, isLoading, error } = useRecentRecords(5);

    if (isLoading) return <div className="text-muted">載入中...</div>;
    if (error) return <div className="text-error">載入失敗</div>;
    if (!data || data.length === 0)
        return <div className="text-muted">尚無紀錄</div>;

    return (
        <div className="rounded-2xl bg-card p-4 shadow-sm">
            {/* <h2 className="text-lg font-semibold mb-3">最近紀錄</h2> */}
            <ul className="space-y-2">
                {data.map((r) => (
                    <li
                        key={r.id}
                        className="flex justify-between items-center border-b border-border pb-2 last:border-none"
                    >
                        <div>
                            <div className="font-medium">
                                {r.systolic} / {r.diastolic}
                                <span className="text-sm text-muted ml-1">mmHg</span>
                            </div>
                            <div className="text-xs text-muted">
                                {new Date(r.measured_at).toLocaleString()}
                            </div>
                        </div>
                        {r.pulse && (
                            <div className="text-sm text-muted">❤️ {r.pulse}</div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
