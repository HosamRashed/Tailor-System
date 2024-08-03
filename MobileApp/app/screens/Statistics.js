import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, Stack } from "expo-router";
import { useSelector } from "react-redux";
import MeasurementsStatus from "../componenets/MeasurementsStatus"; // Import the new component

const Statistics = () => {
  const shopID = useSelector((state) => state.user.user._id);
  const url = useSelector((state) => state.user.url);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isFromDatePickerVisible, setFromDatePickerVisibility] =
    useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(
    moment().subtract(30, "days").toDate()
  );
  const [toDate, setToDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [selectedStatus]);

  const fetchData = async () => {
    setLoading(true);
    const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
    const formattedToDate = moment(toDate).format("YYYY-MM-DD");
    const completeUrl = `${url}/shops/${shopID}/measurements/dates?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;

    try {
      const response = await fetch(completeUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      setLoading(false);
      if (res.length > 0) {
        const formattedMeasurements = res.map((measurement) => ({
          ...measurement,
          date: moment(measurement.date).format("DD/MM/YYYY"),
        }));
        setFilteredData(formattedMeasurements);
      } else {
        setFilteredData([]);
        setNoData("لا يوجد مقاسات سابقة للزبون!");
      }
    } catch (error) {
      Alert.alert("Request error", error.message);
      console.log(error.message);
    }
  };

  const toggleStatus = async (item) => {
    console.log(item.customerID);
    const newStatus = !item.status;
    const updatedItem = { ...item, status: newStatus };
    try {
      await fetch(
        `${url}/shops/${shopID}/${item.customerID}/measurments/${item._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      // Update local state with the new data
      setFilteredData((prevData) =>
        prevData.map((measurement) =>
          measurement._id === item._id ? updatedItem : measurement
        )
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Update error", "Failed to update the status.");
    }
  };

  const handleConfirmFromDate = (date) => {
    setFromDate(moment(date).toDate()); // Convert to Date object
    setFromDatePickerVisibility(false);
  };

  const handleConfirmToDate = (date) => {
    setToDate(moment(date).toDate()); // Convert to Date object
    setToDatePickerVisibility(false);
  };

  const getFilteredData = () => {
    if (selectedStatus === "جاهز") {
      return filteredData.filter((item) => item.status === true);
    } else if (selectedStatus === "غير جاهز") {
      return filteredData.filter((item) => item.status === false);
    } else {
      return filteredData;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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

      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "#f0f0f0" },
            headerShadowVisible: false,
            headerTitle: "",
            headerShown: false,
          }}
        />
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setToDatePickerVisibility(true)}
          >
            <Text style={styles.datePickerText}>
              الى: {moment(toDate).format("YYYY-MM-DD")}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isToDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmToDate}
            onCancel={() => setToDatePickerVisibility(false)}
          />
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setFromDatePickerVisibility(true)}
          >
            <Text style={styles.datePickerText}>
              من: {moment(fromDate).format("YYYY-MM-DD")}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isFromDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmFromDate}
            onCancel={() => setFromDatePickerVisibility(false)}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={fetchData}>
          <Text style={styles.searchButtonText}>بحث</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              selectedStatus === "جاهز" && styles.selectedStatusButton,
            ]}
            onPress={() => setSelectedStatus("جاهز")}
          >
            <Text
              style={[
                styles.statusButtonText,
                selectedStatus === "جاهز" && styles.selectedStatusButtonText,
              ]}
            >
              جاهز
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              selectedStatus === "غير جاهز" && styles.selectedStatusButton,
            ]}
            onPress={() => setSelectedStatus("غير جاهز")}
          >
            <Text
              style={[
                styles.statusButtonText,
                selectedStatus === "غير جاهز" &&
                  styles.selectedStatusButtonText,
              ]}
            >
              غير جاهز
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              selectedStatus === "" && styles.selectedStatusButton,
            ]}
            onPress={() => setSelectedStatus("")}
          >
            <Text
              style={[
                styles.statusButtonText,
                selectedStatus === "" && styles.selectedStatusButtonText,
              ]}
            >
              الكل
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            عدد الثياب: {getFilteredData().length}
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          {getFilteredData().map((item, index) => (
            <MeasurementsStatus
              key={index}
              item={item}
              toggleStatus={toggleStatus}
            />
          ))}
        </ScrollView>
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
    marginLeft: 16,
    marginTop: 16,
  },

  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  datePickerButton: {
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  datePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  searchButton: {
    padding: 12,
    backgroundColor: "#28a745",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statusButton: {
    padding: 12,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedStatusButton: {
    backgroundColor: "#17a2b8",
  },
  statusButtonText: {
    color: "black",
    fontSize: 16,
  },
  selectedStatusButtonText: {
    color: "#fff",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "500",
  },
  scrollViewContentContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemDetails: {
    flex: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    color: "#333",
  },
  itemDate: {
    fontSize: 14,
    fontWeight: "300",
    color: "#888",
  },
  statusToggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  statusReady: {
    backgroundColor: "#28a745",
  },
  statusNotReady: {
    backgroundColor: "#dc3545",
  },
  statusToggleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  statusReadyText: {
    color: "#fff",
  },
  statusNotReadyText: {
    color: "#fff",
  },
});

export default Statistics;
