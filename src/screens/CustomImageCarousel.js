// import React, { useState, useRef, useEffect } from "react";
// import { View, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
// import { IMAGE } from "../constants/Constant";

// const { width } = Dimensions.get("window");

// const MyImageCarousel = ({ route }) => {
//   const { id } = route.params;
//   const [images, setImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollRef = useRef();
//   const autoplayRef = useRef();

//   useEffect(() => {
//     // Find the images for the given id
//     const selectedImageSet = IMAGE.find((item) => item.id === id);
//     if (selectedImageSet) {
//       setImages(selectedImageSet.imgs.map((img) => img.imgs1));
//     }
//   }, [id]);

//   useEffect(() => {
//     // Start autoplay when the component mounts
//     autoplayRef.current = setInterval(() => {
//       handleNext();
//     }, 2000); // Change slide every 3 seconds

//     return () => {
//       // Clear the interval when the component unmounts
//       clearInterval(autoplayRef.current);
//     };
//   }, [currentIndex]);

//   const handleNext = () => {
//     if (currentIndex < images.length - 1) {
//       scrollRef.current.scrollTo({
//         x: (currentIndex + 1) * width,
//         animated: true,
//       });
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       // Loop back to the first image if at the end
//       scrollRef.current.scrollTo({ x: 0, animated: true });
//       setCurrentIndex(0);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       scrollRef.current.scrollTo({
//         x: (currentIndex - 1) * width,
//         animated: true,
//       });
//       setCurrentIndex(currentIndex - 1);
//     } else {
//       // Loop to the last image if at the beginning
//       scrollRef.current.scrollTo({
//         x: (images.length - 1) * width,
//         animated: true,
//       });
//       setCurrentIndex(images.length - 1);
//     }
//   };

//   return (
//     <View style={styles.carouselContainer}>
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         ref={scrollRef}
//         onMomentumScrollEnd={(e) =>
//           setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))
//         }
//       >
//         {images.map((image, idx) => (
//           <View
//             style={[
//               styles.imageContainer,
//               { opacity: idx === currentIndex ? 1 : 0.5 },
//             ]}
//             key={idx}
//           >
//             <Image source={image} style={[styles.image]} />
//           </View>
//         ))}
//       </ScrollView>
//       <View className="flex-row mt-5">
//         {images.map((image, idx) => (
//           <View
//             style={{
//               opacity: idx === currentIndex ? 1 : 0.5,
//               marginRight: 10,
//             }}
//             key={idx}
//           >
//             <Image
//               style={{ elevation: 12 }}
//               className={`h-16 w-20 object-cover rounded-lg  `}
//               source={image}
//               resizeMode="cover"
//             />
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   imageContainer: {
//     width: width - 25, // subtract 20 from the width to add some padding
//     height: 220,
//     justifyContent: "center",
//     alignSelf: "center",
//     flex: 1,
//     margin: 10, // add some margin to the image container
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "80%",
//     marginTop: 20,
//   },
// });

// export default MyImageCarousel;
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { IMAGE } from "../constants/Constant";

const { width } = Dimensions.get("window");

const ImageCarousel = ({ route }) => {
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
    }, 2000); // Change slide every 3 seconds

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

  const handleImagePress = (index) => {
    scrollRef.current.scrollTo({
      x: index * width,
      animated: true,
    });
    setCurrentIndex(index);
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
        {images.map((image, idx) => (
          <View
            style={[
              styles.imageContainer,
              { opacity: idx === currentIndex ? 1 : 0.5 },
            ]}
            key={idx}
          >
            <Image source={image} style={[styles.image]} />
          </View>
        ))}
      </ScrollView>
      <View className="flex-row mt-5">
        {images.map((image, idx) => (
          <TouchableOpacity
            style={{
              opacity: idx === currentIndex ? 1 : 0.5,
              marginRight: 10,
            }}
            key={idx}
            onPress={() => handleImagePress(idx)}
          >
            <Image
              style={{ elevation: 12 }}
              className={`h-16 w-20 object-cover rounded-lg  `}
              source={image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
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
    width: width - 25, // subtract 20 from the width to add some padding
    height: 220,
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    margin: 10, // add some margin to the image container
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

export default ImageCarousel;
