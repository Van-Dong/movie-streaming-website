import * as yup from "yup";

// login validation
export const loginValidation = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .trim()
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

// register validation
export const registerValidation = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup.string().email().trim(),
  password: yup
    .string()
    .required("Password is required")
    .trim()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .trim()
    .oneOf([yup.ref("password")], "Password must match"),
});
