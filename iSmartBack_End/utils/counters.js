 
const yearsFrom2020 = require("./dateUtils");
async function getCountByYears(docuement, field , counting_what, id ) {
  const years = yearsFrom2020();
  const startDate = new Date(Date.UTC(years[0], 0, 1));
  const endDate = new Date(Date.UTC(new Date().getFullYear() + 1, 0, 1));
  const yearlyCounts = new Array(years.length).fill(0);
  const pipeline = [];
  if(id ){
    pipeline.push({ 
    $match: { "chargerId" : id }
    })
  }
  pipeline.push({
    $match: { timestamp: { $gte: startDate, $lt: endDate } }
  });
 
  pipeline.push({
    $group: {
      _id: { $year: `$${field}` } ,
      count: { $sum: counting_what  }
    }
  });

  const data = await docuement.aggregate(pipeline);
console.log(data);
  for (let i = 0; i < years.length; i++) {
    yearlyCounts[i] = {id: years[i] , count: 0};
  data.forEach((item)=>{ 
    if (item._id === years[i]) {
    yearlyCounts[i].count = item.count;
  }})
  }


  return yearlyCounts;
}

 
async function getcountByMonth(docuement, year, field, counting_what ,id ) {
  const startDate = new Date(Date.UTC(year, 0, 1));
  const endDate = new Date(Date.UTC(year + 1, 0, 1));
 
  const isCurrentYear = new Date().getFullYear() === year;
  const currentMonth = new Date().getUTCMonth() + 1;  

  let numberOfMonths = 12;

   if (isCurrentYear) {
    numberOfMonths = currentMonth;
  }

  const pipeline = [];
  // this id is representing the charge point id so we will search for it then we will applay the 
  if(id ){
    pipeline.push({ 
    $match: { "chargerId" : id }
    })
  }
  pipeline.push({
    $match: { [field]: { $gte: startDate, $lt: endDate } }
  });

  pipeline.push({
    $group: {
      _id: { $month: `$${field}` },
      count: { $sum: counting_what }
    }
  });

  const data = await docuement.aggregate(pipeline);

  const monthlyCount = new Array(numberOfMonths);
  for (let month = 0; month < numberOfMonths; month++) {
    monthlyCount[month] = { id: month + 1, count: 0 };
    data.forEach((item) => {
      if (item._id === month + 1) {
        monthlyCount[month].count = item.count;
      }
    });
  }
  return monthlyCount;
}


async function getcountByDays(document, year, month, field, counting_what , id ) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const startDate = new Date(Date.UTC(year, month, 1));
 
  const isCurrentMonth = new Date().toISOString().slice(0, 7) === startDate.toISOString().slice(0, 7);
  let numberOfDays = daysInMonth;
 
  if (isCurrentMonth) {
    numberOfDays = new Date().getUTCDate();
  }

  const endDate = new Date(Date.UTC(year, month, numberOfDays));

  const pipeline = [];
  if(id ){
    pipeline.push({ 
    $match: { "chargerId" : id }
    })
  }
  pipeline.push({
    $match: { [field]: { $gte: startDate, $lt: endDate } }
  });

  pipeline.push({
    $group: {
      _id: { $dayOfMonth: `$${field}` },
      count: { $sum: counting_what }
    }
  });

  const data = await document.aggregate(pipeline);

  const dailyCount = new Array(numberOfDays);
  for (let day = 0; day < numberOfDays; day++) {
    dailyCount[day] = { id: day + 1, count: 0 };
    data.forEach((item) => {
      if (item._id === day + 1) {
        dailyCount[day].count = item.count;
      }
    });
  }
  return dailyCount;
}

 
async function getCountByHours(document, year, month, day, field, counting_what , id ) {
  const startDate = new Date(Date.UTC(year, month, day));
  const currentHour = new Date().getUTCHours();
 
  const isCurrentDay = new Date().toISOString().slice(0, 10) === startDate.toISOString().slice(0, 10);
  let numberOfHours = 24;
 
  if (isCurrentDay) {
    numberOfHours = currentHour + 1;
  }

  const endDate = new Date(Date.UTC(year, month, day, numberOfHours - 1, 59, 59));

  const pipeline = [];
  if(id ){
    pipeline.push({ 
    $match: { "chargerId" : id }
    })
  }
  pipeline.push({
    $match: { [field]: { $gte: startDate, $lt: endDate } }
  });

  pipeline.push({
    $group: {
      _id: { $hour: `$${field}` },
      count: { $sum: counting_what }
    }
  });

  const data = await document.aggregate(pipeline);

  const hourlyCount = new Array(numberOfHours);
  for (let hour = 0; hour < numberOfHours; hour++) {
    hourlyCount[hour] = { id: hour, count: 0 };
    data.forEach((item) => {
      if (item._id === hour) {
        hourlyCount[hour].count = item.count;
      }
    });
  }
  return hourlyCount;
}







 









module.exports = { getcountByDays, getcountByMonth, getCountByYears , getCountByHours };
