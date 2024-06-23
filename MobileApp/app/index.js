import { Redirect } from "expo-router";
import React from "react";

import Login from "./screens/Login";

export default function Index() {
  return <Login href="/screens/Login" />;
}
