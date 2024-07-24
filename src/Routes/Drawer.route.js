import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardPage from "./Dashboard.page";
import { connect } from "react-redux";
import React from "react";
import { GradientHOC } from "../HOC/Gradient";

const Drawer = createDrawerNavigator();

const DashboardLayoutPage = () => {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <React.Fragment>
          <Drawer.Screen
            name="Dashboard"
            component={DashboardPage}
            options={{ title: t("Dashboard") }}
          />
        </React.Fragment>
      </Drawer.Navigator>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state?.auth,
    ...state?.isLoggingIn,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GradientHOC(DashboardLayoutPage));
