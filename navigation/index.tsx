import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PlannerScreen from "../screens/PlannerScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          // tabBarLabel: "",
        }}
      />
      <BottomTab.Screen
        name="Planner"
        component={PlannerScreen}
        options={{
          // headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
          // tabBarLabel: "",
        }}
      />
    </BottomTab.Navigator>
  );
}
