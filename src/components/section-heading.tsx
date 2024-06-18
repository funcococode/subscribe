interface HeadingProps{
    title: string;
}
const Heading = ({title}: HeadingProps) => {
    return ( <>
        <h1 className="font-medium text-2xl">{title}</h1>
    </> );
}
 
export default Heading;