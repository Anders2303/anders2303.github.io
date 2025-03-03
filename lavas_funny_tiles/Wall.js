const SOLID_STROKE_WIDTH = 16;

const symbolAttrsMap = {
    openWall: { "stroke-width": 1, stroke: "gray" },
    solidWall: { "stroke-width": SOLID_STROKE_WIDTH, stroke: "#1a8e28" },
    oneWayWall1: {
        stroke: "red",
        "stroke-width": SOLID_STROKE_WIDTH,
        "stroke-dasharray": "8,3",
    },
    oneWayWall2: {
        stroke: "blue",
        "stroke-width": SOLID_STROKE_WIDTH,
        "stroke-dasharray": "8,3",
    },
};

class Wall {
    direction = "horizontal"; /* or "vertical" */
    position = [-1, -1];

    variants = Object.keys(symbolAttrsMap);
    iCurrentVariant = 0;

    parent = null;
    clickZone = null;
    el = null;
    triangle = null;

    constructor(parent, direction, position) {
        this.parent = parent;
        this.direction = direction;
        this.position = position;

        this.iCurrentVariant = Math.random() < 0.4 ? 1 : 0;
    }

    static attachSymbols(svgParent) {
        Object.entries(symbolAttrsMap).forEach(([id, variantStyle]) => {
            const symbol = document.createElementNS(SVG_NS_URI, "symbol");
            const line = document.createElementNS(SVG_NS_URI, "line");
            symbol.appendChild(line);
            svgParent.appendChild(symbol);

            applySvgArgs(symbol, {
                id: id,
                width: "100",
                height: SOLID_STROKE_WIDTH,
                viewBox: `0 0 100 ${SOLID_STROKE_WIDTH}`,
            });

            applySvgArgs(line, {
                x1: 0,
                y1: SOLID_STROKE_WIDTH / 2,
                x2: 100,
                y2: SOLID_STROKE_WIDTH / 2,
                ...variantStyle,
            });
        });
    }

    #currentVariant() {
        return this.variants[this.iCurrentVariant];
    }

    #getPositionAttrs() {
        const [x, y] = this.position;

        if (this.direction === "horizontal") {
            return {
                x1: x,
                y1: y,
                x2: x + 100,
                y2: y,
            };
        } else {
            return {
                x1: x,
                y1: y,
                x2: x,
                y2: y + 100,
            };
        }
    }

    #directionArgs() {
        if (this.direction !== "horizontal") {
            return {
                transform: `rotate(
                    90,
                    ${this.position[0]},
                    ${this.position[1]}
                )`,
            };
        } else {
            return {};
        }
    }

    #toggleVariant(dir, evt) {
        evt.preventDefault();

        this.iCurrentVariant += dir;
        if (this.iCurrentVariant < 0) {
            this.iCurrentVariant = this.variants.length - 1;
        } else if (this.iCurrentVariant >= this.variants.length) {
            this.iCurrentVariant = 0;
        }

        this.render();
    }

    #initClickZone() {
        this.clickZone = document.createElementNS(SVG_NS_URI, "line");
        this.parent.appendChild(this.clickZone);

        applySvgArgs(this.clickZone, this.#getPositionAttrs());
        applySvgArgs(this.clickZone, {
            "stroke-width": 36,
            class: "--hide-on-download stroke-white opacity-0",
        });

        this.clickZone.addEventListener(
            "click",
            this.#toggleVariant.bind(this, 1)
        );
        this.clickZone.addEventListener(
            "contextmenu",
            this.#toggleVariant.bind(this, -1)
        );
    }

    render() {
        if (!this.el) {
            this.el = document.createElementNS(SVG_NS_URI, "use");
            this.parent.appendChild(this.el);

            this.#initClickZone();
        }

        applySvgArgs(this.el, {
            href: `#${this.#currentVariant()}`,
            x: this.position[0],
            y: this.position[1] - 8,
            ...this.#directionArgs(),
        });
    }
}
