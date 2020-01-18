import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {WarningTextSizeShouldBeEqual} from "../../error/errorlist.js";
import {NoTextNode} from "../../error/system.js";

class TextSizes extends RuleBase {
    constructor() {
        super(['warning', 'text']);

        // Считаем, что блоки warning могут быть вложенными. Каждый вложенный блок warning создает свой Error boundary.
        this.warnings = []; // стек блоков warning
        this.textNodes = new Map();
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

        if (!this.textNodes.has(warning))
            this.textNodes.set(warning, []);

        const textNodes = this.textNodes.get(warning);

        textNodes.push(node);
    }

    out(node) {
        if (node.block !== 'warning')
            return;

        const warning = this.warnings.pop();
        const textNodes = this.textNodes.get(warning);

        this.textNodes.delete(warning);

        if (!textNodes)
            return;

        const [first, ...other] = textNodes;
        const sizeValA = get(first.mods, 'size');
        const size = new Size(sizeValA);

        for (let text of other) {
            const sizeValB = get(text.mods, 'size');

            // Даже если в рамках одного блока несколько ошибочных слов, то вовращаем одну ошибку.
            if (!size.check(sizeValB))
                return new WarningTextSizeShouldBeEqual(node.location);
        }
    }

    getLastWarning() {
        const length = this.warnings.length;

        return this.warnings[length - 1];
    }
}

export default TextSizes;