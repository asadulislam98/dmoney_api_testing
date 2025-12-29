import { test, expect } from '@playwright/test';
import { userUpdatePayload, userUpdate } from "../services/UserUpdate.service.ts";
import * as dotenv from "dotenv";

// পরিবর্তন: override true যোগ করুন যাতে আপডেট হওয়া টোকেনটি পায়
dotenv.config({ override: true });

test('Do Update User API automation', async ({ request }) => {

  const payload: userUpdatePayload = {
    name: "Anisu20 Islam53",
    email: "asadul.bcse1@gmail.com",
    password: "12345678",
    phone_number: "01709381049",
    nid: "4212520196",
    role: "Agent"
  };

  // process.env.token এর মাধ্যমে লেটেস্ট টোকেনটি পাঠানো হচ্ছে
  let response = await userUpdate(request, payload, process.env.token);
  
  console.log("Update Response:", response);

  // Assertion: নিশ্চিত হোন আপনার API ঠিক এই মেসেজটিই পাঠায় কি না
  expect(response.message).toContain("User updated");
});

