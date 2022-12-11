import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const Price = (props) => {
  
  const [priceUSDinSats, setPrice] = useState(0)
  
  useEffect(() => { 
    async function getPrice() {
  return axios({
    method: "get",
    url: process.env.REACT_APP_PRICE_API
  }).then(function (response) {
     return 100_000_000 / response.data.USD.buy;
    })
  }
    getPrice().then((result) => { setPrice(result) })

  }, [])
  
  return (
    <div>
      {props.usd ?
        <h3 className='price'>Total: {props.value}$
          {/* ({Math.round(priceUSDinSats * props.value)} Sats) */}
        </h3>
        :
        <h3 className='price'>Total: {(props.value / priceUSDinSats).toFixed(2)}$
          {/* ({props.value} Sats) */}
        </h3>
      }
    </div>
  )
}

export default Price
