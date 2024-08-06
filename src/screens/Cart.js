import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLOURs, ICONS } from "../constants/Constant";
import CollapsibleView from "../components/CollapsibleView.component";
import CommonButton from "../components/Button.component";
import Footer from "../common/Footer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Card, Icon } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import CheckoutScreen from "./Address";

const Cart = ({ navigation }) => {
  const route = useRoute();

  return (
    <React.Fragment>
      <ScrollView style={{ flexGrow: 1 }} className="bg-white">
        <ImageBackground
          source={ICONS?.bgImg}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <CollapsibleView navi={navigation} className="absolute " />
          <Image
            source={ICONS?.homeBg}
            className="absolute top-0 h-[190px] w-full object-cover z-10 "
          />
          <View className="relative  mt-16 ">
            <View style={styles.container}>
              <Text style={styles.header}>Your Cart</Text>
              {/* Product listing */}
              <View style={styles.summaryRow}>
                <View style={styles.summaryText}>
                  <View className="flex-row ">
                    <Image
                      source={require("../../assets/Chicken Product image/Chiken Boneless.jpeg")}
                      style={styles.productImage}
                    />
                    <View className="grid  gap-2">
                      <Text className="text-sm font-medium">
                        Chicken Mixed With Bones
                      </Text>
                      <View className="flex-row justify-between">
                        <Text className="font-medium">₹148.00</Text>
                        <Text className="font-medium">₹148.00</Text>
                      </View>
                      <View style={styles.quantityContainer}>
                        <AntDesign
                          name="minuscircleo"
                          style={styles.icon}
                          size={21}
                          color="black"
                        />
                        <Text className="mx-2">1</Text>

                        <AntDesign
                          name="pluscircleo"
                          style={styles.icon}
                          size={21}
                          color="black"
                        />
                      </View>
                    </View>
                  </View>
                </View>
                {/* delete icon */}
                <AntDesign
                  style={styles.summaryValue}
                  name="delete"
                  size={22}
                  color="red"
                />
              </View>
              {/* Product listing end*/}

              <View style={styles.separator} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Total Items</Text>
                <Text style={styles.summaryValue}>1</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Shipping Charge</Text>
                <Text style={[styles.summaryValue, styles.textColorRed]}>
                  ₹30.00
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Sub Total</Text>
                <Text style={styles.summaryValue}>₹178.00</Text>
              </View>
              <View style={styles.separator} />

              {/* Proceed To Checkout */}
              <CommonButton
                onPress={() => {
                  //   handleSubmit();
                }}
                title={"Proceed To Checkout"}
              />
            </View>
          </View>
          {/* Footer */}
          <Footer />
          <CheckoutScreen/>
        </ImageBackground>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },
  separator: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  columnHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: "cover",
  },
  productText: {
    // flex: 1,
    textAlign: "left",
  },
  quantityContainer: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
  },
  icon: {
    // marginHorizontal: 5,
  },
  removeIcon: {
    color: "red",
    // flex: 1,
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  summaryText: {
    fontWeight: "bold",
  },
  summaryValue: {
    fontWeight: "bold",
  },
  textColorRed: {
    color: "red",
  },
  checkoutButton: {
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Cart;
