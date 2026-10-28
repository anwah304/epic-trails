import { Container, Row, Col } from 'reactstrap';
import '../App.css';

import mainImg from '../assets/main.png';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';

import { Link } from "react-router-dom";

const MainPage=() =>{

  // ✅ جديد: الزائر يبدأ بدون جلسة قديمة
  const handleGuest = () => {
    localStorage.removeItem("user");
  };

  return (
    <div fluid className="hero-section">

      <div className="top-title">EPIC TRAILS</div>

      <Row className="align-items-center">

        <Col md="6">
          <h1 className="main-heading">ADVENTURE AWAITS</h1>

          <img
            src={mainImg}
            className="main-image"
            alt="main adventure"
          />
        </Col>

        <Col md="6">

          <div className="images-grid">
            <img src={img1} className="small-img big" alt="trail 1" />
            <img src={img2} className="small-img" alt="trail 2" />
            <img src={img3} className="small-img" alt="trail 3" />
          </div>

          <h4>Discover the most beautiful hiking trails in Oman.</h4>

          <p>
            Step into a world of breathtaking landscapes, where every trail tells a story.
          </p>

          {/* ✅ جديد: الزرين جنب بعض */}
          <div className="hero-actions">
            <Link to="/login" className="start-btn">
              START YOUR JOURNEY
            </Link>

            <Link to="/home" className="guest-btn" onClick={handleGuest}>
              BROWSE AS GUEST
            </Link>
          </div>

        </Col>

      </Row>
    </div>
  );
}

export default MainPage;