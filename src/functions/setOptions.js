import { select, selectAll } from 'd3-selection'
const d3 = { select, selectAll }

function setSr1(data, defaultRegion) {
    const id = 'sub_region_1'
    const d = [...new Set(data.map(o => o[id]))].sort()

    d3.select(`#${id}`)
        .select('select')
        .selectAll('option')
        .data(d)
        .join('option')
        .property('selected', d=>d==defaultRegion)
        .attr('value', d => d)
        .text(d => d)

}

function setOptions(data, options) {
    const { subRegion1, subRegion2, column } = options
    const ids = ['sub_region_1', 'sub_region_2', 'columns']
    setSr1(data, subRegion1)
}

export default setOptions