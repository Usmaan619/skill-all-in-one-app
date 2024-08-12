import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  ABOUTHOMEIMG,
  COLOURs,
  EXPLOREHOMEIMG,
  HAPPYCUSTOMERS1,
  HAPPYCUSTOMERS2,
  ICONS,
  MOSTPOPULARPRODUCTS,
  WHYORDERFORMSUPERCHICKS,
} from "../constants/Constant";
import CommonButton from "../components/Button.component";
import { Avatar, Card } from "react-native-paper";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { Rating } from "react-native-ratings";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setHeaderScroll } from "../redux/actions/action";
import GradientHOC from "../HOC/Gradient";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    toggleModal();
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    return () => {
      dispatch(setHeaderScroll(false));
    };
  }, []);

  // bg-[#ffe5e5]
  return (
    <>
      <View className=" h-screen ">
        <View className="px-10 bg-[#ffe5e5]">
          <View className="flex justify-center mt-6">
            <Text
              className={`mt-2 text-2xl text-left font-bold text-[#DB1516]`}
            >
              We Deliver
            </Text>
            <Text className="mt-2 text-2xl  font-bold text-[#DB1516]">
              Fresh & Premium
            </Text>
            <Text className="mt-2 text-2xl  font-bold text-[#DB1516]">
              Meats Everyday.
            </Text>

            <Text className="text-base mt-4 text-left">
              Why leave the house? Chicken delivery coming through.
            </Text>

            {/* Categories btn */}
            <View className="w-1/3 h-7 mt-5">
              <CommonButton
                onPress={() => {
                  navigation.navigate("Products");
                }}
                title={"Categories"}
              />
            </View>
          </View>
          <Image
            source={ICONS?.superSubLogo}
            className="h-1/3 w-full mt-12 
          "
          />
        </View>
        <Image
          source={ICONS?.headerTopImg}
          className="object-cover h-[40] w-full "
        />
      </View>
      {/* home end */}
      {/* About */}
      <AboutHome />

      {/* Explor */}
      <ExploreCategories navi={navigation} />
      {/* Most Popular Products */}
      <MostPopularProducts />

      {/* Why Order From SuperChicks */}
      <WhyOrderFromSuperChicks />
      {/* Hear From Our Happy Customers */}
      <HearFromOurHappyCustomers />
    </>
  );
};

const AboutHome = () => {
  return (
    <View className="px-5">
      <Image
        resizeMode="cover"
        source={ICONS?.headerLogo}
        className="h-28 w-32 "
      />

      <View className="">
        <Text className="text-lg font-medium">
          About <Text style={{ color: COLOURs?.red }}>SuperChicks</Text>
        </Text>

        <Text className="text-base text-slate-600 mt-2">
          SuperChicks provides you fresh and hygienic meat products at very
          reasonable price. Forget the old days of purchasing meat from stinky
          and unhygienic shops. Now just order it online and get it delivered to
          your door steps.
        </Text>

        <View className="flex justify-center items-center my-5">
          {ABOUTHOMEIMG?.map((d, i) => (
            <Image key={i} source={d} className="h-44 w-72 my-2 " />
          ))}
        </View>
      </View>
    </View>
  );
};

