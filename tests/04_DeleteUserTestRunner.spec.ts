import { test, expect } from '@playwright/test';
import { userDelete } from '../services/UserDelete.service';

import * as dotenv from "dotenv";

// পরিবর্তন: override true যোগ করুন যাতে আপডেট হওয়া টোকেনটি ফাইল থেকে পায়
dotenv.config({ override: true });

test('Do Delete User API automation', async ({ request }) => {

  // process.env.token ব্যবহার করে লেটেস্ট টোকেনটি পাঠানো হচ্ছে
  let response = await userDelete(request, process.env.token);
  
  console.log("Delete Response:", response);

  // Assertion: নিশ্চিত হয়ে নিন আপনার API ঠিক এই মেসেজটিই দেয় কি না
  expect(response.message).toContain("User deleted successfully");
});


//1hr 42 min 12 second

