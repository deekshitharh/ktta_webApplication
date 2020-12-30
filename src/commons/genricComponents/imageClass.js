
import React from 'react';






function BannerImage(props) {

   return <div style={{

     height: 100,
     background: `url(${props.img})  center bottom no-repeat`,
     backgroundSize: "cover",
     backgroundPosition: "0 -121px",
    objectFit: "cover"
       
       
   }}/> 
}


export default BannerImage;