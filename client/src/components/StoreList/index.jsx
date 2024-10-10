import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_STORES } from '../../utils/queries'; // Adjust the path as necessary

const StoreList = () => {
  const { loading, error, data } = useQuery(GET_USER_STORES, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('id_token') || ''}`,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Your Stores</h2>
      <ul>
        {data.getUserStores.map(store => (
          <li key={store._id}>
            {store.name}
            {/* <ul>
              {store.items.map(item => (
                <li key={item._id}>{item.name}</li>
              ))}
            </ul> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;