import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { GradientHOC } from "../HOC/Gradient";
import {
  addAttendanceAPI,
  getAttendanceAPI,
} from "../services/Attendace.service";

const Home = () => {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await getAttendanceAPI();
      console.log("response:getAttendanceAPI ", response);

      const dates = response?.reduce((acc, attendance) => {
        const date = moment(attendance.date).format("YYYY-MM-DD");
        acc[date] = {
          marked: true,
          dotColor: attendance.status === "CheckIn" ? "green" : "red",
        };
        return acc;
      }, {});
      console.log("dates: ", dates);

      setMarkedDates(dates);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const markAttendance = async (day) => {
    const status = "CheckIn"; // or 'CheckOut'
    const type = "Present"; // or 'Absent', 'Leave'

    try {
      const response = await addAttendanceAPI({
        status,
        type,
        date: day.dateString,
      });

      setMarkedDates({
        ...markedDates,
        [day.dateString]: { marked: true, dotColor: "green" },
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  const currentDateString = moment().format("YYYY-MM-DD");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mark Attendance</Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={markAttendance}
        minDate={currentDateString}
        maxDate={currentDateString}
        disableAllTouchEventsForDisabledDays={true}
        theme={{
          todayTextColor: "blue",
          dayTextColor: "black",
          arrowColor: "blue",
          monthTextColor: "black",
          textDayFontWeight: "500",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "500",
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
        hideExtraDays={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#fff",
  },
});

export default GradientHOC(Home);
