import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

const MeasurementComponent = (props) => {
  const router = useRouter();
  const { measurement, onDelete, customerID } = props;
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);

  const handleDelete = () => {
    Alert.alert("تأكيد الحذف", "هل أنت متأكد أنك تريد حذف هذه المقاس ؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        onPress: async () => {
          const response = await fetch(
            `${url}/shops/${shopID}/${customerID}/measurements/${measurement._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            onDelete(measurement._id);
          } else {
            Alert.alert("Error", "Failed to delete measurement");
          }
        },
        style: "destructive",
      },
    ]);
  };

  const handleEdit = () => {
    router.push({
      pathname: "./AddNewMeasurement",
      params: {
        measurements: JSON.stringify(measurement),
        customerID: customerID,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleEdit}>
      <Text style={styles.label}>تاريخ المقاس : {measurement.date}</Text>
      <Text style={styles.label}>رقم الصفحة : {measurement.pageNumber}</Text>
      <Text style={styles.label}>
        عدد الثياب : {measurement.numberOfThoabs}
      </Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={handleDelete} style={styles.icon}>
          <Ionicons name="trash" size={30} color="red" />
        </TouchableOpacity>
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
    position: "relative",
  },
  label: {
    marginLeft: 3,
    fontSize: 17,
    textAlign: "right",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default MeasurementComponent;
