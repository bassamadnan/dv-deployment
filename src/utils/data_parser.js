// Import the three new data files
import matchedBusinessFinal from "../../data/matched_business_final.json" with { type: "json" };
import matchedZipFinal from "../../data/matched_zip_final.json" with { type: "json" };
import unmatchedFinal from "../../data/unmatched_final.json" with { type: "json" };

// Import RW data from old files
import rwNeighbors from "../../data/rw_neighbors.json" with { type: "json" };

export {
  matchedBusinessFinal,
  matchedZipFinal,
  unmatchedFinal,
  rwNeighbors
};

// Get businesses by category for color coding
export const getBusinessesByCategory = (filterType) => {
  const categories = {
    rw_restaurants: [],
    neighbors: [],
    control: []
  };

  switch (filterType) {
    case "matched_business_final":
      // Matched Business Final - Neighbors (blue) + Control (green)
      categories.neighbors = matchedBusinessFinal.filter(b => b.treated250 === 1);
      categories.control = matchedBusinessFinal.filter(b => b.control === 1);
      break;

    case "matched_zip_final":
      // Matched Zip Final - Neighbors (blue) + Control (green)
      categories.neighbors = matchedZipFinal.filter(b => b.treated250 === 1);
      categories.control = matchedZipFinal.filter(b => b.control === 1);
      break;

    case "unmatched_final":
      // Unmatched Final - Neighbors (blue) + Control (green)
      categories.neighbors = unmatchedFinal.filter(b => b.treated250 === 1);
      categories.control = unmatchedFinal.filter(b => b.control === 1);
      break;

    default:
      // Default: Matched Business Final
      categories.neighbors = matchedBusinessFinal.filter(b => b.treated250 === 1);
      categories.control = matchedBusinessFinal.filter(b => b.control === 1);
  }

  return categories;
};

// Get RW businesses separately
export const getRWBusinesses = () => {
  return rwNeighbors.filter(b => b.inRW === 1);
};