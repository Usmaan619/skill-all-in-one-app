import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ICONS } from "../constants/Constant";
import Footer from "../common/Footer";
import { useDispatch } from "react-redux";
import { setHeaderScroll } from "../redux/actions/action";
import GradientHOC from "../HOC/Gradient";
import { useFocusEffect } from "@react-navigation/native";

const AboutSuperChicks = ({ navigation }) => {
  const dispatch = useDispatch();

  useFocusEffect(() => {
    return () => {
      dispatch(setHeaderScroll(false));
    };
  });
  return (
    <React.Fragment>
      <Image
        source={ICONS?.headerTopImg}
        className="object-cover h-[40] w-full mt-2"
      />
      <View className="px-6 ">
        <View className="mt-10">
          <View style={styles.fullWidthCol}>
            <View style={styles.aboutContent}>
              <Text style={styles.headerText}>
                About <Text style={styles.highlight}>SuperChicks</Text>
              </Text>
              <Text style={styles.subHeaderText}>
                Delivering fresh Chicken, fresh Mutton, and fresh Fish to your
                doorstep
              </Text>
            </View>
            <Text style={styles.paragraph}>
              SuperChicks supplies provides you fresh and hygienic meat products
              at very reasonable price. Forget the old days of purchasing meat
              from stinky and unhygienic shops. Now just order it online and get
              it delivered to your door steps.
            </Text>
            <Text style={styles.paragraph}>
              Our online store allows you to conveniently purchase raw, 100%
              fresh food, including chicken, freshwater fish and mutton that is
              never frozen. As a leading online company, SuperChicks is
              committed to offering the finest quality and freshness in chicken,
              fish and mutton.
            </Text>
            <Text style={styles.paragraph}>
              Our products are sourced from fresh slaught and processed just a
              few hours before being delivered to your doorstep, ensuring
              hygiene and quality at every step.Our products come with 100%
              quality satisfaction promise
            </Text>
          </View>
        </View>
        <View className="">
          <Image
            source={ICONS?.aboutUsImg}
            resizeMode="cover"
            style={styles.image}
          />
        </View>

        <View style={styles.fullWidthCol}>
          <Text style={styles.subHeaderText}>
            How does your order reach your doorstep?
          </Text>
          <Text style={styles.paragraph}>
            When you place an order with us, we guarantee a 110 minutes
            delivery. Our team ensures that the products are fresh, hygienic,
            and processed shortly before being handed over to our delivery
            executive.
          </Text>
        </View>
        <View style={styles.fullWidthCol}>
          <Text style={styles.subHeaderText}>
            The benefits of ordering from SUPER-CHICKS:
          </Text>
          <Text style={styles.paragraph}>
            We offer Cash on Delivery (COD) as well as online mode of payment to
            give customers the freedom to inspect the quality and freshness of
            our products. We prioritize delivering only fresh products and take
            prompt action to rectify any issues.
          </Text>
          <Text style={styles.paragraph}>
            If you are looking for the best experience and highest quality meat
            and fish online, SuperChicks is the right choice for you. Our
            products are tender and live-slaughtered just before delivery,
            ensuring the utmost freshness and quality. We are here to deliver on
            our promises and provide you with an excellent culinary experience.
          </Text>
        </View>
        <View style={styles.fullWidthCol}>
          <Text style={styles.highlightRed}>
            Choose SuperChicks for your meat and fish needs, and we guarantee
            your satisfaction with every order.
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  col: {
    // flex: 1,
    paddingRight: 10,
    // marginBottom: 50,
    // marginVertical:10
  },
  colImage: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidthCol: {
    marginBottom: 20,
  },
  aboutContent: {
    // marginBottom: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  highlight: {
    color: "red",
  },
  subHeaderText: {
    fontSize: 18,
    color: "black",
    marginBottom: 5,
    marginTop: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
    textAlign: "justify",
  },
  highlightRed: {
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  whatsappButton: {
    backgroundColor: "#25D366",
    borderRadius: 50,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundColor: "#fff",
  },
});

export default GradientHOC(AboutSuperChicks);
