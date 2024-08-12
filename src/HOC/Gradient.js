import React, { useRef, useEffect } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { ICONS } from "../constants/Constant";
import { onScrollChange } from "../utils/Helper";
import { useDispatch } from "react-redux";
import { setHeaderScroll } from "../redux/actions/action";
import Footer from "../common/Footer";

const GradientHOC = (Component) => {
  return function WrappedComponent(props) {
    const dispatch = useDispatch();
    const { navigation } = props;
    const scrollViewRef = useRef(null);

    // Function to scroll to top
    const scrollToTop = () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    useEffect(() => {
      return () => {
        dispatch(setHeaderScroll(false));
      };
    }, [dispatch]);

    return (
      <ImageBackground
        className="w-full h-full bg-white m-0 p-0 relative"
        source={ICONS?.bgImg}
        resizeMode="cover"
      >
        <ScrollView
          ref={scrollViewRef} // Assign the ref to ScrollView
          onScroll={(e) => {
            onScrollChange(e, dispatch);
          }}
          style={{ flexGrow: 1 }}
          contentInsetAdjustmentBehavior="automatic"
        >
          <Component {...props} scrollToTop={scrollToTop} />
          {/* Footer */}
          <Footer navigation={navigation} scrollToTop={scrollToTop} />
        </ScrollView>
      </ImageBackground>
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

export default GradientHOC;
