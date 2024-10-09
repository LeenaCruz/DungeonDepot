import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import kingDice from '../../assets/kingDice.png'
import { QUERY_ME } from '../../utils/queries';
import Inventory from '../InventoryList';
import { getAllEquipment } from "../../api";

import Auth from '../../utils/auth';
import Login from '../../pages/Login';
import Wallet from '../GamingWallet';
import Cart from '../Cart'
import { ADD_USER } from '../../utils/mutations';

const LandingPage = () => {

const [itemCount, setItemCount] = useState(0);
const [totalAvailableItems, setTotalAvailableItems] = useState(0);


    const [addUser, { error }] = useMutation
  (ADD_USER, {
    refetchQueries: [
      'getUser',
      QUERY_ME,
      'me'
    ]
  });


  let listLength;
    getAllEquipment((sData) => {
      listLength = sData.length
    })
    
  return (
    <div>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              itemCount === totalAvailableItems || error ? 'text-danger' : ''
            }`}
          >
            <strong style={{display: 'flex', justifyContent: 'center', color: '#4C061D', fontSize: '40px'}}> Inventory List </strong>
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
          >
            <div className="col-12 col-lg-9">
              <section
                className="form-input w-100"
                 style={{height: 'auto', resize: 'vertical' }}
                 >
                   <Inventory />
                   <Cart />
                   <Wallet />
             </section>
            </div>

            <div className="col-12 col-lg-3">
              <Link className="btn btn-primary btn-block py-3 checkout-btn1" to={'/checkout'} type="submit">
                Checkout
              </Link>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <div>
        <p className='login-prompt'>
          You need to be logged in to see the GM's store. Please{' '}
          <Link to="/login" style={{marginRight: 5, marginLeft: 5}}> login </Link> or <Link to="/signup" style={{marginRight: 5, marginLeft: 5}}>signup.</Link>
        </p>
        <div className='pos-main-icon'>
         <img src={kingDice} className='icon-sizing' />
         </div>
         </div>
      )}
    </div>
  );
};

export default LandingPage;
