import { useEffect, useState } from "react";
import { getAllEquipment } from "../../api";
import EquipmentCard from "../../pages/EquipmentCard";
import { useCartContext } from "../../utils/context";

// api  
const Inventory = () => {

    const [equipment, setEquipment] = useState([]);
    useEffect(() => {
    getAllEquipment().then(setEquipment);
    }, []);

    const {cart, setCart} = useCartContext();

    const handleClick = (item) => {
        const updatedItem = {
            name: item.name,
            description: item.desc[0] || 'item',
            cost: item.cost.quantity,
            category: item.equipment_category.name
        }
        setCart(c => [...c, updatedItem])
    }
    useEffect(() => {
        console.log(cart)
    }, [cart])
    return (
        <div className="inv-items-div">
        <ul className="equipment-list">
        {equipment.map((e) => (
            <div className='atc-div' key={e.index}>
            <EquipmentCard  equipment={e} />
            <button className="ATC-btn-pos" onClick={() => handleClick(e)}>Add to Cart</button>
            </div>
            ))}
            </ul>
        </div>
    )  
}

export default Inventory