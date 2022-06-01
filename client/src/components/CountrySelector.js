import React from 'react'
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap'
const CountrySelector = (props) => {
  return (
    <div>
      <ToggleButtonGroup type="radio" name="options" id="countryselector" defaultValue={5}>
      <ToggleButton value={5} onClick={props.onClick}>
          🇨🇦 <br></br>CAD
        </ToggleButton>
        <ToggleButton value={2} onClick={props.onClick}>
          🇺🇸<br></br>USA 
        </ToggleButton>
        <ToggleButton  value={3} onClick={props.onClick}>
         🇫🇮 <br></br>FIN 
        </ToggleButton >
        <ToggleButton value={4} onClick={props.onClick}>
          🇬🇧 <br></br>UK
        </ToggleButton>
        <ToggleButton value={1} onClick={props.onClick}>
          🇸🇬 <br></br>SGP
        </ToggleButton>
        
      </ToggleButtonGroup>
     </div>
  )
}

export default CountrySelector
