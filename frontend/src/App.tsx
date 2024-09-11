
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

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <p>HomePage</p>
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
            </>
          )}

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
