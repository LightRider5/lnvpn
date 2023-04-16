import React from "react";

const InfoField = (props) => {
  return (
    <div>
      <h4 className="infofield">
        {props.name} for {props.duration}{" "}
      </h4>
    </div>
  );
};

export default InfoField;
