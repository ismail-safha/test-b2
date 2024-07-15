"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../components/Input";

export default function RegisterForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const register = async () => {
    setLoading(true);
    try {
      await fetch("/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast.success("Successfully registered");

      router.push("/login");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
              Register User
            </h1>
            <div className="space-y-4 md:space-y-6">
              <Input
                label="name"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
                disabled={loading}
              />
              <Input
                label="Email"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                disabled={loading}
              />
              <div className="relative">
                <Input
                  label="Password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  disabled={loading}
                  type={showPassword ? "text" : "password"}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.147A11.99 11.99 0 0112 4.5c3.337 0 6.388 1.344 8.475 3.65m-1.752 9.326A11.978 11.978 0 0112 19.5c-3.338 0-6.389-1.345-8.476-3.65M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 2.25l19.5 19.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.613 5 12 5c4.386 0 8.268 2.943 9.542 7-.98 2.907-3.487 5.229-6.458 5.75"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div
                onClick={register}
                className="px-10 py-3 text-center bg-neutral-900 rounded-full text-white disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="flex-shrink-0 m-auto animate-spin w-6 h-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                  </svg>
                ) : (
                  // "Login..."
                  "Register"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

//====
