import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    "name": "Mon",
    "uv": 100,
    "pv": 60,
  },
  {
    "name": "Tue",
    "uv": 70,
    "pv": 45,
  },
  {
    "name": "Wed",
    "uv": 95,
    "pv": 60,
  },
  {
    "name": "Thu",
    "uv": 90,
    "pv": 70,
  },
  {
    "name": "Fri",
    "uv": 110,
    "pv": 90,
  },
  {
    "name": "Sat",
    "uv": 90,
    "pv": 65,
  },
  {
    "name": "Sun",
    "uv": 70,
    "pv": 50,
  }
]

export default function Graph() {
  return <div>
    <AreaChart width={600} height={150} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>        
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#1C1310" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#161B16" stopOpacity={1} />
        </linearGradient> 
      </defs>
      <YAxis axisLine={false} tick={false} />
      <XAxis axisLine={false} tick={{ fill: '#E1E1E1', fontSize: 16}} dataKey="name" />
      {/* <Tooltip /> */}
      <Area type="monotone" dataKey="uv" strokeWidth={3} stroke="#FF5912" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="pv" strokeWidth={3} stroke="#90EE90" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  </div>
}  
