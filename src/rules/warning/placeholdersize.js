import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {WarningInvalidPlaceholderSize} from "../../error/errorlist.js";

const correctSizes = ['s', 'm', 'l'];

class PlaceholderSize extends RuleBase {
    constructor() {
        super(['warning', 'placeholder']);

        this.warnings = []; // стек блоков warning
    }

    getPhaseHandlersMap() {
        return {
            [this.phases.in]: this.in.bind(this),
            [this.phases.out]: this.out.bind(this)
        }
    }

    in(node) {
        if (node.block === 'warning') {
            this.warnings.push(node);

            return;
        }

        const warning = this.getLastWarning();

        if (!warning)
            return;

        const size = get(node.mods, 'size');
        const ind = correctSizes.indexOf(size);
        
        if (ind === -1)
            return new WarningInvalidPlaceholderSize(node.location);
        
    }

    out(node) {
        if (node.block !== 'warning')
            return;

        const warning = this.warnings.pop();
    }

    getLastWarning() {
        const length = this.warnings.length;

        return this.warnings[length - 1];
    }
}

export default PlaceholderSize;