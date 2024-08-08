import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IMAGE } from "../constants/Constant";

const { width } = Dimensions.get("window");

const MyImageCarousel = ({ route }) => {
  const { id } = route.params;
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef();
  const autoplayRef = useRef();

  useEffect(() => {
    // Find the images for the given id
    const selectedImageSet = IMAGE.find((item) => item.id === id);
    if (selectedImageSet) {
      setImages(selectedImageSet.imgs.map((img) => img.imgs1));
    }
  }, [id]);

  useEffect(() => {
    // Start autoplay when the component mounts
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(autoplayRef.current);
    };
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      scrollRef.current.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to the first image if at the end
      scrollRef.current.scrollTo({ x: 0, animated: true });
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollRef.current.scrollTo({
        x: (currentIndex - 1) * width,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    } else {
      // Loop to the last image if at the beginning
      scrollRef.current.scrollTo({
        x: (images.length - 1) * width,
        animated: true,
      });
      setCurrentIndex(images.length - 1);
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onMomentumScrollEnd={(e) =>
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
      >
        {images.map((image, index) => (
          <View
            style={[
              styles.imageContainer,
              { opacity: index === currentIndex ? 1 : 0.5 }, // Change opacity of non-active images
            ]}
            key={index}
          >
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
          <Ionicons
            name="chevron-back-circle-outline"
            size={40}
            color="black"
          />
        </TouchableOpacity>
        <Text>{`${currentIndex + 1} / ${images.length}`}</Text>
        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === images.length - 1}
        >
          <Ionicons
            name="chevron-forward-circle-outline"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
});

export default MyImageCarousel;
