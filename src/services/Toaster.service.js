import Toast from "react-native-toast-message";

export const toastError = (message) => {
  return Toast.show({
    type: "error",
    text1: message,
  });
};

export const toastSuccess = (message) => {
  return Toast.show({
    type: "success",
    text1: message,
  });
};
