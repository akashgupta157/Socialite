"use client";
import axios from "axios";
import isAuth from "@/IsCompAuth";
import { Spinner } from "flowbite-react";
import { LOGIN } from "@/redux/slices/userSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  configure,
  formatDateAndTime,
  formatHashtags,
  formatNumber,
  profilePic_fallbackSrc,
} from "@/config/misc";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  MoreVertical,
  Send,
  Trash2,
} from "lucide-react";
import ImageGrid from "@/components/ImageGrid";
import CommentBox from "@/components/CommentBox";
import Comments from "@/components/Comments";
import toast from "react-hot-toast";
import ImageFallback from "@/components/ImageFallback";
interface PostDetails {
  _id: string;
  user: {
    _id: string;
    name: string;
    username: string;
    profilePicture: any;
  };
  content: string;
  attachments: any;
  likes: any;
  comments: any;
  createdAt: string;
}
const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const postId = pathname?.split("/").pop();
  const [postDetail, setPostDetail] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const newComment = useSelector((state: any) => state.feed.post);
  const [isLiked, setIsLiked] = useState(postDetail?.likes.includes(user._id));
  const [isSaved, setIsSaved] = useState(user.saved.includes(postDetail?._id));
  const config = configure(user.token);
  const [text, setText] = useState("");
  const fetchPostDetails = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/post/${postId}`);
    if (data.success) {
      setPostDetail(data.post);
      setLoading(false);
    } else {
      console.log(data.message);
    }
  };
  useEffect(() => {
    fetchPostDetails();
  }, []);
  const VisitProfile = () => {
    if (!postDetail) return;
    router.push(`/profile/${postDetail.user.username}`);
  };
  const handleLike = async (e: any) => {
    if (isLiked) {
      postDetail?.likes.splice(postDetail?.likes.indexOf(user._id), 1);
      setIsLiked(false);
    } else {
      postDetail?.likes.push(user._id);
      setIsLiked(true);
    }
    await axios.patch(
      `/api/post`,
      { postId: postDetail?._id, action: "like" },
      config
    );
  };
  const handleSave = async (e: any) => {
    const updatedSavedPosts = isSaved
      ? user.saved.filter((id: any) => id !== postDetail?._id)
      : [...user.saved, postDetail?._id];
    dispatch(LOGIN({ ...user, saved: updatedSavedPosts }));
    sessionStorage.setItem(
      "user",
      JSON.stringify({ ...user, saved: updatedSavedPosts })
    );
    setIsSaved(!isSaved);
    await axios.patch(
      `/api/post`,
      { postId: postDetail?._id, action: "save" },
      config
    );
  };
  useEffect(() => {
    if (!postDetail) return;
    setText(formatHashtags(postDetail?.content));
  }, [postDetail]);
  const handleShare = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `https://socialite-app.vercel.app/post/${postDetail?._id}`
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
  useEffect(() => {
    if (newComment && postDetail) {
      const updateComment = { ...newComment, user };
      setPostDetail((prevPostDetail: any) => {
        const updatedPostDetail = { ...prevPostDetail };
        updatedPostDetail.comments = [
          updateComment,
          ...updatedPostDetail.comments,
        ];
        return updatedPostDetail;
      });
    }
  }, [newComment]);
  const handleDelete = async (e: any) => {
    e.stopPropagation();
    const { data } = await axios.delete(`/api/post/${postDetail?._id}`, config);
    if (data.success) {
      toast.success(data.message, {
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
  //? Menu Code
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //? Menu Code
  return (
    <div className="max-h-[79vh] overflow-y-scroll scrollbar-none md:max-h-[90vh] md:w-[55%] border-r">
      <div className="border-b flex px-3 py-2 gap-3 md:px-5 md:gap-5 items-center sticky top-0 bg-white z-[1]">
        <ArrowLeft
          className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
          size={30}
          onClick={() => router.back()}
        />
        <p className="text-xl font-bold">Post</p>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : (
          <>
            <div className="p-3 md:px-5">
              <div className="flex justify-between items-center">
                <div
                  className="flex gap-3 items-center cursor-pointer w-fit"
                  onClick={VisitProfile}
                >
                  <ImageFallback
                    src={postDetail?.user.profilePicture}
                    alt={"profile"}
                    priority
                    fallbackSrc={profilePic_fallbackSrc}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="rounded-full w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                  <div>
                    <p className="font-extrabold">{postDetail?.user.name}</p>
                    <i className="text-gray-500">
                      @{postDetail?.user.username}
                    </i>
                  </div>
                </div>
                {postDetail?.user._id === user._id && (
                  <div className="relative inline-block text-left">
                    <div>
                      <MoreVertical
                        className="text-gray-500 cursor-pointer"
                        size={20}
                        onClick={toggleDropdown}
                      />
                    </div>
                    {isOpen && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        ref={dropdownRef}
                      >
                        <div className="py-1">
                          <p
                            className="px-4 py-2 text-sm hover:bg-gray-100 flex justify-center items-center gap-2 text-red-600 cursor-pointer font-semibold"
                            onClick={handleDelete}
                          >
                            <Trash2 /> Delete the post
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <div
                  className="max-w-full break-words my-2"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
                <ImageGrid images={postDetail?.attachments} />
                <p className={`text-gray-500 mt-2 `}>
                  {formatDateAndTime(postDetail?.createdAt)}
                </p>
                <div className="flex justify-between items-center mt-2 select-none border-y py-3">
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
                      {formatNumber(postDetail?.likes.length)}
                    </p>
                    <p className="text-gray-500 flex items-center gap-1 hover:text-[#01ba7d]">
                      <MessageCircle className=" cursor-pointer" />
                      {formatNumber(postDetail?.comments.length)}
                    </p>
                    <p
                      className="text-gray-500 flex items-center gap-1"
                      onClick={handleShare}
                    >
                      <Send className=" cursor-pointer" /> Share
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
              <CommentBox postId={postDetail?._id} />
              {postDetail?.comments?.map((comment: any) => (
                <Comments key={comment._id} comment={comment} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default isAuth(Post);
