import { useState } from "react";

import { View, ScrollView, SafeAreaView, Text } from "react-native";
import { Stack, useRouer, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>Home Page</Text>
    </SafeAreaView>
  );
};

export default Home;
