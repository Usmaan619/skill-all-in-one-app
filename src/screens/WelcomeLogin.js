import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import { authStyles } from "../styles/Auth.styles";
import { ICONS } from "../constants/Constant";
import CommonButton from "../components/Button.component";
import { loginValidationSchema } from "../utils/Helper";
import { loginAPI } from "../services/Auth.service";
import { useDispatch } from "react-redux";
import { setData } from "../services/Storage.service";
import { SetIsLoggedIn, SetToken } from "../redux/actions/action";

import { COLORS } from "../constants/Colors";

const WelcomeLogin = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSubmit = async (val) => {};
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS?.secBlackColor,
      }}
    >
      <View style={styles.signUpcontainer}>
        <View className="flex justify-center">
          <View className="flex-row justify-center items-center">
            <Image
              source={ICONS?.intelligenceMainImg}
              resizeMode="cover"
              className="h-[160px] w-[160px] overflow-hidden mt-4"
            />
          </View>
          <Text
            className={`text-center my-5 text-lg font-semibold text-white`}
            // style={{ color: "#b69d7f" }}
          >
            Welcome Back,{"\n"} Please Choose your Account.
          </Text>
          <View style={styles.signUpInputMainContainer}>
            <View className="my-2 w-full">
              <CommonButton
                onPress={() => {
                  navigation.navigate("Login", { type: "EL" });
                }}
                title={"Employee Login"}
              />
            </View>
            <View className="my-5 w-full">
              <CommonButton onPress={() => {}} title={"Student Login"} />
            </View>
            <View className="my-2 w-full">
              <CommonButton onPress={() => {}} title={"Admin Login"} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(authStyles);

export default WelcomeLogin;
