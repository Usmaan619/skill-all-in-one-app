import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { connect, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SetNetInfo } from "../redux/actions/action";
import { ICONS } from "../constants/Constant";
const NetworkModal = ({ visible, isNetConnected }) => {
  console.log("isNetConnected:Modal Page ", isNetConnected);
  const netinfo = useNetInfo();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      new Promise(async (res, rej) => {
        dispatch(SetNetInfo(netinfo?.isConnected));

        res(1);
      });
    })
  );

  return (
    <Modal
      visible={visible}
      onRequestClose={netinfo.isConnected}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.box_1}>
          <Text style={styles.header}>Oopss</Text>
          <Text style={styles.text}>Please Check Network</Text>
          <Image
            style={styles.netIcon}
            source={ICONS.networkDisconnectImg}
            fadeDuration={0}
          />

          <TouchableOpacity style={styles.box_2}>
            <LinearGradient
              style={styles.buttonStyle}
              colors={styles.colorsBtn}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box_1: {
    width: "80%",
    height: 250,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
  },
  text: {
    width: 200,
    marginBottom: 20,
    textAlign: "center",
  },
  box_2: {
    height: 45,
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  try_again: {
    color: "#fff",
  },
  colorsBtn: ["#4c54d285", "#806bff"],
  buttonStyle: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 50,
    width: "100%",
    zIndex: 99,
    position: "relative",
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("1.9%"),
    fontWeight: "700",
  },
  netIcon: { resizeMode: "cover", height: 65, width: 65 },
});

const mapStateToProps = (state) => {
  return {
    ...state?.auth,
    ...state?.loader,
    ...state?.isNetConnected,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkModal);
