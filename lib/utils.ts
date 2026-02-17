import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // twMerge = Tailwiind Merge 會以後寫的 className 為優先
  return twMerge(clsx(inputs))
}

export function getRecentNDaysISO(n: number) {
  const end = new Date();
  end.setHours(0, 0, 0, 0);           // 今天 00:00:00
  end.setDate(end.getDate() + 1);     // 明天 00:00:00

  const start = new Date(end);
  start.setDate(start.getDate() - n); // 往前 n 天

  return {
    startISO: start.toISOString(),
    endISO: end.toISOString(),
  };
}

export function getRecentNDaysISOSteps(n: number) {
  const steps = [];
  const end = new Date();
  end.setHours(0, 0, 0, 0);           // 今天 00:00:00
  end.setDate(end.getDate() + 1);     // 明天 00:00:00
  for (let i = n; i >= 0; i--) {
    const date = new Date(end);
    date.setDate(date.getDate() - i);
    steps.push(date.toISOString());
  }
  return steps;
}

export function getLocalDateTimeValue(date = new Date()) {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}