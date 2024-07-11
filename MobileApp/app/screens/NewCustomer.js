import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const NewCustomer = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);

  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    customerName: "",
    phoneNumber: "",
  };

  const validationSchema = yup.object().shape({
    customerName: yup.string().required("اسم الزبون مطلوب"),
    phoneNumber: yup
      .string()
      .required("رقم الجوال مطلوب")
      .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الجوال على أرقام فقط"),
  });

  const handleRequest = (values) => {
    const { customerName, phoneNumber } = values;
    const completeUrl = `${url}/shops/${shopID}/customers/insert`; // Ensure shopID is defined
    const data = {
      fullName: customerName,
      phoneNumber,
      measurements: [], // Add measurements if necessary
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
        if (res._id) {
          // Assuming res contains the new customer object
          Alert.alert("تم إضافة الزبون !");
          router.back("/home");
        } else {
          Alert.alert("Adding customer failed", res.message || res.error);
        }
      })
      .catch((error) => {
        Alert.alert("Request error", error.message);
        console.log(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.homeIcon}>
          <Ionicons
            name="arrow-back"
            size={32}
            color="black"
            onPress={() => router.back("../home")}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: true,
              headerTitle: "",
              headerShown: false,
            }}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRequest}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="اسم الزبون"
                  placeholderTextColor="#ccc"
                  textAlign="right"
                  onChangeText={handleChange("customerName")}
                  onBlur={handleBlur("customerName")}
                  value={values.customerName}
                />
                {touched.customerName && errors.customerName && (
                  <Text style={styles.errorText}>{errors.customerName}</Text>
                )}

                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  placeholder="رقم جوال الزبون"
                  placeholderTextColor="#ccc"
                  textAlign="right"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.saveButtonText}>حفظ</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  homeIcon: {
    top: Platform.OS === "ios" ? 10 : 10, // Adjusting for potential status bar height on iOS
    left: 16,
    zIndex: 1,
  },
  title: {
    marginTop: 35,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
  },
  input: {
    width: "100%",
    paddingVertical: Platform.isPad ? height * 0.015 : height * 0.02,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: Platform.isPad ? 24 : 18,
    marginBottom: 10,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  saveButton: {
    width: "100%",
    paddingVertical: Platform.isPad ? height * 0.015 : height * 0.02,
    backgroundColor: "#90ee90",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: height * 0.03,
  },
  saveButtonText: {
    color: "#000",
    fontSize: Platform.isPad ? 28 : 20,
  },
});

export default NewCustomer;
