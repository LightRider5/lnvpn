import React from 'react'
import {Alert} from 'react-bootstrap'

const HeaderInfo = () => {
  return (
    <div>
        <Alert variant="primary">
            {/* <Alert.Heading>How it works:</Alert.Heading> */}
              <p>
               Select a country ➡️ Select duration ➡️ Pay with Lightning ➡️ Use your VPN 
               {/* <br></br>Instant delivery.
               <br></br>You need the < a href='https://www.wireguard.com/' target="_blank">Wireguard</a> VPN client.   */}
              </p>
            <hr />
              <p className="mb-0">
                We generate your private keys only within the browser!
                <br></br>You need the < a href='https://www.wireguard.com/' target="_blank">Wireguard</a> VPN client.  
              
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
