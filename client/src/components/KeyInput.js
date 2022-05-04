import React from 'react'
import {Form,InputGroup} from 'react-bootstrap'


function KeyInput(props) {
    
    return (
    <div>
        <Form>
            <Form.Group className="mb-2">
            <InputGroup>
                <InputGroup.Text>Private Key</InputGroup.Text>
                <Form.Control 
                key={props.privateKey} 
                defaultValue={props.privateKey}
                onChange = { (event) => { props.newPrivateKey(event.target.value) } }
                  
            />
            </InputGroup>        
            <InputGroup>
                <InputGroup.Text>Public Key</InputGroup.Text>
                <Form.Control 
                key={props.publicKey} 
                defaultValue={props.publicKey}
                onChange = { (event) => { props.newPublicKey(event.target.value) } } 
            />
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>Preshared Key</InputGroup.Text>
                <Form.Control 
                key={props.presharedKey} 
                defaultValue={props.presharedKey}
                onChange = { (event) => { props.newPresharedKey(event.target.value) } } 
            />
            </InputGroup>      
            </Form.Group>

        </Form> 
    </div>
  )
}



export default KeyInput
