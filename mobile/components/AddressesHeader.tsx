import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

export default function AddressesHeader() {
    return (
        <View className="px-6 pb-5 border-b border-surface flex-row items-center">
            <TouchableOpacity
                className="mr-4"
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text className="text-text-primary text-2xl font-bold">Meus Endereços</Text>
        </View>
    );
}
