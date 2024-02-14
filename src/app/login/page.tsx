"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);

  const onLogin = async () => {
    try {
      setLoading(true);
      setBtnDisable(true);
      const response = await axios.post("api/users/login", user);

      if (response.data.status === 500) {
        toast.error("Login Failed");
        setBtnDisable(false);
      } else {
        toast.success("Login successfully");
        router.push("/profile");
      }
    } catch (err: any) {
      console.log("Sign up Failed ", err);
      setLoading(false);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 2 && user.password.length > 2) {
      setBtnDisable(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="sm:w-8/12 md:w-6/12 lg:w-4/12 p-4 border-2 rounded-3xl flex flex-col justify-center">
        <h1 className="text-lg font-bold text-center my-2">Login</h1>
        <label htmlFor="email">Email</label>
        <input
          className="p-1 my-2 border-2 border-gray-200 rounded-lg text-black"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="username">Password</label>
        <input
          className="p-1 my-2 border-2 border-gray-200 rounded-lg text-black"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="my-4 bg-white rounded-lg p-[0.3rem] text-black"
          type="button"
          onClick={onLogin}
          disabled={btnDisable}
        >
          {loading ? "Processing..." : "Login"}
        </button>
        <Link
          className="text-center"
          href="/forgotpassword"
        >
          Forgot Password?
        </Link>
        {/* <button onClick={handleForgotPassword}></button> */}
        <div className="mt-4 flex flex-col justify-center items-center">
          <Link
            className="w-6/12 py-2 px-12 rounded-lg text-center bg-green-800"
            href="/signup"
          >
            Signup
          </Link>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
