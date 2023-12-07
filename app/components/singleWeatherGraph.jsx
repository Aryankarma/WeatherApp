import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../components/trycss.css"

const tooltipStyles = {
  borderRadius: "10px",
  backgroundColor: "#050505",
  padding: "0.75rem",
  boxShadow: "5px 5px 10px #111",
  fontWeight: 600,
}

const graphName = {
  position: "absolute",
  top: "7.5px",
  zIndex : "2"
}


export default function Graph({data}) {
  
  function createUniqueKey() {
    const oldkey = Math.floor(Math.random()*100)
    return oldkey;    
  }

  const key = createUniqueKey();

  const CustomTooltip = (input) => {
    
    let hour = "";
    let valueHour = 0
    if(undefined !== data[input.label]){
      valueHour = data[input.label].value
    }

    switch (input.label) {
      case 0:
        hour = "12AM"
      break;
      case 1:
        hour = "1AM"
      break;
      case 2:
        hour = "2AM"
      break;
      case 3:
        hour = "3AM"
      break;
      case 4:
        hour = "4AM"
      break;
      case 5:
        hour = "5AM"
      break;
      case 6:
        hour = "6AM"
      break;
      case 7:
        hour = "7AM"
      break;
      case 8:
        hour = "8AM"
      break;
      case 9:
        hour = "9AM"
      break;
      case 10:
        hour = "10AM"
      break;
      case 11:
        hour = "11AM"
      break;
      case 12:
        hour = "12PM"
      break;
      case 13:
        hour = "1PM"
      break;
      case 14:
        hour = "2PM"
      break;
      case 15:
        hour = "3PM"
      break;
      case 16:
        hour = "4PM"
      break;
      case 17:
        hour = "5PM"
      break;
      case 18:
        hour = "6PM"
      break;
      case 19:
        hour = "7PM"
      break;
      case 20:
        hour = "8PM"
      break;
      case 21:
        hour = "9PM"
      break;
      case 22:
        hour = "10PM"
      break;
      case 23:
        hour = "11PM"
      break;
      case 24:
        hour = "12PM"
      break;
    
      default:
        break;
    }

   return <div style={tooltipStyles}>
      <p>{hour}</p>
      <p style={{color: "#36A6F6"}} >Hourly temp: {valueHour}</p>
    </div>;
  };

  return <div style={{position:"relative"}}>
    <span style={graphName}>24hr forecast</span>
    <AreaChart width={600} height={105} key={key} data={data}
    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#12171B" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Tooltip animationDuration={1000} content={<CustomTooltip />} />
      <Area animationDuration={3000} type="monotone" key={key} dataKey="value" strokeWidth={3} stroke="#36A6F6" fillOpacity={1} fill="url(#colorUv1)" />
    </AreaChart>
  </div>
}  