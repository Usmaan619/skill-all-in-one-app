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

import Carousel from "react-native-x-carousel";
import Del from "../hooks/Del.hook";
import Hr from "../tags/Hr.tag";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { getSingleProductAPI } from "../services/Auth.service";
import { connect, useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/action";

const ProductDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const singleProductId = route?.params?.data?.id;
  console.log("singleProduct: ", singleProductId);

  const [quantity, setQuantity] = useState(1);
  const [pages, setPages] = useState();
  const [product, setProduct] = useState();
  console.log("product: ", product);
  const images = [
    { src: require("../../assets/Mutton/Order-Mutton-2.jpg"), alt: "Slide 1" },
    {
      src: require("../../assets/most-popular-products/home-Products.jpg"),
      alt: "Slide 2",
    },
    { src: require("../../assets/Mutton/Order-Mutton-2.jpg"), alt: "Slide 3" },
    { src: require("../../assets/Mutton/Order-Mutton-2.jpg"), alt: "Slide 4" },
  ];

  const similarProducts = [
    {
      link: "/singleproduct/ch-721",
      img: ICONS?.headerLogo,
      name: "Chicken mixed with bone",
      price: "148 Rs",
      originalPrice: "185 Rs",
    },
    {
      link: "/singleproduct/ch-725",
      img: ICONS?.headerLogo,
      name: "Chicken Wings",
      price: "175 Rs",
      originalPrice: "219 Rs",
    },
    {
      link: "/singleproduct/ch-727",
      img: ICONS?.headerLogo,
      name: "Chicken Breast",
      price: "271 Rs",
      originalPrice: "339 Rs",
    },
    {
      link: "/singleproduct/ch-726",
      img: ICONS?.headerLogo,
      name: "Chicken Mince (Keema)",
      price: "311 Rs",
      originalPrice: "389 Rs",
    },
  ];

  useEffect(() => {
    new Promise(async (resolve, reject) => {
      try {
        setProduct(await getSingleProductAPI(singleProductId));
      } catch (error) {
        console.log("error: ", error);
      }

      resolve(1);
    });
  }, []);

  const renderCarousel = (data) => (
    <View
      key={data.alt}
      style={styles.carousel}
      className="bg-white rounded-lg"
    >
      <Image
        source={require("../../assets/Mutton/Order-Mutton-2.jpg")}
        style={{ elevation: 12 }}
        className="h-52 w-full object-cover"
        resizeMode="cover"
      />
    </View>
  );
  const [amount, setAmount] = useState(1);
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < 10 ? setAmount(amount + 1) : setAmount(10);
  };

  const handleAddToCart = (id, amount, singleProduct) => {
    dispatch(addToCart(id, amount, singleProduct));
  };

  return (
    <React.Fragment>
      <ImageBackground
        source={ICONS?.bgImg}
        resizeMode="cover"
        style={styles?.backgroundImage}
      >
        <ScrollView style={{ flexGrow: 1 }}>
          <CollapsibleView navi={navigation} className="absolute " />
          <Image
            source={ICONS?.homeBg}
            className="absolute top-0 h-[190px] w-full object-cover z-10 "
          />
          <View className="relative  mt-16 ">
            <View style={styles.container}>
              <Carousel
                data={images}
                renderItem={renderCarousel}
                // autoplay
                // loop
                onPage={(p) => {
                  setPages(p?.current);
                }}
              />
              <View className="flex-row justify-between mt-6">
                <Image
                  source={require("../../assets/Mutton/Order-Mutton-2.jpg")}
                  style={{ elevation: 12 }}
                  className={`h-20 w-20 object-cover rounded-lg  ${
                    images[pages]?.src ? "" : "opacity-70"
                  } `}
                  resizeMode="cover"
                />
                <Image
                  source={require("../../assets/most-popular-products/home-Products.jpg")}
                  style={{ elevation: 12 }}
                  className={`h-20 w-20 object-cover rounded-lg  ${
                    images[pages]?.src ? "" : "opacity-70"
                  } `}
                  resizeMode="cover"
                />
                <Image
                  source={require("../../assets/Mutton/Order-Mutton-2.jpg")}
                  style={{ elevation: 12 }}
                  className="h-20 w-20 object-cover rounded-lg"
                  resizeMode="cover"
                />
                <Image
                  source={require("../../assets/Mutton/Order-Mutton-2.jpg")}
                  style={{ elevation: 12 }}
                  className="h-20 w-20 object-cover rounded-lg"
                  resizeMode="cover"
                />
              </View>

              <View style={styles.detailsSection}>
                <Text style={styles.heading}>Delivery Details</Text>
                <Text className="text-slate-600 my-2">
                  Check estimated delivery date/pickup option.
                </Text>
                <View className="flex-row">
                  <TextInput
                    className="m-0  "
                    style={styles.input}
                    placeholder="Apply Valid Pincode"
                  />
                  <TouchableOpacity className="bg-[#f1f1f1] h-10 flex-row justify-center items-center p-2">
                    <Text className="text-[#db1516]">Check</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productTitle} className="font-medium">
                  {product?.name}
                </Text>
                <View style={styles.priceSection}>
                  <Text style={styles.price}>{product?.price}</Text>
                  <Text style={styles.originalPrice}>
                    <Del>{product?.discount}</Del>
                  </Text>
                  <Text style={styles.discount}>{product?.offers}</Text>
                </View>
                <Hr />
                <View className="flex-row  items-baseline gap-3 my-1">
                  <Text className="text-lg font-normal">Quantity:</Text>
                  <View className="w-20 h-9 border-[#f00] border rounded-lg flex-row justify-between px-1 items-center ">
                    <TouchableOpacity onPress={setDecrease}>
                      <Entypo name="minus" size={22} color="#f00" />
                    </TouchableOpacity>
                    <Text>{amount}</Text>
                    <TouchableOpacity onPress={setIncrease}>
                      <Entypo name="plus" size={22} color="#f00" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text style={styles.moreThan20} className="text-lg">
                    For more than 20kg click here
                  </Text>
                </TouchableOpacity>
                <Text
                  style={styles.description}
                  className="text-sm text-slate-600"
                >
                  {product?.description}
                </Text>
                <View className="grid gap-3 justify-center items-center">
                  <View className="w-2/3">
                    {/* add to cart  */}
                    <TouchableOpacity
                      onPress={() => {
                        handleAddToCart(product?.id, amount, product);
                      }}
                      style={[styles.button]}
                    >
                      <LinearGradient
                        colors={["#ffffff", "#fff"]} // Gradient colors
                        style={[styles.linearGradient]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <Text style={styles.text}>Add to Cart</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <View className="w-2/3">
                    <CommonButton onPress={() => {}} title={"Buy Now"} />
                  </View>
                </View>
              </View>
              <View className="my-2">
                <Hr />
              </View>
              {/* Similar Products */}
              <Text style={styles.similarProductsHeading}>
                Similar Products
              </Text>

              <Card
                style={{ marginBottom: "10%", elevation: 10, marginTop: 10 }}
              >
                <Card.Cover
                  source={require("../../assets/most-popular-products/home-Products.jpg")}
                  resizeMode="cover"
                  className="bg-white h-60 w-full"
                />
                <Card.Title
                  title={"Chicken mixed with bone"}
                  titleStyle={{
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                />

                <Card.Actions>
                  <View className="flex-row justify-center w-full px-2">
                    <Text className="text-base ">
                      148 Rs{" "}
                      <Del>
                        <Text className="text-[#db1516]">185 Rs</Text>
                      </Del>{" "}
                    </Text>
                  </View>
                </Card.Actions>
              </Card>
              {/* Similar Products */}
            </View>
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
    padding: 15,
  },
  carousel: {
    width: 360,
    height: 200,
    // padding: 19,
    elevation: 3,
    margin: 2,
    overflow: "hidden",
  },
  carouselItem: {
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 200,
  },
  detailsSection: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    padding: 5,
    backgroundColor: "#f1f1f1",
  },
  productInfo: {
    marginVertical: 20,
  },
  productTitle: {
    fontSize: 24,
  },
  priceSection: {
    flexDirection: "row",

    alignItems: "center",
    marginVertical: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: "#888",
    marginRight: 10,
  },
  discount: {
    fontSize: 18,
    color: "#f00",
  },
  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreThan20: {
    color: "#f00",
    textDecorationLine: "underline",
  },
  description: {
    marginVertical: 10,
  },
  cartButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  similarProductsHeading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  similarProducts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    marginVertical: 10,
  },
  productImage: {
    width: "100%",
    height: 100,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    textAlign: "center",
  },
  productOriginalPrice: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    height: 50,
    zIndex: 99,
    marginHorizontal: "auto",
    width: "100%",
    borderWidth: 1,
    borderColor: "#f00",
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 40,
    height: 50,
    width: "100%",
    elevation: 5,
    zIndex: 100,
  },
  text: {
    color: "#f00", // default text color
    fontSize: heightPercentageToDP("1.9%"),
    fontWeight: "700",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => {
  return {
    ...state?.CartReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
