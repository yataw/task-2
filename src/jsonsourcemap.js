/**
 * @fileoverview Адаптер функции parse из библиотеки json-source-map
 */

import {parse} from 'json-source-map';
import PROPS from './propnames.js';
import {InvalidInput} from "./error/system.js";


const {CONTENT} = PROPS;

const positionKey = Symbol('Position');

class JsonSourceMap {
    /**
     * @param {string} str
     */
    constructor(str) {
        this.str = str;
        this.json = null;
        this.pointers = null;
    }

    getJson = () => {
        try {
            const result = parse(this.str);

            this.json = result.data;
            this.pointers = result.pointers;
        }
        catch(e) {
            throw new InvalidInput();
        }

        this.match(this.json, '');

        return this.json;
    };

    match = (node, path) => {
        const {value, valueEnd} = this.pointers[path];

        // +1 к col, т.к. библиотека ведет отсчет от 0.
        // При этом line без изменения, т.к. исходный JSON обернули (положили внутрь свойства "content")
        const [start, end] = [value, valueEnd].map(val => ({line: val.line, column: val.column + 1}));
        const children = node[CONTENT];

        node[positionKey] = {start, end};

        if (!children)
            return;

        if (Array.isArray(children)) {
            children.forEach((child, ind) => {
                this.match(child, `${path}/${CONTENT}/${ind}`);
            })
        } else {
            this.match(children, `${path}/${CONTENT}`);
        }
    };

    static key = positionKey;
}

export default JsonSourceMap;