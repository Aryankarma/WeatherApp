"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import styles from './weatherCurrent.module.css'
import anime from 'animejs/lib/anime.es.js';



export default function Home() {

  const api = "24951e153ffc4135aeb175518231307";

  const formSubmit = (e) => {
    e.preventDefault();
    const rawData = new FormData(e.currentTarget)
    const dataInput = rawData.get("city")
    console.log(dataInput)
    fetchWeather(api, dataInput)
  }
  
  // working with animations
  // var elements = document.getElementById("aqiRange");
  // anime({
  //     targets: elements,
  //     translateX: 270
  // });

  window.onload = function(){
    console.log("console")
    var motion_path = anime.path('#svgID'); 
    anime({
        targets: '#box',
        translateX: motion_path('x'), 
        translateY: motion_path('y'),
        // rotate: motion_path('angle'),
        easing: 'linear',
        duration: 10000,
        loop: true,
    });
  }

  // fetching api
  // useEffect(()=>{
  const fetchWeather = async (api, city) => {
    const url = "https://api.weatherapi.com/v1/current.json?key=" + api + "&q=" + city + "&aqi=yes";
    try {
      const rawApi = await fetch(url)
      const data = await rawApi.json();
      console.log(data)
      let x = data.current.air_quality.pm2_5;
      updateValue(x)
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
      console.log(error)
    }
  }
  // fetchWeather();
  // }, [])

  const [value1, updateValue] = useState(55)
  return <div className='homeContainer p-10 text-center justify-center items-center flex flex-col ...' >
    
    <h1 className='p-5 text-3xl font-extrabold'>Weather Forecast</h1>
    
    <form action="" onSubmit={(e) => formSubmit(e)}>
      <input autoFocus className='outline text-black rounded outline-2 p-5 w-1/2' type="text" placeholder='enter your city' name='city' />
      <button className='btn p-5' type="submit">Search</button>
    </form>
    
    <input max={500} value={value1} onChange={(e) => updateValue(e.target.value)} className={styles.aqiRange} type="range" name="aqi" id="aqiRange" />
    
    <div className={styles.mainSvgContainer}>
      <div className={styles.svgContainer}>
        <svg viewBox="0 0 385 87" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id='svgID' d="M1.5 86C17.6667 59.3334 76.4 4.39998 184 1.99998C226.5 1.25021e-05 322.5 8.5 383.5 85" stroke="red" strokeWidth="1" />
        </svg>
        <img className={styles.img} src="/images/Ellipse11.png" alt="xy" />
      </div>
      {/* <div id='boxContaier' className={styles.boxContaier}> */}
        <div className={styles.box} id="box"></div>
      {/* </div> */}
    </div>
  

  </div>
}