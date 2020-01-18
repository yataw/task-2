import PROPS from "./propnames.js";
import JsonSourceMap from './jsonsourcemap.js';
import BemNode from './bemnode.js';
import {nullFunction} from './rules/rulebase.js';

const {CONTENT} = PROPS;
const key = JsonSourceMap.key;

class Linter {
    /**
     * @param {Array<!RuleBase>} rules
     */
    constructor(rules = []) {
        this.rules = rules;
        this.errors = [];


        this.fillHandlers();
    }

    fillHandlers() {
        this.rules.forEach(rule => {
            const selectors = rule.getFilter();

            const inHandler = rule.in !== nullFunction ? rule.in.bind(rule) : null;
            const outHandler = rule.out !== nullFunction ? rule.out.bind(rule) : null;
            const endHandler = rule.end !== nullFunction ? rule.end.bind(rule) : null;

            const handlers = [inHandler, outHandler, endHandler];
            const maps = [this.handlersMap.in, this.handlersMap.out, this.handlersMap.end];

            selectors.forEach(selector => {
                handlers.forEach((handler, ind) => {

                    maps[ind][selector]
                })
            })
        })
    }

    /**
     * @param {string} str
     */
    lint(str) {
        const stringTree = this.attachRoot(str);
        const mapper = new JsonSourceMap(stringTree);
        const root = mapper.getJson(stringTree);

        this.next(root);
    }

    /* Вход может быть объектом или массивом (дерево или лес). Добавим виртуальный корень, всегда было дерево. */
    attachRoot = str => `{"${CONTENT}":\n${str}\n}`;

    /**
     * @param {Object} node
     */
    next = (node) => {
        const bemNode = new BemNode(node);
        const children = this.contentAsArray(node[CONTENT]);

        // this.call(bemNode, this.handlers.in);

        children.map((child) => {
            this.next(child);
        });

        this.out(bemNode);
    };

    in(bemNode) {
        this.rules.forEach(rule => {
            rule.in(bemNode);
        })
    }

    out(bemNode) {
        this.rules.forEach(rule => {
            rule.in(bemNode);
        })
    }

    contentAsArray(el) {
        if (Array.isArray(el))
            return el;

        return el ? [el] : [];
    }
}

export default Linter;