"use client";
import React from "react";
import isAuth from "@/IsCompAuth";
import PostBox from "@/components/PostBox";
import { redirect } from "next/navigation";
import { useMediaQuery } from "react-responsive";
const AddPost = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  if (!isMobile) {
    return redirect("/home");
  }
  return <>{isMobile && <PostBox />}</>;
};
export default isAuth(AddPost);
