import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#343a40' }} className="text-light py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left">
            <h5>Contact Us</h5>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              <a href="mailto:ghadipasal@gmail.com" className="text-light">
                ghadipasal@gmail.com
              </a>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              <a href="tel:+1234567890" className="text-light">
                +1234567890
              </a>
            </p>
          </Col>

          <Col md={6} className="text-center">
            <h5>Follow Us</h5>
            <a
              href="https://www.facebook.com/pradeep.dangi.5220/"
              className="text-light me-3"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com/pradeep_dc9/"
              className="text-light"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <p className="mb-0">
              <small>
                GhadiPasal &copy; {currentYear} All Rights Reserved.
              </small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
