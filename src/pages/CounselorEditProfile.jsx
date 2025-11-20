import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const CounselorEditProfile = ({ user }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    bio: "",
    specialization: "",
    experience: "",
    sessionFee: "",
    profileImage: "",
    specialties: "",
  });
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!user || user.role !== "counselor") {
      alert("Access denied. Only counselors can edit their profile.");
      return navigate("/");
    }

    const fetchProfile = async () => {
      try {
        const { data } = await API.get(`/counselors/${user._id}`);
        setForm({
          name: data.data.name || "",
          bio: data.data.bio || "",
          specialization: data.data.specialization || "",
          experience: data.data.experience || "",
          sessionFee: data.data.sessionFee || "",
          profileImage: data.data.profileImage || "",
          specialties: data.data.specialties?.join(", ") || "",
        });
        setPreviewImage(data.data.profileImage || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  // Handle text input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setForm({ ...form, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/counselors/${user._id}`, {
        ...form,
        specialties: form.specialties.split(",").map((s) => s.trim()),
      });
  
      alert("Profile updated successfully!");
  
      // Update logged-in user
      if (setUser) setUser({ ...user, ...form });
  
      // Update counselors list if available
      if (setCounselors) {
        setCounselors((prev) =>
          prev.map((c) => (c._id === user._id ? { ...c, ...form } : c))
        );
      }
  
      navigate(`/counselor/${user._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };
  
  

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl space-y-4">

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {/* <img
            src={previewImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full border-4 border-indigo-300 object-cover mb-2"
          /> */}
          <img
  src={user && user._id === counselor._id ? user.profileImage : counselor.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
  className="w-40 h-40 rounded-full border-4 border-indigo-300 object-cover shadow-md"
/>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl mt-1"
            rows="4"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="w-full border p-2 rounded-xl mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded-xl mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Session Fee ($)</label>
            <input
              type="number"
              name="sessionFee"
              value={form.sessionFee}
              onChange={handleChange}
              className="w-full border p-2 rounded-xl mt-1"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">Specialties (comma separated)</label>
          <input
            type="text"
            name="specialties"
            value={form.specialties}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-6 rounded-xl shadow hover:bg-indigo-700 transition w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default CounselorEditProfile;
