import { useState } from "react";
import { CloseIcon, DropDownIcon, DropUpIcon } from "../../utils/customedSvgs";
import "./clickableDropDown.scss";


export const SelectDropDown = ({ defaultValue, options, onSelect, header ,listtype }) => {
      const [active , setisActive ] = useState(false ); 
    const [selected , setISSelected ] = useState({label: defaultValue} ) ;
  const handelSelect = (item)=>{ 
    onSelect(item.value)
    setISSelected(item )
    setisActive(false)
  }
  const handelUnselect=()=>{
    setISSelected(undefined)
    setisActive(true)
    onSelect(-1)
  }
  const headercss = selected &&   selected.label !== -1 ?  "header  " :" header  opacity-50"
  return (
    <div className={"clickable_drop_down_select "}>
      <div className={headercss } onClick={()=>setisActive(old => !old)}>
    <div className="header-text">
    { 
          selected&& selected.label != -1 ? selected.label :
        header ? header : "select item " 
        }
    </div>
{active? 
     <div className="icon-container">  
     <DropUpIcon/>
     </div>
     :
     selected&& selected.label != -1   ?     <div className="icon-container  " onClick={handelUnselect}> 
 <CloseIcon/>
      </div> :    <div className="icon-container    "> 
<DropDownIcon/>
     </div> 
     
     }
      </div>
     {active && <div className={"dropdown_list grid "+ listtype}>
        {options.map((item , index) => (
          <div className={"bc-1   control_item_select"}    onClick={()=>handelSelect(item)}>
          <div className={"select-container-select " }   >
            {item.label}
             </div>
             </div>
        ))}
      </div>}
    </div>
  );
};

 
export const RadioDropDwon = ({ list , datatype , handelChangeData, header }) => {
    
    const [active , setisActive ] = useState(false ); 
    const CustomRadioButton = ({  value  , color , checked    }) => {
       const spancolor = "radio-checkmark "+ color
        return (
          <div className="radio-container">
            <input
              type="radio"
              value={value}
              checked={checked}
              className=" radio-input "
            />
            <span className={spancolor}></span>
            {value}
          </div>
        );
      };
     
 
  
  return (
    <div className="dropDownContainer">
      <div className="dropitem_header" onClick={()=>setisActive(old => !old)}>
        <div>{list[datatype].label}</div>
{active? 
     <div className="icon-container">  
     <DropUpIcon/>
     </div>
     :
     <div className="icon-container "> 
<DropDownIcon/>
     </div>}
      </div>
     {active && <div className="dropdown_list">
        {list.map((item , index) => (
          <div className={"b"+item.color + " control_item"}    onClick={()=>handelChangeData(index)}>
           <CustomRadioButton
             value={item.label}
             color={item.color}
             checked={index == datatype}
             />
             </div>
        ))}
      </div>}
    </div>
  );
};
