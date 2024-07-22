import { Image, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const GradientHOC = (Component) => {
  const gradientProps = {
    colors: ["#FFFFFF", "#FFF"],
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
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "auto",
    width: "100%",
  },
});