const ExploreCategories = ({ navi }) => {
  return (
    <View className="my-10 ">
      <Text className="text-[#DB1516] text-center text-2xl font-semibold">
        Explore Categories
      </Text>
      <Text className="text-slate-600 my-2 text-center text-sm font-normal">
        We deliver fresh Raw Meat at your doorstep
      </Text>

      <View className="grid justify-center items-center gap-7 my-5">
        {EXPLOREHOMEIMG?.map((d, idx) => (
          <TouchableOpacity
            className="grid justify-center items-center"
            key={idx}
            onPress={() => {
              navi.navigate("Products");
            }}
          >
            <View
              style={{ elevation: 5 }}
              className=" bg-white h-32 w-32  justify-center items-center rounded-full"
            >
              <Image source={d?.img} className="h-20 w-20 object-cover" />
            </View>
            <Text className="text-center mt-3 text-xl font-medium">
              {d?.name}
            </Text>
            <Text className="text-center mt-3 text-sm font-medium text-[#DB1516]">
              {d?.subTitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const MostPopularProducts = () => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  return (
    <View className="my-10">
      <Text className="text-center text-2xl font-semibold">
        Most Popular {"\n"}
        <Text className="text-[#DB1516] text-center text-xl font-semibold ">
          Products
        </Text>
      </Text>
      <View className="px-6 pt-14">
        {MOSTPOPULARPRODUCTS?.map((d, idx) => (
          <Card
            key={idx}
            style={{
              marginBottom: "10%",
              elevation: 10,
              backgroundColor: "#fff",
            }}
          >
            <Card.Cover source={d?.productImg} className="bg-white" />
            <Card.Title
              title={d?.name}
              subtitle={d?.subTitle}
              titleStyle={{ fontSize: 18, fontWeight: "700" }}
              subtitleStyle={{
                fontSize: 14,
                fontWeight: "700",
                color: COLOURs?.red,
              }}
            />

            <Card.Actions>
              <View className="w-1/3 mb-3">
                {d?.btn && (
                  <CommonButton
                    onPress={() => {
                      handleSubmit();
                    }}
                    title={d?.btn}
                  />
                )}
              </View>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </View>
  );
};
const WhyOrderFromSuperChicks = () => {
  return (
    <View className="my-10 ">
      <Text className="text-center text-2xl font-semibold">
        Why order from{"\n "}
        <Text className="text-[#DB1516] text-center text-2xl font-semibold">
          SuperChicks?
        </Text>
      </Text>

      <Text className="text-slate-600 my-2 text-center text-sm font-normal px-4">
        We deliver free of preservative , fssai registered, always fresh with
        fair pricing
      </Text>

      <View className="grid justify-center items-center gap-7 my-5">
        {WHYORDERFORMSUPERCHICKS?.map((d, idx) => (
          <View className="grid justify-center items-center" key={idx}>
            <View
              style={{ elevation: 10 }}
              className=" bg-white h-32 w-32  justify-center items-center rounded-full"
            >
              <Image source={d?.img} className="h-20 w-20 object-cover" />
            </View>
            <Text className="text-center mt-3 text-xl font-medium">
              {d?.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const HearFromOurHappyCustomers = () => {
  const renderCarousel = (data) => (
    <View
      key={data?.id}
      style={styles.carousel}
      className="bg-white rounded-lg"
    >
      <View className="flex-row gap-3 items-center">
        <Image
          source={data?.img}
          style={{ elevation: 12 }}
          className="h-20 w-20 rounded-full"
        />
        <View className="grid items-start ">
          <Text className="text-lg font-medium">{data?.name}</Text>
          <Rating
            imageSize={20}
            style={{ paddingVertical: 10 }}
            readonly={true}
            startingValue={4}
          />
        </View>
      </View>
      <Text className="text-slate-600 mt-5 text-center text-sm">
        {data?.review}
      </Text>
    </View>
  );
  return (
    <View className="my-5  w-full">
      <Text className="text-center text-2xl font-semibold">
        Hear From Our {"\n "}
        <Text className="text-[#DB1516] text-center text-2xl font-semibold">
          Happy Customers
        </Text>
      </Text>
      <View style={styles.container} className="my-9">
        <Carousel
          renderItem={renderCarousel}
          autoplay={true}
          loop={true}
          data={HAPPYCUSTOMERS1}
        />
        <Carousel
          renderItem={renderCarousel}
          autoplay={true}
          loop={true}
          data={HAPPYCUSTOMERS2}
        />
      </View>
      <View className="flex justify-center items-center gap-7 my-5 "></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  carousel: {
    width: 340,
    height: 200,
    padding: 19,
    elevation: 3,
    margin: 12,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundColor: "#fff",
  },
});

export default GradientHOC(Home);
