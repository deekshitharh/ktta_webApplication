//form schema for passwod channge in fogot password.js componet
//id ->for finding the target field value
//displayName ->for field name
//error ->for storing  filed error
//required-> for required filed
//type->type of value
//verify for otp verifcation
export const changePasswordForm = [
  {
    displayName: "Email",
    id: "emailAddress",
    type: "string",
    error: "",
    value: "",
    required: true,
  },
  {
    displayName: "OTP",
    id: "otp",
    type: "number",
    error: "",
    value: "",
    required: true,
    verify: true,
  },
  {
    displayName: "Password",
    id: "password",
    type: "password",
    error: "",
    value: "",
    required: true,
  },
  {
    displayName: "Confirm Password",
    id: "confirmPassword",
    type: "password",
    error: "",
    value: "",
    required: true,
  },
];
