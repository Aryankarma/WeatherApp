import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data2 = [100,70,110,80,160,100,110,130,90,80,90,85,95]

const data = [
  {
    "uv": 100,
  },
  {
    "uv": 70,
  },
  {
    "uv": 110,
  },
  {
    "uv": 80,
  },
  {
    "uv": 160,
  },
  {
    "uv": 100,
  },
  {
    "uv": 110,
  },
  {
    "uv": 130,
  },
  {
    "uv": 90,
  },
  {
    "uv": 80,
  },
  {
    "uv": 90,
  },
  {
    "uv": 85,
  },
  {
    "uv": 95,
  }
]

export default function Graph() {

  const dataRender = data2.map((data)=>{
    return data;
  })

  return <div>
    <AreaChart width={730} height={150} data={data2 }      
    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#12171B" stopOpacity={1} />
        </linearGradient>
      </defs>
      {/* <XAxis axisLine={false} tick={{ fill: '#E1E1E1', fontSize: 16}} dataKey="name" /> */}
      {/* <YAxis axisLine={false} tick={false} /> */}
      {/* <Tooltip /> */}
      <Area type="monotone" dataKey={v=>data2} strokeWidth={3} stroke="#36A6F6" fillOpacity={1} fill="url(#colorUv1)" />
    </AreaChart>
  </div>
}  