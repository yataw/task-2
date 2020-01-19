import Linter from './src/linter.js';
import rules from './src/rules/list.js'

// TODO for test
// import {tests, answers} from "./testcases.js";

const linter = new Linter(rules);

window.lint = function(str) {
    try {
        return linter.lint(str);
    } catch (e) {
        return [];
    }
};

// TODO for test
/*tests.forEach((test, ind) => {
    const res = window.lint(test);

    console.log('test: ' + (ind + 1));
    console.log(res);
})*/
