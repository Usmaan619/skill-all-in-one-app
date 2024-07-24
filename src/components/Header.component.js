import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const HeaderModal = ({ visible, onClose }) => {
  return (
    <View style={styles.container}>
      {/* <Button title="Show Modal" onPress={toggleModal} /> */}

      <Modal
        isVisible={visible}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection="up"
        onRequestClose={onClose}
        onBackButtonPress={onClose}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Button title="Hide Modal" onPress={onClose} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-start", // Position the modal at the top
    margin: 0, // Fullscreen modal without margin
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: 300,
  },
});

export default HeaderModal;

// HeaderModal visible={isModalVisible} onClose={toggleModal} />

// const [isModalVisible, setIsModalVisible] = useState(false);

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };
