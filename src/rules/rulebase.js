
class RuleBase {
    /**
     * Набор селекторов (BemNode.selector) узлов, на которых будет срабатывать правило.
     * Если не задан - будет срабатывать на каждом узле (TODO).
     *
     * @param {Array<string>} selectors
     */
    constructor(selectors = []) {
        this.selectors = selectors;
    }

    getSelectors() {
        return this.selectors;
    }

    /**
     * @return {Object<RuleBase.prototype.phases, RuleBase.HandlerType>}
     */
    getPhaseHandlersMap() {
        // TODO error emitting
        throw "not implemented";
    }
}

/** @enum{string} */
RuleBase.prototype.phases = {
    /* Входим в очередной узел дерева*/
    in: 'in',
    /* Выходим */
    out: 'out',
    /* Заканчиваем обход дерева */
    end: 'end'
};

/** @typedef {function(BemNode): (!LintError|undefined)} */
RuleBase.HandlerType;

/** @typedef {Object<RuleBase.prototype.phases, Object<string, RuleBase.HandlerType>>} */
RuleBase.HandlersMapType;


export default RuleBase;