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
import B from "../components/B.component";
import { authStyles } from "../styles/Auth.styles";
import { COLOURs, ICONS } from "../constants/Constant";
import CommonButton from "../components/Button.component";
import { loginValidationSchema } from "../utils/Helper";
import { GradientHOC } from "../HOC/Gradient";
import { loginAPI } from "../services/Auth.service";
import { useDispatch } from "react-redux";
import { setData } from "../services/Storage.service";
import { SetIsLoggedIn, SetToken } from "../redux/actions/action";
import { SetLoader } from "../redux/actions/loader.action";

import { LinearGradient } from "expo-linear-gradient";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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

  /**
   * get phone height
   * */
  const height = Dimensions.get("window")?.height;

  return (
    <ScrollView>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          phoneNumber: "",
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
            <View style={{ flex: 1, backgroundColor: "#fff", height }}>
              <View style={styles.signUpcontainer}>
                {/* <Image source={ICONS?.homeBg} className="absolute " /> */}

                <View className="flex justify-center mt-2 ">
                  <View className="flex-row justify-center items-center">
                    <Image
                      source={ICONS?.superMainLogo}
                      resizeMode="cover"
                      className="h-[160px] w-[160px] overflow-hidden"
                    />
                  </View>
                  <Text className="text-center my-5 text-lg font-semibold text-black">
                    Welcome Back, Please Login To your Account.
                  </Text>
                  <View style={styles.signUpInputMainContainer}>
                    {isShowOtpInput && (
                      <SafeAreaView style={styles.signUpInputSubContainer}>
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <BlurView intensity={100} style={styles.input}>
                          <TextInput
                            placeholder="999888***90"
                            style={{ padding: 10 }}
                            onChangeText={handleChange("phoneNumber")}
                            onBlur={handleBlur("phoneNumber")}
                            value={values.phoneNumber}
                            keyboardType="number-pad"
                          />
                        </BlurView>

                        {errors.phoneNumber && touched.phoneNumber && (
                          <Text
                            style={{
                              fontSize: 10,
                              color: "red",
                              marginTop: "2%",
                              marginLeft: "1%",
                            }}
                          >
                            {errors.phoneNumber}
                          </Text>
                        )}
                      </SafeAreaView>
                    )}
                    {!isShowOtpInput && (
                      <SafeAreaView style={styles.signUpInputSubContainer}>
                        <Text style={styles.inputLabel}>
                          OTP{" "}
                          {!isShowResendBtn && (
                            <Text className="text-red-600">{`(${seconds})`}</Text>
                          )}
                        </Text>
                        <BlurView intensity={100} style={styles.input}>
                          <TextInput
                            placeholder="9998"
                            style={{ padding: 10 }}
                            onChangeText={handleChange("opt")}
                            onBlur={handleBlur("opt")}
                            value={values.opt}
                            keyboardType="number-pad"
                          />
                        </BlurView>
                      </SafeAreaView>
                    )}
                  </View>

                  <View style={{ marginTop: "10%" }}>
                    <CommonButton
                      onPress={() => {
                        handleSubmit();
                      }}
                      title={"Submit"}
                    />
                  </View>
                  {!isShowResendBtn && (
                    <View style={{ marginTop: "7%" }}>
                      <CommonButton
                        onPress={() => {
                          handleSubmit();
                        }}
                        title={"Resend"}
                      />
                    </View>
                  )}
                </View>

                {/* About */}
                <View className="flex justify-center items-center">
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={[COLOURs?.light, COLOURs?.pink]}
                    style={{
                      width: wp("90%"),
                      height: hp("21%"),
                    }}
                    className="mt-8 rounded-lg"
                  >
                    <Text className="text-center my-3 font-medium">
                      About SuperChicks
                    </Text>
                    <Text
                      style={{ lineHeight: 20 }}
                      className="text-center px-3 flex justify-center"
                    >
                      SuperChicks supplies provides you fresh and hygienic meat
                      products at very reasonable price. Forget the old days of
                      purchasing meat from stinky and unhygienic shops. Now just
                      order it online and get it delivered to your door steps.
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create(authStyles);

export default Login;
