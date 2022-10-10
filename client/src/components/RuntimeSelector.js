import React from 'react'
import {ToggleButtonGroup,ToggleButton,ButtonGroup} from 'react-bootstrap'
import  {useState}  from 'react'



const RuntimeSelector = (props) => {

  return (
    <div>
    <ToggleButtonGroup type="radio" name="options" id="runtimeselector" defaultValue={0.1} >
      <ToggleButton id="tbg-radio-1" value={0.1} onChange={props.onChange} title="1 hour">
        1 <br></br> hour
      </ToggleButton>
      <ToggleButton id="tbg-radio-2" value={0.5} onChange={props.onChange} title="1 day">
        1 <br></br> day
      </ToggleButton>
      <ToggleButton id="tbg-radio-3" value={1.5} onChange={props.onChange} title="1 week">
        1 <br></br> week
      </ToggleButton>
      <ToggleButton id="tbg-radio-4" value={4} onChange={props.onChange} title="1 month">
        1 <br></br> month
      </ToggleButton>
      {/* <ToggleButton id="tbg-radio-5" value={9} onChange={props.onChange} title="3 month">
        1 <br></br> quarter 
      </ToggleButton> */}
    </ToggleButtonGroup> 
    </div>
  )
}

export default RuntimeSelector
