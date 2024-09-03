import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import { authStyles } from "../styles/Auth.styles";
import { ICONS } from "../constants/Constant";
import CommonButton from "../components/Button.component";
import {
  loginValidationSchema,
  loginValidationSchema_old,
} from "../utils/Helper";
import { loginAPI } from "../services/Auth.service";
import { useDispatch } from "react-redux";
import { setData } from "../services/Storage.service";
import { SetIsLoggedIn, SetToken } from "../redux/actions/action";
import { COLORS } from "../constants/Colors";
import { toastSuccess } from "../services/Toaster.service";
import { SetLoader } from "../redux/actions/loader.action";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSubmit = async (val) => {
    try {
      dispatch(SetLoader("loader", true));
      const payload = {
        email: val?.email,
        passwd: val?.password,
      };
      const res = await loginAPI(payload);

      if (!res) dispatch(SetLoader("loader", false));

      if (res?.employee?.token) {
        dispatch(SetIsLoggedIn(true));

        await setData("token", res?.employee?.token);
        setTimeout(() => {
          dispatch(SetLoader("loader", false));
        }, 1500);
        await setData("employeeId", res?.employee?.id?.toString());
        dispatch(SetToken(res?.employee?.token));
        if (res?.message) toastSuccess(res?.message);
      }
    } catch (error) {
      dispatch(SetLoader("loader", false));
    }
  };

  let formikFn;
  return (
    <Formik
      validationSchema={loginValidationSchema_old}
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
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: COLORS?.secBlackColor,
            }}
            // className="h-screen"
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                marginTop: "13%",
                width: 350,
              }}
            >
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
                        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
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
                        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
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
              <View style={{ marginTop: "10%" }}>
                <CommonButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={"Login"}
                />
              </View>
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create(authStyles);

export default Login;
