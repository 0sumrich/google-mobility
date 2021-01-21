export default function lineData(data, options) {
    const { subRegion1, subRegion2, column } = options;
    const columns = ['date', 'sub_region_1', 'sub_region_2', column]
    const d = data
    .filter(o => o.sub_region_1 == subRegion1 && o.sub_region_2 == subRegion2)
    .map(o => {
        const row = {}
        for(const k of Object.keys(o)){
            if (columns.includes(k)){
                row[k] = o[k]
            }
        }
        return row
    })
    return d;
}
