import { useEffect, useState } from "react";
import { getAllSpells } from "../../api";
import SpellCard from "../../pages/spellCard";

const Inventory = () => {

    const [spells, setSpells] = useState([]);
    useEffect(() => {
    getAllSpells().then(setSpells);
    }, []);

    return (
        <div className="inv-items-div">
        <ul className="spell-list">
        {spells.map((spell) => (
            <div className='atc-div'>
            <SpellCard key={spell.index} spell={spell} />
            <button className='ATC-btn-pos'>Add To Cart</button>
            </div>
            ))}
            </ul>
        </div>
    )  
}

export default Inventory