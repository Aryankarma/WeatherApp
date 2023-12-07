import styles from '../components/xaxisStyle.module.css';

export default function Axis({data}){
    return <div className={styles.daysStyle}>
    {data.map((days)=>{
        return <p className={styles.setMargin}>{days}</p>
    })}
    </div>
}