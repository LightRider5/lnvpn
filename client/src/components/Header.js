import { Navbar,Nav,Row,Offcanvas,Container} from 'react-bootstrap'
import logo from '../media/logoPNGLNVPN.png';
import { LinkContainer } from 'react-router-bootstrap'


const Header = (props) => {
      return (
        <div>
          <Container>
        <Navbar collapseOnSelect bg="light" expand="sm" key="nav" variant="light" className="container">
           <Navbar.Brand href='/'>
                <img
                  src={logo}
                  width="100"
                  height="100"
                  className="d-inline-block align-top align-start"
                  alt="LNVPN Brand Logo"
                    />
            </Navbar.Brand>
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
        <Nav variant="pills" className='me-auto my-2 my-lg-0'>
                <Nav.Item>
                    <LinkContainer to="/">
                      <Nav.Link >VPN </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                 <Nav.Item>
                <LinkContainer to="/phone-numbers">
                      <Nav.Link>Phone Numbers </Nav.Link>
                    </LinkContainer>  
                </Nav.Item>
                <Nav.Item>
                <LinkContainer to="/faq">
                      <Nav.Link>FAQ </Nav.Link>
                    </LinkContainer>  
                </Nav.Item>
            </Nav >
          </Offcanvas.Body>  
        </Navbar.Offcanvas>
     
        </Navbar>      
          {/* <Row>
        <div id='logo'>
            <a href="/">
              <img src={logo} alt="LN ⚡ VPN" id="header-image"></img> 
            </a>
            </div>
      </Row> */}
       </Container>  
    </div>
  )
}

export default Header


