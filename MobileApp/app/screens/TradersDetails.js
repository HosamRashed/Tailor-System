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

const validationSchema = yup.object().shape({
  searchText: yup
    .string()
    .required("نص البحث مطلوب")
    .matches(
      /^[A-Za-z\u0600-\u06FF\s]+$/,
      "يجب أن يحتوي الاسم على حروف فقط بدون أرقام"
    ),
});

//  useEffect(() => {
//     handleRequest();
//   }, []);

//   const handleRequest = () => {
//     setLoading(true);
//     const completeUrl = `${url}/shops/${shopID}/traders`;

//     fetch(completeUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         setLoading(false);
//         setResults(res);
//         } else {
//           setNoData("لا يوجد مقاسات سابقة للزبون!");
//         }
//       })
//       .catch((error) => {
//         setLoading(false);
//         Alert.alert("Request error", error.message);
//         console.log(error.message);
//       });
//   };

const TradersDetails = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);
  const [searchText, setSearchText] = useState("");
  const [noData, setNoData] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    const completeUrl = `${url}/shops/${shopID}/traders`;
    const data = {
      CustomerInfo: values.searchText,
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
          setNoData("لا يوجد موزعين!");
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
            <Text style={styles.title}>قائمة الموزعين</Text>
            <Formik
              initialValues={{ searchText: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    value={values.searchText}
                    onChangeText={handleChange("searchText")}
                    onBlur={handleBlur("searchText")}
                    keyboardType="default"
                  />
                  {touched.searchText && errors.searchText && (
                    <Text style={styles.errorText}>{errors.searchText}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.searchButtonText}>ابحث</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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
    position: "absolute",
    top: Platform.OS === "ios" ? 10 : 10,
    // left: 10,
    zIndex: 1,
  },
  title: {
    marginTop: 60,
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
    marginTop: 20,
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

export default TradersDetails;
