// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import "../styles/Navbar.css"; // ✅ Import CSS

// // const Navbar = ({ user, setUser }) => {
// //   const navigate = useNavigate();

// //   // const handleLogout = () => {
// //   //   localStorage.removeItem("token");
// //   //   setUser(null);
// //   //   navigate("/login");
// //   // };
// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("userId"); // ✅ clear this too
// //     setUser(null);
// //     navigate("/login");
// //   };
// //   return (
// //     <nav className="navbar">
// //       <div className="navbar-left">
// //       <h1 className="brand-highlight">HealPeer</h1>
// //       </div>

// //       <div className="navbar-center">
// //         <Link to="/" className="navbar-link">Home</Link>
// //         <Link to="/blogs" className="navbar-link">Blogs</Link>
// //         <Link to="/counselors" className="navbar-link">Counselors</Link>
// //       </div>

// //       <div className="navbar-right">
// //         {!user && (
// //           <>
// //             <Link to="/login" className="navbar-link">Login</Link>
// //             <Link to="/register" className="navbar-link">Register</Link>
// //           </>
// //         )}

// //         {user && (user.role === "client" || user.role === "counselor") && (
// //           <>
// //             <Link to="/profile" className="navbar-link">My Profile</Link>
// //             <Link to="/sessions" className="navbar-link">My Sessions</Link>
// //             <button className="logout-btn" onClick={handleLogout}>Logout</button>
// //           </>
// //         )}

// //         {user && user.role === "admin" && (
// //           <>
// //             <Link to="/admin/dashboard" className="navbar-link">Dashboard</Link>
            
// //             <button className="logout-btn" onClick={handleLogout}>Logout</button>
// //           </>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import "../styles/Navbar.css";

// // const Navbar = ({ user, setUser }) => {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("userId");
// //     setUser(null);
// //     navigate("/login");
// //   };

// //   // Determine profile link
// //   const profileLink = () => {
// //     if (!user) return "/login";
// //     if (user.role === "counselor") return `/counselor/${user._id}`;
// //     if (user.role === "client") return "/profile";
// //     return "/login";
// //   };

// //   return (
// //     <nav className="navbar">
// //       <div className="navbar-left">
// //         <h1 className="brand-highlight">HealPeer</h1>
// //       </div>

// //       <div className="navbar-center">
// //         <Link to="/" className="navbar-link">Home</Link>
// //         <Link to="/blogs" className="navbar-link">Blogs</Link>
// //         <Link to="/counselors" className="navbar-link">Counselors</Link>
// //       </div>

// //       <div className="navbar-right">
// //         {!user && (
// //           <>
// //             <Link to="/login" className="navbar-link">Login</Link>
// //             <Link to="/register" className="navbar-link">Register</Link>
// //           </>
// //         )}

// //         {user && (user.role === "client" || user.role === "counselor") && (
// //           <>
// //             <Link to={profileLink()} className="navbar-link">My Profile</Link>
// //             <button className="logout-btn" onClick={handleLogout}>Logout</button>
// //           </>
// //         )}

// //         {user && user.role === "admin" && (
// //           <>
// //             <Link to="/admin/dashboard" className="navbar-link">Dashboard</Link>
// //             <button className="logout-btn" onClick={handleLogout}>Logout</button>
// //           </>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Navbar.css";
// import logo from "../assets/healpeer.logo'.png"
// const Navbar = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     setUser(null);
//     navigate("/login");
//   };

//   // Profile link routing logic
//   const profileLink = () => {
//     if (!user) return "/login";
  
//     switch (user.role) {
//       case "counselor":
//         return `/counselor/${user._id}`;
//       case "client":
//         return "/profile";
//       case "admin":
//         return "/admin/dashboard";
//       default:
//         return "/login";
//     }
//   };
  

//   // Get first letter of name
//   const getInitial = () => {
//     if (!user || !user.name) return "U";
//     return user.name.charAt(0).toUpperCase();
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//        <h1 className="brand-highlight">HealPeer</h1>
//       </div>

//       <div className="navbar-center">
//         <Link to="/" className="navbar-link">Home</Link>
//         <Link to="/blogs" className="navbar-link">Blogs</Link>
//         <Link to="/counselors" className="navbar-link">Counselors</Link>
//       </div>

//       <div className="navbar-right">
//         {/* If no user */}
//         {!user && (
//           <>
//             <Link to="/login" className="navbar-link">Login</Link>
//             <Link to="/register" className="navbar-link">Register</Link>
//           </>
//         )}

//         {/* If logged in */}
//         {user && (
//           <>
//             {/* Profile avatar bubble */}
//             <div
//               className="profile-avatar"
//               onClick={() => navigate(profileLink())}
//               title="My Profile"
//             >
//               {getInitial()}
//             </div>

//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/healpeer.logo.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setUser(null);
      navigate("/home");
    }
  };
  

  const profileLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "counselor":
        return `/counselor/${user._id}`;
      case "client":
        return "/profile";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/login";
    }
  };

  const getInitial = () => {
    if (!user || !user.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="HealPeer Logo" className="navbar-logo" />
        <h1 className="brand-highlight">HealPeer</h1>
      </div>

      <div className="navbar-center">
        <Link to="/home" className="navbar-link">Home</Link>
        <Link to="/blogs" className="navbar-link">Blogs</Link>
        <Link to="/counselors" className="navbar-link">Counselors</Link>
      </div>

      <div className="navbar-right">
        {!user && (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}

        {user && (
          <>
            <div
              className="profile-avatar"
              onClick={() => navigate(profileLink())}
              title="My Profile"
            >
              {getInitial()}
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
