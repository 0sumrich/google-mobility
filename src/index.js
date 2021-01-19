import csvData from './data.csv'
import Chart from 'chart.js';
const headers = csvData[0]
const data = csvData.slice(1).map(arr => {
    const o = {}
    arr.forEach((val, i) => {
        o[headers[i]] = val
    })
    return o
})
const subRegion1 = [...new Set(data.map(o => o.sub_region_1))]
const subRegion2 = [...new Set(data.map(o => o.sub_region_2))]
const subRegion1default = 'Greater London'
const subRegion2default = 'London Borough of Barnet'
const columns = [
    "retail_and_recreation_percent_change_from_baseline",
    "grocery_and_pharmacy_percent_change_from_baseline",
    "parks_percent_change_from_baseline",
    "transit_stations_percent_change_from_baseline",
    "workplaces_percent_change_from_baseline",
    "residential_percent_change_from_baseline"
]
const ctx = document.getElementById('chart')
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
