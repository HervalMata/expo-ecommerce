import {Text, TouchableOpacity, View} from "react-native";
import {Address} from "@/types";
import {Ionicons} from "@expo/vector-icons";

interface AddressCardProps {
    address: Address;
    onEdit: (address: Address) => void;
    onDelete: (addressId: string, label: string) => void;
    isUpdatingAddress: boolean;
    isDeletingAddress: boolean;
}

export default function AddressCard({
    address,
    onEdit,
    onDelete,
    isUpdatingAddress,
    isDeletingAddress,
}: AddressCardProps) {
    return (
        <View className="bg-surface rounded-3xl p-5 mb-3">
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                    <View className="bg-primary/20 rounded-full w-12 h-12 items-center justify-center mr-3">
                        <Ionicons name="location" size={24} color="#B98ECC" />
                    </View>
                    <Text className="text-text-primary font-bold text-lg">{address.label}</Text>
                </View>
                {address.isDefault && (
                    <View className="bg-primary px-3 py-1 rounded-full">
                        <Text className="text-background text-xs font-bold">Padrão</Text>
                    </View>
                )}
            </View>
            <View className="ml-15">
                <Text className="text-text-primary font-semibold mb-1">{address.fullName}</Text>
                <Text className="text-text-secondary text-sm mb-1">{address.streetAddress}</Text>
                <Text className="text-text-secondary text-sm mb-2">{address.city} {address.state} {address.zipCode}</Text>
                <Text className="text-text-secondary text-sm mb-2">{address.country}</Text>
                <Text className="text-text-secondary text-sm">{address.phoneNumber}</Text>
            </View>
            <View className="flex-row mt-4 gap-2">
                <TouchableOpacity
                    className="flex-1 bg-primary/20 py-3 rounde-xl items-center"
                    activeOpacity={0.7}
                    onPress={() => onEdit(address)}
                    disabled={isUpdatingAddress}
                >
                    <Text className="text-primary font-bold">Atualizar Endereço</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 bg-red/20 py-3 rounde-xl items-center"
                    activeOpacity={0.7}
                    onPress={() => onDelete(address._id, address.label)}
                    disabled={isDeletingAddress}
                >
                    <Text className="text-red-500 font-bold">Remover Endereço</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
