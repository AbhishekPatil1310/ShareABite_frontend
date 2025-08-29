import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layout/PublicLayout';
import DashboardLayout from './layout/DashboardLayout';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import NotFoundPage from './pages/NotFound';
import AddressPage from './pages/AddressPage'
import ContactForm from './components/Contact';
import HomePage from './pages/Home';
import UploadAd from './components/upload';
import AdsList from './components/AdDetails';
import AdvertisersList from './components/Find_Restorent';
import { useSelector } from 'react-redux';
import DonorPage from './pages/DonerPage';
import MyAds from './components/MyAds'


/* empty stubs – replace later */
const Empty = () => <div />;

export default function App() {
  const role = useSelector((s) => s.auth.user?.role);
  console.log("user role in app:", role);
  return (
    <Routes>
      {/* -------- PUBLIC -------- */}
      <Route element={<PublicLayout />}>
        <Route index element={<Landing />} /> {/* "/" */}
        <Route
          path="signin"
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />
        <Route
          path="signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
      </Route>

      {/* -------- DASHBOARD (auth-only) -------- */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={['admin', 'advertiser', 'user']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Home */}
        <Route index element={            role === "user" ? (
              <HomePage />
            ) : role === "advertiser" ? (
              <DonorPage /> // or DonorPage if you want the donor homepage
            ) : (
              <Unauthorized />
            )} /> {/* /dashboard */}

        {/* ---- USER ROUTES ---- */}


        <Route
          path="food"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <AdsList /> {/* Replace with Cart component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="restaurant"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <AdvertisersList /> {/* Replace with Cart component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="contact"
          element={
            <ProtectedRoute allowedRoles={['user', 'advertiser']}>
              <ContactForm /> {/* Replace with Contact component */}
            </ProtectedRoute>
          }
        />

        {/* ---- ADVERTISER ROUTES ---- */}
        <Route
          path="upload"
          element={
            <ProtectedRoute allowedRoles={['advertiser']}>
              <UploadAd />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-ads"
          element={
            <ProtectedRoute allowedRoles={['advertiser']}>
              <MyAds /> {/* Replace with MyAds component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="wallet"
          element={
            <ProtectedRoute allowedRoles={['advertiser']}>
              <Empty /> {/* Replace with Wallet component */}
            </ProtectedRoute>
          }
        />

        {/* Common routes */}
        <Route path="stats" element={<Empty />} />
        <Route path="watch" element={<Empty />} />
        <Route path="account" element={<Empty />} />
      </Route>
        <Route
          path="ad/:id"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <Empty />
            </ProtectedRoute>
          }
        />
        <Route
          path="addresses"
          element={
            <ProtectedRoute allowedRoles={['advertiser', 'user']}>
              <AddressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <Empty />
            </ProtectedRoute>
          }
        />
        <Route
          path="search"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <Empty />
            </ProtectedRoute>
          }
        />

      {/* -------- FALLBACKS -------- */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    
  );
}
