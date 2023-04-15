import { useRouter } from 'next/router';
import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";
import Link from "next/link";

const Header = (props) => {
  const router = useRouter();

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
          <Link href="/" passHref>
            <Navbar.Brand>
              <img
                src="/media/logoPNGLNVPN.png"
                width="100"
                height="100"
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
                <Nav.Item>

                  <Nav.Link className={isActive('/phone-numbers')} href="/phone-numbers" >Phone Numbers</Nav.Link>

                </Nav.Item>
                <Nav.Item>

                  <Nav.Link className={isActive('/faq')} href="/faq">FAQ</Nav.Link>

                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </Container>
    </div >
  );
};

export default Header;





// import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";

// import Link from "next/link";

// const Header = (props) => {
//   return (
//     <div>
//       <Container>
//         <Navbar
//           collapseOnSelect
//           bg="light"
//           expand="sm"
//           key="nav"
//           variant="light"
//         >
//           <Link href="/" passHref>
//             <Navbar.Brand>
//               <img
//                 src="/media/logoPNGLNVPN.png"
//                 width="100"
//                 height="100"
//                 className="d-inline-block align-top align-start"
//                 alt="LNVPN Brand Logo"
//               />
//             </Navbar.Brand>
//           </Link>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Offcanvas
//             id="responsive-navbar-nav"
//             aria-labelledby="offcanvasNavbarLabel-expand-nav"
//             placement="end"
//           >
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title id="offcanvasNavbarLabel-expand-nav">
//                 <Container className="justify-content-center">
//                   {/* <img src={logo} alt="LN ⚡ VPN" id="nav-menu-image"></img>  */}
//                 </Container>
//               </Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <Nav variant="pills" className="container">
//                 <Nav.Item>

//                   <Nav.Link href="/" passHref>VPN</Nav.Link>

//                 </Nav.Item>
//                 <Nav.Item>

//                   <Nav.Link href="/phone-numbers" passHref>Phone Numbers</Nav.Link>

//                 </Nav.Item>
//                 <Nav.Item>

//                   <Nav.Link href="/faq" passHref>FAQ</Nav.Link>

//                 </Nav.Item>
//               </Nav>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Navbar>
//         {/* <Row>
//         <div id='logo'>
//             <a href="/">
//               <img src={logo} alt="LN ⚡ VPN" id="header-image"></img> 
//             </a>
//             </div>
//       </Row> */}
//       </Container>
//     </div>
//   );
// };

// export default Header;




// import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";
// import logo from "../public/media/logoPNGLNVPN.png";
// import { LinkContainer } from "react-router-bootstrap";

// const Header = (props) => {
//   return (
//     <div>
//       <Container>
//         <Navbar
//           collapseOnSelect
//           bg="light"
//           expand="sm"
//           key="nav"
//           variant="light"
//         >
//           <Navbar.Brand href="/">
//             <img
//               src={logo}
//               width="100"
//               height="100"
//               className="d-inline-block align-top align-start"
//               alt="LNVPN Brand Logo"
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Offcanvas
//             id="responsive-navbar-nav"
//             aria-labelledby="offcanvasNavbarLabel-expand-nav"
//             placement="end"
//           >
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title id="offcanvasNavbarLabel-expand-nav">
//                 <Container className="justify-content-center">
//                   {/* <img src={logo} alt="LN ⚡ VPN" id="nav-menu-image"></img>  */}
//                 </Container>
//               </Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <Nav variant="pills" className="container">
//                 <Nav.Item>
//                   <LinkContainer to="/">
//                     <Nav.Link>VPN </Nav.Link>
//                   </LinkContainer>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <LinkContainer to="/phone-numbers">
//                     <Nav.Link>Phone Numbers </Nav.Link>
//                   </LinkContainer>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <LinkContainer to="/faq">
//                     <Nav.Link>FAQ </Nav.Link>
//                   </LinkContainer>
//                 </Nav.Item>
//               </Nav>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Navbar>
//         {/* <Row>
//         <div id='logo'>
//             <a href="/">
//               <img src={logo} alt="LN ⚡ VPN" id="header-image"></img> 
//             </a>
//             </div>
//       </Row> */}
//       </Container>
//     </div>
//   );
// };

// export default Header;
