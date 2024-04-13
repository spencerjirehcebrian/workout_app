import React, { useState } from "react";
import { useEffect } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { Difficulty, SequenceItem, SequenceType, Workout } from "../types/data";
import slugify from "slugify";
import ExerciseItem from "../components/ExerciseItems";
import { PressableText } from "../components/styled/PressableText";
import { Modal } from "../components/styled/Modals";
import WorkoutForm, { WorkoutFormData } from "../components/WorkoutForm";
import { storeWorkout } from "../storage/workout";

export default function PlannerScreen({ navigation }: any) {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);
  const handleExerciseSubmit = (form: ExerciseFormData) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + " " + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };
    if (form.reps) {
      sequenceItem.reps = Number(form.reps);
    }
    setSeqItems([...seqItems, sequenceItem]);
  };
  const computeDifficulty = (
    exercisesCount: number,
    workoutDuration: number
  ) => {
    const intensity = workoutDuration / exercisesCount;

    if (intensity <= 60) {
      return "hard";
    } else if (intensity <= 100) {
      return "normal";
    } else {
      return "easy";
    }
  };
  const handleWorkSubmit = async (form: WorkoutFormData) => {
    if (seqItems.length > 0) {
      const duration = seqItems.reduce((acc, item) => {
        return acc + item.duration;
      }, 0);
      const workout = {
        name: form.name,
        slug: slugify(form.name + " " + Date.now(), { lower: true }),
        difficulty: computeDifficulty(seqItems.length, duration) as Difficulty,
        sequence: [...seqItems],
        duration,
      };
      await storeWorkout(workout);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={seqItems}
        keyExtractor={(item) => item.slug}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="Remove Exercise"
              onPress={() => {
                const items = [...seqItems];
                items.splice(index, 1);
                setSeqItems(items);
              }}
            />
          </ExerciseItem>
        )}
      />
      <ExerciseForm onSubmit={handleExerciseSubmit} />
      <View>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText
              style={{ marginTop: 15 }}
              text="Create Workout"
              onPress={handleOpen}
            />
          )}
        >
          {({ handleClose }) => (
            <View>
              <WorkoutForm
                onSubmit={async (data) => {
                  await handleWorkSubmit(data);
                  handleClose();
                  navigation.navigate("Home Page");
                }}
              />
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
