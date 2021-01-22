//url schema for api calls for all api calls
// APPSPECIFIC_URL fo fetching,sponsers,newsdata,officeberarers,legal,detailednews,tournament.js in respective components,
export const APPSPECIFIC_URL="https://sports-whiz.herokuapp.com/app/" 
export const API_NAME="https://sports-whiz.herokuapp.com/"
export const PAYMENT="https://sports-whiz.herokuapp.com/payment/order"
//url list object based on api type
//createData key passed to url in  contact.js,give Entries.js
//payment key passed to url in giveEntries.js
//fetchData key passed to url  in sponsers.js,legal.js,detailednews.js,tournmnet.js,newspage.js,officebearers.js
export const urls = {
  createData:APPSPECIFIC_URL+"createEntity",
  fetchData:APPSPECIFIC_URL+"fetchEntity",
  payment:  PAYMENT , 
  coreApi:API_NAME + "sports",
};
