import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Assuming you are using Expo, otherwise use react-native-vector-icons
import { ICONS } from "../constants/Constant";
import CollapsibleView from "../components/CollapsibleView.component";

const AboutSuperChicks = () => {
  return (
    <React.Fragment>
      <ScrollView style={styles.container}>
        <Image source={ICONS?.homeBg} className="" />
        <CollapsibleView navi={navigation} className="absolute" />

        <View style={styles.row}>
          <View style={styles.col}>
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
              SuperChicks supplies provide you fresh and hygienic meat products
              at very reasonable prices. Forget the old days of purchasing meat
              from stinky and unhygienic shops. Now just order it online and get
              it delivered to your doorsteps. SuperChicks supplies provide you
              fresh and hygienic meat products at very reasonable prices. Forget
              the old days of purchasing meat from stinky and unhygienic shops.
              Now just order it online and get it delivered to your doorsteps.
              Our online store allows you to conveniently purchase raw, 100%
              fresh food, including chicken, freshwater fish, and mutton that is
              never frozen. As a leading online company, SuperChicks is
              committed to offering the finest quality and freshness in chicken,
              fish, and mutton. Our products are sourced from fresh slaughter
              and processed just a few hours before being delivered to your
              doorstep, ensuring hygiene and quality at every step. Our products
              come with a 100% quality satisfaction promise.
            </Text>
          </View>
          <View style={styles.colImage}>
            {/* <Image source={require('./path_to_image/ABout_page_image.jpg')} style={styles.image} /> */}
          </View>
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
        <TouchableOpacity style={styles.whatsappButton}>
          <FontAwesome name="whatsapp" size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: "relative",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  col: {
    flex: 1,
    paddingRight: 10,
  },
  colImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidthCol: {
    marginBottom: 20,
  },
  aboutContent: {
    marginBottom: 20,
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
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
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
});

export default AboutSuperChicks;
