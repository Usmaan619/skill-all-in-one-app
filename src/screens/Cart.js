import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ICONS } from "../constants/Constant";
import CommonButton from "../components/Button.component";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotalItems,
  calculateTotalPrice,
  removeItem,
  setDecrement,
  setHeaderScroll,
  setIncrement,
} from "../redux/actions/action";
import { FormatPrice } from "../utils/Helper";
import GradientHOC from "../HOC/Gradient";

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();

  // this code using cart page
  const cart = useSelector((state) => state.cart.cart);
  const totalItems = useSelector((state) => state.cart.total_item);
  const totalPrice = useSelector((state) => state.cart.total_price);

  useEffect(() => {
    dispatch(calculateTotalItems());
    dispatch(calculateTotalPrice());
  }, [cart, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setHeaderScroll(false));
    };
  }, []);

  return (
    <React.Fragment>
      <Image
        source={ICONS?.homeBg}
        className="absolute top-0 h-[190px] w-full object-cover z-10 "
      />

      {cart?.length ? (
        <View className="relative  mt-44 ">
          <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            {/* Product listing */}
            {cart?.map((c, idx) => (
              <View key={idx} style={styles.productListRow}>
                <View style={styles.summaryText}>
                  <View className="flex-row ">
                    <Image
                      source={require("../../assets/Chicken Product image/Chiken Boneless.jpeg")}
                      style={styles.productImage}
                    />
                    <View className="grid gap-2">
                      <Text className="text-sm font-medium break-normal w-52">
                        {c?.name}
                      </Text>
                      <View className="flex-row items-baseline ">
                        <Text className="font-medium">
                          <FormatPrice price={c?.price} />
                        </Text>
                        <Text className="font-medium mx-4">
                          <FormatPrice price={c?.amount * c?.price} />
                        </Text>
                      </View>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(setDecrement(c?.id));
                          }}
                        >
                          <AntDesign
                            name="minussquareo"
                            style={styles.icon}
                            size={21}
                            color="black"
                          />
                        </TouchableOpacity>
                        <Text className="mx-2">{c?.amount}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(setIncrement(c?.id));
                          }}
                        >
                          <AntDesign
                            style={styles.icon}
                            size={22}
                            name="plussquareo"
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                {/* delete icon */}
                <TouchableOpacity
                  onPress={(remove) => {
                    dispatch(removeItem(c?.id));
                  }}
                >
                  <AntDesign
                    style={styles.summaryValue}
                    name="delete"
                    size={22}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            ))}
            {/* Product listing end*/}

            <View style={styles.separator} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Total Items</Text>
              <Text style={styles.summaryValue}>{totalItems}</Text>
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
              <Text style={styles.summaryValue}>
                <FormatPrice price={totalPrice + 30} />
              </Text>
            </View>
            <View style={styles.separator} />

            {/* Proceed To Checkout */}
            <CommonButton
              onPress={() => {
                navigation?.navigate("CheckoutScreen");
              }}
              title={"Proceed To Checkout"}
            />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }} className="mt-48">
          <Text className="text-center font-medium  text-lg">
            - : Your Basket is Empty : -
          </Text>
          <Image
            source={ICONS?.emptyCart}
            resizeMode="contain"
            className="object-cover h-80 w-full mt-5"
          />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundColor: "#fff",
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
    marginVertical: 8,
  },
  productImage: {
    width: 90,
    height: 100,
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
  productListRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 6,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 6,
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

export default GradientHOC(Cart);
