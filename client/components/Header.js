import { useRouter } from 'next/router';
import { Navbar, Nav, Offcanvas, Container, Badge } from "react-bootstrap";
import Link from "next/link";
import Image from 'next/image';

const Header = (props) => {
  const router = useRouter();
  const { ref } = router.query;  // Get the "ref" query parameter

  const isActive = (href) => {
    return router.pathname === href ? "active" : '';
  };

  return (
    <div>
      <Container>
        <Navbar
          collapseOnSelect
          bg="light"
          expand="sm"
          key="nav"
          variant="light"
        >
          <Link href="/">
            <Navbar.Brand>
              <Image
                src="/media/logoPNGLNVPN.png"
                width={100}
                height={100}
                className="d-inline-block align-top align-start"
                alt="LNVPN Brand Logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Offcanvas
            id="responsive-navbar-nav"
            aria-labelledby="offcanvasNavbarLabel-expand-nav"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-nav">
                <Container className="justify-content-center">
                  {/* <img src={logo} alt="LN ⚡ VPN" id="nav-menu-image"></img>  */}
                </Container>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav variant="pills" className="container">
                <Nav.Item>
                  <Nav.Link className={isActive('/')} href="/">VPN</Nav.Link>
                </Nav.Item>
                {ref !== 'silent.link' && (
                  <Nav.Item>
                    <Nav.Link className={isActive('/phone-numbers')} href="/phone-numbers">Phone Numbers</Nav.Link>
                  </Nav.Item>
                )}

                {ref !== 'silent.link' && (
                  <Nav.Item>
                    <Nav.Link className={isActive('/esim')} href="/esim">eSIM <Badge bg="danger">New!</Badge></Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link className={isActive('/partners')} href="/partners">
                    Partners
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={isActive('/faq')} href="/faq">FAQ</Nav.Link>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;
