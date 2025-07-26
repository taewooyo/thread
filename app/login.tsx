import { Redirect, router } from "expo-router";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
    const insets = useSafeAreaInsets();
    const isLoggedIn = false;

    const onLogin = () => {
        console.log("login");

        fetch("/login", {
            method: "POST",
            body: JSON.stringify({
                username: "stitch",
                password: "1234",
            }),
        })
            .then((res) => {
                console.log("res", res, res.status);
                if(res.status >= 400) {
                    return Alert.alert("Error", "Invalid credentials");
                }
                return res.json()
            })
            .then((data) => {
                console.log("data", data);
            })
            .catch((error) => {
                console.error(error)
            })
    }
    if (isLoggedIn) {
        return <Redirect href="/(tabs)" />;
    }
    return (
        <View style={{ paddingTop: insets.top }}>
            <Pressable onPress={() => router.back()}>
                <Text>Login</Text>
            </Pressable>
            <Pressable
                style={styles.loginButton}
                onPress={onLogin}>
                <Text style={styles.loginButtonText}>
                    Login
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: "center"
    },
    loginButtonText: {
        color: "white"
    },
});