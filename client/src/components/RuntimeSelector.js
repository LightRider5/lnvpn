import React from 'react'
import {ToggleButtonGroup,ToggleButton,InputGroup} from 'react-bootstrap'
const RuntimeSelector = (props) => {
  return (
    <div>
      <ToggleButtonGroup type="radio" name="options" id="runtimeselector" defaultValue={1}>
    <ToggleButton id="tbg-radio-1" value={1}>
      1 hour
    </ToggleButton>
    <ToggleButton id="tbg-radio-2" value={2}>
      1 day
    </ToggleButton>
    <ToggleButton id="tbg-radio-3" value={3}>
      1 week
    </ToggleButton>
    <ToggleButton id="tbg-radio-4" value={4}>
      1 month
    </ToggleButton>
  </ToggleButtonGroup>
         

    </div>
  )
}

export default RuntimeSelector
