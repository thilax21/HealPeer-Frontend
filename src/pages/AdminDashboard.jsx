// // // import React, { useEffect, useState } from "react";
// // import API from "../api/api";
// // import React, { useState, useEffect } from "react";

// // const AdminDashboard = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [blogs, setBlogs] = useState([]);

// //   const token = localStorage.getItem("token");

// //   // Fetch all blogs
// //   useEffect(() => {
   
// //     fetchBlogs();
// //   }, [token]);
// //   const fetchBlogs = async () => {
// //     try {
// //       const { data } = await API.get("/blogs/admin/all", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setBlogs(data.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Fetch pending counselor requests
// //   useEffect(() => {
    
// //     fetchRequests();
// //   }, [token]);
// //   const fetchRequests = async () => {
// //     try {
// //       const { data } = await API.get("/counselors/requests", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setRequests(data.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Approve counselor
// //   const handleApprove = async (id) => {
// //     try {
// //       await API.put(`/counselors/approve/${id}`, {}, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setRequests(requests.filter((r) => r._id !== id));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Reject counselor
// //   const handleReject = async (id) => {
// //     try {
// //       await API.put(`/counselors/reject/${id}`, {}, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setRequests(requests.filter((r) => r._id !== id));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Delete blog
// //   const handleDelete = async (id) => {
// //     try {
// //       await API.delete(`/blogs/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setBlogs(blogs.filter((b) => b._id !== id));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>📰 All Blogs (Admin)</h2>
// //       <ul>
// //         {blogs.map((b) => (
// //           <li key={b._id}>
// //             <strong>{b.title}</strong> by {b.author.name} ({b.author.role})
// //             <button onClick={() => handleDelete(b._id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>

// //       <h3>👥 Pending Counselor Requests</h3>
// //       {requests.length === 0 ? (
// //         <p>No pending requests</p>
// //       ) : (
// //         <ul>
// //           {requests.map((r) => (
// //             <li key={r._id}>
// //               {r.name} - {r.email}
// //               <button onClick={() => handleApprove(r._id)}>Approve</button>
// //               <button onClick={() => handleReject(r._id)}>Reject</button>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import API from "../api/api";

// const AdminDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [report, setReport] = useState([]);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [loading, setLoading] = useState(false);
//   const [amount, setAmount] = useState(50);
//   const token = localStorage.getItem("token");

//   // ---------- BLOGS ----------
//   const fetchBlogs = async () => {
//     try {
//       const { data } = await API.get("/blogs/admin/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBlogs(data.data);
//     } catch (err) {
//       console.error("Blog fetch error:", err);
//     }
//   };

//   // ---------- COUNSELOR REQUESTS ----------
//   const fetchRequests = async () => {
//     try {
//       const { data } = await API.get("/counselors/requests", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRequests(data.data);
//     } catch (err) {
//       console.error("Requests fetch error:", err);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await API.put(`/counselors/approve/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRequests(requests.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error("Approve error:", err);
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await API.put(`/counselors/reject/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRequests(requests.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };

//   // ---------- MONTHLY REPORT ----------
//   const fetchMonthlyReport = async () => {
//     try {
//       setLoading(true);
//       const { data } = await API.get(`/payout/monthly-report?month=${month}&year=${year}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) setReport(data.report);
//       else alert("No report found for this month");
//     } catch (err) {
//       console.error("Report fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- ADMIN PAYOUT ----------
//   const handleAdminPayout = async (counselorId, amount) => {
//     try {
//       const res = await fetch(
//         "http://localhost:5011/api/payout/admin-checkout-session",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({ counselorId, amount }),
//         }
//       );
  
//       const data = await res.json();
//       if (data.success) {
//         // Redirect admin to Stripe payment page
//         window.location.href = data.url;
//       } else {
//         alert("Failed to create Stripe payment session: " + data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error creating Stripe payment session");
//     }
//   };
  
//   // ---------- FETCH ON LOAD ----------
//   useEffect(() => {
//     fetchBlogs();
//     fetchRequests();
//     fetchMonthlyReport();
//   }, [token]);

//   // ---------- UI ----------
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center" }}>👑 Admin Dashboard</h1>

//       {/* ---------- BLOGS SECTION ---------- */}
//       <section style={{ marginTop: "30px" }}>
//         <h2>📰 All Blogs</h2>
//         {blogs.length === 0 ? (
//           <p>No blogs available</p>
//         ) : (
//           <ul>
//             {blogs.map((b) => (
//               <li key={b._id}>
//                 <strong>{b.title}</strong> by {b.author.name} ({b.author.role})
//                 <button
//                   style={{ marginLeft: "10px" }}
//                   onClick={() => handleDelete(b._id)}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* ---------- COUNSELOR REQUESTS ---------- */}
//       <section style={{ marginTop: "40px" }}>
//         <h2>👥 Pending Counselor Requests</h2>
//         {requests.length === 0 ? (
//           <p>No pending requests</p>
//         ) : (
//           <ul>
//             {requests.map((r) => (
//               <li key={r._id}>
//                 {r.name} - {r.email}
//                 <button
//                   style={{ marginLeft: "10px" }}
//                   onClick={() => handleApprove(r._id)}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   style={{ marginLeft: "5px" }}
//                   onClick={() => handleReject(r._id)}
//                 >
//                   Reject
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* ---------- MONTHLY PAYOUT REPORT ---------- */}
//       <section style={{ marginTop: "40px" }}>
//         <h2>💸 Counselor Monthly Earnings</h2>

