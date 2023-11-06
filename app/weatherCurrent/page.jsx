"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./weatherCurrent.module.css";
import anime from "animejs/lib/anime.es.js";
import WeatherDetails from "../components/WeatherDetailSection";
import dynamic from 'next/dynamic';
import XAxis1 from "../components/xaxis";
import AqiRange from "../components/aqiRange"

const DoubleWeatherGraph = dynamic(() => import('../components/doubleWeatherGraph'), {
  ssr: false,
})
const SingleWeatherGraph = dynamic(() => import('../components/singleWeatherGraph'), {
  ssr: false,
})


  const singleGraphData = [
    {
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    },{
      "value": 0,
    }]

  const doubleGraphData = [
    {
      "high": 0,
      "low": 0,
    },
    {
      "high": 0,
      "low": 0,
    },
    {
      "high": 0,
      "low": 0,
    },
    {
      "high": 0,
      "low": 0,
    },
    {
      "high": 0,
      "low": 0,
    },
    {
      "high": 0,
      "low": 0,
    },
    {
      "high": 0,
      "low": 0,
    }
  ]
  const weatherDetailData = [{
      logo: "images/svgs/thermometer.svg",
      heading: "Feels like",
      sub: "",
      value: ""
    },{
      logo: "images/svgs/windspeedLogo.svg",
      heading: "Wind speed",
      sub: "mi/h",
      value: ""
    },{
      logo: "images/svgs/humidityLogo.svg",
      heading: "Humidity",
      sub: "%",
      value: ""
    },{
      logo: "images/svgs/sunLogo.svg",
      heading: "UV",
      sub: "very weak",
      value: ""
    },{
      logo: "images/svgs/visibilityLogo.svg",
      heading: "Visibility",
      sub: "km",
      value: ""
    },{
      logo: "images/svgs/airpressurelogo.svg",
      heading: "Air pressure",
      sub: "hpa",
      value: ""
    }]
  const days=["Mon", "Tue","Wed","Thu","Fri","Sat","Sun"]
  // const time = ["12pm","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12am"] 
  const time = [ "0", "1", "2", "3", "4", "5", "6", "7", 
    "8", "9", "10", "11", "12", "13", "14", "15", 
    "16", "17", "18", "19", "20", "21", "22", "23", "24" ]

  
