import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ITEM } from '../../utils/mutations';

import Auth from '../../utils/auth';

const ItemForm = ({ thoughtId }) => {
  const [ItemText, setItemText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addItem, { error }] = useMutation(ADD_Item);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addItem({
        variables: {
          thoughtId,
          itemText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          itemAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setItemText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ItemText' && value.length <= 280) {
      setItemText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What are your thoughts on this thought?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="ItemText"
                placeholder="Add your Item..."
                value={ItemText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Item
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ItemForm;
