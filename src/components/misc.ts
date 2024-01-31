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
export function formatNumber(number:number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}