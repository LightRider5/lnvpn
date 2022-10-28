import React from 'react'
import { Container,ListGroup } from 'react-bootstrap'
import Footer from './Footer'
const Guide = () => {
  return (
      <div>
          <Container className="main-middle">
              <h2>🦮 Guide</h2>
              <ListGroup as="ol" numbered>
                <ListGroup.Item as="li">Select a country</ListGroup.Item>
                <ListGroup.Item as="li">Choose a duration</ListGroup.Item>
                <ListGroup.Item as="li">Pay via Lightning </ListGroup.Item>
              </ListGroup>
               <Footer/>
           </Container>
    </div>
  )
}

export default Guide
