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
import WelcomeLogin from "../screens/WelcomeLogin";
import TabNavigation from "./Tabs.route";
import Spinner from "react-native-loading-spinner-overlay";
const Stack = createStackNavigator();

const AuthRoutes = ({ token, isNetConnected, loader }) => {
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

  const visible = !loading ? true : loader || false;
  console.log("token: ", token);
  return (
    <React.Fragment>
      {loading && (
        <React.Fragment>
          {!isNetConnected ? (
            <NetworkComponent />
          ) : (
            <>
              <Stack.Navigator
                screenOptions={({}) => ({
                  headerShown: false,
                  animation: "slide_from_right",
                })}
              >
                {token ? (
                  <Stack.Screen
                    name="DashboardLayout"
                    component={TabNavigation}
                  />
                ) : (
                  <React.Fragment>
                    <Stack.Screen
                      options={{ headerShown: false }}
                      name="WelcomeLogin"
                      component={WelcomeLogin}
                    />
                    <Stack.Screen
                      options={{ headerShown: false }}
                      name="Login"
                      component={Login}
                    />
                  </React.Fragment>
                )}
              </Stack.Navigator>
            </>
          )}
        </React.Fragment>
      )}
      <Spinner
        visible={visible}
        animation="fade"
        overlayColor="#000"
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log("state: ", state);
  return {
    ...state?.AuthReducer,
    ...state?.LoaderReducer,
    ...state?.loader,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes);
