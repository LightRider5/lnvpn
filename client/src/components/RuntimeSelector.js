import React from 'react'
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap'
const RuntimeSelector = (props) => {
  return (
    <div>
    <ToggleButtonGroup type="radio" name="options" id="runtimeselector" defaultValue={0.1} >
      <ToggleButton id="tbg-radio-1" value={0.1} onClick={props.onClick}>
        1 hour
      </ToggleButton>
      <ToggleButton id="tbg-radio-2" value={0.5} onClick={props.onClick}>
        1 day
      </ToggleButton>
      <ToggleButton id="tbg-radio-3" value={2} onClick={props.onClick}>
        1 week
      </ToggleButton>
      <ToggleButton id="tbg-radio-4" value={4} onClick={props.onClick}>
        1 month
      </ToggleButton>
  </ToggleButtonGroup>
         

    </div>
  )
}

export default RuntimeSelector
