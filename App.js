// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AuthRoute from "./src/Routes/Auth.route";
import store from "./src/redux/stores/store";
import Toast from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";
import { Image, StatusBar, TouchableOpacity } from "react-native";
import { ICONS } from "./src/constants/Constant";
import { Linking } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar animated={true} backgroundColor="#000" />
        <NavigationContainer independent={true}>
          <AuthRoute />
          {/* WhatsApp */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://api.whatsapp.com/send/?phone=919244276667&text=Hello&type=phone_number&app_absent=0"
              );
            }}
            style={{
              position: "absolute",
              bottom: 20,
              right: 15,
              zIndex: 30,
              height: 48,
              width: 48,
            }}
          >
            <Image
              source={ICONS?.whatsappImg}
              style={{ height: "100%", width: "100%" }}
            />
          </TouchableOpacity>
          {/* WhatsApp end */}
        </NavigationContainer>
        <Toast
          topOffset={45}
          visibilityTime={1000}
          style={{ elevation: 99, zIndex: 99 }}
        />
      </PaperProvider>
    </Provider>
  );
}
