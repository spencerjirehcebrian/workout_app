import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";

export type WorkoutFormData = {
  name: string;
  //   duration: string;
  //   type: string;
  //   reps?: string;
};

type WorkoutProps = {
  onSubmit: (form: WorkoutFormData) => void;
};

const selectionItems = ["exercise", "break", "stretch"];

export default function WorkoutForm({ onSubmit }: WorkoutProps) {
  const { control, handleSubmit } = useForm();

  return (
    <View style={styles.container}>
      <Text>Workout Form</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            style={styles.input}
            value={value}
            placeholder="Workout Name"
            placeholderTextColor={"rgba(0,0,0, 0.5"}
          />
        )}
      />
      <PressableText
        text="Confirm"
        style={{ margin: 5 }}
        onPress={handleSubmit((data) => {
          onSubmit(data as WorkoutFormData);
        })}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    width: 200,
    height: 30,
    margin: 2,
    borderWidth: 1,
    padding: 5,
    borderColor: "rgba(0,0,0, 0.1)",
    borderRadius: 5,
  },
});
