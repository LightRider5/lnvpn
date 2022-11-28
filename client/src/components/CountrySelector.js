import React from 'react'
import {Form} from 'react-bootstrap'
const CountrySelector = (props) => {
  return (
    <div>
        <Form.Select aria-label="Choose country" size="lg" onChange={props.onChange}>
          <option value="0">Select a country</option>
          <option value="1">🇸🇬 Singapore</option>
          <option value="2">🇺🇸 United States</option>
          <option value="13">🇺🇸 United States 2 (NY)</option> 
          <option value="3">🇫🇮 Finnland</option>
          <option value="4">🇬🇧 United Kingdom</option>
          <option value="5">🇨🇦 Canada</option>
          <option value="6">🇮🇳 India</option>
          <option value="7">🇳🇱 Netherlands</option>
          <option value="8">🇷🇺 Russia</option>
          <option value="9">🇺🇦 Ukraine</option>
          <option value="10">🇨🇭 Switzerland</option>
          <option value="11">🇮🇱 Israel</option>
          <option value="12">🇰🇿 Kazakhstan</option>
          <option value="14">🇷🇴 Romania</option>
          <option value="15">🇬🇭 Ghana</option>
          <option value="16">🇵🇹 Portugal</option> 
          <option value="17">🇪🇸 Spain</option>
        </Form.Select>      
     </div>
  )
}

export default CountrySelector
