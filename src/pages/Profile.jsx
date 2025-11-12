// import { useEffect, useState } from "react";
// import API from "../api/api.js"; // make sure your API instance is imported

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//        localStorage.setItem("token", data.token);
// localStorage.setItem("userId", data.user._id);

//         if (!token || !userId) {
//           console.error("No token or userId found in localStorage");
//           setLoading(false);
//           return;
//         }

//         // Get user details
//         const { data: userData } = await API.get(`/profile/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(userData.user);

//         // Get user's blogs
//         const { data: blogsData } = await API.get("/blogs/my-blogs", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setBlogs(blogsData.data);

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching profile or blogs:", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{user?.name}'s Profile</h1>
//       <p>Email: {user?.email}</p>
//       <h2>My Blogs</h2>
//       {blogs.length === 0 ? (
//         <p>No blogs yet.</p>
//       ) : (
//         blogs.map((blog) => (
//           <div key={blog._id}>
//             <h3>{blog.title}</h3>
//             <p>{blog.content}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Profile;
import { useEffect, useState } from "react";
import API from "../api/api.js";

const Profile = ({ user: loggedInUser }) => {
  const [user, setUser] = useState(loggedInUser || null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          return;
        }

        // If user not passed from props, fetch profile
        if (!user) {
          const { data: profileData } = await API.get("/profile/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(profileData.data);
        }

        // Fetch user's blogs
        const { data: blogsData } = await API.get("/blogs/my-blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(blogsData.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile or blogs:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{user.name}'s Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <h2>My Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;

