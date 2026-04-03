// Import LA Michelin data
import michelinLA from "../../data/michelin_la.json" with { type: "json" };

export { michelinLA };

const michelinBusinesses = michelinLA.filter(b => b.inRW === 1);
const nonMichelinBusinesses = michelinLA.filter(b => b.treated250 === 1);

// Get businesses by category for color coding
export const getBusinessesByCategory = (filterType) => {
  const categories = {
    rw_restaurants: [],
    neighbors: [],
    control: []
  };

  switch (filterType) {
    case "michelin_only":
      categories.rw_restaurants = michelinBusinesses;
      break;
    case "non_michelin_only":
      categories.neighbors = nonMichelinBusinesses;
      break;
    case "both":
    default:
      categories.rw_restaurants = michelinBusinesses;
      categories.neighbors = nonMichelinBusinesses;
      break;
  }

  return categories;
};
