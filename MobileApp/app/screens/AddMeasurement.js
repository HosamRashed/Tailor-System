import React from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const AddMeasurement = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <Text>AddMeasurement</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
});

export default AddMeasurement;
