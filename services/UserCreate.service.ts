import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
export interface userCreatePayLoad {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  nid: string;
  role: string;
}

const create_User_Url = `${process.env.BASE_URL}/user/create`;

export async function userCreate(request: APIRequestContext, payLoad: userCreatePayLoad, token?: string) {
  const responseData = await request.post(create_User_Url, {
    data: payLoad,
    headers: {
      // এখানে token সরাসরি আর্গুমেন্ট হিসেবে আসছে
      "Authorization": "bearer " + token, 
      "X-AUTH-SECRET-KEY": "ROADTOSDET"
    }
  });

  // পরিবর্তন: এখানে অবশ্যই 'await' ব্যবহার করতে হবে
  const resJSON = await responseData.json(); 

// id সেভ করার লজিক
  if (resJSON.user && resJSON.user.id) { // ধরি রেসপন্সে id টা user অবজেক্টের ভেতর থাকে
    const envPath = ".env";
    let envContent = fs.readFileSync(envPath, "utf8");
    
    // id= এর জায়গায় নতুন id বসানো হচ্ছে
    envContent = envContent.replace(/id=.*/, `id=${resJSON.user.id}`);
    
    fs.writeFileSync(envPath, envContent);
    process.env.id = resJSON.user.id.toString(); 

  }




  return resJSON;
}
