import { TbCurrencyRupee } from "react-icons/tb";
import type { TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload } : TooltipProps<number, string>) => {
    if (active && payload?.length) {
        const name = payload?.[0]?.name
        const value = payload?.[0]?.value
        return (
            <div className="shadow-xl shadow-gray-500/50 bg-black rounded-lg p-3 space-y-2 text-white">
                <h1 className='font-light text-xs'>Total spends on <span className='font-bold'>{name}</span></h1>
                <p className="text-base flex items-center font-semibold">
                    <TbCurrencyRupee className='w-5 h-5'/>
                    {value}
                </p>
            </div>
        );
    }
  
    return null;
};

export default CustomTooltip;