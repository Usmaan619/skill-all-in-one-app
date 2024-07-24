import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { GradientHOC } from "../HOC/Gradient";
import { ABOUTHOMEIMG, COLOURs, ICONS } from "../constants/Constant";
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
        <Image source={ICONS?.homeBg} className="absolute top-0 h-1/2 " />
        {/* header */}
        {/* home */}
        <React.Fragment>
          <View style={{ flexGrow: 1 }} className="relative ">
            <View className="px-10  h-[660px]">
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
                className="h-1/3 w-full mt-12 
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
      <View className="px-4 h-full">
        <Image
          resizeMode="cover"
          source={ICONS?.headerLogo}
          className="h-24 w-28 "
        />

        <View className="">
          <Text className="text-lg font-medium">
            About <Text style={{ color: COLOURs?.red }}>SuperChicks</Text>
          </Text>

          <Text className="text-base text-slate-600 mt-2">
            SuperChicks provides you fresh and hygienic meat products at very
            reasonable price. Forget the old days of purchasing meat from stinky
            and unhygienic shops. Now just order it online and get it delivered
            to your door steps.
          </Text>

          <View className="flex justify-center items-center my-5">
            {ABOUTHOMEIMG?.map((d, i) => (
              <Image idx={i} source={d} className="h-44 w-72 my-2 " />
            ))}
          </View>
        </View>
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
