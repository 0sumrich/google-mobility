import csvData from './data.csv'

const headers = csvData[0]
const columns = [
    "sub_region_1",
    'sub_region_2',
    'date',
    "retail_and_recreation_percent_change_from_baseline",
    "grocery_and_pharmacy_percent_change_from_baseline",
    "parks_percent_change_from_baseline",
    "transit_stations_percent_change_from_baseline",
    "workplaces_percent_change_from_baseline",
    "residential_percent_change_from_baseline"
]
const data = csvData.slice(1).map(arr => {
    const o = {}
    arr.forEach((val, i) => {
        const k = headers[i]
        if (columns.includes(k)) {
            k === 'date' ? o[k] = new Date(val) : o[k] = val
        }
    })
    return o
})
const subRegion1 = [...new Set(data.map(o => o.sub_region_1))]
const subRegion2 = [...new Set(data.map(o => o.sub_region_2))]

const defaults = {
    column: "retail_and_recreation_percent_change_from_baseline",
    subRegion1: 'Greater London',
    subRegion2: 'London Borough of Barnet'
}

function lineData(data, options) {
    const { subRegion1, subRegion2, column } = options
    const d = data.filter(o => o.sub_region_1 == subRegion1 && o.sub_region_2 == subRegion2).map(o => ({x: o.date, y:+o[column]}))
    return d
}

// change of plan
// redo with d3
