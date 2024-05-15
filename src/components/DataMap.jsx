import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { legendState } from '../context/LegendProvider';
import { points } from '../utils/data_parser';

const DataMap = () => {
  const { period } = legendState();
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    const projection = d3.geoConicConformal()
      .rotate([77, 0])
      .center([0, 37.66])
      .parallels([38.3, 39.45])
      .scale(8000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', zoomed);

    const g = svg.append('g');

    svg.call(zoom);

    d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(data => {
      g.selectAll('path')
        .data(topojson.feature(data, data.objects.states).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#ccc')
        .attr('stroke', '#fff');

      const filteredPoints = period === "All"
        ? points.filter((point) =>
            ["2022 Summer", "2023 Winter", "2023 Summer", "2024 Winter"].some(
              (key) => point[key] === 1
            )
          )
        : points.filter((point) => point[period] === 1);

      g.selectAll('circle')
        .data(filteredPoints)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.long, d.lat])[0])
        .attr('cy', d => projection([d.long, d.lat])[1])
        .attr('r', 1)
        .attr('fill', 'red');
    });

    function zoomed(event) {
      g.selectAll('path').attr('transform', event.transform);
      g.selectAll('circle').attr('transform', event.transform);
    }
  }, [period]);

  return (
    <div>
      <svg ref={svgRef} width={800} height={600}></svg>
    </div>
  );
};

export default DataMap;