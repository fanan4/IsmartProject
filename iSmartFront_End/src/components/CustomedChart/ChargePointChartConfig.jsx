import { useContext,   } from "react"; 
import {   monthsOfYear, daysOfMonth} from "../../utils/formatTimeAndDate";
import {   SelectDropDown } from "../clickableDropDown/ClickableDropDown";
import chargePointsGraphContext from "../../context/chargePointGraphContext";
 
export default  ({id} )=>{
    const {
        timeobject,
        onSelectDate,
        years,
      } = useContext(chargePointsGraphContext);
      const days = daysOfMonth(timeobject.year , timeobject.month)
    return  <div className="chart-config">
    <div className="left">
    <SelectDropDown
        defaultValue={timeobject.year}
        options={years}
        onSelect={(value) => onSelectDate(value, "y",id)}
        header={"Select Year "}
      />
      <SelectDropDown
        defaultValue={timeobject.month}
        listtype="grid-3"
        options={monthsOfYear}
        onSelect={(value) => onSelectDate(value, "m",id)}
        header={"Select Month "}
      />
       <SelectDropDown
        defaultValue={timeobject.day}
        listtype="grid-4"
        options={days}
        onSelect={(value) => onSelectDate(value, "d",id)}
        header={"Select day "}
      />
  
    </div>
 
   
  </div>
}