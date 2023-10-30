import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    "name": "12pm",
    "uv": 100,
  },
  {
    "name": "1am",
    "uv": 70,
  },
  {
    "name": "2am",
    "uv": 110,
  },
  {
    "name": "3am",
    "uv": 80,
  },
  {
    "name": "4am",
    "uv": 160,
  },
  {
    "name": "5am",
    "uv": 100,
  },
  {
    "name": "6am",
    "uv": 110,
  },
  {
    "name": "7am",
    "uv": 130,
  },
  {
    "name": "8am",
    "uv": 90,
  },
  {
    "name": "9am",
    "uv": 80,
  },
  {
    "name": "10am",
    "uv": 90,
  },
  {
    "name": "11am",
    "uv": 85,
  },
  {
    "name": "12am",
    "uv": 95,
  }
]

export default function Graph() {
  return <div>
    <AreaChart outerRadius={10} width={730} height={150} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#12171B" stopOpacity={1} />
        </linearGradient>
      </defs>
      <XAxis axisLine={false} tick={{ fill: '#E1E1E1', fontSize: 16}} dataKey="name" />
      <YAxis axisLine={false} tick={false} />
      {/* <Tooltip /> */}
      <Area type="monotone" dataKey="uv" strokeWidth={3} stroke="#36A6F6" fillOpacity={1} fill="url(#colorUv1)" />
    </AreaChart>
  </div>
}  


/*

stroke width


*/