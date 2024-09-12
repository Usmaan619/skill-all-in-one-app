// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AuthRoute from "./src/Routes/Auth.route";
import store from "./src/redux/stores/store";
import Toast from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar animated={true} backgroundColor="#000" style={"auto"} />
        <NavigationContainer independent={true}>
          <AuthRoute />
        </NavigationContainer>
      </PaperProvider>
      <Toast topOffset={45} style={{ elevation: 99, zIndex: 99 }} />
    </Provider>
  );
}
