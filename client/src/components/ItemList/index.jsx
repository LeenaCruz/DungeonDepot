import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items'); // No need for full URL
                setItems(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default ItemList;
// const ItemList = ({ items = [] }) => {
//   if (!items.length) {
//     return <h3>No Items Yet</h3>;
//   }

//   return (
//     <>
//       <h3
//         className="p-5 display-inline-block"
//         style={{ borderBottom: '1px dotted #1a1a1a' }}
//       >
//         Items
//       </h3>
//       <div className="flex-row my-4">
//         {items &&
//           items.map((item) => (
//             <div key={item._id} className="col-12 mb-3 pb-3">
//               <div className="p-3 bg-dark text-light">
//                 <h5 className="card-header">
//                   {item.itemAuthor} itemed{' '}
//                   <span style={{ fontSize: '0.825rem' }}>
//                     on {item.createdAt}
//                   </span>
//                 </h5>
//                 <p className="card-body">{item.itemText}</p>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };


