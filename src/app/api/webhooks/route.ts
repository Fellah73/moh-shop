import { db } from "@/app/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import Stripe from "stripe"

export async function POST(req : Request) {

    try {

        const body = await req.text()
        const signature = headers().get("stripe-signature")

        if(!signature) {
            return new Response(JSON.stringify({ message: "Missing signature" }), {
               status: 400 
            })
        }

        {/* recupére le webhook from stripe */}

        const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

        if(event.type === "checkout.session.completed"){
            if(!event.data.object.customer_details?.email) {
                throw new Error("Missing user email")
            }
        } 
          
        {/*  recupére les informations de la session */}

        const session = event.data.object as Stripe.Checkout.Session
        const { userId,orederId} = session.metadata  || {
            userId : null,
            orederId : null
        }

         {/*  recupere les billingAdress et shippingAdress */}

        const shippingAdress = session.shipping_details!.address 
        const billingAdress = session.customer_details!.address

         {/*  update of tables */}

        {/* update db  isPaid , create the ShippingAdress and BillingAdress ids in the order and the entites in their original tables */}

        const updatedOrder = await db.order.update({
            where : {
                id : orederId!
            },
            data : {
                isPaid : true,
                ShippingAdress : {
                    create : {
                        name : session.customer_details!.name!,
                        city : shippingAdress!.city!,
                        postalCode : shippingAdress!.postal_code!,
                        street : shippingAdress!.line1!,
                        state : shippingAdress!.state!
                        
                    }
                },
                billingAdress : {
                    create : {
                        name : session.customer_details!.name!,
                        city : billingAdress!.city!,
                        postalCode : billingAdress!.postal_code!,
                        street : billingAdress!.line1!,
                        state : billingAdress!.state!
                        
                    }
                },
            }
        })

        return new Response(JSON.stringify({ result :event , ok : true}), {
            status: 200
        })
  
    }catch (error) {
 
      console.error(error)

      return new Response(JSON.stringify({ message: "Server error" , ok : false }), {
        status: 500
      })   
    }
}