import React, { useEffect, useState } from "react";
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
import { Formik } from "formik";
import { number } from "yup";
import { checkoutValidationSchema, FormatPrice } from "../utils/Helper";
import {
  TimePickerModal,
  en,
  registerTranslation,
} from "react-native-paper-dates";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotalItems,
  calculateTotalPrice,
} from "../redux/actions/action";
import { postAddressAPI } from "../services/Auth.service";

registerTranslation("en", en);

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // this code using cart page
  const cart = useSelector((state) => state.cart.cart);
  console.log("cart:calculateTotalItems ", cart);
  const totalItems = useSelector((state) => state.cart.total_item);
  const totalPrice = useSelector((state) => state.cart.total_price);
  console.log("totalItems: ", totalItems);
  console.log("totalPrice: ", totalPrice);

  useEffect(() => {
    dispatch(calculateTotalItems());
    dispatch(calculateTotalPrice());
  }, [cart, dispatch]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("");

  const onSubmit = async (value) => {
    // const res = await postAddressAPI();
  };

  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const handleTimeConfirm = (time, setFieldValue) => {
    setTimePickerVisible(false);
    const formattedTime = `${time.hours
      .toString()
      .padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}`;
    setFieldValue("time", formattedTime);
  };

  return (
    <React.Fragment>
      <ImageBackground
        source={ICONS?.bgImg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView style={{ flexGrow: 1 }}>
          <Formik
            validationSchema={checkoutValidationSchema}
            initialValues={{
              additional: "",
              address: "",
              date: "",
              email: "",
              landmark: "",
              name: "",
              number: "",
              paymentMethod: "",
              time: "",
              zipcode: "",
            }}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              const {
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                isValid,
                touched,
              } = formikProps;
              formikFn = formikProps;
              return (
                <React.Fragment>
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
                          <TextInput
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                            style={styles.input}
                            placeholder="Name"
                          />
                          {touched.name && errors.name && (
                            <Text style={styles.errors}>{errors.name}</Text>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>
                            Phone Number <Text style={styles.required}>*</Text>
                          </Text>
                          <TextInput
                            onChangeText={handleChange("number")}
                            onBlur={handleBlur("number")}
                            value={values.number}
                            style={styles.input}
                            placeholder="Phone Number"
                            keyboardType="numeric"
                          />
                          {touched.number && errors.number && (
                            <Text style={styles.errors}>{errors.number}</Text>
                          )}
                        </View>
                      </View>
                      <View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Email</Text>
                          <TextInput
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            style={styles.input}
                            placeholder="Email Address"
                            keyboardType="email-address"
                          />
                          {touched.email && errors.email && (
                            <Text style={styles.errors}>{errors.email}</Text>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>
                            Address <Text style={styles.required}>*</Text>
                          </Text>
                          <TextInput
                            onChangeText={handleChange("address")}
                            onBlur={handleBlur("address")}
                            value={values.address}
                            style={styles.input}
                            placeholder="Address"
                          />
                          {touched.address && errors.address && (
                            <Text style={styles.errors}>{errors.address}</Text>
                          )}
                        </View>
                      </View>
                      <View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Time</Text>
                          <TouchableOpacity
                            onPress={() => setTimePickerVisible(true)}
                          >
                            <TextInput
                              label="Time"
                              value={values.time}
                              onBlur={handleBlur("time")}
                              editable={false}
                              style={styles.input}
                              error={touched.time && !!errors.time}
                            />
                          </TouchableOpacity>
                          {touched.time && errors.time && (
                            <Text style={{ color: "red" }}>{errors.time}</Text>
                          )}

                          <TimePickerModal
                            visible={timePickerVisible}
                            onDismiss={() => setTimePickerVisible(false)}
                            onConfirm={(time) =>
                              handleTimeConfirm(time, setFieldValue)
                            }
                            hours={12} // default hour
                            minutes={0} // default minute
                            label="Select time"
                            cancelLabel="Cancel"
                            confirmLabel="Ok"
                            locale="en"
                            animationType="slide"
                            // clockIcon="none"
                            keyboardIcon={false}
                          />
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>
                            Zipcode <Text style={styles.required}>*</Text>
                          </Text>
                          <TextInput
                            onChangeText={handleChange("zipcode")}
                            onBlur={handleBlur("zipcode")}
                            value={values.zipcode}
                            style={styles.input}
                            placeholder="Zipcode"
                          />
                          {touched.zipcode && errors.zipcode && (
                            <Text style={styles.errors}>{errors.zipcode}</Text>
                          )}
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
                        <TextInput
                          onChangeText={handleChange("date")}
                          onBlur={handleBlur("date")}
                          value={values.date}
                          style={styles.input}
                          placeholder="DD/MM/YYYY"
                        />
                        {touched.date && errors.date && (
                          <Text style={styles.errors}>{errors.date}</Text>
                        )}
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nearest Landmark</Text>
                        <TextInput
                          onChangeText={handleChange("landmark")}
                          onBlur={handleBlur("landmark")}
                          value={values.landmark}
                          style={styles.input}
                          placeholder="Nearest Landmark"
                        />
                        {touched.landmark && errors.landmark && (
                          <Text style={styles.errors}>{errors.landmark}</Text>
                        )}
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Additional Information</Text>
                        <Text style={styles.optional}>
                          Order Notes (Optional)
                        </Text>
                        <TextInput
                          onChangeText={handleChange("additional")}
                          onBlur={handleBlur("additional")}
                          value={values.additional}
                          style={styles.textarea}
                          placeholder="Additional Information"
                          multiline
                          numberOfLines={5}
                        />
                        {touched.additional && errors.additional && (
                          <Text style={styles.errors}>{errors.additional}</Text>
                        )}
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
                      {cart.map((c, idx) => (
                        <View style={styles.row} key={idx}>
                          <Text style={styles.productDetail}>
                            {c?.name}
                            <Text style={styles.quantity}> x{c?.amount}</Text>
                          </Text>
                          <Text
                            style={[styles.productDetail, styles.textRight]}
                          >
                            <FormatPrice price={c?.price * c?.amount} />
                          </Text>
                        </View>
                      ))}
                      <View style={styles.separator} />
                      <View style={styles.row}>
                        <Text style={styles.summaryColumn}>Subtotal</Text>
                        <Text style={[styles.summaryColumn, styles.textRight]}>
                          <FormatPrice price={totalPrice} />
                        </Text>
                      </View>
                      <View style={styles.separator} />
                      <View style={styles.row}>
                        <Text style={styles.summaryColumn}>
                          Shipping Charge
                        </Text>
                        <Text style={[styles.summaryColumn, styles.textRight]}>
                          <FormatPrice price={30} />
                        </Text>
                      </View>
                      <View style={styles.separator} />
                      <View style={styles.row}>
                        <Text style={styles.summaryColumn}>Promo Discount</Text>
                        <Text style={[styles.summaryColumn, styles.textRight]}>
                          00.00
                        </Text>
                      </View>
                      <View style={styles.separator} />
                      <View style={styles.row}>
                        <Text style={styles.summaryColumn}>Order Total</Text>
                        <Text style={[styles.summaryColumn, styles.textRight]}>
                          <FormatPrice price={totalPrice + 30} />
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
                              selectedPaymentMethod === "cash"
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => setSelectedPaymentMethod("cash")}
                          />
                          <Text>Cash on Delivery</Text>
                        </View>
                        <View style={styles.radioContainer}>
                          <RadioButton
                            value="upi"
                            status={
                              selectedPaymentMethod === "upi"
                                ? "checked"
                                : "unchecked"
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
                  </View>
                  <Footer />
                </React.Fragment>
              );
            }}
          </Formik>
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

  errors: {
    fontSize: 12,
    color: "red",
    marginTop: "2%",
    marginLeft: "1%",
  },
});

export default CheckoutScreen;
