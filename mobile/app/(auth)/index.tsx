import {ActivityIndicator, Image, Text, TouchableOpacity, View} from "react-native";
import useSocialAuth from "@/hooks/useSocialAuth";

const AuthScreen = () => {
    const { loadingStrategy, handleSocialAuth } = useSocialAuth();

    return (
        <View className="px-8 flex-1 justify-center items-center bg-white">
            <Image
                source={require("../../assets/images/auth-image.png")}
                className="size-96"
                resizeMode={'contain'}
            />
            <View className="gap-2 mt-3">
                <TouchableOpacity
                    className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-6 py-2"
                    disabled={loadingStrategy !== null}
                    onPress={() => handleSocialAuth("oauth_google")}
                    style={{
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        elevation: 2,
                    }}
                >
                    {loadingStrategy === "oauth_google" ? (
                        <ActivityIndicator size={"small"} color={"#4285Fa"} />
                    ) : (
                        <View className="flex-row items-center justify-center">
                            <Image
                                source={require("../../assets/images/google.png")}
                                className="size-10 mr-3"
                                resizeMode={'contain'}
                            />
                            <Text className="text-black font-medium text-base">Entrar com Google</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-6 py-2"
                    disabled={loadingStrategy !== null}
                    onPress={() => handleSocialAuth("oauth_apple")}
                    style={{
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        elevation: 2,
                    }}
                >
                    {loadingStrategy === "oauth_apple" ? (
                        <ActivityIndicator size={"small"} color={"#4285Fa"} />
                    ) : (
                        <View className="flex-row items-center justify-center">
                            <Image
                                source={require("../../assets/images/apple.png")}
                                className="size-10 mr-3"
                                resizeMode={'contain'}
                            />
                            <Text className="text-black font-medium text-base">Entrar com Apple</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <Text className="text-center text-gray-500 text-xs leading-4 mt-5 px-2">
                Entrando você concorda com os <Text className="text-blue-500">termos </Text>
                {", "}
                <Text className="text-blue-500">e politica de privacidade.</Text>
                {", e "}
                <Text className="text-blue-500">e uso de cookies.</Text>
            </Text>
        </View>
    );
}

export default AuthScreen;
