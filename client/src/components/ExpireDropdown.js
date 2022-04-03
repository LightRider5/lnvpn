import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const ExpireDropdown = () => {
  return (
    <div>
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        Desired expiry time
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">1h</Dropdown.Item>
            <Dropdown.Item href="#/action-2">24h</Dropdown.Item>
            <Dropdown.Item href="#/action-3">1 week</Dropdown.Item>
            <Dropdown.Item href="#/action-4">1 month</Dropdown.Item>
            <Dropdown.Item href="#/action-5">1 year</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
      
    </div>
  )
}

export default ExpireDropdown
