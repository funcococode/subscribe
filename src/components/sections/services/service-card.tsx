import { Badge } from "@/components/ui/badge";
import BrandLogo from "../table/brand-logo";
import { TbListDetails } from "react-icons/tb";

interface Props{
    name: string;
    description: string;
    category: string;
    count: number;
};
const ServiceCard = ({name, description = '', category = '', count = 0}: Props) => {
    return ( <>
        <div className="border p-3 rounded-lg flex flex-col justify-between gap-4 hover:scale-95 transition-all cursor-pointer hover:border-purple-500 group">
            <div className='flex items-center justify-between'>
                <div className="w-fit bg-purple-500/20 p-2 rounded-lg text-3xl">
                    <BrandLogo brandname={name}/>
                </div>
                <Badge className="px-2 py-1 text-[11px] bg-transparent text-gray-400 shadow-none group-hover:text-gray-900">{category}</Badge>
            </div>
            <div className="space-y-1">
                <h1 className='font-bold'>
                    {name}
                </h1>
                <p className="text-xs text-gray-500">
                    {description}
                </p>
            </div>
            <div className="flex justify-between items-center">
                <span className="invisible group-hover:visible scale-0 group-hover:scale-100 transition-all origin-center text-purple-500">
                    <TbListDetails />
                </span>
                <p className="font-bold text-xl text-emerald-500">
                    {count}
                </p>
            </div>
        </div>
    </> );
}
 
export default ServiceCard;