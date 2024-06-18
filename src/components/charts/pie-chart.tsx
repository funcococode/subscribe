import { TbCurrencyRupee } from 'react-icons/tb';
import { LabelList, Pie, PieChart, Cell, Tooltip, type TooltipProps } from 'recharts';
import CustomTooltip from './tooltip';
const COLORS = ['#3b82f6', '#14b8a6', '#a855f7', '#f43f5e','#84cc16','#f59e0b','#4338ca'];

interface Props{ 
    data: Data[];
    key: string;
}

interface Data{
    name: string;
    value: number
}

const RenderPieChart = ({data, key} : Props) => {
    return <>
        <PieChart style={{width: '100%'}} width={100} height={250}>
            <Pie data={data} dataKey={key} nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={120} fill="#82ca9d" >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <LabelList position={'outside'} dataKey='name' className='font-thin text-sm stroke-black fill-black transition-all' offset={10} />
            </Pie>
            <Tooltip allowEscapeViewBox={{x: true, y: true}} content={<CustomTooltip />}/>
        </PieChart>
    </>
}


export default RenderPieChart;