import React from 'react'
import {QRCodeCanvas} from 'qrcode.react'
import {Modal,Button,Spinner}from 'react-bootstrap'

function InvoiceModal(props) {
   
  if(!props.show){
     return null
   } 

  if(props.value === undefined){
    return (
      <div>
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton> 
          <Modal.Title>Something went wrong</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Could not receive a valid invoice. Try again later!
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>

        </Modal.Footer>

        </Modal>

      </div>

    )
  } 
   
  return (
    <div>
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton> 
          <Modal.Title>Scan or copy invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.showSpinner ? <Spinner animation="border" /> : <QRCodeCanvas value={props.value} size={256} />}
        {props.showSpinner ? null : <input id="invoicestring" class="form-control input-lg select" value={props.value}></input>}
        </Modal.Body>
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
