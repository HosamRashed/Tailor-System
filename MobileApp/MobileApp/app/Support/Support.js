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
import { useNavigation } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

const Support = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/NewCustomer/`)}
        >
          <Text style={styles.buttonText}>زبون جديد</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/AddMeasurement/`)}
        >
          <Text style={styles.buttonText}>اضافة مقاس جديد</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/SearchCustomer/`)}
        >
          <Text style={styles.buttonText}>البحث عن عميل</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/ThoabDetails/`)}
        >
          <Text style={styles.buttonText}>تفاصيل الثياب</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/TradersDetailss/`)}
        >
          <Text style={styles.buttonText}>بيانات التجار</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.supportButton}
        onPress={() => router.push(`/Support/`)}
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
    borderRadius: 5,
    marginVertical: 10,
  },
  largeButton: {
    width: "80%",
    height: Platform.isPad ? 90 : 60, // Adjust height for iPad
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: Platform.isPad ? 28 : 20, // Adjust font size for iPad
  },
  supportButton: {
    width: "80%",
    height: Platform.isPad ? 70 : 50, // Adjust height for iPad
    backgroundColor: "#ff4d4d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 40,
  },
  supportButtonText: {
    color: "#fff",
    fontSize: Platform.isPad ? 28 : 20, // Adjust font size for iPad
  },
});

export default Support;
