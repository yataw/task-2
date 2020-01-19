import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {TextInvalidH2Position} from "../../error/errorlist.js";

class H1H2 extends RuleBase {
    constructor() {
        super(['text']);

        /**
         * @type {Map<BemNode, {node: BemNode, order: number}>}
         */
        this.h1ToH1ParentMap = new Map(); // {h1-node, h1-parent with order}
        /**
         * @type {Map<BemNode, Array<{node: BemNode, order: number}>>}
         */
        this.h2ParentToH2Map = new Map(); // {parent, h2-childs with order}

        /** @type {number} */
        this.order = 0;
    }

    getPhaseHandlersMap() {
        return {
            [this.phases.in]: this.in.bind(this),
            [this.phases.end]: this.end.bind(this)
        }
    }

    in(node) {
        if (this.isH1(node)) {
            this.h1ToH1ParentMap.set(node, {node: node.parent, order: this.order++});

            return;
        }

        if (this.isH2(node)) {
            const parent = node.parent;

            if (!this.h2ParentToH2Map.has(parent))
                this.h2ParentToH2Map.set(parent, []);

            const h2Nodes = this.h2ParentToH2Map.get(parent);

            h2Nodes.push({node: node, order: this.order++});
        }
    }

    end() {
        const wrongH2 = new Set();

        this.h1ToH1ParentMap.forEach(({node: parent, order: h1Order}) => {
            for (let currentParent = parent; currentParent; currentParent = currentParent.parent) {
                const h2Nodes = this.h2ParentToH2Map.get(currentParent);

                if (!h2Nodes)
                    continue;

                h2Nodes.forEach(({node: h2Node, order: h2Order}) => {
                    if (h2Order < h1Order)
                        wrongH2.add(h2Node);
                })
            }
        });

        const errors = [];

        wrongH2.forEach(node => {
            errors.push(new TextInvalidH2Position(node.position));
        });

        return errors;
    }

    isH1(node) {
        const type = get(node.mods, 'type');

        return type && type === 'h1';
    }

    isH2(node) {
        const type = get(node.mods, 'type');

        return type && type === 'h2';
    }
}

export default H1H2;