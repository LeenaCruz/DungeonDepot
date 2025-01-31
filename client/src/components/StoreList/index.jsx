import React from 'react';
import { useQuery } from '@apollo/client';
import {useMutation} from '@apollo/client';
import { GET_USER_STORES } from '../../utils/queries'; // Adjust the path as necessary
  import { DELETE_STORE } from '../../utils/mutations';

const StoreList = () => {
  const { loading, error, data, refetch} = useQuery(GET_USER_STORES, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('id_token') || ''}`,
      },
    },
  });

// const [deleteStore] = useMutation(DELETE_STORE, {
//   update(cache, { data: {deleteStore}}) {
//     cache.modify({
//       fields: {
//         getUserStores(existingStores = []) {
//           return existingStores.filter(store => store.id !== deleteStore._id);
//         }
//       }
//     })
//   }
// });

 const [deleteStore] = useMutation(DELETE_STORE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

const handleDeleteStore = async (storeId) => {
  try {
    const {data} = await deleteStore({
variables: {storeId}
    });
    await refetch();
    console.log("Store deleted:", data);
   
  } catch (error) {
    console.log("Error deleting store:", error)
  }
};
// Cuando creo la tienda, me aparece el nombre en current shop, y no aparece el nombre en your stroes, si doy refresh ya no me aparece el nombre en current shop me dice que el store id esta null y si me aparece el nombre en your stores, checar en current shop que sucede cuadno da refresh, de donde esta jalando el store id? de local memory
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
            <button onClick={() => handleDeleteStore(store._id)} >Delete</button>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;