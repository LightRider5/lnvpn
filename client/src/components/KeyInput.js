import React from 'react'
import { useContext } from 'react';
import {Form,InputGroup,Button,Alert,Accordion,AccordionContext,useAccordionButton,Card,Row,Col} from 'react-bootstrap'
import { IoIosRefresh } from "react-icons/io";


function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
  
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey),
    );
  
    const isCurrentEventKey = activeEventKey === eventKey;
  
    return (
      <Button
        type="button"
        size="lg"
        variant={isCurrentEventKey ? 'primary' : 'primary'}
        onClick={decoratedOnClick}
      >{isCurrentEventKey ? ' Show my Keys ' : ' Show my Keys '}
        {children}
      </Button>
    );
  }

const KeyInput = (props) => {
    return (
    <div>
        <Accordion >
        <Card>
            <Card.Header>
                <Row>   
                    <Col>
                        <ContextAwareToggle eventKey="0"/>
                    </Col>
              </Row>
            </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
            <Row>
            <Alert variant="light">Your private keys are only generated within the browser! You can paste or generate 🔄 your own keys now, but you don't have to.</Alert>
            </Row>
            <Form>
                <Form.Group className="mb-2">
                <InputGroup>
                    <InputGroup.Text>Private Key</InputGroup.Text>
                    <Form.Control 
                    key={props.privateKey} 
                    defaultValue={props.privateKey}
                    onChange = { (event) => { props.newPrivateKey(event.target.value) } }
                    
                />
                <Button
                    onClick={
                    props.onClick
                    }
                    variant="success"
                >
                    <IoIosRefresh
                    color="white"
                    size={20}
                    title="renew keys"
                    />
                </Button>
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
            </Card.Body>
        </Accordion.Collapse>
      </Card>
      </Accordion>
    </div>
  )
}



export default KeyInput
