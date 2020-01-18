import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {TextInvalidH2Position} from "../../error/errorlist.js";

class H1H2 extends RuleBase {
    constructor() {
        super(['text']);

        this.h2Nodes = [];
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

        if (type === 'h1') {
            const errors = [];

            this.h2Nodes.forEach(node => {
                const error = new TextInvalidH2Position(node.location);

                errors.push(error);
            });

            if (errors.length) {
                this.h2Nodes = [];

                return errors;
            }
        }
    }
}

export default H1H2;