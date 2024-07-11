import { Image, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const GradientHOC = (Component) => {
  const gradientProps = {
    colors: ["#1f1c2c", "#928DAB"],
  };

  return (props) => {
    return (
      <>
        <StatusBar
          networkActivityIndicatorVisible={true}
          translucent={true}
          style="auto"
          backgroundColor="#000"
          barStyle="light-content"
        />
        <LinearGradient colors={gradientProps.colors} style={styles.gradient} />
        {/* <Image style={styles.gradient} source={ICONS.bgImg} /> */}
        <Component {...props} />
      </>
    );
  };
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
});
