import {View, Text, Alert, TouchableOpacity, Image, FlatList, ActivityIndicator} from "react-native";
import {Product} from "@/types";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import {Ionicons} from "@expo/vector-icons";

interface ProductsGridProps {
    isLoading: boolean;
    isError: boolean;
    products: Product[];
}

const ProductsGrid = ({ products, isLoading, isError }: ProductsGridProps) => {
    const { isInWishlist, toggleWishlist, isAddToWishlist, isRemoveFromWishlist } = useWishlist();
    const { isAddToCart, addToCart } = useCart();

    const handleAddToCart = (productid: string, productName: string) => {
        // @ts-ignore
        addToCart(
            { productid, quantity: 1 },
            {
                onSuccess: () => {
                    Alert.alert("Sucesso", `${productName} adcionado com sucesso!"`)
                },
                onError: (error: any) => {
                    Alert.alert("Erro", error?.response?.data?.error || "Falha em adicionar ao carrinho");
                },
            }
        );
    };

    const renderProduct = ({ item: product}: { item: Product }) => (
        <TouchableOpacity
            className="bg-surface rounded-3xl overflow-hidden mb-3"
            style={{ width: "48%" }}
            activeOpacity={0.8}
        >
            <View className="relative">
                <Image
                    source={{ uri: product.images[0] }}
                    className="w-full h-44 bg-background-lighter"
                    resizeMode="cover"
                />

                <TouchableOpacity
                    className="absolute top-3 right-3 bg-black/30 backdrop-blur-xl p-2 rounded-full"
                    activeOpacity={0.7}
                    onPress={() => toggleWishlist(product._id)}
                    disabled={isAddToWishlist || isRemoveFromWishlist}
                >
                    {isAddToWishlist || isRemoveFromWishlist ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Ionicons
                            name={isInWishlist(product._id) ? "heart" : "heart-outline"}
                            size={18}
                            color={isInWishlist(product._id) ? "#FF6868" : "#FFFFFF"}
                        />
                    )}
                </TouchableOpacity>
            </View>

            <View className="p-3">
                <Text className="text-text-secondary text-xs mb-1">
                    {product.category}
                </Text>
                <Text className="text-text-primary text-sm mb-2">
                    {product.name}
                </Text>

                <View className="flex-row items-center mb-2">
                    <Ionicons name="star" size={12} color="#FFC107" />
                    <Text className="text-text-primary text-xs font-semibold ml-1">
                        {product.averageRating.toFixed(1)}
                    </Text>
                    <Text className="text-text-secondary text-xs ml-1">
                        ({product.totalReviews})
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-text-primary font-bold text-lg">
                        R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </Text>

                    <TouchableOpacity
                        className="bg-primary rounded-full w-8 h-8 items-center justify-center"
                        activeOpacity={0.7}
                        onPress={() => handleAddToCart(product._id, product.name)}
                        disabled={isAddToCart}
                    >
                        {isAddToCart ? (
                            <ActivityIndicator size="small" color="#121212" />
                        ) : (
                            <Ionicons
                                name="add"
                                size={18}
                                color="#121212"
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View className="py-20 items-center justify-center">
                <ActivityIndicator size="small" color="#121212" />
                <Text className="text-text-secondary mt-4">Carregando Produtos...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="py-20 items-center justify-center">
                <Ionicons name="alert-circle-outline" size={48} color="#FF6868" />
                <Text className="text-text-primary font-semibold mt-4">Falha ao Carregar Produtos</Text>
                <Text className="text-text-secondary mt-4">Tente novamente mais tarde</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListEmptyComponent={NoProductsFound}
        />
    )
}

export default ProductsGrid;

function NoProductsFound() {
    return (
        <View className="py-20 items-center justify-center">
            <Ionicons name="search-outline" size={48} color={"#666"} />
            <Text className="text-text-primary font-semibold mt-4">Nenhum Produto Encontrado.</Text>
            <Text className="text-text-secondary text-sm mt-2">Tente melhorar seus filtros</Text>
        </View>
    )
}
