"use client";
import axios from "axios";
import Image from "next/image";
import isAuth from "@/IsCompAuth";
import { useSelector } from "react-redux";
import { Dot, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { configure, formatNumber, formatPost, timeAgo } from "@/config/misc";
function Comments(props: any) {
  const { comment } = props;
  console.log(comment);
  const [text, setText] = useState("");
  const user = useSelector((state: any) => state.user.user);
  const [isLiked, setIsLiked] = useState(comment.likes.includes(user._id));
  const router = useRouter();
  const config = configure(user.token);
  const VisitProfile = () => {
    router.push(`/profile/${comment.user.username}`);
  };
  useEffect(() => {
    setText(formatPost(comment?.content));
  }, [comment]);
  const handleLike = async () => {
    if (isLiked) {
      comment.likes.splice(comment.likes.indexOf(user._id), 1);
      setIsLiked(false);
    } else {
      comment.likes.push(user._id);
      setIsLiked(true);
    }
    await axios.patch(
      `/api/comment`,
      { commentId: comment._id, action: "like" },
      config
    );
  };
  return (
    <div className="my-2 border-b">
      <div className="flex gap-3 items-center">
        <Image
          src={comment.user?.profilePicture}
          alt={comment.user?.username}
          width="0"
          height="0"
          sizes="100vw"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-contain border cursor-pointer"
          onClick={VisitProfile}
        />
        <div className="flex flex-col">
          <b className="cursor-pointer" onClick={VisitProfile}>
            {comment.user?.name}
          </b>
          <p className="text-gray-500 flex items-center text-xs cursor-pointer">
            <i onClick={VisitProfile}>@{comment.user?.username}</i>
            <Dot />
            {timeAgo(comment.createdAt)}
          </p>
        </div>
      </div>
      <div className="py-2 md:pl-12 flex justify-between items-start">
        <div
          className="max-w-full break-words "
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <p
          className={`flex items-center gap-1 hover:text-[#ee3462] ${
            isLiked ? "text-[#ee3462]" : "text-gray-500"
          }`}
        >
          <Heart
            onClick={handleLike}
            className="cursor-pointer"
            fill={`${isLiked ? "#ee3462" : "white"}`}
          />
          {formatNumber(comment?.likes.length)}
        </p>
      </div>
    </div>
  );
}
export default isAuth(Comments);
