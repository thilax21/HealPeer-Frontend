// import React from "react";
// import { Link } from "react-router-dom";
// // Assuming 'lucide-react' for modern icons
// import { MessageSquare, Heart, BookOpen, CalendarCheck, Zap, UserCheck, Lock, TrendingUp } from 'lucide-react'; 

// const services = [
//   { icon: <UserCheck size={28} />, title: "Expert Matching", description: "Find the perfect licensed counselor matched to your specific needs." },
//   { icon: <MessageSquare size={28} />, title: "Unlimited Messaging", description: "Send unlimited texts to your therapist, whenever you need support." },
//   { icon: <Lock size={28} />, title: "Complete Privacy", description: "Your sessions and data are always secure and confidential." },
//   { icon: <CalendarCheck size={28} />, title: "Flexible Scheduling", description: "Book video or phone sessions at a time that works for you." },
// ];

// const howItWorks = [
//     { step: 1, icon: <Heart size={24} />, title: "Take Assessment", description: "Complete a simple questionnaire to help us understand your needs." },
//     { step: 2, icon: <UserCheck size={24} />, title: "Get Matched", description: "We instantly match you with the best-suited licensed therapist." },
//     { step: 3, icon: <Zap size={24} />, title: "Start Healing", description: "Begin your personalized sessions and start your wellness journey." },
// ];

// const testimonials = [
//   "HealPeer gave me the courage to face my challenges. The platform is incredibly easy to use and the support is genuine.",
//   "I love the flexibility of the messaging service. It feels like I have a safety net whenever I need immediate guidance.",
// ];

// const Home = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      
//       {/* 🌟 Hero Section - Soft and Uplifting */}
//       <section className="relative overflow-hidden pt-24 pb-32 bg-gradient-to-br from-blue-50 to-pink-50">
        
//         {/* Soft Background Blur */}
//         <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1543336783-a744234f9a06?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>

//         <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          
//           {/* Text Content */}
//           <div className="max-w-xl text-center md:text-left">
//             <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-5 leading-tight drop-shadow-sm">
//               Your Journey to a <span className="text-pink-600">Happier Mind</span> Starts Here
//             </h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Compassionate, convenient, and confidential online therapy for personal growth and emotional well-being.
//             </p>
            
//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//               <Link 
//                 to="/register" 
//                 className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-[1.02]"
//               >
//                 Get Started Today
//               </Link>
//               <Link 
//                 to="/book" 
//                 className="inline-flex items-center justify-center bg-white border-2 border-pink-500 text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-pink-50 transition"
//               >
//                 Book a Free Call
//               </Link>
//             </div>
//           </div>
          
//           {/* Image/Illustration */}
//           <div className="mt-12 md:mt-0 md:w-1/2 flex justify-end">
//             <img 
//               src="https://itdworld.com/blog/wp-content/uploads/2024/02/online-counseling.jpg" 
//               alt="Caring conversation illustration" 
//               className="rounded-[40px] shadow-2xl border-4 border-white object-cover w-full max-w-md transform transition duration-500" 
//             />
//           </div>
//         </div>
//       </section>
// <br></br><br></br>
//       {/* 🚀 Feature / Service Section - Clean & Trustworthy */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Why Choose HealPeer?</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, index) => (
//             <div 
//               key={index} 
//               className="bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-3xl p-8 text-center flex flex-col items-center border-t-4 border-pink-500"
//             >
//               <div className={`text-4xl mb-4 p-4 rounded-full bg-blue-100 text-blue-600`}>
//                 {service.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-blue-800">{service.title}</h3>
//               <p className="text-gray-600 text-base">{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//       <br></br><br></br>
//       {/* ⚙️ How It Works Section - Simple 3-Step Flow */}
//       <section className="bg-white py-20 border-t border-b border-gray-100">
//         <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Your 3 Steps to Clarity</h2>
//         <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 relative">
//             {/* Decorative Flow Line */}
//             <div className="absolute top-1/2 left-0 right-0 h-1 bg-pink-200 hidden md:block z-0"></div>

//             {howItWorks.map((item, index) => (
//                 <div key={index} className="flex flex-col items-center text-center z-10 p-4">
//                     <div className="relative mb-6">
//                         <div className="text-5xl font-extrabold text-white bg-pink-500 w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
//                             {item.step}
//                         </div>
//                     </div>
//                     <div className={`text-3xl text-blue-600 mb-4`}>{item.icon}</div>
//                     <h3 className="text-xl font-bold mb-2 text-blue-800">{item.title}</h3>
//                     <p className="text-gray-600">{item.description}</p>
//                 </div>
//             ))}
//         </div>
//       </section>

