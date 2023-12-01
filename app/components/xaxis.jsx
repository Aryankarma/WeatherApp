const daysStyle={
    display:"flex",
    width:"600px",
    justifyContent:"space-around",
    // alignItems:"center",
    background: "#151515",
    borderRadius: "35px",
    padding: "0 0.25rem",
    marginTop: "0.5rem",
    fontWeight: 100,
}
const setMargin = {
    margin: ".2rem 0",
    fontSize: ".75rem",
}

export default function Axis({data}){
    return <div style={daysStyle}>
    {data.map((days)=>{
        return <p style={setMargin}>{days}</p>
    })}
    </div>
}