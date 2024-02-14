"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from "next/link";


const VerifyEmailPage = () => {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    
    const verifyUserEmail = async () =>{
        try {
            await axios.post("api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log("Error ", error.message);
        }
    } 

    useEffect(()=>{
        const tokenUrl = window.location.search.split("=")[1]; 
        setToken(tokenUrl || "");
    },[]);

    useEffect(()=>{
    
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token])


  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='mt-2 py-2 px-4 bg-orange-500 rounded-3xl text-black'>{token ? `${token}` : "No Token"}</h2>

        {verified && (
            <div>
                <h2 className='text-2xl'>Email Verified</h2>
                <Link href="/login" >Login</Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
            </div>
        )}
    </div>
  )
}

export default VerifyEmailPage