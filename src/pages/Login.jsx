// import React, { useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post("/auth/login", { email, password });
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.user.role);
//       navigate("/profile");
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;


import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await API.post("/auth/login", { email, password });

  //     // ✅ Save all user info
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("userId", data.user._id); // 👈 ADD THIS LINE
  //     localStorage.setItem("role", data.user.role);

  //     setUser?.(data.user); // optional - directly set in app state
  //     navigate("/profile");
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Login failed");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user); // ✅ set user directly here
      navigate("/profile");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>
          Forgot Password?{" "}
          <span className="link" onClick={() => navigate("/forgot")}>
            Reset here
          </span>
        </p>
        <p>
          Don’t have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

    </form>
  );
}

export default Login;
