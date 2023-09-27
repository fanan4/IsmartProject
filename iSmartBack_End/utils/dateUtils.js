
module.exports  = ()=>{
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const yearsArray = [];
    
    for (let year = startYear; year <= currentYear; year++) {
      yearsArray.push( year );
    }
  return yearsArray
  };  