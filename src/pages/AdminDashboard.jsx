

// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import PaymentButton from "../pages/PaymentButton";
// import { 
//   LayoutDashboard, FileText, UserCheck, Users, 
//   PieChart, LogOut, Search, Calendar, 
//   Check, X, Trash2, Edit, Wallet, 
//   ArrowUpRight, ShieldAlert, Mail, Image as ImageIcon
// } from "lucide-react";

// // --- 🎨 VISUAL COMPONENTS ---

// const GrainTexture = () => (
//   <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
// );

// const StatCard = ({ title, value, icon: Icon, trend }) => (
//   <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all group">
//     <div className="flex justify-between items-start mb-4">
//       <div className="w-12 h-12 rounded-xl bg-[#f4f2ed] text-[#3f6212] flex items-center justify-center group-hover:bg-[#3f6212] group-hover:text-white transition-colors">
//         <Icon size={24} />
//       </div>
//       {trend && (
//         <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
//           <ArrowUpRight size={12} className="mr-1" /> {trend}%
//         </div>
//       )}
//     </div>
//     <h3 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
//     <div className="text-3xl font-serif font-bold text-[#1c1917]">{value}</div>
//   </div>
// );

// const StatusBadge = ({ status }) => {
//   const styles = {
//     Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
//     Pending: "bg-amber-100 text-amber-700 border-amber-200",
//     Rejected: "bg-rose-100 text-rose-700 border-rose-200",
//   };
//   return (
//     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status] || "bg-stone-100 text-stone-600"}`}>
//       {status}
//     </span>
//   );
// };

// // --- 🏛 MAIN DASHBOARD ---

// const AdminDashboard = () => {
//   // State
//   const [data, setData] = useState({ blogs: [], counselors: [], pending: [], clients: [], report: [] });
//   const [filters, setFilters] = useState({ month: new Date().getMonth() + 1, year: new Date().getFullYear(), search: "" });
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   // --- Data Fetching ---
//   const refreshData = async () => {
//     setLoading(true);
//     try {
//       const headers = { Authorization: `Bearer ${token}` };
//       const [blogsRes, counselorsRes, pendingRes, clientsRes] = await Promise.all([
//         API.get("/blogs/admin/all", { headers }),
//         API.get("/counselors/all", { headers }),
//         API.get("/counselors/pending", { headers }),
//         API.get("/users/clients", { headers }) 
//       ]);
      
//       setData(prev => ({ 
//         ...prev, 
//         blogs: blogsRes.data.data || [], 
//         counselors: counselorsRes.data.data || [], 
//         pending: pendingRes.data.data || [], 
//         clients: clientsRes.data.data || [] 
//       }));
//     } catch (e) { console.error(e); } 
//     finally { setLoading(false); }
//   };

//   const fetchReport = async () => {
//     try {
//       const res = await API.get(`/payout/monthly-report?month=${filters.month}&year=${filters.year}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setData(prev => ({ ...prev, report: res.data.success ? res.data.report : [] }));
//     } catch (e) { console.error(e); }
//   };

//   useEffect(() => { refreshData(); fetchReport(); }, [token]);

//   // --- Actions ---
//   const handleApprove = async (id) => { await API.put(`/counselors/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }); refreshData(); };
//   const handleReject = async (id) => { await API.put(`/counselors/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }); refreshData(); };
//   const handleDeleteBlog = async (id) => { if(confirm("Delete this blog?")) { await API.delete(`/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } }); refreshData(); }};
//   const handleUpdateBlog = (id) => { window.location.href = `/update-blog/${id}`; };

//   // --- Navigation Items ---
//   const menuItems = [
//     { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
//     { id: 'pending', icon: UserCheck, label: 'Approvals', badge: data.pending.length },
//     { id: 'counselors', icon: ShieldAlert, label: 'Counselors' },
//     { id: 'clients', icon: Users, label: 'Clients' },
//     { id: 'blogs', icon: FileText, label: 'Content' },
//     { id: 'report', icon: PieChart, label: 'Financials' },
//   ];

