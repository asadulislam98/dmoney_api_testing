import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();


const delete_User_Url = `${process.env.BASE_URL}/user/delete/${process.env.id}`;

export async function userDelete(request: APIRequestContext, token?: string) {
    const responseData = await request.delete(delete_User_Url, { 
        headers: {
            "Authorization": "bearer " + token,
            "X-AUTH-SECRET-KEY": "ROADTOSDET"
        }
    });

    // এখানে 'await' যোগ করা হয়েছে, এটি ছাড়া ডাটা পাবেন না
    const resJSON = await responseData.json(); 
    return resJSON;
}
