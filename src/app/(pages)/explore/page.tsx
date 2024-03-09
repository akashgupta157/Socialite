"use client";
import React, { useEffect, useState } from "react";
import isAuth from "@/IsCompAuth";
import axios from "axios";
import { useSelector } from "react-redux";
import { configure } from "@/config/misc";
import { Spinner } from "flowbite-react";
import Posts from "@/components/Posts";
interface Post {
  user: {
    _id: string;
    name: string;
    email: string;
    token: string;
  };
  content: string;
  hashtags: string[] | null;
  attachments: {
    publicId: string;
    url: string;
    _id: string;
  }[];
  likes: string[];
  comments: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const Explore = () => {
  const user = useSelector((state: any) => state.user.user);
  const config = configure(user.token);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  async function fetchPosts() {
    setLoading(true);
    const { data } = await axios.get("/api/post?action=explore", config);
    setPosts(data.posts);
    setLoading(false);
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="max-h-[79vh] overflow-y-scroll scrollbar-none md:p-5 md:max-h-[90vh] md:w-[55%] border-r">
      {loading ? (
        <div className="flex justify-center items-center mt-40">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      ) : (
        <div className="border-t">
          {posts.map((post) => (
            <Posts key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
export default isAuth(Explore);
