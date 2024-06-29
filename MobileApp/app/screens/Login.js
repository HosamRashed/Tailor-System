import React, { useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserSession } from "../actions/userActions";
import { useRouter, Stack } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";
import { COLORS } from "../../constants";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const url = useSelector((state) => state.user.url);

  const initialValues = {
    phoneNumber: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required("رقم الجوال مطلوب")
      .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الجوال على أرقام فقط"),
    password: yup.string().required("الرمز السري مطلوب"),
  });

  const handleLogin = (values) => {
    const { phoneNumber, password } = values;
    const completeUrl = `${url}/auth/loginShop`;
    const data = {
      phoneNumber,
      password,
    };

    fetch(completeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.token) {
          dispatch(setUserSession(res.shop));
          await AsyncStorage.setItem("userSession", JSON.stringify(res.shop));
          router.replace("/home");
        } else {
          Alert.alert("Login failed", res.msg || res.error);
        }
      })
      .catch((error) => {
        Alert.alert("Login error", error.message);
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.container}>
              <TextInput
                keyboardType="number-pad"
                style={styles.input}
                placeholder="رقم الجوال"
                placeholderTextColor="#ccc"
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="الرمز السري"
                placeholderTextColor="#ccc"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>تسجيل</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.supportButton}
                onPress={() => router.push("./screens/Support")}
              >
                <Text style={styles.supportButtonText}>تواصل مع الدعم</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: 10,
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
  errorText: {
    color: "red",
    fontSize: Platform.isPad ? 18 : 14,
    textAlign: "center",
    marginBottom: 5,
  },
});

export default Login;
