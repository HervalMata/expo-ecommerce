import SafeScreen from "@/components/SafeScreen";
import { ScrollView, Text, TouchableOpacity, View} from "react-native";
import { Image } from "expo-image";
import {useAuth, useUser} from "@clerk/clerk-expo";
import {Ionicons} from "@expo/vector-icons";
import { router } from "expo-router";

const MENU_ITEMS = [
    { id: 1, icon: "person-outline", title: "Editar Perfil", color: "#3B82F6", action: "/profile" },
    { id: 2, icon: "list-outline", title: "Minhas Ordens", color: "#108981", action: "/orders" },
    { id: 3, icon: "location-outline", title: "Meus Endereços", color: "#F59E0B", action: "/addresses" },
    { id: 4, icon: "heart-outline", title: "Lista de Desejos", color: "#EF4444", action: "/wishlist" },
];

const ProfileScreen = () => {
    const { signOut } = useAuth();
    const { user } = useUser();

    const handleMenuPress = (action: (typeof MENU_ITEMS)[number]["action"]) =>
    {
         if (action === "/profile") return;
         // @ts-ignore
         router.push(action);
    }

    return (
        <SafeScreen>
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                {/* Header */ }
                <View className="px-6 pb-8">
                    <View className="bg-surface rounded-3xl p-6">
                        <View className="flex-row items-center">
                            <View className="relative">
                                <Image
                                    // @ts-ignore
                                    source={user?.imageUrl}
                                    style={{ width: 80, height: 80, borderRadius: 40 }}
                                    transition={200}
                                />
                                <View className="absolute -bottom-1 -right-1 bg-primary rounded-full size-7 items-center justify-center border-2 border-surface">
                                    <Ionicons name="checkmark" size={16} color="#121212" />
                                </View>
                            </View>
                            <View className="flex-1 ml-4">
                                <Text className="text-text-primary text-2xl font-bold mb-1">
                                    {user?.firstName} {user?.lastName}
                                </Text>
                                <Text className="text-text-secondary text-sm">
                                    {user?.emailAddresses[0].emailAddress}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="flex-row flex-wrap gap-2 mx-6 mb-3">
                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            className="bg-surface rounded-2xl p-6 items-center justify-center"
                            style={{ width: "48%" }}
                            activeOpacity={0.7}
                            onPress={() => handleMenuPress(item.action)}
                        >
                            <View
                                className="rounded-full w-16 h-16 items-center justify-center mb-4"
                                style={{ backgroundColor: item.color + "20" }}
                            >
                                <Ionicons
                                    // @ts-ignore
                                    name={item.icon as any}
                                    size={36}
                                    color={item.color}
                                />
                            </View>
                            <Text className="text-text-primary font-bold text-base">{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Notifications Button */ }
                <View className="mb-3 mx-6 bg-surface rounded-2xl p-4">
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-2"
                        activeOpacity={0.7}
                    >
                        <View className="flex-row items-center">
                            <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
                            <Text className="text-text-primary font-semibold ml-3">Notificações</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Privacy And Security Link */}
                <View className="mb-3 mx-6 bg-surface rounded-2xl p-4">
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-2"
                        activeOpacity={0.7}
                        // @ts-ignore
                        onPress={() => router.push("/privacy-security")}
                    >
                        <View className="flex-row items-center">
                            <Ionicons name="shield-checkmark-outline" size={22} color="#FFFFFF" />
                            <Text className="text-text-primary font-semibold ml-3">Privacidade e Segurança</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* SignOut Button */}
                <TouchableOpacity
                    className="mb-3 mx-6 bg-surface rounded-2xl py-5 flex-row items-center justify-center border-2 border-red-500/20"
                    activeOpacity={0.8}
                    onPress={() => signOut()}
                >
                    <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                    <Text className="text-red-500 font-bold text-base ml-2">Sair</Text>
                </TouchableOpacity>

                <Text className="mx-6 mb-3 text-center text-text-secondary text-xs">Versão 1.0.0</Text>
            </ScrollView>

        </SafeScreen>
    );
};

export default ProfileScreen;
