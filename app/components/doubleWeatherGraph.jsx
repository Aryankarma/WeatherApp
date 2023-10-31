import { Rectangle, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    "uv": 100,
    "pv": 60,
  },
  {
    "uv": 70,
    "pv": 45,
  },
  {
    "uv": 95,
    "pv": 60,
  },
  {
    "uv": 90,
    "pv": 70,
  },
  {
    "uv": 110,
    "pv": 90,
  },
  {
    "uv": 90,
    "pv": 65,
  },
  {
    "uv": 70,
    "pv": 50,
  }
]

const fixSize = {
  width:"730px",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
} 

export default function Graph() {
  return <div style={fixSize}>
    <AreaChart width={730} height={150} data={data}
      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <defs>        
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#1C1310" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#161B16" stopOpacity={1} />
        </linearGradient> 
      </defs>
      <Area type="monotone" dataKey="uv" strokeWidth={3} stroke="#FF5912" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="pv" strokeWidth={3} stroke="#90EE90" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  </div>
}
