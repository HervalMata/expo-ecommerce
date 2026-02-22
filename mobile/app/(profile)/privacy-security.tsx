import {View, Text, TouchableOpacity, ScrollView, Switch} from "react-native";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import SafeScreen from "@/components/SafeScreen";

type SecurityOptions = {
    id: string;
    icon: string;
    title: string;
    description: string;
    type: "navigation" | "toggle";
    value?: boolean;
}

function PrivacyAndSecurity() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [biometricEnable, setBiometricEnable] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [shareData, setShareData] = useState(false);

    const securitySettings: SecurityOptions[] = [
        {
            id: "password",
            icon: "lock-closed-outline",
            title: "Trocar Senha",
            description: "Atualize a senha da sua conta",
            type: "navigation",
        },
        {
            id: "two-factor",
            icon: "shield-checkmark-outline",
            title: "Autenticação em 2 Fatores",
            description: "Adicionar uma camada extra de segurança",
            type: "toggle",
            value: twoFactorEnabled,
        },
        {
            id: "biometric",
            icon: "finger-print-outline",
            title: "Acesso Por Biometria",
            description: "Use FaceID ou TouchID",
            type: "toggle",
            value: biometricEnable,
        }
    ];

    const privacySettings: SecurityOptions[] = [
        {
            id: "push",
            icon: "notifications-outline",
            title: "Notificações",
            description: "Receber Notificações",
            type: "toggle",
            value: pushNotifications,
        },
        {
            id: "email",
            icon: "mail-outline",
            title: "Notificações Por Email",
            description: "Receber atualizações das suas ordens por email",
            type: "toggle",
            value: emailNotifications,
        },
        {
            id: "marketing",
            icon: "megaphone-outline",
            title: "Promoções Por Email",
            description: "Receber promoções por email",
            type: "toggle",
            value: marketingEmails,
        },
        {
            id: "data",
            icon: "analytics-outline",
            title: "Compartilhar seus dados de navegação",
            description: "Nos ajude a melhorar a sua experiência no app",
            type: "toggle",
            value: shareData,
        }
    ];

    const accountSettings = [
        {
            id: "activity",
            icon: "time-outline",
            title: "Atividade da Conta",
            description: "Veja seus logins recentes",
        },
        {
            id: "devices",
            icon: "phone-portrait-outline",
            title: "Aparelhos Conectados",
            description: "Gerencie os aparelhos conectados",
        },
        {
            id: "data-download",
            icon: "download-outline",
            title: "Baixe seus dados",
            description: "Tenha uma cópia dos seus dados",
        }
    ];

    const handleToggle = (id: string, value: boolean) => {
        switch (id) {
            case "two-factor":
                setTwoFactorEnabled(true);
                break;
            case "biometric":
                setBiometricEnable(true);
                break;
            case "push":
                setPushNotifications(true);
                break;
            case "email":
                setEmailNotifications(true);
                break;
            case "marketing":
                setMarketingEmails(true);
                break;
            case "data":
                setShareData(true);
                break;
        }
    }
    return (
        <SafeScreen>
            {/* Header */}
            <View className="px-6 pb-5 border-b border-surface flex-row items-center">
                <TouchableOpacity
                    className="mr-4"
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-white">Privacy and Security Screen</Text>
            </View>
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Security Settings */}
                <View className="px-6 pt-6">
                    <Text className="text-text-primary text-lg font-bold mb-4">Segurança</Text>
                    {securitySettings.map((setting) => (
                        <TouchableOpacity
                            key={setting.id}
                            className="bg-surface rounded-2xl p-4 mb-3"
                            activeOpacity={setting.type === "toggle" ? 1 : 0.7}
                        >
                            <View className="flex-row items-center">
                                <View className="bg-primary/20 rounded-full w-12 h-12 items-center justify-center mr-4">
                                    <Ionicons name={setting.icon as any} size={24} color="#B98BEC" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-text-primary font-bold text-base mb-1">
                                        {setting.title}
                                    </Text>
                                    <Text className="text-text-secondary text-sm">
                                        {setting.description}
                                    </Text>
                                </View>
                                {setting.type === "toggle" ? (
                                    <Switch
                                        value={setting.value}
                                        onValueChange={(value) => handleToggle(setting.id, value)}
                                        thumbColor="#FFFFFF"
                                        trackColor={{ false: "#2A2A2A", true: "#B98ECC"}}
                                    />
                                ) : (
                                    <Ionicons name="chevron-forward" size={20} color="#666" />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Privacy Settings */}
                <View className="px-6 pt-4">
                    <Text className="text-text-primary text-lg font-bold mb-4">Privacidade</Text>
                    {privacySettings.map((setting) => (
                        <TouchableOpacity
                            key={setting.id}
                            className="bg-surface rounded-2xl p-4 mb-3"
                            activeOpacity={setting.type === "toggle" ? 1 : 0.7}
                        >
                            <View className="flex-row items-center">
                                <View className="bg-primary/20 rounded-full w-12 h-12 items-center justify-center mr-4">
                                    <Ionicons name={setting.icon as any} size={24} color="#B98BEC" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-text-primary font-bold text-base mb-1">
                                        {setting.title}
                                    </Text>
                                    <Text className="text-text-secondary text-sm">
                                        {setting.description}
                                    </Text>
                                </View>
                                {setting.type === "toggle" ? (
                                    <Switch
                                        value={setting.value}
                                        onValueChange={(value) => handleToggle(setting.id, value)}
                                        thumbColor="#FFFFFF"
                                        trackColor={{ false: "#2A2A2A", true: "#B98ECC"}}
                                    />
                                ) : (
                                    <Ionicons name="chevron-forward" size={20} color="#666" />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Account Settings */}
                <View className="px-6 pt-6">
                    <Text className="text-text-primary text-lg font-bold mb-4">Conta</Text>
                    {accountSettings.map((setting) => (
                        <TouchableOpacity
                            key={setting.id}
                            className="bg-surface rounded-2xl p-4 mb-3"
                            activeOpacity={0.7}
                        >
                            <View className="flex-row items-center">
                                <View className="bg-primary/20 rounded-full w-12 h-12 items-center justify-center mr-4">
                                    <Ionicons name={setting.icon as any} size={24} color="#B98BEC" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-text-primary font-bold text-base mb-1">
                                        {setting.title}
                                    </Text>
                                    <Text className="text-text-secondary text-sm">
                                        {setting.description}
                                    </Text>
                                </View>

                                <Ionicons name="chevron-forward" size={20} color="#666" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Delete Account Button */}
                <View className="px-6 pt-6">
                        <TouchableOpacity
                            className="bg-surface rounded-2xl p-5 flex-row items-center
                             justify-between border-2 border-red-500/20"
                            activeOpacity={0.7}
                        >
                            <View className="flex-row items-center">
                                <View className="bg-red-500/20 rounded-full w-12 h-12 items-center justify-center mr-4">
                                    <Ionicons name="trash-outline" size={24} color="#B98BEC" />
                                </View>
                                <View>
                                    <Text className="text-text-primary font-bold text-base mb-1">
                                        Remover Conta?
                                    </Text>
                                    <Text className="text-text-secondary text-sm">
                                        Remover permanentemente sua conata
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        </TouchableOpacity>
                </View>

                {/* Info Alert */}
                <View className="px-6 pt-6 pb-4">
                    <View className="bg-primary/10 rounded-2xl p-4 flex-row">
                        <Ionicons name="information-circle-outline" size={24} color="#B98ECC" />
                        <Text className="text-text-secondary text-sm ml-3 flex-1">
                            Nós temos cuidado com sua privacidade e a segurança dos seus dados.
                            Você pode gerenciar as configurações de privacidade e segurança a qualquer tempo.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeScreen>
    );
}

export default PrivacyAndSecurity;
