import { createRecord } from "@/lib/api/records";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRecord() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createRecord'],
        mutationFn: createRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['records'] });
        }
    })
}