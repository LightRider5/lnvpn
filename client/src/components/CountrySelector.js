import React from 'react'
import {ToggleButtonGroup,ToggleButton,InputGroup} from 'react-bootstrap'
const CountrySelector = (props) => {
  return (
    <div>
      <ToggleButtonGroup type="radio" name="options" id="countryselector" defaultValue={1}>
        <ToggleButton id="tbg-radio-1" value={1}>
          Germany
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={2}>
          Singapure
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={3}>
          USA
        </ToggleButton>
        <ToggleButton id="tbg-radio-4" value={4}>
          Indonesia
        </ToggleButton>
      </ToggleButtonGroup>
     </div>
  )
}

export default CountrySelector
