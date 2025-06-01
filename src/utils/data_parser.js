import distanceData from "../../data/distance_based_data2.json" with { type: "json" };

export { distanceData };

// Helper functions for filtering based on the 4 points
export const getFilteredBusinesses = (filterType) => {
  switch (filterType) {
    case "rw_only":
      // Point 1: Only participating in RW weeks (all seasons)
      return distanceData.filter(business => business.category === "rw_all_seasons");
      
    case "rw_plus_neighbors_05":
      // Point 2: RW + neighbours up to 0.5 miles (red + blue)
      return distanceData.filter(business => 
        business.category === "rw_all_seasons" || 
        business.category === "rw_neighbor_0.5"
      );
      
    case "rw_plus_neighbors_10":
      // Point 3: Same as above up to 1.0 miles
      return distanceData.filter(business => 
        business.category === "rw_all_seasons" || 
        business.category === "rw_neighbor_0.5" ||
        business.category === "rw_neighbor_1.0"
      );
      
    case "all_categories":
      // Point 4: Same as above + Beyond 2.0 miles (light yellow/green)
      return distanceData.filter(business => 
        business.category === "rw_all_seasons" || 
        business.category === "rw_neighbor_0.5" ||
        business.category === "rw_neighbor_1.0" ||
        business.category === "rw_neighbor_2.0" ||
        business.category === "beyond_2.0"
      );
      
    default:
      return distanceData;
  }
};

// Get businesses by category for color coding
export const getBusinessesByCategory = (businesses) => {
  return {
    rw_restaurants: businesses.filter(b => b.category === "rw_all_seasons"),
    neighbors_05: businesses.filter(b => b.category === "rw_neighbor_0.5"),
    neighbors_10: businesses.filter(b => b.category === "rw_neighbor_1.0"),
    neighbors_20: businesses.filter(b => b.category === "rw_neighbor_2.0"),
    beyond_20: businesses.filter(b => b.category === "beyond_2.0")
  };
};