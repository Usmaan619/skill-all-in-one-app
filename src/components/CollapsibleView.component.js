import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Image,
} from "react-native";
import { ICONS } from "../constants/Constant";
import { Octicons } from "@expo/vector-icons";

const CollapsibleView = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  console.log("collapsed: ", collapsed);
  const toggleCollapse = () => {
    if (collapsed) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false, // Change this to false
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false, // Change this to false
      }).start();
    }
    setCollapsed(!collapsed);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View>
      <TouchableWithoutFeedback>
        <View className="flex-row justify-center items-center mt-10 z-40">
          <View
            className={`flex-row justify-between px-7 items-center h-20 w-80 bg-[#fff2f2] ${
              collapsed ? "rounded-3xl" : "rounded-t-3xl"
            } relative`}
          >
            <Image source={ICONS?.headerLogo} className="h-[55px] w-[55px]" />
            <Octicons
              onPress={toggleCollapse}
              name="three-bars"
              size={24}
              color="black"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={{ height: heightInterpolate, alignSelf: "center" }}
        className=" h-20 w-80 bg-[#fff2f2] rounded-b-3xl absolute top-28 z-40"
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default CollapsibleView;
