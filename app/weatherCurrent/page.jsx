"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./weatherCurrent.module.css";
import anime from "animejs/lib/anime.es.js";
import WeatherDetails from "../components/WeatherDetailSection";
import XAxis1 from "../components/xaxis";
import AqiRange from "../components/aqiRange"
// import WeatherGraphContainer from "../components/WeatherGraphContainer"
import DoubleWeatherGraph from "../components/doubleWeatherGraph"
import SingleWeatherGraph from "../components/singleWeatherGraph"
import { Link } from 'react-scroll';


// const DoubleWeatherGraph = dynamic(() => import('../components/doubleWeatherGraph'), {
//   ssr: false,
// })
// const SingleWeatherGraph = dynamic(() => import('../components/singleWeatherGraph'), {
//   ssr: false,
// })

// const WeatherGraphContainer = dynamic(() => import('../components/WeatherGraphContainer'), {
//   ssr: false,
// })


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
      value: "0"
    },{
      logo: "images/svgs/windspeedLogo.svg",
      heading: "Wind speed",
      sub: "mi/h",
      value: "0"
    },{
      logo: "images/svgs/humidityLogo.svg",
      heading: "Humidity",
      sub: "%",
      value: "0"
    },{
      logo: "images/svgs/sunLogo.svg",
      heading: "UV",
      sub: "very weak",
      value: "0"
    },{
      logo: "images/svgs/visibilityLogo.svg",
      heading: "Visibility",
      sub: "km",
      value: "0"
    },{
      logo: "images/svgs/airpressurelogo.svg",
      heading: "Air pressure",
      sub: "hpa",
      value: "0"
    }]

const days=["Mon", "Tue","Wed","Thu","Fri","Sat","Sun"]
  // const time = ["12pm","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12am"] 
const time = [ "1", "2", "3", "4", "5", "6", "7", 
    "8", "9", "10", "11", "12", "13", "14", "15", 
    "16", "17", "18", "19", "20", "21", "22", "23", "24"]

