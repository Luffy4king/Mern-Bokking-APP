
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

function App() {

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
        <Register/>
      </Layout>}>
     
    </Route>

    <Route path="/sign-in" element={
      <Layout>
        <SignIn/>
      </Layout>}>
     
    </Route>
    
    <Route path='*' element={<Navigate to="/"/>}/>
  </Routes>
</Router>
    </>
  )
}

export default App
