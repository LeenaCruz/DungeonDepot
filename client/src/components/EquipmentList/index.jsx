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
    <div>
      <h1>Equipment List</h1>
      <input
        type="text"
        placeholder="Search equipment..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredEquipment.map((item) => (
          <li key={item.index}>
            <h2>{item.name}</h2>
            <p>{item.equipment_category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;
