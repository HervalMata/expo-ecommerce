import {useApi} from "@/lib/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {string} from "postcss-selector-parser";
import {Cart} from "@/types";

const useCart = () => {
    const api = useApi();
    const queryClient = useQueryClient();

    const addToCartMutation = useMutation({
        mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity: number} ) => {
            const { data } = await api.post<{ cart: Cart }>("/cart", { productId, quantity });
            return data.cart;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });

    return {
        addToCart: addToCartMutation,
        isAddToCart: addToCartMutation.isPending
    };
}

export default useCart;