//         <div style={{ marginBottom: "15px" }}>
//           <label>
//             Month:{" "}
//             <input
//               type="number"
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               min="1"
//               max="12"
//               style={{ width: "60px" }}
//             />
//           </label>
//           <label style={{ marginLeft: "10px" }}>
//             Year:{" "}
//             <input
//               type="number"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               style={{ width: "80px" }}
//             />
//           </label>
//           <button
//             onClick={fetchMonthlyReport}
//             style={{ marginLeft: "10px" }}
//           >
//             🔄 Refresh Report
//           </button>
//         </div>

//         {loading ? (
//           <p>Loading report...</p>
//         ) : report.length === 0 ? (
//           <p>No data available</p>
//         ) : (
//           <table
//             border="1"
//             cellPadding="8"
//             style={{ borderCollapse: "collapse", width: "100%" }}
//           >
//             <thead>
//               <tr>
//                 <th>Counselor</th>
//                 <th>Email</th>
//                 <th>Sessions</th>
//                 <th>Total Earnings ($)</th>
//                 <th>Pay</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.map((item) => (
//                 <tr key={item.counselor._id}>
//                   <td>{item.counselor.name}</td>
//                   <td>{item.counselor.email}</td>
//                   <td>{item.sessionCount}</td>
//                   <td>{item.totalEarnings.toFixed(2)}</td>
//                   <td>
//                     <button
//                        onClick={() => handleAdminPayout(item.counselor._id, item.totalEarnings)}
//                     >
//                       Pay Now
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import API from "../api/api";
import PaymentButton from "../pages/PaymentButton";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [report, setReport] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // ---------- FETCH ALL BLOGS ----------
  const fetchBlogs = async () => {
    try {
      const { data } = await API.get("/blogs/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(data.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete blog error:", err);
    }
  };

  const handleUpdateBlog = (id) => {
    // Navigate to blog update page
    window.location.href = `/update-blog/${id}`;
  };

  // ---------- FETCH ALL COUNSELORS ----------
  const fetchCounselors = async () => {
    try {
      const { data } = await API.get("/counselors/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounselors(data.data);
    } catch (err) {
      console.error("Error fetching counselors:", err);
    }
  };

  // ---------- MONTHLY REPORT ----------
  const fetchMonthlyReport = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `/payout/monthly-report?month=${month}&year=${year}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) setReport(data.report);
      else setReport([]);
    } catch (err) {
      console.error("Error fetching monthly report:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- FETCH ON LOAD ----------
  useEffect(() => {
    fetchBlogs();
    fetchCounselors();
    fetchMonthlyReport();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>👑 Admin Dashboard</h1>

      {/* ---------- BLOGS SECTION ---------- */}
      <section style={{ marginTop: "30px" }}>
        <h2>📰 All Blogs</h2>
        {blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          <ul>
            {blogs.map((b) => (
              <li key={b._id} style={{ marginBottom: "8px" }}>
                <strong>{b.title}</strong> by {b.author.name} ({b.author.role})
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleUpdateBlog(b._id)}
                >
                  Update
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => handleDeleteBlog(b._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ---------- COUNSELOR LIST ---------- */}
      <section style={{ marginTop: "40px" }}>
        <h2>👥 All Counselors</h2>
        {counselors.length === 0 ? (
          <p>No counselors available</p>
        ) : (
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
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
                    <PaymentButton
                      amount={c.totalEarnings || 50} // total earnings for admin payment
                      counselorId={c._id}
                      counselorName={c.name}
                      type="admin"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ---------- MONTHLY PAYOUT REPORT ---------- */}
      <section style={{ marginTop: "40px" }}>
        <h2>💸 Counselor Monthly Earnings</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Month:{" "}
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
              style={{ width: "60px" }}
            />
          </label>
          <label style={{ marginLeft: "10px" }}>
            Year:{" "}
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{ width: "80px" }}
            />
          </label>
          <button onClick={fetchMonthlyReport} style={{ marginLeft: "10px" }}>
            🔄 Refresh Report
          </button>
        </div>

        {loading ? (
          <p>Loading report...</p>
        ) : report.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
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
                    <PaymentButton
                      amount={item.totalEarnings}
                      counselorId={item.counselor._id}
                      counselorName={item.counselor.name}
                      type="admin"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;

