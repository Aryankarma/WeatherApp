import Image from "next/image";
import { memo } from "react";
import styles from "../components/WeatherDetail.module.css";

const WeatherDetails = ({heading, logo, sub, value}) => {
    return <div  className={styles.detailBox}>
        <div className={styles.detailName}>

            {logo === "images/svgs/thermometer.svg" ? 
            <Image src={logo} height={28} width={12} alt="" /> :   // render with 24x12 if thermometer
            <Image src={logo} height={24} width={24} alt="" />     // render with 24x24 if not thermometer
            }

            <h1>{heading}</h1>
        </div>
        <div className={styles.value}>
            <h1>{value}<sub className={styles.sub}>{sub}</sub></h1>
        </div>
    </div>
}

export default memo(WeatherDetails); 