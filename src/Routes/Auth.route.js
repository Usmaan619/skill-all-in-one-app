import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../services/Storage.service";
import Login from "../screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import NetworkComponent from "../components/Network.component";
import { SetNetInfo, SetToken, SetUserType } from "../redux/actions/action";
import { useNetInfo } from "@react-native-community/netinfo";
import { AxiosInterceptors } from "../axios/interceptor";
import WelcomeLogin from "../screens/WelcomeLogin";
import {
  AdminTabNavigation,
  EmloyeeTabNavigation,
  StudentTabNavigation,
} from "./Tabs.route";
import Spinner from "react-native-loading-spinner-overlay";
const Stack = createStackNavigator();

const AuthRoutes = ({ token, isNetConnected, loader, userType }) => {
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
        const _userType = await getData("userType");

        if (_token) {
          dispatch(SetToken(_token || null));
          dispatch(SetUserType(_userType || null));
        }
        setLoading(true);
        res(1);
      });
    })
  );

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
                screenOptions={({}) => ({
                  headerShown: false,
                  animation: "slide_from_right",
                })}
              >
                {token ? (
                  userType === "admin" ? (
                    <Stack.Screen
                      name="AdminDashboard"
                      component={AdminTabNavigation} // Replace with admin dashboard component
                    />
                  ) : userType === "employee" ? (
                    <Stack.Screen
                      name="EmployeeDashboard"
                      component={EmloyeeTabNavigation} // Replace with employee dashboard component
                    />
                  ) : userType === "student" ? (
                    <Stack.Screen
                      name="StudentDashboard"
                      component={StudentTabNavigation} // Replace with student dashboard component
                    />
                  ) : (
                    <>
                      <Stack.Screen
                        name="WelcomeLogin"
                        component={WelcomeLogin}
                      />
                      <Stack.Screen
                        options={{ headerShown: false }}
                        name="Login"
                        component={Login}
                      />
                    </>
                  )
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
  return {
    ...state?.AuthReducer,
    ...state?.LoaderReducer,
    ...state?.loader,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes);
