"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Toaster , toast } from "react-hot-toast";
import axios from 'axios';
import { useRouter } from "next/navigation";

const VerifyForgotPasswordPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState({
        newpassword: "",
        verifypassword: "",
    })
    const [token, setToken] = useState("");
    const [btnDisable, setBtnDisable] = useState(true); 
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(password.newpassword.length > 2 && password.verifypassword.length > 2){
            setBtnDisable(false);
            token === "" &&  toast.error("No Token");
        }
    },[password])

    useEffect(()=>{
        const tokenUrl = window.location.search.split("=")[1]; 
        setToken(tokenUrl || "");
    },[]);

    const onChangePassword = async() =>{
        try {
            setLoading(true);
            setBtnDisable(true);
            const newpassword = password?.newpassword;
            const response = await axios.post("api/users/verifyforgotpassword", { token, newpassword});
            if (response.data.status === 500) {
              toast.error("Signup Failed");
              setBtnDisable(false);
            }else{
              toast.success("Reset Password successfully");
              router.push("/login");
            }
          } catch (err: any) {
            console.log("Reset Password Failed ", err);
            setLoading(false);
            toast.error(err.message);
          } finally {
            setLoading(false);
          }
    }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="sm:w-8/12 md:w-6/12 lg:w-4/12 p-4 border-2 rounded-3xl flex flex-col justify-center">
        <h1 className="text-lg font-bold text-center my-2">Change password</h1>
        
        <label htmlFor="username">New Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={password.newpassword}
          onChange={(e) => setPassword({ ...password, newpassword: e.target.value })}
        />
        <label htmlFor="username">Verify Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={password.verifypassword}
          onChange={(e) => setPassword({ ...password, verifypassword: e.target.value })}
        />
        <button
          className={`my-4 bg-white rounded-lg p-[0.3rem] text-black ${
            btnDisable ? "opacity-25" : "opacity-100"
          }`}
          type="button"
          onClick={onChangePassword}
          disabled={btnDisable}
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
        <Link className="text-center underline" href="/login">
          Visit login page
        </Link>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}

export default VerifyForgotPasswordPage