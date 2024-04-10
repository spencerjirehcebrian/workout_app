import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import PlannerScreen from "./screens/PlannerScreen";
import Navigation from "./navigation/index";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoaded = useCachedResources();
  console.log(isLoaded);

  if (isLoaded) {
    return (
      <>
        {/* <HomeScreen /> */}
        {/* <PlannerScreen /> */}
        <Navigation />
        <StatusBar style="auto" />
      </>
      // <View>
      //   <HomeScreen />
      //   <PlannerScreen /
      //   <StatusBar style="auto" />
      // </Vi>
    );
  } else {
    return null;
  }
}
