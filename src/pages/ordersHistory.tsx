import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import OrderHistory from "@/components/OrderHistory";
import { OrdersType } from "../../type";


interface Props{
  orders:OrdersType;
}

function OrdersHistory({orders}:Props) {
    const { data: session } = useSession();
    console.log('items from strupe :',orders)
  return (
    <main className="max-w-screen-lg mx-auto p-10">
      {/* TITLE */}
      <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-300">
        Your Orders
      </h1>
      {session ? (
        <h2>{orders.length} Orders</h2>
        ) : (
        <h2>Please sign in to see your orders</h2>
        )}
        {/* SHOW ORDERS */}
      <div className="mt-5 space-y-4">
      {orders?.map(({id, amount, images, items, timestamp }:OrdersType) =>(
        <OrderHistory
        key={id}
        id={id}
        amount={amount}
        images={images} 
        items={items}
        timestamp={timestamp}  
        />))}
      </div>
    </main>
  )
}

export default OrdersHistory

export async function getServerSideProps(context:any){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    //GET DATA SESSION
    const session = await getSession(context);
    if (!session){
      return{
        props:{}
      }
    }else{
      const userEmail = session.user?.email;

      if (userEmail) {
        // GET DATA ORDERS FROM FIREBASE
        const q = query(collection(db, 'users', userEmail, 'orders'), orderBy('timestamp', "desc"));
        const StripeOrders = await getDocs(q)
    const orders = await Promise.all(
      StripeOrders.docs.map(async (order)=>({
        id:order.id,
        amount:order.data().amount,
        images:order.data().images,
        timestamp: order.data().timestamp.toDate().toISOString().split('T')[0],
        items : (
          await stripe.checkout.sessions.listLineItems(order.id, {
            limit:100,
          })
        ).data,
      }))
    );
  return {
    props:{orders}
  };
      }
}
}