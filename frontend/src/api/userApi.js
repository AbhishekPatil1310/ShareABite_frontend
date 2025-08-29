import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, 
  withCredentials: true,
});

// Add new address
export const addAddress = (userId, data) =>
  API.post(`/users/${userId}/address`, data).then(res => res.data);

// Get all addresses
export const getAddresses = (userId) =>
  API.get(`/users/${userId}/address`).then(res => res.data);

// Upload Ad with file
export async function uploadAd(form) {
  const data = new FormData();
  Object.entries(form).forEach(([key, val]) => {
    if (key === "file" && val) data.append("file", val);
    else if (val !== undefined && val !== null) data.append(key, val);
  });

  const response = await API.post("/upload-ad", data);
  return response.data;
}

export async function getAllAds() {
  try {
    const response = await API.get("/ads");
    return response.data; // array of ads
  } catch (err) {
    console.error('Error fetching ads:', err);
    throw err; // let the caller handle errors
  }
}
export async function getAllAdvertisers() {
  try {
    const response = await API.get('/advertisers'); // GET /advertisers
    return response.data; // array of advertisers
  } catch (err) {
    console.error('Error fetching advertisers:', err);
    throw err;
  }
}

export async function getAdsByAdvertiser(advertiserId) {
  try {
    const response = await API.get(`/advertisers/${advertiserId}/ads`); // GET /advertisers/:id/ads
    return Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.error('Error fetching ads:', err);
    return [];
  }
}

export const getMyAds = async (advertiserId) => {
  const res = await API.get(`/advertiserId/${advertiserId}`);
  return res.data;
};

// Delete ad
export const deleteAd = async (id) => {
  const res = await API.delete(`/ads/${id}`);
  return res.data;
};

// Update ad
export const updateAd = async (id, updatedData) => {
  try {
    const res = await API.put(`/ads/${id}`, updatedData);
    return res.data;
  } catch (err) {
    console.error("Error updating ad:", err);
    throw err;
  }
};