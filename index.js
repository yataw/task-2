import Linter from './src/linter.js';


window.lint = Linter.lint;

// TODO for test

console.log(window.lint(`{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "xl" }
            }
        },
        {
            "block": "input",
            "mods": { "size": "xxl" }
        }
    ]
}`));
