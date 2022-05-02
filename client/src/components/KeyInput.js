import React from 'react'
import {Form,InputGroup} from 'react-bootstrap'

function KeyInput(props) {

    return (
    <div>
        <Form>
            <Form.Group className="mb-2">
            <InputGroup>
                <InputGroup.Text>Private Key</InputGroup.Text>
                <Form.Control value={props.privateKey} disabled/>
            </InputGroup>        
            <InputGroup>
                <InputGroup.Text>Public Key</InputGroup.Text>
                <Form.Control value={props.publicKey} disabled/>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>Preshared Key</InputGroup.Text>
                <Form.Control value={props.presharedKey} disabled/>
            </InputGroup>      
            </Form.Group>

        </Form> 
    </div>
  )
}


export default KeyInput
