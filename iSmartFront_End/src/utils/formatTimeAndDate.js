const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};


export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds % 60).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${months[month]} ${day} ${hours}:${minutes}`;
};



export const getTime = (transactions) => {
  transactions.forEach((t) => {
    if (
      t.status.toLowerCase() !== "charging" &&
      t.status.toLowerCase() !== "active"
    ) {
      const seconds = Math.round(parseFloat(t.duration) * 60);
      t.duration = formatTime(seconds);
    }
  });
};

export const getDate = (transaction) => {
  transaction.forEach((t) => {
    const date = new Date(t.timestamp);
    t.date = formatDate(date);
  });
};

export  const yearsFrom2020 = ()=>{
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const yearsArray = [];
  
  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push({ label: year.toString(), value: year });
  }
return yearsArray
};  
export const  monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((month, index) => ({
  label: month,
  value: index + 1, 
}));
export const daysOfMonth = (year, monthIndex) => { 
  if (!year || !monthIndex) {
    return Array.from({ length: 31 }, (_, index) => ({ value: index + 1, label: (index + 1).toString() }));
  }
 
  if (monthIndex < 1 || monthIndex > 12) {
    return Array.from({ length: 31 }, (_, index) => ({ value: index + 1, label: (index + 1).toString() }));
  }
 
  const daysInMonth = new Date(year, monthIndex, 0).getDate();
 
  const daysArray = [];
 
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push({ value: day, label: day.toString() });
  }

  return daysArray;
};
