import React from 'react'
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap'
const CountrySelector = () => {
  return (
    <div>
    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        <ToggleButton id="tbg-radio-1" value={1}>
        Radio 1 (pre-checked)
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={2}>
        Radio 2
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={3}>
        Radio 3
        </ToggleButton>
  </ToggleButtonGroup>
      
    </div>
  )
}

export default CountrySelector
