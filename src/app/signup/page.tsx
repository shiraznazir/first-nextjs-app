"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { Toaster , toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [btnDisable, setBtnDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      setBtnDisable(true);
      const response = await axios.post("api/users/signup", user);
      // if (response) {
      //   toast.success("User created successfully");
      //   setTimeout(() => {
      //       router.push("/login");
      //     }, 1000);
      // }
      if (response.data.status === 500) {
        toast.error("Signup Failed");
        setBtnDisable(false);
      }else{
        toast.success("User created successfully");
        router.push("/login");
      }
    } catch (err: any) {
      console.log("Sign up Failed ", err);
      setLoading(false);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="sm:w-8/12 md:w-6/12 lg:w-4/12 p-4 border-2 rounded-3xl flex flex-col justify-center">
        <h1 className="text-lg font-bold text-center my-2">Signup</h1>
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="username">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className={`my-4 bg-white rounded-lg p-[0.3rem] text-black ${
            btnDisable ? "opacity-25" : "opacity-100"
          }`}
          type="button"
          onClick={onSignUp}
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
  );
}
