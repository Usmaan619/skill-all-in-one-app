import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React, { Component, useEffect, useState } from "react";
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
import {
  getAllAttendanceAPI,
  markAttendanceAPI,
} from "../services/Auth.service";
import { getData } from "../services/Storage.service";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { toastSuccess } from "../services/Toaster.service";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/actions/loader.action";
const EmployeeHome = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 2;

  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const [frontImage, setFrontImage] = React.useState("");

  const [attendenceData, setAttendenceData] = React.useState();

  React.useEffect(() => {
    new Promise(async (resolve, reject) => {
      await getAllAttendance();
      resolve(1);
    });
  }, []);

  const getAllAttendance = async () => {
    try {
      dispatch(SetLoader("loader", true));
      const data = await getAllAttendanceAPI();

      setAttendenceData(data);
      setTimeout(() => {
        dispatch(SetLoader("loader", false));
      }, 1000);
    } catch (error) {
      dispatch(SetLoader("loader", false));
    }
  };

  const uploadImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
        base64: true,
        cameraType: "front",
      });

      setFrontImage(result?.assets[0]?.uri);
      const frontImg = result?.assets[0]?.base64;

      // api
      dispatch(SetLoader("loader", true));
      console.log("result: ", result);
      if (!result) return dispatch(SetLoader("loader", false));

      const res = await markAttendance({
        employee_id: Number(await getData("employeeId")),
        profile_img: result?.assets[0]?.base64,
        present: "true",
      });

      if (res?.success) {
        dispatch(SetLoader("loader", false));

        await getAllAttendance();
        toastSuccess(res?.message);
      }
    } catch (error) {
      dispatch(SetLoader("loader", true));
    }
  };

  const markAttendance = async (payload) => await markAttendanceAPI(payload);

  // Function to generate all dates in a month
  const getDaysInMonth = (month, year) => {
    const date = moment()?.year(year)?.month(month)?.startOf("month");
    const days = [];
    const endOfMonth = moment(date).endOf("month");

    while (date?.isBefore(endOfMonth) || date?.isSame(endOfMonth, "day")) {
      days?.push(date.clone());
      date?.add(1, "day");
    }
    return days;
  };

  const month = moment().month(); // September (months are 0-indexed in JS Date)
  const year = moment()?.year();
  const daysInMonth = getDaysInMonth(month, year);

  return (
    <ScrollView
      className="h-screen "
      style={{ backgroundColor: COLORS?.secBlackColor }}
    >
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
                Date
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

            {daysInMonth?.map((date, i) => {
              const currentAttendance = attendenceData?.find((a) =>
                moment(a?.attendance_date).isSame(date, "day")
              );

              const isPastDate = moment(date).isBefore(moment(), "day");
              const isFutureDate = moment(date).isAfter(moment(), "day");
              return (
                <DataTable.Row style={styles.databeBox} key={i}>
                  <DataTable.Cell>{date?.format("YYYY-MM-DD")}</DataTable.Cell>
                  <DataTable.Cell>
                    {currentAttendance?.present === "true" ? (
                      <FontAwesome name="check" size={24} color="green" />
                    ) : (
                      ""
                      // <Entypo name="cross" size={24} color="red" />
                    )}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Button
                      buttonColor={COLORS?.mainCamelColor}
                      textColor={COLORS?.thirdWhiteColor}
                      icon="camera"
                      mode="elevated"
                      disabled={
                        currentAttendance?.present === "true" ||
                        isPastDate ||
                        isFutureDate
                      }
                      onPress={async () => await uploadImage()}
                    >
                      Verify
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </Card>
      </View>
    </ScrollView>
    // pgadmin4 for linux
    // deaver for linux
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
    // margin: 15,
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginTop: 15,
    marginBottom: "17%",
  },
  databeBox: {
    margin: 10,
    // marginHorizontal: 10,
    // marginTop:10,
    // marginBottom:20,
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
