/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import loginImage from "@/images/login.png";
import { LockKeyhole, Eye, EyeOff, AlertCircle, AtSign } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LOGIN } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
const Image = React.lazy(() => import("next/image"));
import { Spinner } from "flowbite-react";
interface UserInput {
  name: string;
  email: string;
  password: string;
}
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>();
  const dispatch = useDispatch();
  const onSubmit = async (Data: UserInput) => {
    setLoading(true);
    const { data } = await axios.post("/api/auth/login", Data);
    setLoading(false);
    if (data.success) {
      toast.success(data.message, {
        duration: 1500,
        position: "top-center",
        style: {
          backgroundColor: "#17C60D",
          color: "white",
        },
        iconTheme: {
          primary: "white",
          secondary: "#17C60D",
        },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, token: data.token })
      );
      dispatch(LOGIN({ ...data.user, token: data.token }));
      router.push("/home");
    } else {
      toast.error(data.message, {
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "#E03615",
          color: "white",
        },
        iconTheme: {
          primary: "white",
          secondary: "#E03615",
        },
      });
    }
  };
  return (
    <>
      <div className="flex md:h-[100vh] h-[90vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-3 md:w-[50%] m-auto flex flex-col justify-center items-center"
        >
          <h1 className="text-3xl w-full font-medium max-w-xs pb-1 mb-2 border-b-2 border-blue-500">
            Login
          </h1>
          <label className="w-full max-w-xs" htmlFor="email">
            <p className={`${errors.email && "text-red-700"}`}>
              Email :
            </p>
            <div
              className={`flex items-center border rounded-md px-3 py-1 transition duration-300 ease-in-out focus-within:border-black focus-within:border focus-within:text-[#0d0c22] border-gray-400 text-gray-600 ${
                errors.email && "border-red-700 focus-within:border-red-700 "
              }`}
            >
              <AtSign />
              <input
                type="text"
                id="email"
                className="w-full border-transparent focus:border-transparent focus:ring-0"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="flex gap-2 items-center text-red-700 font-medium mt-1 text-sm">
                <AlertCircle size={"20px"} />
                {errors.email.message}
              </p>
            )}
          </label>
          <label className="form-control w-full max-w-xs" htmlFor="password">
            <p className={`${errors.password && "text-red-700"}`}>Password :</p>
            <div
              className={`flex items-center border rounded-md px-3 py-1 transition duration-300 ease-in-out focus-within:border-black focus-within:border focus-within:text-[#0d0c22] border-gray-400 text-gray-600 ${
                errors.password && "border-red-700 focus-within:border-red-700 "
              }`}
            >
              <LockKeyhole />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border-transparent focus:border-transparent focus:ring-0"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password must not exceed 10 characters",
                  },
                })}
              />
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            {errors.password && (
              <p className="flex gap-2 items-center text-red-700 font-medium mt-1 text-sm">
                <AlertCircle size={"20px"} />
                {errors.password.message}
              </p>
            )}
          </label>
          <button
            className={`${
              loading
                ? "cursor-not-allowed bg-blue-400"
                : "cursor-pointer bg-blue-500 hover:bg-blue-600"
            } w-40 py-3 rounded-md text-white`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  color="info"
                  aria-label="Info spinner example"
                  size={"sm"}
                  className="mr-3"
                />
                <span>Loading...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
          <p className="w-full max-w-xs">
            Don't have an account?{" "}
            <Link href={"/register"} className="underline text-blue-700">
              Register
            </Link>
          </p>
        </form>
        <div className="w-[50%] hidden md:flex justify-center items-center bg-blue-100">
          <Image
            src={loginImage}
            alt="loginImage"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </>
  );
}
