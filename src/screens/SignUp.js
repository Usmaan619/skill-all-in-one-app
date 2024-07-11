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
import { signUpValidationSchema } from "../utils/Helper";
import { ICONS } from "../constants/Constant";
import { GradientHOC } from "../HOC/Gradient";
import B from "../components/B.component";
import CommonButton from "../components/Button.component";
import { authStyles } from "../styles/Auth.styles";
import { registerAPI } from "../services/Auth.service";

const SignUpPage = ({ navigation }) => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowPasswordConf, setIsShowPasswordConf] = useState(true);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const togglePasswordConf = () => {
    setIsShowPasswordConf(!isShowPasswordConf);
  };

  const onSubmit = async (val) => {
    try {
      console.log("val: ", val);

      const res = await registerAPI({
        name: val?.name,
        password: val?.password,
        email: val?.email,
      });
      console.log("res: ", res?.data);
    } catch (error) {
      console.log("error: ", error);
    }

    // navigation.navigate("DocumentVerif", { registerDetails: val });
    // navigation.navigate("Dashboard");
  };

  return (
    <ScrollView>
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          email: "",
          password: "",
          Confpassword: "",
          name: "",
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
              <View className="flex-row justify-center items-center">
                <Image
                  source={ICONS?.intelligenceMainWhiteImg}
                  resizeMode="cover"
                  className="h-[90px] w-[170px] overflow-hidden"
                />
              </View>
              <Text className="text-center  text-lg font-semibold text-white">
                Create New Account
              </Text>

              <View style={styles.signUpInputMainContainer}>
                <SafeAreaView style={styles.signUpInputSubContainer}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <BlurView intensity={100} style={styles.input}>
                    <TextInput
                      placeholder="Full Name"
                      style={{ padding: 10 }}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                  </BlurView>

                  {errors.name && touched.name && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.name}
                    </Text>
                  )}

                  <Text style={styles.signUpinputLabel2}>Email</Text>
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

                  <Text style={styles.signUpinputLabel2}>Confirm Password</Text>
                  <BlurView intensity={100} style={styles.input}>
                    <TextInput
                      style={{ padding: 10 }}
                      placeholder="******"
                      secureTextEntry={isShowPasswordConf}
                      onChangeText={handleChange("Confpassword")}
                      onBlur={handleBlur("Confpassword")}
                      value={values.Confpassword}
                    />
                    <TouchableOpacity onPress={togglePasswordConf}>
                      <Image
                        style={styles.passwordEye}
                        source={
                          isShowPasswordConf ? ICONS.crossEyeImg : ICONS.eyeImg
                        }
                        fadeDuration={0}
                      />
                    </TouchableOpacity>
                  </BlurView>
                  {errors.Confpassword && touched.Confpassword && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.Confpassword}
                    </Text>
                  )}
                </SafeAreaView>
              </View>

              <View style={{ marginTop: "10%" }}>
                <CommonButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={"Next"}
                />
              </View>
              <Text
                style={styles.dontHaveAccount}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                already have account? <B>Sign in</B>
              </Text>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create(authStyles);

export default GradientHOC(SignUpPage);
