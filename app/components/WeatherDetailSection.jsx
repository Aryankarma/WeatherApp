import styles from "../components/WeatherDetail.module.css";

export default function WeatherDetails({heading, logo, sub, value}){
    return <div className={styles.detailBox}>
        <div className={styles.detailName}>
            <img src={logo} alt="" />
            <h1>{heading}</h1>
        </div>
        <div className={styles.value}>
            <h1>{value}<sub className={styles.sub}>{sub}</sub></h1>
        </div>
    </div>
}