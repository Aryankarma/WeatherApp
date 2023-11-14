const daysStyle={
    display:"flex",
    width:"600px",
    justifyContent:"space-around",
    // alignItems:"center",
    background: "#151515",
    borderRadius: "35px",
    padding: "0 0.5rem",
    marginTop: "0.75rem"
}
const setMargin = {
    margin: ".5rem 0",
    fontSize: ".9rem"
}

export default function Axis({data}){
    return <div style={daysStyle}>
    {data.map((days)=>{
        return <p style={setMargin}>{days}</p>
    })}
    </div>
}