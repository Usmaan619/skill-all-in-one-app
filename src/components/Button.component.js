import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const CommonButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      <LinearGradient
        colors={["#b69d7f", "#b69d7fc7"]} // Gradient colors
        style={[styles.linearGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    height: 50,
    zIndex: 99,
    marginHorizontal: "auto",
    width: "100%",
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 40,
    height: 50,
    width: "100%",
    elevation: 5,
    zIndex: 100,
  },
  text: {
    color: "white", // default text color
    fontSize: hp("1.9%"),
    fontWeight: "700",
  },
});

export default CommonButton;
