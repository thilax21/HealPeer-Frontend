
// import React, { useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css"; // 👈 Import the CSS file

// function Login({ setUser }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post("/auth/login", { email, password });
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userId", data.user?.id);
//       localStorage.setItem("role", data.user.role);
//       setUser(data.user);
//       navigate("/");
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Welcome Back 👋</h2>
//         <p className="subtitle">Login to your account</p>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Enter your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Enter your Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>

//         <p className="link-text">
//           Forgot Password?{" "}
//           <span onClick={() => navigate("/forgot")}>Reset here</span>
//         </p>
//         <p className="link-text">
//           Don’t have an account?{" "}
//           <span onClick={() => navigate("/register")}>Register</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

// --- Visual Components ---

const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
       style={{ 
         backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
         filter: 'contrast(170%) brightness(100%)'
       }} />
);

const InputField = ({ icon: Icon, type, placeholder, value, onChange, toggleType }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.01]' : ''}`}>
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 text-stone-400 transition-colors duration-300 ${isFocused ? 'text-[#3f6212]' : ''}`}>
        <Icon size={18} />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full bg-transparent border-b py-4 pl-8 pr-10 text-[#1c1917] placeholder-stone-400 outline-none transition-all duration-300 font-medium
          ${isFocused ? 'border-[#1c1917]' : 'border-stone-200'}
        `}
        placeholder={placeholder}
        required
      />
      {toggleType && (
        <button 
          type="button"
          onClick={toggleType}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#1c1917] transition-colors p-2"
        >
          {type === 'password' ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}
    </div>
  );
};

// --- Main Component ---

function Login({ setUser }) {
  const navigate = useNavigate();
  
  // State
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await API.post("/auth/login", { 
        email: formData.email, 
        password: formData.password 
      });

      // Store data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user?.id);
      localStorage.setItem("role", data.user.role);
      
      // Update App State
      setUser(data.user);
      
      // Smooth redirect
      setTimeout(() => navigate("/profile"), 500);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f4f2ed] font-sans selection:bg-[#3f6212] selection:text-white relative overflow-hidden">
      <GrainTexture />

      {/* LEFT SIDE: Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10">
        <Link to="/" className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full mx-auto"
        >
          <div className="mb-10">
            <h1 className="text-5xl font-serif text-[#1c1917] mb-3 tracking-tight">Welcome back</h1>
            <p className="text-stone-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <InputField 
                icon={Mail}
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
              />
              
              <InputField 
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
                toggleType={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg"
                >
                  <AlertCircle size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between text-xs font-bold tracking-wide">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-stone-300 text-[#1c1917] focus:ring-[#1c1917]" />
                <span className="text-stone-500 group-hover:text-[#1c1917] transition-colors">Remember for 30 days</span>
              </label>
              <span 
                onClick={() => navigate("/forgot")}
                className="text-[#1c1917] cursor-pointer hover:text-[#3f6212] transition-colors uppercase"
              >
                Forgot password?
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-[#1c1917] text-[#f2f0e9] h-14 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#3f6212] transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Sign In"}
            </motion.button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-stone-500 text-sm">
              Don't have an account?{" "}
              <span 
                onClick={() => navigate("/register")} 
                className="text-[#1c1917] font-bold cursor-pointer hover:underline underline-offset-4"
              >
                Create account
              </span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Visual (Hidden on mobile) */}
      <div className="hidden lg:block w-[55%] relative bg-[#1c1917] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
           <img 
             src="https://www.crosspointhealth.org/wp-content/uploads/2025/04/WCU-Blog-Guide-to-Counseling-Degree-and-Career.jpg" 
             alt="Serenity"
             className="w-full h-full object-cover grayscale-[30%] opacity-80"
           />
           {/* Overlay */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#1c1917]/80 to-transparent mix-blend-multiply" />
        </motion.div>

        <div className="absolute bottom-20 left-12 max-w-md text-[#f2f0e9] z-20">
           <div className="w-12 h-1 bg-[#f2f0e9] mb-8"></div>
           <h2 className="text-4xl font-serif leading-tight mb-6">"Healing is a matter of time, but it is sometimes also a matter of opportunity."</h2>
           <p className="text-white/60 text-sm uppercase tracking-widest">— Hippocrates</p>
        </div>
      </div>
    </div>
  );
}

export default Login;