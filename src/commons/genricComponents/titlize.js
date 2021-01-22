import titleize from "titleize";
//function for camelcase text
//props :string
//used in assoclist.js,standingcontent.js,legal.js,playerlistView.js,rnkingview.js,responsiveDialouge.js,responsiveListDilouge.js,ranking.js
//for converting the api data relevant strings to camel case.
function Titlize(props) {
  return titleize(props.value);
}

export default Titlize;
