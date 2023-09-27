import React, {    useEffect, useState } from "react";
import "./customchartStyle.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import "react-dropdown/style.css";
 
ChartJS.register(   
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  redraw: true,
  aspectRatio: 2,
  fill: true,
  tension: 0  ,
  scales: {
    y: {
      display: true ,
      suggestedMin: 0,
      suggestedMax: 30,
      
    },
  },
  plugins: {
    legend: {
      display: false ,
      position: "bottom",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

export default ({data  }) => { 
 
    const [showComponent, setShowComponent] = useState(true);
    let resizeTimer;
    const handleResize = () => {
      setShowComponent(false);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setShowComponent(true);
      }, 500);
    };
    //
    useEffect(() => {
      // Attach the 'resize' event listener
      window.addEventListener("resize", handleResize);
      // Cleanup: remove the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimer);
      };
    }, []);

   
  return (
    <div>
      <div className="chart-content">
       
        {showComponent && <Line data={{
    labels:data.length &&  data.map((item) => item.id),
    datasets:  [{ 
      
      data: data.length && data.map((item) => item.count),
      fill: true,
      pointStyle: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "#9db251",
    }]
 
   
    
  } 
  } options={options} /> 
  }
      </div>
    </div>
  );
};
 