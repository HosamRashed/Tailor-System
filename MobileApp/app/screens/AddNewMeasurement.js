import React from "react";
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
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import { COLORS } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const AddNewMeasurement = () => {
  const router = useRouter();

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

        <Formik
          initialValues={{
            pageNumber: "",
            numberOfThobes: "",
            length: "",
            shoulder: "",
            armLength: "",
            upperArmWidth: "",
            midArmWidth: "",
            wrestWidth: "",
            wrestHeight: "",
            wrestType: "",
            chestWidth: "",
            bodyWidth: "",
            underfootWidth: "",
            neckHeight: "",
            neckWidth: "",
            jizoorLength: "",
            jizoorType: "",
            neckType: "",
            additionalDetails: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            // Handle form submission
          }}
        >
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
                    onChangeText={handleChange("numberOfThobes")}
                    onBlur={handleBlur("numberOfThobes")}
                    value={values.numberOfThobes}
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
                    onChangeText={handleChange("length")}
                    onBlur={handleBlur("length")}
                    value={values.length}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض (العالي)</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("upperArmWidth")}
                    onBlur={handleBlur("upperArmWidth")}
                    value={values.upperArmWidth}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض (الوسط)</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("midArmWidth")}
                    onBlur={handleBlur("midArmWidth")}
                    value={values.midArmWidth}
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
                    onChangeText={handleChange("wrestType")}
                    onBlur={handleBlur("wrestType")}
                    value={values.wrestType}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>ارتفاع الساعد</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("wrestHeight")}
                    onBlur={handleBlur("wrestHeight")}
                    value={values.wrestHeight}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض الساعد</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("wrestWidth")}
                    onBlur={handleBlur("wrestWidth")}
                    value={values.wrestWidth}
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
              </View>
              <View style={styles.row}>
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
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>نوع الجيزور</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange("jizoorType")}
                    onBlur={handleBlur("jizoorType")}
                    value={values.jizoorType}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>طول الجيزور</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("jizoorLength")}
                    onBlur={handleBlur("jizoorLength")}
                    value={values.jizoorLength}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>عرض الثوب تحت</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange("underfootWidth")}
                    onBlur={handleBlur("underfootWidth")}
                    value={values.underfootWidth}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>اي تفاصيل زياده</Text>
                  <TextInput
                    style={styles.inputFull}
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange("additionalDetails")}
                    onBlur={handleBlur("additionalDetails")}
                    value={values.additionalDetails}
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
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  homeIcon: {
    top: Platform.OS === "ios" ? 10 : 10, // Adjusting for potential status bar height on iOS
    left: 15,
    zIndex: 1,
  },
  form: {
    marginTop: 20,
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
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  inputFull: {
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#000",
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

export default AddNewMeasurement;
