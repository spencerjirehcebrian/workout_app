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
  const startUpSequence = ["3", "2", "1", "Go"].reverse();
  const { countDown, isRunning, stop, start } = useCountdown(
    trackerIdx
    // trackerIdx >= 0 ? sequence[trackerIdx].duration : -1
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
    let newSequence = [] as SequenceItem[];
    if (idx > 0) {
      newSequence = [...sequence, workout!.sequence[idx]];
    } else {
      newSequence = [workout!.sequence[idx]];
    }
    setSequence(newSequence);
    setTrackerIdx(idx);
    start(newSequence[idx].duration + startUpSequence.length);
  };

  if (!workout) {
    return null;
  }
  const hasReachedEnd = countDown === 0;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>{workout?.name}</Text> */}
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText onPress={handleOpen} text="Check Sequence" />
          )}
        >
          {() => (
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
          )}
        </Modal>
      </WorkoutItem>
      <View style={styles.wrapper}>
        <View style={styles.counterUI}>
          <View style={styles.counterItem}>
            {sequence.length === 0 ? (
              <FontAwesome
                name="play-circle-o"
                onPress={() => addItemToSequence(0)}
                size={100}
              />
            ) : isRunning ? (
              <FontAwesome
                name="stop-circle-o"
                onPress={() => stop()}
                size={100}
              />
            ) : (
              <FontAwesome
                name="play-circle-o"
                onPress={() => {
                  if (hasReachedEnd) {
                    addItemToSequence(0);
                  } else {
                    start(countDown);
                  }
                }}
                size={100}
              />
            )}
          </View>
          {sequence.length > 0 && countDown >= 0 && (
            <View style={styles.counterItem}>
              <Text style={{ fontSize: 45 }}>
                {countDown > sequence[trackerIdx].duration
                  ? startUpSequence[
                      countDown - sequence[trackerIdx].duration - 1
                    ]
                  : countDown}
              </Text>
            </View>
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            {sequence.length === 0
              ? "Prepare"
              : hasReachedEnd
              ? "Great Job!"
              : sequence[trackerIdx].name}
            {/* {workout.sequence.length}-{sequence.length}-{hasReachedEnd} */}
          </Text>
        </View>
      </View>

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
  counterUI: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  counterItem: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 10,
  },
});
