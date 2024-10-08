import { useEffect, useState } from "react";
import { getAllEquipment } from "../../api";
import EquipmentCard from "../../pages/EquipmentCard";
import { getAllSpells } from "../../api";
import SpellCard from "../../pages/spellCard";
import { useCartContext } from "../../utils/context";

// api  
const Inventory = () => {

    const [equipments, setEquipment] = useState([]);
    useEffect(() => {
    getAllEquipment().then(setEquipment);
    }, []);

    const {cart, setCart} = useCartContext();

    const handleClick = (item) => {
        console.log(item)
        setCart(c => [...c, item])
    }
    useEffect(() => {
        console.log(cart)
    }, [cart])
    return (
        <div className="inv-items-div">
        <ul className="equipment-list">
        {equipments.map((equipment) => (
            <div className='atc-div'>
            <EquipmentCard key={equipment.index} equipment={equipment} />
            <button className='ATC-btn-pos'>Add To Cart</button>
            <SpellCard key={spell.index} spell={spell} />
            <button className="ATC-btn-pos" onClick={() => handleClick(spell)}>Add to Cart</button>
            {/* <button className='ATC-btn-pos'>Add To Cart</button> */}
            </div>
            ))}
            </ul>
        </div>
    )  
}

export default Inventory