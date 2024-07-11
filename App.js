// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AuthRoute from "./src/Routes/Auth.route";
import store from "./src/redux/stores/store";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <AuthRoute />
      </NavigationContainer>
      <Toast topOffset={55} style={{ elevation: 99, zIndex: 99 }} />
    </Provider>
  );
}
