import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Function to convert Arabic numbers to English numbers
const convertArabicToEnglishNumbers = (text) => {
  const arabicToEnglishMap = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
    "،": ",", // Arabic comma to English comma
    "٫": ".", // Arabic decimal separator to English decimal point
  };

  return text.replace(
    /[\u0660-\u0669،٫]/g,
    (match) => arabicToEnglishMap[match]
  );
};

// Function to convert both Arabic numbers and letters to English
const convertArabicToEnglish = (text) => {
  const numbersConverted = convertArabicToEnglishNumbers(text);
  return numbersConverted;
};

const ModifyMeasurement = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user.shopInfo._id);
  const router = useRouter();
  const route = useRoute();

  let { measurements, customerID } = route.params;
  customerID = customerID.substring(0, customerID.length);

  let parsedMeasurement = {};

  try {
    parsedMeasurement = measurements ? JSON.parse(measurements) : {};
  } catch (error) {
    console.error("Failed to parse measurements:", error);
    Alert.alert("Error", "Failed to parse measurement data.");
  }

  const initialValues = {
    pageNumber: parsedMeasurement?.pageNumber?.toString() || "",
    numberOfThoabs: parsedMeasurement?.numberOfThoabs?.toString() || "",
    height: parsedMeasurement?.height?.toString() || "",
    shoulder: parsedMeasurement?.shoulder?.toString() || "",
    armLength: parsedMeasurement?.armLength?.toString() || "",
    armWidthTopPart: parsedMeasurement?.armWidthTopPart?.toString() || "",
    armWidthMiddlePart: parsedMeasurement?.armWidthMiddlePart?.toString() || "",
    wristWidth: parsedMeasurement?.wristWidth?.toString() || "",
    wristHeight: parsedMeasurement?.wristHeight?.toString() || "",
    wristShapeType: parsedMeasurement?.wristShapeType || "",
    bodyWidth: parsedMeasurement?.bodyWidth?.toString() || "",
    chestWidth: parsedMeasurement?.chestWidth?.toString() || "",
    bottomThobWidth: parsedMeasurement?.bottomThobWidth?.toString() || "",
    neckHeight: parsedMeasurement?.neckHeight?.toString() || "",
    neckWidth: parsedMeasurement?.neckWidth?.toString() || "",
    neckType: parsedMeasurement?.neckType || "",
    jbjorHeight: parsedMeasurement?.jbjorHeight?.toString() || "",
    jbjorType: parsedMeasurement?.jbjorType || "",
    additionalRequirements: parsedMeasurement?.additionalRequirements || "",
  };

  const handleRequest = async (values) => {
    // Convert values to English
    const userToken = await SecureStore.getItemAsync("userToken");
    const convertedValues = Object.keys(values).reduce((acc, key) => {
      acc[key] = convertArabicToEnglish(values[key]);
      return acc;
    }, {});

    const completeUrl = `${url}/shops/${shopID}/${customerID}/measurments/${parsedMeasurement?._id}`;
    console.log("Complete URL:", completeUrl);
    fetch(completeUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(convertedValues),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res._id) {
          router.back();
        } else {
          Alert.alert("Adding measurement failed", res.message || res.error);
        }
      })
      .catch((error) => {
        Alert.alert("Request error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => router.back("../home")}
      >
        <Ionicons name="arrow-back" size={32} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: true,
            headerTitle: "",
            headerShown: false,
          }}
        />

        <Formik initialValues={initialValues} onSubmit={handleRequest}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>رقم الصفحة</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("pageNumber")}
                    onBlur={handleBlur("pageNumber")}
                    value={values.pageNumber}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عدد الثياب</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("numberOfThoabs")}
                    onBlur={handleBlur("numberOfThoabs")}
                    value={values.numberOfThoabs}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>الكتف</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("shoulder")}
                    onBlur={handleBlur("shoulder")}
                    value={values.shoulder}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>الطول</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("height")}
                    onBlur={handleBlur("height")}
                    value={values.height}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض (الوسط)</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("armWidthMiddlePart")}
                    onBlur={handleBlur("armWidthMiddlePart")}
                    value={values.armWidthMiddlePart}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض (العالي)</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("armWidthTopPart")}
                    onBlur={handleBlur("armWidthTopPart")}
                    value={values.armWidthTopPart}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>طول اليد</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("armLength")}
                    onBlur={handleBlur("armLength")}
                    value={values.armLength}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>نوع الساعد</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange("wristShapeType")}
                    onBlur={handleBlur("wristShapeType")}
                    value={values.wristShapeType}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>ارتفاع الساعد</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("wristHeight")}
                    onBlur={handleBlur("wristHeight")}
                    value={values.wristHeight}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض الساعد</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("wristWidth")}
                    onBlur={handleBlur("wristWidth")}
                    value={values.wristWidth}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض الصدر</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("chestWidth")}
                    onBlur={handleBlur("chestWidth")}
                    value={values.chestWidth}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض الجسم</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("bodyWidth")}
                    onBlur={handleBlur("bodyWidth")}
                    value={values.bodyWidth}
                  />
                </View>
              </View>
              <View style={styles.row}></View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>نوع الرقبه</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange("neckType")}
                    onBlur={handleBlur("neckType")}
                    value={values.neckType}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>ارتفاع الرقبه</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("neckHeight")}
                    onBlur={handleBlur("neckHeight")}
                    value={values.neckHeight}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض الرقبه</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("neckWidth")}
                    onBlur={handleBlur("neckWidth")}
                    value={values.neckWidth}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>نوع الجيزور</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange("jbjorType")}
                    onBlur={handleBlur("jbjorType")}
                    value={values.jbjorType}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>طول الجيزور</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("jbjorHeight")}
                    onBlur={handleBlur("jbjorHeight")}
                    value={values.jbjorHeight}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>اي تفاصيل زياده ؟</Text>
                  <TextInput
                    style={styles.inputFull}
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange("additionalRequirements")}
                    onBlur={handleBlur("additionalRequirements")}
                    value={values.additionalRequirements}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض الثوب تحت</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("bottomThobWidth")}
                    onBlur={handleBlur("bottomThobWidth")}
                    value={values.bottomThobWidth}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>حفظ</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  homeIcon: {
    top: Platform.OS === "ios" ? 10 : 10, // Adjusting for potential status bar height on iOS
    left: 15,
    zIndex: 1,
    width: "20%",
  },
  form: {
    marginTop: 10,
    width: width * 0.9,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  inputFull: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#90ee90",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
  },
});

export default ModifyMeasurement;
