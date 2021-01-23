import "./style.css";
import csvData from './data.csv'
import { draw } from './functions/draw'
import parseData from './functions/parseData'
import lineData from './functions/lineData'
import initialiseOptions from './functions/setOptions'

const data = parseData(csvData)

const defaults = {
    column: "Retail and recreation",
    subRegion1: 'Greater London',
    subRegion2: 'London Borough of Barnet'
}

const chartData = lineData(data, defaults)
draw(chartData)
initialiseOptions(data, defaults)
