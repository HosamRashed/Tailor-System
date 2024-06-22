import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchCustomer = () => {
  return (
    <View style={styles.container}>
      <Text>SearchCustomer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchCustomer;
