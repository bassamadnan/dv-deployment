// Import LA Michelin data
import michelinLA from "../../data/michelin_la.json" with { type: "json" };

export { michelinLA };

// Get businesses by category for color coding
export const getBusinessesByCategory = (filterType) => {
  const categories = {
    rw_restaurants: [],
    neighbors: [],
    control: []
  };

  switch (filterType) {
    case "michelin_la":
    default:
      categories.neighbors = michelinLA.filter(b => b.treated250 === 1);
      break;
  }

  return categories;
};

// Get Michelin businesses separately (analogous to RW)
export const getRWBusinesses = () => {
  return michelinLA.filter(b => b.inRW === 1);
};