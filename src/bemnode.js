import PROPS from './propnames.js';
import JsonSourceMap from './jsonsourcemap.js';

const {BLOCK, ELEM, CONTENT, MODS, MIX, ELEMMODS} = PROPS;
const locationKey = JsonSourceMap.key;

class BemNode {
    /**
     * @param {Object} node
     */
    constructor(node) {
        this.block = node[BLOCK];
        this.elem = node[ELEM];
        this.mods = node[MODS];
        this.mix = node[MIX];
        this.elemMods = node[ELEMMODS]

        this.location = node[locationKey];

        this.selector = this.block + (this.elem ? (`__${this.elem}`) : '');
    }
}

export default BemNode;