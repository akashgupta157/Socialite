"use client";
import React, { useEffect, useState } from "react";
import isAuth from "@/IsCompAuth";
import PostBox from "@/components/PostBox";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { configure } from "@/config/misc";
import axios from "axios";
import Posts from "@/components/Posts";
import { Spinner } from "flowbite-react";
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
const Home = () => {
  const user = useSelector((state: any) => state.user.user);
  const newPost = useSelector((state: any) => state.feed);
  const config = configure(user.token);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  async function fetchPosts() {
    setLoading(true);
    const { data } = await axios.get("/api/post?action=home", config);
    setPosts(data.posts);
    setLoading(false);
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    if (newPost) {
      const new_Post = { ...newPost.post, user };
      setPosts([new_Post, ...posts]);
    }
  }, [newPost]);
  return (
    <div className="max-h-[79vh] overflow-y-scroll scrollbar-none md:p-5 md:max-h-[90vh] md:w-[55%] border-r">
      {!isMobile && <PostBox />}
      {loading ? (
        <div className="flex justify-center items-center mt-40">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      ) : (
        <>
          {posts?.length === 0 ? (
            <h1 className="text-3xl font-bold p-5 md:pl-0">
              Welcome to Socialite!
            </h1>
          ) : (
            <div className="">
              {posts?.map((post: any) => (
                <Posts key={post._id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default isAuth(Home);
