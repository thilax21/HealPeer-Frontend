// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import Blogs from "./pages/Blogs";
// import Counselors from "./pages/Counselors";
// // import AdminDashboard from "./pages/AdminDashboard";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/counselors" element={<Counselors />} />
//         {/* <Route path="/admin" element={<AdminDashboard />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "./api/api";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import Counselors from "./pages/Counselors";
import Sessions from "./pages/Session";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPayout from "./pages/AdminPayout";
import Footer from "./components/Footer";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgotPassword";
import ProfileEdit from "./pages/ProfileEdit";
import AdminRoute from "./components/AdminRoute";
import BookSession from "./pages/BookSession";

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const userId = localStorage.getItem("userId");

  //       // ✅ if not logged in, skip fetch
  //     if (!token || !userId || userId === "null" || userId === "undefined") return ;

  //     const { data } = await API.get(`/profile/${userId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setUser(data.user);
  //       if (token) {
  //         const { data } = await API.get(`/profile/${userId}`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         setUser(data.user);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchUser();
  // }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await API.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data.data); // ✅ because your backend sends { success, data: user }
      } catch (err) {
        console.error("Error fetching logged-in user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot" element={<ForgetPassword />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Login setUser={setUser} />} />
        <Route path="/blogs" element={<Blogs user={user} />} />
        <Route path="/counselors" element={<Counselors user={user} />} />
        <Route path="/sessions" element={user ? <Sessions user={user} /> : <Login setUser={setUser} />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/book-session" element={user ? <BookSession user={user} /> : <Login setUser={setUser} />} />



        {/* Admin only routes */}
        {user && user.role === "admin" && (
          <>
            <Route path="/admin/dashboard" element={<AdminRoute user={user}><AdminDashboard /> </AdminRoute>} />

            <Route path="/admin/payout" element={<AdminRoute user={user}><AdminPayout /></AdminRoute>} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
