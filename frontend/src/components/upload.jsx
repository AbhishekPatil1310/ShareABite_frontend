import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { uploadAd } from '../api/userApi';
import { moderateImage } from '../store/moderateImage';
import GoBackButton from './BackButton'

export default function UploadAd() {
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    productName: '',
    description: '',
    price: '',
    adType: '',
    tags: '',
    advertiserId: '',
    ageMin: '',
    ageMax: '',
    file: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [moderationResult, setModerationResult] = useState(null);
  const [isAdvertiser, setIsAdvertiser] = useState(false);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingModeration, setCheckingModeration] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchCredits = async () => {
    try {
      const profile = user;
      console.log('profile in fetchCredits: ', profile);
      const newCredits = profile.credit || 0;
      setCredits(newCredits);
      return newCredits;
    } catch (err) {
      console.error('Error fetching profile:', err);
      setCredits(0);
      return 0;
    }
  };

  useEffect(() => {
    const init = async () => {
      if (user?.role === 'advertiser') {
        await fetchCredits();
      } else {
        setCredits(0);
      }
      setLoading(false);
    };
    init();
  }, [user]);

  useEffect(() => {
    if (user?.role === 'advertiser') {
      const intervalId = setInterval(fetchCredits, 5000);
      return () => clearInterval(intervalId);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'advertiser' && user.email) {
      console.log('user in upload useeffect: ', user.role);
      setForm((prev) => ({ ...prev, advertiserId: user.email }));
      setIsAdvertiser(true);
    } else {
      setIsAdvertiser(false);
    }
  }, [user]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      const file = files[0];
      if (!file) return;

      setImagePreview(URL.createObjectURL(file));
      setCheckingModeration(true);

      const { passed, result } = await moderateImage(file);
      setModerationResult(result);

      if (!passed) {
        alert('⚠️ Image rejected due to inappropriate content.');
        setForm((prev) => ({ ...prev, file: null }));
        setImagePreview(null);
      } else {
        setForm((prev) => ({ ...prev, file }));
      }

      setCheckingModeration(false);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdvertiser) {
      console.log('user in upload: ', isAdvertiser)
      alert('Only advertisers can upload ads ❌');
      return;
    }

    const latestCredits = await fetchCredits();
    if (latestCredits < 1000) {
      alert('❌ You don’t have enough credits. Please top up your wallet.');
      return;
    }

    if (!form.file) {
      alert('Please upload a valid image');
      return;
    }

    try {
      setSubmitting(true);
      const data = await uploadAd(form);
      alert('Ad Uploaded ✅');
      console.log(data);
    } catch (err) {
      console.error('Upload Error:', err.response?.data || err.message);
      alert('Upload failed ❌');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <div className="text-center py-10 text-gray-500">Please log in to upload an ad.</div>;
  }

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Checking credits...</div>;
  }



  return (
    <>
      <GoBackButton />
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl space-y-5 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">Upload Advertisement</h2>

          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Food Name</label>
            <input
              name="productName"
              onChange={handleChange}
              placeholder="Enter productName"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Description</label>
            <input
              name="description"
              onChange={handleChange}
              placeholder="Enter ad description"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">price</label>
            <input
              name="price"
              onChange={handleChange}
              placeholder="Enter ad price"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-medium text-gray-700">food Type</label>
            <input
              name="adType"
              onChange={handleChange}
              placeholder="e.g., Tech, Fashion, Education"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Upload Image</label>
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>

          {checkingModeration && (
            <p className="text-blue-600 font-medium">Moderating image, please wait...</p>
          )}

          {imagePreview && (
            <div className="mt-4">
              <p className="text-gray-700 font-medium mb-2">Image Preview:</p>
              <img src={imagePreview} alt="Preview" className="w-full rounded-lg shadow" />
            </div>
          )}

          <input type="hidden" name="advertiserId" value={form.advertiserId} />

{submitting ? (
  <p className="text-blue-600 font-medium text-center">Uploading...</p>
) : (
  <button
    type="submit"
    disabled={checkingModeration || submitting || credits < 1000}
    className="w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Upload Ad
  </button>
)}

{credits < 1000 && (
  <p className="text-center text-red-600 mt-2">
    ❌ You don’t have enough credits. Please top up your wallet.
  </p>
)}

        </form>
      </div>
    </>
  );
}
