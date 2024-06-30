import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, Stack } from "expo-router";

const MeasurementComponent = (props) => {
  const router = useRouter();
  const { measurement, info: information } = props;

  const handleCustomer = () => {
    router.push({
      pathname: "../screens/CustomerDetail",
      params: { customer: JSON.stringify(customer) },
    });
  };

  return (
    <TouchableOpacity onPress={handleCustomer} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>تاريخ المقاس : {measurement.date}</Text>
        <Text style={styles.label}>رقم الصفحة : {measurement.pageNumber}</Text>
        <Text style={styles.label}>
          عدد الثياب : {measurement.numberOfThoabs}
        </Text>
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
    paddingHorizontal: 15,
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

export default MeasurementComponent;
