import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../services/Storage.service";
import Login from "../screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import NetworkComponent from "../components/Network.component";
import { SetNetInfo, SetToken } from "../redux/actions/action";
import { useNetInfo } from "@react-native-community/netinfo";
import { AxiosInterceptors } from "../axios/interceptor";
import Home from "../screens/Home";
import ContactUs from "../screens/ContactUs";
import AboutSuperChicks from "../screens/AboutUs";
import CollapsibleView from "../components/CollapsibleView.component";

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
                  <Stack.Screen name="DashboardLayout" component={DashboardL} />
                ) : (
                  <React.Fragment>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="ContactUs" component={ContactUs} />
                    <Stack.Screen name="About" component={AboutSuperChicks} />
                    <Stack.Screen name="Co" component={CollapsibleView} />

                    <Stack.Screen name="Login" component={Login} />
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
