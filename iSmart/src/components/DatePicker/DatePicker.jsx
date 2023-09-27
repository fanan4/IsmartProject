import React, { useState } from "react";
import "./DatePicker.scss";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import Picker from "react-date-picker";

import { CiCalendarDate } from "react-icons/ci";

function DatePicker() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="date-picker">
      <Picker
        style={{ border: "none" }}
        className="picker"
        calendarClassName="calender"
        clearIcon={null}
        calendarIcon={() => <CiCalendarDate size={14} />}
        onChange={onChange}
        value={value}
      />
      {/* <input type="date" /> */}
    </div>
  );
}

export default DatePicker;
