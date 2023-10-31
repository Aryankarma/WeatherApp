// const data=["Mon", "Tue","Wed","Thu","Fri","Sat","Sun"]
// const data2 = []

const daysStyle={
    display:"flex",
    width:"730px",
    justifyContent:"space-between",
    alignItems:"center",

}

export default function Axis({data}){
    return <div style={daysStyle}>
    {data.map((days)=>{
        return <p>{days}</p>
    })}
    </div>
}