"use client"
import AddNewSubscription from "@/components/add-new-subscription";
import Container from "@/components/container";
import Heading from "@/components/section-heading";
import SubscriptionTable from "@/components/sections/table/subscription-table";
import { getSubscriptions } from "@/actions/subscriptions";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
    const fetchData = async () => {
        const response = await getSubscriptions();
        return response?.data;
    }

    const {data, refetch} = useQuery({queryKey: ['subscriptions'], queryFn: fetchData, refetchOnWindowFocus: true});

    return ( <Container>
        <section className="space-y-10">
            <div className='flex items-center justify-between'>
                <Heading title={'Subscriptions'}/>
                <AddNewSubscription refetch={refetch} />
            </div>
            <main className="space-y-10">
                {data && <SubscriptionTable data={data} />}
            </main>
        </section>
    </Container> );
}
 
export default Page;