// <br></br><br></br>
//       {/* 💬 Testimonials - Focused on Trust */}
//       <section className="bg-gray-50 px-6 py-20">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">Hear From Those We've Helped</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {testimonials.map((quote, index) => (
//               <div key={index} className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-blue-400 flex flex-col h-full transform transition hover:shadow-xl">
//                 <p className="text-4xl text-blue-400 mb-4">“</p>
//                 <blockquote className="italic text-gray-700 text-lg flex-grow">
//                   <p>{quote}</p>
//                 </blockquote>
//                 <p className="mt-4 text-sm font-semibold text-pink-600">— Verified Client</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
// <br></br><br></br>
//       {/* 🚨 Crisis Banner - Essential for Wellness Sites */}
    

//       {/* Final Call to Action - Soft and Direct */}
//       <section className="text-center max-w-4xl mx-auto px-6 py-24">
//         <h2 className="text-4xl font-extrabold text-blue-900 mb-4">Ready for a Brighter Tomorrow?</h2>
//         <p className="text-xl text-gray-600 mb-10">Confidential help is just a few clicks away. Start your assessment now.</p>
//         <div className="flex gap-8 ">
//         <Link 
//             to="/register" 
//             className="inline-block bg-pink-500 text-white font-extrabold px-16 py-4 rounded-full shadow-2xl hover:bg-pink-600 transition transform hover:scale-105"
//         >
//             Start Your Free Assessment
//         </Link> 
//         <br></br>
//         <Link 
//             to="/chat" 
//             className="inline-block bg-pink-500 text-white font-extrabold px-16 py-4 rounded-full shadow-2xl hover:bg-pink-600 transition transform hover:scale-105"
//         >
//             start ai chat
//         </Link>
//         </div>

//       </section>

//       {/* Footer - Professional and Clear */}
//       <footer className="bg-blue-900 px-6 py-8 text-sm text-center text-blue-200">
//         <div className="max-w-7xl mx-auto">
//             <p className="text-lg font-semibold mb-4 text-white">HealPeer</p>
//             <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4">
//                 <Link to="#" className="hover:text-pink-400 transition">Our Therapists</Link>
//                 <Link to="#" className="hover:text-pink-400 transition">Pricing</Link>
//                 <Link to="#" className="hover:text-pink-400 transition">FAQ</Link>
//                 <Link to="#" className="hover:text-pink-400 transition">Contact</Link>
//             </div>
//             <p className="mt-6 border-t border-blue-800 pt-4">© 2025 HealPeer. All rights reserved. | Built with compassion.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { 
//   MessageCircle, 
//   Zap, 
//   UserCheck, 
//   ArrowRight, 
//   Star,
//   HeartHandshake,
//   Quote
// } from "lucide-react";

// // --- Components ---

// // A reusable Wave separator to make the design look "Organic"
// const WaveTop = ({ color }) => (
//   <div className={`w-full overflow-hidden leading-[0] rotate-180 text-${color}`}>
//     <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//       <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
//     </svg>
//   </div>
// );

// const WaveBottom = ({ color }) => (
//   <div className={`w-full overflow-hidden leading-[0] text-${color}`}>
//     <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//       <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
//     </svg>
//   </div>
// );

