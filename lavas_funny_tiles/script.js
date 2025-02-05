
const SVG_NS_URI = 'http://www.w3.org/2000/svg'
const baseSvg = document.getElementById("base-svg")

function compStyle(obj) {
    return Object.entries(obj).map(([k, v]) => `${k}: ${v};`).join(" ")
}

function applySvgArgs(svgObj, attrObj) {
    return Object.entries(attrObj).forEach(([k, v]) => svgObj.setAttributeNS(null, k, v))
}

let cordinates = []

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        cordinates.push([i, j])
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

cordinates.forEach(([i, j]) => {
    const rect = document.createElementNS(SVG_NS_URI, "rect")
    rect.setAttributeNS

    applySvgArgs(rect, {
        "stroke-width": 1,
        stroke: "blue",
        fill: "white",
        width: 4,
        height: 4,
        x: 100 * i - 2,
        y: 100 * j - 2,
    })

    baseSvg.appendChild(rect)
})

const randomCordIndex = Math.floor(Math.random() * cordinates.length)
// Stupid way to do this:
const neighbours = []

if (randomCordIndex > 3) {
    neighbours.push(randomCordIndex - 4)
}

if (randomCordIndex < 12) {
    neighbours.push(randomCordIndex + 4)
}

if (randomCordIndex % 4 !== 0) {
    neighbours.push(randomCordIndex - 1)
}

if (randomCordIndex % 4 !== 3) {
    neighbours.push(randomCordIndex + 1)
}

const pointCircle = document.createElementNS(SVG_NS_URI, "circle")
applySvgArgs(pointCircle, {
    cx: cordinates[randomCordIndex][0] * 100,
    cy: cordinates[randomCordIndex][1] * 100,
    r: 8,
    stroke: "red"
})

neighbours.forEach(i => {
    const neighbourCircle = document.createElementNS(SVG_NS_URI, "circle")
    applySvgArgs(neighbourCircle, {
        cx: cordinates[i][0] * 100,
        cy: cordinates[i][1] * 100,
        r: 4,
        stroke: "blue"
    })
    baseSvg.appendChild(neighbourCircle)

})

baseSvg.appendChild(pointCircle)

// }
