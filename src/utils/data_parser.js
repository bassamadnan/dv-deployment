import mapData from "../../data/mapData.json" with { type: "json" };
import rwRestaurants from "../../data/restaurants_inRW.json" with { type: "json" };

export { mapData, rwRestaurants };

// Helper functions for filtering based on the new 4 options
export const getFilteredBusinesses = (filterType) => {
  switch (filterType) {
    case "rw_only":
      // Option 1: Only RW restaurants (red dots)
      return rwRestaurants;
      
    case "treated125":
      // Option 2: RW + treated125 businesses (red + blue)
      const treated125 = mapData.filter(business => business.treated125 === 1);
      return [...rwRestaurants, ...treated125];
      
    case "treated125_250":
      // Option 3: RW + treated125 + treated125_250Only (red + blue + another color)
      const treated125All = mapData.filter(business => business.treated125 === 1);
      const treated250Only = mapData.filter(business => business.treated125_250Only === 1);
      return [...rwRestaurants, ...treated125All, ...treated250Only];
      
    case "control_group":
      // Option 4: RW + all treated + control group (everything)
      const allTreated125 = mapData.filter(business => business.treated125 === 1);
      const allTreated250 = mapData.filter(business => business.treated125_250Only === 1);
      const controlGroup = mapData.filter(business => business.control === 1);
      return [...rwRestaurants, ...allTreated125, ...allTreated250, ...controlGroup];
      
    default:
      return [...rwRestaurants, ...mapData];
  }
};

// Get businesses by category for color coding
export const getBusinessesByCategory = (filterType) => {
  const categories = {
    rw_restaurants: rwRestaurants,
    treated125: [],
    treated125_250Only: [],
    control: []
  };

  if (filterType === "rw_only") {
    return categories;
  }

  if (filterType === "treated125" || filterType === "treated125_250" || filterType === "control_group") {
    categories.treated125 = mapData.filter(business => business.treated125 === 1);
  }

  if (filterType === "treated125_250" || filterType === "control_group") {
    categories.treated125_250Only = mapData.filter(business => business.treated125_250Only === 1);
  }

  if (filterType === "control_group") {
    categories.control = mapData.filter(business => business.control === 1);
  }

  return categories;
};