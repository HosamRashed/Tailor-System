import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, Stack } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import PaymentComponent from "../../componenets/PaymentComponent"; // Adjust the path according to your project structure

const TraderDetails = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user._id);
  const [payments, setPayments] = useState([]);
  const route = useRoute();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  let [noData, setNoData] = useState("");

  console.log(route.params);

  const { trader } = route.params;
  const traderObj = JSON.parse(trader);
  const traderID = traderObj._id;
  useEffect(() => {
    handleRequest();
  }, []);
  const handleRequest = () => {
    setLoading(true);
    const completeUrl = `${url}/shops/${shopID}/traders/${traderID}/payments`;

    fetch(completeUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.length > 0) {
          setPayments(res);
        } else {
          setNoData("لا يوجد دفعات سابقة !");
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Request error", error.message);
        console.log(error.message);
      });
  };

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
        <TouchableOpacity style={styles.homeIcon} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.box}>
          <Text style={styles.label}>اسم المندوب : {traderObj.name}</Text>
          <Text style={styles.label}>
            المبلغ الأساسي : {traderObj.moneyAmount}
          </Text>
          <Text style={styles.label}>
            المبلغ المتبقي : {traderObj.remainingAmount}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#90ee90" />
        ) : payments.length > 0 ? (
          <>
            <Text style={styles.searchTitle}>تفاصيل الدفعات :</Text>
            <FlatList
              data={payments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <PaymentComponent payment={item} />}
              contentContainerStyle={styles.paymentsList}
            />
          </>
        ) : (
          <Text style={styles.noDataText}>{noData}</Text>
        )}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              router.push("./NewPayment");
            }}
          >
            <Text style={styles.addButtonText}>إضافة دفعه جديده</Text>
          </TouchableOpacity>
        </View>
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
    top: Platform.OS === "ios" ? 10 : 10,
    left: 0,
    zIndex: 1,
  },
  box: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  searchTitle: {
    marginVertical: 10,
    fontSize: Platform.isPad ? 26 : 20,
    textAlign: "right",
  },
  paymentsList: {
    paddingBottom: 100,
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: "90%",
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#2b79ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "grey",
    marginTop: 20,
  },
});

export default TraderDetails;
