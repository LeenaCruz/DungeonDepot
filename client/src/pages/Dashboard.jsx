import  React, {useState } from 'react';
import Wallet from '../components/GamingWallet';
import EquipmentList from '../components/EquipmentList';
// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import BeginForm from '../components/LandingPageForm';
// import ThoughtList from '../components/ThoughtList';


import { QUERY_ME } from '../utils/queries'
import AuthService from '../utils/auth';
// We didnt have bootstrap installed
// import 'bootstrap/dist/css/bootstrap.min.css';

import { useQuery } from '@apollo/client';


const homePage = () => {


  const { loading, error, data } = useQuery(QUERY_ME);
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

                    <p> Search for items </p>
                    <input
                      placeholder='SEARCH BAR COMPONENT'
                    />
                    
                    <p>Results:</p>
                    <div className='item-row'>
                      <p className='item-name'>Item Name</p>
                      <button className='item-button'>Add</button>
                    </div>
                    <div className='item-row'>
                      <p className='item-name'>Item Name</p>
                      <button className='item-button'>Add</button>
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
                    <div> Current Shop </div>
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

// const Profile = () => {
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });

//   const user = data?.me || data?.user || {};
//   if (
//     Auth.loggedIn() && 
//     /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
//     Auth.getProfile().authenticatedPerson.username === userParam
//   ) {
//     return <Navigate to="/me" />;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

//   return (
//     <div>
//       <div className="flex-row justify-center mb-3">
//         <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
//           Viewing {userParam ? `${user.username}'s` : 'your'} profile.
//         </h2>

//         <div className="col-12 col-md-10 mb-5">
//           <ThoughtList
//             thoughts={user.thoughts}
//             title={`${user.username}'s thoughts...`}
//             showTitle={false}
//             showUsername={false}
//           />
//         </div>
//         {!userParam && (
//           <div
//             className="col-12 col-md-10 mb-3 p-3"
//             style={{ border: '1px dotted #1a1a1a' }}
//           >
//             <BeginForm />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

export default homePage;
