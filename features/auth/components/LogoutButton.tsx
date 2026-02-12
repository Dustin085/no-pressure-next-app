'use client'

import { useLogout } from "@/features/auth/hooks/useLogout"
import { cn } from "@/lib/utils"

type LogoutButtonProps = {
    className?: string
}

export function LogoutButton({ className }: LogoutButtonProps) {
    const logout = useLogout()

    return (
        <button onClick={logout} className={cn(
            "px-4 py-2 rounded bg-primary hover:bg-primary-hover text-text",
            className
        )}>
            登出
        </button>
    )
}