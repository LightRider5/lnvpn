import React from 'react'
import {ToggleButtonGroup,ToggleButton,ButtonToolbar,Tab,Tabs,Nav,Row,Col, Container} from 'react-bootstrap'
const CountrySelector = (props) => {
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="europe">
        <Container fluid="true">
          <Row>
            <Col xs={3} id="continentselector" className='d-xs-none'>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="america">America</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="europe">Europe</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="asia">Asia</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="africa">Africa</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xs={9}>
              <Tab.Content>
                <Tab.Pane eventKey="america">
                <ButtonToolbar>
                  <ToggleButtonGroup type="radio" name="options" id="countryselector">
                    <ToggleButton value={5} onClick={props.onClick} title="Canada">
                        🇨🇦 <br></br>Canada
                      </ToggleButton>
                      <ToggleButton value={2} onClick={props.onClick} title="United States">
                        🇺🇸 <br></br>United States 
                      </ToggleButton>
                      <ToggleButton value={14} onClick={props.onClick} title="Brazil">
                        🇧🇷 <br></br>Brazil
                        </ToggleButton>
                  </ToggleButtonGroup>  
                </ButtonToolbar>    
                </Tab.Pane>
                <Tab.Pane eventKey="europe">
                    <ButtonToolbar>
                      <ToggleButtonGroup type="radio" name="options" id="countryselector" defaultValue={7}>  
                          <ToggleButton value={7} onClick={props.onClick} title="Netherlands">
                            🇳🇱  <br></br>Netherlands
                          </ToggleButton>
                          <ToggleButton  value={3} onClick={props.onClick} title="Finland">
                            🇫🇮 <br></br>Finnland
                          </ToggleButton >
                          <ToggleButton value={4} onClick={props.onClick} title="Great Britain">
                            🇬🇧 <br></br>United Kingdom
                          </ToggleButton>
                          <ToggleButton value={9} onClick={props.onClick} title="Ukraine">
                            🇺🇦 <br></br>Ukraine
                          </ToggleButton>
                          <ToggleButton value={10} onClick={props.onClick} title="Switzerland">
                            🇨🇭  <br></br>Switzerland
                          </ToggleButton>
                      </ToggleButtonGroup>  
                  </ButtonToolbar>  
                </Tab.Pane>
                <Tab.Pane eventKey="asia">
                    <ButtonToolbar>
                      <ToggleButtonGroup type="radio" name="options" id="countryselector">  
                        <ToggleButton value={6} onClick={props.onClick} title="India">
                          🇮🇳 <br></br>India
                        </ToggleButton>
                        <ToggleButton value={1} onClick={props.onClick} title="Singapore">
                          🇸🇬 <br></br>Singapore
                        </ToggleButton>
                        <ToggleButton value={8} onClick={props.onClick} title="Russia">
                          🇷🇺 <br></br>Russia
                        </ToggleButton> 
                        <ToggleButton value={11} onClick={props.onClick} title="Israel">
                          🇮🇱  <br></br>Israel
                        </ToggleButton> 
                        <ToggleButton value={12} onClick={props.onClick} title="Kazakhstan">
                          🇰🇿  <br></br>Kazakhstan
                        </ToggleButton>
                      </ToggleButtonGroup>  
                  </ButtonToolbar>  
                </Tab.Pane>
                <Tab.Pane eventKey="africa">
                  <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="options" id="countryselector" >  
                        <ToggleButton value={13} onClick={props.onClick} title="South Africa">
                          🇿🇦 <br></br>South Africa
                        </ToggleButton>
                      </ToggleButtonGroup>  
                  </ButtonToolbar>  
                </Tab.Pane>  
              </Tab.Content>
            </Col>
          </Row>
        </Container>  
      </Tab.Container>
      {/* <Tabs defaultActiveKey="america" transition={false} id="noanim-tab-example" variant='pills' fill>
        <Tab eventKey="america" title="America">
        <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="options" id="countryselector" defaultValue={5}>
            <ToggleButton value={5} onClick={props.onClick} title="Canada">
                        🇨🇦 <br></br>Canada
                      </ToggleButton>
                      <ToggleButton value={2} onClick={props.onClick} title="United States">
                        🇺🇸 <br></br>United States 
                      </ToggleButton>
                      <ToggleButton value={14} onClick={props.onClick} title="Brazil">
                        🇧🇷 <br></br>Brazil
                        </ToggleButton>
                  </ToggleButtonGroup>  
          </ButtonToolbar>
        </Tab>
        <Tab eventKey="profile" title="Europe">
        <ButtonToolbar>
                      <ToggleButtonGroup type="radio" name="options" id="countryselector" defaultValue={7}>  
                          <ToggleButton value={7} onClick={props.onClick} title="Netherlands">
                            🇳🇱  <br></br>Netherlands
                          </ToggleButton>
                          <ToggleButton  value={3} onClick={props.onClick} title="Finland">
                            🇫🇮 <br></br>Finnland
                          </ToggleButton >
                          <ToggleButton value={4} onClick={props.onClick} title="Great Britain">
                            🇬🇧 <br></br>United Kingdom
                          </ToggleButton>
                          <ToggleButton value={9} onClick={props.onClick} title="Ukraine">
                            🇺🇦 <br></br>Ukraine
                          </ToggleButton>
                          <ToggleButton value={10} onClick={props.onClick} title="Switzerland">
                            🇨🇭  <br></br>Switzerland
                          </ToggleButton>
                      </ToggleButtonGroup>  
                  </ButtonToolbar>  
          
        </Tab>
        <Tab eventKey="contact" title="Asia">
        <ButtonToolbar>
                      <ToggleButtonGroup type="radio" name="options" id="countryselector" defaultValue={6}>  
                        <ToggleButton value={6} onClick={props.onClick} title="India">
                          🇮🇳 <br></br>India
                        </ToggleButton>
                        <ToggleButton value={1} onClick={props.onClick} title="Singapore">
                          🇸🇬 <br></br>Singapore
                        </ToggleButton>
                        <ToggleButton value={8} onClick={props.onClick} title="Russia">
                          🇷🇺 <br></br>Russia
                        </ToggleButton> 
                        <ToggleButton value={11} onClick={props.onClick} title="Israel">
                          🇮🇱  <br></br>Israel
                        </ToggleButton> 
                        <ToggleButton value={12} onClick={props.onClick} title="Kazakhstan">
                          🇰🇿  <br></br>Kazakhstan
                        </ToggleButton>
                      </ToggleButtonGroup>  
                  </ButtonToolbar>  
        </Tab>
        <Tab eventKey="africa" title="Afrika">
        <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="options" id="countryselector" defaultValue={13}>  
                        <ToggleButton value={13} onClick={props.onClick} title="South Africa">
                          🇿🇦 <br></br>South Africa
                        </ToggleButton>
                      </ToggleButtonGroup>  
                  </ButtonToolbar>  

        </Tab>
</Tabs> */}
      
     </div>
  )
}

export default CountrySelector
