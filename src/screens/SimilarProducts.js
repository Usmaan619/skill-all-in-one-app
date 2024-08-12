import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Del from "../hooks/Del.hook";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const Similar = ({navigation}) => {
  // const navigation = useNavigation();

  const similarProductData = [
    {
      id: "ch-721",
      img: require("../../assets/Chicken Product image/Chiken Mixed With Bones.jpeg"),
      title: "Chicken mixed with bone",
      kilogram: "500gms | Serve 4",
      amt: "148 Rs",
      del: "185 Rs",
    },
    {
      id: "ch-725",
      img: require("../../assets/Chicken Product image/Chiken-WIngs.png"),
      title: "Chicken Wings",
      amt: "175 Rs",
      del: "219 Rs",
    },
    {
      id: "ch-727",
      img: require("../../assets/Chicken Product image/Chicken Breast.jpg"),
      title: "Chicken Breast",
      amt: "271 Rs",
      del: "339 Rs",
    },
    {
      id: "ch-726",
      img: require("../../assets/Chicken Product image/chicken Mince [keema].jpeg"),
      title: "Chicken Mince (Keema)",
      amt: "311 Rs",
      del: "389 Rs",
    },
  ];

  return (
    <>
      <Text style={styles.similarProductsHeading}>Similar Products</Text>
      {similarProductData.map((p, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "10%",
            elevation: 10,
            marginTop: 10,
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetails", { id: p?.id })}
          >
            <Card.Cover
              source={p?.img}
              resizeMode="cover"
              className="bg-white h-60 w-full"
            />
          </TouchableOpacity>
          <Card.Title
            title={p?.title}
            titleStyle={{
              fontSize: 18,
              fontWeight: "700",
              textAlign: "center",
            }}
          />

          <Card.Actions>
            <View className="flex-row justify-center w-full px-2">
              <Text className="text-base ">
                {p?.amt}{" "}
                <Del>
                  <Text className="text-[#db1516]">{p?.del}</Text>
                </Del>{" "}
              </Text>
            </View>
          </Card.Actions>
        </Card>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  similarProductsHeading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  similarProductName: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    color: "black",
  },
  similarProductPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  amt: {
    color: "black",
  },
  del: {
    textDecorationLine: "line-through",
    color: "grey",
  },
});
