import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import { authStyles } from "../styles/Auth.styles";
import { COLOURs, ICONS } from "../constants/Constant";
import CommonButton from "../components/Button.component";
import { loginValidationSchema } from "../utils/Helper";
import { loginAPI } from "../services/Auth.service";
import { useDispatch } from "react-redux";
import { setData } from "../services/Storage.service";
import { SetIsLoggedIn, SetToken } from "../redux/actions/action";
import { LinearGradient } from "expo-linear-gradient";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../constants/Colors";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isShowOtpInput, setIsShowOtpInput] = useState(true);
  const [isShowResendBtn, setIsShowResendBtn] = useState(true);

  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearTimeout(timer);
  }, [isActive, seconds]);

  const startTimer = () => {
    setSeconds(60);
    setIsActive(true);
  };

  const resetTimer = () => {
    setSeconds(60);
    setIsActive(false);
  };
  console.log("seconds: ", seconds);

  const onSubmit = async (val) => {
    try {
      console.log("val: ", val);
      // dispatch(SetLoader("loader", true));

      const res = await loginAPI({
        email: val?.email,
        password: val.password,
        rememberMe: true,
      });

      if (res?.success) {
        console.log("res?.success: ", res?.success);

        dispatch(SetIsLoggedIn(true));

        await setData("token", res?.token);
        dispatch(SetToken(res?.token));
        // dispatch(SetLoader("loader", false));
        // toastSuccess(res?.message);
        navigation.navigate("Main");
        // unMount();
      }

      console.log("res:loginAPI ", res);
    } catch (error) {
      console.log("error:loginAPI ", error);
      // dispatch(SetLoader("loader", false));
    }
  };

  let formikFn;
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        } = formikProps;
        formikFn = formikProps;
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS?.secBlackColor,
            }}
            // className="h-screen"
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
                  Welcome Back, Please Login To your Account.
                </Text>
                <View style={styles.signUpInputMainContainer}>
                  <SafeAreaView style={styles.signUpInputSubContainer}>
                    <Text style={styles.inputLabel}>Email ID</Text>
                    <BlurView intensity={100} style={styles.input}>
                      <TextInput
                        placeholder="user.@mail.com....."
                        style={{ padding: 10 }}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                    </BlurView>

                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "2%",
                          marginLeft: "1%",
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                  </SafeAreaView>

                  <SafeAreaView style={styles.signUpInputSubContainer}>
                    <Text style={styles.inputLabel} className="mt-2">
                      Password
                    </Text>
                    <BlurView intensity={100} style={styles.input}>
                      <TextInput
                        placeholder="Password"
                        style={{ padding: 10 }}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                    </BlurView>

                    {errors.password && touched.password && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "2%",
                          marginLeft: "1%",
                        }}
                      >
                        {errors.password}
                      </Text>
                    )}
                  </SafeAreaView>
                </View>
              </View>
              <View style={{ marginTop: "auto" }}>
                <CommonButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={"Login"}
                />
              </View>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create(authStyles);

export default Login;