// const counselors = [
//   { name: "Dr. Sarah J.", role: "Anxiety Specialist", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
//   { name: "Mark T.", role: "Family Therapy", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
//   { name: "Elena R.", role: "Trauma Informed", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
// ];

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-[#FFFBF5] font-sans text-slate-800 overflow-x-hidden">
      
//       {/* --- HERO SECTION (Warm & Emotional) --- */}
//       <section className="relative pt-12 pb-20 px-6 lg:pt-24 lg:pb-32">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
//           {/* Left: Text */}
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-sm mb-6 tracking-wide">
//               🌱 Healing begins here
//             </div>
//             <h1 className="text-5xl lg:text-7xl font-serif font-medium text-slate-900 leading-[1.1] mb-8">
//               Find clarity in the <br />
//               <span className="text-teal-700 italic">chaos.</span>
//             </h1>
//             <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-md">
//               A safe space that combines the speed of <strong>AI</strong> with the warmth of <strong>Human Connection</strong>.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link to="/chat" className="flex items-center justify-center px-8 py-4 bg-teal-800 text-white rounded-full text-lg font-medium hover:bg-teal-900 transition shadow-xl shadow-teal-900/20">
//                 Start AI Chat
//               </Link>
//               <Link to="/video" className="flex items-center justify-center px-8 py-4 bg-[#F2E8CF] text-teal-900 rounded-full text-lg font-medium hover:bg-[#E5D8B5] transition">
//                 Watch Video <div className="ml-2 bg-teal-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">▶</div>
//               </Link>
//             </div>

//             <div className="mt-12 flex items-center gap-4">
//                <div className="flex -space-x-3">
//                  <div className="w-10 h-10 rounded-full border-2 border-[#FFFBF5] bg-gray-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt=""/></div>
//                  <div className="w-10 h-10 rounded-full border-2 border-[#FFFBF5] bg-gray-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=5" alt=""/></div>
//                  <div className="w-10 h-10 rounded-full border-2 border-[#FFFBF5] bg-gray-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=9" alt=""/></div>
//                </div>
//                <div className="text-sm font-medium text-slate-500">
//                  <span className="text-teal-800 font-bold">4.9/5</span> rating from 12k+ members
//                </div>
//             </div>
//           </motion.div>

//           {/* Right: Organic Image Shape */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//             className="relative"
//           >
//             <div className="relative z-10 overflow-hidden rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-2xl shadow-orange-200 border-4 border-white w-full aspect-square">
//               <img 
//                 src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80" 
//                 alt="Peaceful Woman" 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             {/* Decorative Element */}
//             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
//             <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
//           </motion.div>
//         </div>
//       </section>

//       {/* --- TRANSITION WAVE --- */}
//       <WaveTop color="white" />

//       {/* --- THE JOURNEY (White Background) --- */}
//       <section className="bg-white py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-20">
//             <h2 className="text-4xl md:text-5xl font-serif text-teal-900 mb-4">How HealPeer Works</h2>
//             <p className="text-lg text-slate-500">We bridge the gap between technology and empathy.</p>
//           </div>

//           <div className="relative grid md:grid-cols-3 gap-12">
//             {/* Dashed Line (Desktop) */}
//             <div className="hidden md:block absolute top-12 left-0 w-full border-t-2 border-dashed border-teal-100 -z-10"></div>

//             {/* Step 1 */}
//             <div className="bg-[#FFFBF5] p-8 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-lg rounded-br-lg text-center shadow-sm hover:shadow-xl transition duration-300 group">
//               <div className="w-20 h-20 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition">
//                 <MessageCircle size={32} className="text-teal-700" />
//               </div>
//               <h3 className="text-xl font-bold text-teal-900 mb-3">1. Instant Support</h3>
//               <p className="text-slate-600 text-sm leading-relaxed">
//                 Don't wait. Chat with our AI immediately to vent, organize your feelings, and feel heard instantly.
//               </p>
//             </div>

//             {/* Step 2 (The Star) */}
//             <div className="bg-teal-800 text-white p-8 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg text-center shadow-2xl transform md:-translate-y-6 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
//               <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border-4 border-white/20">
//                 <Zap size={32} className="text-orange-300" />
//               </div>
//               <h3 className="text-2xl font-bold mb-3">2. The Bridge</h3>
//               <p className="text-teal-100 text-sm leading-relaxed">
//                 <strong>The Magic Moment:</strong> After 5 minutes, we analyze your needs securely and match you with a human expert.
//               </p>
//             </div>

//             {/* Step 3 */}
//             <div className="bg-[#FFFBF5] p-8 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-lg rounded-br-lg text-center shadow-sm hover:shadow-xl transition duration-300 group">
//               <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition">
//                 <HeartHandshake size={32} className="text-orange-600" />
//               </div>
//               <h3 className="text-xl font-bold text-teal-900 mb-3">3. Human Healing</h3>
//               <p className="text-slate-600 text-sm leading-relaxed">
//                 Connect with a licensed therapist who already understands your context. No starting from scratch.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- TRANSITION WAVE --- */}
//       <WaveBottom color="teal-900" />

//       {/* --- COUNSELOR SECTION (Dark & Elegant) --- */}
//       <section className="bg-teal-900 py-24 px-6 text-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-end mb-16">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#F2E8CF]">Real Experts. <br/>Real Empathy.</h2>
//               <p className="text-teal-200 max-w-md">Our counselors are licensed, verified, and hand-picked to support your journey.</p>
//             </div>
//             <Link to="/counselors" className="mt-6 md:mt-0 px-6 py-3 border border-teal-600 rounded-full hover:bg-teal-800 transition flex items-center gap-2">
//               Meet the Team <ArrowRight size={18}/>
//             </Link>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {counselors.map((c, i) => (
//               <div key={i} className="group bg-white/5 border border-white/10 p-4 rounded-3xl hover:bg-white/10 transition duration-500 cursor-pointer">
//                 <div className="h-64 w-full rounded-2xl overflow-hidden mb-6 relative">
//                   <img src={c.img} alt={c.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500 transform group-hover:scale-105" />
//                   <div className="absolute top-4 right-4 bg-white text-teal-900 p-2 rounded-full shadow-lg">
//                     <UserCheck size={16} />
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-serif mb-1">{c.name}</h3>
//                 <p className="text-teal-300 text-sm uppercase tracking-widest mb-4">{c.role}</p>
//                 <div className="flex items-center gap-2 text-sm text-slate-300">
//                    <Star size={14} className="fill-orange-400 text-orange-400" /> 5.0 Rating
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- BLOG / LIFESTYLE SECTION --- */}
//       <section className="py-24 px-6 bg-[#FFFBF5]">
//         <div className="max-w-7xl mx-auto">
//            <h2 className="text-4xl font-serif text-teal-900 text-center mb-16">Stories from the Heart</h2>
           
