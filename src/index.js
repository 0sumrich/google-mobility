import "./style.css";
import M from 'materialize-css'
import csvData from './data.csv'
import draw from './functions/draw'
import parseData from './functions/parseData'
import lineData from './functions/lineData'
import setOptions from './functions/setOptions'

const data = parseData(csvData)
const subRegion1 = [...new Set(data.map(o => o.sub_region_1))]
const subRegion2 = [...new Set(data.map(o => o.sub_region_2))]

const defaults = {
    column: "retail_and_recreation_percent_change_from_baseline",
    subRegion1: 'Greater London',
    subRegion2: 'London Borough of Barnet'
}

const chartData = lineData(data, defaults)
setOptions(data, defaults)
draw(chartData)

document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems, {});
});
