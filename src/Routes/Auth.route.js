import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../services/Storage.service";
import TabNavigation from "./Tabs.route";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { createStackNavigator } from "@react-navigation/stack";
import NetworkComponent from "../components/Network.component";
import { SetNetInfo, SetToken } from "../redux/actions/action";
import { useNetInfo } from "@react-native-community/netinfo";
import { AxiosInterceptors } from "../axios/interceptor";

const Stack = createStackNavigator();

const AuthRoutes = ({ token, isNetConnected, loader }) => {
  console.log("isNetConnected: ", isNetConnected);
  console.log("loader: ", loader);
  const dispatch = useDispatch();
  const netinfo = useNetInfo();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    AxiosInterceptors(dispatch);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      new Promise(async (res, rej) => {
        dispatch(SetNetInfo(netinfo.isConnected));
        const _token = await getData("token");
        if (_token) {
          dispatch(SetToken(_token || null));
        }
        setLoading(true);
        res(1);
      });
    })
  );

  console.log("token: ", token);
  const visible = !loading ? true : loader || false;
  return (
    <React.Fragment>
      {loading && (
        <React.Fragment>
          {!isNetConnected ? (
            <NetworkComponent />
          ) : (
            <>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: "slide_from_right",
                }}
              >
                {token ? (
                  <Stack.Screen
                    name="Main"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                  />
                ) : (
                  <React.Fragment>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                  </React.Fragment>
                )}
              </Stack.Navigator>

              {/* <AnimatedLoader
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../assets/animation/loading.json")}
                visible={visible}
                animationStyle={{ width: 150, height: 150 }}
                speed={1}
              ></AnimatedLoader> */}
            </>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log("state: ", state);
  return {
    ...state?.AuthReducer,
    ...state?.LoaderReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes);
