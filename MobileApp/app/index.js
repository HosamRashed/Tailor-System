import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { setUserSession, clearUserSession } from "./actions/userActions";

import Login from "./screens/Login";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, tokenExpiration, isLoggedIn } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const loginStatus = await SecureStore.getItemAsync("loginStatus");

        if (loginStatus === "loggedIn") {
          const userSession = await SecureStore.getItemAsync("userSession");
          const token = await SecureStore.getItemAsync("userToken");
          const tokenExpiration = await SecureStore.getItemAsync(
            "tokenExpiration"
          );

          if (userSession && token && tokenExpiration) {
            const currentTime = Date.now();

            if (currentTime < parseInt(tokenExpiration)) {
              // Token is valid
              dispatch(
                setUserSession(JSON.parse(userSession), token, tokenExpiration)
              );
              router.replace("/home");
            } else {
              // Token is expired
              dispatch(clearUserSession());
              await SecureStore.deleteItemAsync("userSession");
              await SecureStore.deleteItemAsync("userToken");
              await SecureStore.setItemAsync("loginStatus", "loggedOut");
              router.replace("/screens/Login");
            }
          } else {
            // No session or token found
            router.replace("/screens/Login");
          }
        } else {
          // Not logged in
          router.replace("/screens/Login");
        }
      } catch (error) {
        console.error("Failed to check login status or token validity:", error);
        router.replace("/screens/Login");
      }
    };

    checkSession();
  }, [dispatch, router]);

  return <Login href="/screens/Login" />;
};

export default Index;
