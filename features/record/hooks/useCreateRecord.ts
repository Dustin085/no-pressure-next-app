import { createRecord } from "@/features/record/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRecord() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createRecord'],
        mutationFn: createRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey[0] === 'blood-pressure-records'
            });
        }
    })
}