import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { AuthContext } from "../../_layout";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "@/components/SideMenu";

export default function Index() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <View style={[styles.container, colorScheme === "dark" ? styles.containerDark : styles.containerLight]}>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@zerocho/post/1`)}>
          <Text
            style={colorScheme === "dark" ? styles.textDark : styles.textLight}>
            게시글1
            </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@zerocho/post/2`)}>
          <Text
          style={colorScheme === "dark" ? styles.textDark : styles.textLight}>
            게시글2

          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@zerocho/post/3`)}>
          <Text
          style={colorScheme === "dark" ? styles.textDark : styles.textLight}>
            게시글3

          </Text>
        </TouchableOpacity>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    backgroundColor: "black"
  },
  containerLight: {
    backgroundColor: "white"
  },
  textDark: { color: "white"},
  textLight: { color: "blakc"},
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  headerLogo: {
    width: 42, // DP, DIP
    height: 42,
  },
  loginButton: {
    position: "absolute",
    right: 20,
    top: 0,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
  },
  menuButton: {
    position: "absolute",
    left: 20,
    top: 10,
  },
});