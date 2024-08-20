import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ICONS } from "../constants/Constant";
import CommonButton from "../components/Button.component";
import { setHeaderScroll } from "../redux/actions/action";
import { useDispatch } from "react-redux";
import GradientHOC from "../HOC/Gradient";
import { useFocusEffect } from "@react-navigation/native";
import { Formik } from "formik";
import { contactUsValidationSchema } from "../utils/Helper";
import { contactUsAPI } from "../services/Auth.service";

const ContactUs = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSubmit = async (val) => {
    try {
      console.log("val: ", val);

      const res = await contactUsAPI(val);
      console.log("res:contactUsAPI ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useFocusEffect(() => {
    return () => {
      dispatch(setHeaderScroll(false));
    };
  });
  return (
    <Formik
      validationSchema={contactUsValidationSchema}
      initialValues={{
        name: "",
        email: "",
        msg: "",
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
        // formikFn = formikProps;
        return (
          <React.Fragment>
            <Image
              source={ICONS?.headerTopImg}
              className="object-cover h-[40] w-full mt-2"
            />
            <View className="px-10 ">
              <View style={styles.header}>
                <Text style={styles.headerText}>Contact Us</Text>
              </View>
              <View style={styles.contactInfo}>
                <View className="grid gap-5 justify-start items-start">
                  <View style={styles.col}>
                    <Text style={styles.sectionTitle}>
                      Order online Raw Chicken & Raw Mutton
                    </Text>
                    <Text style={styles.paragraph}>
                      SuperChicks deliver verified, free of preservative, FSSAI
                      registered, always fresh with fair pricing
                    </Text>
                    <Text style={styles.paragraph}>
                      100% Hygienic Raw Fresh Chicken, Fresh Mutton & Fresh Fish
                      delivery
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.boldText}>
                      Order online from our website
                    </Text>
                    <Text style={styles.semiBoldText} className="mt-2">
                      www.SuperChicks.online
                    </Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.sectionTitle}>Contact Info</Text>
                    <Text style={styles.paragraph}>
                      <FontAwesome name="phone" size={20} color="black" />{" "}
                      +91-9244276667
                    </Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.sectionTitle}>Opening Time</Text>
                    <Text style={styles.paragraph}>10AM to 7PM</Text>
                  </View>
                </View>
              </View>

              {/* form */}
              <Text style={styles.headerText}>Contact Us</Text>
              <View style={styles.hr}></View>
              <View>
                <Text style={styles.formLabel}>
                  Your Name <Text style={styles.textColorRed}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  placeholder="Your Name"
                />
                {errors.name && touched.name && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginTop: "2%",
                      marginLeft: "1%",
                    }}
                  >
                    {errors.name}
                  </Text>
                )}
              </View>
              <View>
                <Text style={styles.formLabel}>
                  E-mail Address <Text style={styles.textColorRed}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
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
              </View>
              <View>
                <Text style={styles.formLabel}>
                  Enquiry <Text style={styles.textColorRed}>*</Text>
                </Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Your Message"
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={handleChange("msg")}
                  onBlur={handleBlur("msg")}
                  value={values.msg}
                />
                {errors.msg && touched.msg && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginTop: "2%",
                      marginLeft: "1%",
                    }}
                  >
                    {errors.msg}
                  </Text>
                )}
              </View>
              <View className="mt-7 mb-5 w-1/2">
                <CommonButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={"Submit"}
                />
              </View>
            </View>
            {/* Footer */}
            {/* <Footer /> */}
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    // padding: 20,
  },
  header: {
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "red",
    fontSize: 24,
  },
  contactInfo: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    marginVertical: 20,
  },
  // row: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  // col: {
  //   flex: 1,
  //   margin: 10,
  // },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  paragraph: {
    fontSize: 14,
    marginVertical: 5,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  semiBoldText: {
    fontWeight: "600",
    fontSize: 16,
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  formLabel: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 5,
  },
  textColorRed: {
    color: "red",
  },
  input: {
    borderWidth: 2,
    borderColor: "#c7c7c7",
    paddingVertical: 8,
    paddingLeft: 14,
    backgroundColor: "#fff",
    borderRadius: 9,
    height: 56,
  },
  textArea: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    height: 100,
  },
  whatsappButton: {
    backgroundColor: "#25D366",
    borderRadius: 50,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default GradientHOC(ContactUs);
