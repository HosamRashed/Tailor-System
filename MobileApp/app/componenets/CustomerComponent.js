import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, Stack } from "expo-router";

const CustomerComponent = (props) => {
  const router = useRouter();
  const { customer, info: information } = props;

  let lastVisitDate = "اول زياره!";

  if (customer.measurements.length > 0) {
    // Sort measurements by date in descending order
    const sortedMeasurements = customer.measurements.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Get the most recent measurement date
    lastVisitDate = new Date(sortedMeasurements[0].date).toLocaleDateString();
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
        <Text style={styles.label}>اخر نفصيل : {lastVisitDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    width: "95%",
    borderRadius: 10,
    paddingHorizontal: 5,
    padding: 2,
    height: 85,
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    alignItems: "flex-end",
    paddingHorizontal: 25,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#171717",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  label: {
    marginLeft: 3,
    fontSize: 17,
    textAlign: "right",
  },
});

export default CustomerComponent;
