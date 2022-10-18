import React from 'react'
import {ToggleButtonGroup,ToggleButton,ButtonGroup} from 'react-bootstrap'
import  {useState}  from 'react'



const RuntimeSelector = (props) => {

  return (
    <div>
    <ToggleButtonGroup type="radio" name="options" id="runtimeselector" defaultValue={process.env.REACT_APP_price_hour} >
      <ToggleButton id="tbg-radio-1" value={process.env.REACT_APP_price_hour} onChange={props.onChange} title="1 hour">
        1 hour <br></br>  (1GB)
      </ToggleButton>
      <ToggleButton id="tbg-radio-2" value={process.env.REACT_APP_price_day} onChange={props.onChange} title="1 day">
        1  day <br></br> (5GB)
      </ToggleButton>
      <ToggleButton id="tbg-radio-3" value={process.env.REACT_APP_price_week} onChange={props.onChange} title="1 week">
        1  week <br></br> (15GB)
      </ToggleButton>
      <ToggleButton id="tbg-radio-4" value={process.env.REACT_APP_price_month} onChange={props.onChange} title="1 month">
        1  month <br></br> (40GB)
      </ToggleButton>
      {/* <ToggleButton id="tbg-radio-5" value={process.env.REACT_APP_price_quater} onChange={props.onChange} title="3 month">
        1  quarter <br></br> 
      </ToggleButton> */}
    </ToggleButtonGroup> 
    </div>
  )
}

export default RuntimeSelector
