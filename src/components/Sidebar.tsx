"use client";
import React from "react";
import { Home, Compass, Bookmark, User, LogOut, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "@/redux/slices/userSlice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import isAuth from "@/IsCompAuth";
const Sidebar = () => {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="hidden md:flex flex-col justify-between border-r p-5 h-[90vh] w-[20%]">
        <div className="flex flex-col gap-1">
          <Link
            href={"/home"}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer ${
              pathname === "/home"
                ? "bg-[#0381ec] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Home /> Home
          </Link>
          <Link
            href={"/explore"}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer ${
              pathname === "/explore"
                ? "bg-[#0381ec] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Compass /> Explore
          </Link>
          <Link
            href={"/saved"}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer ${
              pathname === "/saved"
                ? "bg-[#0381ec] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Bookmark />
            Saved
          </Link>
          <Link
            href={`/profile/${user?.username}`}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer ${
              pathname === `/profile/${user?.username}`
                ? "bg-[#0381ec] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <User />
            Profile
          </Link>
        </div>
        <span
          onClick={() => {
            sessionStorage.removeItem("user");
            dispatch(LOGOUT());
            router.push("/login");
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer text-[#0381ec] border hover:bg-gray-200"
        >
          <LogOut />
          Logout
        </span>
      </div>
      <div className="md:hidden h-[7vh] border bg-white absolute bottom-0 w-full flex items-center justify-around z-[5]">
        <Link
          href={"/home"}
          className={`flex items-center gap-2 p-2 rounded-full cursor-pointer ${
            pathname === "/home"
              ? "bg-[#0381ec] text-white"
              : "hover:bg-gray-200"
          }`}
        >
          <Home />
        </Link>
        <Link
          href={"/explore"}
          className={`flex items-center gap-2 p-2 rounded-full cursor-pointer ${
            pathname === "/explore"
              ? "bg-[#0381ec] text-white"
              : "hover:bg-gray-200"
          }`}
        >
          <Compass />
        </Link>
        <Link
          href={"/addpost"}
          className={`flex items-center gap-2 p-2 rounded-full cursor-pointer ${
            pathname === "/addpost"
              ? "bg-[#0381ec] text-white"
              : "hover:bg-gray-200"
          }`}
        >
          <Plus />
        </Link>
        <Link
          href={"/saved"}
          className={`flex items-center gap-2 p-2 rounded-full cursor-pointer ${
            pathname === "/saved"
              ? "bg-[#0381ec] text-white"
              : "hover:bg-gray-200"
          }`}
        >
          <Bookmark />
        </Link>
        <Link
          href={`/profile/${user?.username}`}
          className={`flex items-center gap-2 p-2 rounded-full cursor-pointer ${
            pathname === `/profile/${user?.username}`
              ? "bg-[#0381ec] text-white"
              : "hover:bg-gray-200"
          }`}
        >
          <User />
        </Link>
      </div>
    </>
  );
};
export default isAuth(Sidebar);
