"use client";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container className="py-5">
        <Row className="justify-content-between mb-5">
          <Col md={4} className="mb-4 px-4">
            <h5 className="text-uppercase mb-4">About Us</h5>
            <p>
              Explore our diverse range of premium products tailored to meet all your needs. Quality and customer satisfaction guaranteed.
            </p>
          </Col>
          <Col md={4} className="mb-4 px-4">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="##" className="text-light text-decoration-none">Home</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Products</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4 px-4">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <p>Email: <a href="mailto:support@ecom.com" className="text-light text-decoration-none">support@ecom.com</a></p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 E-commerce St, City, Country</p>
          </Col>
        </Row>
        <Row className="mt-4 border-top pt-4">
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 E-Com Website. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

