import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {TextInvalidH2Position} from "../../error/errorlist.js";

class H1H2 extends RuleBase {
    constructor() {
        super(['text']);

        this.h2Nodes = [];
        this.h1was = false;
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

        if (type === 'h2') {
            this.h2Nodes.push(node);

            return;
        }

        // TODO Продолжаем анализировать только до первого h1
        if (type === 'h1' && !this.h1was) {
            this.h1was = true;

            const errors = [];

            this.h2Nodes.forEach(node => {
                const error = new TextInvalidH2Position(node.location);

                errors.push(error);
            });

            if (errors.length)
                return errors;
        }
    }
}

export default H1H2;