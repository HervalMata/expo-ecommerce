import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return null;

    if (isSignedIn) {
        // @ts-ignore
       return <Redirect href={"/(tabs)/index"} />;
    }
    return <Stack screenOptions={{ headerShown: false }} />;
}
