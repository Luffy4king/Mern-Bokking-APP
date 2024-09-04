import {Link} from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import SignOutButton from './SignOutButton';

const Headers = () => {
   const {isLoggedIn} =useAppContext();
  return (
    <div className="bg-blue-700 py-5 ">
      <div className="container flex mx-auto justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
           
            <Link to="/">Holidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {
            isLoggedIn ? <>
            <Link className='flex items-center text-white px-3 py-2 font-bold bg-blue-500 rounded-md transition-all duration-300 transform hover:bg-blue-600 hover:scale-105' to='/my-bookings'>My Bookings</Link>
            <Link className='flex items-center text-white px-3 py-2 font-bold bg-blue-500 rounded-md transition-all duration-300 transform hover:bg-blue-600 hover:scale-105' to='/my-hotels'>My Hotels</Link>
            <SignOutButton/>     
             </>   :
            <Link to="/sign-in" className="flex items-center  px-3  z-30 py-4 bg-blue-400 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-blue-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_blue;] hover:[text-shadow:2px_2px_2px_blue-100] text-2xl">Sign-in</Link>
   
          }
            
        </span>
      </div>
    </div>
  )
}
export default Headers
