import { Redirect } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/index";
import Login from "./screens/Login";

export default function Index() {
  return (
    <Provider store={store}>
      <Login href="/screens/Login" />
    </Provider>
  );
}
