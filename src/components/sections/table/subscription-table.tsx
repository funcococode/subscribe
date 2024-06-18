
import { DataTable } from "./data-table";
import { columns, Subscription } from "./columns";

const SubscriptionTable = ({data}: {data: Subscription[]}) => {
    return ( <>
        {data ? <DataTable data={data} columns={columns} /> : ''}
    </> );
}
 
export default SubscriptionTable;