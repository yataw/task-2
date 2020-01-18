import RuleBase from './rulebase.js';

const phases = RuleBase.prototype.phases;

class RuleMediator {
    constructor(rules) {
        this.rules = rules;

        this.handlersMap = {};
        this.buildMap();
    }

    buildMap() {
        this.rules.forEach(rule => {
            const selectors = rule.getSelectors();
            const handlersMap = rule.getPhaseHandlersMap();

            for (let phase in handlersMap) {
                const handler = handlersMap[phase];

                selectors.forEach(selector => {
                    const key = this.getKey(phase, selector);

                    if (!this.handlersMap[key])
                        this.handlersMap[key] = [];

                    this.handlersMap[key].push(handler);
                })
            }
        });
    }

    getKey(phase, selector) {
        return phase + '$' + selector;
    }

    /**
     * @return {Array<!LintError>}
     */
    call(phase, bemNode) {
        const key = this.getKey(phase, bemNode.selector);
        const handlers = this.handlersMap[key] || [];
        let errors = [];

        handlers.forEach(handler => {
            const handlerErrors = handler(bemNode);

            if (!handlerErrors)
                return;

            if (Array.isArray(handlerErrors))
                errors = [...handlerErrors, ...errors];
            else
                errors.push(handlerErrors);
        });

        return errors;
    }

    callAll(phase) {
        const errors = [];

        this.rules.forEach(rule => {
            const handler = rule.getPhaseHandlersMap()[phase];

            if (handler)
                errors.push(handler(null));
        });

        return errors.filter(result => result);
    }
}

export default RuleMediator;