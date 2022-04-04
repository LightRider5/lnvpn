import CountryDropdown from "./components/CountryDropdown";
import ExpireDropdown from "./components/ExpireDropdown";
import InvoiceButton from "./components/InvoiceButton";

function App() {
  return (
    <div className="container main-middle">
     
        <h1>LN VPN</h1>
        <CountryDropdown/>
        <ExpireDropdown/>
        <InvoiceButton/>
       
      
    </div>
  );
}

export default App;
