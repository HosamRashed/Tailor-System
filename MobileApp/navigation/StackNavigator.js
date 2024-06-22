import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../app/home";
import NewCustomer from "../screens/NewCustomer";
import AddMeasurement from "../screens/AddMeasurement";
import SearchCustomer from "../screens/SearchCustomer";
import ThoabDetails from "../screens/ThoabDetails";
import TradersDetails from "../screens/TradersDetails";
import Support from "../screens/Support";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false, // Set headerShown to false to hide the header
        }}
      />
      <Stack.Screen name="NewCustomer" component={NewCustomer} />
      <Stack.Screen name="AddMeasurement" component={AddMeasurement} />
      <Stack.Screen name="SearchCustomer" component={SearchCustomer} />
      <Stack.Screen name="ThoabDetails" component={ThoabDetails} />
      <Stack.Screen name="TradersDetails" component={TradersDetails} />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
