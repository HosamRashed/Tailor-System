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
import { COLORS } from "../constants";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.user);
  // console.log("hello", user);

  // Handle navigation to specific routes
  const navigateTo = (routeName) => {
    router.push(routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />
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
          <Text style={styles.buttonText}>البحث عن عميل</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateTo("/screens/ThoabDetails")}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.02, // Responsive padding
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "80%",
    height: Platform.isPad ? 100 : 70, // Adjust height for iPad
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: Platform.isPad ? 28 : 20, // Adjust font size for iPad
  },
  supportButton: {
    width: "80%",
    height: Platform.isPad ? 70 : 50,
    backgroundColor: "#f08080",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
    position: "absolute",
    bottom: 20,
  },
  supportButtonText: {
    color: "#fff",
    fontSize: Platform.isPad ? 28 : 20,
  },
});

export default Home;
