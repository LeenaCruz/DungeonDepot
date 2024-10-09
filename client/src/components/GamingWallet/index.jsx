import { useEffect, useState } from "react";

const Wallet = (props) => {

    const [cash, setCash] = useState([]);

    return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="wallet-div">
      <header className="wallet-header">
        Gaming Wallet
      </header>
      <div className="wallet-bal">
        Balance: 100GP
      </div>
      </div>
      </div>
    )  
}

export default Wallet;