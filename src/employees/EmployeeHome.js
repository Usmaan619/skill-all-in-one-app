import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React, { Component } from "react";
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
  Button,
} from "react-native-paper";
import { COLORS } from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
const EmployeeHome = () => {
  const itemsPerPage = 2;

  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const [frontImage, setFrontImage] = React.useState("");

  const uploadImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      setFrontImage(result?.assets[0]?.uri);
      const frontImg = result?.assets[0]?.base64;
      console.log("frontImg: ", frontImg);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <View className="h-full" style={{ backgroundColor: COLORS?.secBlackColor }}>
      <Appbar.Header style={{ backgroundColor: COLORS?.secBlackColor }}>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content
          title="Home"
          titleStyle={{ color: COLORS?.mainCamelColor, fontWeight: "700" }}
        />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        {/* <Appbar.Action  icon="dots-vertical" onPress={_handleMore} /> */}
      </Appbar.Header>
      <View style={styles.mainbox}>
        <Card>
          <DataTable>
            <DataTable.Header style={styles.databeHeader}>
              <DataTable.Title
                textStyle={{ color: COLORS?.secBlackColor, fontSize: 14 }}
              >
                Name
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: COLORS?.secBlackColor, fontSize: 14 }}
              >
                Verified
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: COLORS?.secBlackColor, fontSize: 14 }}
              >
                Mark Attendence
              </DataTable.Title>
            </DataTable.Header>
            {/* {data.map((l, i) => ( */}
            <DataTable.Row style={styles.databeBox}>
              <DataTable.Cell>Usman</DataTable.Cell>
              <DataTable.Cell>Test</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  icon="camera"
                  mode="contained-tonal"
                  onPress={async () => await uploadImage()}
                >
                  Verify
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
            {/* ))} */}
          </DataTable>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 10,
    fontSize: 15,
    fontSize: 35,
  },
  mainbox: {
    textAlign: "center",
    margin: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  databeBox: {
    margin: 10,
    textAlign: "center",
  },
  databeHeader: {
    marginVertical: 10,
    textAlign: "left",
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
export default EmployeeHome;
