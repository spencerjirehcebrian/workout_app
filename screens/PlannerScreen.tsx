import { useEffect } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Text, View, Pressable } from "react-native";

export default function PlannerScreen({ navigation }: any) {
  // useEffect(() => {
  //   console.log("Rending Planner Screen");
  //   return () => console.log("Unmounting Planner Screen");
  // }, []);

  return (
    <View>
      <Text>Planner screen</Text>
      {/* <Pressable onPress={() => navigation.navigate("Home")}>
        <Text style={{ fontSize: 24 }}>To Home</Text>
      </Pressable> */}
    </View>
  );
}
