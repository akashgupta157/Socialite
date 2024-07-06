import axios from "axios";
export const uploadCloudinary = async (file: string | Blob) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "atwymgd9");
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dm5uvtj7t/image/upload`,
    formData
  );
  return { publicId: data?.public_id, url: data?.secure_url };
};
export function configure(token: any) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
export function formatNumber(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number?.toString();
  }
}
export function timeAgo(date: string): string {
  const now: Date = new Date();
  const timestamp: Date = new Date(date);
  const seconds: number = Math.floor(
    (now.getTime() - timestamp.getTime()) / 1000
  );
  if (seconds < 60) {
    return seconds + "s ago";
  } else if (seconds < 3600) {
    const minutes: number = Math.floor(seconds / 60);
    return minutes + "m ago";
  } else if (seconds < 86400) {
    const hours: number = Math.floor(seconds / 3600);
    return hours + "h ago";
  } else if (timestamp.getFullYear() === now.getFullYear()) {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return timestamp.toLocaleDateString("en-US", options);
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return timestamp.toLocaleDateString("en-US", options);
  }
}
export const formatPost = (post: string) => {
  const urlPattern = /(https?:\/\/[^\s<]+)/g;
  let formattedPost = post.replace(
    urlPattern,
    '<a href="$1" style="color: blue;" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  const hashtagPattern = /#(\w+)/g;
  formattedPost = formattedPost.replace(
    hashtagPattern,
    '<span style="color: blue;font-weight:bold">#$1</span>'
  );
  formattedPost = formattedPost.replace(/<br>/g, "<br />");
  return formattedPost;
};
export function formatDateAndTime(timestamp: any): any {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}
export const profilePic_fallbackSrc =
  "https://res.cloudinary.com/dm5uvtj7t/image/upload/v1706622367/atwymgd8/exaerdufqcmkmwl9gll2.png";
export const post_fallbackSrc =
  "https://res.cloudinary.com/dm5uvtj7t/image/upload/v1719821857/atwymgd8/clvrvgykoiq6b4xrk6m4.webp";
