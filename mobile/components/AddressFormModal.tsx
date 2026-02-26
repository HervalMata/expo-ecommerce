import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import SafeScreen from "@/components/SafeScreen";
import {Ionicons} from "@expo/vector-icons";

interface AddressFormData {
    label: string;
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
    isDefault: boolean;
}

interface AddressFormModalProps {
    visible: boolean;
    isEditing: boolean;
    addressForm: AddressFormData;
    isAddingAddress: boolean;
    isUpdatingAddress: boolean;
    onClose: () => void;
    onSave: () => void;
    onFormChange: (form: AddressFormData) => void;
}

const AddressFormModal = (
    {
        visible,
        isEditing,
        addressForm,
        onSave,
        onFormChange,
        isAddingAddress,
        isUpdatingAddress,
        onClose,
    }: AddressFormModalProps
) => {
    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <SafeScreen>
                    <View className="px-6 py-5 border border-surface flex-row items-center justify-between">
                        <Text className="text-text-primary text-2xl font-bold">
                            {isEditing ? "Atualizar Endereço" : "Adicionar Novo Endereço"}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={28} color="#B98ECC" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        className="flex-1"
                        contentContainerStyle={{ paddingBottom: 50 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="p-6">
                            <View className="mb-5">
                                <Text className="text-text-primary font-semibold mb-2">Tipo</Text>
                                <TextInput
                                    className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                                    placeholder="e.x., Casa, Trabalho, Escritório"
                                    placeholderTextColor="#666"
                                    value={addressForm.label}
                                    onChangeText={(text) => onFormChange({
                                        ...addressForm,
                                        label: text,
                                    })}
                                />
                            </View>

                            <View className="mb-5">
                                <Text className="text-text-primary font-semibold mb-2">Nome Completo</Text>
                                <TextInput
                                    className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                                    placeholder="Digite o Nome completo"
                                    placeholderTextColor="#666"
                                    value={addressForm.fullName}
                                    onChangeText={(text) => onFormChange({
                                        ...addressForm,
                                        fullName: text,
                                    })}
                                />
                            </View>

                            <View className="mb-5">
                                <Text className="text-text-primary font-semibold mb-2">Endereço</Text>
                                <TextInput
                                    className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                                    placeholder="Rua, Apt, Numero"
                                    placeholderTextColor="#666"
                                    value={addressForm.streetAddress}
                                    onChangeText={(text) => onFormChange({
                                        ...addressForm,
                                        streetAddress: text,
                                    })}
                                    multiline
                                />
                            </View>

                            <View className="mb-5">
                                <Text className="text-text-primary font-semibold mb-2">Cidade</Text>
                                <TextInput
                                    className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                                    placeholder="e.x., São Paulo"
                                    placeholderTextColor="#666"
                                    value={addressForm.city}
                                    onChangeText={(text) => onFormChange({
                                        ...addressForm,
                                        city: text,
                                    })}
                                />
                            </View>

                            <View className="mb-5">
                                <Text className="text-text-primary font-semibold mb-2">Estado</Text>
                                <TextInput
                                    className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                                    placeholder="e.x., SP"
                                    placeholderTextColor="#666"
                                    value={addressForm.state}
                                    onChangeText={(text) => onFormChange({
                                        ...addressForm,
                                        state: text,
                                    })}
                                />
                            </View>

                            <View className="mb-5">
                                <Text className="text-text-primary font-semibold mb-2">CEP</Text>
                                <TextInput
                                    className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                                    placeholder="e.x., 99.999-999"
                                    placeholderTextColor="#666"
                                    value={addressForm.zipCode}
                                    onChangeText={(text) => onFormChange({
                                        ...addressForm,
                                        zipCode: text,
                                    })}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View className="mb-5">
                                <Text className="text-text-primary font-semibold mb-2">País</Text>
                                <TextInput
                                    className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                                    placeholder="e.x., Brasil"
                                    placeholderTextColor="#666"
                                    value={addressForm.country || "Brasil"}
                                    onChangeText={(text) => onFormChange({
                                        ...addressForm,
                                        country: text,
                                    })}
                                />
                            </View>

                            <View className="mb-5">
                                <Text className="text-text-primary font-semibold mb-2">Celular</Text>
                                <TextInput
                                    className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                                    placeholder="e.x., +55 (99) 99999-9999"
                                    placeholderTextColor="#666"
                                    value={addressForm.phoneNumber}
                                    onChangeText={(text) => onFormChange({
                                        ...addressForm,
                                        phoneNumber: text,
                                    })}
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View className="bg-surface rounded-2xl p-4 flex-row items-center justify-between mb-6">
                                <Text className="text-text-primary font-semibold">
                                    Salvar com Endereço Padrão
                                </Text>
                                <Switch
                                    value={addressForm.isDefault}
                                    onValueChange={(value) => onFormChange({
                                        ...addressForm,
                                        isDefault: value,
                                    })}
                                    thumbColor="white"
                                />
                            </View>

                            <TouchableOpacity
                                className="bg-primary rounded-2xl py-5 items-center"
                                activeOpacity={0.8}
                                onPress={onSave}
                                disabled={isAddingAddress || isUpdatingAddress}
                            >
                                {isAddingAddress || isUpdatingAddress ? (
                                    <ActivityIndicator size="small" color="#121212" />
                                ) : (
                                    <Text className="text-background font-bold text-lg">
                                        {isEditing ? "Salvar Alterações" : "Adicionar Endereço"}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeScreen>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default AddressFormModal;
