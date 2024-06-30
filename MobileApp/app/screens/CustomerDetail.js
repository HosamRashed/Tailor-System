import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, Stack } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';
import MeasurementComponent from "../componenets/MeasurementComponent";

const CustomerDetail = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);
  const [measurements, setMeasurements] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  const { customer } = route.params;
  const customerObj = JSON.parse(customer);
  const customerID = customerObj._id;

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = () => {
    const completeUrl = `${url}/shops/${shopID}/${customerID}/measurments`;

    fetch(completeUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.length > 0) {
          const formattedMeasurements = res.map((measurement) => ({
            ...measurement,
            date: format(new Date(measurement.date), "dd/MM/yyyy"),
          }));
          setMeasurements(formattedMeasurements);
        } else {
          Alert.alert("There is no measurement data for this customer");
        }
      })
      .catch((error) => {
        Alert.alert("Request error", error.message);
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.homeIcon}
          onPress={() => navigation.goBack()}
        >
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: true,
              headerTitle: "",
              headerShown: false,
            }}
          />
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.customerName}>{customerObj.fullName}</Text>
        <FlatList
          data={measurements}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <MeasurementComponent measurement={item} />}
          contentContainerStyle={styles.measurementsList}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            /* Handle adding new measurement */
          }}
        >
          <Text style={styles.addButtonText}>إضافة قياس جديد</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>تواصل مع الدعم</Text>
        </TouchableOpacity>
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
    top: Platform.OS === "ios" ? 10 : 10,
    left: 0,
    zIndex: 1,
  },
  customerName: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  measurementsList: {
    paddingBottom: 100,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#90ee90",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "#000",
    fontSize: 20,
  },
  contactButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#f08080",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default CustomerDetail;
