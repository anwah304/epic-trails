
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { FiCompass } from "react-icons/fi";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          
          <div className="footer-brand">
            <div className="footer-logo">
              <FiCompass />
              <h3>Epic Trails</h3>
            </div>

            <p>
              Discover new destinations, explore amazing
              trails, and make every journey an adventure.
            </p>

            <span className="footer-tagline">
              Discover. Explore. Experience.
            </span>
          </div>

          
          <nav
            className="footer-navigation"
            aria-label="Footer navigation"
          >
            <h5>Explore</h5>

            <Link to="/home">Home</Link>
            <Link to="/destinations">Destinations</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Epic Trails.
            All rights reserved.
          </p>

          <p className="footer-credit">
            Designed &amp; Developed by{" "}
            <span>Anwah Ibrahim Al-Sinani</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
