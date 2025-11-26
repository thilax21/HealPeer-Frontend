import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} HealPeer. All rights reserved.</p>
      <div>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={linkStyle}>Instagram</a> | 
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" style={linkStyle}>Facebook</a> | 
        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" style={linkStyle}>Twitter</a>
      </div>
    </footer>
  );
};

const footerStyle = {
  marginbottom: "50px",
  padding: "20px",
  background: "linear-gradient(to right, #1D8AD8 , #1CB995 , #1D8AD8)",
  color: "#fff",
  textAlign: "center",
  
};

const linkStyle = {
  color: "#fff",
  margin: "0 5px",
  textDecoration: "none",
};

export default Footer;
