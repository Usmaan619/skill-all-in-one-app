import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Assuming you are using Expo, otherwise use react-native-vector-icons
import { ICONS } from "../constants/Constant";
import CollapsibleView from "../components/CollapsibleView.component";
import CommonButton from "../components/Button.component";
import Footer from "../common/Footer";
import { setHeaderScroll } from "../redux/actions/action";
import { useDispatch } from "react-redux";
import { onScrollChange } from "../utils/Helper";

const ContactUs = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setHeaderScroll(false));
    };
  }, []);
  return (
    <React.Fragment>
      <ImageBackground
        source={ICONS?.bgImg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView
          style={{ flexGrow: 1 }}
          onScroll={(e) => {
            onScrollChange(e, dispatch);
          }}
          contentInsetAdjustmentBehavior="automatic"
        >
          <Image source={ICONS?.homeBg} className=" h-[200px] w-full  " />
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
                <Text style={styles.textColorRed}>*</Text>Your Name
              </Text>
              <TextInput style={styles.input} placeholder="Your Name" />
            </View>
            <View>
              <Text style={styles.formLabel}>
                <Text style={styles.textColorRed}>*</Text>E-mail Address
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
              />
            </View>
            <View>
              <Text style={styles.formLabel}>
                <Text style={styles.textColorRed}>*</Text>Enquiry
              </Text>
              <TextInput
                style={styles.textArea}
                placeholder="Your Message"
                multiline={true}
                numberOfLines={5}
              />
            </View>
            <View className="mt-7 mb-5 w-1/2">
              <CommonButton onPress={() => {}} title={"Submit"} />
            </View>
          </View>
          {/* Footer */}
          <Footer />
        </ScrollView>
      </ImageBackground>
    </React.Fragment>
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
  },
  textColorRed: {
    color: "red",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
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

export default ContactUs;
