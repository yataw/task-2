import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {WarningInvalidButtonSize} from "../../error/errorlist.js";
import {NoTextNode} from "../../error/system.js";
import {TextInvalidH2Position} from "../../error/errorlist";

class ButtonSize extends RuleBase {
    constructor() {
        super(['warning', 'button', 'text']);

        // Считаем, что блоки warning могут быть вложенными. Каждый вложенный блок warning создает свой Error boundary.
        this.warnings = []; // стек блоков warning
        this.textNodes = new Map();
        this.buttonNodes = new Map();
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

        if (node.block === 'text') {
            if (!this.textNodes.has(warning))
                this.textNodes.set(warning, node);

            return;
        }

        if (!this.buttonNodes.has(warning))
            this.buttonNodes.set(warning, []);

        const buttonNodes = this.buttonNodes.get(warning);

        buttonNodes.push(node);
    }

    out(node) {
        if (node.block !== 'warning')
            return;

        const warning = this.warnings.pop();
        const firstTextNode = this.textNodes.get(warning);
        const buttons = this.buttonNodes.get(warning);

        if (!buttons)
            return;

        this.textNodes.delete(warning);
        this.buttonNodes.delete(warning);

        // TODO предполагаем, что текстовые ноды обязаны быть, т.к. иначе эталонный размер не определен и поедут другие правила. Проверить предположение.
        if (!firstTextNode)
            throw new NoTextNode();

        const sizeValA = get(firstTextNode.mods, 'size');
        const size = new Size(sizeValA);

        size.add(1);

        const errors = [];

        for (let button of buttons) {
            const sizeValB = get(button.mods, 'size');

            if (!size.check(sizeValB)) {
                const error = new WarningInvalidButtonSize(button.location);

                errors.push(error);
            }
        }

        return errors;
    }

    getLastWarning() {
        const length = this.warnings.length;

        return this.warnings[length - 1];
    }
}

export default ButtonSize;