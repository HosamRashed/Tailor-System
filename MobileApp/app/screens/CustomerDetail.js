import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, Stack } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import MeasurementComponent from "../componenets/MeasurementComponent";

const CustomerDetail = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);
  const [measurements, setMeasurements] = useState([]);
  const route = useRoute();
  const router = useRouter();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  let [noData, setNoData] = useState("");

  const { customer } = route.params;
  const customerObj = JSON.parse(customer);
  const customerID = customerObj._id;

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = () => {
    setLoading(true);
    const completeUrl = `${url}/shops/${shopID}/${customerID}/measurements`;

    fetch(completeUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.length > 0) {
          const formattedMeasurements = res.map((measurement) => ({
            ...measurement,
            date: format(new Date(measurement.date), "dd/MM/yyyy"),
          }));
          setMeasurements(formattedMeasurements);
        } else {
          setNoData("لا يوجد مقاسات سابقة للزبون!");
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Request error", error.message);
        console.log(error.message);
      });
  };

  const handleDelete = (id) => {
    setMeasurements(
      measurements.filter((measurement) => measurement._id !== id)
    );
    // handleRequest();
  };

  const handleEdit = () => {
    handleRequest();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.homeIcon}
          onPress={() => router.back("../home")}
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

        {loading ? (
          <ActivityIndicator size="large" color="#90ee90" />
        ) : measurements.length > 0 ? (
          <>
            <Text style={styles.searchTitle}>جميع المقاسات السابقه : </Text>
            <FlatList
              data={measurements}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <MeasurementComponent
                  measurement={item}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  customerID={customerID}
                />
              )}
              contentContainerStyle={styles.measurementsList}
            />
          </>
        ) : (
          <Text style={styles.noDataText}>{noData}</Text>
        )}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              /* Handle adding new measurement */
            }}
          >
            <Text style={styles.addButtonText}>إضافة قياس جديد</Text>
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
    top: Platform.OS === "ios" ? 10 : 10,
    left: 0,
    zIndex: 1,
  },
  customerName: {
    textAlign: "center",
    fontSize: Platform.isPad ? 28 : 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },
  searchTitle: {
    marginVertical: 10,
    fontSize: Platform.isPad ? 26 : 20,
    textAlign: "right",
  },
  measurementsList: {
    paddingBottom: 100,
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
    backgroundColor: "#90ee90",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "#000",
    fontSize: 20,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "grey",
    marginTop: 20,
  },
});

export default CustomerDetail;
