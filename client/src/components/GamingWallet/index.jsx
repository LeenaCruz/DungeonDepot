import { useEffect, useState } from "react";

const Wallet = () => {

    const [cash, setCash] = useState([]);

    return (
      <div className="wallet-div">
      <header className="wallet-header">
        Gaming Wallet
      </header>
      <div className="wallet-bal">
        Balance: 
      </div>
      </div>
    )  
}

export default Wallet;