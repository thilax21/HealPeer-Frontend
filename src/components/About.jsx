// AboutPage.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl p-12">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-6">Welcome to HealPeer</h1>
        <p className="text-gray-700 text-center text-lg mb-12">
          Your safe space for mental wellbeing, professional counseling, and personal growth.
        </p>

        {/* Our Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At HealPeer, we are committed to making mental health care accessible, supportive, and empowering for everyone. 
            Our mission is to create a compassionate community where every individual can feel heard, guided, and supported on their journey to mental wellness.
          </p>
        </section>

        {/* Our Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-l-4 border-purple-500 bg-purple-50 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Professional Counseling</h3>
              <p className="text-gray-700">
                Connect with certified counselors for personalized guidance and mental health support tailored to your needs.
              </p>
            </div>
            <div className="p-6 border-l-4 border-purple-500 bg-purple-50 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Private Chat</h3>
              <p className="text-gray-700">
                Secure, confidential chat with your counselor to share your thoughts and concerns anytime.
              </p>
            </div>
            <div className="p-6 border-l-4 border-purple-500 bg-purple-50 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Mental Health Blogs</h3>
              <p className="text-gray-700">
                Learn from expert-written articles, tips, and real stories to improve your mental well-being and self-awareness.
              </p>
            </div>
            <div className="p-6 border-l-4 border-purple-500 bg-purple-50 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Easy Booking & Payment</h3>
              <p className="text-gray-700">
                Book sessions effortlessly and securely with our integrated payment system, giving you convenience and peace of mind.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Why Choose HealPeer?</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Trusted, certified counselors for professional guidance.</li>
            <li>Completely secure and confidential platform.</li>
            <li>Supportive community focused on mental wellness.</li>
            <li>Convenient scheduling and payment system.</li>
            <li>Resources and blogs to enhance self-growth.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Start Your Journey Today</h2>
          <p className="text-gray-700 mb-6">
            Join HealPeer and take the first step towards a healthier mind and a happier life.
          </p>
          <a 
            href="/signup"
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