// function Home()
export default function Home() {
      
      const api = "24951e153ffc4135aeb175518231307";
      
      const formSubmit = (e) => {
        e.preventDefault();
        const rawData = new FormData(e.currentTarget);
        const dataInput = rawData.get("city");
        console.log(dataInput);
        fetchWeather(api, dataInput);
      };

  // fetching api
  const fetchWeather = async (api, city) => {

    const urlCurrent =
      "https://api.weatherapi.com/v1/current.json?key=" +
      api +
      "&q=" +
      city +
      "&aqi=yes";

    const urlAstro = 
    "https://api.weatherapi.com/v1/astronomy.json?key=" +
    api +
    "&q=" +
    city + 
    "&days=1" + 
    "&aqi=yes";

    const urlForecast = 
    "https://api.weatherapi.com/v1/forecast.json?key=" +
    api +
    "&q=" +
    city +
    "&days=3" +
    "&aqi=yes" + 
    "&alerts=no" ;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();

    const startDate = year + "-" + month + "-" + (date-4);
    const endDate = year + "-" + month + "-" + (date-1);

    console.log(day)

    const urlHistory = 
    "https://api.weatherapi.com/v1/history.json?key="
    + api +
    "&q="+ 
    city + 
    "&dt=" + 
    startDate + 
    "&end_dt=" + 
    endDate;

    try {

      const currentData = await fetch(urlCurrent);
      const currentDataFinal = await currentData.json();
      
      const astroData = await fetch(urlAstro);
      const astroDataFinal = await astroData.json();
      
      const forecastData = await fetch(urlForecast);
      const forecastDataFinal = await forecastData.json();
      
      const historyData = await fetch(urlHistory);
      const historyDataFinal = await historyData.json();

      console.log(currentDataFinal);
      console.log(astroDataFinal);
      console.log(forecastDataFinal)
      console.log(historyDataFinal)

      // graph data (single)
      const forecastDayData = forecastDataFinal.forecast.forecastday[0].hour
      const forecastHourData = forecastDayData.map((input)=>{
        return input.temp_c
      })
      
      // console.log(forecastHourData)
      
      singleGraphData.forEach((input, index)=>{
        input.value = forecastHourData[index];  
      })

      setsingleGraphDataValue(singleGraphData)
      
      // graph data (double)
      const tempMax = [];
      const tempMin = [];
      
      historyDataFinal.forecast.forecastday.map((input, index)=>{

        tempMax[index] = input.day.maxtemp_c;
        tempMin[index] = input.day.mintemp_c;
        // console.log(input.date, input.day.maxtemp_c) // get maxtemp from prev 4 days
        // console.log(input.date, input.day.mintemp_c) // get mintemp from prev 4 days
      })
      

      const lengthMax = tempMax.length;
      const lengthMin = tempMin.length;

      forecastDataFinal.forecast.forecastday.map((input, index)=>{

        tempMax[lengthMax + index] = input.day.maxtemp_c;
        tempMin[lengthMin + index] = input.day.mintemp_c;
        // console.log(input.date, input.day.maxtemp_c) // get maxtemp of current+2 days
        // console.log(input.date, input.day.mintemp_c) // get mintemp of current+2 days
      })
      
      // setting doubleGraphData data
      doubleGraphData.forEach((input, index)=>{
        input.high = tempMax[index]
        input.low = tempMin[index]
      })

      setdoubleGraphDataValue(doubleGraphData)

      // weatherdetailsection
      const feelsLikeValue = forecastDataFinal.current.feelslike_c;
      const windSpeedValue = forecastDataFinal.current.wind_kph;
      const humidityValue = forecastDataFinal.current.humidity;
      const visibilityValue = forecastDataFinal.current.vis_km;
      const uvValue = forecastDataFinal.current.uv;
      const airPressureValue = forecastDataFinal.current.pressure_mb;
      
      const setData = [feelsLikeValue, windSpeedValue, humidityValue, visibilityValue, uvValue, airPressureValue]      
  
      weatherDetailData.forEach((input, index)=>{
        if(index == 0){
          input.value = setData[index] + "°";
        }else{
          input.value = setData[index];
        }
      })
      
      const sunrise = astroDataFinal.astronomy.astro.sunrise;
      const sunset = astroDataFinal.astronomy.astro.sunset;
      setSunsetTime(sunset.toLowerCase())
      setSunriseTime(sunrise.toLowerCase())
      
      const currentCelciusTemp = forecastDataFinal.current.temp_c
      setTempValue(Math.round(currentCelciusTemp))
      setConditionValue(forecastDataFinal.current.condition.text)
      setminTempValue(Math.round(forecastDataFinal.forecast.forecastday[0].day.mintemp_c))
      setmaxTempValue(Math.round(forecastDataFinal.forecast.forecastday[0].day.maxtemp_c))
      setLocationValue(forecastDataFinal.location.name + ", " + forecastDataFinal.location.country)

      var aqiRangeValue = forecastDataFinal.current.air_quality.pm2_5;
      let y = forecastDataFinal.location.localtime;
      updateAqiRangeValue(aqiRangeValue);

      const slicefrom = y.length - (y.length - (length-5));
      let currentTime = (y.slice(slicefrom, y.length)).slice(0, 2) ;

      currentTime = parseInt(currentTime)
      let degToRotate = ((currentTime - 6) * 7.5)

      // console.log(degToRotate)

      if(degToRotate < 0){
        degToRotate = 0;
      }else if(degToRotate > 90){
        degToRotate = 90;
      }

      rotateSun(degToRotate);

      
    
      } catch (error) {
      console.log(error);
    }
  };
  
  // useState hooks
  const [aqiRangeValue, updateAqiRangeValue] = useState(0);
  const [sunriseTime, setSunriseTime] = useState("")
  const [sunsetTime, setSunsetTime] = useState("")
  const [tempValue, setTempValue] = useState(0)
  const [conditionValue, setConditionValue] = useState("")
  const [minTempValue, setminTempValue] = useState(0)
  const [maxTempValue, setmaxTempValue] = useState(0)
  const [locationValue, setLocationValue] = useState("")
  const [singleGraphDataValue, setsingleGraphDataValue] = useState([])
  const [doubleGraphDataValue, setdoubleGraphDataValue] = useState([])

  function rotateSun(rotateValue){
          
      anime({
        targets: ".chngDeg",
        rotate: rotateValue,
        duration: 4500,
        easing:"easeInOutQuad",
        elasticity:200
      })
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.leftContent}>

      <form action="" onSubmit={(e) => formSubmit(e)}>

        <input
          autoFocus="true"
          className="outline text-black rounded outline-2 p-5 w-1/2"
          type="text"
          placeholder="enter your city"
          name="city"
          />
        <button className="btn p-5" type="submit">
          Search
        </button>
      </form>

      <AqiRange range={aqiRangeValue}/>

      <div className={styles.sunContainer}>

        <div className="chngDeg" id={styles.circlePath}>
         <div className={styles.item}></div>
        </div>

        <img className={styles.img} src="images/Ellipsefinal.png" alt="sunLine" />
        
        <div className={styles.blackShade}>
          <div className={styles.timings}>
            <div className={styles.sunset}>
              <div className={styles.upper}>
                <img className={styles.svg} src="images/svgs/sunrise-2.svg" alt="" />
                <p>Sunrise</p>
              </div>
                <hr style={{border:0}} />
                <p id={styles.riseTime}>{sunriseTime}</p>
            </div>
            <div className={styles.sunset}>
            <div className={styles.upper}>
                <img className={styles.svg} src="images/svgs/sunset-2.svg" alt="" />
                <p>Sunset</p>
            </div>
                <hr style={{border:0}}/>
                <p id={styles.setTime}>{sunsetTime}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainWeather}>

        {/* <div className={styles.conditionImgCont}> */}
          <img className={styles.conditionImg} src="images/weatherCondition/cloudStrike.png" alt="" />          
        {/* </div> */}

        <div id={styles.tempCondition}>
          <span className={styles.temp}>{tempValue}<sup id={styles.degreeUnit}>°C</sup></span>
          <br/>
          {/* <span id={styles.degreeUnit}>°C</span> */}
          <span id={styles.condition}>{conditionValue}, {minTempValue}°/{maxTempValue}°</span>
        </div>  
      
        <div id={styles.location1}>
          <img className={styles.svgLocation} src="images/svgs/locationLogo.svg" alt="" />
          <h1>{locationValue}</h1>
        </div>
  
      </div>
  
    </div>

      <div className={styles.rightContainer}>

        <div className={styles.weatherDetailContainer}>
          {weatherDetailData.map((input)=>{
            return <WeatherDetails value={input.value} sub={input.sub} heading={input.heading} logo={input.logo}/>
          })}
        </div>

        <div className={styles.weatherGraph}>
          <DoubleWeatherGraph data={doubleGraphDataValue}/>
          <XAxis1 data={days}/>
          <SingleWeatherGraph data={singleGraphDataValue}/>
          <XAxis1 data={time}/>
        </div>

      </div>
  </div>
);
}