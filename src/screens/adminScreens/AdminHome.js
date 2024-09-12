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
import {
  Appbar,
  Card,
  DataTable,
  Button,
  TextInput,
  Icon,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import {
  getAllEmployeeAPI,
  getEmployeeByIdAPI,
  getFilteredAttendanceAPI,
  updateEmployeeAPI,
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
import { Formik } from "formik";
import { DatePickerModal } from "react-native-paper-dates";

import { en, registerTranslation } from "react-native-paper-dates";
import { toastSuccess } from "../../services/Toaster.service";

// Register the translation for the language you're using (English in this case)
registerTranslation("en", en);
const AdminHome = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibleEdits, setModalVisibleEdits] = React.useState(false);

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

      setEmployeeData(data?.employees);

      setTimeout(() => {
        dispatch(SetLoader("loader", false));
      }, 1000);
    } catch (error) {
      dispatch(SetLoader("loader", false));
    }
  };

  const toggleModal = () => {
    setAttendanceData(null);
    setSingleEmployeeData([]);
    setModalVisible(!modalVisible);
  };
  const toggleEditModal = () => setModalVisibleEdits(!modalVisibleEdits);

  const getEmployeeById = async (e) => {
    toggleModal();

    try {
      const res = await getEmployeeByIdAPI(e?.id);
      if (res) setSingleEmployeeData(res);
    } catch (error) {}
  };

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

      setTimeout(() => {
        dispatch(SetLoader("loader", false));
      }, 1000);
      if (!res?.length) return Alert.alert("Attendance record not found!");
      setAttendanceData(res);
    } catch (error) {
      dispatch(SetLoader("loader", false));
    }
  };

  React.useEffect(() => {}, [singleEmployeeData]);

  const editEmployee = async (e) => {
    toggleEditModal();
    setSingleEmployeeData(e);
  };

  const handleEditEmployee = async (value) => {
    try {
      const payload = checkForm(singleEmployeeData, value);

      dispatch(SetLoader("loader", true));
      // singleEmployeeData?.id;
      const res = await updateEmployeeAPI(singleEmployeeData?.id, payload);

      if (!res.success) return dispatch(SetLoader("loader", false));

      if (res.success) {
        toggleEditModal();
        setTimeout(() => {
          dispatch(SetLoader("loader", false));
          toastSuccess(res?.message);
        }, 1000);
      }
    } catch (error) {
      dispatch(SetLoader("loader", false));
    }
  };

  const checkForm = (singleEmployeeData, value) => {
    const updatedValue = { ...value }; // Copy the value object

    // Check for each field individually and update if necessary

    if (singleEmployeeData?.user_name !== updatedValue?.user_name) {
      updatedValue.user_name = updatedValue?.user_name;
    }

    if (singleEmployeeData?.first_name !== updatedValue?.first_name) {
      updatedValue.first_name = updatedValue?.first_name;
    }

    if (singleEmployeeData?.last_name !== updatedValue?.last_name) {
      updatedValue.last_name = updatedValue?.last_name;
    }

    if (singleEmployeeData?.email !== updatedValue?.email) {
      updatedValue.email = updatedValue?.email;
    }

    if (singleEmployeeData?.mobile_number !== updatedValue?.mobile_number) {
      updatedValue.mobile_number = Number(updatedValue?.mobile_number);
    }

    if (singleEmployeeData?.department !== updatedValue?.department) {
      updatedValue.department = updatedValue?.department;
    }

    if (singleEmployeeData?.position !== updatedValue?.position) {
      updatedValue.position = updatedValue?.position;
    }

    if (
      singleEmployeeData?.last_hike_amount !== updatedValue?.last_hike_amount
    ) {
      updatedValue.last_hike_amount = Number(updatedValue?.last_hike_amount);
    }

    if (singleEmployeeData?.last_hike_date !== updatedValue?.last_hike_date) {
      updatedValue.last_hike_date = moment(
        updatedValue?.last_hike_date,
        "DD-MM-YYYY"
      ).format("YYYY-MM-DD");
    }

    if (singleEmployeeData?.current_salary !== updatedValue?.current_salary) {
      updatedValue.current_salary = Number(updatedValue?.current_salary);
    }

    if (singleEmployeeData?.date_of_join !== updatedValue?.date_of_join) {
      updatedValue.date_of_join = moment(
        updatedValue?.date_of_join,
        "DD-MM-YYYY"
      ).format("YYYY-MM-DD");
    }

    if (singleEmployeeData?.passwd !== updatedValue?.passwd) {
      updatedValue.passwd = updatedValue?.passwd;
    }

    if (singleEmployeeData?.address !== updatedValue?.address) {
      updatedValue.address = updatedValue?.address;
    }

    return updatedValue;
  };

  let formikFn;

  const [openLastHikeDate, setOpenLastHikeDate] = useState(false);
  const [openDateOfJoin, setOpenDateOfJoin] = useState(false);

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
                    onPress={async () => {
                      await editEmployee(e);
                    }}
                  >
                    Edit
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card>
      </View>

      {/* Modal start View*/}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.box_1}>
              <TouchableOpacity
                onPress={() => toggleModal()}
                className="flex-row justify-end"
              >
                <Entypo name="cross" size={30} color="red" />
              </TouchableOpacity>
              <Text className="text-center font-medium text-base">
                Employee Details
              </Text>

              <View className="mt-8">
                <View className="flex-1 gap-4">
                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">User Name:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.user_name}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">First Name:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.first_name}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Last Name:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.last_name}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Email ID:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.email}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Mobile Number:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.mobile_number}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Department:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.department}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Position:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.position}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Last Hike Amount:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.last_hike_amount}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Last Hike Date:</Text>
                    <Text className="font-medium">
                      {moment(singleEmployeeData?.last_hike_date).format(
                        "DD-MM-YYYY"
                      )}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Current Salary:</Text>
                    <Text className="font-medium">
                      {singleEmployeeData?.current_salary}
                    </Text>
                  </View>

                  <View className="flex-row justify-between px-2">
                    <Text className="font-medium">Date of Join:</Text>
                    <Text className="font-medium">
                      {moment(singleEmployeeData?.date_of_join).format(
                        "DD-MM-YYYY"
                      )}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Dropdown */}
              <View>
                <Text className="text-center font-medium text-base my-5">
                  Attendance
                </Text>
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
                <View style={styles.attendanceContainer}>
                  <Text style={styles.heading}>Attendance Records</Text>

                  {attendanceData.map((item, index) => (
                    <Card key={index} style={styles.card}>
                      <Card.Content>
                        <View style={styles.recordRow}>
                          <Text style={styles.dateText}>
                            {moment(item.attendance_date).format("DD-MM-YYYY")}
                          </Text>
                          <View style={styles.statusContainer}>
                            <Icon
                              name={
                                item.present ? "check-circle" : "close-circle"
                              }
                              size={20}
                              color={item.present ? "green" : "red"}
                            />
                            <Text
                              style={[
                                styles.statusText,
                                { color: item.present ? "green" : "red" },
                              ]}
                            >
                              {item.present ? "Present" : "Absent"}
                            </Text>
                          </View>
                        </View>

                        {(item?.time_in || item?.time_out) && (
                          <View style={styles.timeContainer}>
                            <Text style={styles.timeLabel}>Time In:</Text>
                            <Text style={styles.timeText}>
                              {item.time_in || "N/A"}
                            </Text>
                          </View>
                        )}

                        {(item?.time_in || item?.time_out) && (
                          <View style={styles.timeContainer}>
                            <Text style={styles.timeLabel}>Time Out:</Text>
                            <Text style={styles.timeText}>
                              {item.time_out || "N/A"}
                            </Text>
                          </View>
                        )}

                        {(item?.time_in || item?.time_out) &&
                          calculateTimeDifference(
                            item?.time_in,
                            item?.time_out
                          ) && (
                            <Text style={styles.durationText}>
                              Duration:{" "}
                              {calculateTimeDifference(
                                item?.time_in,
                                item?.time_out
                              )}
                            </Text>
                          )}
                      </Card.Content>
                    </Card>
                  ))}

                  <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>
                      Total Attendance:{" "}
                      {attendanceData[0]?.total_monthly_attendance}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* Modal view end */}

      {/* Modal Edit View */}
      <Modal
        visible={modalVisibleEdits}
        animationType="fade"
        transparent={true}
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.box_1}>
              <TouchableOpacity
                onPress={() => toggleEditModal()}
                className="flex-row justify-end"
              >
                <Entypo name="cross" size={30} color="red" />
              </TouchableOpacity>
              <Text className="text-center font-medium text-base ">
                Edit Emloyee Details
              </Text>
              <View className="mt-8 h-auto">
                <Formik
                  initialValues={{
                    user_name: singleEmployeeData?.user_name,
                    first_name: singleEmployeeData?.first_name,
                    last_name: singleEmployeeData?.last_name,
                    email: singleEmployeeData?.email,
                    mobile_number: String(singleEmployeeData?.mobile_number),
                    department: singleEmployeeData?.department,
                    position: singleEmployeeData?.position,
                    last_hike_amount: String(
                      singleEmployeeData?.last_hike_amount
                    ),
                    last_hike_date: moment(
                      singleEmployeeData?.last_hike_date
                    ).format("DD-MM-YYYY"),
                    current_salary: String(singleEmployeeData?.current_salary),
                    date_of_join: moment(
                      singleEmployeeData?.date_of_join
                    ).format("DD-MM-YYYY"),
                    passwd: "",
                    address: singleEmployeeData?.address,
                  }}
                  onSubmit={handleEditEmployee}
                >
                  {(formikProps) => {
                    const {
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      values,
                      errors,
                      isValid,
                      touched,
                    } = formikProps;
                    return (
                      <>
                        <View className="flex-1 gap-4">
                          {/* User Name */}
                          <View className="px-2">
                            <Text className="font-medium">User Name:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("user_name")}
                              onBlur={handleBlur("user_name")}
                              value={values.user_name}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* First Name */}
                          <View className="px-2">
                            <Text className="font-medium">First Name:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("first_name")}
                              onBlur={handleBlur("first_name")}
                              value={values.first_name}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Last Name */}
                          <View className="px-2">
                            <Text className="font-medium">Last Name:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("last_name")}
                              onBlur={handleBlur("last_name")}
                              value={values.last_name}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Email */}
                          <View className="px-2">
                            <Text className="font-medium">Email ID:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("email")}
                              onBlur={handleBlur("email")}
                              value={values.email}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Mobile Number */}
                          <View className="px-2">
                            <Text className="font-medium">Mobile Number:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("mobile_number")}
                              onBlur={handleBlur("mobile_number")}
                              value={String(values.mobile_number)}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Department */}
                          <View className="px-2">
                            <Text className="font-medium">Department:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("department")}
                              onBlur={handleBlur("department")}
                              value={values?.department}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Address */}
                          <View className="px-2">
                            <Text className="font-medium">Address:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("address")}
                              onBlur={handleBlur("address")}
                              value={values?.address}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Position */}
                          <View className="px-2">
                            <Text className="font-medium">Position:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("position")}
                              onBlur={handleBlur("position")}
                              value={values?.position}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Last Hike Amount */}
                          <View className="px-2">
                            <Text className="font-medium">
                              Last Hike Amount:
                            </Text>
                            <TextInput
                              keyboardType="numeric"
                              mode="outlined"
                              onChangeText={handleChange("last_hike_amount")}
                              onBlur={handleBlur("last_hike_amount")}
                              value={String(values?.last_hike_amount)}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Last Hike Date */}
                          <View className="px-2">
                            <Text className="font-medium">Last Hike Date:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("last_hike_date")}
                              onBlur={handleBlur("last_hike_date")}
                              value={values?.last_hike_date}
                              onPressIn={() => setOpenLastHikeDate(true)}
                              style={{ width: "100%", height: 40 }}
                            />
                            <DatePickerModal
                              locale="en"
                              mode="single"
                              visible={openLastHikeDate}
                              date={moment(
                                values.last_hike_date,
                                "YYYY-MM-DD"
                              ).toDate()}
                              onDismiss={() => setOpenLastHikeDate(false)}
                              onConfirm={(params) => {
                                const selectedDate = params.date;
                                if (selectedDate) {
                                  setFieldValue(
                                    "last_hike_date",
                                    moment(selectedDate).format("YYYY-MM-DD")
                                  );
                                }
                                setOpenLastHikeDate(false);
                              }}
                            />
                          </View>

                          {/* Current Salary */}
                          <View className="px-2">
                            <Text className="font-medium">Current Salary:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("current_salary")}
                              onBlur={handleBlur("current_salary")}
                              value={String(values?.current_salary)}
                              keyboardType="numeric"
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>

                          {/* Date of Join */}
                          <View className="px-2">
                            <Text className="font-medium">Date of Join:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("date_of_join")}
                              onBlur={handleBlur("date_of_join")}
                              value={values?.date_of_join}
                              onPressIn={() => setOpenDateOfJoin(true)}
                              style={{ width: "100%", height: 40 }}
                            />
                            <DatePickerModal
                              locale="en"
                              mode="single"
                              visible={openDateOfJoin}
                              date={moment(
                                values.date_of_join,
                                "YYYY-MM-DD"
                              ).toDate()}
                              onDismiss={() => setOpenDateOfJoin(false)}
                              onConfirm={(params) => {
                                const selectedDate = params.date;
                                if (selectedDate) {
                                  setFieldValue(
                                    "date_of_join",
                                    moment(selectedDate).format("YYYY-MM-DD")
                                  );
                                }
                                setOpenDateOfJoin(false);
                              }}
                            />
                          </View>

                          {/* Password */}
                          <View className="px-2 ">
                            <Text className="font-medium">Password:</Text>
                            <TextInput
                              mode="outlined"
                              onChangeText={handleChange("passwd")}
                              onBlur={handleBlur("passwd")}
                              value={values?.passwd}
                              style={{ width: "100%", height: 40 }}
                            />
                          </View>
                        </View>

                        {/* Submit Button */}
                        <Button
                          className="mt-6 mb-5"
                          buttonColor={COLORS?.mainCamelColor}
                          textColor={COLORS?.thirdWhiteColor}
                          mode="elevated"
                          onPress={handleSubmit}
                        >
                          Submit
                        </Button>
                      </>
                    );
                  }}
                </Formik>
              </View>

              {/* dropdown */}
            </View>
          </View>
        </ScrollView>
      </Modal>
      {/*Modal edit end */}
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

  // attendance
  attendanceContainer: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  recordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
  },
  timeText: {
    fontSize: 14,
    color: "#333",
  },
  durationText: {
    marginTop: 5,
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
  },
  totalContainer: {
    marginTop: 20,
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 8,
    elevation: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
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
