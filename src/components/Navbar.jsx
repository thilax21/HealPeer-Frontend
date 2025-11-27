      // <div className="navbar-center">
      //   <Link to="/" className="navbar-link">Home</Link>
      //   <Link to="/blogs" className="navbar-link">Blogs</Link>
      //   <Link to="/counselors" className="navbar-link">Counselors</Link>
      //   {user && <Link to="/chat-rooms" className="navbar-link">Chat Rooms 💬</Link>}
      // </div>




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
      navigate("/");
    }
  };
  

  const profileLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "counselor":
        return `/profile`;
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
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/blogs" className="navbar-link">Blogs</Link>
        <Link to="/counselors" className="navbar-link">Counselors</Link>
        <Link to="/about" className="navbar-link">About</Link>

          {user && <Link to="/chat-rooms" className="navbar-link">Chat Rooms 💬</Link>}

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

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Navbar.css";
// import logo from "../assets/healpeer.logo.png";

// const Navbar = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       setUser(null);
//       navigate("/");
//     }
//   };

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

//   const getInitial = () => {
//     if (!user || !user.name) return "U";
//     return user.name.charAt(0).toUpperCase();
//   };

//   return (
//     <nav className="navbar-new">
//       <div className="navbar-left-new" onClick={() => navigate("/")}>
//         <img src={logo} alt="Logo" className="logo-new" />
//         <h1 className="brand-new">HealPeer</h1>
//       </div>

//       <div className="navbar-center-new">
//         <Link to="/" className="nav-link-new">Home</Link>
//         <Link to="/blogs" className="nav-link-new">Blogs</Link>
//         <Link to="/counselors" className="nav-link-new">Counselors</Link>
//       </div>

//       <div className="navbar-right-new">
//         {!user && (
//           <>
//             <Link to="/login" className="nav-button-new">Login</Link>
//             <Link to="/register" className="nav-button-new">Register</Link>
//           </>
//         )}

//         {user && (
//           <>
//             <div
//               className="profile-avatar-new"
//               onClick={() => navigate(profileLink())}
//               title="My Profile"
//             >
//               {getInitial()}
//               <span className="ring-new"></span>
//             </div>
//             <button className="logout-button-new" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Navbar.css";
// import logo from "../assets/healpeer.logo.png";

// const Navbar = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (window.confirm("Logout?")) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       setUser(null);
//       navigate("/");
//     }
//   };

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

//   const getInitial = () => {
//     if (!user || !user.name) return "U";
//     return user.name.charAt(0).toUpperCase();
//   };

//   return (
//     <nav className="navbar-futuristic">
//       <div className="navbar-left-futuristic" onClick={() => navigate("/")}>
//         <img src={logo} alt="Logo" className="logo-futuristic" />
//         <h1 className="brand-futuristic">HealPeer</h1>
//       </div>

//       <div className="navbar-center-futuristic">
//         <Link to="/" className="nav-link-futuristic">Home</Link>
//         <Link to="/blogs" className="nav-link-futuristic">Blogs</Link>
//         <Link to="/counselors" className="nav-link-futuristic">Counselors</Link>
//         {user && <Link to="/chat-rooms" className="navbar-link">Chat Rooms 💬</Link>}
//       </div>

//       <div className="navbar-right-futuristic">
//         {!user && (
//           <>
//             <Link to="/login" className="nav-button-futuristic">Login</Link>
//             <Link to="/register" className="nav-button-futuristic">Register</Link>
//           </>
//         )}

//         {user && (
//           <>
//             <div
//               className="profile-avatar-futuristic"
//               onClick={() => navigate(profileLink())}
//               title="Profile"
//             >
//               {getInitial()}
//             </div>
//             <button className="logout-button-futuristic" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;