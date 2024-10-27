import { db } from "@/app/db";

export async function POST(req : Request) {

    const body  = await req.json();
    console.log(body)
   // Connexion à la base de données
    try { 
      const updatedConfiguration = await db.configuration.update({
        where:{
          id : body.id
        },
        data :{
          model : body.model,
          color : body.color,
          material : body.material,
          finish : body.finish
        }})
          return new Response(JSON.stringify({ message: "Configuration updated" }), {
            status: 200,
          });
    
    } catch (error) {
      return new Response(JSON.stringify({ message: "Server error" }), {
        status: 500,
      });
    } 
  }