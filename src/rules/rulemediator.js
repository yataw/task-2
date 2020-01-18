import RuleBase from './rulebase.js';

const phases = RuleBase.prototype.phases;

class RuleMediator {
    constructor(rules) {
        this.rules = rules;

        /** type {RuleBase.HandlersMapType} */
        this.handlersMap = {[phases.in]: {}, [phases.out]: {}, [phases.end]: {}};

        this.mergeHandlers();
    }

    mergeHandlers() {
        for (let key in phases) {
            const phase = phases[key];

            this.rules.forEach(rule => {
                const phaseMap = rule.getMap()[phase];
                const mergedHandlers = this.handlersMap[phase];

                for (let selector in phaseMap) {
                    const handler = phaseMap[selector];

                    if (!handler)
                        continue;

                    if (!mergedHandlers[selector])
                        mergedHandlers[selector] = [];

                    mergedHandlers[selector].push(handler);
                }

            });
        }
    }

    call(phase, bemNode) {
        const handlers = this.handlersMap[phase][bemNode.selector] || [];

        handlers.forEach(handler => handler(bemNode));
    }
}