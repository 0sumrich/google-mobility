import { DateTime } from 'luxon'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select, pointers } from 'd3-selection'
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
    select,
    pointers
}

const columns = ["Retail and recreation",
    "Grocery and pharmacy",
    "Parks",
    "Transit stations",
    "Workplaces",
    "Residential"]
const colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#a65628']
const getColor = col => colors[columns.indexOf(col)]
const formatDate = d => DateTime.fromJSDate(d).setLocale('en-GB').toLocaleString()
const formatPercent = n => `${n.toFixed(2)}%`;

function draw(data) {
    const div = d3.select(".tooltip")
    const w = 950
    const h = 500
    const column = Object.keys(data[0]).filter(x => !['date', 'sub_region_1', 'sub_region_2'].includes(x))[0]
    const lineColor = getColor(column)
    const dates = data.map(o => o.date)
    const values = data.map(o => +o[column])
    const margin = { top: 50, right: 50, bottom: 50, left: 70 };
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
        .attr("stroke", lineColor)
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .attr("d", line)
        .on('mouseover', (e, d) => {
            const [xPos, yPos] = d3.pointers(e)[0]
            const date = x.invert(xPos)
            const yVal = y.invert(yPos)
            const htmlString = formatDate(date) + "<br/>" +formatPercent(yVal)
            div
                .style("opacity", .9)
                .html(htmlString)
                .style("left", `${e.pageX}px`)
                .style("top", `${e.pageY - 15}px`);
        })
        .on('mouseout', () => div.style('opacity', 0));

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


    chart
        .append("text")
        .attr("class", "legend")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 0.75 * margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Percent change from baseline");
}

function clear(id) {
    d3
        .select("#" + id)
        .selectAll("*")
        .remove();
}

function redraw(data) {
    clear('chart')
    draw(data)
}

export { draw, clear, redraw }