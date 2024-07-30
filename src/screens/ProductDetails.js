import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Assuming you are using Expo, otherwise use react-native-vector-icons
import { ICONS } from "../constants/Constant";
import CollapsibleView from "../components/CollapsibleView.component";
import CommonButton from "../components/Button.component";
import Footer from "../common/Footer";

import Carousel from "react-native-x-carousel";

const ProductDetails = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const images = [
    { src: require("../../assets/Mutton/Order-Mutton-2.jpg"), alt: "Slide 1" },
    { src: require("../../assets/Mutton/Order-Mutton-2.jpg"), alt: "Slide 2" },
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

  const renderCarousel = (data) => (
    <View
      key={data.alt}
      style={styles.carousel}
      className="bg-white rounded-lg"
    >
      <Image
        source={require("../../assets/Mutton/Order-Mutton-2.jpg")}
        style={{ elevation: 12 }}
        className="h-40 w-40 rounded-full"
      />
    </View>
  );

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
            className="absolute top-0 h-[200px] w-full object-cover z-10"
          />
          <View className="relative  mt-16 ">
            <View style={styles.container}>
              <Carousel
                data={images}
                renderItem={renderCarousel}
                autoplay
                loop
              />

              <View style={styles.detailsSection}>
                <Text style={styles.heading}>Delivery Details</Text>
                <Text>Check estimated delivery date/pickup option.</Text>
                <View style={styles.inputGroup}>
                  <TextInput
                    style={styles.input}
                    placeholder="Apply Valid Pincode"
                  />
                  <Button title="Check" onPress={() => {}} />
                </View>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>Chicken Mince(KEEMA)</Text>
                <View style={styles.priceSection}>
                  <Text style={styles.price}>Rs 311</Text>
                  <Text style={styles.originalPrice}>
                    {/* <del>389</del> */}
                  </Text>
                  <Text style={styles.discount}>NA</Text>
                </View>
                <Text>Quantity:</Text>
                <View style={styles.quantitySection}>
                  <Button title="-" onPress={() => setQuantity(quantity - 1)} />
                  <Text>{quantity}</Text>
                  <Button title="+" onPress={() => setQuantity(quantity + 1)} />
                </View>
                <TouchableOpacity>
                  <Text style={styles.moreThan20}>
                    For more than 20kg click here
                  </Text>
                </TouchableOpacity>
                <Text style={styles.description}>
                  SuperChicks Chicken Keema is made from fresh, cleaned chicken
                  breast & leg that has been ground to perfection. All you have
                  to do is take the mince from the pack and add it to your pan
                  for a quick meal. To retain its pristine taste, texture and
                  flavour, it's adviced to not wash the meat.
                </Text>
                <View style={styles.cartButtons}>
                  <Button title="Add to Cart" onPress={() => {}} />
                  <Button title="Buy Now" onPress={() => {}} />
                </View>
              </View>

              <Text style={styles.similarProductsHeading}>
                Similar Products
              </Text>
              <View style={styles.similarProducts}>
                {similarProducts.map((product, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.productCard}
                    onPress={() => {}}
                  >
                    <Image source={product.img} style={styles.productImage} />
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text style={styles.productOriginalPrice}>
                      {/* <del>{product.originalPrice}</del> */}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          {/* Footer */}
          <Footer />
        </ImageBackground>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  carousel: {
    width: 340,
    height: 200,
    padding: 19,
    elevation: 3,
    margin: 12,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
  },
  productInfo: {
    marginVertical: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
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
});

export default ProductDetails;
