"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Axios } from "axios";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignUp = async () => {};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-4/12 p-4 border-2 rounded-3xl flex flex-col justify-center">
        <h1 className="text-lg font-bold text-center my-2">Signup</h1>
        <label htmlFor="username">Username</label>
        <input
          className="p-1 my-2 border-2 border-gray-200 rounded-lg text-black"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
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
          onClick={onSignUp}
        >
          Sign Up
        </button>
        <Link className="text-center underline" href="/login">
          Visit login page
        </Link>
      </div>
    </div>
  );
}
