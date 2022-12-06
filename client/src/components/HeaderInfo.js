import React from 'react'
import {Alert} from 'react-bootstrap'

const HeaderInfo = (props) => {
  return (
    <div>
      
        <Alert variant="light">
          {/* <Alert.Heading>How it works:</Alert.Heading> */}
          <p>
          {props.headline}
          </p>
          <hr />
          <p className="mb-0">
          {props.paragraph}
          </p>
        </Alert>
      
      
    </div>
  )
}
      
    
export default HeaderInfo
