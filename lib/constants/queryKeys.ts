const QUERY_DOMAIN = {
    user: 'user' as const,
    records: 'blood-pressure-records' as const,
    public: 'public' as const,
    settings: 'settings' as const,
}

export const QUERY_KEYS = {
    user: [QUERY_DOMAIN.user] as const,
    records: {
        all: [QUERY_DOMAIN.records] as const,
        recent: (days: number) => [QUERY_DOMAIN.records, { days }] as const,
    },
    public: [QUERY_DOMAIN.public] as const,
    settings: [QUERY_DOMAIN.settings] as const,
};
