import React from "react";
import { Alert, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";

const MeasurementsStatus = ({ item, toggleStatus }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[
          styles.statusToggleButton,
          item.status ? styles.statusReady : styles.statusNotReady,
        ]}
        onPress={() => toggleStatus(item)}
      >
        <Text
          style={[
            styles.statusToggleText,
            item.status ? styles.statusReadyText : styles.statusNotReadyText,
          ]}
        >
          {item.status ? "جاهز" : "غير جاهز"}
        </Text>
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>اسم الزبون: {item.fullName}</Text>
        <Text style={styles.itemText}>رقم الصفحة: {item.pageNumber}</Text>
        <Text style={styles.itemDate}>تاريخ: {item.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: "right",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    color: "#333",
  },
  itemDate: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: "300",
    color: "#888",
  },
  statusToggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
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

export default MeasurementsStatus;
