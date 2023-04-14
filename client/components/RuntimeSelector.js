import React from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { isMobile } from "react-device-detect";

const RuntimeSelector = (props) => {
  return (
    <div>
      <ToggleButtonGroup
        type="radio"
        name="options"
        id="runtimeselector"
        defaultValue={process.env.NEXT_PUBLIC_price_hour}
      >
        <ToggleButton
          id="tbg-radio-1"
          value={process.env.NEXT_PUBLIC_price_hour}
          onChange={props.onChange}
          title="1 hour"
        >
          1 <br></br> hour <br></br>
        </ToggleButton>
        <ToggleButton
          id="tbg-radio-2"
          value={process.env.NEXT_PUBLIC_price_day}
          onChange={props.onChange}
          title="1 day"
        >
          1 <br></br> day <br></br>
        </ToggleButton>
        <ToggleButton
          id="tbg-radio-3"
          value={process.env.NEXT_PUBLIC_price_week}
          onChange={props.onChange}
          title="1 week"
        >
          1 <br></br> week <br></br>
        </ToggleButton>
        <ToggleButton
          id="tbg-radio-4"
          value={process.env.NEXT_PUBLIC_price_month}
          onChange={props.onChange}
          title="1 month"
        >
          1 <br></br>month <br></br>
        </ToggleButton>
        <ToggleButton
          id="tbg-radio-5"
          value={process.env.NEXT_PUBLIC_price_quater}
          onChange={props.onChange}
          title="3 month"
        >
          1 <br></br> {isMobile ? "qtr" : "quarter"}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default RuntimeSelector;
