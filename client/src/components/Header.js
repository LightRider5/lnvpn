import React from 'react'
import { Navbar,Nav,Row } from 'react-bootstrap'
import logo from '../media/logo2.svg';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" variant="dark" className="justify-content-end container">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav variant="pills" className="me-auto my-2 my-lg-0">
                <Nav.Item>
                    <LinkContainer to="/">
                      <Nav.Link >🏠 Home </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link >🦮 Guide </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                    <LinkContainer to="/faq">
                      <Nav.Link>📖 FAQ </Nav.Link>
                    </LinkContainer>  
                </Nav.Item>
          </Nav>
          </Navbar.Collapse>
          </Navbar>      
          <Row>
            <div id='logo'>
              <img src={logo} alt="LN ⚡ VPN" id="header-image"></img> 
            </div>
          </Row>     
    </div>
  )
}

export default Header
