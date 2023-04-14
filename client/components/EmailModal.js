import { useState, React } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";

const EmailModal = (props) => {
  const [emailAddress, setEmailAddress] = useState("");

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Send Config via EMail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Email address
            </InputGroup.Text>
            <Form.Control
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer className="emailbuttons">
          <Button variant="danger" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              props.handleClose();
              props.sendEmail(emailAddress);
            }}
          >
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailModal;
