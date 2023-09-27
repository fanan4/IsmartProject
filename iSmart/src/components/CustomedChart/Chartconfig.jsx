import { useContext } from "react";
import graphContext from "../../context/graphContext";
import {   monthsOfYear, daysOfMonth} from "../../utils/formatTimeAndDate";
import { RadioDropDwon, SelectDropDown } from "../clickableDropDown/ClickableDropDown";
 
export default  ( {datatype}  )=>{
    const {
        list,
        timeobject,
        datatypeindex,
        onSelectDate,
        years,
        handelChangeData
      } = useContext(graphContext);
    
     
      const days = daysOfMonth(timeobject.year , timeobject.month)
     
 
    if(datatype >= 0  ){
        handelChangeData(datatype)
      }
   
  
    return  <div className="chart-config">
    <div className="left">
      <SelectDropDown
        defaultValue={timeobject.year}
        options={years}
        onSelect={(value) => onSelectDate(value, "y")}
        header={"Select Year "}
      />
      <SelectDropDown
        defaultValue={timeobject.month}
        listtype="grid-3"
        options={monthsOfYear}
        onSelect={(value) => onSelectDate(value, "m")}
        header={"Select Month "}
      />
       <SelectDropDown
        defaultValue={timeobject.day}
        listtype="grid-4"
        options={days}
        onSelect={(value) => onSelectDate(value, "d")}
        header={"Select day "}
      />
      
       
    </div>
  { !(datatype >= 0 ) &&  <div className="right">
      <RadioDropDwon
            list ={list}
            datatype={datatypeindex}
            handelChangeData={handelChangeData}
            header={"data Type "}
      />
    </div>}
  </div>
}