import React, { FunctionComponent, ReactNode, useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  FlatList,
  Modal as ReactModal,
} from "react-native";
import { PressableText } from "../../components/styled/PressableText";

type ModalProps = {
  activator?: FunctionComponent<{ handleOpen: () => void }>;
  children: ReactNode;
};
export function Modal({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ReactModal
        visible={isModalVisible}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.centerView}>
          <View style={styles.contentView}>{children}</View>

          <PressableText
            onPress={() => setModalVisible(false)}
            text="Close Sequence"
          />
        </View>
      </ReactModal>
      {Activator ? (
        <Activator handleOpen={() => setModalVisible(true)} />
      ) : (
        <PressableText onPress={() => setModalVisible(true)} text="Open" />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginBottom: 20,
  },
});
