
const formValidation = {}
const fileSizeLimit = 1 * 1000 * 1000;
import {regularExpData} from "../formdata"
import {commons} from "../commons"
// formValidation.validateFormData = (formvalues) => {

//     formvalues.map(el => {
//         let value = el["value"];

//         let logObj = regularExpData.find(obj => obj["name"] === el["id"])

//         if (logObj && logObj.regExp) {

//             if (value != undefined && value.length > 0) {
//                 let status = (value).match(logObj["regExp"]) ? true : false;
//                 if (status) {
//                     el["error"] = "";

//                 }
//                 else
//                     el['error'] = logObj["defMsg"]
//             }

//             else
//                 el['error'] = logObj["emptmsg"]
//         }
//         else
//             el["error"] = "";

//     });

//     return formvalues

// }


formValidation.verifyPassword = (obj) => {
    let passwordObj = obj.find(obj => obj.key.toLowerCase() === "password");
    let confirmPasswordObj = obj.find(obj => obj.key.toLowerCase() === "confirmpassword");
    if(passwordObj && confirmPasswordObj && passwordObj.value !== confirmPasswordObj.value) {
        obj.find(item => {
            if (item.key.toLowerCase()==="confirmpassword")
                item.error="Reconfirm the password"
            
            else {
                item.error = ""

            }
        })
  

    }

 


    return obj
}

 formValidation.chunkArray = (chunk_size, arr) => {
    
    return arr.map(function (e, i) {
        return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
    }).filter(function (e) { return e; });

}


formValidation.validatelogin = async (obj) => {
    
    obj.map(item => {
        if (item.value != undefined && item.value != null && item.type !== "number" && item.value.toString().length) {
            item.value = (typeof (item["value"]) == "string") ? item["value"].trim() : item["value"]

        }
        let value = item["value"];

        if (item.type == "number" && item.value.toString().length > 0) item.value = parseInt(value)
        // if (item.type == "number" && item.value.toString().length == 0) item.value = 0


        

        item.error = ""
        if (item.required) {

            if (item.value == undefined ||
                (item.value != undefined && item.value.toString().length === 0)
            ) {
                item["error"] = item.displayName + " required";
            }

            else {
                item["error"]=""
            }
        }



        let fieldObj = regularExpData.find(obj => obj.name ? obj.name === item["key"] :"")
        
   
        if (fieldObj && fieldObj.regExp) {

            if (value != undefined && value.toString().length > 0
                //&& (item.type === "number" && item.value != 0)

            ) {
                let status = fieldObj.regExp.test(value) ? true : false;
                if (status) {
                    item["error"] = "";

                }
                else
                    item['error'] = fieldObj.message;
            }

        }

        // else if (fieldObj === undefined)
        // {
        //     item["error"] = "";
        //     }

    })

    


    return obj;
}

formValidation.validatePasswodData = async (obj,x) => {

    obj.map(item => {
        if (item.value != undefined && item.value != null && item.type !== "number" && item.value.toString().length) {
            item.value = (typeof (item["value"]) == "string") ? item["value"].trim() : item["value"]

        }
        let value = item["value"];

        if (item.type == "number" && item.value.toString().length > 0) item.value = parseInt(value)
        // if (item.type == "number" && item.value.toString().length == 0) item.value = 0



        item.error = ""

        if (item.type == "date") {
           
     
            var idate = commons.checkFuturedate(item.value);

         
            if (idate)

            {
               item["error"] = "DOB cannot be future"
            }
            else {
               item["error"] = ""
            }
       
        }

        // if (item.verify) {
        //     if (item.value==x) {
        //         item["error"] = "";

        //     }
        //     else
        //         item['error'] = "invalid otp";
        // }
        

        if (item.required) {

            if (item.value == undefined ||
                (item.value != undefined && item.value.toString().length === 0)
            ) {
                item["error"] = item.displayName + " required";
            }
        }



        let fieldObj = regularExpData.find(obj => obj.name.toLowerCase() === item["key"].toLowerCase())
        if (fieldObj && fieldObj.regExp) {

            if (value!= undefined && value.toString().length > 0
                //&& (item.type === "number" && item.value != 0)

            ) {
                let status = fieldObj.regExp.test(value) ? true : false;
                if (status) {
                  item["error"] = "";
                    if (item.verify)
                    {
                        if (item.value == x) {
                            item["error"] = "";

                        }
                       
                        else
                            item['error'] = "Invalid otp";
                    }

                
                 
                }
                else
                    item['error'] = fieldObj.message;
            }

        }

        // else if (fieldObj === undefined) {
        //     item["error"] = "";
        // }


    })

    obj = await formValidation.verifyPassword(obj);
     return obj;
}

formValidation.validateFile = (file) => {

    let resJson = { "status": true, "msg": "" }
    if (file == null) {
        resJson["status"] = false;
        resJson["msg"] = "File cannot be empty"
    }
    if (file) {


        if (file.size > fileSizeLimit) {
            resJson["msg"] = "File cannot exceed 1 MB"
            resJson["status"] = false;
        }



    }

  


    return resJson

}
























formValidation.validateFile = (file) => {

    let resJson = { "status": true, "msg": "" }
    if (file == null) {
        resJson["status"] = false;
        resJson["msg"] = "File cannot be empty"
    }
    if (file) {


        if (file.size > fileSizeLimit) {
            resJson["msg"] = "File cannot exceed 1 MB"
            resJson["status"] = false;
        }

       

    }



    return resJson

}



export default formValidation;