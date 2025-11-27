import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign, Star, Calendar, MessageCircle, Video, Award, Users, BookOpen } from "lucide-react";

const CounselorProfile = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const fetchCounselorProfile = async () => {
      try {
        const { data } = await API.get(`/counselors/${id}`);
        setCounselor(data.data);
        
        // Mock reviews data - in real app, this would come from API
        const mockReviews = [
          {
            id: 1,
            clientName: "Sarah Johnson",
            rating: 5,
            comment: "Excellent counselor! Very professional and understanding. Helped me through a difficult time.",
            date: "2024-01-15"
          },
          {
            id: 2,
            clientName: "Mike Chen",
            rating: 4,
            comment: "Great experience. The sessions were very helpful and the counselor was very knowledgeable.",
            date: "2024-01-10"
          },
          {
            id: 3,
            clientName: "Emily Davis",
            rating: 5,
            comment: "Very compassionate and skilled. Would definitely recommend to others seeking help.",
            date: "2024-01-05"
          }
        ];
        
        setReviews(mockReviews);
        
        // Calculate average rating
        const avgRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
        setAverageRating(avgRating);
        
      } catch (err) {
        console.error("Error fetching counselor profile:", err);
        setError("Failed to load counselor profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCounselorProfile();
  }, [id]);

  const handleBookSession = () => {
    if (!user) {
      alert("Please login first to book a session");
      navigate("/login");
      return;
    }
    
    if (user.role !== "client") {
      alert("Only clients can book sessions");
      return;
    }
    
    navigate(`/counselor/${id}/book`);
  };

  const handleStartChat = () => {
    if (!user) {
      alert("Please login first to start a chat");
      navigate("/login");
      return;
    }
    
    navigate(`/chat/${id}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading counselor profile...</p>
        </div>
      </div>
    );
  }

  if (!counselor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Counselor not found</p>
          <button 
            onClick={() => navigate("/counselors")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Counselors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button 
            onClick={() => navigate("/counselors")}
            className="text-white/80 hover:text-white mb-6 flex items-center transition-colors"
          >
            ← Back to Counselors
          </button>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={counselor.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219969.png"}
                alt={counselor.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl"
              />
            </div>
            
            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{counselor.name}</h1>
              <p className="text-xl text-white/90 mb-4">{counselor.specialization || "General Counselor"}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(averageRating))}
                  <span className="ml-2 text-white/90">({averageRating.toFixed(1)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{counselor.totalSessions || 150}+ Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{counselor.location || "Online"}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button
                  onClick={handleBookSession}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Session
                </button>
                <button
                  onClick={handleStartChat}
                  className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start Chat
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-col gap-4 text-center">
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <DollarSign className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">${counselor.pricePerSession || 50}</div>
                <div className="text-sm text-white/80">per session</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{counselor.experience || 5}</div>
                <div className="text-sm text-white/80">years exp.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {["about", "expertise", "approach", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                    About Me
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {counselor.bio || "I am a dedicated mental health professional committed to helping individuals navigate life's challenges. With years of experience in counseling and therapy, I provide a safe, compassionate space for clients to explore their thoughts and feelings. My approach is client-centered, evidence-based, and tailored to meet your unique needs."}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Education & Certifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Master's in Counseling Psychology</p>
                        <p className="text-gray-600">University of Psychology</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Licensed Professional Counselor</p>
                        <p className="text-gray-600">State Board of Mental Health</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "expertise" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Areas of Expertise</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Anxiety & Depression",
                    "Relationship Issues",
                    "Stress Management",
                    "Career Counseling",
                    "Self-Esteem Building",
                    "Life Transitions",
                    "Trauma & PTSD",
                    "Family Therapy"
                  ].map((area, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "approach" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Therapeutic Approach</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Treatment Modalities</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["Cognitive Behavioral Therapy", "Mindfulness-Based", "Solution-Focused", "Person-Centered"].map((modality, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-gray-700">{modality}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Session Format</h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                        <Video className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">Video Sessions</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">Chat Sessions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Philosophy</h3>
                    <p className="text-gray-700 leading-relaxed">
                      I believe in creating a warm, non-judgmental therapeutic environment where clients feel safe to explore their thoughts and emotions. My approach is collaborative, empowering clients to develop insight and skills to overcome challenges and achieve their goals.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Client Reviews</h2>
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{review.clientName}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">11:00 AM - 4:00 PM</span>
                </div>
              </div>
              <button
                onClick={handleBookSession}
                className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Check Available Slots
              </button>
            </div>

            {/* Session Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Session Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">30, 60, 90 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Session Type</span>
                  <span className="font-medium">Video, Chat</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-medium">English</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">First Session</span>
                  <span className="font-medium text-green-600">50% Off</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Have questions about booking or services? Feel free to reach out.
              </p>
              <button
                onClick={handleStartChat}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorProfile;
