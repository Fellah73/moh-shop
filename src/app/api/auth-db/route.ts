import { db } from "@/app/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export  async function POST(req : Request) {
    try {
        
        const {getUser} = getKindeServerSession()
        const user = await getUser()

        const existingUser = await db.user.findUnique({
            where : {
              id : user.id
            }
          })

        if(!existingUser){
            await db.user.create({
                data :{
                    id : user.id,
                    email : user.email! 
                }
            })
        }

        return new Response(JSON.stringify({ success : true  , message : "User configured successfully"}), {
            status: 200
        });
    } catch (_error) {
        return new Response(JSON.stringify({ message: "Server error" }), {
            status: 500
        });
    }
}