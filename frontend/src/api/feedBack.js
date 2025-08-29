import axios from "axios";

export const submitAdFeedback = async (adId, comment, rating) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/feedback/${adId}`, // include /api/v1 if needed
    { comment, rating },
    { withCredentials: true }
  );
  console.log('feedback data: ',res.data)
  return res.data;
};
