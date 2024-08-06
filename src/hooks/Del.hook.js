import { Text } from "react-native";

const Del = (props) => (
  <Text
    style={{
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
    }}
  >
    {props?.children}
  </Text>
);

export default Del;
