import { Col, Row, Container } from "reactstrap";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <Container>

        <Row className="footer-content">

          <Col md="6">
            <h5>Contact Us</h5>

            <p>Email: epictrails@gmail.com</p>
            <p>Phone: +968 90987762</p>
          </Col>

          <Col md="6" className="social-section">
            <h5>Follow Us</h5>

            <p>Facebook</p>
            <p>Instagram</p>
          </Col>

        </Row>

        <hr />

        <Row>
          <Col>
            <p className="copyright">
              © 2026 Epic Trails | Designed by Anwah Ibrahim AL-Sinani
            </p>
          </Col>
        </Row>

      </Container>

    </footer>
  );
};

export default Footer;