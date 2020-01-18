
class RuleBase {
    /**
     * Набор селекторов (BemNode.selector) узлов, на которых будет срабатывать правило.
     * Если не задан - будет срабатывать на каждом узле (TODO).
     *
     * @param {Array<string>} selectors
     */
    constructor(selectors = []) {
        this.selectors = selectors;
        /** type {RuleBase.HandlersMapType} */
        this.handlersMap = {[this.phases.in]: {}, [this.phases.out]: {}, [this.phases.end]: {}};

        this._initHandlersMap();
    }

    /**
     * @return {Object<RuleBase.prototype.phases, RuleBase.HandlerType>}
     */
    getHandlers() {
        // TODO error emitting
        throw "not implemented";
    }

    _initHandlersMap() {
        const handlers = this.getHandlers();

        for (let key in this.phases) {
            const phase = this.phases[key];

            this.selectors.forEach(selector => {
                this.handlersMap[phase][selector] = handlers[phase];
            });
        }
    }

    getMap() {
        return this.handlersMap;
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

/** @typedef {function(!BemNode): (!LintError|undefined)} */
RuleBase.HandlerType;

/** @typedef {Object<RuleBase.prototype.phases, Object<string, RuleBase.HandlerType>>} */
RuleBase.HandlersMapType;


export default RuleBase;