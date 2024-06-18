import { TbLoader3 } from "react-icons/tb";

const Loading = () => {
    return ( <>
        <div className='h-screen w-full grid place-content-center'>
            <TbLoader3 className="animate-spin w-10 h-10"/>
        </div>
    </> );
}
 
export default Loading;