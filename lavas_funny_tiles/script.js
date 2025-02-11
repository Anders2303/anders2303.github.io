const SVG_NS_URI = "http://www.w3.org/2000/svg";

const SQUARE_STYLE = {
    "stroke-width": 2,
    stroke: "black",
    fill: "#23e471",
    width: 14,
    height: 14,
};

function generateCards(amt = 100) {
    // Clear children
    // const cardContainer = document.getElementById("card-list");
    // cardContainer.innerHTML = "";

    for (let index = 0; index < amt; index++) {
        generateCard(index);
    }
}

function generateCard(cardNumber) {
    const sneakyDownloadLink = document.getElementById(
        "sneakly-lil-download-buddy"
    );
    const cardContainer = document.getElementById("card-list");
    const wrapperDiv = document.createElement("div");
    cardContainer.appendChild(wrapperDiv);

    const svgCardRoot = document.createElementNS(SVG_NS_URI, "svg");
    applySvgArgs(svgCardRoot, {
        width: "400px",
        height: "400px",
        viewBox: "-8 -8 316 316",
    });

    const bgRect = document.createElementNS(SVG_NS_URI, "rect");
    applySvgArgs(bgRect, {
        height: 332,
        width: 332,
        x: -18,
        y: -18,
        fill: "white",
    });

    svgCardRoot.appendChild(bgRect);
    addLinesToSvg(svgCardRoot);

    const downloadButton = document.createElement("button");
    downloadButton.innerText = "Download";
    downloadButton.className = [
        "block mt-2 w-full",
        "text-center",
        "rounded",
        "bg-gray-800 hover:bg-gray-600",
        "text-white",
        "p-2",
    ].join(" ");

    downloadButton.addEventListener("click", () => {
        const cardClone = svgCardRoot.cloneNode(true);
        const lostChildren = cardClone.querySelectorAll(".--hide-on-download");

        for (const child of lostChildren) {
            child.remove();
        }

        const svgBlob = new Blob([cardClone.outerHTML], {
            type: "image/svg+xml",
        });

        sneakyDownloadLink.download = `room-tile-${cardNumber}.svg`;
        sneakyDownloadLink.href = window.URL.createObjectURL(svgBlob);

        console.log(sneakyDownloadLink);

        sneakyDownloadLink.click();
    });

    wrapperDiv.appendChild(svgCardRoot);
    wrapperDiv.appendChild(downloadButton);
}

function addLinesToSvg(svgCardRoot) {
    const squareGroup = document.createElementNS(SVG_NS_URI, "g");
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
                const rightLine = new Wall(wallGroup, "horizontal", [x, y]);
                rightLine.render();
            }
            // Downward wall
            if (i < 3) {
                const downLine = new Wall(wallGroup, "vertical", [x, y]);
                downLine.render();
            }
        }
    }

    svgCardRoot.appendChild(wallGroup);
    svgCardRoot.appendChild(squareGroup);
}

// RUNS ON MOUNT
generateCards();
