///Transforms country into server
const getServer = (countrySelector) => {
  let server = new Object();
  switch (countrySelector) {
    case '1':
      server.ip = process.env.IP_SINGAPUR
      server.location = "Singapur"
     break;
    case '2':
      server.ip = process.env.IP_USA
      server.location = "USA"
    break;  
    case '3':
      server.ip = process.env.IP_FIN
      server.location = "Finland"
    break;
    case '4':
      server.ip = process.env.IP_UK
      server.location = "United Kingdom"
    break;
    case '5':
      server.ip = process.env.IP_CANADA
      server.location = "Canada"
    break;
    case '6':
      server.ip = process.env.IP_IND
      server.location = "India"
    break;
    case '7':
      server.ip = process.env.IP_NLD
      server.location = "Netehrlands"
    break;
    case '8':
      server.ip = process.env.IP_RUS
      server.location = "Russia"
    break;
    case '9':
      server.ip = process.env.IP_UKR
      server.location = "Ukraine"
    break;
    case '10':
      server.ip = process.env.IP_CHE
      server.location = "Switzerland"
    break;
    case '11':
      server.ip = process.env.IP_ISR
      server.location = "Israel"
    break;
    case '12':
      server.ip = process.env.IP_KAZ
      server.location = "Kazakhstan"
    break;  
    case '13':
      server.ip = process.env.IP_USA2
      server.location = "USA 2 (New York)"
      break;
    case '14':
      server.ip = process.env.IP_ROU
      server.location = "Romania"
    break;

    default:
      console.log(`Error with country selector: ${countrySelector}`);
      
  }
  return server;
}

module.exports = { getServer };