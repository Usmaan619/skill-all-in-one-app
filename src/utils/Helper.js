import * as yup from "yup";
import { setHeaderScroll } from "../redux/actions/action";

export const loginSvc = (data, values) => {
  return data.find((u) => {
    return values.email == u.email && values.password == u.password;
  });
};

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(dataurl),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const atob = (dataurl) => {
  let str = dataurl.replace(/=+$/, "");
  let output = "";

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = dataurl.indexOf(buffer);
  }

  return output;
};

export const signUpValidationSchema = yup.object().shape({
  /**
   * this code is required for future
   * */

  name: yup
    .string()
    .matches(/(\w.+\s).+/, "Enter at least 2 names")
    .required("Full name is required"),
  // phoneNumber: yup
  //   .string()
  //   .matches(
  //     /^(?:(?:\+|0{0,2})91(?:(?:\s*[\-]\s*)?(?:\d{3})(?:\s*[\-]\s*)?(?:\d{3})(?:\s*[\-]\s*)?(?:\d{4}))|(?:(?:\d{2})(?:\s*[\-]\s*)?(?:\d{4})(?:\s*[\-]\s*)?(?:\d{4})))$/,
  //     "Enter a valid phone number"
  //   )
  //   .required("Phone number is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  Confpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

export const loginValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(
      /^(?:(?:\+|0{0,2})91(?:(?:\s*[\-]\s*)?(?:\d{3})(?:\s*[\-]\s*)?(?:\d{3})(?:\s*[\-]\s*)?(?:\d{4}))|(?:(?:\d{2})(?:\s*[\-]\s*)?(?:\d{4})(?:\s*[\-]\s*)?(?:\d{4})))$/,
      "Enter a valid phone number"
    )
    .required("Phone number is required"),
  /**
   * this code is required for future
   * */
  // password: yup
  //   .string()
  //   .min(8, ({min}) => `Password must be at least ${min} characters`)
  //   .required('Password is required'),
});

export const sendOtpToEmailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
});

export const updateNewPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

export const nftsEmailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
});

export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

export const checkoutValidationSchema = yup.object().shape({
  additional: yup
    .string()
    .max(250, "Additional information cannot be longer than 250 characters"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters long")
    .max(100, "Address cannot be longer than 100 characters"),

  date: yup
    .date()
    .required("Date is required")
    .typeError("Invalid date format"),

  email: yup.string().email("Invalid email"),
  // required("Email is required"),

  landmark: yup
    .string()
    .max(100, "Landmark cannot be longer than 100 characters"),

  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot be longer than 50 characters"),

  number: yup
    .string()
    .matches(/^\d{10}$/, "Number must be exactly 10 digits")
    .required("Number is required"),

  // paymentMethod: yup
  //   .string()
  //   .required("Payment Method is required")
  //   .oneOf(
  //     ["Credit Card", "Debit Card", "Cash", "UPI"],
  //     "Invalid payment method"
  //   ),

  time: yup
    .string()
    // .required("Time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:mm format"),

  zipcode: yup
    .string()
    .required("Zip code is required")
    .matches(/^\d{6}$/, "Zip code must be exactly 6 digits")
    .oneOf(
      [
        "451010",
        "452001",
        "452002",
        "452003",
        "452004",
        "452005",
        "452006",
        "452007",
        "452008",
        "452009",
        "452010",
        "452011",
        "452012",
        "452013",
        "452014",
        "452015",
        "452016",
        "452018",
        "452020",
        "453111",
        "453112",
        "453331",
        "453332",
        "453555",
        "453556",
        "453771",
        "456015",
      ],
      "Invalid zip code"
    ),
});

export const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);
};

// export const onScrollChange = (event) =>
//   event?.nativeEvent?.contentOffset?.y > 650 ? true : false;

export const onScrollChange = (event, dispatch) =>
  dispatch(
    setHeaderScroll(event?.nativeEvent?.contentOffset?.y > 650 ? true : false)
  );
