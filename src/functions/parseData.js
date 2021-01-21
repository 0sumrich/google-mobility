export default function parseData(data) {
    const headers = data[0];
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
