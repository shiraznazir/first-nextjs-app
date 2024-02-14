"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Toaster , toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [btnDisable, setBtnDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(email.length > 2){
            setBtnDisable(false)
        }
    }, [email])
    
    const onChangePassword = async () =>{
        
        try {
            setLoading(true);
            setBtnDisable(true);
            const response =  await axios.post("/api/users/forgotpassword", { email });
      
            if (response.data.status === 500) {
              toast.error("Forgot password Failed");
              setBtnDisable(false);
            } else {
              toast.success("Please check your email address to reset password");
              router.push("/login");
            }
          } catch (err: any) {
            setLoading(false);
            toast.error(err.message);
          } finally {
            setLoading(false);
          }
    }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
    <div className="sm:w-8/12 md:w-6/12 lg:w-4/12 p-4 border-2 rounded-3xl flex flex-col justify-center">
      <h1 className="text-lg font-bold text-center my-2">Forgot Password</h1>
      
      <label htmlFor="email">Enter Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={`my-4 bg-white rounded-lg p-[0.3rem] text-black ${
          btnDisable ? "opacity-25" : "opacity-100"
        }`}
        type="button"
        onClick={onChangePassword}
        disabled={btnDisable}
      >
        {loading ? "loading..." : "Get link"}
      </button>
      <Link className="text-center underline" href="/login">
        Visit login page
      </Link>
    </div>
    <Toaster position="top-right" />
  </div>
  )
}

export default ForgotPasswordPage