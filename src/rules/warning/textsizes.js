import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {WarningTextSizeShouldBeEqual} from "../../error/errorlist.js";

class TextSizes extends RuleBase {
    constructor() {
        super(['warning', 'text']);

        this.visited = false;
        this.wasSize = false;
        this.currentSize = null;
    }

    in(node) {
        this.visited = true;

        if (node.block !== 'text')
            return;

        const size = get(node.mods, 'size');

        if (!this.currentSize) {
            this.currentSize = new Size(size);

            return;
        }

        if (this.currentSize.check(size))
            return new WarningTextSizeShouldBeEqual(node.location);
    }

    out(node) {
        if (node.block === 'warning')
            this.currentSize = null;
    }

    end() {
        // TODO error emitting
        if (this.visited && !this.currentSize)
            throw "Invalid JSON";
    }
}

export default TextSizes;