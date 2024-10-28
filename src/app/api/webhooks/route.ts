import { db } from "@/app/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import Stripe from "stripe"

export async function POST(req : Request) {

    try {

        const body = await req.text()
        const signature = headers().get('stripe-signature')
    
        if (!signature) {
          return new Response('Invalid signature', { status: 400 })
        }
    
        const event = stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET!
        )
    
        if (event.type === 'checkout.session.completed') {
          if (!event.data.object.customer_details?.email) {
            throw new Error('Missing user email')
          }
    
          const session = event.data.object as Stripe.Checkout.Session
    
          const { userId, orderId } = session.metadata || {
            userId: null,
            orderId: null,
          }
    
          if (!userId || !orderId) {
            throw new Error('Invalid request metadata')
          }
    
          const billingAddress = session.customer_details!.address
          const shippingAddress = session.shipping_details!.address
    
          const updatedOrder = await db.order.update({
            where: {
              id: orderId,
            },
            data: {
              isPaid: true,
              ShippingAdress: {
                create: {
                  name: session.customer_details!.name!,
                  city: shippingAddress!.city!,
                  postalCode: shippingAddress!.postal_code!,
                  street: shippingAddress!.line1!,
                  state: shippingAddress!.state,
                },
              },
              billingAdress: {
                create: {
                  name: session.customer_details!.name!,
                  city: billingAddress!.city!,
                  postalCode: billingAddress!.postal_code!,
                  street: billingAddress!.line1!,
                  state: billingAddress!.state,
                },
              },
            },
          })
        console.log('the order is updated')
        return new Response(JSON.stringify({ result :event , ok : true}), {
            status: 200
        })
  
    }}catch (error) {
 
      console.error(error)

      return new Response(JSON.stringify({ message: "Server error" , ok : false }), {
        status: 500
      })   
    }
}