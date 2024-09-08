import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Appbar, Card, DataTable, Button } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import {
  getAllEmployeeAPI,
  getEmployeeByIdAPI,
  getFilteredAttendanceAPI,
} from "../../services/Auth.service";
import { COLORS } from "../../constants/Colors";
import { SetLoader } from "../../redux/actions/loader.action";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import { calculateTimeDifference } from "../../utils/Helper";
const AdminHome = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const itemsPerPage = 2;

  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const [employeeData, setEmployeeData] = React.useState();
  const [singleEmployeeData, setSingleEmployeeData] = React.useState([]);

  React.useEffect(() => {
    new Promise(async (resolve, reject) => {
      await getAllEmployee();

      resolve(1);
    });
  }, []);

  const getAllEmployee = async () => {
    try {
      dispatch(SetLoader("loader", true));
      const data = await getAllEmployeeAPI();
      console.log("data: ", data);

      setEmployeeData(data?.employees);

      setTimeout(() => {
        dispatch(SetLoader("loader", false));
      }, 1000);
    } catch (error) {
      dispatch(SetLoader("loader", false));
    }
  };
  console.log("employeeData: ", employeeData);

  const toggleModal = () => setModalVisible(!modalVisible);

  const getEmployeeById = async (e) => {
    toggleModal();
    console.log("e?.id: ", e?.id);
    try {
      const res = await getEmployeeByIdAPI(e?.id);
      if (res) setSingleEmployeeData(res);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  console.log("singleEmployeeData: ", singleEmployeeData);

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const years = [
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
  ];

  console.log("employeeData: ", employeeData);

  const fetchAttendanceData = async () => {
    if (!selectedMonth && !selectedYear)
      return Alert.alert("Error", "Please select both month and year");

    try {
      dispatch(SetLoader("loader", true));
      // singleEmployeeData?.id;
      const res = await getFilteredAttendanceAPI(
        selectedYear,
        selectedMonth,
        singleEmployeeData?.id
      );
      console.log("res: ", res);
      console.log("res:getFilteredAttendanceAPI ", res);
      setTimeout(() => {
        dispatch(SetLoader("loader", false));
      }, 1000);
      if (!res?.length) return Alert.alert("Attendance record not found!");
      setAttendanceData(res);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      dispatch(SetLoader("loader", false));
    }
  };
  console.log(
    "attendanceDatasssssssssssssssssssssssssssssss: ",
    attendanceData
  );

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
                Name
              </DataTable.Title>

              <DataTable.Title
                textStyle={{ color: COLORS?.secBlackColor, fontSize: 14 }}
              >
                Actions
              </DataTable.Title>
            </DataTable.Header>
            {employeeData?.map((e, i) => (
              <DataTable.Row style={styles.databeBox} key={i}>
                <DataTable.Cell>{e?.first_name}</DataTable.Cell>

                <DataTable.Cell>
                  <Button
                    buttonColor={COLORS?.mainCamelColor}
                    textColor={COLORS?.thirdWhiteColor}
                    mode="elevated"
                    onPress={async () => await getEmployeeById(e)}
                  >
                    View
                  </Button>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    buttonColor={COLORS?.mainCamelColor}
                    textColor={COLORS?.thirdWhiteColor}
                    mode="elevated"
                    // onPress={async () => await uploadImage()}
                  >
                    Edit
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card>
      </View>

      {/* Modal start*/}
      <Modal
        visible={modalVisible}
        // onRequestClose={netinfo.isConnected}
        animationType="fade"
        transparent={true}
        // onDismiss={() => setModalVisible(!modalVisible)}
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.box_1}>
              <TouchableOpacity
                onPress={() => toggleModal()}
                className="flex-row justify-end"
              >
                <Entypo name="cross" size={30} color="red" />
              </TouchableOpacity>
              <Text className="text-center font-medium text-base ">
                Emloyee Details
              </Text>
              <View className="mt-8">
                <FlatList
                  data={[singleEmployeeData]}
                  renderItem={({ item }) => {
                    console.log("item: ", item);
                    return (
                      <View className="flex-1  gap-4">
                        <View className="flex-row justify-between px-2 ">
                          <Text className="font-medium">User Name:</Text>
                          <Text className="font-medium">{item?.user_name}</Text>
                        </View>
                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">First name:</Text>
                          <Text className="font-medium">
                            {item?.first_name}
                          </Text>
                        </View>

                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">Last Name:</Text>
                          <Text className="font-medium">{item?.last_name}</Text>
                        </View>
                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">Email ID:</Text>
                          <Text className="font-medium">{item?.email}</Text>
                        </View>
                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">Mobile Number:</Text>
                          <Text className="font-medium">
                            {item?.mobile_number}
                          </Text>
                        </View>

                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">department:</Text>
                          <Text className="font-medium">
                            {item?.department}
                          </Text>
                        </View>
                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">Position:</Text>
                          <Text className="font-medium">{item?.position}</Text>
                        </View>

                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">Last Hike Amount:</Text>
                          <Text className="font-medium">
                            {item?.last_hike_amount}
                          </Text>
                        </View>

                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">Last Hike Date:</Text>
                          <Text className="font-medium">
                            {moment(item?.last_hike_date).format("DD-MM-YYYY")}
                          </Text>
                        </View>

                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">Current Salary:</Text>
                          <Text className="font-medium">
                            {item?.current_salary}
                          </Text>
                        </View>
                        <View className="flex-row justify-between px-2">
                          <Text className="font-medium">Date of Join:</Text>
                          <Text className="font-medium">
                            {moment(item?.date_of_join).format("DD-MM-YYYY")}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
              {/* dropdown */}
              <View>
                <Text className="text-center font-medium text-base my-5">
                  Attendence
                </Text>

                {/*  */}
                <View style={styles.containerDrop}>
                  <Text style={styles.labelDrop}>Select Month</Text>
                  <RNPickerSelect
                    onValueChange={(value) => setSelectedMonth(value)}
                    items={months}
                    placeholder={{ label: "Select Month", value: null }}
                    style={pickerSelectStyles}
                  />
                  <Text style={styles.labelDrop}>Select Year</Text>
                  <RNPickerSelect
                    onValueChange={(value) => setSelectedYear(value)}
                    items={years}
                    placeholder={{ label: "Select Year", value: null }}
                    style={pickerSelectStyles}
                  />

                  <Button
                    buttonColor={COLORS?.mainCamelColor}
                    textColor={COLORS?.thirdWhiteColor}
                    mode="elevated"
                    onPress={async () => await fetchAttendanceData()}
                  >
                    Submit
                  </Button>
                </View>
              </View>

              {attendanceData && (
                <View style={styles.results}>
                  <Text style={styles.resultText}>Attendance records:</Text>
                  {attendanceData.map((item, index) => (
                    <Text key={index} style={styles.resultText}>
                      {moment(item.attendance_date).format("DD-MM-YYYY")}:{" "}
                      {item.present ? "Present" : "Absent"}{" "}
                      {item?.time_in || item?.time_out
                        ? calculateTimeDifference(item?.time_in, item?.time_out)
                        : ""}
                    </Text>
                  ))}
                  <Text>
                    Total AT {attendanceData[0]?.total_monthly_attendance}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* Modal end */}
    </ScrollView>
    // pgadmin4 for linux
    // deaver for linux
  );
};

const styles = StyleSheet.create({
  results: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
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
  // Modalclass

  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box_1: {
    width: "90%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    padding: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
  },
  text: {
    width: 200,
    marginBottom: 20,
    textAlign: "center",
  },
  box_2: {
    height: 45,
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  try_again: {
    color: "#fff",
  },
  colorsBtn: ["#4c54d285", "#806bff"],
  buttonStyle: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 50,
    width: "100%",
    zIndex: 99,
    position: "relative",
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("1.9%"),
    fontWeight: "700",
  },
  netIcon: { resizeMode: "cover", height: 65, width: 65 },

  containerDrop: {
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  labelDrop: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 4,
    color: "#495057",
    backgroundColor: "#fff",
    paddingRight: 30, // to ensure the text is not behind the icon
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 4,
    color: "#495057",
    backgroundColor: "#fff",
    paddingRight: 30, // to ensure the text is not behind the icon
    marginBottom: 16,
  },
  placeholder: {
    color: "#6c757d",
  },
});
export default AdminHome;
