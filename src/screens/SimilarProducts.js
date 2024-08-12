import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Similar = ({ id, img, title, amt, del }) => {
  // const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SingleProduct", { id })}
    >
      <View style={styles.similarProductImg}>
        <Image source={img} style={styles.image} />
      </View>

      <View style={styles.similarProductName}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.similarProductPrice}>
        <Text style={styles.amt}>{amt}</Text>
        <Text style={styles.del}>{del}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  similarProductImg: {
    // Add your image container styles here
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

export default Similar;
