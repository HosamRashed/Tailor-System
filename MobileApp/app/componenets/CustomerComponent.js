import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns"; // Import date-fns for date formatting
import { useRouter, Stack } from "expo-router";

const CustomerComponent = ({ customer }) => {
  const router = useRouter();
  // Format measurements dates to dd/MM/yyyy
  const formattedMeasurements = customer.measurements.map((measurement) => ({
    ...measurement,
    date: format(new Date(measurement.date), "dd/MM/yyyy"),
  }));

  let lastVisitDate = "أول زيارة!"; // Default message for first visit

  // If measurements exist, find the latest date
  if (formattedMeasurements.length > 0) {
    const sortedMeasurements = formattedMeasurements.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    lastVisitDate = sortedMeasurements[0].date;
  }

  const handleCustomer = () => {
    router.push({
      pathname: "../screens/CustomerDetail",
      params: { customer: JSON.stringify(customer) },
    });
  };

  return (
    <TouchableOpacity onPress={handleCustomer} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>اسم الزبون : {customer.fullName}</Text>
        <Text style={styles.label}>رقم الجوال : {customer.phoneNumber}</Text>
        <Text style={styles.label}>آخر زيارة : {lastVisitDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    textAlign: "right",
    marginBottom: 5,
  },
});

export default CustomerComponent;
