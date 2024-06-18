import { Area, AreaChart, Tooltip, XAxis, YAxis} from 'recharts';
import CustomTooltip from './tooltip';

interface Props{
    data: Data[];
    dataKey: string;
}

interface Data {
    name: string;
    value: number;
}
const RenderAreaChart = ({data, dataKey}: Props) => {
    return <AreaChart
            width={700}
            height={250}
            data={data}
            // style={{width: '100%'}}
        >
            <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="1%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="99%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" className='text-xs font-medium' />
            {/* <YAxis dataKey={dataKey} className='text-xs font-medium'/> */}
            <Area type={'bump'} dataKey={dataKey} stroke="#8884d8" fillOpacity={1} fill="url(#colorAmt)"/>
            <Tooltip allowEscapeViewBox={{x: true, y: true}} content={<CustomTooltip />}/>
        </AreaChart>
}
 
export default RenderAreaChart;