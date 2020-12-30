import moment from "moment";

const commons = {}

commons.errorLog = (e) => {
    console.log(e)
}
commons.checkDate = (input1, input2,input3) => {
    
    let curDate = new Date();
    let startDate = new Date(input1);
    let endDate = new Date(input2);
    let endsub = new Date(input3);
    if (moment(curDate).isBetween(startDate, endDate)) return "current";
    if (moment(curDate).isAfter(moment(endDate))) return "past";
    if (moment(curDate).isAfter(moment(endsub)))
        return "closed"
     if (moment(curDate).isBefore(startDate))
        return "future"
    
}

commons.displayfileds = (formvalues) => {
    const data = {};
  
    formvalues.map((obj) => {

        if (obj.id == "DOB")
            data[obj.id] = moment(obj.value).format('DD MMM YYYY');
        else {
            data[obj.id] = obj.value
        }

    });
    return data
}


commons.formatDate = (inputDate) => {
    inputDate = inputDate.split(" ");
    inputDate = inputDate[2] + " " + inputDate[1] + " " + inputDate[0];
    return inputDate;
}

commons.genricGrid = (apidata, gridrows, gridColumns)=>{

    const x = commons.shuffleArray(apidata)

    let genricData= [];
    let i;
    for (i = 0; i < gridrows; i++) {
        genricData.push({ "row": i, "colums": x.slice((i * gridColumns), (i + 1) * gridColumns) })
    }

    return genricData
}

commons.fildata= (apidata) => {

  

    let genricData = [];
    let i;
    for (i = 0; i < (apidata.length-1); i++) {
        genricData.push(apidata[i])
    }

    return genricData
}


commons.formatterDate = (inputDate) => {
    inputDate = inputDate.substring(0, 10).split(/\D/g)
    inputDate = inputDate[2] + "-" + inputDate[1] + "-" + inputDate[0]
    return inputDate
}
commons.abrrevatedData = (val) => {
    const data = val.substring(0, 4)
    return data.toUpperCase()
}

commons.shuffleArray = (array) => {
    for (let i = array.length - 1; i >0; i--)
    {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j],array[i]];
     }
     return array;
}

commons.checkFuturedate = (date) => {
    var today = new Date().getTime(),
        idate = date.split("-");

    idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
    const datecheck = (today - idate) < 0
    return datecheck
      


}

commons.sortArray = (array, type) => {

  return array.sort((a, b) => {
      if (type === "acadamy") {
         
          if (a.abbrevationAcademy < b.abbrevationAcademy) return -1;
          if (a.abbrevationAcademy > b.abbrevationAcademy) return 1;
          return 0;
        //   if (a.clubName < b.clubName) return -1;
        //   if (a.clubName > b.clubName) return 1;
        //   return 0;
      }
      else if (type == "assoc") {
          if (a.abbrevationAssociation < b.abbrevationAssociation) return -1;
          if (a.abbrevationAssociation > b.abbrevationAssociation) return 1;
          return 0;

          
         
      }
  })
};

export default commons;
