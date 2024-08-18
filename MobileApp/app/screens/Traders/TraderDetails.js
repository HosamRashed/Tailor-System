import React, { useState, useCallback } from "react";
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
import { useFocusEffect, useRouter, Stack } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import PaymentComponent from "../../componenets/PaymentComponent"; // Adjust the path according to your project structure

const TraderDetails = () => {
  const url = useSelector((state) => state.user.url);
  const shopID = useSelector((state) => state.user.user.shopInfo._id);
  const [traderDetails, setTraderDetails] = useState({});
  const route = useRoute();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState("");

  const { traderID } = route.params;
  const cleanedTraderID = traderID.replace(/^"|"$/g, "");

  useFocusEffect(
    useCallback(() => {
      handleRequest();
    }, [])
  );

  const handleRequest = async () => {
    const userToken = await SecureStore.getItemAsync("userToken");
    setLoading(true);
    const completeUrl = `${url}/shops/${shopID}/traders/${cleanedTraderID}`;

    fetch(completeUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res && res.payments) {
          setTraderDetails(res);
          if (res.payments.length === 0) {
            setNoData("لا يوجد دفعات سابقة !");
          }
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

  const handleAddPaymentPress = () => {
    if (traderDetails.remainingAmount === 0) {
      Alert.alert(`لا يوجد مبلغ متبقي للمندوب !`);
    } else {
      router.push({
        pathname: "./NewPayment",
        params: { trader: JSON.stringify(traderDetails) },
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.homeIcon} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={32} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: true,
            headerTitle: "",
            headerShown: false,
          }}
        />

        <View style={styles.box}>
          <Text style={styles.label}>اسم المندوب : {traderDetails.name}</Text>
          <Text style={styles.label}>
            المبلغ الأساسي : {traderDetails.moneyAmount}
          </Text>
          <Text style={styles.label}>
            المبلغ المتبقي : {traderDetails.remainingAmount}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#90ee90" />
        ) : traderDetails.payments && traderDetails.payments.length > 0 ? (
          <>
            <Text style={styles.searchTitle}>تفاصيل الدفعات :</Text>
            <FlatList
              data={traderDetails.payments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <PaymentComponent
                  payment={item}
                  traderID={cleanedTraderID}
                  onDelete={handleRequest} // Pass the delete callback function
                />
              )}
              contentContainerStyle={styles.paymentsList}
            />
          </>
        ) : (
          <Text style={styles.noDataText}>{noData}</Text>
        )}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPaymentPress}
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
    top: Platform.OS === "ios" ? 10 : 10, // Adjusting for potential status bar height on iOS
    left: 16,
    zIndex: 1,
    marginBottom: 10,
  },
  box: {
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
