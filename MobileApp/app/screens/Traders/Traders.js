import React, { useState, useCallback } from "react";
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
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRouter, Stack } from "expo-router";
import TraderComponent from "../../componenets/TraderComponent";
import { debounce } from "lodash";

const { width, height } = Dimensions.get("window");

const validationSchema = yup.object().shape({
  searchText: yup
    .string()
    .required("نص البحث مطلوب")
    .matches(
      /^[A-Za-z\u0600-\u06FF\s]+$/,
      "يجب أن يحتوي الاسم على حروف فقط بدون أرقام"
    ),
});

const Traders = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user.shopInfo._id);
  const [searchText, setSearchText] = useState("");
  const [noData, setNoData] = useState("");
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchAllTraders();
    }, [])
  );

  const fetchAllTraders = async () => {
    const userToken = await SecureStore.getItemAsync("userToken");
    setLoading(true);
    const completeUrl = `${url}/shops/${shopID}/traders`;

    fetch(completeUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.length > 0) {
          setResults(res);
          setFilteredResults(res);
        } else {
          setResults([]);
          setFilteredResults([]);
          setNoData("لا يوجد موزعين!");
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Request error", error.message);
        console.log(error.message);
      });
  };

  const handleSearch = useCallback(
    debounce((searchText) => {
      if (searchText) {
        const filtered = results.filter((trader) =>
          trader.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredResults(filtered);
        if (filtered.length === 0) {
          setNoData("لا يوجد موزعين!");
        } else {
          setNoData("");
        }
      } else {
        setFilteredResults(results);
      }
    }, 300),
    [results]
  );

  const handleChange = (value) => {
    setSearchText(value);
    handleSearch(value);
  };

  return (
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Text style={styles.title}>قائمة الموزعين</Text>
            <Formik
              initialValues={{ searchText: "" }}
              validationSchema={validationSchema}
              onSubmit={() => {}}
            >
              {({
                handleBlur,
                values,
                errors,
                touched,
                setFieldValue,
                setFieldTouched,
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    value={searchText}
                    onChangeText={(value) => {
                      setFieldValue("searchText", value);
                      setFieldTouched("searchText", true);
                      handleChange(value);
                    }}
                    onBlur={handleBlur("searchText")}
                    keyboardType="default"
                  />
                  {touched.searchText &&
                    errors.searchText &&
                    !values.searchText && (
                      <Text style={styles.errorText}>{errors.searchText}</Text>
                    )}

                  <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => handleSearch(values.searchText)}
                  >
                    <Text style={styles.searchButtonText}>ابحث</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#90ee90"
            style={styles.loading}
          />
        ) : filteredResults.length > 0 ? (
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <TraderComponent trader={item} />}
            contentContainerStyle={styles.resultsList}
            style={styles.resultsContainer}
          />
        ) : (
          <Text style={styles.noDataText}>{noData}</Text>
        )}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              router.push("./NewTrader");
            }}
          >
            <Text style={styles.addButtonText}>إضافة موزع جديد</Text>
          </TouchableOpacity>
        </View>
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
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "right",
  },
  searchTitle: {
    marginVertical: 10,
    fontSize: 20,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    fontSize: 18,
    paddingHorizontal: 15,
    marginTop: 15,
    textAlign: "right",
  },
  searchButton: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: "#90ee90",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#000",
    fontSize: 20,
  },
  resultsContainer: {
    marginTop: 10,
    flex: 1,
    marginBottom: 70,
  },
  resultsList: {
    // paddingBottom: 100,
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
  loading: {
    marginTop: 20,
  },

  bottomButtonsContainer: {
    position: "absolute",
    bottom: 20, // Adjust as needed
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: "90%",
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#2b79ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default Traders;
