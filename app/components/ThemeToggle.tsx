'use client';
import { useEffect, useEffectEvent, useState } from 'react';

export default function ThemeToggle() {
    // 先預設為 undefined，避免 server render 與 client mismatch
    const [dark, setDark] = useState<boolean | undefined>(undefined);

    const updateDark = useEffectEvent(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDark(prefersDark);
        document.documentElement.classList.toggle('dark', prefersDark);
    })

    useEffect(() => {
        updateDark()
    }, []);

    // 等 client 計算完前，不渲染
    if (dark === undefined) return null;

    return (
        <button
            onClick={() => {
                const newDark = !dark;
                setDark(newDark);
                document.documentElement.classList.toggle('dark', newDark);
            }}
            className="px-4 py-2 rounded bg-primary text-text"
        >
            {dark ? 'Light' : 'Dark'}
        </button>
    );
}
