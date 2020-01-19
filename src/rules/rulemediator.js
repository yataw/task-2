import RuleBase from './rulebase.js';

const phases = RuleBase.prototype.phases;

class RuleMediator {
    constructor(rules) {
        this.rules = rules;

        this.handlersMap = {};
        this.alwaysCalledHandlers = [];
        this.buildMap();
    }

    buildMap() {
        this.rules.forEach(rule => {
            const selectors = rule.getSelectors();
            const handlersMap = rule.getPhaseHandlersMap();

            for (let phase in handlersMap) {
                const handler = handlersMap[phase];

                if (!selectors.length && phase !== phases.end) {
                    this.alwaysCalledHandlers.push(handler);

                    continue;
                }

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
        let handlers = this.handlersMap[key] || [];
        let errors = [];

        handlers = [...handlers, ...this.alwaysCalledHandlers];

        handlers.forEach(handler => {
            const handlerErrors = handler(bemNode);

            errors = this.getMergedErrors(errors, handlerErrors);
        });

        return errors;
    }

    callAll(phase) {
        let errors = [];

        this.rules.forEach(rule => {
            const handler = rule.getPhaseHandlersMap()[phase];

            if (!handler)
                return;

            const handlerErrors = handler(null);

            errors = this.getMergedErrors(errors, handlerErrors);
        });

        return errors;
    }

    getMergedErrors(allErrors, otherErrors) {
        if (!otherErrors)
            return allErrors;

        if (Array.isArray(otherErrors))
            return [...allErrors, ...otherErrors];

        return [...allErrors, otherErrors];
    }
}

export default RuleMediator;