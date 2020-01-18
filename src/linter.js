import PROPS from "./propnames.js";
import JsonSourceMap from './jsonsourcemap.js';
import BemNode from './bemnode.js';
import RuleMediator from './rules/rulemediator.js';
import RuleBase from "./rules/rulebase.js";

const {CONTENT} = PROPS;
const phases = RuleBase.prototype.phases;

class Linter {
    /**
     * @param {Array<!RuleBase>} ruleClasses
     */
    constructor(ruleClasses = []) {
        this.ruleClasses = ruleClasses;

        this.mediator = null;
        this.errors = [];
    }

    /**
     * @param {string} str
     */
    lint(str) {
        this.init();

        const stringTree = this.attachRoot(str);
        const mapper = new JsonSourceMap(stringTree);
        const root = mapper.getJson(stringTree);

        this.next(root);
        this.callAll(phases.end);

        // TODO filter errors
        return this.errors;
    }

    init() {
        const rulesInstances = this.ruleClasses.map(rClass => new rClass());

        this.mediator = new RuleMediator(rulesInstances);
        this.errors = [];
    }

    /* Вход может быть объектом или массивом (дерево или лес). Добавим виртуальный корень, всегда было дерево. */
    attachRoot = str => `{"${CONTENT}":\n${str}\n}`;

    /**
     * @param {Object} node
     */
    next = (node) => {
        const bemNode = new BemNode(node);
        const children = this.contentAsArray(node[CONTENT]);

        this.call(phases.in, bemNode);

        children.map((child) => {
            this.next(child);
        });

        this.call(phases.out, bemNode);
    };

    call(phase, bemNode) {
        const errors = this.mediator.call(phase, bemNode);

        this.addErrors(errors);
    }

    callAll(phase) {
        const errors = this.mediator.callAll(phase);

        this.addErrors(errors);
    }

    addErrors(errors) {
        this.errors = [...errors, ...this.errors];
    }

    contentAsArray(el) {
        if (Array.isArray(el))
            return el;

        return el ? [el] : [];
    }
}

export default Linter;