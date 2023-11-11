let greet = ""

const styles = {
    fontSize: "40px",
    fontStyle: "normal",
    fontWeight: 800,
    position: "absolute",
    top: "0",
    right: "0",
    padding: ".5rem 1rem",
    color: "#eee"  
}

export default function ({hour}){
    
    if(6 <= hour && hour < 12){
        greet = "Good morning"
    }else if(12 <= hour && hour < 17){
        greet = "Good afternoon"
    }else if(17 <= hour && hour < 22){
        greet = "Good evening"
    }else if(22 <= hour || hour < 6){
        greet = "Good night"
    }
    
    return <div style={styles}>
        <h1> {greet} </h1>
    </div>
}