"use client"
import AddNewSubscription from "@/components/add-new-subscription";
import Container from "@/components/container";
import Heading from "@/components/section-heading";
import SubscriptionSummary from "@/components/sections/summary/subscription-summary";
import { getSubscriptions } from "@/actions/subscriptions";
import { useQuery } from "@tanstack/react-query";
import RecentSubscriptions from "@/components/sections/recent/recent-subscriptions";
import MyServices from "@/components/sections/services/my-services";
import CategorySpendsPieChart from "@/components/analytics/category-spends";
import { getSpendsByMonths } from "@/actions/analytics";
import RenderAreaChart from "@/components/charts/area-chart";

const Page = () => {
    const fetchData = async () => {
        const response = await getSubscriptions();
        return response?.data;
    }
    
    const getData = async () => {
        const response = await getSpendsByMonths();
        return response?.data;
    }
    const {data, refetch} = useQuery({queryKey: ['subscriptions'], queryFn: fetchData, refetchOnWindowFocus: true});
    const {data: monthData} = useQuery({queryKey: ['monthly-spends'], queryFn: getData, refetchOnWindowFocus: true});
    
    return ( <Container>
        <section className="space-y-10">
            <div className='flex items-center justify-between'>
                <Heading title={'Dashboard'}/>
                <AddNewSubscription refetch={refetch} />
            </div>
            <main className="space-y-10">
                {data && <SubscriptionSummary data={data} />}
                <div className='grid grid-cols-2 gap-5'>
                    <RecentSubscriptions />
                    <CategorySpendsPieChart />
                </div>
                    {monthData && <RenderAreaChart data={monthData} dataKey="value" />}
                <MyServices />
            </main>
        </section>
    </Container> );
}
 
export default Page;