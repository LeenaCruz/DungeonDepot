import React, { useEffect, useState } from 'react';
import { getEquipmentCategories } from '../../api';

const CategoryDrop = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getEquipmentCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <option>Loading...</option>;
  }

  if (error) {
    return <option>Error: {error}</option>;
  }

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Equipment Category</option>
      {categories.map((category) => (
        <option key={category.index} value={category.index}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryDrop;