import React from 'react'
import {setState} from 'react'
import {Form,InputGroup} from 'react-bootstrap'

function KeyInput(props) {

    return (
    <div>
        <Form>
            <Form.Group className="mb-3">
            <InputGroup>
                <InputGroup.Text>Private Key</InputGroup.Text>
                <Form.Control value={props.privateKey} disabled/>
            </InputGroup>        
            <Form.Text>
              This Key will never be stored anywhere else.
            </Form.Text>
            <InputGroup>
                <InputGroup.Text>Public Key</InputGroup.Text>
                <Form.Control value={props.publicKey} disabled/>
            </InputGroup> 
            </Form.Group>

        </Form> 
    </div>
  )
}


export default KeyInput
