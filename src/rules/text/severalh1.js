import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {TextSeveralH1} from "../../error/errorlist.js";


class SeveralH1 extends RuleBase {
    constructor() {
        super(['text']);

        this.h1was = false;
    }

    getPhaseHandlersMap() {
        return {
            [this.phases.in]: this.in.bind(this)
        }
    }

    in(node) {
        const type = get(node.mods, 'type');

        if (type !== 'h1')
            return;

        if (!this.h1was) {
            this.h1was = true;

            return;
        }

        return new TextSeveralH1(node.location);
    }
}

export default SeveralH1;