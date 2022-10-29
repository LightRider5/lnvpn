import { React, useState } from 'react'
import {Modal,Button} from 'react-bootstrap'

const LoginModal = (props) => {
  const [visibleLoginModal, setShowLoginModal] = useState(false);
  const closeLoginModal = () => setShowLoginModal(false);
  const showLoginModal = () => setShowLoginModal(true);

  if(!props.show){
     return (null)
   } 

  return (
      <div>
           <Modal 
            show={props.show} 
            onHide={props.handleClose}
            centered
            >
        <Modal.Header closeButton>
          <Modal.Title >Login with you Lightning wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LoginModal
