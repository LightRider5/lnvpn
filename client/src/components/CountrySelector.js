import React from 'react'
import {Form} from 'react-bootstrap'
const CountrySelector = (props) => {

  return (
    <div>
        <Form.Select aria-label="Choose country" size="lg" onChange={props.onChange}>
                {
          props.countries.map((country,index) => (
            
        <option key={ index} value={country.cc}>{country.country}</option>
          ))
          
                    }
        </Form.Select>      
     </div>
  )
}

export default CountrySelector


