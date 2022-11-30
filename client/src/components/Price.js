import React from 'react'

const Price = (props) => {
  return (
    <div>
      <h3 className='price'>Total: {props.value} {props.symbol } </h3>
    </div>
  )
}

export default Price
