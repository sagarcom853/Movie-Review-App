import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import SignIn from "./auth/SignIn";
import Signup from "./auth/Signup";
import Home from "./components/Home";
import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
       
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/auth/signin' element={<SignIn />} />
          <Route exact path='/auth/signup' element={<Signup />} />
          <Route
            exact
            path='/auth/verification'
            element={<EmailVerification />}
          />
          <Route
            exact
            path='/auth/forget-password'
            element={<ForgotPassword />}
          />
          <Route
            exact
            path='/auth/reset-password'
            element={<ResetPassword />}
          />
          <Route
            exact
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
