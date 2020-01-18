import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {WarningInvalidButtonPosition} from "../../error/errorlist.js";

class ButtonPosition extends RuleBase {
    constructor() {
        super(['warning', 'button', 'placeholder']);

        // Считаем, что блоки warning могут быть вложенными. Каждый вложенный блок warning создает свой Error boundary.
        this.warnings = []; // стек блоков warning
        this.placeholderNodes = new Map(); // храним 1 placeholder
        this.buttonNodes = new Map(); // храним 1 button
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

        if (node.block === 'placeholder') {
            if (!this.placeholderNodes.has(warning)) {
                this.placeholderNodes.set(warning, node);

                if (this.buttonNodes.has(warning))
                    return new WarningInvalidButtonPosition(warning.location);
            }

            return;
        }

        if (node.block === 'button') {
            if (!this.buttonNodes.has(warning))
                this.buttonNodes.set(warning, node);
        }
    }

    out(node) {
        if (node.block !== 'warning')
            return;

        const warning = this.warnings.pop();

        this.buttonNodes.delete(warning);
        this.placeholderNodes.delete(warning);
    }

    getLastWarning() {
        const length = this.warnings.length;

        return this.warnings[length - 1];
    }
}

export default ButtonPosition;