//   return (
//     <div className="flex h-screen bg-[#f4f2ed] font-sans text-[#1c1917] overflow-hidden selection:bg-[#3f6212] selection:text-white">
//       <GrainTexture />
      
//       {/* 1. BLACK SIDEBAR */}
//       <aside className="w-64 bg-[#1c1917] text-[#f2f0e9] flex flex-col fixed h-full z-20 shadow-2xl border-r border-stone-800">
        
//         {/* Sidebar Header */}
//         <div className="p-8 flex items-center gap-3 border-b border-white/5">
//           <div className="w-10 h-10 bg-[#3f6212] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">H</div>
//           <div>
//             <h1 className="font-serif font-bold text-xl tracking-tight text-white">HealPeer<span className="text-[#3f6212]">.</span></h1>
//             <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Admin Portal</p>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                 activeTab === item.id 
//                   ? "bg-[#3f6212] text-white shadow-lg" 
//                   : "text-stone-400 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <item.icon size={18} />
//                 {item.label}
//               </div>
//               {item.badge > 0 && (
//                 <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
//                   {item.badge}
//                 </span>
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Sidebar Footer */}
//         <div className="p-6 border-t border-white/10">
//           <button className="w-full flex items-center justify-center gap-2 text-red-400 bg-white/5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-900/30 transition-colors">
//             <LogOut size={14} /> Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* 2. MAIN CONTENT */}
//       <main className="flex-1 ml-64 flex flex-col h-full overflow-hidden bg-[#f8fafc] relative z-10 top-30">
        
//         {/* Header */}
//         <header className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
//           <div>
//             <h2 className="text-2xl font-serif font-bold capitalize text-[#1c1917]">{activeTab}</h2>
//             <p className="text-xs text-stone-500">Welcome back, Admin.</p>
//           </div>
//           <div className="flex items-center gap-4">
//              <div className="relative">
//                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
//                <input 
//                  type="text" placeholder="Search database..." 
//                  className="pl-10 pr-4 py-2 bg-[#f4f2ed] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#3f6212] w-64 text-[#1c1917] outline-none placeholder:text-stone-400"
//                />
//              </div>
//              <div className="w-10 h-10 bg-[#1c1917] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">AD</div>
//           </div>
//         </header>

//         {/* Content Scroll Area */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">

//           {/* VIEW: OVERVIEW */}
//           {activeTab === "overview" && (
//             <div className="space-y-8">
//               {/* Stats Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//                 <StatCard title="Total Revenue" value="$24,500" icon={Wallet} trend="12" />
//                 <StatCard title="Active Counselors" value={data.counselors.length} icon={ShieldAlert} />
//                 <StatCard title="Pending Reviews" value={data.pending.length} icon={UserCheck} />
//                 <StatCard title="Total Clients" value={data.clients.length} icon={Users} trend="8" />
//               </div>

//               {/* Recent Pending List */}
//               <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col">
//                  <div className="flex justify-between items-center mb-6">
//                     <h3 className="font-serif font-bold text-lg text-[#1c1917]">Recent Requests</h3>
//                     <button onClick={() => setActiveTab('pending')} className="text-[#3f6212] text-xs font-bold uppercase hover:underline">View All Requests</button>
//                  </div>
                 
//                  <div className="space-y-4">
//                    {data.pending.length === 0 ? <div className="text-center text-stone-400 py-10">No pending items.</div> : 
//                      data.pending.slice(0, 5).map(p => (
//                        <div key={p._id} className="flex items-center justify-between p-4 bg-[#f9f8f6] rounded-xl border border-stone-100 hover:border-stone-300 transition-colors">
//                          <div className="flex items-center gap-4">
//                            <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-500 font-bold">{p.name[0]}</div>
//                            <div>
//                              <div className="font-bold text-sm text-[#1c1917]">{p.name}</div>
//                              <div className="text-xs text-stone-500">{p.specialization} • {p.experience} years</div>
//                            </div>
//                          </div>
//                          <button onClick={() => setActiveTab('pending')} className="bg-white border border-stone-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-stone-50 transition-colors">Review</button>
//                        </div>
//                      ))
//                    }
//                  </div>
//               </div>
//             </div>
//           )}

