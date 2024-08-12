import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../constants/Constant";
import { AntDesign, Entypo, EvilIcons, FontAwesome } from "@expo/vector-icons";

const Footer = ({ navigation, scrollToTop }) => {
  return (
    <React.Fragment>
      <Image
        source={ICONS?.footerBgImg}
        className="object-cover h-[40] w-full"
      />
      <View className="relative grid justify-center bg-[#ffe5e5] items-center  px-6">
        <Image
          resizeMode="cover"
          source={ICONS?.headerLogo}
          className="h-28 w-32"
        />
        <View className="mt-3">
          <Text className="text-center text-gray-500 ">
            <Text className="text-[#db1516] font-medium">SuperChicks </Text>
            delivers fresh & premium meat everyday.We provides you fresh and
            hygienic meat poducts at very reasonable price
          </Text>

          <View className="grid gap-3 justify-center items-center my-2">
            <Text className="text-base font-medium text-[#db1516]">
              Address
            </Text>
            <Text className="flex-row items-baseline">
              <Entypo name="location-pin" size={16} color="black" />
              Eastern Ring Road Khajrana, Indore
            </Text>
            <Text className="flex-row items-baseline">
              <FontAwesome name="whatsapp" size={15} color="black" />{" "}
              +91-9244276667
            </Text>
            <Text className="flex-row items-baseline">
              <Entypo name="mail" size={16} color="black" />{" "}
              info@superchicks.online
            </Text>
          </View>
        </View>

        <View className="grid gap-3 justify-center items-center my-1">
          <Text className="text-base font-medium text-[#db1516]">
            Important Links
          </Text>

          <TouchableOpacity onPress={() => {}}>
            <Text className="flex-row items-baseline">Home</Text>
          </TouchableOpacity>
          <Text className="flex-row items-baseline">Contant Us</Text>
          <Text className="flex-row items-baseline">About</Text>
        </View>

        <View className="grid gap-3 justify-center items-center my-1">
          <Text className="text-base font-medium text-[#db1516]">
            Important Links
          </Text>
          <Text className="flex-row items-baseline">Home</Text>
          <Text className="flex-row items-baseline">Contant Us</Text>
          <Text className="flex-row items-baseline">About</Text>
        </View>

        <View className="grid gap-3 justify-center items-center my-1">
          <Text className="text-base font-medium text-[#db1516]">
            Social Media
          </Text>
          <View className="flex-row justify-between w-full">
            <EvilIcons name="sc-facebook" size={22} color="black" />
            <FontAwesome name="whatsapp" size={19} color="black" />
            <AntDesign
              onPress={() => {
                // Linking?.openURL(
                //   "https://www.instagram.com/superchicks.online?igsh=aGM0Zmw3Mmx6MzJo"
                // );
              }}
              name="instagram"
              size={20}
              color="black"
            />
          </View>
        </View>
        <View className="bg-black h-[1px] w-full mb-2 mt-1 "></View>
      </View>
    </React.Fragment>
  );
};

export default Footer;
