import React, { useState, useEffect } from 'react';
import { GET_STORE, QUERY_ME } from "../../utils/queries";
import { useQuery } from '@apollo/client'

// console.log("Checking storeId pass:", storeId)
const StoreComponent = ({ storeId }) => {
  const { loading, error, data } = useQuery(GET_STORE, {
    variables: { storeId },
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`, // Ensure the token is included
      },
    },
  });

  if (data) {
    console.log("Store data:", data.getStore);
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.getStore.name}</h2>
      {/* Render items and other store details */}
      <ul>
        {data.getStore.items.map(item => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            {/* <p>{item.description}</p> */}
            <p>Cost: {item.cost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreComponent;