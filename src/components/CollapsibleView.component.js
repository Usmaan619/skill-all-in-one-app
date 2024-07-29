import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLOURs, ICONS } from "../constants/Constant";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const CollapsibleView = ({ navi }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  console.log("collapsed: ", collapsed);
  const toggleCollapse = () => {
    Animated.timing(animation, {
      toValue: collapsed ? 1 : 0,
      duration: 280,
      useNativeDriver: false, // Change this to true
    }).start();
    setCollapsed(!collapsed);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 270],
  });

  return (
    <View className="z-50" style={{ elevation: 10 }}>
      <TouchableWithoutFeedback>
        <View className="flex-row justify-center items-center mt-10 z-40">
          <View
            className={`flex-row justify-between px-7 items-center h-20 w-80 bg-[#fff2f2] ${
              collapsed ? "rounded-3xl" : "rounded-t-3xl"
            } relative`}
          >
            <Image source={ICONS?.headerLogo} className="h-[55px] w-[55px]" />
            <TouchableOpacity
              onPress={toggleCollapse}
              className="border py-2 px-3 rounded-lg border-[#e8dfdf]"
            >
              <Foundation name="align-right" size={22} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={{ height: heightInterpolate, alignSelf: "center" }}
        className=" h-20 w-80 bg-[#fff2f2] rounded-b-3xl absolute top-28 z-50"
      >
        {/* {children} */}

        <View
          className={` justify-center items-center mt-2 gap-5 ${
            !collapsed ? "grid" : "hidden"
          }`}
        >
          <TouchableOpacity
            onPress={() => {
              navi.navigate("Home");
            }}
          >
            <Text className="text-base font-medium">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navi.navigate("ContactUs");
            }}
          >
            <Text className="text-base font-medium">Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navi.navigate("About");
            }}
          >
            <Text className="text-base font-medium">About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navi.navigate("Cart");
            }}
          >
            <AntDesign name="shoppingcart" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navi.navigate("Login");
            }}
          >
            <Text className="text-base font-medium">Sign</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navi.navigate("Login");
            }}
          >
            <FontAwesome5 name="angle-right" size={24} color={COLOURs.red} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default CollapsibleView;
