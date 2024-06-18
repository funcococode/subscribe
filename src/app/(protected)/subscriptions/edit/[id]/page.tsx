interface Props{
    params: {
        id: string;
    }
}

const Page = ({params}: Props) => {
    const subscriptionId = params?.id;
    return ( <>
        {subscriptionId}
    </> );
}
 
export default Page;