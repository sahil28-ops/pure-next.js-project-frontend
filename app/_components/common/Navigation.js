"use client";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/auth";
import { SlHeart } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import "./styleNavigation.css";

const Navigation = () => {
  const [auth, setAuth] = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null); // Clear auth context
    router.push("/"); // Redirect to home page
  };

  const renderTooltip = (message) => (
    <Tooltip id={`tooltip-${message}`}>{message}</Tooltip>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-1">
      <Container fluid="xl">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={130}
            height={40}
            style={{ maxWidth: "100%", height: "45px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="align-items-center ms-auto w-100 justify-content-between ms-5">
            <div className="d-flex gap-2 ms-5 me-5">
              <Nav.Link href="/collection">Collection</Nav.Link>
              <Nav.Link href="/aboutUs">About</Nav.Link>
              <Nav.Link href="/contactUs">Contact Us</Nav.Link>
              {/* <div>{name}</div> */}
            </div>

            <InputGroup className="ms-auto me-3 w-auto">
              <InputGroup.Text
                id="basic-addon1"
                style={{ padding: "0.375rem 0.75rem" }}
              >
                <IoSearch size={16} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                style={{ fontSize: "0.875rem", padding: "0.375rem 0.5rem" }}
              />
            </InputGroup>

            <strong>|</strong>

            {auth?.user ? (
              <NavDropdown
                title={<FaRegUserCircle size={20} />}
                id="basic-nav-dropdown"
                align="end"
                className="dropdown-toggle-no-arrow ms-3"
              >
                <NavDropdown.Item>Hi, {auth?.user?.name}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/dashboard/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {auth?.user?.role === 1 && (
                  <>
                    <NavDropdown.Item href="/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">
                <strong>Login</strong>
              </Nav.Link>
            )}

            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip("Wishlist")}
              container={typeof document !== "undefined" ? document.body : null}
            >
              <Nav.Link href="/" className="d-flex align-items-center">
                <SlHeart
                  size={20}
                  style={{ transition: "0.3s" }}
                  className="hover-scale"
                />
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip("Cart")}
              container={typeof document !== "undefined" ? document.body : null}
            >
              <Nav.Link href="/cart" className="d-flex align-items-center">
                <MdOutlineShoppingCart
                  size={20}
                  style={{ transition: "0.3s" }}
                  className="hover-scale"
                />
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
