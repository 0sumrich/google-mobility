import { select, selectAll } from 'd3-selection'
const d3 = { select, selectAll }

function setSr1(data, defaultRegion) {
    const id = 'sub_region_1'
    d3.select(id)
        .selectAll('option')
        .data(data)
        .join('option')
        .attr('selected', d => {
            return d[id] == defaultRegion ? true : false
        })
        .attr('value', d => d[id])
        .text(d => d[id])
}

function setOptions(data, options) {
    const { subRegion1, subRegion2, column } = options
    const ids = ['sub_region_1', 'sub_region_2', 'columns']
    setSr1(data, subRegion1)
}

export default setOptions