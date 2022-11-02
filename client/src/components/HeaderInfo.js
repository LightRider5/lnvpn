import React from 'react'
import {Alert} from 'react-bootstrap'

const HeaderInfo = (props) => {
  
  return (
    <div>
      {props.user === null ? (<></>
         ) : (
          <Alert variant="success">You are logged in</Alert>
        )}
        <Alert variant="info">
            {/* <Alert.Heading>How it works:</Alert.Heading> */}
              <p>
               Select a country ➡️ Select duration ➡️ Pay with Lightning ➡️ Use your VPN ✅
        </p>
            <hr />
              <p className="mb-0">
               You need the < a href='https://www.wireguard.com/' target="_blank">Wireguard</a> VPN client.      
              </p>
        </Alert>
     
        </div>
      
    
  )
}

export default HeaderInfo
