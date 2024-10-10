import React, { useState, useEffect } from 'react';
import Wallet from '../components/GamingWallet';
import EquipmentList from '../components/EquipmentList';
import CreateStoreForm from '../components/CreateStore';
import { PURCHASE_ITEMS } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import { useMutation } from "@apollo/client";
// import { Navigate, useParams } from 'react-router-dom';

//SEARCH BAR 
// import SearchBar from '../components/SearchBar';
// import { getAllEquipment } from '../api';

import { QUERY_ME } from '../utils/queries'
import AuthService from '../utils/auth';

import { useQuery } from '@apollo/client';
import { useCartContext } from '../utils/context';
import StoreComponent from '../components/StoreComponent';

const homePage = () => {
  // const {data, loading} = useQuery(QUERY_ME)
  const { loading, error, data } = useQuery(QUERY_ME);
  const user = data?.me || {}

  const [storeId, setStoreId] = useState(null);

  const handleStoreCreated = (newStoreId) => {
    setStoreId(newStoreId);
    console.log('New store created with ID:', newStoreId)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  const { cart, setCart } = useCartContext();
  return (

    // Users Dashboard
    <div>

      {AuthService.loggedIn() ? (
        <>

          <div className="container">
            <div className="row mb-3">
              <div className="col-md-3 col-sm-12" >
                <div className="sideBox"> <h4> {data?.me?.username ?? 'N/A'}'s Inventory </h4>
                  <div> Wallet: {user.wallet} GP </div>
                  {/* how to render the inventory - doesn't accept object */}
                  <div> Inventory:
                    {/* {...cart} */}

                    {cart.map((item, index) => (<div className='item-sep'>{item.name}</div>))}

                  {cart.map((item, index) => (<div className='item-sep' style={{width: 'auto'}}>{item.name}</div>))}

                    {/* {user.inventory.forEach(element => {
                    element.name
                  })}  */}
                  </div>

                  {/* cart.length === 0 ? (<div className='cart-text'>Empty</div>) : */}
                  {/* <p>${data?.me?.wallet ?? 'N/A'}</p> */}
                  {/* <Wallet /> */}
                </div>
              </div>
              <div className=" col-md-6 col-sm-12">
                <div className="contentBox">
                  <div> "Name of the GameMaster's" Shop</div>
                  <StoreComponent storeId={storeId} />
                </div>
              </div>
              <div className="col-md-3 col-sm-12">
                <div className="sideBox">
                  <h4>Cart</h4>
                  <div> Item List Component?</div>
                  <button>Checkout</button>

                </div>
              </div>
            </div>
            {/* Item description section */}
            {/* <div className="row">
              <div className="col-12">
                <div className="itemDescription">
                  <h4>Item Description </h4>
                  <div> Item Details Component?</div></div>

              </div>
            </div> */}

          </div>

             {/* GM DASHBoard */}
          


<div className="container">
<h3> GM DASHBOARD LAYOUT </h3>
  <div className="row mb-3">
    <div className="col-md-3 col-sm-12" >
      <div className="sideBox"> 
        <CreateStoreForm onStoreCreated={handleStoreCreated} />
        <EquipmentList storeId={storeId} />
      </div>
    </div>
    <div className=" col-md-6 col-sm-12">
      <div className="contentBox">
        <h4> Current Shop </h4>
        <div className='item-row'>
          <p className='item-name'>Added Item's Name Here</p>
          <p className='item-name'>QTY</p>
          <p className='item-name'>Cost</p>
          <button className='item-button'>Edit</button>
        </div>
      </div>
    </div>
    <div className="col-md-3 col-sm-12">
      <div className="sideBox">
        <h4>GM SHOPS</h4>
        {/* <p>If GM has shops, they should show here.</p> */}
        <div>
          <div>Shop Card</div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        {/* <p>If 0 shops then:</p>
        <div> You have no shops created. </div> */}
  
      </div>
    </div>
  </div>
</div>
          {/* Closing Div */}


        </>
      ) : (
        <>
          <div>
            <h4> You are not logged in.</h4>
          </div>
        </>

      )}
    </div>

  );
}


export default homePage;


