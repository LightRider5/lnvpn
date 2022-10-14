import React from 'react'
import { Modal,Button,Alert } from 'react-bootstrap';
import { useState } from 'react';
const AlertModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
          </Modal.Body>
         
        </Modal>
      </>
    );
}

export default AlertModal
