import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const CountryDropdown = () => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        VPN server country
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Country 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Country 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Country 3</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

export default CountryDropdown
