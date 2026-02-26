import {useApi} from "@/lib/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Address} from "@/types";

export const useAddresses = () => {
    const api = useApi();
    const quaryClient = useQueryClient();

    const { data: addresses, isLoading, isError } = useQuery({
        queryKey: ['addresses'],
        queryFn: async () => {
            const { data } = await api.get<{ addresses: Address }>("/api/users/addresses");
            return data.addresses;
        }
    });

    // @ts-ignore
    const addAddressMutation = useMutation({
        mutationFn: async (addressData: Omit<Address, "_id">) => {
            const { data } = await api.post<{ addresses: Address[] }>("/api/users/addresses", addressData);
            return data.addresses;
        },
        // @ts-ignore
        OnSuccess: () => {
            quaryClient.invalidateQueries({ queryKey: ["addresses"]});
        }
    });

    const updateAddressMutation = useMutation({
        mutationFn: async (
            { addressId, addressData }:
            { addressId: string, addressData: Partial<Address>} ) => {
            const { data } = await api.put<{ addresses: Address[] }>(`/api/users/address/${addressId}`, addressData);
            return data.addresses;
        },
        // @ts-ignore
        OnSuccess: () => {
            quaryClient.invalidateQueries({ queryKey: ["addresses"]});
        }
    });

    const deleteAddressMutation = useMutation({
        mutationFn: async (addressId: string) => {
            const { data } = await api.delete<{ addresses: Address[] }>(`/api/users/address/${addressId}`);
            return data.addresses;
        },
        // @ts-ignore
        OnSuccess: () => {
            quaryClient.invalidateQueries({ queryKey: ["addresses"]});
        }
    });
    return {
        addresses: addresses || [],
        isLoading,
        isError,
        addAddress: addAddressMutation,
        updateAddress: updateAddressMutation,
        deleteAddress: deleteAddressMutation,
        isUpdatingAddress: updateAddressMutation.isPending,
        isDeletingAddress: deleteAddressMutation.isPending,
        isAddingAddress: addAddressMutation.isPending,
    }
}
