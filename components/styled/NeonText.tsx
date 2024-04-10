import React from "react";
import { Text } from "react-native";

// export function NeonText({ children }: { children: React.ReactNode }) {
export function NeonText(props: Text["props"]) {
  return (
    <Text
      // children={children}
      // children={props.children}
      {...props}
      style={[props.style, { fontFamily: "neon" }]}
    />
  );
}
