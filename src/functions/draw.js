import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'
import { extent } from 'd3-array'
import { line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
const d3 = {
    axisBottom,
    axisLeft,
    extent,
    line,
    scaleLinear,
    scaleTime,
    select
}

function draw(data) {
    const w = 950
    const h = 500
    const column = Object.keys(data[0]).filter(x => !['date', 'sub_region_1', 'sub_region_2'].includes(x))[0]
    const dates = data.map(o => o.date)
    const values = data.map(o => +o[column])
    const margin = { top: 30, right: 50, bottom: 60, left: 70 };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;
    const x = d3.scaleTime()
        .domain(d3.extent(dates))
        .range([0, width])
    const y = d3.scaleLinear()
        .domain(d3.extent(values))
        .range([height, 0]);
    const chart = d3
        .select("#chart")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        .attr('viewBox', `0 0 ${w} ${h}`)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    const line = d3
        .line()
        .x(d => x(d.date))
        .y(d => y(+d[column]));

    chart
        .append("path")
        .datum(data)
        .attr("stroke", "#0d47a1")
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .attr("d", line);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    chart
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chart
        .append("g")
        .attr("class", "y axis")
        .call(yAxis);
}

function clear(id) {
    d3
        .select("#"+id)
        .selectAll("*")
        .remove();
}

function redraw(data) {
    clear('chart')
    draw(data)
}

export { draw, clear, redraw }