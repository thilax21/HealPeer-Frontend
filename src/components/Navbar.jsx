// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <nav style={{ padding: "10px", background: "#3a3a8a", color: "#fff" }}>
//       <Link to="/">Home</Link> | 
//       <Link to="/about">About</Link> | 
//       <Link to="/blogs">Blogs</Link> | 
//       <Link to="/counselors">Counselors</Link> | 
//       {!token ? (
//         <>
//           <Link to="/login">Login</Link> | 
//           <Link to="/register">Register</Link>
//         </>
//       ) : (
//         <>
//           <Link to="/profile">Profile</Link> | 
//           {role === "admin" && <Link to="/admin">Admin Dashboard</Link>} | 
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
//       <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
//       <Link to="/profile-edit">Edit Profile</Link>
//       <Link to="/blogs" style={{ marginRight: "10px" }}>Blogs</Link>
//       <Link to="/counselors" style={{ marginRight: "10px" }}>Counselors</Link>

//       {!user && (
//         <>
//           <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
//           <Link to="/register">Register</Link>
//         </>
//       )}

//       {user && user.role === "client" && (
//         <>
//           <Link to="/profile" style={{ marginRight: "10px" }}>My Profile</Link>
//           <Link to="/sessions">My Sessions</Link>
//           <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
//         </>
//       )}

//       {user && user.role === "counselor" && (
//         <>
//           <Link to="/profile" style={{ marginRight: "10px" }}>My Profile</Link>
//           <Link to="/sessions">My Sessions</Link>
//           <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
//         </>
//       )}

//       {user && user.role === "admin" && (
//         <>
//           <Link to="/admin/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
//           <Link to="/admin/payout" style={{ marginRight: "10px" }}>Payouts</Link>
//           <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // ✅ Import CSS

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/login");
  // };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // ✅ clear this too
    setUser(null);
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">HealPeer</Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="navbar-link">Home</Link>
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

        {user && (user.role === "client" || user.role === "counselor") && (
          <>
            <Link to="/profile" className="navbar-link">My Profile</Link>
            <Link to="/sessions" className="navbar-link">My Sessions</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <Link to="/admin/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/admin/payout" className="navbar-link">Payouts</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
