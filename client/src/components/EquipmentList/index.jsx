import React, { useEffect, useState } from 'react';
import { getAllEquipment } from '../../api';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await getAllEquipment();
        setEquipment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
// For Search Button version
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSearch(searchTerm);
  // }

const handleAddToStore = async (item) => { 
  try {
    await addItemToStore(item);
    alert(`${item.name} added to the store!`)
  } catch (error) {
    alert(`Error adding this item.`)
  }
};


  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='search-preview'>
      <p>Equipment List</p>
      <input
        type="text"
        placeholder="Search equipment..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm ? ( 
        <div>
          <p>Results:</p>
      <ul>
        {filteredEquipment.map((item) => (
          <li key={item.index}>
            <p className='item-list'>{item.name}</p>
            <p>{item.equipment_category.name}</p>
            <button onClick={() => handleAddToStore(item)}>Add</button>
          </li>
        ))}
      </ul>
      </div>
      ) : (
        <p>Start typing to search for items...</p>
      )}
    </div>

// With Search Button
    // <div>
    //   <form onSubmit={handleSubmit} className='search-bar'>
    //     <label htmlFor='item-search'>Search for items:</label>
    //     <input
    //       type='text'
    //       id='item-search'
    //       value={searchTerm}
    //       onChange={handleSearchChange}
    //       placeholder='Search for items to add...'
    //     />
    //     <button type='submit'>Search</button>
    //   </form>
    //   <div className='search-preview'>
    //     <ul>
    //       {filteredEquipment.map((item) => (
    //         <li key={item.index}>
    //           <h2>{item.name}</h2>
    //           <p>{item.equipment_category.name}</p>
    //           <button className='item-button'>Add</button>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>


  );
};

export default EquipmentList;

