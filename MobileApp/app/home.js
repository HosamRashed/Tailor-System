import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { clearUserSession } from "./actions/userActions";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  const navigateTo = (routeName) => {
    router.push(routeName);
  };

  const handleSignOut = async () => {
    dispatch(clearUserSession());

    try {
      await SecureStore.deleteItemAsync("userSession");
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.setItemAsync("loginStatus", "loggedOut");
      console.log("User session, token removed, and login status updated.");
    } catch (error) {
      console.error("Failed to remove the user session or token:", error);
    }

    router.replace("/screens/Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#f8f9fa" },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>تسجيل خروج</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateTo("/screens/NewCustomer")}
        >
          <Text style={styles.buttonText}>زبون جديد</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateTo("/screens/SearchCustomer")}
        >
          <Text style={styles.buttonText}>اضافة مقاس جديد</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateTo("/screens/SearchCustomer")}
        >
          <Text style={styles.buttonText}>
            استخدام مقاس قديم لتفصيل ثوب جديد
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateTo("/screens/SearchCustomer")}
        >
          <Text style={styles.buttonText}>البحث عن عميل</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateTo("/screens/Statistics")}
        >
          <Text style={styles.buttonText}>تفاصيل الثياب</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateTo("/screens/Traders/Traders")}
        >
          <Text style={styles.buttonText}>بيانات الموزعين</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.supportButton}
        onPress={() => navigateTo("/screens/Support")}
      >
        <Text style={styles.supportButtonText}>تواصل مع الدعم</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    paddingHorizontal: width * 0.05, // Responsive padding
  },
  header: {
    justifyContent: "flex-star",
    width: "90%",
    padding: 10,
    paddingHorizontal: 0,
    backgroundColor: "#f0f4f8",
    alignItems: "right",
  },
  signOutButton: {
    alignSelf: "flex-end",
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f08080",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android
  },
  signOutText: {
    color: "#fff",
    fontSize: Platform.isPad ? 24 : 18,
    fontWeight: "600",
  },
  borderWidth: 1,
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "90%",
    height: Platform.isPad ? 100 : 70, // Adjust height for iPad
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android
  },
  buttonText: {
    fontSize: Platform.isPad ? 24 : 18, // Adjust font size for iPad
    color: "#0f5132",
    fontWeight: "600",
  },
  supportButton: {
    width: "90%",
    height: Platform.isPad ? 80 : 60,
    backgroundColor: "#90ee90",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
    position: "absolute",
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android
  },
  supportButtonText: {
    color: "black",
    fontSize: Platform.isPad ? 24 : 18,
    fontWeight: "500",
  },
});

export default Home;
