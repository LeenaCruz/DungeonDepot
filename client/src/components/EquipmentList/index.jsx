import React, { useEffect, useState, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { getAllEquipment, getMagicItems, getEquipmentCategories } from '../../api';
import { ADD_ITEM_TO_SHOP, CREATE_ITEM } from '../../utils/mutations';

const EquipmentList = ({storeId}) => {
  const [equipment, setEquipment] = useState([]);
  const [magicItems, setMagicItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

const [addItemToShop] = useMutation(ADD_ITEM_TO_SHOP);
const [createItem] = useMutation(CREATE_ITEM);

console.log("Checking storeId pass:", storeId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equipmentData, magicItemsData, categoriesData] = await Promise.all([
          getAllEquipment(),
          getMagicItems(),
          getEquipmentCategories(),
        ]);
        setEquipment(equipmentData);
        setMagicItems(magicItemsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
// For Search Button version
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSearch(searchTerm);
  // }

const handleAddToShop = async (item) => {
  console.log('Soy el Item:', item)
  console.log('Add button HandleAddtoshop, storeId:', storeId)
  if (!storeId) {
    console.error('No store created yet');
    return;
  } 
  try { 

    // Create the item 
const {data: createItemData} = await createItem({
variables: {
  item: {
  name: item?.name || "No name",
  description: item.desc ? item.desc.join(", ") : "No description",
  cost: item.cost?.quantity || 0,
  category: item.equipment_category?.name || "No category",
  rarity: item?.rarity?.name || 'Common',
},
},
})
console.log("Created Item button works:", createItemData);

//save item to shop (current)
const newItem = createItemData?.createItem;
if (newItem){ 

    const {data: addItemToShopData} = await addItemToShop({
      variables: {
        storeId: storeId,
        itemId: newItem._id,
      },
    });

    console.log('Item added to the shop:',addItemToShopData)
  }
  } catch (err) {
    console.error('Error adding item to the shop:', err)
  }
}

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log("Selected Category:", event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Current Equipment:", equipment);
    const combinedResults = [...equipment, ...magicItems];
    const filteredResults = combinedResults.filter(item => {
      const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory 
        ? item.equipment_category?.index === selectedCategory
        : true;

      return matchesSearchTerm && (matchesCategory || !item.equipment_category);
    });
    
    console.log("Filtered Results:", filteredResults);
    setResults(filteredResults);
    setHasSearched(true);
  };

  // Memoization of filtered results can be done similarly as before

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='search-preview'>
      <h2>Search for items</h2>
      
      <input
        type="text"
        placeholder="Search equipment and magic items..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select Equipment Category</option>
        {categories.map((category) => (
          <option key={category.index} value={category.index}>
            {category.name}
          </option>
        ))}
      </select>

      <button onClick={handleSearchClick} disabled={!selectedCategory && !searchTerm}>Search</button>

      {!hasSearched ? (
        <p>Please select a category and enter a search term to see results.</p>
      ) : (
        <ul>
          {results.length > 0 ? (
            results.map((item) => (
              <li key={item.index}>
                <h2>{item.name}</h2>
                <p>{item.desc || item.desc.join(', ')}</p>
                <button onClick={() => handleAddToShop(item)}>Add</button>
              </li>
            ))
          ) : (
            <li>No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default EquipmentList;

