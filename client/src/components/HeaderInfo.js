import React from 'react'
import {Alert} from 'react-bootstrap'

const HeaderInfo = () => {
  return (
    <div>
        <Alert variant="success">
            <Alert.Heading>Hey, nice to see you on LN VPN</Alert.Heading>
              <p>
               Generate a private Key, selcect a country and duration and pay via Lightning. 100% no trace left. 
              </p>
            <hr />
              <p className="mb-0">
                We generate your private Keys only within the browser and nothing is stored on our server!
              </p>
        </Alert>
      
    </div>
  )
}

export default HeaderInfo
