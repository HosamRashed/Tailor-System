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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const NewPayment = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user.shopInfo._id);
  const route = useRoute();

  const router = useRouter();

  const { trader } = route.params;
  const traderObj = JSON.parse(trader);
  const traderID = traderObj._id;

  const initialValues = {
    paymentAmount: "",
    notes: "",
  };

  const validationSchema = yup.object().shape({
    paymentAmount: yup
      .number()
      .required("المبلغ مطلوب")
      .typeError("المبلغ يجب أن يكون رقمًا")
      .positive("المبلغ يجب أن يكون أكبر من صفر")
      .min(0.01, "المبلغ يجب أن يكون أكبر من صفر")
      .max(
        traderObj.remainingAmount,
        `المبلغ يجب أن يكون أقل من أو يساوي ${traderObj.remainingAmount}`
      )
      .nullable(),
    notes: yup.string().nullable(),
  });

  const handleRequest = async (values) => {
    const userToken = await SecureStore.getItemAsync("userToken");

    const completeUrl = `${url}/shops/${shopID}/traders/${traderID}/payments/insert`;

    try {
      const response = await fetch(completeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add payment");
      }
      router.back();
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("Error adding payment:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={styles.homeIcon}
          onPress={() => router.back("../home")}
        >
          <Ionicons name="arrow-back" size={32} color="black" />
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
                  placeholder="مبلغ الدفعه"
                  placeholderTextColor="#ccc"
                  textAlign="right"
                  onChangeText={handleChange("paymentAmount")}
                  onBlur={handleBlur("paymentAmount")}
                  value={values.paymentAmount}
                  keyboardType="numeric"
                />
                {touched.paymentAmount && errors.paymentAmount && (
                  <Text style={styles.errorText}>{errors.paymentAmount}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="ملاحظه"
                  placeholderTextColor="#ccc"
                  textAlign="right"
                  onChangeText={handleChange("notes")}
                  onBlur={handleBlur("notes")}
                  value={values.notes}
                />
                {touched.notes && errors.notes && (
                  <Text style={styles.errorText}>{errors.notes}</Text>
                )}

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.saveButtonText}>إضافة الدفعه</Text>
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

export default NewPayment;
