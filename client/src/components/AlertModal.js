import React from 'react'
import { Modal,Button,Alert } from 'react-bootstrap';

const AlertModal = (props) => {
    if(!props.show){
      
        return (null)
      } 
    return (
      <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Alert   variant={props.variant}>
                {props.text}
            </Alert> 
            <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Ok
          </Button>
        </Modal.Footer>  
          </Modal.Body>
         
        </Modal>
      </>
    );
}

export default AlertModal