//           {/* VIEW: PENDING */}
//           {activeTab === "pending" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Applicant</th>
//                     <th className="px-6 py-4">Email</th>
//                     <th className="px-6 py-4">Expertise</th>
//                     <th className="px-6 py-4 text-right">Decision</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.pending.map(p => (
//                     <tr key={p._id} className="hover:bg-[#f9f8f6]">
//                       <td className="px-6 py-4 font-medium text-[#1c1917]">{p.name}</td>
//                       <td className="px-6 py-4 text-stone-500">{p.email}</td>
//                       <td className="px-6 py-4"><span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs font-bold">{p.specialization}</span></td>
//                       <td className="px-6 py-4 text-right space-x-2">
//                         <button onClick={() => handleReject(p._id)} className="px-3 py-1.5 border border-stone-300 rounded text-xs font-bold text-stone-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">Reject</button>
//                         <button onClick={() => handleApprove(p._id)} className="px-3 py-1.5 bg-[#3f6212] text-white rounded text-xs font-bold hover:bg-[#2f4b0d] shadow-sm">Approve</button>
//                       </td>
//                     </tr>
//                   ))}
//                   {data.pending.length === 0 && <tr><td colSpan="4" className="p-12 text-center text-stone-400 italic">No pending requests.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: CLIENTS */}
//           {activeTab === "clients" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <div className="p-6 border-b border-stone-100 bg-[#f9f8f6]">
//                 <h2 className="font-bold text-lg text-[#1c1917] flex items-center gap-2">
//                   <Users size={20} className="text-[#3f6212]" />
//                   Registered Client Base
//                 </h2>
//               </div>
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-white text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Client Profile</th>
//                     <th className="px-6 py-4">Email Address</th>
//                     <th className="px-6 py-4 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.clients.length === 0 ? (
//                     <tr><td colSpan="3" className="p-12 text-center text-stone-400 italic">No clients found.</td></tr>
//                   ) : (
//                     data.clients.map(c => (
//                       <tr key={c._id} className="hover:bg-[#f9f8f6] transition-colors">
//                         <td className="px-6 py-4 font-medium text-[#1c1917]">
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
//                               {c.name.charAt(0).toUpperCase()}
//                             </div>
//                             {c.name}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-stone-600">
//                           <div className="flex items-center gap-2">
//                             <Mail size={14} className="text-stone-400" />
//                             {c.email}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <button className="text-xs font-bold text-[#3f6212] hover:underline">View Profile</button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: COUNSELORS */}
//           {activeTab === "counselors" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Name</th>
//                     <th className="px-6 py-4">Specialization</th>
//                     <th className="px-6 py-4">Status</th>
//                     <th className="px-6 py-4">Total Earned</th>
//                     <th className="px-6 py-4 text-right">Payout</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.counselors.map(c => (
//                     <tr key={c._id} className="hover:bg-[#f9f8f6]">
//                       <td className="px-6 py-4 font-medium text-[#1c1917] flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-[#3f6212]/10 text-[#3f6212] flex items-center justify-center font-bold text-xs">{c.name[0]}</div>
//                         {c.name}
//                       </td>
//                       <td className="px-6 py-4 text-stone-500">{c.specialization}</td>
//                       <td className="px-6 py-4"><StatusBadge status={c.isApproved ? "Approved" : "Pending"} /></td>
//                       <td className="px-6 py-4 font-mono font-bold text-[#1c1917]">${c.totalEarnings || 0}</td>
//                       <td className="px-6 py-4 text-right">
//                         <PaymentButton amount={c.totalEarnings || 50} counselorId={c._id} counselorName={c.name} type="admin" />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: BLOGS (With Images) */}
//           {activeTab === "blogs" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                   <tr>
//                     <th className="px-6 py-4">Article</th>
//                     <th className="px-6 py-4">Author</th>
//                     <th className="px-6 py-4">Date</th>
//                     <th className="px-6 py-4 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {data.blogs.map(b => (
//                     <tr key={b._id} className="hover:bg-[#f9f8f6]">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-4">
//                           {/* Image */}
//                           {/* <div className="w-16 h-12 bg-stone-200 rounded-lg overflow-hidden shrink-0 border border-stone-100">
//                             {b.image || b.imageUrl ? (
//                               <img src={`http://localhost:3000${b.image || b.imageUrl}`} alt="" className="w-full h-full object-cover" />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center text-stone-400"><ImageIcon size={16} /></div>
//                             )}
//                           </div> */}
//                           {/* Title */}
//                           <div className="max-w-xs">
//                             <p className="font-bold text-[#1c1917] line-clamp-1">{b.title}</p>
//                             <p className="text-xs text-stone-500 line-clamp-1">{b.content}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-stone-600">{b.author?.name || "Unknown"}</td>
//                       <td className="px-6 py-4 text-stone-400 text-xs">{new Date(b.createdAt).toLocaleDateString()}</td>
//                       <td className="px-6 py-4 text-right flex justify-end gap-2 items-center h-full">
//                         <button onClick={() => handleUpdateBlog(b._id)} className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-[#3f6212] hover:text-white"><Edit size={14}/></button>
//                         <button onClick={() => handleDeleteBlog(b._id)} className="p-2 bg-stone-100 rounded text-stone-600 hover:bg-rose-600 hover:text-white"><Trash2 size={14}/></button>
//                       </td>
//                     </tr>
//                   ))}
//                   {data.blogs.length === 0 && <tr><td colSpan="4" className="p-12 text-center text-stone-400 italic">No articles found.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: FINANCIAL REPORT */}
//           {activeTab === "report" && (
//             <div className="space-y-6">
//               <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center gap-4 shadow-sm">
//                 <div className="flex items-center gap-2 bg-[#f4f2ed] px-4 py-2 rounded-lg border border-stone-100">
//                   <Calendar size={16} className="text-stone-400" />
//                   <select 
//                     value={filters.month} 
//                     onChange={e => setFilters({...filters, month: e.target.value})} 
//                     className="bg-transparent text-sm font-bold text-stone-700 outline-none cursor-pointer"
//                   >
//                     {Array.from({length: 12}, (_, i) => <option key={i} value={i+1}>{new Date(0, i).toLocaleString('default', {month: 'long'})}</option>)}
//                   </select>
//                 </div>
//                 <input 
//                   type="number" 
//                   value={filters.year} 
//                   onChange={e => setFilters({...filters, year: e.target.value})} 
//                   className="w-24 bg-[#f4f2ed] px-4 py-2 rounded-lg border border-stone-100 text-sm font-bold outline-none"
//                 />
//                 <button onClick={fetchReport} className="ml-auto bg-[#1c1917] text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#3f6212] transition-colors">
//                   Generate Report
//                 </button>
//               </div>

