import moment from "moment";

const commons = {};
//genic api error
commons.errorLog = (e) => {
  console.log(e);
};
//filter date past/present/future in tounament file
commons.checkDate = (input1, input2, input3) => {
  let curDate = new Date();
  let startDate = new Date(input1);
  let endDate = new Date(input2);
  let endsub = new Date(input3);
  if (moment(curDate).isBetween(startDate, endDate)) return "current";
  if (moment(curDate).isAfter(moment(endDate))) return "past";
  if (moment(curDate).isAfter(moment(endsub))) return "closed";
  if (moment(curDate).isBefore(startDate)) return "future";
};

//genric function for payment script
commons.loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

//genric function to filter form fileds to send as params to api
commons.displayfileds = (formvalues) => {
  const data = {};

  formvalues.forEach((obj) => {
    if (obj.id === "DOB")
      data[obj.id] = moment(obj.value).format("DD MMM YYYY");
    else {
      data[obj.id] = obj.value;
    }
  });
  return data;
};

//format date used in tournament.js file
commons.formatDate = (inputDate) => {
  inputDate = inputDate.split(" ");
  inputDate = inputDate[2] + " " + inputDate[1] + " " + inputDate[0];
  return inputDate;
};
//  data for news/clubs/association landing page based on gridrows
commons.genricGrid = (apidata, gridrows, gridColumns) => {
  const x = commons.shuffleArray(apidata);

  let genricData = [];
  let i;
  for (i = 0; i < gridrows; i++) {
    genricData.push({
      row: i,
      colums: x.slice(i * gridColumns, (i + 1) * gridColumns),
    });
  }

  return genricData;
};
//data array that needs to displayed in draws compone
commons.gridData = (apidata) => {
  let genricData = [];
  let i;
  for (i = 0; i <= 2; i++) {
    genricData.push(apidata[i]);
  }

  return genricData;
};

//format the date used in tournament file
commons.formatterDate = (inputDate) => {
  inputDate = inputDate.substring(0, 10).split(/\D/g);
  inputDate = inputDate[2] + "-" + inputDate[1] + "-" + inputDate[0];
  return inputDate;
};
//abbrevtion used in registered clubs and registered association
commons.abrrevatedData = (val) => {
  const data = val.substring(0, 4);
  return data.toUpperCase();
};
//check shuffle array function fo displying random data each time load
commons.shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
//check futuredate
commons.checkFuturedate = (date) => {
  var today = new Date().getTime(),
    idate = date.split("-");

  idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
  const datecheck = today - idate < 0;
  return datecheck;
};
//array sort in home page for registred clubs/association on abrrevation data
//params as array and type based on array to be sorted
commons.sortArray = (array, type) => {
  return array.sort((a, b) => {
    if (type === "acadamy") {
      if (a.abbrevationAcademy < b.abbrevationAcademy) return -1;
      if (a.abbrevationAcademy > b.abbrevationAcademy) return 1;
      return 0;
    } else if (type === "assoc") {
      if (a.abbrevationAssociation < b.abbrevationAssociation) return -1;
      if (a.abbrevationAssociation > b.abbrevationAssociation) return 1;
      return 0;
    }
  });
};

export default commons;
