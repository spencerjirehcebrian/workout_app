import { useEffect, useState } from "react";
import React from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { SequenceItem, Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";
import { getWorkoutBySlug } from "../storage/workout";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { PressableText } from "../components/styled/PressableText";
import { Modal } from "../components/styled/Modals";
import { formatSec } from "../utils/time";
import { FontAwesome } from "@expo/vector-icons";
import { useCountdown } from "../hooks/useCountDown";

type DetailParams = {
  route: {
    params: {
      slug: string;
    };
  };
};

type Navigation = NativeStackHeaderProps & DetailParams;

export default function WorkoutDetailScreen({ route }: any & DetailParams) {
  // useEffect(() => {
  //   async function getData() {
  //     const workout = await getWorkoutBySlug(route.params.slug);
  //     // console.log(workout);
  //   }
  //   getData();
  // }, []);
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [trackerIdx, setTrackerIdx] = useState(-1);
  const workout = useWorkoutBySlug(route.params.slug);
  const countDown = useCountdown(
    trackerIdx,
    trackerIdx >= 0 ? sequence[trackerIdx].duration : -1
  );
  useEffect(() => {
    // console.log("DETAIL Screen - ", countDown);
    if (!workout || trackerIdx + 1 === workout.sequence.length - 1) {
      return;
    }
    if (countDown === 0) {
      addItemToSequence(trackerIdx + 1);
    }

    return () => {};
  }, [countDown]);

  const addItemToSequence = (idx: number) => {
    setSequence([...sequence, workout!.sequence[idx]]);
    setTrackerIdx(idx);
  };

  if (!workout) {
    return null;
  }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>{workout?.name}</Text> */}
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText onPress={handleOpen} text="Check Sequence" />
          )}
        >
          <View>
            {workout?.sequence.map((s: any, idx: number) => (
              <View style={styles.sequence} key={s.slug}>
                <Text>
                  {s.name} | {s.type} | {formatSec(s.duration)}
                </Text>
                {idx !== workout.sequence.length - 1 && (
                  <FontAwesome name="arrow-down" size={20} color="black" />
                )}
              </View>
            ))}
          </View>
        </Modal>
      </WorkoutItem>
      {sequence.length === 0 && (
        <FontAwesome
          name="play-circle-o"
          onPress={() => addItemToSequence(0)}
          size={100}
        />
      )}

      {/* <Modal
        activator={({ handleOpen }) => (
          <Button onPress={handleOpen} title="Check Sequence" />
        )}
      >
        <Text>asdasd Hellow meow</Text>
      </Modal>

      <Modal>
        <Text>asdasd</Text>
      </Modal> */}
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
  sequence: {
    alignItems: "center",
  },
});
