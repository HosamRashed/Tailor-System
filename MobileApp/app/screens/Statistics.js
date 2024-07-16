import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect, useRouter, Stack } from "expo-router";
import moment from "moment";

const { width } = Dimensions.get("window");

const mockData = [
  { date: "2024-06-14", status: "completed" },
  { date: "2024-06-15", status: "pending" },
  { date: "2024-06-16", status: "completed" },
  // Add more mock data here...
];

const generateChartData = (data) => {
  const completedCount = data.filter(
    (item) => item.status === "completed"
  ).length;
  const pendingCount = data.filter((item) => item.status === "pending").length;

  return { completedCount, pendingCount };
};

const Statistics = () => {
  const router = useRouter();

  const [chartData, setChartData] = useState({
    completedCount: 0,
    pendingCount: 0,
  });
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(moment().subtract(30, 'days').toDate());
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    filterDataByDate(fromDate, toDate);
  }, [fromDate, toDate]);

  const filterDataByDate = (from, to) => {
    const filteredData = mockData.filter(item => {
      const itemDate = moment(item.date);
      return itemDate.isBetween(moment(from), moment(to), null, '[]');
    });
    const data = generateChartData(filteredData);
    setChartData(data);
  };

  const handleConfirmFromDate = (date) => {
    setFromDate(date);
    setFromDatePickerVisibility(false);
  };

  const handleConfirmToDate = (date) => {
    setToDate(date);
    setToDatePickerVisibility(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => router.back("../home")}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: true,
            headerTitle: "",
            headerShown: false,
          }}
        />
        <Ionicons name="arrow-back" size={32} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Shop Statistics</Text>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setFromDatePickerVisibility(true)}
          >
            <Text style={styles.datePickerText}>From: {moment(fromDate).format('YYYY-MM-DD')}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isFromDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmFromDate}
            onCancel={() => setFromDatePickerVisibility(false)}
          />
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setToDatePickerVisibility(true)}
          >
            <Text style={styles.datePickerText}>To: {moment(toDate).format('YYYY-MM-DD')}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isToDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmToDate}
            onCancel={() => setToDatePickerVisibility(false)}
          />
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total Thoabs: {chartData.completedCount + chartData.pendingCount}
          </Text>
          <Text style={styles.summaryText}>
            Completed: {chartData.completedCount}
          </Text>
          <Text style={styles.summaryText}>
            Pending: {chartData.pendingCount}
          </Text>
        </View>
        <Text style={styles.chartTitle}>Completion Status</Text>
        <PieChart
          data={[
            {
              name: "Completed",
              count: chartData.completedCount,
              color: "green",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Pending",
              count: chartData.pendingCount,
              color: "red",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
          ]}
          width={width - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </ScrollView>
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
    padding: 20,
    backgroundColor: "#fff",
  },
  homeIcon: {
    top: Platform.OS === "ios" ? 10 : 10,
    left: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  datePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Statistics;
