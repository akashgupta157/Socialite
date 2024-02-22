import axios from "axios";
import Image from "next/image";
import isAuth from "@/IsCompAuth";
import { formatHashtags, formatNumber } from "../config/misc";
import React, { useEffect, useState } from "react";
import { configure, timeAgo } from "../config/misc";
import { LOGIN } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Bookmark,
  Dot,
  Heart,
  MessageCircle,
  MoreVertical,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ImageGrid from "./ImageGrid";
import toast from "react-hot-toast";
const Posts = (props: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { post } = props;
  const user = useSelector((state: any) => state.user.user);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [isSaved, setIsSaved] = useState(user.saved.includes(post._id));
  const config = configure(user.token);
  const [text, setText] = useState("");
  const VisitProfile = (e: any) => {
    e.stopPropagation();
    router.push(`/profile/${post.user.username}`);
  };
  const handleLike = async (e: any) => {
    e.stopPropagation();
    if (isLiked) {
      post.likes.splice(post.likes.indexOf(user._id), 1);
      setIsLiked(false);
    } else {
      const like = [...post.likes, user._id];
      post.likes = like;
      setIsLiked(true);
    }
    await axios.patch(
      `/api/post`,
      { postId: post._id, action: "like" },
      config
    );
  };
  const handleSave = async (e: any) => {
    e.stopPropagation();
    const updatedSavedPosts = isSaved
      ? user.saved.filter((id: any) => id !== post._id)
      : [...user.saved, post._id];
    dispatch(LOGIN({ ...user, saved: updatedSavedPosts }));
    sessionStorage.setItem(
      "user",
      JSON.stringify({ ...user, saved: updatedSavedPosts })
    );
    setIsSaved(!isSaved);
    await axios.patch(
      `/api/post`,
      { postId: post._id, action: "save" },
      config
    );
  };
  useEffect(() => {
    setText(formatHashtags(post?.content));
  }, [post]);
  const handleShare = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `https://socialite-app.vercel.app/post/${post._id}`
    );
    toast.success("Copied to clipboard 👍", {
      duration: 2000,
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
  };
  return (
    <div
      className="border overflow-hidden hover:bg-gray-100 p-3 border-t-0 cursor-pointer"
      onClick={() => {
        router.push(`/post/${post._id}`);
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image
            src={post.user?.profilePicture}
            alt={post.user?.username}
            width="0"
            height="0"
            sizes="100vw"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-contain border cursor-pointer"
            onClick={VisitProfile}
          />
          <div className="flex flex-col">
            <b className="cursor-pointer" onClick={VisitProfile}>
              {post.user?.name}
            </b>
            <p className="text-gray-500 flex items-center text-xs cursor-pointer">
              <i onClick={VisitProfile}>@{post.user?.username}</i>
              <Dot />
              {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>
        <MoreVertical className="text-gray-500" size={20} />
      </div>
      <div className="pt-2 md:pl-12">
        <div
          className="max-w-full break-words mb-2"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <ImageGrid images={post?.attachments} />
        <div className="flex justify-between items-center mt-5 select-none">
          <div className="flex gap-3">
            <p
              className={`flex items-center gap-1 hover:text-[#ee3462] ${
                isLiked ? "text-[#ee3462]" : "text-gray-500"
              }`}
            >
              <Heart
                className="cursor-pointer"
                onClick={handleLike}
                fill={`${isLiked ? "#ee3462" : "white"}`}
              />
              {formatNumber(post?.likes.length)}
            </p>
            <p className="text-gray-500 flex items-center gap-1 hover:text-[#01ba7d]">
              <MessageCircle className=" cursor-pointer" />
              {formatNumber(post?.comments.length)}
            </p>
            <p
              className="text-gray-500 flex items-center gap-1 cursor-pointer"
              onClick={handleShare}
            >
              <Send /> Share
            </p>
          </div>
          <p
            className={`${
              isSaved ? "text-[#0381ec]" : "text-gray-500"
            } hover:text-[#0381ec]`}
          >
            <Bookmark
              className=" cursor-pointer"
              fill={`${isSaved ? "#0381ec" : "white"}`}
              onClick={handleSave}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
export default isAuth(Posts);
