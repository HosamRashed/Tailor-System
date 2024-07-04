import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const TraderComponent = ({ trader }) => {
  const router = useRouter();

  const handleEdit = () => {
    // Handle edit action
  };

  const handleDelete = () => {
    // Handle delete action
  };

  const handleTrader = () => {
    router.push({
      pathname: "../Traders/TraderDetails",
      params: { trader: JSON.stringify(trader) },
    });
  };

  return (
    <TouchableOpacity onPress={handleTrader} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>اسم الموزع : {trader.name}</Text>
        <Text style={styles.label}>رقم الجوال : {trader.phoneNumber}</Text>
        <Text style={styles.label}>
          المبلغ المتبقي : {trader.remainingAmount}
        </Text>
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

export default TraderComponent;
