// Import the new generated data files
import rwNeighbors from "../../data/rw_neighbors.json" with { type: "json" };
import rwNeighborsControl from "../../data/rw_neighbors_control.json" with { type: "json" };
import neighborsControl from "../../data/neighbors_control.json" with { type: "json" };
import matchedNeighborsControl from "../../data/matched_neighbors_control.json" with { type: "json" };

// Import the three new data files
import matchedBusinessFinal from "../../data/matched_business_final.json" with { type: "json" };
import matchedZipFinal from "../../data/matched_zip_final.json" with { type: "json" };
import unmatchedFinal from "../../data/unmatched_final.json" with { type: "json" };

export {
  rwNeighbors,
  rwNeighborsControl,
  neighborsControl,
  matchedNeighborsControl,
  matchedBusinessFinal,
  matchedZipFinal,
  unmatchedFinal
};

// Get businesses by category for color coding
export const getBusinessesByCategory = (filterType) => {
  const categories = {
    rw_restaurants: [],
    neighbors: [],
    control: []
  };

  switch (filterType) {
    case "rw_neighbors":
      // Option 1a: RW (red) + Neighbors (blue)
      categories.rw_restaurants = rwNeighbors.filter(b => b.inRW === 1);
      categories.neighbors = rwNeighbors.filter(b => b.treated250 === 1);
      break;

    case "rw_neighbors_control":
      // Option 1b: RW (red) + Neighbors (blue) + Control (green)
      categories.rw_restaurants = rwNeighborsControl.filter(b => b.inRW === 1);
      categories.neighbors = rwNeighborsControl.filter(b => b.treated250 === 1);
      categories.control = rwNeighborsControl.filter(b => b.control === 1);
      break;

    case "neighbors_control":
      // Option 2: Neighbors (blue) + Control (green)
      categories.neighbors = neighborsControl.filter(b => b.treated250 === 1);
      categories.control = neighborsControl.filter(b => b.control === 1);
      break;

    case "matched_neighbors_control":
      // Option 3: Matched Neighbors (blue) + Matched Control (green)
      categories.neighbors = matchedNeighborsControl.filter(b => b.treated250 === 1);
      categories.control = matchedNeighborsControl.filter(b => b.control === 1);
      break;

    case "matched_business_final":
      // Option 4: Matched Business Final - Neighbors (blue) + Control (green)
      categories.neighbors = matchedBusinessFinal.filter(b => b.treated250 === 1);
      categories.control = matchedBusinessFinal.filter(b => b.control === 1);
      break;

    case "matched_zip_final":
      // Option 5: Matched Zip Final - Neighbors (blue) + Control (green)
      categories.neighbors = matchedZipFinal.filter(b => b.treated250 === 1);
      categories.control = matchedZipFinal.filter(b => b.control === 1);
      break;

    case "unmatched_final":
      // Option 6: Unmatched Final - Neighbors (blue) + Control (green)
      categories.neighbors = unmatchedFinal.filter(b => b.treated250 === 1);
      categories.control = unmatchedFinal.filter(b => b.control === 1);
      break;

    default:
      // Default: show RW + Neighbors
      categories.rw_restaurants = rwNeighbors.filter(b => b.inRW === 1);
      categories.neighbors = rwNeighbors.filter(b => b.treated250 === 1);
  }

  return categories;
};