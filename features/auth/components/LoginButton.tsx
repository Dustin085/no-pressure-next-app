import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

type LoginButtonProps = {
    className?: string
}

export function LoginButton({ className }: LoginButtonProps) {
    return (
        <Link href={ROUTES.LOGIN} className={cn(
            "px-4 py-2 rounded bg-primary hover:bg-primary-hover text-text",
            className
        )}>
            登入
        </Link>
    )
}