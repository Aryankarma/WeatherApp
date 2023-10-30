import styles from "../components/weatherDetail.module.css";

export default function WeatherDetails(){
    return <div className={styles.detailBox}>
        <div className={styles.detailName}>
            <img  src="images/svgs/thermometer.svg" alt="" />
            <h1>Feels like</h1>
        </div>
        <div className={styles.value}>
            <h1>31°<sub>{}</sub></h1>
        </div>
    </div>
}