import {useApi} from "@/lib/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Product} from "@/types";

const useWishlist = () => {
    const api = useApi();
    const queryClient = useQueryClient();

    const { data: wishlist, isLoading, isError } = useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
            const { data } = await api.get<{ wishlist: Product[] }>("/users/wishlist");
            return data;
        }
    });

    const addToWishlistMutation = useMutation({
        mutationFn: async (productId: string) => {
            const { data } = await api.post<{ wishlist: string[] }>("/users/wishlist", { productId });
            return data.wishlist;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
    });

    const removeFromWishlistMutation = useMutation({
        mutationFn: async (productId: string) => {
            const { data } = await api.delete<{ wishlist: string[] }>(`/users/wishlist/${productId}`);
            return data.wishlist;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
    });

    const isInWishlist = (productId: string) => {
        // @ts-ignore
        //return wishlist?.some((product) => product._id === productId) ?? false;
    }

    const toggleWishlist = (productId: string) => {
        if (isInWishlist(productId)) {
            removeFromWishlistMutation.mutate(productId);
        } else {
            addToWishlistMutation.mutate(productId);
        }
    };

    return {
        isLoading,
        isError,
        addToWishlistMutation: addToWishlistMutation.mutate,
        removeFromWishlistMutation: removeFromWishlistMutation.mutate,
        isAddToWishlist: addToWishlistMutation.isPending,
        isRemoveFromWishlist: removeFromWishlistMutation.isPending,
        toggleWishlist,
        isInWishlist,
        wishlist: wishlist || [],
        // @ts-ignore
        wishlistCount: wishlist?.length || 0,
    }
}

export default useWishlist;
