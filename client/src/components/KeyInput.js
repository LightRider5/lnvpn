import React from 'react'
import {Form} from 'react-bootstrap'

function KeyInput(props) {

    return (
    <div>
        <Form>
            <Form.Group className="mb-3">
            <Form.Label>Private Key</Form.Label>
            <Form.Control placeholder={props.privateKey}/>
            <Form.Text className="text-muted">
              This Key will never be stored anywhere else.
            </Form.Text>
            <Form.Label>Public Key</Form.Label>
            <Form.Control placeholder={props.publicKey}/>
            </Form.Group>  
        </Form> 
    </div>
  )
}

export default KeyInput
