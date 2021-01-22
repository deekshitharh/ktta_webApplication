import { regularExpData } from "../formdata";
import { commons } from "../commons";
const formValidation = {};
const fileSizeLimit = 1 * 1000 * 1000;
//password valdiation used in login.js,registerplayer.js,forgotpssword component forms
//form fields as param
formValidation.verifyPassword = (obj) => {
  let passwordObj = obj.find((obj) => obj.id.toLowerCase() === "password");
  let confirmPasswordObj = obj.find(
    (obj) => obj.id.toLowerCase() === "confirmpassword"
  );
  if (
    passwordObj &&
    confirmPasswordObj &&
    passwordObj.value !== confirmPasswordObj.value
  ) {
    obj.find((item) => {
      if (item.id.toLowerCase() === "confirmpassword")
        item.error = "Reconfirm the password";
      else {
        item.error = "";
      }
    });
  }

  return obj;
};
// splitting the from registerplayer.js,forgot password component,edit details
//  forms splitting the from fields into grids based on the given value
formValidation.chunkArray = (chunk_size, arr) => {
  return arr
    .map(function (e, i) {
      return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
    })
    .filter(function (e) {
      return e;
    });
};

formValidation.validatePasswodData = async (obj, x) => {
  obj.map((item) => {
    if (
      item.value != undefined &&
      item.value != null &&
      item.type !== "number" &&
      item.value.toString().length
    ) {
      item.value =
        typeof item["value"] == "string" ? item["value"].trim() : item["value"];
    }
    let value = item["value"];
    if (item.type == "number" && item.value.toString().length > 0)
      item.value = parseInt(value);

    item.error = "";

    if (item.type == "date") {
      var idate = commons.checkFuturedate(item.value);

      if (idate) {
        item["error"] = "DOB cannot be future";
      } else {
        item["error"] = "";
      }
    }

    if (item.required) {
      if (
        item.value == undefined ||
        (item.value != undefined && item.value.toString().length === 0)
      ) {
        item["error"] = item.displayName + " required";
      } else {
        item["error"] = "";
      }
    }

    let fieldObj = regularExpData.find(
      (obj) => obj.name.toLowerCase() === item["id"].toLowerCase()
    );
    if (fieldObj && fieldObj.regExp) {
      if (value != undefined && value.toString().length > 0) {
        let status = fieldObj.regExp.test(value) ? true : false;
        if (status) {
          item["error"] = "";
          if (item.verify) {
            if (item.value === x) {
              item["error"] = "";
            } else item["error"] = "Invalid otp";
          }
        } else item["error"] = fieldObj.message;
      }
    }
  });

  obj = await formValidation.verifyPassword(obj);
  return obj;
};
//formvalidation for login.js, userdetails.js, registerPlayer.js,contact.js,changepassword.js
//parms as fom fields
formValidation.genricFromValidation = async (obj,otpval) => {
  obj.map((item) => {
    if (
      item.value !== undefined &&
      item.value !== null &&
      item.type !== "number" &&
      item.value.toString().length
    ) {
      item.value =
        typeof item["value"] === "string"
          ? item["value"].trim()
          : item["value"];
    }
    let value = item["value"];

    if (item.type === "number" && item.value.toString().length > 0)
      item.value = parseInt(value);

    item.error = "";

    if (item.id === "phoneNumber" && item.disabled) {
      item["error"] = "";
    }

    if (item.type === "date") {
      var idate = commons.checkFuturedate(item.value);

      if (idate) {
        item["error"] = "DOB cannot be future";
      } else {
        item["error"] = "";
      }
    }

    if (item.required) {
      if (
        item.value === undefined ||
        (item.value !== undefined && item.value.toString().length === 0)
      ) {
        item["error"] = item.displayName + " required";
      }
    }

    let fieldObj = regularExpData.find(
      (obj) => obj.name.toLowerCase() === item["id"].toLowerCase()
    );
    if (fieldObj && fieldObj.regExp) {
      let status = fieldObj.regExp.test(value) ? true : false;
      if (status) {
        item["error"] = "";
        if (item.verify) {
          if (item.value === otpval) {
            item["error"] = "";
          } else item["error"] = "Invalid otp";
        }
      } else item["error"] = fieldObj.message;
    }
  });

  obj = await formValidation.verifyPassword(obj);
  return obj;
};
//file validation in uploading file used in giveEntries.js
formValidation.validateFile = (file) => {
  let resJson = { status: true, msg: "" };
  if (file === null) {
    resJson["status"] = false;
    resJson["msg"] = "File cannot be empty";
  }
  if (file) {
    if (file.size > fileSizeLimit) {
      resJson["msg"] = "File cannot exceed 1 MB";
      resJson["status"] = false;
    }
  }

  return resJson;
};


export default formValidation;
