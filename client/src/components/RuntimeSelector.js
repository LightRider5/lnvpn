import React from 'react'
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap'
const RuntimeSelector = (props) => {
  return (
    <div>
    <ToggleButtonGroup type="radio" name="options" id="runtimeselector" defaultValue={0.1} >
      <ToggleButton id="tbg-radio-1" value={0.1} onClick={props.onClick}>
        1 <br></br> hour
      </ToggleButton>
      <ToggleButton id="tbg-radio-2" value={0.5} onClick={props.onClick}>
        1 <br></br> day
      </ToggleButton>
      <ToggleButton id="tbg-radio-3" value={1.5} onClick={props.onClick}>
        1 <br></br> week
      </ToggleButton>
      <ToggleButton id="tbg-radio-4" value={3} onClick={props.onClick}>
        1 <br></br> month
      </ToggleButton>
      <ToggleButton id="tbg-radio-4" variant="secondary" value={5} onClick={props.onClick} disabled>
        1 🙅‍♂️<br></br> year 
      </ToggleButton>
  </ToggleButtonGroup>
         

    </div>
  )
}

export default RuntimeSelector
