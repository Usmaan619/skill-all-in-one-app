// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AuthRoute from "./src/Routes/Auth.route";
import store from "./src/redux/stores/store";
import Toast from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";
import CollapsibleViewComponent from "./src/components/CollapsibleView.component";

export default function App() {
  const [headerScroll, setHeaderScroll] = React.useState(false);

  const onScroll = (event) => {
    console.log("event: ", event);
    if (event?.nativeEvent?.contentOffset?.y > 50) {
      setHeaderScroll(true);
    } else {
      setHeaderScroll(false);
    }
  };
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer independent={true} >
          {/* <CollapsibleViewComponent
            className="fixed top-0 left-0 right-0 "
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              width: "100%",
            }}
          /> */}
          <AuthRoute />
        </NavigationContainer>
        <Toast topOffset={55} style={{ elevation: 99, zIndex: 99 }} />
      </PaperProvider>
    </Provider>
  );
}
