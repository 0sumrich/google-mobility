import M from 'materialize-css'
import { select, selectAll } from 'd3-selection'
import { clear, redraw } from './draw'
import lineData from './lineData'
const d3 = { select, selectAll }

const uniqueRegions = (data, id) => [...new Set(data.map(o => o[id]))].sort()
const columnNames = o => Object.keys(o).filter(k => !['date', 'sub_region_1', 'sub_region_2'].includes(k))
const [subRegion1Id, subRegion2Id, columnId] = ['sub_region_1', 'sub_region_2', 'column']
const selector = id => `#${id} select`

// function to get the region2 options based on region1 value
const subRegion2UniqueRegions = (data, sr1) => uniqueRegions(
    data.filter(o => o[subRegion1Id] == sr1),
    subRegion2Id
)

function setOptions(arr, selected, id) {

    d3.select(selector(id))
        .selectAll('option')
        .data(arr)
        .join('option')
        .property('selected', d => d == selected)
        .attr('value', d => d)
        .text(d => d)

    M.FormSelect.init(d3.select(selector(id)).node(), {});
}

function addEventListeners(data) {
    // subRegion1 change
    d3.select(selector(subRegion1Id))
        .on('change', e => {
            const subRegion1 = e.target.value
            const column = d3.select(selector(columnId)).property('value')
            // set option two options
            const sr2Options = subRegion2UniqueRegions(data, subRegion1)
            const subRegion2 = sr2Options[0]
            setOptions(sr2Options, subRegion2, subRegion2Id)
            // redraw
            redraw(lineData(data, { subRegion1, subRegion2, column }))
        })
}

function initialiseOptions(data, options) {
    const { subRegion1, subRegion2, column } = options
    // set sub region 1 options
    setOptions(uniqueRegions(data, subRegion1Id), subRegion1, subRegion1Id)
    // set sub region 2 option
    setOptions(
        subRegion2UniqueRegions(data, subRegion1),
        subRegion2,
        subRegion2Id
    )
    // set columns
    setOptions(columnNames(data[0]), column, columnId)
    // add event listeners
    addEventListeners(data)
}

export default initialiseOptions