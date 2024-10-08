const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllEquipment() {
  const equipmentIndexes = await fetch(BASE_URL + "/api/equipment/").then((response) =>
    response.json()
  );
  return Promise.all(
    equipmentIndexes.results.map((index) =>
      fetch(BASE_URL + index.url).then((response) => response.json())
    )
  );
}

export async function getEquipmentCategories() {
  const categories = await fetch(BASE_URL + "/api/equipment-categories").then((response) =>
    response.json()
  );
  return categories.results;
}