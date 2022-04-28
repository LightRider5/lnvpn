import React from 'react'
import {Alert} from 'react-bootstrap'

const HeaderInfo = () => {
  return (
    <div>
        <Alert variant="primary">
            {/* <Alert.Heading>How it works:</Alert.Heading> */}
              <p>
               Generate a private key, select a country + duration and pay with Lightning. 
               <br></br>Instant delivery. 100% no trace left.
               <br></br>You need the < a href='https://www.wireguard.com/'>Wireguard</a> VPN client.  
              </p>
            <hr />
              <p className="mb-0">
                We generate your private keys only within the browser and nothing is ever stored on our server!
              </p>
        </Alert>
        
        {/* <Container>
          <Row id="guide_row">
            <Button variant="primary">How it works?</Button>
          </Row>
        </Container> */}
        </div>
      
    
  )
}

export default HeaderInfo
