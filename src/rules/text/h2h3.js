import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {TextInvalidH3Position} from "../../error/errorlist.js";


// TODO Считаем, что H2 единственный (хотя в общем случае это не так). Иначе такая же проблема, что и в buttonposition.js
// Поэтому просто копипастим тест h1h2
class H2H3 extends RuleBase {
    constructor() {
        super(['text']);

        this.h3Nodes = [];
        this.h2was = false;
    }

    getPhaseHandlersMap() {
        return {
            [this.phases.in]: this.in.bind(this)
        }
    }

    in(node) {
        const type = get(node.mods, 'type');

        if (!type)
            return;

        if (type === 'h3') {
            this.h3Nodes.push(node);

            return;
        }

        // TODO Продолжаем анализировать только до первого h2
        if (type === 'h2' && !this.h2was) {
            this.h2was = true;

            const errors = [];

            this.h3Nodes.forEach(node => {
                const error = new TextInvalidH3Position(node.location);

                errors.push(error);
            });

            if (errors.length)
                return errors;
        }
    }
}

export default H2H3;