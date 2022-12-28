import React from "react";
import { Button } from "react-bootstrap";

const SubscriptionDisplay = (props) => {
  return (
    <div>
      <Button
        variant="outline-success"
        size="lg"
        onClick={props.addSubscription}
      >
        Add Subscription
      </Button>
    </div>
  );
};

export default SubscriptionDisplay;
