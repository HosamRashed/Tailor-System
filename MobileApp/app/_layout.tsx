import { Stack } from "expo-router/stack";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/index";

const Layout = () => {
  return (
    <Provider store={store}>
      <Stack initialRouteName="home">
        <Stack.Screen name="home" />
      </Stack>
    </Provider>
  );
};

export default Layout;
