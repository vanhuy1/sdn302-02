import { Container, Row, Col, Button, Navbar, Nav, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
const Public = () => {
  const content = (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#">
            <img
              src="https://img.freepik.com/premium-vector/hotel-icon-logo-vector-design-template_827767-3569.jpg"
              alt="Logo"
              width="50"
              height="50"
              className="d-inline-block align-top"
              style={{ marginLeft: '30px' }}
            />{' '}
          </Navbar.Brand>

          <h2 style={{ marginLeft: '100px' }}> CODER HOTEL </h2>

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{ marginRight: '30px' }}>
            <Nav className="me-5">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>

            <Button variant="outline-primary" className="me-2">
              <Link to="/register" style={{ textDecoration: 'none' }}> Register</Link>
            </Button>
            <Button variant="outline-primary">
              <Link to="/login" style={{ textDecoration: 'none' }}> Login</Link>
            </Button>

          </Navbar.Collapse>
        </Navbar>
      </header>
      <section className="banner_main">
        <Carousel interval={2000} fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="First slide"
              style={{ width: "1920px", height: "800px", objectFit: "cover" }}
            />
            <div className="form-overlay">
              <Container>
                <Row>
                  <Col md={5} className="mx-auto">
                    <div
                      className="book_room text-center"
                      style={{
                        marginTop: "300px",
                        backgroundColor: "rgb(183, 255, 244, 0.5)",
                        border: "2px solid rgb(183, 255, 244, 0.5)",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <h1>Welcome!</h1>
                      <p style={{ fontStyle: "italic" }}>
                        We offer luxurious accommodations with excellent service
                        to ensure you have a memorable experience. Book your room
                        today!
                      </p>
                      <Link to="/booking">
                        <Button
                          className="book_btn"
                          type="button"
                          style={{ marginTop: "20px" }}
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Second slide"
              style={{ width: "1920px", height: "800px", objectFit: "cover" }}
            />
            <div className="form-overlay">
              <Container>
                <Row>
                  <Col md={5} className="mx-auto">
                    <div
                      className="book_room text-center"
                      style={{
                        marginTop: "300px",
                        backgroundColor: "rgb(183, 255, 244, 0.5)",
                        border: "2px solid rgb(183, 255, 244, 0.5)",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <h1>Welcome!</h1>
                      <p style={{ fontStyle: "italic" }}>
                        We offer luxurious accommodations with excellent service
                        to ensure you have a memorable experience. Book your room
                        today!
                      </p>
                      <Link to="/booking">
                        <Button
                          className="book_btn"
                          type="button"
                          style={{ marginTop: "20px" }}
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Third slide"
              style={{ width: "1920px", height: "800px", objectFit: "cover" }}
            />
            <div className="form-overlay">
              <Container>
                <Row>
                  <Col md={5} className="mx-auto">
                    <div
                      className="book_room text-center"
                      style={{
                        marginTop: "300px",
                        backgroundColor: "rgb(183, 255, 244, 0.5)",
                        border: "2px solid rgb(183, 255, 244, 0.5)",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <h1>Welcome!</h1>
                      <p style={{ fontStyle: "italic" }}>
                        We offer luxurious accommodations with excellent service
                        to ensure you have a memorable experience. Book your room
                        today!
                      </p>
                      <Link to="/booking">
                        <Button
                          className="book_btn"
                          type="button"
                          style={{ marginTop: "20px" }}
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
      <footer className="bg-light text-center text-lg-start">
        <Container className="p-4">
          <Row>
            <Col lg={4} md={6} className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Hotel Management</h5>
              <p>
                Welcome to our hotel.
              </p>
            </Col>

            <Col lg={4} md={6} className="mb-4 mb-md-0">
              <h5 className="text-uppercase">SERVICES</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/about" className="text-dark">About Us</a>
                </li>
                <li>
                  <a href="/services" className="text-dark">Services</a>
                </li>
                <li>
                  <a href="/contact" className="text-dark">Contact</a>
                </li>
              </ul>
            </Col>

            <Col lg={4} md={12} className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Legal</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#privacy" className="text-dark">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms" className="text-dark">Terms of Service</a>
                </li>
                <li>
                  <a href="#faq" className="text-dark">FAQ</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>

        <div className="text-center p-3 bg-dark text-white">
          © 2024 My Website. All rights reserved.
        </div>
      </footer>
    </>
  );

  return content;
};

export default Public;
