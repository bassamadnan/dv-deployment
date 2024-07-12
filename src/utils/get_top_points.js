import { non_rw_points } from "./data_parser";


function filterPointsByRank(maxRank) {
    return non_rw_points.filter(point => point.min_idx <= maxRank);
}

export {filterPointsByRank}