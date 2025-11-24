


import React, { useEffect, useState } from "react";
import API from "../api/api";
import PaymentButton from "../pages/PaymentButton";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [pending, setPending] = useState([]);
  const [report, setReport] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("blogs"); // sidebar state
  const token = localStorage.getItem("token");

  // ---------------- FETCH DATA ----------------
  const fetchBlogs = async () => {
    try {
      const { data } = await API.get("/blogs/admin/all", { headers: { Authorization: `Bearer ${token}` } });
      setBlogs(data.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const fetchCounselors = async () => {
    try {
      const { data } = await API.get("/counselors/all", { headers: { Authorization: `Bearer ${token}` } });
      setCounselors(data.data);
    } catch (err) {
      console.error("Error fetching counselors:", err);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const { data } = await API.get("/counselors/pending", { headers: { Authorization: `Bearer ${token}` } });
      setPending(data.data);
    } catch (err) {
      console.error("Error fetching pending requests:", err);
    }
  };

  const fetchMonthlyReport = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/payout/monthly-report?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setReport(data.report);
      else setReport([]);
    } catch (err) {
      console.error("Error fetching monthly report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCounselors();
    fetchPendingRequests();
    fetchMonthlyReport();
  }, [token]);

  // ---------------- ACTIONS ----------------
  const handleApprove = async (id) => {
    try {
      await API.put(`/counselors/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchPendingRequests();
      fetchCounselors();
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/counselors/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchPendingRequests();
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete blog error:", err);
    }
  };

  const handleUpdateBlog = (id) => {
    window.location.href = `/update-blog/${id}`;
  };

  // ---------------- SIDEBAR ----------------
  const tabs = [
    { key: "blogs", label: "Blogs" },
    { key: "pending", label: "Pending Requests" },
    { key: "counselors", label: "All Counselors" },
    { key: "report", label: "Monthly Report" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", backgroundColor: "#1f2937", color: "#fff", padding: "20px" }}>
        <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            style={{
              padding: "10px 15px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor: activeTab === tab.key ? "#3b82f6" : "transparent",
              borderRadius: "5px",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f3f4f6" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>👑 Admin Dashboard</h1>

        {activeTab === "blogs" && (
          <section>
            <h2>📰 All Blogs</h2>
            {blogs.length === 0 ? (
              <p>No blogs available</p>
            ) : (
              <ul>
                {blogs.map((b) => (
                  <li key={b._id} style={{ marginBottom: "8px" }}>
                    <strong>{b.title}</strong> by {b.author.name} ({b.author.role})
                    <button style={{ marginLeft: "10px" }} onClick={() => handleUpdateBlog(b._id)}>Update</button>
                    <button style={{ marginLeft: "5px" }} onClick={() => handleDeleteBlog(b._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeTab === "pending" && (
          <section>
            <h2>🟡 Pending Counselor Requests</h2>
            {pending.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                      <td>{p.specialization || "-"}</td>
                      <td>{p.experience || "-"}</td>
                      <td>
                        <button style={{ marginRight: "10px", color: "green" }} onClick={() => handleApprove(p._id)}>Approve</button>
                        <button style={{ color: "red" }} onClick={() => handleReject(p._id)}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {activeTab === "counselors" && (
          <section>
            <h2>👥 All Counselors</h2>
            {counselors.length === 0 ? (
              <p>No counselors available</p>
            ) : (
              <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {counselors.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.specialization || "-"}</td>
                      <td>{c.experience || "-"}</td>
                      <td>{c.isApproved ? "Approved" : "Pending"}</td>
                      <td>
                        <PaymentButton amount={c.totalEarnings || 50} counselorId={c._id} counselorName={c.name} type="admin" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {activeTab === "report" && (
          <section>
            <h2>💸 Counselor Monthly Earnings</h2>
            <div style={{ marginBottom: "15px" }}>
              <label>
                Month:{" "}
                <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} min="1" max="12" style={{ width: "60px" }} />
              </label>
              <label style={{ marginLeft: "10px" }}>
                Year:{" "}
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} style={{ width: "80px" }} />
              </label>
              <button onClick={fetchMonthlyReport} style={{ marginLeft: "10px" }}>🔄 Refresh Report</button>
            </div>
            {loading ? <p>Loading report...</p> : report.length === 0 ? <p>No data available</p> : (
              <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Counselor</th>
                    <th>Email</th>
                    <th>Sessions</th>
                    <th>Total Earnings ($)</th>
                    <th>Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {report.map((item) => (
                    <tr key={item.counselor._id}>
                      <td>{item.counselor.name}</td>
                      <td>{item.counselor.email}</td>
                      <td>{item.sessionCount}</td>
                      <td>{item.totalEarnings.toFixed(2)}</td>
                      <td>
                        <PaymentButton amount={item.totalEarnings} counselorId={item.counselor._id} counselorName={item.counselor.name} type="admin" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
