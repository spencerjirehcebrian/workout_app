import React from "react";
import { PressableProps, Text, useColorScheme } from "react-native";
import { PressableText } from "./PressableText";

export function PressableThemeText(props: PressableProps) {
  const colorScheme = useColorScheme();
  const color = colorScheme === "light" ? "#000" : "#fff";

  //   return <PressableText {...props} style={[props.style, { color }]} />;
}
