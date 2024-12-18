
import './App.css'
import Layout from './layouts/Layout'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotels';
import { useAppContext } from './Context/AppContext';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';

import Search from './pages/Search';

import Details from './pages/Details';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
            <Home/>
            
            </Layout>}>

          </Route>
          <Route path="/search" element={
            <Layout>
              <Search />
            </Layout>}>

          </Route>


          <Route path="/details/:hotelId" element={
            <Layout>
              <Details />
            </Layout>}>

          </Route>

          <Route path="/register" element={
            <Layout>
              <Register />
            </Layout>}>

          </Route>

          <Route path="/sign-in" element={
            <Layout>
              <SignIn />
            </Layout>}>

          </Route>

      {isLoggedIn && (
            <>
            
            <Route
                path='/hotel/:hotelId/booking'
                element={
                  <Layout>
                    <Booking/>
                  </Layout>
                }
              />


              <Route
                path='/add-hotel'
                element={
                  <Layout>
                    <AddHotel />
                  </Layout>
                }
              />
              <Route
                path='/my-hotels'
                element={
                  <Layout>
                    <MyHotels />
                  </Layout>
                }
              />
              <Route
                path='/edit-hotel/:hotelId'
                element={
                  <Layout>
                    <EditHotel />
                  </Layout>
                }
              />
               <Route
                path='/my-bookings'
                element={
                  <Layout>
                    <MyBookings />
                  </Layout>
                }
              />
            </>
          )}

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
