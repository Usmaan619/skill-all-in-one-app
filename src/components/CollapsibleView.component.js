import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLOURs, ICONS } from "../constants/Constant";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
const CollapsibleView = ({ navi, total_item, headerScroll }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const totalItems = useSelector((state) => state?.cart?.total_item);
  const [totalCartItems, setTotalCartItems] = useState(totalItems);

  useEffect(() => {
    setTotalCartItems(totalItems);
  }, [totalCartItems]);

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
    <View className={`z-50  ${headerScroll ? " bg-white" : "bg-[#ffe5e5]"} `}>
      <TouchableWithoutFeedback>
        <View className="flex-row justify-center items-center mt-10  z-40">
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
              toggleCollapse();
              navi.navigate("Home");
            }}
          >
            <Text className="text-base font-medium">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleCollapse();
              navi.navigate("ContactUs");
            }}
          >
            <Text className="text-base font-medium">Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleCollapse();
              navi.navigate("About");
            }}
          >
            <Text className="text-base font-medium">About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleCollapse();
              navi.navigate("Cart");
            }}
          >
            <View className="relative">
              <AntDesign name="shoppingcart" size={26} color="black" />
              <View className="absolute top-[-15] left-5 bg-[#db1516] h-5 w-5 rounded-full ">
                <Text className="text-[#fff] text-center">{total_item}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleCollapse();
              navi.navigate("Login");
            }}
          >
            <Text className="text-base font-medium">Sign</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleCollapse();
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

const mapStateToProps = (state) => {
  return {
    ...state?.scrollReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleView);
