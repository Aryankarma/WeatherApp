import { Rectangle, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fixSize = {
  width:"730px",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  borderRadius: "30px"
} 

export default function Graph({data}){
  return <div style={fixSize}>
    <AreaChart borderRadius={"35px"} width={731} height={150} data={data}
      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <defs>        
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#1C1310" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#161B16" stopOpacity={1} />
        </linearGradient> 
      </defs>
      <Area type="monotone" dataKey="high" strokeWidth={3} stroke="#FF5912" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="low" strokeWidth={3} stroke="#90EE90" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  </div>
}
