import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { register } from '../store/authSlice';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // default role
    companyName: '', // for advertisers only
  });

  // Handles all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to send to backend
      const dataToSend = { ...form };

      // If advertiser, companyName is required
      if (form.role === 'advertiser') {
        dataToSend.companyName = form.companyName.trim();
        if (!dataToSend.companyName) {
          alert('Hotel name is required for advertisers');
          return;
        }
      } else {
        // Remove companyName for normal users
        delete dataToSend.companyName;
      }

      await dispatch(register(dataToSend)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 pt-20">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold">Create account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
          />

          {/* Role picker */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="user"
                checked={form.role === 'user'}
                onChange={handleChange}
                className="accent-indigo-600"
              />
              <span>User</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="advertiser"
                checked={form.role === 'advertiser'}
                onChange={handleChange}
                className="accent-indigo-600"
              />
              <span>Advertiser</span>
            </label>
          </div>

          {/* Conditional hotel name input for advertisers */}
          {form.role === 'advertiser' && (
            <input
              name="companyName"
              placeholder="Hotel name/location name"
              required
              value={form.companyName}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
            />
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {status === 'loading' ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>

        {form.role === 'user' && (
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-600">{error}</p>}

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