//            <div className="grid md:grid-cols-2 gap-12 items-center">
//              {/* Featured Article */}
//              <div className="relative rounded-3xl overflow-hidden group shadow-2xl">
//                <img src="https://images.unsplash.com/photo-1518531933037-9a61605be81b?auto=format&fit=crop&w=800&q=80" alt="Journaling" className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-105" />
//                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>
//                <div className="absolute bottom-0 left-0 p-10 text-white">
//                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block">Editor's Pick</span>
//                  <h3 className="text-3xl font-serif mb-4">Why "Hybrid Therapy" is the future of mental health.</h3>
//                  <button className="flex items-center gap-2 text-sm font-bold border-b border-white pb-1">Read Story <ArrowRight size={14}/></button>
//                </div>
//              </div>

//              {/* Side Articles */}
//              <div className="space-y-8">
//                {[
//                  {title: "5 Minutes of calm: How AI triage works", cat: "Technology"},
//                  {title: "Overcoming social anxiety in the digital age", cat: "Wellness"},
//                  {title: "A letter from our lead psychologist", cat: "Community"},
//                ].map((item, i) => (
//                  <div key={i} className="flex gap-6 group cursor-pointer border-b border-gray-200 pb-8 last:border-0">
//                    <div className="text-teal-200 text-6xl font-serif leading-none opacity-50 group-hover:text-teal-900 transition">0{i+1}</div>
//                    <div>
//                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">{item.cat}</span>
//                      <h4 className="text-2xl font-serif text-teal-900 mt-2 group-hover:text-orange-600 transition">{item.title}</h4>
//                    </div>
//                  </div>
//                ))}
//              </div>
//            </div>
//         </div>
//       </section>

//       {/* --- CALL TO ACTION --- */}
//       <section className="py-20 px-6 bg-orange-50">
//          <div className="max-w-4xl mx-auto text-center">
//            <Quote size={48} className="mx-auto text-teal-200 mb-8" />
//            <h2 className="text-4xl md:text-6xl font-serif text-teal-900 mb-8 leading-tight">
//              "HealPeer didn't just give me a therapist. It gave me a safety net."
//            </h2>
//            <p className="text-slate-500 mb-10">— Jessica M., Member since 2024</p>
           
//            <div className="flex justify-center gap-4">
//              <Link to="/chat" className="bg-teal-900 text-white px-10 py-4 rounded-full font-medium hover:bg-teal-800 transition shadow-xl">
//                Start Your Journey
//              </Link>
//            </div>
//          </div>
//       </section>

