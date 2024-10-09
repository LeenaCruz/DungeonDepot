export default function EquipmentCard({ equipment }) {
    return (
      <li className="equipment-card">
        <hgroup style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'space-around', alignItems: 'center'}}>
          <h4 className="inv-card-header">{equipment.name}</h4>
          <h5 className="tool-text">
            {equipment.equipment_category.name}
          </h5>
        </hgroup>
        <div className="stats">
          <p> Description: { (equipment.desc != "" ) ? equipment.desc : 'None'}  </p>
          <p> Cost: {equipment.cost.quantity} {equipment.cost.unit}
          </p>
     
        </div>
      </li>
    );
  }