//               <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
//                 <table className="w-full text-left text-sm">
//                   <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
//                     <tr>
//                       <th className="px-6 py-4">Beneficiary</th>
//                       <th className="px-6 py-4">Sessions</th>
//                       <th className="px-6 py-4">Total Payout</th>
//                       <th className="px-6 py-4 text-right">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-stone-100">
//                     {data.report.map((item, i) => (
//                       <tr key={i} className="hover:bg-[#f9f8f6]">
//                         <td className="px-6 py-4 font-medium text-[#1c1917]">{item.counselor.name}</td>
//                         <td className="px-6 py-4 text-stone-600">{item.sessionCount} Sessions</td>
//                         <td className="px-6 py-4 font-bold text-emerald-600 font-mono">${item.totalEarnings.toFixed(2)}</td>
//                         <td className="px-6 py-4 text-right">
//                           <PaymentButton amount={item.totalEarnings} counselorId={item.counselor._id} counselorName={item.counselor.name} type="admin" />
//                         </td>
//                       </tr>
//                     ))}
//                     {data.report.length === 0 && <tr><td colSpan="4" className="p-12 text-center text-stone-400 italic">No data found.</td></tr>}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import API from "../api/api";
import PaymentButton from "../pages/PaymentButton";
import { 
  LayoutDashboard, FileText, UserCheck, Users, 
  PieChart, LogOut, Search, Calendar, Wallet, 
  ShieldAlert, Mail
} from "lucide-react";

