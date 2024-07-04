import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const PaymentComponent = ({ payment }) => {
  console.log(payment);
  const router = useRouter();

  const handleEdit = () => {
    // Handle edit action
  };

  const handleDelete = () => {
    // Handle delete action
  };

  return (
    <TouchableOpacity accessible={false}>
      <View style={styles.container}>
        {/* <Text style={styles.label}>اسم الموزع : {trader.name}</Text>
        <Text style={styles.label}>رقم الجوال : {trader.phoneNumber}</Text>
        <Text style={styles.label}>
          المبلغ المتبقي : {trader.remainingAmount}
        </Text> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>تعديل</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>حذف</Text>
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  editButton: {
    marginRight: 8,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 13,
  },
});

export default PaymentComponent;
