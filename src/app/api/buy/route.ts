import { db } from "@/app/db";
import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";


export async function POST(req : Request) {

    console.log('buy route')
    const body =  await req.json()
    console.log('the id is ', body.id)
   
    try { 
      const configuration = await db.configuration.findUnique({
        where : {
          id: body.id
        }
      })
      if(!configuration){
        return new Response(JSON.stringify({ message: "Configuration not found" }), {
          status: 404,
        });
      }
      else{
        console.log('the configuration is found')
      }


      {/*  get user from kinde */}

      const {getUser} = getKindeServerSession()

      const user = await getUser()

      const { finish ,material} = configuration

      let price = BASE_PRICE

      if(finish === 'textured'){

        price = PRODUCTS_PRICES.finish.textured
      }else{

        price = PRODUCTS_PRICES.finish.smooth
      }

      if(material === 'silicone'){
        price += PRODUCTS_PRICES.material.silicone

      }else{
        price += PRODUCTS_PRICES.material.polycarbonate

      }
      
       console.log('the price is', price)

      let order : Order | undefined

      const existingOrder = await db.order.findFirst({
        where : {
            userId : user.id,
            configurationId : configuration.id          
        }
      })
      console.log('Order creation result:', existingOrder);

      if(!existingOrder)
        {

         console.log('lets create an order') 


          order = await db.order.create({
          data : {
            userId : user.id,
            configurationId : configuration.id,
            amount : parseFloat(price.toString())/100,
            isPaid : false,
            status : 'awaiting_shipping',
          }
        })
        
      }
      else{
        order = existingOrder
      }

      console.log('the order is', order)
      const product = await stripe.products.create({
        name : 'Custom iPhone Case',
        images : [configuration.imageUrl],
        default_price_data : {
          currency : 'usd',
          unit_amount : price ,
        }
      })

      const stripeSession = await stripe.checkout.sessions.create({
        success_url :`${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orederId=${order.id}`,
        cancel_url : `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
        payment_method_types : ['card','paypal'],
        mode :'payment',
        shipping_address_collection : {
          allowed_countries : ['DZ','TN','MA']
        },
        metadata : {
          userId :user.id,
          orderId : order.id,
        },
        line_items :[ {  price : product.default_price as string , quantity : 1  }]

      })

      return new Response(JSON.stringify({ url : stripeSession.url }), {
        status: 200,
      })
    
    } catch (error) {
      return new Response(JSON.stringify({ message: "Server error" }), {
        status: 500,
      });
    } 
  }