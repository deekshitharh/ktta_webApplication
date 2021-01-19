export const API_URL = "http://www.goto5s.com/";
export const APPSPECIFIC_URL="https://sports-whiz.herokuapp.com/app/"
export const API_NAME="https://sports-whiz.herokuapp.com/"
//url list object based on api type
export const urls = {
  createData:APPSPECIFIC_URL+"createEntity",
  fetchData:APPSPECIFIC_URL+"fetchEntity",
  getDataById: API_URL + "getDataById.php",
  playerupload: API_URL + "playerUpload.php",
  insert: API_URL + "insert.php",
  contactus: API_URL + "contactus.php",
  payment: API_URL + "pay.php",
  playreg: API_URL + "payregister.php",  
  coreApi:API_NAME + "sports",
};
