import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, PixelRatio } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isLoggedIn = false;

  console.log("pathname", pathname);
  const { width, height } = Dimensions.get("window")
  console.log(`화면 너비 : ${width}dp 화면 높이 : ${height}dp`);
  console.log(`화면 너비 : ${width * PixelRatio.get()}px 화면 높이 : ${height * PixelRatio.get()}px`);
  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>

      <BlurView style={styles.header} intensity={70}>
        <Image style={styles.headerLogo} source={require("../../../assets/images/react-logo.png")}/>
        {!isLoggedIn && (
        <TouchableOpacity style={styles.loginButton} onPress={() => router.navigate(`/login`)}>
            <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        )}
      </BlurView>
      {isLoggedIn && (
      <View style={styles.tabContainer}>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => router.push(`/`)}>
          <Text style={{color:pathname === '/' ? "red" : "black"}}>For you</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => router.push(`/following`)}>
          <Text style={{color:pathname === '/' ? "black" : "red"}}>Following</Text>
        </TouchableOpacity>
      </View>
      </View>
        )}
      <View>
        <TouchableOpacity onPress={() => router.push(`/@taewoo/post/1`)}>
          <Text>게시글1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/taewoo/post/2`)}>
          <Text>게시글2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/taewoo/post/3`)}>
          <Text>게시글3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row"
  },
  tab: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    alignItems: "center",
  },
  headerLogo: {
    width: 42,
    height: 42,
  },
  loginButton: {
    position: "absolute",
    right: 20,
    top: 0,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loginButtonText: {
    color: "white"
  }
});