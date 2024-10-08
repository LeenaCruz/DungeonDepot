import React, { useState, useEffect } from 'react';
import Wallet from '../components/GamingWallet';
import EquipmentList from '../components/EquipmentList';
// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import BeginForm from '../components/LandingPageForm';
// import ThoughtList from '../components/ThoughtList';

//SEARCH BAR 
import SearchBar from '../components/SearchBar';
import { getAllEquipment } from '../api';


import { QUERY_ME } from '../utils/queries'
import AuthService from '../utils/auth';
// We didnt have bootstrap installed
// import 'bootstrap/dist/css/bootstrap.min.css';

import { useQuery } from '@apollo/client';

const homePage = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
 //SEARCH BAR
  // const [shopName, setShopName] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  //Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.log('Error fetching items:', error)
      }
    };
    fetchItems();
  }, []);

  const handleSearch = (query) => { 
    const filtered = items.filter((item) => 
      item.name.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredItems(filtered);
  }


 
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

 


  return (
    // Users Dashboard
    <div>

      {AuthService.loggedIn() ? (
        <>

          <div className="container">
            <div className="row mb-3">
              <div className="col-md-3 col-sm-12" >
                <div className="sideBox"> <h4> User Inventory or Create Shop</h4>
                  <div> Wallet:</div>
                  {data?.me?.username ?? 'N/A'}
                  <p>${data?.me?.wallet ?? 'N/A'}</p>
                  <Wallet />
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
                  <div className="sideBox"> <h4> CREATE SHOP</h4>
                    <div> Shop Name </div>
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
                    <input
                      placeholder='What is your shop name?'
                    />

                    <SearchBar onSearch={handleSearch} />

                    <p>Results:</p>
                    <div className='item-row'>
                      <p className='item-name'>Item Name</p>
                      <button className='item-button'>Add</button>
                    </div>
                    <div className='item-row'>
                      <p className='item-name'>Item Name</p>
                      <button className='item-button'>Add</button>
                    </div>

<div className='shop-preview'>
  <h2>Shop Name</h2>
  <ul>
    {filteredItems.map((item) => (
      <li key={item.id}>
        {item.name}
        <button className='item-button'>
          Add
          </button></li>
    ))}
  </ul>
</div>


                    <button>Create Shop</button>
                    {/* <p>Create by Category</p>
                    <p>Select Category</p>
             <option value='all'> All items</option>
                    <button>Random Generate</button> */}
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
                    {/* <div> Item List Component?</div>
                    <button>Checkout</button> */}

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
