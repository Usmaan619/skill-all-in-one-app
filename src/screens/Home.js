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
      {/* <HeaderModal visible={isModalVisible} onClose={toggleModal} /> */}

      <Image source={ICONS?.homeBg} className="absolute top-0 h-full " />

      <CollapsibleView title="Expandable View" className="absolute" />
      <ScrollView
        className="relative"
        style={{ flexGrow: 1, overflow: "scroll" }}
      >
        <View className="px-5 h-screen">
          <View className="flex justify-center  mt-6">
            <Text className="mt-2 text-2xl text-left font-bold text-[#DB1516]">
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
      </ScrollView>
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
