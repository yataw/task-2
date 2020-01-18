import Linter from './src/linter.js';
import rules from './src/rules/list.js'

// TODO for test
// import {tests, answers} from "./testcases.js";

const linter = new Linter(rules);

window.lint = function(str) {
    return linter.lint(str);
};

// TODO for test
/*tests.forEach((test, ind) => {
    const res = window.lint(test);

    console.log('test: ' + ind);
    console.log(res);
})*/
