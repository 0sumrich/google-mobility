const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const fixHeader = (s) => {
    const search = '_percent'
    return s.includes(search) ?
        capitalize(s.slice(0, s.indexOf(search))).replaceAll('_', ' ') :
        s
}

const fixHeaders = arr => {
    const search = '_percent'
    return arr.map(fixHeader)
}

export default function parseData(data) {
    const headers = fixHeaders(data[0]);
    const columns = [
        "sub_region_1",
        'sub_region_2',
        'date',
        "Retail and recreation",
        "Grocery and pharmacy",
        "Parks",
        "Transit stations",
        "Workplaces",
        "Residential"
    ];
    return data.slice(1).map(arr => {
        const o = {};
        arr.forEach((val, i) => {
            const k = headers[i];
            if (columns.includes(k)) {
                k === 'date' ? o[k] = new Date(val) : o[k] = val;
            }
        });
        return o;
    });
}
