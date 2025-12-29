import { test, expect } from '@playwright/test';
import { userCreatePayLoad, userCreate } from "../services/UserCreate.service.ts";
import * as dotenv from "dotenv";

// পরিবর্তন: override true করা হয়েছে
dotenv.config({ override: true }); 

test('Do Create User API automation', async ({ request }) => {
  const payload: userCreatePayLoad = {
    name: "anishaa anni",
    email: "abiranniaa@gmail.com",
    password: "122234aadd",
    phone_number: "01765432323",
    nid: "53225201122",
    role: "Agent"
  }; //faker use korte hbe must real api test er khetre 

  // এখানে process.env.token ঠিক আছে
  let response = await userCreate(request, payload, process.env.token);
  console.log(response);
  
  expect(response.message).toContain( "User created"); // আপনার API অনুযায়ী মেসেজ চেক করুন
});