//       {/* --- FOOTER --- */}
//       <footer className="bg-[#FFFBF5] border-t border-teal-100 py-12 px-6">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
//           <div className="font-serif text-2xl text-teal-900">HealPeer.</div>
//           <div className="flex gap-8">
//             <Link to="#" className="hover:text-teal-900">Terms</Link>
//             <Link to="#" className="hover:text-teal-900">Privacy</Link>
//             <Link to="#" className="hover:text-teal-900">Instagram</Link>
//           </div>
//           <div>© 2025 HealPeer Inc.</div>
//         </div>
//       </footer>

//     </div>
//   );
// };

// // export default Home;


// import React, { useRef } from "react";
// import { Link } from "react-router-dom";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { 
//   MessageCircle, 
//   Zap, 
//   User, 
//   ArrowRight, 
//   PenTool,
//   ArrowUpRight,
//   Play
// } from "lucide-react";

// // --- 1. TEXTURE COMPONENT (The "Paper" Look) ---
// const NoiseBackground = () => (
//   <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
//     style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
//   </div>
// );

// // --- 2. STICKY CARD COMPONENT (The Core Animation) ---
// const StickyCard = ({ title, sub, icon: Icon, img, index, color, link, linkText }) => {
//   return (
//     <div className="sticky top-24 mb-12 w-full max-w-5xl mx-auto">
//       <motion.div 
//         initial={{ y: 50, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className={`relative overflow-hidden rounded-[3rem] ${color} p-8 md:p-16 shadow-2xl border border-black/5 h-[600px] flex flex-col md:flex-row items-center gap-12`}
//       >
//         {/* Text Side */}
//         <div className="flex-1 z-10">
//           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 border border-black/10 shadow-sm">
//             <Icon size={32} className="text-slate-900" />
//           </div>
//           <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Step 0{index}</div>
//           <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">{title}</h2>
//           <p className="text-xl text-slate-600 mb-8 leading-relaxed">{sub}</p>
//           <Link to={link} className="inline-flex items-center gap-2 text-lg font-bold border-b-2 border-black pb-1 hover:gap-4 transition-all">
//             {linkText} <ArrowRight size={20} />
//           </Link>
//         </div>

//         {/* Image Side */}
//         <div className="flex-1 h-full w-full relative rounded-[2rem] overflow-hidden shadow-xl group">
//            <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const Home = () => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: targetRef });
  
//   const x = useTransform(scrollYProgress, [0, 1], ["1%", "-50%"]);

//   return (
//     <div className="min-h-screen bg-[#F4F2ED] text-slate-900 font-sans selection:bg-orange-200 overflow-x-hidden relative">
//       <NoiseBackground />

//       {/* --- NAVBAR (Minimal & Bottom) --- */}
//       <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
//         <div className="bg-slate-900/90 backdrop-blur-md text-white px-2 py-2 rounded-full flex items-center gap-1 shadow-2xl border border-white/10">
//           <Link to="/" className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm">Home</Link>
//           <Link to="/chat" className="px-6 py-3 rounded-full hover:bg-white/10 transition text-sm font-medium">AI Chat</Link>
//           <Link to="/find-therapist" className="px-6 py-3 rounded-full hover:bg-white/10 transition text-sm font-medium">Experts</Link>
//           <Link to="/blog" className="px-6 py-3 rounded-full hover:bg-white/10 transition text-sm font-medium">Journal</Link>
//         </div>
//       </nav>

//       {/* --- HERO SECTION (Cinematic) --- */}
//       <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//           className="relative z-10"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-white/50 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-8">
//              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
//              The Hybrid Therapy Platform
//           </div>
          
//           <h1 className="text-[12vw] leading-[0.8] font-serif mb-6 text-slate-900 mix-blend-darken">
//             HealPeer<span className="text-orange-500">.</span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-slate-500 max-w-xl mx-auto mb-12 font-light leading-relaxed">
//             A seamless bridge between <span className="text-slate-900 font-medium">Artificial Intelligence</span> and <span className="text-slate-900 font-medium">Human Empathy</span>.
//           </p>

//           <div className="flex items-center justify-center gap-4">
//              <Link to="/chat" className="bg-slate-900 text-white w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition duration-300 shadow-xl">
//                <ArrowDown size={24} className="animate-bounce" /> {/* Placeholder icon, or just arrow */}
//                <Zap size={24} />
//              </Link>
//              <span className="text-sm font-bold uppercase tracking-widest opacity-50">Start Now</span>
//           </div>
//         </motion.div>

