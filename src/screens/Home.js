import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { GradientHOC } from "../HOC/Gradient";
import { ICONS } from "../constants/Constant";
import CommonButton from "../components/Button.component";
import HeaderModal from "../components/Header.component";
import CollapsibleView from "../components/CollapsibleView.component";

const Home = () => {
  const handleSubmit = () => {
    toggleModal();
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <React.Fragment>
      <ScrollView>
        {/* bg img */}
        <CollapsibleView className="absolute" />
        <Image source={ICONS?.homeBg} className="absolute top-0 h-full " />
        {/* header */}
        {/* home */}
        <React.Fragment>
          <View style={{ flexGrow: 1 }} className="relative ">
            <View className="px-10  h-[670px]">
              <View className="flex justify-center mt-6">
                <Text
                  className={`mt-2 text-2xl text-left font-bold text-[#DB1516]`}
                >
                  We Deliver
                </Text>
                <Text className="mt-2 text-2xl  font-bold text-[#DB1516]">
                  Fresh & Premium
                </Text>
                <Text className="mt-2 text-2xl  font-bold text-[#DB1516]">
                  Meats Everyday.
                </Text>

                <Text className="text-base mt-4 text-left">
                  Why leave the house? Chicken delivery coming through.
                </Text>

                {/* Categories btn */}
                <View className="w-1/3 h-7 mt-5">
                  <CommonButton
                    onPress={() => {
                      handleSubmit();
                    }}
                    title={"Categories"}
                  />
                </View>
              </View>
              <Image
                source={ICONS?.superSubLogo}
                className="h-1/4 w-full mt-12 
          "
              />
            </View>
          </View>
        </React.Fragment>
        {/* home end */}
        {/* About */}
        <AboutHome />
      </ScrollView>
    </React.Fragment>
  );
};

const AboutHome = () => {
  return (
    <React.Fragment>
      <View className="px-3 my-1">
        <Image
          resizeMode="cover"
          source={ICONS?.headerLogo}
          className="h-24 w-28 "
        />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#fff",
  },
});

export default GradientHOC(Home);
