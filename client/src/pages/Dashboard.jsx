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

const homePage = () => {
  // const {data, loading} = useQuery(QUERY_ME)
  const { loading, error, data } = useQuery(QUERY_ME);
  const user = data?.me || {}
 //SEARCH BAR
  // const [shopName, setShopName] = useState('');
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  // //Fetch items from API
  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const data = await getAllEquipment();
  //       setItems(data);
  //       setFilteredItems(data);
  //     } catch (error) {
  //       console.log('Error fetching items:', error)
  //     }
  //   };
  //   fetchItems();
  // }, []);

  // const handleSearch = (query) => { 
  //   const filtered = items.filter((item) => 
  //     item.name.toLowerCase().includes(query.toLowerCase())
  // );
  // setFilteredItems(filtered);
  // }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  // const createShop = () => {
  //   const [shopState, setShopState] = useState({
  //     shop: '',
  //   });
  // };

  // const handleChange = (event) => {
  //   const {name, value} = event.target;
  //   setShopState({
  //     ...shopState,
  //     [name]: value,
  //   });
  // };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(shopState);

  //   try {
  //     const {data} = await addStore ({

  //     }
  //   }
  // }

  
  const {cart, setCart} = useCartContext();
// error in {}
//   const [purchaseItems, {}] = useMutation(PURCHASE_ITEMS, {
//     refetchQueries: [QUERY_ME]
// })

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
                  <EquipmentList />
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

            <div className="row">
              <div className="col-12">
                <div className="itemDescription">
                  <h4>Item Description </h4>
                  <div> Item Details Component?</div></div>

              </div>
            </div>

            {/* GM DASHBoard */}
            <h3> GM DASHBOARD LAYOUT </h3>


            <div className="container">
              <div className="row mb-3">
                <div className="col-md-3 col-sm-12" >
                  <div className="sideBox"> 
                    <CreateStoreForm />
                    {/* <h4> CREATE SHOP</h4> */}
                    {/* <p> Name </p> */}
                    {/* <form onSubmit = {handleFormSubmit}>
                    <input 
                    placeholder='Store Name'
                    name='shop'
                    type='text'
                    value={shopState.shop}
                    onChage={handleChange}
                    />
                  
                   
                    <button>Add Items</button>
                    <p> Search for an item:</p>
                    <div> SEARCH BAR COMPONENT HERE</div>
                    <div> Items show here, each one with add button </div>
                 <button>Create Shop</button>
                 </form> */}

                    {/* Layout Only */}
                    {/* <input
                      placeholder='What is your shop name?'
                    /> */}

                    {/* <SearchBar onSearch={handleSearch} /> */}
                    <EquipmentList />

                    {/* <p>Results:</p> */}
                    {/* <div className='item-row'>
                      <p className='item-name'>Item Name</p>
                      <button className='item-button'>Add</button>
                    </div>
                    <div className='item-row'>
                      <p className='item-name'>Item Name</p>
                      <button className='item-button'>Add</button>
                    </div> */}

{/* <div className='search-preview'>
  <ul className='item-list'>
    {filteredItems.map((item) => (
      <li key={item.id} className='item-name' >
        {item.name}
        <button className='item-button'>Add
          </button></li>
    ))}
  </ul>
</div> */}

                  </div>
                </div>
                <div className=" col-md-6 col-sm-12">
                  <div className="contentBox">
                    <h4> Current Shop </h4>
                    <p>Items Cards ?</p>
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
                    <p>If GM has shops, they should show here.</p>
                    <div>
                      <div>Shop CARD</div>
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                    <p>If 0 shops then:</p>
                    <div> You have no shops created. </div>
              
                  </div>
                </div>
              </div>
            </div>









            {/* Closing Div */}
          </div>


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


