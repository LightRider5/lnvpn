import React from 'react'
import {QRCodeCanvas} from 'qrcode.react'
import {Modal,Button,Spinner}from 'react-bootstrap'
function InvoiceModal(props) {
   
  if(!props.show){
     return null
   } 
   
  return (
    <div>
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton> 
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.showSpinner ? <Spinner animation="border" /> : <QRCodeCanvas value={props.value} size={256} />}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>  navigator.clipboard.writeText(props.value)}>
            Copy Invoice
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
    
  )
}

export default InvoiceModal
