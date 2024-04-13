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
  children: FunctionComponent<{
    handleOpen: () => void;
    handleClose: () => void;
  }>;
};
export function Modal({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const handleOpen = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);
  return (
    <>
      <ReactModal
        visible={isModalVisible}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.centerView}>
          <View style={styles.contentView}>
            {children({ handleOpen, handleClose })}
          </View>

          <PressableText
            onPress={() => setModalVisible(false)}
            text="Close Sequence"
          />
        </View>
      </ReactModal>
      {Activator ? (
        <Activator handleOpen={handleOpen} />
      ) : (
        <PressableText onPress={() => handleOpen()} text="Open" />
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
