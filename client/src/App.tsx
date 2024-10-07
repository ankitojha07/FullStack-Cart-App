import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import the pages and the Navbar
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/Error404";

const App: React.FC = () => {
  return (
    <div className="px-12 py-10">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
