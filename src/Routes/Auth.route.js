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

import CollapsibleViewComponent from "../components/CollapsibleView.component";
import { View } from "react-native-animatable";

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
                screenOptions={({ navigation }) => ({
                  headerShown: true,
                  animation: "slide_from_right",
                  header: () => (
                    <View
                      style={{ height: 111, backgroundColor: "transparent" }}
                    >
                      {/* Adjust height or background as needed */}
                      <CollapsibleViewComponent navi={navigation} />
                    </View>
                  ),
                })}
              >
                {token ? (
                  <Stack.Screen name="DashboardLayout" component={DashboardL} />
                ) : (
                  <React.Fragment>
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
