import { test, expect } from '@playwright/test';
import { loginRequest,loginPayLoad} from "../services/login.service.ts"


test('Do login API automation', async ({ request }) => {

 const payLoad={

    email : "admin@dmoney.com",
    password:"1234"
 }

  let response=await loginRequest(request ,payLoad);
  console.log(response)
  //assertion kore dekhi :
  expect(response.message).toContain("Login successful")
  //execute korar shomoy jei token ta pai resonse e seta amra kokhono json file e rakhbona karon token ta hoilo sensitive
  //eta rakhbo always .env file e.
  //.env file er vetor amra token gula save kore rakhte pari
  //subidha hoilo github e push korar somoy .env ta k .gitignore e rekhe diben.


  
 
});


