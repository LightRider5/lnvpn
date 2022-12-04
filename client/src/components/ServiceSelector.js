import { React, useEffect,useState } from 'react'
import { Form } from 'react-bootstrap'


const ServiceSelector = (props) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
      const response = await fetch(`https://api2.sms4sats.com/getnumbersstatus?country=${props.selectedCountry}`);
        const newData = await response.json();
        setServices(newData);
    };
    fetchData();
    
  }, [props.selectedCountry]);

  return (
    
    <div>
       <Form.Select aria-label="Choose service" size="lg" onChange={props.onChange}>
        {
                  services.map((service,index) => (
                    <option key={ index} value={service.value}>{service.text}</option>
                ))
        }
        </Form.Select>    
    </div>
  )
}

export default ServiceSelector
