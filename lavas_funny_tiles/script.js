
const SVG_NS_URI = 'http://www.w3.org/2000/svg'
const baseSvg = document.getElementById("base-svg")

function compStyle(obj) {
    return Object.entries(obj).map(([k, v]) => `${k}: ${v};`).join(" ")
}

function applySvgArgs(svgObj, attrObj) {
    return Object.entries(attrObj).forEach(([k, v]) => svgObj.setAttributeNS(null, k, v))
}

let corners = []

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        corners.push([100 * i, 100 * j])
    }


    const lineHoriz = document.createElementNS(SVG_NS_URI, "line")
    const lineVert = document.createElementNS(SVG_NS_URI, "line")

    applySvgArgs(lineHoriz, {
        stroke: "gray",
        x1: 0,
        y1: 100 * i,
        x2: 300,
        y2: 100 * i
    })

    applySvgArgs(lineVert, {
        stroke: "gray",
        x1: 100 * i,
        y1: 0,
        x2: 100 * i,
        y2: 300,
    })

    // lineHoriz.setAttributeNS(null, "stroke", "gray")
    // lineVert.setAttributeNS(null, "stroke", "gray")


    // // x = (0, 0), (100, 0), (200, 0), ...
    // lineHoriz.setAttributeNS(null, "x1", 0)
    // lineHoriz.setAttributeNS(null, "y1", 100 * i)
    // // y = (0, 400), (100, 400), ...
    // lineHoriz.setAttributeNS(null, "x2", 300)
    // lineHoriz.setAttributeNS(null, "y2", 100 * i)

    // lineVert.setAttributeNS(null, "x1", 100 * i)
    // lineVert.setAttributeNS(null, "y1", 0)
    // // y = (0, 400), (100, 400), ...
    // lineVert.setAttributeNS(null, "x2", 100 * i)
    // lineVert.setAttributeNS(null, "y2", 300)


    baseSvg.appendChild(lineHoriz)
    baseSvg.appendChild(lineVert)
}

corners.forEach(([x, y]) => {
    const rect = document.createElementNS(SVG_NS_URI, "rect")
    rect.setAttributeNS

    applySvgArgs(rect, {
        "stroke-width": 1,
        stroke: "blue",
        fill: "white",
        width: 4,
        height: 4,
        x: x - 2,
        y: y - 2,
    })

    baseSvg.appendChild(rect)
})

// }
