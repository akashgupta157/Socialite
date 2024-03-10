"use client";
import axios from "axios";
import isAuth from "@/IsCompAuth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { configure } from "@/config/misc";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Suggestion = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const user = useSelector((state: any) => state.user.user);
  const config = configure(user.token);
  const fetchProfile = async () => {
    const { data } = await axios.get("/api/user/suggestion", config);
    setProfiles(data.suggestedUsers);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="hidden md:block w-[25%] p-5">
      <div className="border p-3 rounded">
        <h1 className="text-xl font-bold border-b pb-2">Popular Profile</h1>
        <div className="flex flex-col gap-3 mt-3 w-full">
          {profiles?.map((profile: any) => (
            <div
              key={profile._id}
              className="flex gap-2 cursor-pointer"
              onClick={() => router.push(`/profile/${profile.username}`)}
            >
              <Image
                src={profile.profilePicture}
                width={45}
                height={40}
                alt="avatar"
                className="rounded-full"
              />
              <div className="flex flex-col">
                <b>{profile.name}</b>
                <i className="text-sm ">{profile.username}</i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default isAuth(Suggestion);
