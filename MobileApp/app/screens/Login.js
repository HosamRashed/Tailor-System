// src/components/Login.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setUserSession } from "../actions/userActions";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";
import { Stack } from "expo-router";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = () => {
    const completeUrl = `https://your-backend-url.com/login`;
    const data = {
      User_ID: formData.userID,
      Password: formData.password,
    };

    fetch(completeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message === "Login Successful") {
          dispatch(setUserSession(res.student)); // Assuming `res.student` contains user data
          navigation.navigate("Home");
        } else {
          Alert.alert("Login failed", res.message);
        }
      })
      .catch((error) => {
        Alert.alert("Login error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.MainTitle}>تسجيل الدخول</Text>
          <Text style={styles.title}>رقم الجوال</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="رقم الجوال"
            value={formData.userID}
            onChangeText={(value) => handleInputChange("userID", value)}
          />
          <Text style={styles.title}>الرمز السري</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="الرمز السري"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>تسجيل</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={() => navigateTo("/screens/Support")}
          >
            <Text style={styles.supportButtonText}>تواصل مع الدعم</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "right",
    width: "92%",
  },
  MainTitle: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "95%",
    paddingVertical: Platform.isPad ? height * 0.015 : height * 0.02,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: Platform.isPad ? 24 : 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "95%",
    paddingVertical: Platform.isPad ? height * 0.015 : height * 0.02,
    backgroundColor: "#2b79ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: height * 0.03,
  },
  buttonText: {
    color: "#fff",
    fontSize: Platform.isPad ? 24 : 18,
    fontWeight: "bold",
  },
  supportButton: {
    width: "80%",
    height: Platform.isPad ? 70 : 50, // Adjust height for iPad
    backgroundColor: "#ff4d4d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  supportButtonText: {
    color: "#fff",
    fontSize: Platform.isPad ? 28 : 20, // Adjust font size for iPad
  },
});

export default Login;
