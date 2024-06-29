import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, Stack } from "expo-router";
import { useRoute, useNavigation } from "@react-navigation/native";
import MeasurementComponent from "../componenets/MeasurementComponent";

const CustomerDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const router = useRouter();
  const { customer } = route.params;
  const customerObj = JSON.parse(customer);
  console.log(customerObj.measurements);

  //   const renderMeasurement = ({ item }) => (
  //     <View style={styles.measurementContainer}>
  //       {/* <Text style={styles.measurementDetail}>تاريخ القياس: {item.date}</Text> */}
  //       {/* <Text style={styles.measurementDetail}>رقم الصفحة: {item.page}</Text>
  //       <Text style={styles.measurementDetail}>عدد القلاب: {item.count}</Text> */}
  //     </View>
  //   );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: true,
            headerTitle: "",
            headerShown: false,
          }}
        />
        <TouchableOpacity
          style={styles.homeIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.customerName}>{customerObj.fullName}</Text>
        <FlatList
          data={customerObj.measurements}
          keyExtractor={(item, index) => index.toString()}
          //   renderItem={({ item }) => <MeasurementComponent customer={item} />}
          contentContainerStyle={styles.measurementsList}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>إضافة قياس جديد</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>تواصل مع الدعم</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  homeIcon: {
    top: Platform.OS === "ios" ? 10 : 10, // Adjusting for potential status bar height on iOS
    left: 0,
    zIndex: 1,
  },
  customerName: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  measurementsList: {
    paddingBottom: 100,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#90ee90",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "#000",
    fontSize: 20,
  },
  contactButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#f08080",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default CustomerDetail;
