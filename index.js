import Linter from './src/linter.js';
import rules from './src/rules/list.js'


const linter = new Linter(rules);

window.lint = function(str) {
    return linter.lint(str);
};


