class Wall {
    direction = "horizontal"; /* or "vertical" */
    position = [-1, -1];

    variants = ["open", "solid", "oneway_1", "oneway_2"];
    iCurrentVariant = 0;

    parent = null;
    clickZone = null;
    el = null;
    triangle = null;

    constructor(parent, direction, position) {
        this.parent = parent;
        this.direction = direction;
        this.position = position;

        this.iCurrentVariant = Math.random() < 0.25 ? 0 : 1;
    }

    #currentVariant() {
        return this.variants[this.iCurrentVariant];
    }

    #getLinePadding() {
        if (this.#currentVariant() === "open") return 4;
        if (this.#currentVariant() === "solid") return 4;
        if (this.#currentVariant() === "oneway_1") return 8;
        if (this.#currentVariant() === "oneway_2") return 8;

        return 0;
    }

    #getPositionAttrs() {
        const [x, y] = this.position;
        const padding = this.#getLinePadding();

        if (this.direction === "horizontal") {
            return {
                x1: x + padding,
                y1: y,
                x2: x + 100 - padding,
                y2: y,
            };
        } else {
            return {
                x1: x,
                y1: y + padding,
                x2: x,
                y2: y + 100 - padding,
            };
        }
    }

    #getStyleAttrs() {
        switch (this.#currentVariant()) {
            case "open":
                return {
                    stroke: "gray",
                    "stroke-width": 1,
                    "stroke-dasharray": undefined,
                };
            case "solid":
                return {
                    stroke: "#1a8e28",
                    "stroke-width": 8,
                    "stroke-dasharray": undefined,
                };
            case "oneway_1":
                return {
                    stroke: "red",
                    "stroke-width": 8,
                    "stroke-dasharray": "8,3",
                };
            case "oneway_2":
                return {
                    stroke: "blue",
                    "stroke-width": 8,
                    "stroke-dasharray": "8,3",
                };

            default:
                console.warn(this.#currentVariant());
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
            this.el = document.createElementNS(SVG_NS_URI, "line");
            this.parent.appendChild(this.el);

            this.#initClickZone();
        }

        applySvgArgs(this.el, this.#getStyleAttrs());
        applySvgArgs(this.el, this.#getPositionAttrs());
    }
}
