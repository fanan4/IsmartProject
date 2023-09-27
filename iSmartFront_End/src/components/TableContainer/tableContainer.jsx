import React, { useContext } from "react";
import "./tableContainer.scss";

// local compoenent
import TableRow from "../TableRow/tableRow";
import CustomButton from "../../components/CustomButton/customButton";
import CustomInput from "../CustomInput/customInput";

// external components
import { FaFilter } from "react-icons/fa";
import DatePicker from "../DatePicker/DatePicker";
import AuthContext from "../../context/authContext";

function TableContainer({
  data,
  width,
  itemwidth ,
  popup,
  setPopup,
  buttonValue,
  onClickDelete,
  excludedKeys,
  remove,
  detailsRoute,
  dateFilter,
  onChange,
  onClick,
  ImporData
}) {

  return (
    <div className="table-container">          
      <div className="table-head">      
        <div className="filters">       
          <div className="filter"> 
            <FaFilter className="icon" />       
            Filter
          </div>
          <CustomInput inputStyles={{}} placeholder="Search" noLabel  onChange={onChange}/> 
        </div>
        <div className="table-buttons">
          {dateFilter && <DatePicker />}
          {
            popup!==null &&<CustomButton
            onClick={() => {
              console.log('onClick isss ',onClick)
              console.log('buttton geted clicked')
              onClick!==undefined && onClick(data)       
              onClick===undefined && setPopup(!popup) 
            }}
            value={buttonValue}
            // styles={{ borderRadius: "0" }}  
          />
          }
          {
            ImporData!==null &&  <CustomButton
            value={'Export Data'}
            // styles={{ borderRadius: "0" }}  
          >
              {ImporData}
          </CustomButton> 
              
          }
        </div>
    
      </div>
      <div className="table">
        {data?.map((item, idx) => {
          return (
            <TableRow
              key={idx}
              data={item}
              header={!idx ? true : false} 
              width={width}
              itemwidth={itemwidth}
              last={
                data.length - 1 === idx || data.length - 2 === idx
                  ? true
                  : false
              }
              onClickDelete={onClickDelete}
              excludedKeys={excludedKeys}
              remove={remove}
              detailsRoute={detailsRoute}
            />
          );
        })}

      </div>
    </div>
  );
}

export default TableContainer;
