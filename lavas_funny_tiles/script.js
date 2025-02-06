const SVG_NS_URI = "http://www.w3.org/2000/svg";

const GRID_STYLE = {
    stroke: "gray",
    "stroke-width": 1,
};

const WALL_STYLE = {
    stroke: "#1a8e28",
    "stroke-width": 8,
};

const SQUARE_STYLE = {
    "stroke-width": 2,
    stroke: "black",
    fill: "#23e471",
    width: 6,
    height: 6,
};

function compStyle(obj) {
    return Object.entries(obj)
        .map(([k, v]) => `${k}: ${v};`)
        .join(" ");
}

function applySvgArgs(svgObj, attrObj) {
    return Object.entries(attrObj).forEach(([k, v]) =>
        svgObj.setAttributeNS(null, k, v)
    );
}

// let cordinates = []

// RUNS ON MOUNT
generateCards();

function generateCards(amt = 100) {
    // Clear children
    // myNode.innerHTML = ''

    for (let index = 0; index < amt; index++) {
        generateCard(index);
    }
}

function generateCard(cardNumber) {
    const cardContainer = document.getElementById("card-container");

    const downloadLink = document.createElement("a");

    const svgCardRoot = document.createElementNS(SVG_NS_URI, "svg");
    applySvgArgs(svgCardRoot, {
        class: "bg-white",
        width: "400px",
        height: "400px",
        viewBox: "-10 -10 320 320",
    });

    addLinesToSvg(svgCardRoot);

    const svgBlob = new Blob([svgCardRoot.outerHTML], {
        type: "image/svg+xml",
    });
    downloadLink.download = `room-tile-${cardNumber}.svg`;
    downloadLink.href = window.URL.createObjectURL(svgBlob);

    downloadLink.appendChild(svgCardRoot);
    cardContainer.appendChild(downloadLink);
}

function addLinesToSvg(svgCardRoot) {
    const squareGroup = document.createElementNS(SVG_NS_URI, "g");
    const gridGroup = document.createElementNS(SVG_NS_URI, "g");
    const wallGroup = document.createElementNS(SVG_NS_URI, "g");

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const rect = document.createElementNS(SVG_NS_URI, "rect");

            const x = 100 * j;
            const y = 100 * i;

            applySvgArgs(rect, {
                ...SQUARE_STYLE,
                x: x - SQUARE_STYLE.width / 2,
                y: y - SQUARE_STYLE.width / 2,
            });
            squareGroup.appendChild(rect);

            // Right wall
            if (j % 4 !== 3) {
                const rightLine = document.createElementNS(SVG_NS_URI, "line");
                const isWall = Math.random() < 0.25;

                applySvgArgs(rightLine, {
                    ...(isWall ? WALL_STYLE : GRID_STYLE),
                    x1: x,
                    y1: y,
                    x2: x + 100,
                    y2: y,
                });
                (isWall ? wallGroup : gridGroup).appendChild(rightLine);
            }
            // Downward wall
            if (i < 3) {
                const downLine = document.createElementNS(SVG_NS_URI, "line");
                const isWall = Math.random() < 0.75;
                applySvgArgs(downLine, {
                    ...(isWall ? WALL_STYLE : GRID_STYLE),
                    x1: x,
                    y1: y,
                    x2: x,
                    y2: y + 100,
                });
                (isWall ? wallGroup : gridGroup).appendChild(downLine);
            }
        }
    }

    svgCardRoot.appendChild(gridGroup);
    svgCardRoot.appendChild(wallGroup);
    svgCardRoot.appendChild(squareGroup);
}