// function Home()
export default function Home() {
      
  // useState hooks
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(null)
  const [aqiRangeValue, updateAqiRangeValue] = useState(0)
  const [sunriseTime, setSunriseTime] = useState("")
  const [sunsetTime, setSunsetTime] = useState("")
  // const [tempValue, setTempValue] = useState(0)
  const [conditionValue, setConditionValue] = useState("")
  const [minTempValue, setminTempValue] = useState(0)
  const [maxTempValue, setmaxTempValue] = useState(0)
  const [locationValue, setLocationValue] = useState("")
  const [singleGraphDataValue, setsingleGraphDataValue] = useState([])
  const [doubleGraphDataValue, setdoubleGraphDataValue] = useState([])
  const [effect, executeEffect] = useState(0)
  const [hour, setHour] = useState(0)
  const [cityName, setCityName] = useState([])

  // geolocation api
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        executeEffect(1);
      },(error) => {
        console.log(error);
      });
    }
  }, []);

  const api = "24951e153ffc4135aeb175518231307";

  const formSubmit = (e) => {
    e.preventDefault();
    const rawData = new FormData(e.currentTarget);
    const dataInput = rawData.get("city");
    fetchWeather(api, dataInput);
  };

  // fetch weather data
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
    var threeDaysEarlier = new Date(today);
    threeDaysEarlier.setDate(today.getDate() - 3);

    const apiStartDate = threeDaysEarlier.getFullYear() + "-" + (threeDaysEarlier.getMonth() + 1) + "-" + threeDaysEarlier.getDate();
    const apiEndDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    const urlHistory = 
    "https://api.weatherapi.com/v1/history.json?key="
    + api +
    "&q="+ 
    city + 
    "&dt=" + 
    apiStartDate+ 
    "&end_dt=" + 
    apiEndDate;

    try {
      const forecastData = await fetch(urlForecast);
      const forecastDataFinal = await forecastData.json();

      const historyData = await fetch(urlHistory);
      const historyDataFinal = await historyData.json();
      
      const astroData = await fetch(urlAstro);
      const astroDataFinal = await astroData.json();
      
      // checks for error
      // if(astroDataFinal.error){
      //   console.log("Error exists")
      // }

      // console.log(forecastDataFinal)
      // console.log(historyDataFinal)
      // console.log(astroDataFinal);

      // graph data (single)
      const forecastDayData = forecastDataFinal.forecast.forecastday[0].hour
      const forecastHourData = forecastDayData.map((input)=>{
        return input.temp_c
      })

      singleGraphData.forEach((input, index)=>{
        input.value = forecastHourData[index];  
      })

      // console.log("UPDATING DATA: ", singleGraphData)
      setsingleGraphDataValue(singleGraphData)
      
      // graph data (double)
      const tempMax = [];
      const tempMin = [];
      

      historyDataFinal.forecast.forecastday.map((input, index)=>{
        tempMax[index] = input.day.maxtemp_c; // get maxtemp of previous 3 days
        tempMin[index] = input.day.mintemp_c; // get mintemp of previous 3 days
      })
      
      const lengthMax = tempMax.length;
      const lengthMin = tempMin.length;

      forecastDataFinal.forecast.forecastday.map((input, index)=>{
        tempMax[lengthMax + index] = input.day.maxtemp_c; // get maxtemp of current+2 days
        tempMin[lengthMin + index] = input.day.mintemp_c; // get mintemp of current+2 days
      })
      
      // console.log(doubleGraphData)

      // setting doubleGraphData data
      doubleGraphData.forEach((input, index)=>{
        // console.log(input.high, index)
        // console.log(input.low, index)
        input.high = tempMax[index]
        input.low = tempMin[index]
      })

      // console.log("UPDATING DATA: ", doubleGraphData)
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
      // setTempValue(Math.round(currentCelciusTemp))
      setTempAnimation(Math.round(currentCelciusTemp))
      setConditionValue(forecastDataFinal.current.condition.text)
      setminTempValue(Math.round(forecastDataFinal.forecast.forecastday[0].day.mintemp_c))
      setmaxTempValue(Math.round(forecastDataFinal.forecast.forecastday[0].day.maxtemp_c))
      setLocationValue(forecastDataFinal.location.name + ", " + forecastDataFinal.location.country)

      var aqiRangeValue = forecastDataFinal.current.air_quality.pm2_5;
      let y = forecastDataFinal.location.localtime;
      updateAqiRangeValue(aqiRangeValue)

      const slicefrom = y.length - (y.length - (length-5));
      let currentTime = (y.slice(slicefrom, y.length)).slice(0, 2) ;

      currentTime = parseInt(currentTime)
      setHour(currentTime)
      let degToRotate = ((currentTime - 6) * 7.5)

      // console.log(degToRotate)

      if(degToRotate < 0){
        degToRotate = 0;
      }else if(degToRotate > 90){
        degToRotate = 90;
      }

      rotateSun(degToRotate);

      // clear city suggestions
      setTimeout(()=>{
        setCityName([])
      }, 50)

      } catch (error) {
        if(error){
          console.log(error)
        }
      }
  };
  

  // fetch api if location provided
  useEffect(()=>{
    if(latitude){
      const city = latitude + ","  + longitude;
      fetchWeather(api, city);
    }else{
      fetchWeather(api, "New delhi");
      // console.log("permission rejecteded")
    }
  },[effect])



  function setTempAnimation(tempValue){
    var logEl = document.querySelector('#tempratureAnimation');

    var battery = {
      cycles: 0
    }

    anime({
      targets: battery,
      cycles: tempValue,
      round: 1,
      easing: 'easeInOutQuad',
      update: function() {
        logEl.innerHTML = JSON.stringify(battery.cycles);
      }
    });
  }
  
  function rotateSun(rotateValue){
    anime({
      targets: ".chngDeg",
      rotate: rotateValue,
      duration: 3000,
      easing:"easeInOutQuad",
      elasticity:200
    })
  }

  const fadeInAnimation = () =>{
    // console.log("function is working")
    anime({
      targets: '.addFadeIn',
      opacity: [0, 1],
      easing: 'easeInOutQuad'
    });
  }

  const animationFix = () => {
    // console.log("working")
    document.querySelector("#searchBoxDiv").style.outline = "none"; 
  }

  let weatherConditionImg = "";

  const lightrain = "images/weatherCondition3d/lightrain.png"
  const cloudy = "images/weatherCondition3d/cloudy.png"
  const snow = "images/weatherCondition3d/snow.png"
  const sunnyfoggy = "images/weatherCondition3d/sunnyfoggy.png"
  const thunder = "images/weatherCondition3d/thunder.png"
  const windy = "images/weatherCondition3d/windy.png"
  const windycloudynight = "images/weatherCondition3d/windycloudynight.png"
  const windynight = "images/weatherCondition3d/windynight.png"

  const setWeatherConditionPath = () => {

    anime({
      targets: '#conditionImg',
      opacity: [0.3, 1],
      easing: 'easeInOutQuad'
    });

    switch (conditionValue) {
      
      case "Patchy rain possible" :
        weatherConditionImg = lightrain
      break;
      
      case "Patchy light rain" :
        weatherConditionImg = lightrain
      break;

      case "Light rain" :
        weatherConditionImg = lightrain
      break;
      
      case "Moderate rain at times" :
        weatherConditionImg = lightrain
      break;
      
      case "Moderate rain" :
        weatherConditionImg = lightrain
      break;
      
      case "Heavy rain at times" :
        weatherConditionImg = lightrain
      break;
      
      case "Heavy rain" :
        weatherConditionImg = lightrain
      break;

      case "Light freezing rain" :
        weatherConditionImg = lightrain
      break;

      case "Light drizzle" : 
        weatherConditionImg = lightrain
      break;

      case "Moderate or heavy freezing rain" :
        weatherConditionImg = lightrain
      break;

      case "Patchy light drizzle" :
        weatherConditionImg = lightrain
      break;

      case "Light showers of ice pellets":
        weatherConditionImg = lightrain
      break;

      case "Light rain shower" :
        weatherConditionImg = lightrain
      break;

      case "Moderate or heavy rain shower" :
        weatherConditionImg = lightrain
      break;

      case "Torrential rain shower" :
        weatherConditionImg = lightrain
      break;

      case "Patchy light rain with thunder" :
        weatherConditionImg = lightrain
      break;

      case "Moderate or heavy rain with thunder" :
        weatherConditionImg = lightrain
      break;

      case "Sunny" :
        weatherConditionImg = sunnyfoggy
      break;

      case "Mist" :
        weatherConditionImg = cloudy
      break;

      case "Fog" :
        weatherConditionImg = sunnyfoggy
      break;

      case "Freezing fog" :
        weatherConditionImg = sunnyfoggy
      break;

      case "Thundery outbreaks possible" :
        weatherConditionImg = thunder
      break;

      // case 2
      case "Patchy light rain with thunder" :
        weatherConditionImg = thunder
      break;

      // case 2
      case "Moderate or heavy rain with thunder" :
        weatherConditionImg = thunder
      break;

      // repeating
      case "Patchy light snow with thunder" :
        weatherConditionImg = thunder
      break;

      case "Moderate or heavy snow with thunder" :
        weatherConditionImg = thunder
      break;

      case "Blowing snow" :
        weatherConditionImg = windy
      break;

      case "Blizzard" :
        weatherConditionImg = windy
      break;

      case "Windy" :
        weatherConditionImg = windy
      break;

      case "Cloudy" :
        weatherConditionImg = cloudy
      break;

      case "Overcast" :
        weatherConditionImg = cloudy
      break;

      case "Moderate or heavy rain shower" :
        weatherConditionImg = windycloudynight
      break;

      case "Torrential rain shower" :
        weatherConditionImg = windycloudynight
      break;

      case "Moderate or heavy sleet showers" :
        weatherConditionImg = windycloudynight
      break;

      case "Moderate or heavy snow showers" :
        weatherConditionImg = windycloudynight
      break;

      case "Patchy snow possible" :
        weatherConditionImg = snow
      break;

      case "Light snow" :
        weatherConditionImg = snow
      break;

      case "Patchy moderate snow" :
        weatherConditionImg = snow
      break;

      case "Moderate snow" :
        weatherConditionImg = snow
      break;

      case "Patchy heavy snow" :
        weatherConditionImg = snow
      break;

      case "Heavy snow" :
        weatherConditionImg = snow
      break;

      case "Ice pellets" :
        weatherConditionImg = snow
      break;

      case "Light sleet showers" :
        weatherConditionImg = snow
      break;

      case "Moderate or heavy sleet showers" :
        weatherConditionImg = snow
      break;

      default: weatherConditionImg = cloudy
        break;
    }
  } 

  setWeatherConditionPath();


  // for debouncing input

  const [term, setTerm] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const printThis = (e) => {
    setTerm(e);
  }

  // debouncing
  useEffect(()=>{

    // check if the input contains only spaces
    if(term == !/\S/){
      return setCityName([])
    }

    const oneSec = setTimeout(() => {
        setSearchTerm(term)
    }, 200);
  
    // Clean up the timer if the user continues typing
    return () => {
      clearTimeout(oneSec);
    };
  }, [term]);

  // logic to fetch city suggestions
  useEffect(()=>{

    const fetchCityData = async () =>{
      const cityURL = "https://api.teleport.org/api/cities/?search=" + term;

      try{
        const rawData = await fetch(cityURL);
        const citydata = await rawData.json();
        
        // console.log("Fetching data")

        let count = 0;
        const tempCityName = [];
      
      for (let i = 0; i < 5; i++) {
        if (citydata?._embedded["city:search-results"][i]?.matching_full_name) {
          count++;
        }
      }
        for (let i = 0; i < count; i++) {
        tempCityName.push(citydata?._embedded["city:search-results"][i]?.matching_full_name);
      }
        setCityName(tempCityName);
      }catch(error){
      console.log(error);
    }
  } 

  if (searchTerm !== '') {
    fetchCityData();
  }

  },[searchTerm])

  function onBlurFunction(e){
    e.preventDefault();

    // reset suggestions (not working)
    // setCityName([])

   
    // // opacity
    document.getElementById("topContent").style.opacity = 1
    document.getElementById("bottomContent").style.opacity = 1
  }

  function onFocusFunction(e){
    e.preventDefault();

    // opacity
    document.getElementById("topContent").style.opacity = .2
    document.getElementById("bottomContent").style.opacity = .2

    // // transition
    document.getElementById("topContent").style.transition = "1000ms"
    document.getElementById("bottomContent").style.transition = "1000ms"
  }

  // empty city suggestions on enter
  useEffect(()=>{

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {

        document.getElementById("topContent").style.opacity = 1
        document.getElementById("bottomContent").style.opacity = 1
      }
    };

    document.body.addEventListener('keydown', handleKeyPress);

    return () => {
      document.body.removeEventListener('keydown', handleKeyPress);
    };  

  }, [])

  // smooth scrolling
  useEffect(() => {
    let isScrolling = false;

    const handleScroll = (event) => {
      if (!isScrolling) {
        isScrolling = true;

        const scrollY = window.scrollY;
        const smoothScrollFactor = .7;
        const smoothScrollPosition = scrollY + (event.deltaY * smoothScrollFactor);

        window.scrollTo({
          top: smoothScrollPosition,
          behavior: 'smooth',
        });

        // Reset the scrolling flag after a short delay (adjust as needed)
        setTimeout(() => {
          isScrolling = false;
        }, 200); // 200 milliseconds debounce time
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []); // Empty dependency array ensures that the effect runs once on mount


    return ( <>

    <div onLoad={fadeInAnimation} id="addFadeIn" className={styles.homeContainer}>

      <div className={styles.header}>

        {/* <Greeting hour={hour}/> */}

        <form action="" id="runOnsubmit" onSubmit={(e) => formSubmit(e)}>
          <div 
            tabIndex={0} onBlur={onBlurFunction}
            id="searchBoxDiv" className={styles.searchBoxDiv}>
              <img src="images/svgs/searchLogo.svg" alt="" />
              <input
                id="removeFocus"
                className={styles.searchBox}
                type="text"
                placeholder="Enter city"
                name="city"
                onFocus={onFocusFunction}
                autocomplete="off"
                onChange={(e) => printThis(e.target.value)}
              />
            
            <ul className={styles.belowInput} >
              
              {/* <CityNames cityName={cityName} /> */}

              {cityName.map((suggestion, index) => (
                <li key={index} >
                  <button type="submit" > {suggestion} </button>
                </li>
              ))}
           
            </ul>

          </div>

          <button className={styles.searchButton} type="submit">
            Search
          </button>
        </form>

          {/* <img className={styles.img1} src="images/svgs/location.svg" alt="locationLogo" />
          <img className={styles.img2} src="images/svgs/setting.svg" alt="settingLogo" /> */}
      </div>


      <div id="topContent" className={styles.topContent}>

      <div className={styles.mainWeather}>
        <img className={styles.bgImage} src="images/bgMain.png" alt="" />
        <img loading="lazy" id="conditionImg" className={styles.conditionImg} src={weatherConditionImg} alt="" />          
        {/* <img className={styles.conditionImg} src="images/weatherCondition3d/snow.png" alt="" />           */}
        
        <div id={styles.tempCondition}>
     {/* <span id="tempratureAnimation" className={styles.temp}>{tempValue}<sup id={styles.degreeUnit}>°C</sup></span>*/}     
          <span id="tempratureAnimation" className={styles.temp}>0<sup id={styles.degreeUnit}>°C</sup></span>
          <br/>
          {/* <span id={styles.degreeUnit}>°C</span> */}
          <span id={styles.condition}>{conditionValue}, {minTempValue}°/{maxTempValue}°</span>
        </div>  
      
        <div id={styles.location1}>
          <img className={styles.svgLocation} src="images/svgs/locationLogo.svg" alt="" />
          <h1>{locationValue}</h1>
        </div>
      </div>

      <div className={styles.weatherGraph}>
        <div>
          <SingleWeatherGraph data={singleGraphDataValue} />
          <XAxis1 data={time} />
        </div>
        <div>
          <DoubleWeatherGraph data={doubleGraphDataValue} />
          <XAxis1 data={days} />
        </div>
      
      </div>
 
    </div>

    <div id="bottomContent" className={styles.bottomContent}>

    <div className={styles.bottomLeftContainer}>

      <AqiRange range={aqiRangeValue}/>

      <div className={styles.sunContainer}>

        <div className="chngDeg" id={styles.circlePath}>
         <div className={styles.item}></div>
        </div>

        <img loading="lazy" className={styles.img} src="images/Ellipsefinal.png" alt="sunLine" />
        
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
</div>

      <div className={styles.weatherDetailContainer}>
        {weatherDetailData.map((input)=>{
          return <WeatherDetails value={input.value} sub={input.sub} heading={input.heading} logo={input.logo}/>
        })}
      </div>

    </div>
  </div>

  <div className={styles.tagLine}>Made with <span style={{color: "red"}}>❤️</span> by Aryxn</div>
   
  </>
);
}