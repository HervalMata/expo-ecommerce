import {View, Text, Alert, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import SafeScreen from "@/components/SafeScreen";
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

function WishlistScreen() {
    const { wishlist, isLoading, isError, removeFromWishlistMutation, isRemoveFromWishlist } = useWishlist();
    const { addToCart, isAddToCart } = useCart();

    const handleRemoveFromWishlist = (productId: string, productName: string) => {
        Alert.alert("Remover da Lista de desejos", `Remover ${productName} da lista de desejos`, [
            { text: "Cancelar", style: "cancel" },
            { text: "Remover", style: "destructive", onPress: () => removeFromWishlistMutation(productId) },
        ]);
    };

    const handleAddToCart = (productId: string, productName: string) => {
        // @ts-ignore
        addToCart(
            {
                productId, quantity: 1
            },
            {
                onSuccess: () => Alert.alert("Sucesso", `${productName} adicionado com sucesso!`),
                onError: (error: any) => {
                    Alert.alert("Erro", error?.response?.data?.error || "Falha ao adicionar para o carrinho");
                },
            }
        );
    };

    if (isLoading) return <LoadingUI />
    if (isError) return <ErrorUI />

    return (
        <SafeScreen>
            {/* Header */}
            <View className="px-6 pb-5 border-b border-surface flex-row items-center">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-text-primary text-2xl font-bold">Lista de Desejos</Text>
                <Text className="text-text-secondary text-sm ml-auto">
                    {
                        // @ts-ignore
                        wishlist.length
                    } {
                    // @ts-ignore
                        wishlist.length < 2 ? "item" : "itens"
                    }
                </Text>

            </View>


            {
                // @ts-ignore
                wishlist.length === 0 ? (
                <View className="flex-1 items-center justify-center px-6">
                    <Ionicons name="heart-outline" size={80} color="#FFFFFF" />
                    <Text className="text-text-primary font-semibold text-xl mt-4">Sua Lista de Desejos está vazia.</Text>
                    <Text className="text-text-secondary text-center mt-2">Comece a adicionar produtos que você ama!</Text>
                    <TouchableOpacity
                        className="bg-primary rounded-2xl px-8 py-4 mt-6"
                        activeOpacity={0.8}
                        onPress={() => router.push("/(tabs)")}
                    >
                        <Text className="text-background font-bold text-base">Escolha os produtos</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View className="px-6 py-4">
                        {
                            // @ts-ignore
                            wishlist.map((item: any) => (
                            <TouchableOpacity
                                key={item._id}
                                className="bg-surface rounded-3xl overflow-hidden mb-3"
                                activeOpacity={0.8}
                            >
                                <View className="flex-row p-4">
                                    <Image
                                        source={item.images[0]}
                                        className="rounded-2xl bg-background-lighter"
                                        style={{ width: 96, height: 96, borderRadius: 8 }}
                                    />
                                    <View className="flex-1 ml-4">
                                        <Text className="text-text-primary font-bold text-base mb-2">{item.name}</Text>
                                        <Text className="text-primary font-bold text-xl mb-2">
                                            R$ {item.price.toLocaleString("pt-BR", {})}
                                        </Text>
                                        {item.stock > 0 ? (
                                            <View className="flex-row items-center">
                                                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                                                <Text className="text-green-500 text-sm font-semibold">
                                                    {item.stock} em Estoque
                                                </Text>
                                            </View>
                                        ) : (
                                            <View className="flex-row items-center">
                                                <View className="w-2 h-2 bg-red-500 rounded-full mr-2"/>
                                                <Text className="text-red-500 text-sm font-semibold" >Fora de Estoque</Text>
                                            </View>
                                        )}
                                    </View>

                                    <TouchableOpacity
                                        className="self-start bg-red-500/20 rounded-full"
                                        activeOpacity={0.7}
                                        onPress={() => handleRemoveFromWishlist(item._id, item.name)}
                                        disabled={isRemoveFromWishlist}
                                    >
                                        <Ionicons name="trash-outline" size={20} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>

                                {item.stock > 0 && (
                                    <View className="px-4 pb-4">
                                        <TouchableOpacity
                                            className="bg-primary rounded-xl py-3 items-center"
                                            activeOpacity={0.8}
                                            onPress={() => handleAddToCart(item._id, item.name)}
                                            disabled={isAddToCart}
                                        >
                                            {isAddToCart ? (
                                                <ActivityIndicator size="small" color="#121212" />
                                            ) : (
                                                <Text className="text-background font-bold">Adicionar para o Carrinho</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeScreen>
    );
}

export default WishlistScreen;

function LoadingUI() {
    return (
        <SafeScreen>
            <View className="px-6 pb-5 border-b border-surface flex-row items-center">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mr-4"
                >
                    <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-text-primary text-2xl font-bold">Lista de Desejos</Text>
            </View>
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#00D9FF" />
                <Text className="text-text-secondary text-center mt-4">Carregando sua Lista de Desejos...</Text>
            </View>
        </SafeScreen>
    );
}

function ErrorUI() {
    return (
        <SafeScreen>
            <View className="px-6 pb-5 border-b border-surface flex-row items-center">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mr-4"
                >
                    <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-text-primary text-2xl font-bold">Lista de Desejos</Text>
            </View>
            <View className="flex-1 items-center justify-center px-8">
                <Ionicons name="alert-circle-outline" size={64} color="#FF6868" />
                <Text className="text-text-primary font-semibold text-xl mt-4">Falha ao Carregar sua Lista de Desejos</Text>
                <Text className="text-text-secondary text-center mt-2">Por favor check sua conexão e tente novamente.</Text>
            </View>
        </SafeScreen>
    );
}
