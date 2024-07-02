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

const NewTrader = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);

  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    traderName: "",
    phoneNumber: "",
    moneyAmount: "",
  };

  const validationSchema = yup.object().shape({
    traderName: yup.string().required("اسم الموزع مطلوب"),
    phoneNumber: yup
      .string()
      .required("رقم الجوال مطلوب")
      .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الجوال على أرقام فقط"),
    moneyAmount: yup
      .number()
      .required("المبلغ مطلوب")
      .typeError("المبلغ يجب أن يكون رقمًا")
      .positive("المبلغ يجب أن يكون أكبر من صفر")
      .min(0.01, "المبلغ يجب أن يكون أكبر من صفر")
      .nullable(),
  });

  const handleRequest = async (values) => {
    const { traderName, phoneNumber, moneyAmount } = values;
    const completeUrl = `${url}/shops/${shopID}/traders/insert`; // Ensure shopID is defined
    const data = {
      name: traderName,
      phoneNumber,
      moneyAmount,
    };

    try {
      const response = await fetch(completeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add customer");
      }

      Alert.alert("Trader added successfully");
      router.back("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("Error adding trader:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: true,
              headerTitle: "",
              headerShown: false,
            }}
          />
          <TouchableOpacity style={styles.homeIcon}>
            <Ionicons
              name="arrow-back"
              size={32}
              color="black"
              onPress={() => router.back("../home")}
            />
          </TouchableOpacity>

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
                  placeholder="اسم الموزع"
                  placeholderTextColor="#ccc"
                  textAlign="right"
                  onChangeText={handleChange("traderName")}
                  onBlur={handleBlur("traderName")}
                  value={values.traderName}
                />
                {touched.traderName && errors.traderName && (
                  <Text style={styles.errorText}>{errors.traderName}</Text>
                )}

                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  placeholder="رقم الجوال "
                  placeholderTextColor="#ccc"
                  textAlign="right"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}

                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  placeholder="المبلغ المستحق (ريال سعودي)"
                  placeholderTextColor="#ccc"
                  textAlign="right"
                  onChangeText={handleChange("moneyAmount")}
                  onBlur={handleBlur("moneyAmount")}
                  value={values.moneyAmount}
                />
                {touched.moneyAmount && errors.moneyAmount && (
                  <Text style={styles.errorText}>{errors.moneyAmount}</Text>
                )}

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.saveButtonText}>إضافة الموزع</Text>
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
    position: "absolute",
    top: Platform.OS === "ios" ? 20 : 10, // Adjusting for potential status bar height on iOS
    left: 15,
    zIndex: 1,
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

export default NewTrader;
