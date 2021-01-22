//url schema for api calls for all api calls
export const API_URL = "http://www.goto5s.com/";
export const APPSPECIFIC_URL="https://sports-whiz.herokuapp.com/app/"
export const API_NAME="https://sports-whiz.herokuapp.com/"
export const PAYMENT="https://sports-whiz.herokuapp.com/payment/order"
//url list object based on api type
export const urls = {
  createData:APPSPECIFIC_URL+"createEntity",
  fetchData:APPSPECIFIC_URL+"fetchEntity",
  getDataById: API_URL + "getDataById.php",
  playerupload: API_URL + "uploadAPI",

 
  payment:  PAYMENT ,
  playreg: API_URL + "payregister.php",  
  coreApi:API_NAME + "sports",
};
