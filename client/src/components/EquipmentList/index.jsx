import React, { useEffect, useState, useMemo } from 'react';
import { getAllEquipment, getMagicItems, getEquipmentCategories } from '../../api';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [magicItems, setMagicItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

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
    <div>
      <h1>Equipment and Magic Items List</h1>
      
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
