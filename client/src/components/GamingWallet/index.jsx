import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client'
import { QUERY_ME } from "../../utils/queries";

const Wallet = (props) => {
const {data, loading} = useQuery(QUERY_ME)
const user = data?.me || {}
    return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="wallet-div">
      <header className="wallet-header">
        Gaming Wallet
      </header>
      <div className="wallet-bal">
        Balance: {user.wallet} GP
      </div>
      </div>
      </div>
    )  
}

export default Wallet;