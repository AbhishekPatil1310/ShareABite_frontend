import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'; // the original public navbar

export default function PublicLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <Outlet /> {/* Landing, SignIn, SignUp */}
    </>
  );
}
