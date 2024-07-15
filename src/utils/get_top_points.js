import { non_rw_points } from "./data_parser";


function filterPointsByRank(rangeValues) {
    return non_rw_points.filter(point =>(point.min_idx <= rangeValues[1] && point.min_idx >= rangeValues[0]));
}

export {filterPointsByRank}