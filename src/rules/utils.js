
const sizesScale = ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];

class Size {
    /**
     * @param {string} size
     */
    constructor(size) {
        this.size = size;
    }

    /**
     * @param {number} count
     * @return {Size}
     */
    add(count) {
        let ind = sizesScale.indexOf(this.size);

        if (~ind)
            ind = ind + count;

        this.size = sizesScale[ind];

        return this;
    }

    check(sizeB) {
        return !!(this.size && sizeB) && this.size === size;
    }
}


function isDef(x) {
    return x !== undefined;
}


function get(obj, ...props) {
    if (!obj || typeof obj !== 'object') // функции не предполагаются
        return undefined;

    let current = obj;

    for (let prop of props) {
        current = current[prop];

        if (!isDef(prop))
            return undefined;
    }

    return current;
}


export {
    Size,
    get
}