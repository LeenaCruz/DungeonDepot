import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import kingDice from '../../assets/kingDice.png'

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
import Inventory from '../InventoryList';
import { getAllSpells } from "../../api";

import Auth from '../../utils/auth';
import Login from '../../pages/Login';
import Wallet from '../GamingWallet';

const LandingPage = () => {
  // const [thoughtText, setThoughtText] = useState('');

  // const [characterCount, setCharacterCount] = useState(0);

  // accumulates the items added to cart by the user 
  const [itemCount, setItemCount] = useState(0);
  //Define thoughtText
const [thoughtText,setThoughtText] = useState(0);
  // adds up and updates the total items in the gm's store
  const [totalAvailableItems, setTotalAvailableItems] = useState(0);

  const [addThought, { error }] = useMutation
  (ADD_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          thoughtAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };


  // Not working 
  let listLength;
    getAllSpells((sData) => {
      listLength = sData.length
      // return listLength
    })
    
  return (
    <div>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              itemCount === totalAvailableItems || error ? 'text-danger' : ''
              // characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            <h3> Inventory </h3>
            Browse Inventory {totalAvailableItems} / {listLength}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <section
                name="thoughtText"
                className="form-input w-100"
                 style={{height: 'auto', resize: 'vertical' }}
                 onChange={handleChange}>
                   <Inventory />
                   <Wallet />
             </section>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Checkout
              </button>
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
