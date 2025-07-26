import {
    MaterialTopTabBar,
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { router, Slot, usePathname, useRouter, withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "@/components/SideMenu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/_layout";
import { BlurView } from "expo-blur";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { user } = useContext(AuthContext);
    const isLoggedIn = !!user
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
        >
            <BlurView style={styles.header} intensity={70}>
                {isLoggedIn && (
                    <Pressable
                        style={styles.menuButton}
                        onPress={() => {
                            setIsSideMenuOpen(true);
                        }}
                    >
                        <Ionicons name="menu" size={24} color="black" />
                    </Pressable>
                )}
                <SideMenu
                    isVisible={isSideMenuOpen}
                    onClose={() => setIsSideMenuOpen(false)}
                />
                <Image
                    source={require("../../../assets/images/react-logo.png")}
                    style={styles.headerLogo}
                />
                {!isLoggedIn && (
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => {
                            console.log("loginButton onPress");
                            router.navigate(`/login`);
                        }}
                    >
                        <Text style={styles.loginButtonText}>로그인</Text>
                    </TouchableOpacity>
                )}
            </BlurView>
            {isLoggedIn ? (
                <MaterialTopTabs
                    screenOptions={{
                        lazy: true,
                        tabBarStyle: {
                            backgroundColor: "white",
                            shadowColor:"transparent",
                            position: "relative",
                        },
                        tabBarPressColor: "transparent",
                        tabBarActiveTintColor: "#555",
                        tabBarIndicatorStyle: {
                            backgroundColor: "black",
                            height: 1,
                        },
                        tabBarIndicatorContainerStyle: {
                            backgroundColor: "#aaa",
                            position: "absolute",
                            top: 49,
                            height: 1
                        }
                    }}  
                >
                    <MaterialTopTabs.Screen name="index" options={{ title: "For You" }} />
                    <MaterialTopTabs.Screen name="following" options={{ title: "Following" }} />
                </MaterialTopTabs>
            ) : (
                <Slot />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    headerLogo: {
        width: 32,
        height: 32,
    },
    menuButton: {
        padding:8,
        position: "absolute",
        left: 16,
    },
    loginButton: {
        position: "absolute",
        right: 16,
        backgroundColor: "black",
        padding: 8,
        borderRadius: 4,
    },
    loginButtonText: {
        color: "white",
    },
});