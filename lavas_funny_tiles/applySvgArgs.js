function applySvgArgs(svgObj, attrObj) {
    return Object.entries(attrObj).forEach(([k, v]) => {
        if (v == null) svgObj.removeAttributeNS(null, k);
        else svgObj.setAttributeNS(null, k, v);
    });
}
