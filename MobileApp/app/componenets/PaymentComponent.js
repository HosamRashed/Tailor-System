import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

const PaymentComponent = ({ payment, traderID, onDelete }) => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${url}/shops/${shopID}/traders/${traderID}/${payment._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete payment");
      }
      onDelete(); // Call the callback function to update the payments list
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("Error deleting payment:", error);
    }
  };
  const confirmDelete = () => {
    Alert.alert(
      "تأكيد الحذف",
      "هل أنت متأكد أنك تريد حذف هذه الدفعة؟",
      [
        {
          text: "إلغاء",
          style: "cancel",
        },
        {
          text: "حذف",
          onPress: handleDelete,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>مبلغ الدفعة : {payment.paymentAmount}</Text>
        <Text style={styles.label}>ملاحظه : {payment.notes}</Text>
        <Text style={styles.label}>
          تاريخ الدفعه : {formatDate(payment.date)}
        </Text>

        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Ionicons name="trash-outline" size={35} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
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
  deleteButton: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    padding: 10,
    // borderRadius: 5,
  },
});

export default PaymentComponent;
