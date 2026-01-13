'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle'; // 你之前做的 dark/light toggle
import { ROUTES } from '@/lib/constants/routes';
import { useLogout } from '@/app/hooks/useLogout';

export default function Navbar() {
    const logout = useLogout()

    return (
        <nav className="bg-card dark:bg-card border-b border-border p-4 flex justify-between items-center">
            {/* Logo / Brand */}
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
                <Link href="/">
                    <span className="text-text dark:text-text font-semibold text-lg">
                        NoPressure
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
                <Link href={ROUTES.DASHBOARD} className="text-text-muted hover:text-text">
                    Dashboard
                </Link>
                <Link href={ROUTES.RECORDS} className="text-text-muted hover:text-text">
                    Records
                </Link>
                <Link href={ROUTES.PROFILE} className="text-text-muted hover:text-text">
                    Profile
                </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button onClick={logout} className="px-4 py-2 rounded bg-primary hover:bg-primary-hover text-text">
                    Logout
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button className="p-2 rounded-md hover:bg-primary-hover">
                    {/* 簡單漢堡 icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}