//         {/* Hero Video/Image Background Blur */}
//         <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
//            <div className="w-[600px] h-[600px] bg-gradient-to-r from-orange-200 to-purple-200 rounded-full blur-[120px] animate-pulse"></div>
//         </div>
//       </section>

//       {/* --- THE SCROLLING CARDS (The Showstopper) --- */}
//       <section className="py-24 px-6">
//         <div className="max-w-3xl mx-auto text-center mb-24">
//            <h2 className="text-4xl md:text-5xl font-serif mb-6">The 5-Minute Bridge</h2>
//            <p className="text-xl text-slate-500">We realized that waiting for help is the hardest part. So we removed the wait.</p>
//         </div>

//         <div className="relative">
//           {/* CARD 1: AI */}
//           <StickyCard 
//             index="1"
//             color="bg-[#EFECE6]"
//             icon={MessageCircle}
//             title="Vent Instantly"
//             sub="No forms. No waiting rooms. Talk to our empathetic AI immediately to de-escalate stress and organize your thoughts."
//             link="/chat"
//             linkText="Start AI Chat"
//             img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
//           />

//           {/* CARD 2: THE BRIDGE */}
//           <StickyCard 
//             index="2"
//             color="bg-[#E3DCD2]" 
//             icon={Zap}
//             title="The Handover"
//             sub="After 5 minutes, if you need deeper support, our system summarizes your context securely. We find the perfect human match instantly."
//             link="/how-it-works"
//             linkText="See How it Works"
//             img="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
//           />

//           {/* CARD 3: HUMAN */}
//           <StickyCard 
//             index="3"
//             color="bg-[#1E293B] text-white" // Dark card for contrast
//             icon={User}
//             title="Human Healing"
//             sub="Connect with a licensed therapist who already knows your story. Skip the repetitive intakes and start healing immediately."
//             link="/find-therapist"
//             linkText="Find a Therapist"
//             img="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
//           />
//         </div>
//       </section>

//       {/* --- LIFESTYLE & BLOG (Horizontal Scroll Effect) --- */}
//       <section className="py-32 overflow-hidden bg-white">
//         <div className="px-6 mb-16 flex justify-between items-end max-w-7xl mx-auto">
//            <h2 className="text-5xl md:text-7xl font-serif text-slate-900">Wellness <br /> Culture</h2>
//            <Link to="/blog" className="hidden md:flex items-center gap-2 font-bold text-lg hover:text-orange-500 transition">
//              View Magazine <ArrowUpRight />
//            </Link>
//         </div>

//         {/* Horizontal Scroll Container */}
//         <div ref={targetRef} className="relative h-[300vh]">
//           <div className="sticky top-0 h-screen flex items-center overflow-hidden">
//             <motion.div style={{ x }} className="flex gap-12 px-6 md:px-24">
              
//               {/* Slide 1: Journal */}
//               <div className="w-[600px] h-[400px] md:h-[500px] flex-shrink-0 relative rounded-[2rem] overflow-hidden group cursor-pointer">
//                 <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
//                 <div className="absolute bottom-8 left-8 text-white">
//                   <PenTool className="mb-4" size={32} />
//                   <h3 className="text-4xl font-serif mb-2">Private Journal</h3>
//                   <p className="opacity-80">Write your thoughts securely.</p>
//                 </div>
//               </div>

//               {/* Slide 2: Stories */}
//               <div className="w-[600px] h-[400px] md:h-[500px] flex-shrink-0 relative rounded-[2rem] overflow-hidden group cursor-pointer">
//                 <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
//                 <div className="absolute bottom-8 left-8 text-white">
//                   <Play className="mb-4" size={32} />
//                   <h3 className="text-4xl font-serif mb-2">Community Stories</h3>
//                   <p className="opacity-80">Real people, real recovery.</p>
//                 </div>
//               </div>

//               {/* Slide 3: Expert Articles */}
//               <div className="w-[600px] h-[400px] md:h-[500px] flex-shrink-0 relative rounded-[2rem] overflow-hidden group cursor-pointer">
//                 <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
//                 <div className="absolute bottom-8 left-8 text-white">
//                   <ArrowUpRight className="mb-4" size={32} />
//                   <h3 className="text-4xl font-serif mb-2">Expert Insights</h3>
//                   <p className="opacity-80">Science-backed articles.</p>
//                 </div>
//               </div>

