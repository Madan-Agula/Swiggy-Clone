
import { RESTAURANTS_API } from "./Swiggyapi";


async function loginCredentials ({email,password}){    
    const data = await fetch(`${RESTAURANTS_API}login`,{
        method:"POST",
        headers:{
            'content-type' : 'application/json',
            'accept' :'application/json'
        },
        body:JSON.stringify({email,password})
       });
       let res = await data.json()
       return res;
   }

async function signUpCredentials({fullName,email,password}){
    const data = await fetch(`${RESTAURANTS_API}register`,{
        method:"POST",
        headers:{
            'content-type' : 'application/json',
            'accept' :'application/json'
        },
        body:JSON.stringify({fullName,email,password})
       });
       let res = await data.json()
       return res;
}

async function sendOtpCredentials(email){
    const data = await fetch(`${RESTAURANTS_API}sendotp`,{
        method:"POST",
        headers:{
            'content-type' : 'application/json',
            'accept' :'application/json'
        },
        body:JSON.stringify({email})
       });
       let res = await data.json()
       return res;
}

async function verifyOtpCredentials(id,otp){
    const data = await fetch(`${RESTAURANTS_API}verifyotp`,{
        method:"POST",
        headers:{
            'content-type' : 'application/json',
            'accept' :'application/json'
        },
        body:JSON.stringify({id,otp})
       });
       let res = await data.json()
       return res;
}

async function resetPassCredentials(id,password){
    const data = await fetch(`${RESTAURANTS_API}updatepassword`,{
        method:"PUT",
        headers:{
            'content-type' : 'application/json',
            'accept' :'application/json'
        },
        body:JSON.stringify({id,password})
       });
       let res = await data.json()
       return res;
}

async function verifyjwtToken(user){
    const data = await fetch(`${RESTAURANTS_API}verifyjwt`,{
        method:"POST",
        headers:{
            'content-type' : 'application/json',
            'accept' :'application/json'
        },
        body:JSON.stringify({token:user})
       });
    const res = await data.json()
    return res;
}

export{
    loginCredentials , 
    signUpCredentials,
    sendOtpCredentials,
    verifyOtpCredentials,
    resetPassCredentials,
    verifyjwtToken
}