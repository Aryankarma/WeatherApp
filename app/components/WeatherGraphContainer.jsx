import React from 'react';
import styles from "../weatherCurrent/weatherCurrent.module.css";
import dynamic from 'next/dynamic';
import XAxis1 from "../components/xaxis";
import DoubleWeatherGraph from "../components/doubleWeatherGraph"
import SingleWeatherGraph from "../components/singleWeatherGraph"
const days=["Mon", "Tue","Wed","Thu","Fri","Sat","Sun"]
  // const time = ["12pm","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12am"] 
const time = [ "0", "1", "2", "3", "4", "5", "6", "7", 
    "8", "9", "10", "11", "12", "13", "14", "15", 
    "16", "17", "18", "19", "20", "21", "22", "23", "24" ]

// const DoubleWeatherGraph = dynamic(() => import('../components/doubleWeatherGraph'), {
//   ssr: false,
// })
// const SingleWeatherGraph = dynamic(() => import('../components/singleWeatherGraph'), {
//   ssr: false,
// })

const WeatherGraphContainer = ({ singleGraphDataValue, doubleGraphDataValue }) => {
  return (
    <div className={styles.weatherGraph}>
      <DoubleWeatherGraph data={doubleGraphDataValue} />
      <XAxis1 data={days} />
      <SingleWeatherGraph data={singleGraphDataValue} />
      <XAxis1 data={time} />
    </div>
  );
};

export default WeatherGraphContainer;