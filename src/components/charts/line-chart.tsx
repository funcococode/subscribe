import {Line, LineChart, XAxis, YAxis } from 'recharts';

interface Props{
    data: Data[];
    dataKey: string;
}

interface Data {
    date: string;
    value: number;
}

const RenderLineChart = ({data, dataKey}: Props) => {
    return <LineChart width={700} height={250} data={data}>
        <XAxis dataKey="date" className='text-xs'/>
        <YAxis dataKey='value' className='text-xs'/>
        <Line type="bump" dataKey={dataKey} stroke="#82ca9d"/>
    </LineChart>
}
 
export default RenderLineChart;