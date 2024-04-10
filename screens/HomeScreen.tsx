import { useEffect } from "react";
import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import data from "../data.json";
import { Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";
import { NeonText } from "../components/styled/NeonText";

export default function HomeScreen({ navigation }: any) {
  // useEffect(() => {
  //   console.log("Rending Home Screen");
  //   return () => console.log("Unmounting Home Screen");
  // }, []);
  // const renderItem = ({ item }: { item: Workout }) => (
  //   <View>
  //     <Text>{item.name}</Text>
  //     <Text>{item.difficulty}</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workouts</Text>
      <NeonText style={{ fontSize: 30 }}>Try Them Out</NeonText>
      {/* <Pressable onPress={() => navigation.navigate("Planner")}>
        <Text style={{ fontSize: 24 }}>To Planner</Text>
      </Pressable> */}
      <FlatList
        data={data as Workout[]}
        renderItem={WorkoutItem}
        keyExtractor={(item) => item.slug}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // paddingTop: 40,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    // fontFamily: "neon",
  },
});
