import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../app/home";
import NewCustomer from "../app/screens/NewCustomer";
import AddMeasurement from "../app/screens/AddMeasurement";
import SearchCustomer from "../app/screens/SearchCustomer";
import ThoabDetails from "../app/screens/Statistics";
import TradersDetails from "../app/screens/Traders/Traders";
import Support from "../app/screens/Support";

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
