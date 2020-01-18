
class Block {
    /**
     * @param block
     * @param elem
     * @param mods
     * @param mix
     * @param children
     * @param {{start: {col: number, line: number}, end: {col: number, line: number}}} location
     */
    constructor({block = '', elem = '', mods = [], mix = [], children = [], location = {}}) {
        this.block = block;
        this.elem = elem;
        this.mods = mods;
        this.mix = mix;

        this.children = children;
        this.location = location;

        this.selector = block + (elem ? (`__${elem}`) : '');
    }
}

export default Block;