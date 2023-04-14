import React from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick} className="btn_">
        {props.text}
      </button>
    </div>
  );
};

export default Button;
