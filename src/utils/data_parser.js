// Import LA Michelin data - Cleaned (binfo.csv, new coordinates)
import michelinCleaned from "../../data/michelin_la_cleaned.json" with { type: "json" };
// Import LA Michelin data - Noise (businessInfoLA.csv, original coordinates)
import michelinNoise from "../../data/michelin_la_noise.json" with { type: "json" };

export { michelinCleaned, michelinNoise };

const datasets = {
  cleaned: {
    michelin: michelinCleaned.filter(b => b.inRW === 1),
    nonMichelin: michelinCleaned.filter(b => b.treated250 === 1),
  },
  noise: {
    michelin: michelinNoise.filter(b => b.inRW === 1),
    nonMichelin: michelinNoise.filter(b => b.treated250 === 1),
  },
};

// Get businesses by category for color coding
export const getBusinessesByCategory = (filterType) => {
  const categories = { rw_restaurants: [], neighbors: [], control: [] };

  switch (filterType) {
    case "cleaned_both":
      categories.rw_restaurants = datasets.cleaned.michelin;
      categories.neighbors = datasets.cleaned.nonMichelin;
      break;
    case "cleaned_michelin":
      categories.rw_restaurants = datasets.cleaned.michelin;
      break;
    case "cleaned_non_michelin":
      categories.neighbors = datasets.cleaned.nonMichelin;
      break;
    case "noise_both":
      categories.rw_restaurants = datasets.noise.michelin;
      categories.neighbors = datasets.noise.nonMichelin;
      break;
    case "noise_michelin":
      categories.rw_restaurants = datasets.noise.michelin;
      break;
    case "noise_non_michelin":
      categories.neighbors = datasets.noise.nonMichelin;
      break;
    default:
      categories.rw_restaurants = datasets.cleaned.michelin;
      categories.neighbors = datasets.cleaned.nonMichelin;
  }

  return categories;
};
