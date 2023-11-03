"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./weatherCurrent.module.css";
import anime from "animejs/lib/anime.es.js";
import WeatherDetails from "../components/weatherDetailSection";
import dynamic from 'next/dynamic';
import XAxis1 from "../components/xaxis";

const DoubleWeatherGraph = dynamic(() => import('../components/doubleWeatherGraph'), {
  ssr: false,
})
const SingleWeatherGraph = dynamic(() => import('../components/singleWeatherGraph'), {
  ssr: false,
})

const days=["Mon", "Tue","Wed","Thu","Fri","Sat","Sun"]
const time = ["12pm","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12am"] 


// function Home() {
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
    "&aqi=yes";
    try {

      const currentData = await fetch(urlCurrent);
      const currentDataFinal = await currentData.json();

      const astroData = await fetch(urlAstro);
      const astroDataFinal = await astroData.json();

      console.log(currentDataFinal);
      console.log(astroDataFinal);
      
      const sunrise = astroDataFinal.astronomy.astro.sunrise;
      const sunset = astroDataFinal.astronomy.astro.sunset;
      setSunsetTime(sunset.toLowerCase())
      setSunriseTime(sunrise.toLowerCase())

      let x = currentDataFinal.current.air_quality.pm2_5;
      let y = currentDataFinal.location.localtime;
      updateValue(x);

      const slicefrom = y.length - (y.length - (length-5));
      const currentTime = y.slice(slicefrom, y.length);

      console.log(currentTime)

      updateDegValue("60deg")
      fucnt();
      /*
      AQI = (PM2.5 - BPLo) / (BPhi - BPLo) * (IHi - ILo) + ILo
      PM2.5 = x   BPLo = 12 μg/m³   ILo = 50  IHi = 100    BPhi = 35 μg/m³
      AQI = (x - 12) / (35 - 12) * (1000) + 50
  
        0-50: Good
        51-100: Moderate
        101-150: Unhealthy for Sensitive Groups
        151-200: Unhealthy
        201-300: Very Unhealthy
        301-500: Hazardous
     */
    
      } catch (error) {
      console.log(error);
    }
  };
  
  const [value1, updateValue] = useState(55);
  const [sunriseTime, setSunriseTime] = useState("")
  const [sunsetTime, setSunsetTime] = useState("")


  // useEffect(()=>{
    const [degValue, updateDegValue] = useState(0)

    const fucnt=()=>{

      const element = document.querySelector('#weatherCurrent_circlePath__WfQJv');
      console.log(element.style.transform = "rotate(0deg)");

      anime({
        targets: ".chngDeg",
        rotate: degValue,
        duration: 3000,
        easing:"easeInOutQuad",
        // loop: true,
        elasticity:200
      })
    } 
    // })

    

  return (
    <div className={styles.homeContainer}>
      <div className={styles.leftContent}>

      {/* <h1 className="p-5 text-3xl font-extrabold">Weather Forecast</h1> */}

      <form action="" onSubmit={(e) => formSubmit(e)}>
        <input
          autoFocus
          className="outline text-black rounded outline-2 p-5 w-1/2"
          type="text"
          placeholder="enter your city"
          name="city"
          />
        <button className="btn p-5" type="submit">
          Search
        </button>
      </form>

      <input
        max={500}
        value={value1}
        onChange={(e) => updateValue(e.target.value)}
        className={styles.aqiRange}
        type="range"
        name="aqi"
        id="aqiRange"
        />

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
          <span className={styles.temp}>24<sup id={styles.degreeUnit}>°C</sup></span>
          <br/>
          {/* <span id={styles.degreeUnit}>°C</span> */}
          <span id={styles.condition}>Cloudy, 22°/29°</span>
        </div>  
      
        <div id={styles.location1}>
          <img className={styles.svgLocation} src="images/svgs/locationLogo.svg" alt="" />
          <h1>Indore, India</h1>
        </div>
  
      </div>
  
    </div>

      <div className={styles.rightContainer}>
        <div className={styles.weatherDetailContainer}>
          <WeatherDetails />
          <WeatherDetails />
          <WeatherDetails /> 
          <WeatherDetails />
          <WeatherDetails />
          <WeatherDetails />
        </div>

        <div className={styles.weatherGraph}>
          <DoubleWeatherGraph />
          <XAxis1 data={days}/>
          <SingleWeatherGraph/>
          <XAxis1 data={time}/>
        </div>
      </div>
  </div>
);
}
