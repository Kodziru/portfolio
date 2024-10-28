import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>Contactez-moi : email@example.com</p>
        <div className="footer-icons">
          <a href="#"><img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" /></a>
          <a href="#"><img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter" /></a>
          <a href="#"><img src="https://img.icons8.com/fluent/48/000000/linkedin.png" alt="LinkedIn" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;