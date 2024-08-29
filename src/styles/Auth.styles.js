import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../constants/Colors";

export const authStyles = {
  container: {
    alignSelf: "center",
    marginTop: hp("8%"),
    flex: 1,
  },

  signUpcontainer: {
    alignSelf: "center",
    flex: 1,
    // marginTop: 60,
    width: 350,
  },
  backIcon: { resizeMode: "cover", height: 20, width: 15, marginTop: 3 },

  containerHeaderBhaipay: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "2%",
    marginBottom: "3%",
    gap: 92,
    width: 320,
  },

  containerHeader: {
    justifyContent: "center",
    marginBottom: "2%",
    flexDirection: "row",
  },

  containerHeaderBhaipay: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "2%",
    marginBottom: "3%",
    gap: 92,
    width: 320,
  },

  marginTop: { marginTop: hp("1%") },
  mainTitle: {
    fontWeight: "700",
    fontSize: hp("2.5%"),
    width: wp("60%"),
    color: "#263238",
    textAlign: "left",
  },
  backIcon: { resizeMode: "cover", height: 20, width: 15, marginTop: 3 },

  gTop: { marginTop: hp("3.4%"), borderColor: "#2ECC71" },
  signUpGTop: { marginTop: hp("2%"), borderColor: "#2ECC71" },

  inputMainContainer: {
    alignItems: "center",
    marginTop: hp("4%"),
    paddingHorizontal: 15,
  },
  signUpInputMainContainer: {
    alignItems: "center",
    // marginTop: hp("1%"),
    paddingHorizontal: 15,
    width: "100%",
  },

  inputSubContainer: { marginTop: hp("2.2%"), width: 320 },

  signUpInputSubContainer: { marginTop: hp("1.5%"), width: "100%" },

  inputLabel: {
    fontSize: hp("1.6%"), // size 14
    fontWeight: "600",
    color: COLORS?.thirdWhiteColor,

    marginBottom: hp("1.5%"),
  },

  signUpInputLabel: {
    fontSize: hp("1.6%"), // size 14
    fontWeight: "600",
    color: "#263238",
    marginBottom: hp("1.5%"),
  },

  countryDropdownLabel: {
    marginTop: 9,
    fontSize: hp("1.6%"), // size 14
    fontWeight: "600",
    color: "#263238",
    marginBottom: hp("1.5%"),
  },

  inputLabel2: {
    fontSize: hp("1.6%"), // size 14
    fontWeight: "600",
    color: "#263238",
    marginBottom: hp("1.5%"),
    marginTop: hp("3.3%"),
  },

  signUpinputLabel2: {
    fontSize: hp("1.6%"), // size 14
    fontWeight: "600",
    color: "#fff",
    marginBottom: hp("1.5%"),
    marginTop: hp("1.9%"),
  },

  forgotPassword: {
    fontSize: hp("1.5%"),
    fontWeight: "600",
    color: "#263238",
    textAlign: "right",
    marginTop: "4%",
    textDecorationLine: "underline",
  },

  img: { alignSelf: "center", marginTop: 30 },

  input: {
    width: "100%",
    borderRadius: 9,
    padding: 10,
    height: 56,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#f1f1f1d9",
    // backfaceVisibility:"visible"
    // borderColor: "#000",
  },

  countryDropdown: {
    width: "100%",
    borderRadius: 9,
    padding: 10,
    height: 56,
    overflow: "hidden",
    elevation: 0.5,
    position: "relative",
  },

  buttonGoogleText: {
    color: "#263238",
    fontSize: hp("1.8%"), //size 16
    fontWeight: "700",
  },

  subTitle: {
    fontSize: hp("1.5%"), // size 12
    marginTop: hp("0.5%"),
    width: wp("80%"),
    textAlign: "left",
    color: "#263238",
    opacity: 0.5,
  },

  buttonStyle: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    height: 50,
    width: "100%",
    zIndex: 99,
    position: "relative",
  },
  buttonStyleReset: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 50,
    width: "100%",
    zIndex: 99,
    position: "relative",
    padding: 0,
  },

  loader: { position: "absolute", right: 100 },

  loaderReset: { position: "absolute", right: 90 },

  buttonText: {
    color: "#fff",
    fontSize: hp("1.9%"),
    fontWeight: "700",
  },

  buttonOrWith: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    height: 33,
    width: 50.31,
    elevation: 0.7,
    overflow: "hidden",
  },

  buttonOrWithText: {
    color: "#263238",
    fontSize: hp("1.9%"),
    fontWeight: "700",
  },

  buttonGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderRadius: 9,
    height: 48,
    width: 48,
    zIndex: 99,
    overflow: "hidden",
  },

  icon: {
    height: hp("3.2%"),
    width: wp("5.7%"),

    marginRight: wp("1%"),
    marginTop: hp("0.1%"),
  },

  connectWalletIcon: {
    height: hp("2.9%"),
    width: wp("5.7%"),

    marginRight: wp("1%"),
    marginTop: hp("0.1%"),
  },

  passwordEye: {
    height: hp("2%"),
    width: wp("4%"),

    position: "absolute",
    right: 6,
    bottom: 9,
  },

  dontHaveAccount: {
    fontSize: hp("1.8%"),
    textAlign: "center",
    marginTop: "4%",
    color: "#ffffff",
    padding: 5,
  },

  footerMarginTop: {
    marginTop: "25%",
  },

  footerMarginTopSignUp: {
    marginTop: "8%",
    width: 320,
  },

  boldHalfText: { fontWeight: "bold", color: "#263238" },

  containerHeader: {
    justifyContent: "center",
    marginBottom: "2%",
    flexDirection: "row",
  },

  cardBhaipayImg: { resizeMode: "cover", height: 28, width: 28 },

  BhaipayImgText: { resizeMode: "cover", height: 10, width: 60, margin: 10 },

  cardBhaipayImgTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2F2D3D",
  },

  rootOtp: { flex: 1, padding: 10, marginTop: "10%" },
  title: { fontSize: 12, marginLeft: "1%" },
  codeFieldRoot: { marginTop: 10 },
  cell: {
    width: 60,
    height: 50,
    lineHeight: 38,
    fontSize: 20,
    textAlign: "center",
    borderRadius: 12,
    padding: 5,
    overflow: "hidden",
    elevation: 0.8,
  },

  textOpt: {
    fontSize: 18,
    textAlign: "center",
    padding: 5,
  },

  /**
   * dropDown
   * */
  dropdown1: {
    borderWidth: 0.5,
    paddingHorizontal: 8,
    marginTop: hp("0.5%"),
    width: 305,
    height: 56,
    padding: 10,
    borderRadius: 12,
    borderColor: "#fff",
    overflow: "hidden",
  },
  icon1: {
    marginRight: 5,
  },

  activeDrop: "#c2c4cf8c",

  label1: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedTextStyle1: {
    fontSize: 14,
    fontWeight: "700",
    color: "grey",
    borderRadius: 12,
    paddingLeft: 6,
  },
  iconStyle1: {
    width: 20,
    height: 20,
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
  },

  itemTextStyle: { color: "grey", fontWeight: "700", fontSize: 14 },

  itemTextStyleProvider: {
    color: "grey",
    fontWeight: "700",
    fontSize: 14,
    height: 30,
  },

  iconStyleDrop: { height: 10, width: 40, padding: 10 },
  dropContainer: {
    borderRadius: 12,
    fontSize: 14,
    fontWeight: "700",
  },

  /**
   * otp main
   * */
  rootOtp: { flex: 1, padding: 10, marginTop: "10%" },
  title: { fontSize: 12, marginLeft: "1%" },
  codeFieldRoot: { marginTop: 10 },
  cell: {
    width: 60,
    height: 50,
    lineHeight: 38,
    fontSize: 20,
    textAlign: "center",
    borderRadius: 12,
    padding: 5,
    overflow: "hidden",
    elevation: 0.8,
  },

  textOpt: {
    fontSize: 18,
    textAlign: "center",
    padding: 5,
  },
};