//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* --- MINIMAL FOOTER --- */}
//       <footer className="bg-[#1E293B] text-white py-24 px-6 rounded-t-[3rem]">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
//           <div>
//              <h2 className="text-6xl font-serif mb-8">HealPeer.</h2>
//              <p className="text-slate-400 max-w-md text-lg">
//                The hybrid platform connecting artificial intelligence speed with human expert depth.
//              </p>
//           </div>
//           <div className="grid grid-cols-2 gap-8">
//             <div>
//               <h4 className="font-bold mb-6 text-slate-200">Platform</h4>
//               <ul className="space-y-4 text-slate-400">
//                 <li><Link to="#" className="hover:text-white">AI Chat</Link></li>
//                 <li><Link to="#" className="hover:text-white">Therapists</Link></li>
//                 <li><Link to="#" className="hover:text-white">Journal</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-6 text-slate-200">Legal</h4>
//               <ul className="space-y-4 text-slate-400">
//                 <li><Link to="#" className="hover:text-white">Privacy</Link></li>
//                 <li><Link to="#" className="hover:text-white">HIPAA</Link></li>
//                 <li><Link to="#" className="hover:text-white">Terms</Link></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// };

// // Helper icon for hero
// const ArrowDown = ({ size, className }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
// )

// export default Home;










import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Brain, 
  MessageCircle, 
  PenTool, 
  Calendar, 
  ChevronRight, 
  Star, 
  Quote, 
  ArrowUpRight,
  Heart,
  Sparkles
} from "lucide-react";

