import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRecentNDaysISO(n: number) {
  const today = new Date();
  const endISO = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
  const startISO = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (n - 1)).toISOString();
  return { startISO, endISO };
}