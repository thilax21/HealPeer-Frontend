
// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/home.css";

// const Home = () => {
//   const services = [
//     { icon: "🧠", title: "Personal Counseling", description: "Talk privately with licensed experts and find clarity." },
//     { icon: "💬", title: "Online Chat", description: "Instant chat with counselors whenever you need it." },
//     { icon: "✍️", title: "Blog & Share", description: "Express your thoughts through writing and stories." },
//     { icon: "📅", title: "Book a Session", description: "Schedule personalized counseling sessions easily." },
//   ];

//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Welcome to <span className="brand-highlight">HealPeer</span></h1>
//           <p>Your online platform for mental health counselling, guidance, and growth.</p>
//           <div className="hero-buttons">
//             <Link to="/register" className="btn btn-primary">Get Started</Link>
//             <Link to="/login" className="btn btn-secondary">Login</Link>
//           </div>
//         </div>
//         <div className="hero-image">
//           {/* Placeholder image, can replace with illustration */}
//           <img src="https://via.placeholder.com/400x300.png?text=HealPeer" alt="HealPeer Hero" />
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="services">
//         <h2>Our Services</h2>
//         <div className="services-grid">
//           {services.map((service, index) => (
//             <div key={index} className="service-card">
//               <div className="service-icon">{service.icon}</div>
//               <h3>{service.title}</h3>
//               <p>{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Choose HealPeer */}
//       <section className="why-choose">
//         <h2>Why Choose HealPeer?</h2>
//         <p>We connect you with certified counselors and provide a safe, judgment-free platform to express, heal, and grow — all from the comfort of your home.</p>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const services = [
  { icon: "🧠", title: "Personal Counseling", description: "Talk privately with licensed experts and find clarity." },
  { icon: "💬", title: "Online Chat", description: "Instant chat with counselors whenever you need it." },
  { icon: "✍️", title: "Blog & Share", description: "Express your thoughts through writing and stories." },
  { icon: "📅", title: "Book a Session", description: "Schedule personalized counseling sessions easily." },
];

const testimonials = [
  "HealPeer helped me open up when I needed it most. The counselor was kind and truly listened.",
  "The AI chat made it easy to start. I felt safe and supported throughout my session.",
];

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Header */}
      <header className="header">
        <div className="logo">HealPeer</div>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero fade-in">
        <div className="hero-text">
          <h1>Welcome to <span>HealPeer</span></h1>
          <p>Your safe space for mental wellness, growth and healing—anytime, anywhere.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn primary">Start Counseling</Link>
            <Link to="/login" className="btn secondary">Login</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/350x250.png?text=HealPeer+Illustration" alt="Chat illustration" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services slide-up">
        <h2>Our Services</h2>
        <div className="service-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials fade-in">
        <h2>What Clients Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((quote, index) => (
            <div key={index} className="testimonial-card">
              <p>"{quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta slide-up">
        <h2>Ready to Begin?</h2>
        <p>Book your first session and take the next step toward healing.</p>
        <Link to="/book" className="btn primary">Book a Session</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 HealPeer. All rights reserved.</p>
        <div className="footer-links">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
