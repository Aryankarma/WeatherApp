"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./weatherCurrent.module.css";
import anime from "animejs/lib/anime.es.js";

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
    const url =
      "https://api.weatherapi.com/v1/current.json?key=" +
      api +
      "&q=" +
      city +
      "&aqi=yes";
    try {
      const rawApi = await fetch(url);
      const data = await rawApi.json();
      console.log(data);
      let x = data.current.air_quality.pm2_5;
      updateValue(x);
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

  // document.getElementById('circlePath').style.transform = `rotate(${20}deg)`;

  useEffect(()=>{
    // Get the CSS element that you want to change the animation for.
    
    // const element = document.getElementById('weatherCurrent_circlePath__WfQJv');
    
    // element.getAnimations()[0].effect.target.style.rotate = "50deg";
    // console.log(element.getAnimations()[0].effect.target.style.rotate)
    // console.log(element.getAnimations())
    // console.log(element.style.margin)
    // Get the current animation transform `rotate()` degree value.
    // const rotateValue = element.style.transform.match(/rotate\(([^)]+)\)/)[0];

    // Set the new animation transform `rotate()` degree value.
    // element.style.transform = `rotate(${30}deg)`;

    // // const oldSelect = document.getElementsByClassName("chngDeg");  
    // name.style.transform = `rotate(${20}deg)`;
    // // const newSelect = document.getElementById('weatherCurrent_circlePath__WfQJv');
    // // newSelect.style.transform = 'rotate(${60}deg)'

    const element = document.querySelector('#weatherCurrent_circlePath__WfQJv');
    console.log(element.style)
    // const animationName = getComputedStyle(element).getPropertyValue('animation-name');
    // const animationName2 = getComputedStyle(element).getPropertyValue("transform")
    // matrix(0.983272, 0.182145, -0.182145, 0.983272, 0, 0)
    // const final = animationName2.slice(7,14)
    // const animationName3 = final*(180 / Math.PI);
    // console.log("animationName2 " + animationName2)
    // console.log("animationName3 " +animationName3)
    // console.log("final " + final)
    

    // anime js animation functions 

    // let degValue = "12deg" 
    // const alter = "alternate"

    // animation for main sun container rotation
    
    anime({
      targets: ".chngDeg",
      rotate: "60deg",
      // rotate: degValue,
      duration: 3000,
      easing:"easeInOutQuad",
      loop: true,
      elasticity:200,
      // direction: "alternate",
      // direction: alter,
    })

  })
  
  // window.onload = function(){
  //   console.log("after loading")
  //   const element = document.querySelector('#weatherCurrent_circlePath__WfQJv');
  //   // thisis printing the rotate value at 0% but we need to modify the rotation value at 100%
  //   element.style.rotate = "0deg" ;
  //   console.log(element.style.rotate)
  // }

  return (
    <div className="homeContainer p-10 text-center justify-center items-center flex flex-col ...">
      <h1 className="p-5 text-3xl font-extrabold">Weather Forecast</h1>

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

          <div className="timings sunrise"></div>
          <div className="timings sunset"></div>

        </div>

      </div>


    </div>
  );
}