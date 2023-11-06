import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Graph({data}) {
  return <div>
    <AreaChart width={730} height={150} data={data}
    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#12171B" stopOpacity={1} />
        </linearGradient>
      </defs>
      {/* <XAxis axisLine={false} tick={{ fill: '#E1E1E1', fontSize: 16}} dataKey="name" /> */}
      {/* <YAxis axisLine={false} tick={false} /> */}
      {/* <Tooltip /> */}
      <Area type="monotone" dataKey="value" strokeWidth={3} stroke="#36A6F6" fillOpacity={1} fill="url(#colorUv1)" />
    </AreaChart>
  </div>
}  