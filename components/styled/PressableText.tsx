import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
export type PressableTextProps = PressableProps & {
  text: string;
  style: StyleProp<ViewStyle>;
};
export function PressableText(props: PressableProps & { text: string }) {
  return (
    <Pressable {...props}>
      <Text style={{ textDecorationLine: "underline" }}>{props.text}</Text>
    </Pressable>
  );
}
