export const ROUTES = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    RECORDS: '/records',
    PROFILE: '/profile',
    ONBOARDING: '/onboarding',
    AUTH_CALLBACK: '/auth/callback',
    AUTH_ERROR: '/auth/auth-code-error',
} as const

export const PUBLIC_PATHS = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
    '/',              // 請確認根路徑是否是公開頁
    '/auth',          // 包含 /auth/callback 等子路徑
    '/check-email',
    // 如果有其他公開頁面，例如about、privacy 等，可加在這裡
    // '/about',
] as const