import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (err) {
    return err;
  }
};

export const getData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    return err;
  }
};

export const removeData = async (key) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    return error;
  }
};

export const multiSet = async (keys) => {
  try {
    return await AsyncStorage.multiSet(keys);
  } catch (error) {
    return error;
  }
};

export const multiGet = async (keys) => {
  try {
    return await AsyncStorage.multiGet(keys);
  } catch (error) {
    return error;
  }
};

export const multiRemove = async (keys) => {
  try {
    return await AsyncStorage.multiRemove(keys);
  } catch (error) {
    return error;
  }
};

export const clearStorage = async (key) => {
  try {
    return await AsyncStorage.clear();
  } catch (error) {
    return error;
  }
};
