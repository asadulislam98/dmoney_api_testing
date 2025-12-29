import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs"; // ১. এটি যোগ করুন

dotenv.config();



export interface loginPayLoad {
  email: string;
  password: string;
}

export const loginURl = `${process.env.BASE_URL}/user/login`;

export async function loginRequest(request: APIRequestContext, payLoad: loginPayLoad) {
  const responseData = await request.post(loginURl, { data: payLoad });
  const resJSON = await responseData.json();

  // ২. যদি রেসপন্সে টোকেন থাকে, তবে তা .env ফাইলে সেভ করো
  if (resJSON.token) {
    const envPath = ".env";
    let envContent = fs.readFileSync(envPath, "utf8");

    // 'token=' এর পরের অংশটুকু নতুন টোকেন দিয়ে বদলে দাও
    const updatedEnvContent = envContent.replace(/token=.*/, `token=${resJSON.token}`);

    fs.writeFileSync(envPath, updatedEnvContent);
    
    // বর্তমান রান-টাইমেও টোকেনটি আপডেট করে দাও যাতে পরের স্টেপে ব্যবহার করা যায়
    process.env.token = resJSON.token;
  }

  return resJSON;
}

