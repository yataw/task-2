import PROPS from "./props";
import JsonSourceMap from './jsonsourcemap.js';
import Block from './block.js';


const {CONTENT} = PROPS;
const key = JsonSourceMap.key;

class Tree {
    constructor(str) {
        const stringTree = this.attachRoot(str);
        const mapper = new JsonSourceMap(stringTree);
        const json = mapper.getJson(stringTree);

        this.root = this.buildBlock(json);
    }

    /* Вход может быть объектом или массивом (дерево или лес). Добавим виртуальный корень, всегда было дерево. */
    attachRoot = str => `{"${CONTENT}":\n${str}\n}`;

    getRoot = () => this.root;

    buildBlock = (node) => {
        const content = this.contentAsArray(node[CONTENT]);
        const children = content.map((el, pos) => {
            return this.buildBlock(el);
        });
        const {start, end} = node[key];

        return new Block({
            block: node[PROPS.BLOCK],
            elem: node[PROPS.ELEM],
            mods: node[PROPS.MODS],
            mix: node[PROPS.MIX],

            location: {start, end},
            children
        });
    };

    contentAsArray(el) {
        if (Array.isArray(el))
            return el;

        return el ? [el] : [];
    }

}

export default Tree;