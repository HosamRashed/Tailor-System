import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { format, isValid, parseISO } from "date-fns"; // Import date-fns for date formatting and validation
import { useRouter } from "expo-router";

const CustomerComponent = ({ customer }) => {
  const router = useRouter();

  console.log(customer.measurements);
  // Format measurements dates to dd/MM/yyyy
  const formattedMeasurements = customer.measurements.map((measurement) => {
    // Ensure measurement.date is a valid ISO date string or Date object
    const parsedDate =
      typeof measurement.date === "string"
        ? parseISO(measurement.date)
        : measurement.date;

    // Validate parsed date
    if (!isValid(parsedDate)) {
      console.warn(`Invalid date format: ${measurement.date}`);
      return {
        ...measurement,
        date: "تاريخ غير صالح", // Provide a fallback if date is invalid
      };
    }

    // Format valid date to dd/MM/yyyy
    return {
      ...measurement,
      date: format(parsedDate, "dd/MM/yyyy"),
    };
  });

  // Determine last visit date
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
