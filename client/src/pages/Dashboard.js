import { Row, Col, Container, Button } from 'react-bootstrap'
import { useEffect,useState } from 'react';
import * as Components from '../components'
import Axios from 'axios';

const Dashboard = (props) => {
  return (
      <>
           <Container className="main-middle">
            <Row>
              <Col>
                <Components.HeaderInfo user={props.user} />
                <Components.SubscriptionDisplay
                //subscriptions={getSubscriptions}  
                // addSubscription={addSubscription(user)}
                />
                  
                
              </Col>
            </Row>
          </Container>  
      
    </>
  )
}

export default Dashboard
