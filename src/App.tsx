import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* ✅ Navbar is always visible */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
