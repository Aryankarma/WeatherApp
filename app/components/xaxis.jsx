import styles from '../components/xaxisStyle.module.css';

export default function Axis({data, key}){
    return <div className={styles.daysStyle}>
    {data.map((days, index)=>{
        return <p key={index} className={styles.setMargin}>{days}</p>
    })}
    </div>
}