// --- 1. BACKGROUND (Warm & Organic) ---
const OrganicBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#FDFCF8]">
    <motion.div 
      animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-orange-200/40 blur-[100px] mix-blend-multiply"
    />
    <motion.div 
      animate={{ x: [0, -30, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-200/30 blur-[100px] mix-blend-multiply"
    />
    <div className="absolute inset-0 opacity-[0.4] z-10 mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
  </div>
);

// --- 2. STICKY CARD (Services) ---
const StickyCard = ({ title, description, icon: Icon, img, index, accentColor, buttonColor }) => {
  return (
    <div className="sticky top-32 mb-12 w-full max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2.5rem] bg-white border border-stone-100 p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(60,40,30,0.08)] h-auto md:h-[580px] flex flex-col md:flex-row items-center gap-12 md:gap-20"
      >
        <div className="flex-1 z-10 flex flex-col justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${accentColor} shadow-md`}>
            <Icon size={28} className="text-white" />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-500 text-xs font-bold uppercase tracking-widest">Step 0{index}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6 text-stone-900">{title}</h2>
          <p className="text-lg text-stone-600 mb-10 leading-relaxed max-w-md">{description}</p>
          
          <Link to="/register" className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold shadow-lg transition-transform hover:scale-105 ${buttonColor}`}>
            Get Started
            <ChevronRight size={20} />
          </Link>
        </div>

        <div className="flex-1 h-[300px] md:h-full w-full relative rounded-[2rem] overflow-hidden shadow-inner group">
           <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition duration-500 z-10"></div>
           <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        </div>
      </motion.div>
    </div>
  );
};

// --- 3. TESTIMONIAL CARD (Glassy & Colorful) ---
const TestimonialCard = ({ text, author, role, accentColor }) => (
  <div className="w-[85vw] md:w-[450px] h-[400px] flex-shrink-0 relative rounded-[2.5rem] p-10 flex flex-col justify-between bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-transform hover:-translate-y-2">
    <Quote size={40} className="text-white/30" />
    <p className="text-2xl font-serif leading-snug text-white drop-shadow-sm">"{text}"</p>
    
    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
      <div className={`w-12 h-12 rounded-full ${accentColor} flex items-center justify-center text-lg font-bold shadow-lg text-white`}>
        {author.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-white tracking-wide">{author}</h4>
        <p className="text-xs uppercase tracking-wider opacity-70 text-white">{role}</p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div className="min-h-screen text-stone-900 font-sans selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden relative">
      <OrganicBackground />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-stone-100 shadow-sm flex items-center gap-2">
              <Sparkles size={16} className="text-rose-500 fill-rose-500" />
              <span className="font-serif font-bold text-xl tracking-tight text-stone-800">HealPeer</span>
           </div>

           <div className="hidden md:flex bg-white/80 backdrop-blur-md px-2 py-2 rounded-full border border-stone-100 shadow-sm items-center gap-1">
              <Link to="/login" className="px-6 py-3 rounded-full hover:bg-stone-100 transition text-sm font-bold text-stone-600">Login</Link>
              <Link to="/register" className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:scale-105 transition-all">
                Get Started
              </Link>
           </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-widest mb-8">
             <Heart size={12} className="fill-current" />
             Your Wellness Journey
          </div>
          
          <h1 className="text-[12vw] md:text-[7vw] leading-[0.95] font-serif tracking-tight mb-8 text-stone-900">
            Your Safe Space for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-purple-600">
              Healing & Growth
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Connect with professional counselors and join a supportive community. 
            Your journey to mental wellness starts here, on your terms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/register" className="px-10 py-5 rounded-full bg-stone-900 text-white font-bold text-lg shadow-2xl hover:bg-stone-800 hover:-translate-y-1 transition-all flex items-center gap-3">
               Start Counseling <ArrowUpRight />
             </Link>
             <Link to="/about" className="text-stone-600 font-bold hover:text-rose-500 transition border-b-2 border-stone-200 hover:border-rose-500 pb-1">
               How it works
             </Link>
          </div>
        </motion.div>
      </section>

      {/* --- SERVICES --- */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
           <h2 className="text-4xl md:text-5xl font-serif mb-6 text-stone-900">How We Help You</h2>
           <p className="text-lg text-stone-500">Comprehensive tools designed specifically for you.</p>
        </div>

        <div className="relative pb-24">
          <StickyCard 
            index="1"
            title="Personal Counseling"
            description="Talk privately with licensed experts to find clarity and peace in a safe environment."
            icon={Brain}
            img="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-rose-500"
            buttonColor="bg-rose-500 hover:bg-rose-600"
          />
          <StickyCard 
            index="2"
            title="Online Chat"
            description="Instant, anonymous chat with support counselors whenever you need someone to listen."
            icon={MessageCircle}
            img="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-orange-500"
            buttonColor="bg-orange-500 hover:bg-orange-600"
          />
          <StickyCard 
            index="3"
            title="Journal & Share"
            description="Express your thoughts through secure journaling and connect with community stories."
            icon={PenTool}
            img="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-indigo-500"
            buttonColor="bg-indigo-500 hover:bg-indigo-600"
          />
          <StickyCard 
            index="4"
            title="Book a Session"
            description="Schedule personalized video or audio counseling sessions that fit your calendar."
            icon={Calendar}
            img="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-teal-600"
            buttonColor="bg-teal-600 hover:bg-teal-700"
          />
        </div>
      </section>

      {/* --- TESTIMONIALS (UPDATED: RICH GRADIENT BG) --- */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 text-white overflow-hidden rounded-t-[3rem] relative z-20">
        {/* Floating blurred orbs for texture inside the dark area */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="px-6 mb-16 max-w-7xl mx-auto relative z-10">
           <div className="flex items-center gap-2 text-yellow-400 mb-4">
             {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
             <span className="text-white/70 ml-2 text-sm">4.9/5 Rating</span>
           </div>
           <h2 className="text-5xl md:text-6xl font-serif text-white">Stories of Hope</h2>
        </div>

        <div ref={targetRef} className="relative h-[250vh] z-10">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div style={{ x }} className="flex gap-8 px-6 md:px-24">
              
              <TestimonialCard 
                accentColor="bg-rose-500"
                text="HealPeer helped me open up when I needed it most. The counselor was kind, patient, and truly listened."
                author="Sarah Jenkins"
                role="Student"
              />

              <TestimonialCard 
                accentColor="bg-orange-500"
                text="The AI chat made it easy to start. I felt safe and supported throughout my session. It's exactly what I needed."
                author="Michael Thompson"
                role="Software Engineer"
              />

              <TestimonialCard 
                accentColor="bg-purple-500"
                text="I was skeptical about online therapy, but the professionals here are top-tier. The sessions have changed my life."
                author="Elena Rodriguez"
                role="Artist"
              />

            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOOTER (Matching Gradient Bottom) --- */}
      <footer className="bg-rose-900 text-white/60 pb-12 px-6 pt-12 relative z-20">
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <h2 className="text-2xl font-serif text-white mb-2">HealPeer.</h2>
             <p className="text-sm">© 2025 HealPeer Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm font-bold">
             <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
             <Link to="#" className="hover:text-white transition">Terms</Link>
             <Link to="#" className="hover:text-white transition">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;