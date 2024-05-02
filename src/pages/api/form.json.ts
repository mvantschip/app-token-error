import type { APIRoute } from "astro";
import { db, Gasten } from 'astro:db';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const number = data.get("number");
  const name1 = data.get("name1");
  const name2 = data.get("name2");
  const name3 = data.get("name3");
  const name4 = data.get("name4");
  const email = data.get("email");
  
  //Data validation
  if (!number || !name1 || !email) {
    return new Response(
      JSON.stringify({
        message: "Placeholder",
      }),
      { status: 400 }
    );
  }

  if (number[0] == 2 && !name2) {
    return new Response(
      JSON.stringify({
        message: "Placeholder",
      }),
      { status: 400 }
    );
  }

  if (number[0] == 3) {
    if (!name2 || !name3) {
      return new Response(
        JSON.stringify({
          message: "Placeholder",
        }),
        { status: 400 }
      );
    } 
  }

  if (number[0] == 4) {
    if (!name2 || !name3 || !name4) {
      return new Response(
        JSON.stringify({
          message: "Placeholder",
        }),
        { status: 400 }
      );
    }
  }

  if (number[0] > 4) {
    return new Response(
      JSON.stringify({
        message: "Placeholder",
      }),
      { status : 400 }
    );
  }

  // Add registration to database

  await db.insert(Gasten).values({number, name1, name2, name3, name4, email})
  
  //Everything is in order
  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};