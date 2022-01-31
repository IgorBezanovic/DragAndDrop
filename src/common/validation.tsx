import * as yup from "yup";

export const loginValidationSchema = yup.object({
  username: yup.string()
    .required("Name is required"),
  password: yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/\d+/g, "Password must have minimum one number.")
    .required("Password is required"),
});
