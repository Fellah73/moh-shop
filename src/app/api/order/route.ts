import { db } from "@/app/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const orderId = searchParams.get('orderId');

      if (!orderId) {
        return new Response(JSON.stringify({ success: false, message: 'Order ID is required' }), {
          status: 400,
        });
      }
  
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      console.log("the user is ",user)

     
    
      if (!user?.id || !user.email) {
        throw new Error('User not found you have to be logged in please');
      }
    
      console.log('lets get the order')

      const order = await db.order.findFirst({
        where: {
          id: orderId || '',
          userId: user.id,
        },
        include: {
          user: true,
          ShippingAdress: true,
          billingAdress: true,
          configuration: true,
        },
      });

      console.log('the order is ',order)
  
      if (!order) {
        return new Response(JSON.stringify({ message: "Order not found", success: false }), {
          status: 404,
        });
      }
  
      if (!order.isPaid) {
        return new Response(JSON.stringify({ success: false }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify({ message: "Order found", data : order, success: true }), {
        status: 200,
      });
    } catch (error) {

      console.error(error);
      
      return new Response(JSON.stringify({ message: "Server error", success: false }), {
        status: 500,
      });
    }
  }
  