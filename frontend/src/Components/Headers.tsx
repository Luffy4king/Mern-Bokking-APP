import { Link } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import SignOutButton from './SignOutButton';

const Headers = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <header className="bg-blue-700 py-1 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <h1 className="text-2xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-3">
          {isLoggedIn ? (
            <>
              <Link 
                className="text-white font-medium px-3 py-2 bg-blue-500 rounded-md transition-transform duration-200 hover:bg-blue-600 hover:scale-105"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link 
                className="text-white font-medium px-3 py-2 bg-blue-500 rounded-md transition-transform duration-200 hover:bg-blue-600 hover:scale-105"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              className="text-white text-lg font-medium px-3 py-2 bg-blue-400 rounded-md transition-colors duration-200 hover:bg-blue-500"
              to="/sign-in"
            >
              Sign-in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Headers;
