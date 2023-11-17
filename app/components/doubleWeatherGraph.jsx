import { useEffect } from 'react';
import { AreaChart, wrapperStyle, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const tooltipStyles = {
  borderRadius: "10px",
  backgroundColor: "#050505",
  padding: "0.75rem",
  boxShadow: "5px 5px 10px #111",
  fontWeight: 600
}


const graphName = {
  position: "absolute",
  top: "7.5px",
  zIndex : "2"
}

export default function Graph({data}){

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = '.recharts-surface { border-radius: 20px; }'; 
      document.head.appendChild(style);
    }
  }, []);

  function createUniqueKey() {
    const oldkey = Math.floor(Math.random()*100)
    return oldkey;    
  }
  
  const key = createUniqueKey();

  const CustomTooltip = (input) => {
    
    let day = "monday";
    let valueHigh = 0, valueLow = 0
    if(undefined !== data[input.label]){
      valueHigh = data[input.label].high
    }
    if(undefined !== data[input.label]){
      valueLow = data[input.label].low
    }

    switch (input.label) {
      case 0:
        day = "Monday"
      break;
      case 1:
        day = "Tuesday"
      break;
      case 2:
        day = "Wednesday"
      break;
      case 3:
        day = "Thursday"
      break;
      case 4:
        day = "Friday"
      break;
      case 5:
        day = "Saturday"
      break;
      case 6:
        day = "Sunday"
      break;
      default:
        break;
    }

    return <div style={tooltipStyles}>
      <p>{day}</p>
      <p style={{color: "#FF5912"}} >High : {valueHigh}</p>
      <p style={{color: "#90EE90"}} >Low :  {valueLow}</p>
    </div>;
  };
  

  return <div style={{position: "relative"}}>
    <span style={graphName}>7D forecast</span>
  <AreaChart key={key} width={600} height={125} data={data}
    margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
    <defs>        
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#1C1310" stopOpacity={1} />
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#161B16" stopOpacity={1} />
      </linearGradient> 
      </defs>
      <Tooltip animationDuration={1000} content={<CustomTooltip />} />
      <Area animationDuration={3000} type="monotone" key={key + 1} dataKey="high" strokeWidth={3} stroke="#FF5912" fillOpacity={1} fill="url(#colorUv)" />
      <Area animationDuration={3000} type="monotone" key={key + 2} dataKey="low" strokeWidth={3} stroke="#90EE90" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  </div>
}