// --- VISUAL COMPONENTS ---
const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />
);

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-[#f4f2ed] text-[#3f6212] flex items-center justify-center group-hover:bg-[#3f6212] group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      {trend && (
        <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          {trend}%
        </div>
      )}
    </div>
    <h3 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
    <div className="text-3xl font-serif font-bold text-[#1c1917]">{value}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Rejected: "bg-rose-100 text-rose-700 border-rose-200",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status] || "bg-stone-100 text-stone-600"}`}>
      {status}
    </span>
  );
};

// --- MAIN DASHBOARD ---
const AdminDashboard = () => {
  const [data, setData] = useState({
    blogs: [],
    counselors: [],
    pending: [],
    clients: [],
    report: [],
    stats: {},
  });
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    search: "",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // --- FETCH DATA ---
  const refreshData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [blogsRes, counselorsRes, pendingRes, clientsRes, statsRes] = await Promise.all([
        API.get("/blogs/admin/all", { headers }),
        API.get("/counselors/all", { headers }),
        API.get("/counselors/pending", { headers }),
        API.get("/users/clients", { headers }),
        API.get("/payout/dashboard-stats", { headers }),
      ]);
      
      setData(prev => ({
        ...prev,
        blogs: blogsRes.data.data || [],
        counselors: counselorsRes.data.data || [],
        pending: pendingRes.data.data || [],
        clients: clientsRes.data.data || [],
        stats: statsRes.data.stats || {},
      }));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchReport = async () => {
    try {
      const res = await API.get(`/payout/monthly-report?month=${filters.month}&year=${filters.year}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(prev => ({ ...prev, report: res.data.success ? res.data.report : [] }));
    } catch (e) { console.error(e); }
  };

  useEffect(() => { refreshData(); fetchReport(); }, [token]);

  // --- ACTIONS ---
  const handleApprove = async (id) => { await API.put(`/counselors/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }); refreshData(); };
  const handleReject = async (id) => { await API.put(`/counselors/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }); refreshData(); };
  const handleDeleteBlog = async (id) => { if(confirm("Delete this blog?")) { await API.delete(`/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } }); refreshData(); }};
  const handleUpdateBlog = (id) => { window.location.href = `/update-blog/${id}`; };

  // --- NAVIGATION ---
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'pending', icon: UserCheck, label: 'Approvals', badge: data.pending.length },
    { id: 'counselors', icon: ShieldAlert, label: 'Counselors' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'blogs', icon: FileText, label: 'Content' },
    { id: 'report', icon: PieChart, label: 'Financials' },
  ];

  return (
    <div className="flex h-screen bg-[#f4f2ed] font-sans text-[#1c1917] overflow-hidden selection:bg-[#3f6212] selection:text-white">
      <GrainTexture />
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1c1917] text-[#f2f0e9] flex flex-col fixed h-full z-20 shadow-2xl border-r border-stone-800">
        <div className="p-8 flex items-center gap-3 border-b border-white/5">
          <div className="w-10 h-10 bg-[#3f6212] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">H</div>
          <div>
            <h1 className="font-serif font-bold text-xl text-white">HealPeer<span className="text-[#3f6212]">.</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Admin Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab===item.id?"bg-[#3f6212] text-white shadow-lg":"text-stone-400 hover:bg-white/10 hover:text-white"}`}>
              <div className="flex items-center gap-3"><item.icon size={18}/>{item.label}</div>
              {item.badge>0 && <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 text-red-400 bg-white/5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-900/30">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col h-full overflow-hidden bg-[#f8fafc] relative z-10 top-30">
        <header className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-serif font-bold capitalize text-[#1c1917]">{activeTab}</h2>
            <p className="text-xs text-stone-500">Welcome back, Admin.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
               <input type="text" placeholder="Search database..." className="pl-10 pr-4 py-2 bg-[#f4f2ed] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#3f6212] w-64 text-[#1c1917] outline-none placeholder:text-stone-400" />
             </div>
             <div className="w-10 h-10 bg-[#1c1917] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">AD</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          
          {/* OVERVIEW */}
          {activeTab==="overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={data.stats.totalRevenue || 0} icon={Wallet} />
                <StatCard title="Active Counselors" value={data.stats.activeCounselors || 0} icon={ShieldAlert} />
                <StatCard title="Pending Reviews" value={data.pending.length} icon={UserCheck} />
                <StatCard title="Total Clients" value={data.clients.length} icon={Users} />
              </div>
            </div>
          )}

          {/* PENDING APPROVALS */}
          {activeTab==="pending" && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
                  <tr><th>Applicant</th><th>Email</th><th>Expertise</th><th className="text-right">Decision</th></tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {data.pending.map(p => (
                    <tr key={p._id} className="hover:bg-[#f9f8f6]">
                      <td className="px-6 py-4">{p.name}</td>
                      <td className="px-6 py-4">{p.email}</td>
                      <td className="px-6 py-4">{p.specialization}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={()=>handleReject(p._id)} className="px-3 py-1.5 border rounded text-xs text-stone-600 hover:bg-rose-50 hover:text-rose-600">Reject</button>
                        <button onClick={()=>handleApprove(p._id)} className="px-3 py-1.5 bg-[#3f6212] text-white rounded text-xs hover:bg-[#2f4b0d]">Approve</button>
                      </td>
                    </tr>
                  ))}
                  {data.pending.length===0 && <tr><td colSpan="4" className="p-12 text-center text-stone-400 italic">No pending requests.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {/* COUNSELORS LIST WITH PAYOUT */}
          {activeTab==="counselors" && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
                  <tr><th>Name</th><th>Specialization</th><th>Status</th><th>Total Earnings</th><th className="text-right">Payout</th></tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {data.counselors.map(c => (
                    <tr key={c._id} className="hover:bg-[#f9f8f6]">
                      <td className="px-6 py-4 flex items-center gap-3">{c.name}</td>
                      <td className="px-6 py-4">{c.specialization}</td>
                      <td className="px-6 py-4"><StatusBadge status={c.isApproved?"Approved":"Pending"} /></td>
                      <td className="px-6 py-4 font-bold text-[#1c1917]">{c.totalEarnings || 0}</td>
                      <td className="px-6 py-4 text-right">
                        <PaymentButton amount={c.totalEarnings||50} counselorId={c._id} counselorName={c.name} type="admin"/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* FINANCIAL REPORT */}
          {activeTab==="report" && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center gap-4 shadow-sm">
                <Calendar size={16} className="text-stone-400"/>
                <select value={filters.month} onChange={e=>setFilters({...filters, month:e.target.value})} className="bg-transparent outline-none text-sm font-bold">
                  {Array.from({length:12},(_,i)=><option key={i} value={i+1}>{new Date(0,i).toLocaleString('default',{month:'long'})}</option>)}
                </select>
                <input type="number" value={filters.year} onChange={e=>setFilters({...filters, year:e.target.value})} className="w-24 px-4 py-2 border rounded-lg"/>
                <button onClick={fetchReport} className="ml-auto bg-[#1c1917] text-white px-6 py-2 rounded-lg text-sm font-bold">Generate Report</button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
                    <tr><th>Beneficiary</th><th>Sessions</th><th>Total Payout</th><th className="text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {data.report.map((item,i)=>(
                      <tr key={i} className="hover:bg-[#f9f8f6]">
                        <td className="px-6 py-4">{item.counselor.name}</td>
                        <td className="px-6 py-4">{item.sessionCount} Sessions</td>
                        <td className="px-6 py-4 font-bold text-emerald-600">{item.totalEarnings.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <PaymentButton amount={item.totalEarnings} counselorId={item.counselor._id} counselorName={item.counselor.name} type="admin"/>
                        </td>
                      </tr>
                    ))}
                    {data.report.length===0 && <tr><td colSpan="4" className="p-12 text-center text-stone-400 italic">No data found.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
