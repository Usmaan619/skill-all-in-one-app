import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { GradientHOC } from "../HOC/Gradient";
import {
  ABOUTHOMEIMG,
  COLOURs,
  EXPLOREHOMEIMG,
  ICONS,
  MOSTPOPULARPRODUCTS,
  WHYORDERFORMSUPERCHICKS,
} from "../constants/Constant";
import CommonButton from "../components/Button.component";
import HeaderModal from "../components/Header.component";
import CollapsibleView from "../components/CollapsibleView.component";
import { Avatar, Button, Card } from "react-native-paper";
const Home = () => {
  const handleSubmit = () => {
    toggleModal();
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <React.Fragment>
      <ScrollView style={{ flexGrow: 1 }}>
        {/* bg img */}
        <CollapsibleView className="absolute" />
        <Image source={ICONS?.homeBg} className="absolute top-0 h-2/6 " />
        {/* home */}
        <View className="px-10 relative h-screen ">
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
                  handleSubmit();
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
        {/* home end */}
        {/* About */}
        <AboutHome />

        {/* Explor */}
        <ExploreCategories />
        {/* Most Popular Products */}
        <MostPopularProducts />

        {/* Why Order From SuperChicks */}
        <WhyOrderFromSuperChicks />
      </ScrollView>
    </React.Fragment>
  );
};

const AboutHome = () => {
  return (
    <React.Fragment>
      <View className="px-5">
        <Image
          resizeMode="cover"
          source={ICONS?.headerLogo}
          className="h-24 w-28 "
        />

        <View className="">
          <Text className="text-lg font-medium">
            About <Text style={{ color: COLOURs?.red }}>SuperChicks</Text>
          </Text>

          <Text className="text-base text-slate-600 mt-2">
            SuperChicks provides you fresh and hygienic meat products at very
            reasonable price. Forget the old days of purchasing meat from stinky
            and unhygienic shops. Now just order it online and get it delivered
            to your door steps.
          </Text>

          <View className="flex justify-center items-center my-5">
            {ABOUTHOMEIMG?.map((d, i) => (
              <Image key={i} source={d} className="h-44 w-72 my-2 " />
            ))}
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

const ExploreCategories = () => {
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
          <View className="grid justify-center items-center" key={idx}>
            <View
              style={{ elevation: 10 }}
              className=" bg-slate-100 h-32 w-32  justify-center items-center rounded-full"
            >
              <Image source={d?.img} className="h-20 w-20 object-cover" />
            </View>
            <Text className="text-center mt-3 text-xl font-medium">
              {d?.name}
            </Text>
            <Text className="text-center mt-3 text-sm font-medium text-[#DB1516]">
              {d?.subTitle}
            </Text>
          </View>
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
          <Card key={idx} style={{ marginBottom: "10%", elevation: 10 }}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#fff",
  },
});

export default GradientHOC(Home);
