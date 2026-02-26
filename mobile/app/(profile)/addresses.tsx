import {View, Text, Alert, TouchableOpacity, ActivityIndicator, ScrollView} from "react-native";
import {useState} from "react";
import {useAddresses} from "@/hooks/useAddresses";
import {Address} from "@/types";
import SafeScreen from "@/components/SafeScreen";
import AddressesHeader from "@/components/AddressesHeader";
import {Ionicons} from "@expo/vector-icons";
import AddressCard from "@/components/AddressCard";
import AddressFormModal from "@/components/AddressFormModal";

function AddressesScreen() {
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
    const [addressForm, setAddressForm] = useState({
        label: '',
        fullName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: '',
        isDefault: false,
    });

    const {
        addAddress,
        addresses,
        deleteAddress,
        updateAddress,
        isLoading,
        isError,
        isDeletingAddress,
        isUpdatingAddress,
        isAddingAddress,
    } = useAddresses();

    const handleAddAddress = () => {
        setShowAddressForm(true);
        setEditingAddressId(null);
        setAddressForm({
            label: '',
            fullName: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phoneNumber: '',
            isDefault: false,
        });
    };

    const handleEditAddress = (address: Address) => {
        setShowAddressForm(true);
        setEditingAddressId(address._id);
        setAddressForm({
            label: address.label,
            fullName: address.fullName,
            streetAddress: address.streetAddress,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country,
            phoneNumber: address.phoneNumber,
            isDefault: address.isDefault,
        });
    };

    const handleDeleteAddress = (addressId: string, label: string) => {
        Alert.alert("Remover Endereço", `Você tem certeza que quer remover ${label}`, [
            { text: "Cancelar", style: "cancel" },
            { text: "Remover", style: "destructive",
                // @ts-ignore
                onPress: () => deleteAddress(addressId) },
        ]);
    };

    const handleSaveAddress = () => {
        if (
            !addressForm.label ||
            !addressForm.fullName ||
            !addressForm.streetAddress ||
            !addressForm.city ||
            !addressForm.state ||
            !addressForm.zipCode ||
            !addressForm.country ||
            !addressForm.phoneNumber
        ) {
            Alert.alert("Erro", "Por favor preencha todos los campos");
            return;
        }

        if (editingAddressId) {
            // @ts-ignore
            updateAddress(
                {
                    addressId: editingAddressId,
                    addressData: addressForm,
                },
                {
                    onSuccess: () => {
                        setShowAddressForm(false);
                        setEditingAddressId(null);
                        Alert.alert("Sucesso!", "Endereço atualizado com sucesso");
                    },
                    onError: (error: any) => {
                        Alert.alert("Erro!", error?.response?.data?.error || "Falha ao atualizar o endereço");
                    },
                }
            );
        } else {
            // @ts-ignore
            addAddress(addressForm, {
                onSuccess: () => {
                    setShowAddressForm(false);
                    Alert.alert("Sucesso!", "Endereço adicionado com sucesso");
                },
                onError: (error: any) => {
                    Alert.alert("Erro!", error?.response?.data?.error || "Falha ao adicionar o endereço");
                },
            });
        }
    }

    const handleCloseAddressForm = () => {
        setEditingAddressId(null);
        setShowAddressForm(false);
    };

    if (isLoading) return <LoadingUI />;
    if (!isError) return <ErrorUI />;

    return (
        <SafeScreen>
            <AddressesHeader />

            {
                // ts-ignore
                addresses.length !== 0 ? (
                    <View className="flex-1 items-center justify-center px-6">
                        <Ionicons name="locate-outline" size={80} color="#666" />
                        <Text className="text-text-primary font-semibold text-xl mt-4">Nenhum Endereço ainda cadastrado.</Text>
                        <Text className="text-text-secondary text-center mt-2">Adicione seu primeiro Endereço</Text>
                        <TouchableOpacity
                            className="bg-primary rounded-2xl px-8 py-4 mt-6"
                            activeOpacity={0.8}
                            onPress={handleAddAddress}
                        >
                            <Text className="text-background font-bold text-base">Adicionar Endereço</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <ScrollView
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100}}
                    >
                        <View className="px-6 py-4">
                            {
                                // ts-ignore
                                addresses.map((address: Address) => (
                                <AddressCard
                                    key={address._id}
                                    address={address}
                                    onEdit={handleEditAddress}
                                    onDelete={handleDeleteAddress}
                                    isUpdatingAddress={isUpdatingAddress}
                                    isDeletingAddress={isDeletingAddress}
                                />
                            ))}

                            <TouchableOpacity
                                className="bg-primary rounded-2xl py-4 items-center mt-2"
                                activeOpacity={0.8}
                                onPress={handleAddAddress}
                            >
                                <View className="flex-row items-center">
                                    <Ionicons name="add-circle-outline" size={24} color="#121212" />
                                    <Text className="text-background font-bold text-base ml-2">Adicionar Novo Endereço</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}

            <AddressFormModal
                visible={showAddressForm}
                isEditing={!!editingAddressId}
                addressForm={addressForm}
                isAddingAddress={isAddingAddress}
                isUpdatingAddress={isUpdatingAddress}
                onClose={handleCloseAddressForm}
                onSave={handleSaveAddress}
                onFormChange={setAddressForm}
            />
        </SafeScreen>
    );
}

export default AddressesScreen;

function LoadingUI() {
    return (
        <SafeScreen>
            <AddressesHeader />
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#00D9FF" />
                <Text className="text-text-secondary text-center mt-4">Carregando sua Lista de Endereços...</Text>
            </View>
        </SafeScreen>
    );
}

function ErrorUI() {
    return (
        <SafeScreen>
            <AddressesHeader />
            <View className="flex-1 items-center justify-center px-8">
                <Ionicons name="alert-circle-outline" size={64} color="#FF6868" />
                <Text className="text-text-primary font-semibold text-xl mt-4">Falha ao Carregar sua Lista de Endereços</Text>
                <Text className="text-text-secondary text-center mt-2">Por favor check sua conexão e tente novamente.</Text>
            </View>
        </SafeScreen>
    );
}
