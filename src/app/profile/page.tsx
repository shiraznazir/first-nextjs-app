"use client";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast"; 

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("");

    const logout = async ()=>{
        try {
            const response = await axios.get('api/users/logout');
            if(response){
                toast.success("Logout Successfully");
                setTimeout(()=>{
                    router.push("login");
                }, 1000)
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const getUserDetails = async () =>{
        try {
            const response =  await axios.get('api/users/me');
            if(response){
                setData(response?.data?.data?._id);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getUserDetails();
    }, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-2">
            <h1>Profile</h1>
            <hr />
            <h1>Profile Page</h1>
            <hr />
            <h1 className="bg-green-500 rounded-lg py-2 px-4">{data ? data : "User not found"}</h1>
            <hr />
            <button className="mt-4 bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-xl" onClick={logout}>Logout</button>
            <Toaster position="top-right" />
        </div>
    )   
}