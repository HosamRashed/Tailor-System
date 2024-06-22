import React from "react";
import { Text } from "react-native";
import { Stack } from "expo-router";

import { COLORS } from "../../constants";

const NewCustomer = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <Text>Hello</Text>
    </>
  );
};

export default NewCustomer;
