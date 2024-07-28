import { useRouter, Stack } from "expo-router";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserSession } from "./actions/userActions";

import Login from "./screens/Login";
import Home from "./home";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const userSession = await AsyncStorage.getItem("userSession");
      if (userSession) {
        dispatch(setUserSession(JSON.parse(userSession)));
        router.replace("/home");
      } else {
        console.log("there was no user session!");
      }
    };
    checkSession();
  }, []);
  const dispatch = useDispatch();

  return <Login href="/screens/Login" />;
}
