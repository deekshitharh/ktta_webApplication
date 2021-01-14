import { urls } from "./globalUrls";

//generic api call function
 export const ApiCall = (methodType, content, urlType) => {
  
   let methodURL = urls[urlType];
 
   if (urlType !== ("payment" || "contactus"))
   
     content.client_key = localStorage.getItem("api_key")
     
   return fetch(methodURL, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    method: methodType,
    body: JSON.stringify(content),
  });
};

//generic api call upload file function
export const fileCall = (methodType, content, urlType) => {

  let methodURL = urls[urlType];
  return fetch(methodURL, {
    method: methodType,
    body:content,
   
  });
};
