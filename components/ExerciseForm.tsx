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

export type ExerciseFormData = {
  name: string;
  duration: string;
  type: string;
  reps?: string;
};

type WorkoutProps = {
  onSubmit: (form: ExerciseFormData) => void;
};

const selectionItems = ["exercise", "break", "stretch"];

export default function ExerciseForm({ onSubmit }: WorkoutProps) {
  const { control, handleSubmit } = useForm();
  const [isSelectionOn, setSelectionOn] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Exercise Form</Text>
      <View>
        <View style={styles.rowContainer}>
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
                placeholder="Exercise Name"
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                style={styles.input}
                value={value}
                placeholder="Duration"
              />
            )}
          />
        </View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="reps"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                style={styles.input}
                value={value}
                placeholder="Repitions"
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View style={{ flex: 1 }}>
                {isSelectionOn ? (
                  <View>
                    {selectionItems.map((selection) => (
                      <PressableText
                        key={selection}
                        text={selection}
                        style={styles.selection}
                        onPressIn={() => {
                          onChange(selection);
                          setSelectionOn(false);
                        }}
                      />
                    ))}
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.input}
                    onPressIn={() => setSelectionOn(true)}
                  >
                    <TextInput
                      onPressIn={() => setSelectionOn(true)}
                      value={value}
                      placeholder="Type"
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
        <PressableText
          text="Submit"
          style={{ margin: 5 }}
          onPress={handleSubmit((data) => {
            onSubmit(data as ExerciseFormData);
          })}
        />
      </View>
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
    flex: 1,
    height: 30,
    margin: 2,
    borderWidth: 1,
    padding: 5,
    borderColor: "rgba(0,0,0, 0.1)",
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: "row",
  },
  selection: {
    margin: 2,
    padding: 3,
    alignSelf: "center",
  },
});
