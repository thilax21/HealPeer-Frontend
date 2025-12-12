import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "./api/api";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/ClientProfile";
import Blogs from "./pages/Blogs";
import Counselors from "./pages/Counselors";
import Sessions from "./pages/Session";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgotPassword";
import ProfileEdit from "./pages/ProfileEdit";
import AdminRoute from "./components/AdminRoute";
import RegisterRoleSelection from "./pages/RegisterRoleSelection";
import SingleBlog from "./pages/SingleBlog";
import CounselorProfile from "./pages/CounselorProfile";
import CounselorEditProfile from "./pages/CounselorEditProfile";
import BlogPopup from "./components/BlogPopup";
import BookingPage from "./pages/BookingPage";
import PaymentCancel from "./pages/PaymentCancel";
import ClientBookings from "./pages/ClientBookings";
import BokingSuccess from "./pages/BookingSuccess";
import PaymentSuccess from "./pages/PaymentSuccess";
import Chat from "./components/Chat";
import ChatPage from "./pages/callpage";
import ChatRooms from "./pages/ChatRooms";
import AboutPage from "./components/About";

function App() {
  const [user, setUser] = useState(null);
  const [counselors, setCounselors] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await API.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data.data);
      } catch (err) {
        console.error("Error fetching logged-in user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/register" element={<RegisterRoleSelection />}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot" element={<ForgetPassword />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Login setUser={setUser} />} />
        <Route path="/blogs" element={<Blogs user={user} />} />
        <Route path="/blogs/:id" element={<SingleBlog user={user} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat-rooms" element={<ChatRooms />} />

        {/* Dedicated route for blog write popup */}
        <Route 
          path="/blogs/write" 
          element={<BlogPopup user={user} onClose={() => window.history.back()} />} 
        />
        
        <Route path="/counselors" element={<Counselors user={user} counselors={counselors} setCounselors={setCounselors} />} />
        <Route path="/counselor/:id" element={<CounselorProfile user={user} setUser={setUser} setCounselors={setCounselors} />} />
        <Route path="/counselor/edit" element={<CounselorEditProfile user={user} setUser={setUser} setCounselors={setCounselors} />} />
        <Route path="/sessions" element={user ? <Sessions user={user} /> : <Login setUser={setUser} />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/booking-success" element={<BokingSuccess/>} />
        <Route path="/payment-success" element={<PaymentSuccess/>} />
        <Route path="/booking/cancel" element={<PaymentCancel />} />
        <Route path="/dashboard/bookings" element={<ClientBookings />} />
        <Route path="/counselor/:id/book" element={<BookingPage user={user} />} />
        <Route path="/chat/:bookingId" element={<ChatPage user={user} /> }/>

        {/* Admin only routes */}
        {user && user.role === "admin" && (
          <>
            <Route path="/admin/dashboard" element={<AdminRoute user={user}><AdminDashboard /></AdminRoute>} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
