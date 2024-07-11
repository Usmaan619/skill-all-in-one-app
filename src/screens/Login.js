import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import B from "../components/B.component";
import { authStyles } from "../styles/Auth.styles";
import { ICONS } from "../constants/Constant";
import CommonButton from "../components/Button.component";
import { loginValidationSchema } from "../utils/Helper";
import { GradientHOC } from "../HOC/Gradient";
import { loginAPI } from "../services/Auth.service";
import { useDispatch } from "react-redux";
import { setData } from "../services/Storage.service";
import { SetIsLoggedIn, SetToken } from "../redux/actions/action";
import { SetLoader } from "../redux/actions/loader.action";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(true);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

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

  return (
    <ScrollView>
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
            <View style={styles.signUpcontainer}>
              <View className="flex justify-center mt-2">
                <View className="flex-row justify-center items-center">
                  <Image
                    source={ICONS?.intelligenceMainWhiteImg}
                    resizeMode="cover"
                    className="h-[90px] w-[170px] overflow-hidden"
                  />
                </View>
                <Text className="text-center my-5 text-lg font-semibold text-white">
                  Welcome Back, Please Sign In To your Account.{" "}
                </Text>
                <View style={styles.signUpInputMainContainer}>
                  <SafeAreaView style={styles.signUpInputSubContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <BlurView intensity={100} style={styles.input}>
                      <TextInput
                        placeholder="you@example.com"
                        style={{ padding: 10 }}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                    </BlurView>

                    {errors.email && touched.email && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.email}
                      </Text>
                    )}

                    <Text style={styles.signUpinputLabel2}>Password</Text>
                    <BlurView intensity={100} style={styles.input}>
                      <TextInput
                        style={{ padding: 10 }}
                        secureTextEntry={isShowPassword}
                        placeholder="******"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      <TouchableOpacity onPress={togglePassword}>
                        <Image
                          style={styles.passwordEye}
                          source={
                            isShowPassword ? ICONS.crossEyeImg : ICONS.eyeImg
                          }
                          fadeDuration={0}
                        />
                      </TouchableOpacity>
                    </BlurView>
                    {errors.password && touched.password && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.password}
                      </Text>
                    )}
                  </SafeAreaView>
                </View>

                <View style={{ marginTop: "10%" }}>
                  <CommonButton
                    onPress={() => {
                      handleSubmit();
                    }}
                    title={"Login"}
                  />
                </View>
                <Text
                  style={styles.dontHaveAccount}
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                >
                  don't have account? <B>Sign up</B>
                </Text>
              </View>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create(authStyles);

export default GradientHOC(Login);
