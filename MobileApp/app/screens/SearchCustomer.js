import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, Stack } from "expo-router";
import CustomerComponent from "../componenets/CustomerComponent";

const { width, height } = Dimensions.get("window");

const validationSchema = (searchType) =>
  yup.object().shape({
    searchText:
      searchType === "PhoneNumber"
        ? yup
            .string()
            .required("نص البحث مطلوب")
            .matches(
              /^[0-9\u0660-\u0669]+$/,
              "يجب أن يحتوي رقم الجوال على أرقام فقط"
            )
        : yup
            .string()
            .required("نص البحث مطلوب")
            .matches(
              /^[A-Za-z\u0600-\u06FF\s]+$/,
              "يجب أن يحتوي الاسم على حروف فقط بدون أرقام"
            ),
  });

const SearchCustomer = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);

  let [searchType, setSearchType] = useState("Name");
  let [searchText, setSearchText] = useState("");
  let [noData, setNoData] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    searchText: "",
    searchType: "Name",
  };

  const handleSubmit = () => {
    setLoading(true);
    const completeUrl = `${url}/shops/${shopID}/customers/findCustomerBy${searchType}`;
    const data = {
      CustomerInfo: searchText,
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
        setLoading(false);
        if (res.length > 0) {
          setResults(res);
        } else {
          setResults([]);
          setNoData("لا يوجد زبائن مطابقين للبحث!");
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Request error", error.message);
        console.log(error.message);
      });
  };

  return (
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <TouchableOpacity
              style={styles.homeIcon}
              onPress={() => router.back("../home")}
            >
              <Ionicons name="arrow-back" size={32} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>ابحث عن الزبون</Text>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema(searchType)}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    value={values.searchText}
                    onChangeText={(text) => {
                      handleChange("searchText")(text);
                      setSearchText(text);
                    }}
                    onBlur={handleBlur("searchText")}
                    keyboardType={
                      searchType === "PhoneNumber" ? "numeric" : "default"
                    }
                  />
                  {touched.searchText && errors.searchText && (
                    <Text style={styles.errorText}>{errors.searchText}</Text>
                  )}
                  <View style={styles.searchTypeContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue("searchType", "Name");
                        setSearchType("Name");
                      }}
                      style={styles.radioButton}
                    >
                      <Text style={styles.radioText}>بالاسم</Text>
                      {values.searchType === "Name" && (
                        <View style={styles.radioDot} />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue("searchType", "PhoneNumber");
                        setSearchType("PhoneNumber");
                      }}
                      style={styles.radioButton}
                    >
                      <Text style={styles.radioText}>برقم الجوال</Text>
                      {values.searchType === "PhoneNumber" && (
                        <View style={styles.radioDot} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.searchButtonText}>ابحث</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <Text style={styles.searchTitle}>الزبائن المطابقين للبحث</Text>
          </View>
        </TouchableWithoutFeedback>
        {loading ? (
          <ActivityIndicator size="large" color="#90ee90" />
        ) : results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CustomerComponent customer={item} />}
            contentContainerStyle={styles.resultsList}
          />
        ) : (
          <Text style={styles.noDataText}>{noData}</Text>
        )}
      </View>
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
    padding: 16,
    backgroundColor: "#fff",
  },
  homeIcon: {
    top: Platform.OS === "ios" ? 10 : 10, // Adjusting for potential status bar height on iOS
    left: 0,
    zIndex: 1,
  },
  title: {
    marginTop: 15,
    fontSize: Platform.isPad ? 28 : 22,
    fontWeight: "bold",
    textAlign: "right",
  },
  searchTitle: {
    marginVertical: 10,
    fontSize: Platform.isPad ? 26 : 20,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: Platform.isPad ? height * 0.015 : height * 0.02,
    fontSize: Platform.isPad ? 24 : 18,
    paddingHorizontal: 15,
    marginTop: 15,
    textAlign: "right",
  },
  searchTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 7,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  radioText: {
    fontSize: Platform.isPad ? 22 : 17,
    marginRight: 7,
  },
  radioDot: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: "#90ee90",
  },
  searchButton: {
    marginTop: 20,
    paddingVertical: Platform.isPad ? height * 0.015 : height * 0.02,
    backgroundColor: "#90ee90",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#000",
    fontSize: Platform.isPad ? 28 : 20,
  },
  resultsList: {
    paddingBottom: 100,
  },
  errorText: {
    color: "red",
    textAlign: "right",
    marginTop: 5,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "grey",
    marginTop: 20,
  },
});

export default SearchCustomer;
