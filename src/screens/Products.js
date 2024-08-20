import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  ALIVEDESICHICKEN,
  CHICKENPRODUCTS,
  COLOURs,
  ICONS,
  MUTTON,
} from "../constants/Constant";
import CommonButton from "../components/Button.component";
import { Avatar, Card } from "react-native-paper";
import Del from "../hooks/Del.hook";
import { addToCart, setHeaderScroll } from "../redux/actions/action";
import { getSingleProductAPI } from "../services/Auth.service";
import { useDispatch } from "react-redux";
import GradientHOC from "../HOC/Gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
const Products = ({ navigation }) => {
  const dispatch = useDispatch();

  useFocusEffect(() => {
    return () => {
      dispatch(setHeaderScroll(false));
    };
  });
  return (
    <React.Fragment>
      <View className=" h-screen ">
        <View className="px-10 bg-[#ffe5e5]">
          <View className="flex justify-center mt-6">
            <Text
              className={`mt-2 text-2xl text-left font-bold text-[#DB1516]`}
            >
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
            className="h-[48%] w-full  
            "
          />
        </View>
        <Image
          source={ICONS?.headerTopImg}
          className="object-cover h-[40] w-full "
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
            CHICKEN{" "}
            <Image
              source={ICONS?.chickenImg}
              className="h-5 w-5  
            "
            />
          </Text>

          <Chicken navi={navigation} dis={useDispatch()} />
          <Text className="text-left text-lg font-medium mb-10 mt-5">
            ALIVE DESI CHICKEN{" "}
            <Image
              source={ICONS?.aliveChickenImg}
              className="h-5 w-5  
            "
            />
          </Text>
          <AliveDesiChicken />
          <Text className="text-left text-lg font-medium mb-10 mt-5">
            MUTTON{" "}
            <Image
              source={ICONS?.muttonImg}
              className="h-5 w-5  
            "
            />
          </Text>
          <Mutton />
        </View>
      </View>
    </React.Fragment>
  );
};

const Chicken = ({ navi, dis }) => {
  const addProduct = async (id) => {
    const response = await getSingleProductAPI(id);
    console.log("response:addProduct ", response);
    /** action add to cart */
    dis(addToCart(id, 1, response));
  };

  const CustomSubTitle = ({ title }) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesome name="balance-scale" size={20} color="red" />
      <Text style={{ fontSize: 14, fontWeight: "700", marginLeft: 5 }}>
        {title}
      </Text>
    </View>
  );

  return (
    <React.Fragment>
      {CHICKENPRODUCTS?.map((d, idx) => (
        <Card
          key={idx}
          style={{
            marginBottom: "10%",
            elevation: 10,
            backgroundColor: "#fff",
          }}
        >
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
            subtitle={<CustomSubTitle title={d?.kilogram} />}
            titleStyle={{ fontSize: 18, fontWeight: "700" }}
            subtitleStyle={{ fontSize: 14, fontWeight: "700" }}
          />

          <Card.Actions>
            <View className="flex-row justify-between items-center w-full px-2">
              <Text>
                <FontAwesome name="rupee" size={20} color="red" />{" "}
                <Text className="font-medium ">{d?.amount}</Text>{" "}
                <Del>{d?.del}</Del>
              </Text>
              <View className="w-1/3 mb-3">
                <CommonButton
                  onPress={() => {
                    addProduct(d?.id);
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
        <Card
          key={idx}
          style={{
            marginBottom: "10%",
            elevation: 10,
            backgroundColor: "#fff",
          }}
        >
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
        <Card
          key={idx}
          style={{
            marginBottom: "10%",
            elevation: 10,
            backgroundColor: "#fff",
          }}
        >
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundColor: "#fff",
  },
});

export default GradientHOC(Products);
