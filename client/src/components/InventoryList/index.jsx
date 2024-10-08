import { useEffect, useState } from "react";
import { getAllEquipment } from "../../api";
import EquipmentCard from "../../pages/EquipmentCard";

// api  
const Inventory = () => {

    const [equipments, setEquipment] = useState([]);
    useEffect(() => {
    getAllEquipment().then(setEquipment);
    }, []);

    return (
        <div className="inv-items-div">
        <ul className="equipment-list">
        {equipments.map((equipment) => (
            <div className='atc-div'>
            <EquipmentCard key={equipment.index} equipment={equipment} />
            <button className='ATC-btn-pos'>Add To Cart</button>
            </div>
            ))}
            </ul>
        </div>
    )  
}

export default Inventory