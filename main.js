function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function elementsReady(selector) {
    return new Promise((resolve, reject) => {
        const els = document.querySelectorAll(selector)
        const check = Array.from(els)
        if (check.length === 3) { resolve(els); }
        new MutationObserver((mutationRecords, observer) => {
            // Query for elements matching the specified selector
            Array.from(document.querySelectorAll(selector)).forEach((element) => {
                resolve(element);
                //Once we have resolved we don't need the observer anymore.
                observer.disconnect();
            });
        })
            .observe(document.documentElement, {
                childList: true,
                subtree: true
            });
    });
}

function csvParse(str) {
    const arr = str.split('\n')
    const headers = arr[0]
    const data = arr.slice(1).map(x => x.split(',').map((y, i) => (
        { [headers[i]] : y }
    )
    ))
    return data 
}

document.addEventListener('DOMContentLoaded', async event => {
    //the event occurred
    const csvString = await fetch('2020_GB_Region_Mobility_Report.csv').then(t => t.text())
    // const data = await d3.csvParse(csvString)
    const widgSelector = '.widget-dropdown'
    await elementsReady(widgSelector)
    const widgets = Array.from(document.querySelectorAll(widgSelector))
    const tester = widgets[0].children[1]
    const handleChange = e => console.log(e.target.value)
    tester.onchange = handleChange
})