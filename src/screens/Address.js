import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { ICONS, PINCODES } from "../constants/Constant";
import Footer from "../common/Footer";
import CollapsibleView from "../components/CollapsibleView.component";
import CommonButton from "../components/Button.component";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("");

  const handleZipcodeChange = (event) => {
    const { value } = event.target;
    // setEnteredZipcode(value);
    if (PINCODES.includes(parseInt(value))) {
      // setMessage("");
    }
  };

  return (
    <React.Fragment>
      <ImageBackground
        source={ICONS?.bgImg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView style={{ flexGrow: 1 }}>
          <CollapsibleView navi={navigation} className="absolute " />
          <Image
            source={ICONS?.homeBg}
            className="absolute top-0 h-[200px] w-full object-cover z-10"
          />
          <View className="px-4 relative  mt-16">
            <Text style={styles.header}>Order Checkout</Text>
            <View style={styles.section}>
              <Text style={styles.subHeader}>Shipping Address</Text>
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Name <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput style={styles.input} placeholder="Name" />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Phone Number <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Address <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput style={styles.input} placeholder="Address" />
                </View>
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Time</Text>
                  <TextInput style={styles.input} placeholder="Time" />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Zipcode <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput style={styles.input} placeholder="Zipcode" />
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.subHeader}>
                Select Delivery Date & Time Slot
              </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Delivery Date <Text style={styles.required}>*</Text>
                </Text>
                <TextInput style={styles.input} placeholder="DD/MM/YYYY" />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nearest Landmark</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nearest Landmark"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Additional Information</Text>
                <Text style={styles.optional}>Order Notes (Optional)</Text>
                <TextInput
                  style={styles.textarea}
                  placeholder="Additional Information"
                  multiline
                  numberOfLines={5}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.orderSummaryHeader}>Your Order</Text>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.summaryColumn}>Product</Text>
                <Text style={[styles.summaryColumn, styles.textRight]}>
                  Subtotal
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.productDetail}>
                  Chicken Mixed With Bones{" "}
                  <Text style={styles.quantity}>x 2</Text>
                </Text>
                <Text style={[styles.productDetail, styles.textRight]}>
                  ₹296.00
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.summaryColumn}>Subtotal</Text>
                <Text style={[styles.summaryColumn, styles.textRight]}>
                  ₹296.00
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.summaryColumn}>Shipping Charge</Text>
                <Text style={[styles.summaryColumn, styles.textRight]}>
                  ₹30.00
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.summaryColumn}>Promo Discount</Text>
                <Text style={[styles.summaryColumn, styles.textRight]}></Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.summaryColumn}>Order Total</Text>
                <Text style={[styles.summaryColumn, styles.textRight]}>
                  ₹326.00
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.subHeader}>Payment Method</Text>
              <View style={styles.row}>
                <View style={styles.radioContainer}>
                  <RadioButton
                    value="cash"
                    status={
                      selectedPaymentMethod === "cash" ? "checked" : "unchecked"
                    }
                    onPress={() => setSelectedPaymentMethod("cash")}
                  />
                  <Text>Cash on Delivery</Text>
                </View>
                <View style={styles.radioContainer}>
                  <RadioButton
                    value="upi"
                    status={
                      selectedPaymentMethod === "upi" ? "checked" : "unchecked"
                    }
                    onPress={() => setSelectedPaymentMethod("upi")}
                  />
                  <Text>UPI Payment</Text>
                </View>
              </View>
            </View>
            <View className="my-3">
              <CommonButton onPress={() => {}} title={"Place Order"} />
            </View>
            {/* Place Order */}
          </View>
          {/* Footer */}
          <Footer />
        </ScrollView>
      </ImageBackground>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginVertical: 25,
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
    margin: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    textAlignVertical: "top",
  },
  orderSummaryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  summaryColumn: {
    flex: 1,
    fontWeight: "bold",
  },
  productDetail: {
    flex: 1,
  },
  textRight: {
    textAlign: "right",
  },
  quantity: {
    paddingLeft: 10,
    fontWeight: "bold",
    color: "black",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
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
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundColor: "#fff",
  },
});

export default CheckoutScreen;
