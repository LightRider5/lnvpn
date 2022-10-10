import React from 'react'
import {Form} from 'react-bootstrap'
const CountrySelector = (props) => {
  return (
    <div>
        <Form.Select aria-label="Choose continent" size="lg" onChange={props.onChange}>
          <option value="1">🇸🇬 Singapore</option>
          <option value="2">🇺🇸 United States</option>
          <option value="3">🇫🇮 Finnland</option>
          <option value="4">🇬🇧 United Kingdom</option>
          <option value="5">🇨🇦 Canada</option>
          <option value="6">🇮🇳 India</option>
          <option value="7">🇳🇱 Netherlands</option>
          <option value="8">🇷🇺 Russia</option>
          <option value="9">🇺🇦 Ukraine</option>
          <option value="10">🇨🇭 Switzerland</option>
          <option value="11">🇮🇱 Israel</option>
          <option value="12">🇰🇿 Kazakhstan</option>
          {/* <option value="13">🇹🇷 Turkey</option> */}
          {/* <option value="14">🇧🇷 Brazil</option> */}
        </Form.Select>
{/* 
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
      </Tab.Container> */}
      
     </div>
  )
}

export default CountrySelector
