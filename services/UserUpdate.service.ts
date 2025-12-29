import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export interface userUpdatePayload {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  nid: string;
  role: string;
}

// process.env.id ব্যবহার করুন
  const update_User_Url = `${process.env.BASE_URL}/user/update/${process.env.id}`;

export async function userUpdate(request: APIRequestContext, payLoad: userUpdatePayload, token?: string) {
  const responseData = await request.put(update_User_Url, {
    data: payLoad,
    headers: {
      "Authorization": "bearer " + token,
      "X-AUTH-SECRET-KEY": "ROADTOSDET"
    }
  });

  // পরিবর্তন: এখানে 'await' যোগ করতে হবে
  const resJSON = await responseData.json(); 
  return resJSON;
}
