import styles from "../components/aqirange.module.css"

export default function AqiRange({range}){
    let airHealth = "";
    let statement = "";
    range = Math.floor(range)

    if(range > 500){
        range = 500;
    }

    // setting airHealth
    if(range < 50){
        airHealth = "Good"
    }else if(range < 100){
        airHealth = "Moderate"
    }else if(range < 150){
        airHealth = "Unfit"
    }else if(range < 200){
        airHealth = "Unhealthy"
    }else if(range < 300){
        airHealth = "Dangerous"
    }else if(range < 500){
        airHealth = "Hazardous"
    }

    // setting statement
    if(range < 50){
        statement = "Good Air: Ideal for Outdoor Fun!"
    }else if(range < 100){
        statement = "Moderate Air: Enjoy Outdoors Safely."
    }else if(range < 150){
        statement = "Unhealthy for Some: Limit Exposure."
    }else if(range < 200){
        statement = "Unhealthy Air: Reduce Outdoor Time."
    }else if(range < 300){
        statement = "Very Unhealthy: Stay Indoors."
    }else if(range < 500){
        statement = "Hazardous: Protect Your Health, Stay In."
    }

    return <div className={styles.aqiContainer}>
        <div className={styles.headContainer}>
            <img src="images/svgs/airQualityLogo.svg" alt="" /><h1 id="heading" className={styles.aqiHeading}>Air Quality - {range} ({airHealth}) </h1>
        </div>
        <input
            max={500}
            value={range}
            className={styles.aqiRange}
            type="range"
            name="aqi"
            id="aqiRange"
            />
        <h4 className={styles.aqiStatement}>{range} - {statement}</h4>
    </div>
}



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

        0-50: "0-50 - Breathe Easy: Enjoy the fresh air!"
        51-100: "51-100 - It's a Good Day for Outdoor Activities."
        101-150: "101-150 - Caution Advised: Sensitive Groups Take Precautions."
        151-200: "151-200 - Air Quality Alert: Limit Outdoor Exposure."
        201-300: "201-300 - Very Unhealthy: Stay Indoors If Possible."
        301-500: "301-500 - Hazardous: Protect Your Health, Avoid Outdoor Activities."

        0-50: "Good Air: Ideal for Outdoor Fun!"
        51-100: "Moderate Air: Enjoy Outdoors Safely."
        101-150: "Unhealthy for Some: Limit Exposure."
        151-200: "Unhealthy Air: Reduce Outdoor Time."
        201-300: "Very Unhealthy: Stay Indoors."
        301-500: "Hazardous: Protect Your Health, Stay In."

        First, determine the sub-indices for each pollutant (CO, NO2, O3, PM2.5, PM10, SO2) based on their concentrations and the respective breakpoints. The sub-indices are calculated separately for each pollutant.

        Find the sub-index for each pollutant:

        For CO, NO2, O3, PM2.5, PM10, and SO2, you need to refer to the specific AQI calculation formula and breakpoints used in your region or by the specific AQI system you are interested in. These formulas and breakpoints can differ between countries and organizations.
        Calculate the US EPA AQI sub-index based on the US EPA-specific formula for each pollutant. For the US EPA, the formula for each pollutant sub-index is determined using the following equation:

        AQI(sub-index) = (I_high - I_low) / (C_high - C_low) * (Concentration - C_low) + I_low

        Where:

        AQI(sub-index) is the sub-index for the pollutant.
        I_high and I_low are the AQI breakpoints for the pollutant.
        C_high and C_low are the concentration breakpoints for the pollutant.
        Concentration is the measured concentration of the pollutant.
        For each pollutant, you'll calculate the sub-index using the specific formula for your region or using the US EPA formula if that's what's being referred to by the "us-epa-index."

        Once you have the sub-indices for all the pollutants, select the highest sub-index as the overall AQI. This sub-index represents the current air quality level in your area.
*/