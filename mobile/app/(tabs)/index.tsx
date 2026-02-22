import SafeScreen from "@/components/SafeScreen";
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useMemo, useState} from "react";
import useProducts from "@/hooks/useProducts";
import * as Sentry from "@sentry/react-native";
import ProductsGrid from "@/components/ProductsGrid";

const CATEGORIES = [
    { name: "Todas", icon: 'grid-outline' as const },
    { name: "Eletronicos", image: require('../../assets/images/electronics.png') },
    { name: "Moda", image: require('../../assets/images/fashion.png') },
    { name: "Esportes", image: require('../../assets/images/sports.png') },
    { name: "Livros", image: require('../../assets/images/books.png') },
];

const ShopScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    const { data: products, isLoading, isError } = useProducts();

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = products;

        if (selectedCategory !== "Todas") {
            // @ts-ignore
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        if (searchQuery.trim()) {
            // @ts-ignore
            filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return filtered;
    }, [products, selectedCategory, searchQuery])

    return (
        <SafeScreen>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="px-6 pb-4 pt-6">
                    <View className="flex-row items-center justify-between mb-6">
                        <View>
                            <Text className="text-text-primary text-3xl font-bold tracking-tight">Loja</Text>
                            <Text className="text-text-secondary text-sm mt-1">Mostrando Todos os Produtos</Text>
                        </View>
                        <TouchableOpacity
                            className="bg-surface/50 p-3 rounded-full"
                            activeOpacity={0.7}
                        >
                            <Ionicons name="options-outline" size={22} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                    {/* Search */}
                    <View className="bg-surface flex-row items-center px-5 py-4 rounded-2xl">
                        <Ionicons name="search" size={22} color={"#666"} />
                        <TextInput
                            placeholder="Buscar"
                            placeholderTextColor={"#666"}
                            className="flex-1 ml-3 text-base text-text-primary"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>
                {/* Category Filter */}
                <View className="mb-6">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    >
                        {CATEGORIES.map((category) => {
                            const isSelected = selectedCategory === category.name;

                            return (
                                <TouchableOpacity
                                    key={category.name}
                                    onPress={() => setSelectedCategory(category.name)}
                                    className={`mr-3 rounded-2xl size-20 overflow-hidden items-center justify-center ${
                                        isSelected ? "bg-primary" : "bg-surface"
                                    }`}
                                >
                                    {category.icon ? (
                                        // @ts-ignore
                                        <Ionicons name={category.icon} size={36} color={isSelected ? "#121212" : "#fff"} />
                                    ) : (
                                        <Image source={category.image} className="size-12" resizeMode="contain" />
                                    )}
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>

                <View className="px-6 mb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-text-primary text-lg font-bold">Produtos</Text>
                        <Text className="text-text-secondary text-sm">
                            {
                                // @ts-ignore
                                filteredProducts.length
                            } Itens
                        </Text>
                    </View>

                    {/* Products Grid*/}
                    <ProductsGrid
                        // @ts-ignore
                        products={filteredProducts} isLoading={isLoading} isError={isError} />
                </View>
            </ScrollView>
        </SafeScreen>
    )
}

export default ShopScreen;
