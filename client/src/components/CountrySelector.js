import React from 'react'
import {ToggleButtonGroup,ToggleButton,ButtonToolbar} from 'react-bootstrap'
const CountrySelector = (props) => {
  return (
    <div>
      <ButtonToolbar>
        <ToggleButtonGroup type="radio" name="options" id="countryselector" defaultValue={5}>
          <ToggleButton value={5} onClick={props.onClick}>
              🇨🇦 <br></br>CAD
            </ToggleButton>
            <ToggleButton value={2} onClick={props.onClick}>
              🇺🇸<br></br>USA 
            </ToggleButton>
            <ToggleButton value={7} onClick={props.onClick}>
            🇳🇱  <br></br>NLD
            </ToggleButton>
            <ToggleButton  value={3} onClick={props.onClick}>
            🇫🇮 <br></br>FIN 
            </ToggleButton >
            
            <ToggleButton value={4} onClick={props.onClick}>
              🇬🇧 <br></br>UK
            </ToggleButton>
            <ToggleButton value={6} onClick={props.onClick}>
              🇮🇳 <br></br>IND
            </ToggleButton>
            <ToggleButton value={1} onClick={props.onClick}>
              🇸🇬 <br></br>SGP
            </ToggleButton>
          </ToggleButtonGroup>
      </ButtonToolbar>
     </div>
  )
}

export default CountrySelector
