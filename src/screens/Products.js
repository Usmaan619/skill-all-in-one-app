import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CollapsibleView from "../components/CollapsibleView.component";
import {
  ALIVEDESICHICKEN,
  CHICKENPRODUCTS,
  COLOURs,
  ICONS,
  MUTTON,
} from "../constants/Constant";
import CommonButton from "../components/Button.component";
import Footer from "../common/Footer";
import { Card } from "react-native-paper";
import Del from "../hooks/Del.hook";

const Products = ({ navigation }) => (
  <React.Fragment>
    <ScrollView style={{ flexGrow: 1 }}>
      {/* bg img */}
      <CollapsibleView navi={navigation} className="absolute" />
      {/* home */}

      <Image
        source={ICONS?.homeBg}
        className="absolute top-0 h-[900px] object-cover"
      />

      <View className="px-10 relative h-screen">
        <View className="flex justify-center mt-6">
          <Text className={`mt-2 text-2xl text-left font-bold text-[#DB1516]`}>
            Order raw meat &
          </Text>
          <Text className="mt-2 text-2xl  font-bold text-[#DB1516]">
            get it delivered at
          </Text>
          <Text className="mt-2 text-2xl  font-bold text-[#DB1516]">
            your door steps.
          </Text>

          <Text className="text-base mt-4 text-left">
            Absolutely fresh Chicken 100% Natural & Chemical free
          </Text>
        </View>
        <Image
          source={ICONS?.productTopImg}
          className="h-2/5 w-full mt-12 
          "
        />
      </View>
      {/* home end */}

      <View className="px-4">
        <Text className=" text-center text-3xl font-semibold">
          Order Fresh {"\n"} Chicken, Mutton & {"\n"} Fish from
        </Text>
        <Text className="text-[#DB1516] text-center text-3xl font-semibold">
          SuperChicks
        </Text>

        <View className="my-3">
          <Text className="text-left text-lg font-medium mb-10 mt-5">
            CHICKEN
          </Text>

          <Chicken navi={navigation} />
          <Text className="text-left text-lg font-medium mb-10 mt-5">
            ALIVE DESI CHICKEN
          </Text>
          <AliveDesiChicken />
          <Text className="text-left text-lg font-medium mb-10 mt-5">
            MUTTON
          </Text>
          <Mutton />
        </View>
      </View>

      {/* Footer */}
      <Footer />
    </ScrollView>
  </React.Fragment>
);

const Chicken = ({ navi }) => {
  return (
    <React.Fragment>
      {CHICKENPRODUCTS?.map((d, idx) => (
        <Card key={idx} style={{ marginBottom: "10%", elevation: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navi?.navigate("ProductDetails", { data: d });
            }}
          >
            <Card.Cover
              source={d?.image}
              resizeMode="cover"
              className="bg-white h-60 w-full"
            />
          </TouchableOpacity>
          <Card.Title
            title={d?.title}
            subtitle={d?.kilogram}
            titleStyle={{ fontSize: 18, fontWeight: "700" }}
            subtitleStyle={{
              fontSize: 14,
              fontWeight: "700",
            }}
          />

          <Card.Actions>
            <View className="flex-row justify-between w-full px-2">
              <Text>
                {d?.amount}{" "}
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }}
                >
                  {d?.del}
                </Text>
              </Text>
              <View className="w-1/3 mb-3">
                <CommonButton
                  onPress={() => {
                    // handleSubmit();
                  }}
                  title={d?.button}
                />
              </View>
            </View>
          </Card.Actions>
        </Card>
      ))}
    </React.Fragment>
  );
};

const AliveDesiChicken = () => {
  return (
    <React.Fragment>
      {ALIVEDESICHICKEN?.map((d, idx) => (
        <Card key={idx} style={{ marginBottom: "10%", elevation: 10 }}>
          <Card.Cover
            source={d?.img}
            resizeMode="stretch"
            className="bg-white w-full h-60 "
          />
          <Card.Title
            title={d?.name}
            subtitle={d?.gms}
            titleStyle={{ fontSize: 18, fontWeight: "700" }}
            subtitleStyle={{
              fontSize: 14,
              fontWeight: "700",
              color: COLOURs?.red,
            }}
          />

          <Card.Actions>
            <View className="flex-row justify-between w-full px-2">
              <Text>
                {d?.currentPrice} <Del>{d?.prePrice}</Del>
              </Text>
              <View className="w-1/3 mb-3">
                {/* <CommonButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={"Add To Cart"}
                /> */}
              </View>
            </View>
          </Card.Actions>
        </Card>
      ))}
    </React.Fragment>
  );
};

const Mutton = () => {
  return (
    <React.Fragment>
      {MUTTON?.map((d, idx) => (
        <Card key={idx} style={{ marginBottom: "10%", elevation: 10 }}>
          <Card.Cover
            source={d?.img}
            resizeMode="cover"
            className="bg-white h-60 w-full"
          />
          <Card.Title
            title={d?.name}
            subtitle={d?.gms}
            titleStyle={{ fontSize: 18, fontWeight: "700" }}
            subtitleStyle={{
              fontSize: 14,
              fontWeight: "700",
              color: COLOURs?.red,
            }}
          />

          <Card.Actions>
            <View className="flex-row justify-between w-full px-2">
              <Text>
                {d?.currentPrice}{" "}
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }}
                >
                  {d?.prePrice}
                </Text>
              </Text>
              <View className="w-1/3 mb-3">
                {/* <CommonButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={"Add To Cart"}
                /> */}
              </View>
            </View>
          </Card.Actions>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default Products;
