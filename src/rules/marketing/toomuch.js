import RuleBase from "../rulebase.js";
import {Size, get} from "../utils.js";
import {WarningInvalidButtonSize} from "../../error/errorlist.js";
import {NoTextNode} from "../../error/system.js";
import {GridTooMuchMarketingBlocks} from "../../error/errorlist";

const marketingBlocks = ['commercial', 'offer'];

class TooMuch extends RuleBase {
    constructor() {
        super(['grid', 'grid__fraction', ...marketingBlocks]);

        this.grid = null;
        this.gridFraction = null;

        this.totalMarketing = 0;
    }

    getPhaseHandlersMap() {
        return {
            [this.phases.in]: this.in.bind(this),
            [this.phases.out]: this.out.bind(this)
        }
    }

    in(node) {
        if (this.grid && node.selector === 'grid__fraction') {
            this.gridFraction = node;

            return;
        }

        if (node.block === 'grid') {
            this.grid = node;

            return;
        }

        if (!this.gridFraction)
            return;

        const size = +get(this.gridFraction.elemMods, 'm-col');

        if (marketingBlocks.includes(node.block))
            this.totalMarketing += size;
    }

    out(node) {
        if (node.selector === 'grid__fraction') {
            this.gridFraction = null;

            return;
        }

        if (node.block !== 'grid')
            return;

        const fullSize = +get(node.mods, 'm-columns');
        let error;

        if (this.totalMarketing * 2 >= fullSize)
            error = new GridTooMuchMarketingBlocks(node.location);

        this.grid = null;
        this.gridFraction = null;
        this.totalMarketing = 0;
        this.totalInfo = 0;

        return error;
    }
}

export default TooMuch;