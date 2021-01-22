//regular expression rules for form fileds
//used for validtion in  login.js,registerPlayer.js,fogotPassword.js,userProfile.js,contact us components
export const regularExpData = [
  {
    name: "userName",
    regExp: /^[a-zA-Z ]{3,15}$/,
    message: "Enter characters between 3 to 15",
  },
  {
    name: "phoneNumber",
    regExp: /^\d{10}$/,
    message: "Invalid Phone Number",
  },
  {
    name: "emailAddress",
    regExp: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
    message: "Invalid Email Address",
  },

  {
    name: "pincode",
    regExp: /^\d{6}$/,
    message: "Invalid Pincode",
  },

  {
    name: "password",
    regExp: /^[a-zA-Z\d\!@#\$%&\*]{6,15}$/i,
    message:
      "password accepts only alphabets, characters, and number of 6 length",
  },
  {
    name: "confirmpassword",
    regExp: /^[a-zA-Z\d\!@#\$%&\*]{6,15}$/i,
    message: "Passwords don't match",
  },
  {
    name: "otp",
    regExp: /^[0-9]{4}$/i,
    message: "4 digits otp required",
  },

  {
    name: "password",
    regExp: /^.{5,15}$/i,
    message: "password required with minimum 5 characters",
  },

  {
    name: "gender",
    regExp: /^male$|^female$/,
    message: "Allowed gender : male/female",
  },
];
