import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { format, isValid, parseISO } from "date-fns"; // Import date-fns for date formatting and validation
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomerComponent = ({ customer, onDelete, onUpdate }) => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user.shopInfo._id);
  const router = useRouter();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [fullName, setFullName] = useState(customer.fullName);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);

  // Format measurements dates to dd/MM/yyyy
  const formattedMeasurements = customer.measurements.map((measurement) => {
    const parsedDate =
      typeof measurement.date === "string"
        ? parseISO(measurement.date)
        : measurement.date;

    if (!isValid(parsedDate)) {
      console.warn(`Invalid date format: ${measurement.date}`);
      return {
        ...measurement,
        date: "تاريخ غير صالح",
      };
    }

    return {
      ...measurement,
      date: format(parsedDate, "dd/MM/yyyy"),
    };
  });

  let lastVisitDate = "أول زيارة!";

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

  const handleDelete = async () => {
    const userToken = await SecureStore.getItemAsync("userToken");
    Alert.alert("تأكيد الحذف", "هل أنت متأكد أنك تريد حذف هذه الزبون ؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        onPress: async () => {
          const response = await fetch(
            `${url}/shops/${shopID}/customers/${customer._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (response.ok) {
            onDelete(customer._id);
          } else {
            Alert.alert("Error", "Failed to delete measurement");
          }
        },
        style: "destructive",
      },
    ]);
  };

  const handleEdit = async () => {
    const userToken = await SecureStore.getItemAsync("userToken");
    try {
      const response = await fetch(
        `${url}/shops/${shopID}/customers/${customer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            fullName,
            phoneNumber,
          }),
        }
      );

      if (response.ok) {
        setEditModalVisible(false);
        onUpdate();
      } else {
        Alert.alert(`خطأ ! لم يتم تحديث بيانات الزبون`);
      }
    } catch (err) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleCustomer} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.label}>اسم الزبون : {customer.fullName}</Text>
          <Text style={styles.label}>رقم الجوال : {customer.phoneNumber}</Text>
          <Text style={styles.label}>آخر زيارة : {lastVisitDate}</Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={handleDelete} style={styles.icon}>
              <Ionicons name="trash" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPhoneNumber(customer.phoneNumber);
                setFullName(customer.fullName);
                setEditModalVisible(true);
              }}
              style={styles.icon}
            >
              <Ionicons name="pencil" size={30} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType=""
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>تعديل بيانات الزبون</Text>

            <TextInput
              style={styles.input}
              placeholder="اسم الزبون"
              value={fullName}
              textAlign="right"
              placeholderTextColor="#ccc"
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="رقم الجوال"
              placeholderTextColor="#ccc"
              textAlign="right"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleEdit}
              >
                <Text style={styles.buttonText}>حفظ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    textAlign: "right",
    marginBottom: 5,
    color: "#333",
  },

  icons: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    justifyContent: "start",
    // marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    aligtext: "right",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    fontSize: 16,
    padding: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#90ee90",
  },
  buttonText: {
    color: "black",
    // fontWeight: "bold",
  },
});

export default CustomerComponent;
