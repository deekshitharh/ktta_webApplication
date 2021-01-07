import { urls } from "./globalUrls";


 export const ApiCall = (methodType, content, urlType) => {
  
   let methodURL = urls[urlType];
 
   if (urlType !== ("payment" || "contactus"))
   {
     content.client_key = localStorage.getItem("api_key")
     }
   return fetch(methodURL, {
    
    method: methodType,
    body: JSON.stringify(content),
  });
};


export const fileCall = (methodType, content, urlType) => {

  let methodURL = urls[urlType];
  return fetch(methodURL, {
    method: methodType,
    body:content,
   
  });
};