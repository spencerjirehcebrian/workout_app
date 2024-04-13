import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, useColorScheme } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import PlannerScreen from "./screens/PlannerScreen";
import Navigation from "./navigation/index";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoaded = useCachedResources();
  const theme = useColorScheme();

  if (isLoaded) {
    return (
      <SafeAreaProvider>
        {/* <HomeScreen /> */}
        {/* <PlannerScreen /> */}
        <Navigation colorScheme={theme} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
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
