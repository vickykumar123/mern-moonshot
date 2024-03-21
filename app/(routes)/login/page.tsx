"use client";

import Input from "@/components/ui/Input";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    let userData = {
      email,
      password,
    };
    try {
      setIsLoading(true);
      const res = await fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      if (data) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    // Make call to backend to create user
  }
  function handlePasswordToggle() {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  }

  return (
    <div className="w-full flex items-center justify-center p-3 mt-4 box-border">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 h-[614px] w-[576px] rounded-[20px] border-[1px] border-[#C1C1C1] space-y-10 flex flex-col items-center"
      >
        <div className="text-center text-[32px] font-[600] space-y-7">
          <section>Login</section>
          <section>
            <h2 className="text-[24px] font-[500]">
              Welcome back to ECOMMERCE
            </h2>
            <p className="text-[16px] font-[400]">
              The next gen business marketplace
            </p>
          </section>
        </div>

        <Input
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <div className="mb-6">
          <label
            className="  text-[16px] font-[400] mb-2 flex flex-col"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              className={`  shadow appearance-none border-[1px] border-[#C1C1C1] rounded-[6px] w-[459px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type={typePassword}
              placeholder="***********"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span
              className="absolute right-2 top-2 underline cursor-pointer"
              onClick={handlePasswordToggle}
            >
              {typePassword === "password" ? "Show" : "Hide"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-black text-white  p-2 rounded-md uppercase w-[456px] disabled:opacity-80"
            disabled={isLoading}
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
        </div>
        <hr className="border-[1px] border-[#C1C1C1] w-[456px]" />
        <div>
          <Link
            href="/register"
            className="text-center text-[16px] font-[400] hover:underline"
          >
            Don&apos;t have an Account?{" "}
            <span className="font-[500]">SIGN UP</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
