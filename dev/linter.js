/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_linter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/linter.js */ "./src/linter.js");
/* harmony import */ var _src_rules_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/rules/list.js */ "./src/rules/list.js");

 // TODO for test
// import {tests, answers} from "./testcases.js";

const linter = new _src_linter_js__WEBPACK_IMPORTED_MODULE_0__["default"](_src_rules_list_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

window.lint = function (str) {
  return linter.lint(str);
}; // TODO for test

/*
tests.forEach((test, ind) => {
    const res = window.lint(test);

    console.log('test: ' + (ind + 1));
    console.log(res);
})
*/

/***/ }),

/***/ "./node_modules/json-source-map/index.js":
/*!***********************************************!*\
  !*** ./node_modules/json-source-map/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var escapedChars = {
  'b': '\b',
  'f': '\f',
  'n': '\n',
  'r': '\r',
  't': '\t',
  '"': '"',
  '/': '/',
  '\\': '\\'
};

var A_CODE = 'a'.charCodeAt();


exports.parse = function (source, _, options) {
  var pointers = {};
  var line = 0;
  var column = 0;
  var pos = 0;
  var bigint = options && options.bigint && typeof BigInt != 'undefined';
  return {
    data: _parse('', true),
    pointers: pointers
  };

  function _parse(ptr, topLevel) {
    whitespace();
    var data;
    map(ptr, 'value');
    var char = getChar();
    switch (char) {
      case 't': read('rue'); data = true; break;
      case 'f': read('alse'); data = false; break;
      case 'n': read('ull'); data = null; break;
      case '"': data = parseString(); break;
      case '[': data = parseArray(ptr); break;
      case '{': data = parseObject(ptr); break;
      default:
        backChar();
        if ('-0123456789'.indexOf(char) >= 0)
          data = parseNumber();
        else
          unexpectedToken();
    }
    map(ptr, 'valueEnd');
    whitespace();
    if (topLevel && pos < source.length) unexpectedToken();
    return data;
  }

  function whitespace() {
    loop:
      while (pos < source.length) {
        switch (source[pos]) {
          case ' ': column++; break;
          case '\t': column += 4; break;
          case '\r': column = 0; break;
          case '\n': column = 0; line++; break;
          default: break loop;
        }
        pos++;
      }
  }

  function parseString() {
    var str = '';
    var char;
    while (true) {
      char = getChar();
      if (char == '"') {
        break;
      } else if (char == '\\') {
        char = getChar();
        if (char in escapedChars)
          str += escapedChars[char];
        else if (char == 'u')
          str += getCharCode();
        else
          wasUnexpectedToken();
      } else {
        str += char;
      }
    }
    return str;
  }

  function parseNumber() {
    var numStr = '';
    var integer = true;
    if (source[pos] == '-') numStr += getChar();

    numStr += source[pos] == '0'
              ? getChar()
              : getDigits();

    if (source[pos] == '.') {
      numStr += getChar() + getDigits();
      integer = false;
    }

    if (source[pos] == 'e' || source[pos] == 'E') {
      numStr += getChar();
      if (source[pos] == '+' || source[pos] == '-') numStr += getChar();
      numStr += getDigits();
      integer = false;
    }

    var result = +numStr;
    return bigint && integer && (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER)
            ? BigInt(numStr)
            : result;
  }

  function parseArray(ptr) {
    whitespace();
    var arr = [];
    var i = 0;
    if (getChar() == ']') return arr;
    backChar();

    while (true) {
      var itemPtr = ptr + '/' + i;
      arr.push(_parse(itemPtr));
      whitespace();
      var char = getChar();
      if (char == ']') break;
      if (char != ',') wasUnexpectedToken();
      whitespace();
      i++;
    }
    return arr;
  }

  function parseObject(ptr) {
    whitespace();
    var obj = {};
    if (getChar() == '}') return obj;
    backChar();

    while (true) {
      var loc = getLoc();
      if (getChar() != '"') wasUnexpectedToken();
      var key = parseString();
      var propPtr = ptr + '/' + escapeJsonPointer(key);
      mapLoc(propPtr, 'key', loc);
      map(propPtr, 'keyEnd');
      whitespace();
      if (getChar() != ':') wasUnexpectedToken();
      whitespace();
      obj[key] = _parse(propPtr);
      whitespace();
      var char = getChar();
      if (char == '}') break;
      if (char != ',') wasUnexpectedToken();
      whitespace();
    }
    return obj;
  }

  function read(str) {
    for (var i=0; i<str.length; i++)
      if (getChar() !== str[i]) wasUnexpectedToken();
  }

  function getChar() {
    checkUnexpectedEnd();
    var char = source[pos];
    pos++;
    column++; // new line?
    return char;
  }

  function backChar() {
    pos--;
    column--;
  }

  function getCharCode() {
    var count = 4;
    var code = 0;
    while (count--) {
      code <<= 4;
      var char = getChar().toLowerCase();
      if (char >= 'a' && char <= 'f')
        code += char.charCodeAt() - A_CODE + 10;
      else if (char >= '0' && char <= '9')
        code += +char;
      else
        wasUnexpectedToken();
    }
    return String.fromCharCode(code);
  }

  function getDigits() {
    var digits = '';
    while (source[pos] >= '0' && source[pos] <= '9')
      digits += getChar();

    if (digits.length) return digits;
    checkUnexpectedEnd();
    unexpectedToken();
  }

  function map(ptr, prop) {
    mapLoc(ptr, prop, getLoc());
  }

  function mapLoc(ptr, prop, loc) {
    pointers[ptr] = pointers[ptr] || {};
    pointers[ptr][prop] = loc;
  }

  function getLoc() {
    return {
      line: line,
      column: column,
      pos: pos
    };
  }

  function unexpectedToken() {
    throw new SyntaxError('Unexpected token ' + source[pos] + ' in JSON at position ' + pos);
  }

  function wasUnexpectedToken() {
    backChar();
    unexpectedToken();
  }

  function checkUnexpectedEnd() {
    if (pos >= source.length)
      throw new SyntaxError('Unexpected end of JSON input');
  }
};


exports.stringify = function (data, _, options) {
  if (!validType(data)) return;
  var wsLine = 0;
  var wsPos, wsColumn;
  var whitespace = typeof options == 'object'
                    ? options.space
                    : options;
  switch (typeof whitespace) {
    case 'number':
      var len = whitespace > 10
                  ? 10
                  : whitespace < 0
                    ? 0
                    : Math.floor(whitespace);
      whitespace = len && repeat(len, ' ');
      wsPos = len;
      wsColumn = len;
      break;
    case 'string':
      whitespace = whitespace.slice(0, 10);
      wsPos = 0;
      wsColumn = 0;
      for (var j=0; j<whitespace.length; j++) {
        var char = whitespace[j];
        switch (char) {
          case ' ': wsColumn++; break;
          case '\t': wsColumn += 4; break;
          case '\r': wsColumn = 0; break;
          case '\n': wsColumn = 0; wsLine++; break;
          default: throw new Error('whitespace characters not allowed in JSON');
        }
        wsPos++;
      }
      break;
    default:
      whitespace = undefined;
  }

  var json = '';
  var pointers = {};
  var line = 0;
  var column = 0;
  var pos = 0;
  var es6 = options && options.es6 && typeof Map == 'function';
  _stringify(data, 0, '');
  return {
    json: json,
    pointers: pointers
  };

  function _stringify(_data, lvl, ptr) {
    map(ptr, 'value');
    switch (typeof _data) {
      case 'number':
      case 'bigint':
      case 'boolean':
        out('' + _data); break;
      case 'string':
        out(quoted(_data)); break;
      case 'object':
        if (_data === null) {
          out('null');
        } else if (typeof _data.toJSON == 'function') {
          out(quoted(_data.toJSON()));
        } else if (Array.isArray(_data)) {
          stringifyArray();
        } else if (es6) {
          if (_data.constructor.BYTES_PER_ELEMENT)
            stringifyArray();
          else if (_data instanceof Map)
            stringifyMapSet();
          else if (_data instanceof Set)
            stringifyMapSet(true);
          else
            stringifyObject();
        } else {
          stringifyObject();
        }
    }
    map(ptr, 'valueEnd');

    function stringifyArray() {
      if (_data.length) {
        out('[');
        var itemLvl = lvl + 1;
        for (var i=0; i<_data.length; i++) {
          if (i) out(',');
          indent(itemLvl);
          var item = validType(_data[i]) ? _data[i] : null;
          var itemPtr = ptr + '/' + i;
          _stringify(item, itemLvl, itemPtr);
        }
        indent(lvl);
        out(']');
      } else {
        out('[]');
      }
    }

    function stringifyObject() {
      var keys = Object.keys(_data);
      if (keys.length) {
        out('{');
        var propLvl = lvl + 1;
        for (var i=0; i<keys.length; i++) {
          var key = keys[i];
          var value = _data[key];
          if (validType(value)) {
            if (i) out(',');
            var propPtr = ptr + '/' + escapeJsonPointer(key);
            indent(propLvl);
            map(propPtr, 'key');
            out(quoted(key));
            map(propPtr, 'keyEnd');
            out(':');
            if (whitespace) out(' ');
            _stringify(value, propLvl, propPtr);
          }
        }
        indent(lvl);
        out('}');
      } else {
        out('{}');
      }
    }

    function stringifyMapSet(isSet) {
      if (_data.size) {
        out('{');
        var propLvl = lvl + 1;
        var first = true;
        var entries = _data.entries();
        var entry = entries.next();
        while (!entry.done) {
          var item = entry.value;
          var key = item[0];
          var value = isSet ? true : item[1];
          if (validType(value)) {
            if (!first) out(',');
            first = false;
            var propPtr = ptr + '/' + escapeJsonPointer(key);
            indent(propLvl);
            map(propPtr, 'key');
            out(quoted(key));
            map(propPtr, 'keyEnd');
            out(':');
            if (whitespace) out(' ');
            _stringify(value, propLvl, propPtr);
          }
          entry = entries.next();
        }
        indent(lvl);
        out('}');
      } else {
        out('{}');
      }
    }
  }

  function out(str) {
    column += str.length;
    pos += str.length;
    json += str;
  }

  function indent(lvl) {
    if (whitespace) {
      json += '\n' + repeat(lvl, whitespace);
      line++;
      column = 0;
      while (lvl--) {
        if (wsLine) {
          line += wsLine;
          column = wsColumn;
        } else {
          column += wsColumn;
        }
        pos += wsPos;
      }
      pos += 1; // \n character
    }
  }

  function map(ptr, prop) {
    pointers[ptr] = pointers[ptr] || {};
    pointers[ptr][prop] = {
      line: line,
      column: column,
      pos: pos
    };
  }

  function repeat(n, str) {
    return Array(n + 1).join(str);
  }
};


var VALID_TYPES = ['number', 'bigint', 'boolean', 'string', 'object'];
function validType(data) {
  return VALID_TYPES.indexOf(typeof data) >= 0;
}


var ESC_QUOTE = /"|\\/g;
var ESC_B = /[\b]/g;
var ESC_F = /\f/g;
var ESC_N = /\n/g;
var ESC_R = /\r/g;
var ESC_T = /\t/g;
function quoted(str) {
  str = str.replace(ESC_QUOTE, '\\$&')
           .replace(ESC_F, '\\f')
           .replace(ESC_B, '\\b')
           .replace(ESC_N, '\\n')
           .replace(ESC_R, '\\r')
           .replace(ESC_T, '\\t');
  return '"' + str + '"';
}


var ESC_0 = /~/g;
var ESC_1 = /\//g;
function escapeJsonPointer(str) {
  return str.replace(ESC_0, '~0')
            .replace(ESC_1, '~1');
}


/***/ }),

/***/ "./src/bemnode.js":
/*!************************!*\
  !*** ./src/bemnode.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _propnames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./propnames.js */ "./src/propnames.js");
/* harmony import */ var _jsonsourcemap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jsonsourcemap.js */ "./src/jsonsourcemap.js");


const {
  BLOCK,
  ELEM,
  CONTENT,
  MODS,
  MIX,
  ELEMMODS
} = _propnames_js__WEBPACK_IMPORTED_MODULE_0__["default"];
const locationKey = _jsonsourcemap_js__WEBPACK_IMPORTED_MODULE_1__["default"].key;

class BemNode {
  /**
   * @param {Object} node
   * @param {BemNode} parent
   */
  constructor(node, parent) {
    this.block = node[BLOCK];
    this.elem = node[ELEM];
    this.mods = node[MODS];
    this.mix = node[MIX];
    this.elemMods = node[ELEMMODS];
    this.location = node[locationKey];
    this.parent = parent;
    this.selector = this.block + (this.elem ? `__${this.elem}` : '');
  }

}

/* harmony default export */ __webpack_exports__["default"] = (BemNode);

/***/ }),

/***/ "./src/error/errorlist.js":
/*!********************************!*\
  !*** ./src/error/errorlist.js ***!
  \********************************/
/*! exports provided: WarningTextSizeShouldBeEqual, WarningInvalidButtonSize, WarningInvalidButtonPosition, WarningInvalidPlaceholderSize, TextSeveralH1, TextInvalidH2Position, TextInvalidH3Position, GridTooMuchMarketingBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarningTextSizeShouldBeEqual", function() { return WarningTextSizeShouldBeEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarningInvalidButtonSize", function() { return WarningInvalidButtonSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarningInvalidButtonPosition", function() { return WarningInvalidButtonPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarningInvalidPlaceholderSize", function() { return WarningInvalidPlaceholderSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextSeveralH1", function() { return TextSeveralH1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextInvalidH2Position", function() { return TextInvalidH2Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextInvalidH3Position", function() { return TextInvalidH3Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridTooMuchMarketingBlocks", function() { return GridTooMuchMarketingBlocks; });
/* harmony import */ var _linterror_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linterror.js */ "./src/error/linterror.js");


class WarningTextSizeShouldBeEqual extends _linterror_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(location) {
    super({
      code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
      error: 'Тексты в блоке warning должны быть одного размера.',
      location
    });
  }

}

class WarningInvalidButtonSize extends _linterror_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(location) {
    super({
      code: 'WARNING.INVALID_BUTTON_SIZE',
      error: 'Размер кнопки в блоке warning должен быть на 1 шаг больше эталонного.',
      location
    });
  }

}

class WarningInvalidButtonPosition extends _linterror_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(location) {
    super({
      code: 'WARNING.INVALID_BUTTON_POSITION',
      error: 'Блок button в блоке warning должен быть после блока placeholder.',
      location
    });
  }

}

class WarningInvalidPlaceholderSize extends _linterror_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(location) {
    super({
      code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
      error: 'Допустимые размеры для блока placeholder в блоке warning: s, m, l.',
      location
    });
  }

}

class TextSeveralH1 extends _linterror_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(location) {
    super({
      code: 'TEXT.SEVERAL_H1',
      error: 'Заголовок первого уровня на странице должен быть единственным.',
      location
    });
  }

}

class TextInvalidH2Position extends _linterror_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(location) {
    super({
      code: 'TEXT.INVALID_H2_POSITION',
      error: 'Заголовок второго уровня не может находиться перед заголовком первого уровня.',
      location
    });
  }

}

class TextInvalidH3Position extends _linterror_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(location) {
    super({
      code: 'TEXT.INVALID_H3_POSITION',
      error: 'Заголовок третьего уровня не может находиться перед заголовком второго уровня.',
      location
    });
  }

}

class GridTooMuchMarketingBlocks extends _linterror_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(location) {
    super({
      code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
      error: 'Маркетинговые блоки не могут занимать больше половины от всех колонок блока grid',
      location
    });
  }

}



/***/ }),

/***/ "./src/error/linterror.js":
/*!********************************!*\
  !*** ./src/error/linterror.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class LintError {
  constructor({
    code,
    error,
    location
  }) {
    this.code = code;
    this.error = error;
    this.location = location;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (LintError);

/***/ }),

/***/ "./src/error/system.js":
/*!*****************************!*\
  !*** ./src/error/system.js ***!
  \*****************************/
/*! exports provided: InvalidInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidInput", function() { return InvalidInput; });
/**
 * @fileoverview Неразрешимые ошибки, после которых прекращаем работу. Их число может сокращаться
 * по мере добавления новых правил в линтер.
 */
class InvalidInput extends Error {
  constructor() {
    super("Invalid input");
  }

}



/***/ }),

/***/ "./src/jsonsourcemap.js":
/*!******************************!*\
  !*** ./src/jsonsourcemap.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var json_source_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! json-source-map */ "./node_modules/json-source-map/index.js");
/* harmony import */ var json_source_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json_source_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _propnames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./propnames.js */ "./src/propnames.js");
/* harmony import */ var _error_system_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error/system.js */ "./src/error/system.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @fileoverview Адаптер функции parse из библиотеки json-source-map
 */



const {
  CONTENT
} = _propnames_js__WEBPACK_IMPORTED_MODULE_1__["default"];
const positionKey = Symbol('Position');

class JsonSourceMap {
  /**
   * @param {string} str
   */
  constructor(str) {
    _defineProperty(this, "getJson", () => {
      try {
        const result = Object(json_source_map__WEBPACK_IMPORTED_MODULE_0__["parse"])(this.str);
        this.json = result.data;
        this.pointers = result.pointers;
      } catch (e) {
        throw new _error_system_js__WEBPACK_IMPORTED_MODULE_2__["InvalidInput"]();
      }

      this.match(this.json, '');
      return this.json;
    });

    _defineProperty(this, "match", (node, path) => {
      const {
        value,
        valueEnd
      } = this.pointers[path]; // +1 к col, т.к. библиотека ведет отсчет от 0.
      // При этом line без изменения, т.к. исходный JSON обернули (положили внутрь свойства "content")

      const [start, end] = [value, valueEnd].map(val => ({
        line: val.line,
        column: val.column + 1
      }));
      const children = node[CONTENT];
      node[positionKey] = {
        start,
        end
      };
      if (!children) return;

      if (Array.isArray(children)) {
        children.forEach((child, ind) => {
          this.match(child, `${path}/${CONTENT}/${ind}`);
        });
      } else {
        this.match(children, `${path}/${CONTENT}`);
      }
    });

    this.str = str;
    this.json = null;
    this.pointers = null;
  }

}

_defineProperty(JsonSourceMap, "key", positionKey);

/* harmony default export */ __webpack_exports__["default"] = (JsonSourceMap);

/***/ }),

/***/ "./src/linter.js":
/*!***********************!*\
  !*** ./src/linter.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _propnames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./propnames.js */ "./src/propnames.js");
/* harmony import */ var _jsonsourcemap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jsonsourcemap.js */ "./src/jsonsourcemap.js");
/* harmony import */ var _bemnode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bemnode.js */ "./src/bemnode.js");
/* harmony import */ var _rules_rulemediator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rules/rulemediator.js */ "./src/rules/rulemediator.js");
/* harmony import */ var _rules_rulebase_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rules/rulebase.js */ "./src/rules/rulebase.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const {
  CONTENT
} = _propnames_js__WEBPACK_IMPORTED_MODULE_0__["default"];
const phases = _rules_rulebase_js__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.phases;

class Linter {
  /**
   * @param {Array<!RuleBase>} ruleClasses
   */
  constructor(ruleClasses = []) {
    _defineProperty(this, "attachRoot", str => `{"${CONTENT}":\n${str}\n}`);

    _defineProperty(this, "next", (node, parent) => {
      const bemNode = new _bemnode_js__WEBPACK_IMPORTED_MODULE_2__["default"](node, parent);
      const children = this.contentAsArray(node[CONTENT]);
      this.call(phases.in, bemNode);
      children.map(child => {
        this.next(child, bemNode);
      });
      this.call(phases.out, bemNode);
    });

    this.ruleClasses = ruleClasses;
    this.mediator = null;
    this.errors = [];
  }
  /**
   * @param {string} str
   */


  lint(str) {
    this.init();
    const stringTree = this.attachRoot(str);
    const mapper = new _jsonsourcemap_js__WEBPACK_IMPORTED_MODULE_1__["default"](stringTree);
    const root = mapper.getJson(stringTree);
    this.next(root, null);
    this.callAll(phases.end); // TODO filter errors

    return this.errors;
  }

  init() {
    const rulesInstances = this.ruleClasses.map(rClass => new rClass());
    this.mediator = new _rules_rulemediator_js__WEBPACK_IMPORTED_MODULE_3__["default"](rulesInstances);
    this.errors = [];
  }
  /* Вход может быть объектом или массивом (дерево или лес). Добавим виртуальный корень, чтобы всегда было дерево. */


  call(phase, bemNode) {
    const errors = this.mediator.call(phase, bemNode);
    this.addErrors(errors);
  }

  callAll(phase) {
    const errors = this.mediator.callAll(phase);
    this.addErrors(errors);
  }

  addErrors(errors) {
    this.errors = [...errors, ...this.errors];
  }

  contentAsArray(el) {
    if (Array.isArray(el)) return el;
    return el ? [el] : [];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Linter);

/***/ }),

/***/ "./src/propnames.js":
/*!**************************!*\
  !*** ./src/propnames.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  BLOCK: "block",
  ELEM: "elem",
  CONTENT: "content",
  MODS: "mods",
  MIX: "mix",
  ELEMMODS: 'elemMods'
});

/***/ }),

/***/ "./src/rules/list.js":
/*!***************************!*\
  !*** ./src/rules/list.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _warning_textsizes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warning/textsizes.js */ "./src/rules/warning/textsizes.js");
/* harmony import */ var _warning_buttonsize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./warning/buttonsize.js */ "./src/rules/warning/buttonsize.js");
/* harmony import */ var _warning_buttonposition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./warning/buttonposition.js */ "./src/rules/warning/buttonposition.js");
/* harmony import */ var _warning_placeholdersize_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./warning/placeholdersize.js */ "./src/rules/warning/placeholdersize.js");
/* harmony import */ var _text_severalh1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text/severalh1.js */ "./src/rules/text/severalh1.js");
/* harmony import */ var _text_h1h2_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text/h1h2.js */ "./src/rules/text/h1h2.js");
/* harmony import */ var _text_h2h3_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./text/h2h3.js */ "./src/rules/text/h2h3.js");
/* harmony import */ var _marketing_toomuch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./marketing/toomuch.js */ "./src/rules/marketing/toomuch.js");








const rules = [_warning_textsizes_js__WEBPACK_IMPORTED_MODULE_0__["default"], _warning_buttonsize_js__WEBPACK_IMPORTED_MODULE_1__["default"], _warning_buttonposition_js__WEBPACK_IMPORTED_MODULE_2__["default"], _warning_placeholdersize_js__WEBPACK_IMPORTED_MODULE_3__["default"], _text_severalh1_js__WEBPACK_IMPORTED_MODULE_4__["default"], _text_h1h2_js__WEBPACK_IMPORTED_MODULE_5__["default"], _text_h2h3_js__WEBPACK_IMPORTED_MODULE_6__["default"], _marketing_toomuch_js__WEBPACK_IMPORTED_MODULE_7__["default"]];
/* harmony default export */ __webpack_exports__["default"] = (rules);

/***/ }),

/***/ "./src/rules/marketing/toomuch.js":
/*!****************************************!*\
  !*** ./src/rules/marketing/toomuch.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rulebase.js */ "./src/rules/rulebase.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/rules/utils.js");
/* harmony import */ var _error_errorlist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist */ "./src/error/errorlist.js");



const marketingBlocks = ['commercial', 'offer'];

class TooMuch extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['grid', 'grid__fraction', ...marketingBlocks]);
    this.grid = null;
    this.gridFraction = null;
    this.totalMarketing = 0;
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this),
      [this.phases.out]: this.out.bind(this)
    };
  }

  in(node) {
    if (this.grid && node.selector === 'grid__fraction') {
      this.gridFraction = node;
      return;
    }

    if (node.block === 'grid') {
      this.grid = node;
      return;
    }

    if (!this.gridFraction) return;
    const size = +Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(this.gridFraction.elemMods, 'm-col');
    if (marketingBlocks.includes(node.block)) this.totalMarketing += size;
  }

  out(node) {
    if (node.selector === 'grid__fraction') {
      this.gridFraction = null;
      return;
    }

    if (node.block !== 'grid') return;
    const fullSize = +Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'm-columns');
    let error;
    if (this.totalMarketing * 2 >= fullSize) error = new _error_errorlist__WEBPACK_IMPORTED_MODULE_2__["GridTooMuchMarketingBlocks"](node.location);
    this.grid = null;
    this.gridFraction = null;
    this.totalMarketing = 0;
    this.totalInfo = 0;
    return error;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TooMuch);

/***/ }),

/***/ "./src/rules/rulebase.js":
/*!*******************************!*\
  !*** ./src/rules/rulebase.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (RuleBase);

/***/ }),

/***/ "./src/rules/rulemediator.js":
/*!***********************************!*\
  !*** ./src/rules/rulemediator.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rulebase.js */ "./src/rules/rulebase.js");

const phases = _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.phases;

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
          if (!this.handlersMap[key]) this.handlersMap[key] = [];
          this.handlersMap[key].push(handler);
        });
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
      if (!handler) return;
      const handlerErrors = handler(null);
      errors = this.getMergedErrors(errors, handlerErrors);
    });
    return errors;
  }

  getMergedErrors(allErrors, otherErrors) {
    if (!otherErrors) return allErrors;
    if (Array.isArray(otherErrors)) return [...allErrors, ...otherErrors];
    return [...allErrors, otherErrors];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (RuleMediator);

/***/ }),

/***/ "./src/rules/text/h1h2.js":
/*!********************************!*\
  !*** ./src/rules/text/h1h2.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rulebase.js */ "./src/rules/rulebase.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/rules/utils.js");
/* harmony import */ var _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist.js */ "./src/error/errorlist.js");




class H1H2 extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['text']);
    /**
     * @type {Map<BemNode, {node: BemNode, order: number}>}
     */

    this.h1ToH1ParentMap = new Map(); // {h1-node, h1-parent with order}

    /**
     * @type {Map<BemNode, Array<{node: BemNode, order: number}>>}
     */

    this.h2ParentToH2Map = new Map(); // {parent, h2-childs with order}

    /** @type {number} */

    this.order = 0;
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this),
      [this.phases.end]: this.end.bind(this)
    };
  }

  in(node) {
    if (this.isH1(node)) {
      this.h1ToH1ParentMap.set(node, {
        node: node.parent,
        order: this.order++
      });
      return;
    }

    if (this.isH2(node)) {
      const parent = node.parent;
      if (!this.h2ParentToH2Map.has(parent)) this.h2ParentToH2Map.set(parent, []);
      const h2Nodes = this.h2ParentToH2Map.get(parent);
      h2Nodes.push({
        node: node,
        order: this.order++
      });
    }
  }

  end() {
    const wrongH2 = new Set();
    this.h1ToH1ParentMap.forEach(({
      node: parent,
      order: h1Order
    }) => {
      for (let currentParent = parent; currentParent; currentParent = currentParent.parent) {
        const h2Nodes = this.h2ParentToH2Map.get(currentParent);
        if (!h2Nodes) continue;
        h2Nodes.forEach(({
          node: h2Node,
          order: h2Order
        }) => {
          if (h2Order < h1Order) wrongH2.add(h2Node);
        });
      }
    });
    const errors = [];
    wrongH2.forEach(node => {
      errors.push(new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["TextInvalidH2Position"](node.position));
    });
    return errors;
  }

  isH1(node) {
    const type = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'type');
    return type && type === 'h1';
  }

  isH2(node) {
    const type = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'type');
    return type && type === 'h2';
  }

}

/* harmony default export */ __webpack_exports__["default"] = (H1H2);

/***/ }),

/***/ "./src/rules/text/h2h3.js":
/*!********************************!*\
  !*** ./src/rules/text/h2h3.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rulebase.js */ "./src/rules/rulebase.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/rules/utils.js");
/* harmony import */ var _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist.js */ "./src/error/errorlist.js");


 // TODO это copy-paste теста h1h2.js с заменой h1 -> h2 в методе isH1 и h2 -> h3 в методе isH2

class H2H3 extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['text']);
    /**
     * @type {Map<BemNode, {node: BemNode, order: number}>}
     */

    this.h1ToH1ParentMap = new Map(); // {h1-node, h1-parent with order}

    /**
     * @type {Map<BemNode, Array<{node: BemNode, order: number}>>}
     */

    this.h2ParentToH2Map = new Map(); // {parent, h2-childs with order}

    /** @type {number} */

    this.order = 0;
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this),
      [this.phases.end]: this.end.bind(this)
    };
  }

  in(node) {
    if (this.isH1(node)) {
      this.h1ToH1ParentMap.set(node, {
        node: node.parent,
        order: this.order++
      });
      return;
    }

    if (this.isH2(node)) {
      const parent = node.parent;
      if (!this.h2ParentToH2Map.has(parent)) this.h2ParentToH2Map.set(parent, []);
      const h2Nodes = this.h2ParentToH2Map.get(parent);
      h2Nodes.push({
        node: node,
        order: this.order++
      });
    }
  }

  end() {
    const wrongH2 = new Set();
    this.h1ToH1ParentMap.forEach(({
      node: parent,
      order: h1Order
    }) => {
      for (let currentParent = parent; currentParent; currentParent = currentParent.parent) {
        const h2Nodes = this.h2ParentToH2Map.get(currentParent);
        if (!h2Nodes) continue;
        h2Nodes.forEach(({
          node: h2Node,
          order: h2Order
        }) => {
          if (h2Order < h1Order) wrongH2.add(h2Node);
        });
      }
    });
    const errors = [];
    wrongH2.forEach(node => {
      errors.push(new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["TextInvalidH2Position"](node.position));
    });
    return errors;
  }

  isH1(node) {
    const type = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'type');
    return type && type === 'h2';
  }

  isH2(node) {
    const type = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'type');
    return type && type === 'h3';
  }

}

/* harmony default export */ __webpack_exports__["default"] = (H2H3);

/***/ }),

/***/ "./src/rules/text/severalh1.js":
/*!*************************************!*\
  !*** ./src/rules/text/severalh1.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rulebase.js */ "./src/rules/rulebase.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/rules/utils.js");
/* harmony import */ var _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist.js */ "./src/error/errorlist.js");




class SeveralH1 extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['text']);
    this.h1was = false;
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this)
    };
  }

  in(node) {
    const type = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'type');
    if (type !== 'h1') return;

    if (!this.h1was) {
      this.h1was = true;
      return;
    }

    return new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["TextSeveralH1"](node.location);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SeveralH1);

/***/ }),

/***/ "./src/rules/utils.js":
/*!****************************!*\
  !*** ./src/rules/utils.js ***!
  \****************************/
/*! exports provided: Size, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Size", function() { return Size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
const sizesScale = ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];

class Size {
  /**
   * @param {string} size
   */
  constructor(size) {
    this.size = size;
  }
  /**
   * @param {number} count
   * @return {Size}
   */


  add(count) {
    let ind = sizesScale.indexOf(this.size);
    if (~ind) ind = ind + count;
    this.size = sizesScale[ind];
    return this;
  }

  check(sizeB) {
    return !!(this.size && sizeB) && this.size === sizeB;
  }

}

function isDef(x) {
  return x !== undefined;
}

function get(obj, ...props) {
  if (!obj || typeof obj !== 'object') // функции не предполагаются
    return undefined;
  let current = obj;

  for (let prop of props) {
    current = current[prop];
    if (!isDef(prop)) return undefined;
  }

  return current;
}



/***/ }),

/***/ "./src/rules/warning/buttonposition.js":
/*!*********************************************!*\
  !*** ./src/rules/warning/buttonposition.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rulebase.js */ "./src/rules/rulebase.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/rules/utils.js");
/* harmony import */ var _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist.js */ "./src/error/errorlist.js");




class ButtonPosition extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['warning', 'button', 'placeholder']); // Считаем, что блоки warning могут быть вложенными. Каждый вложенный блок warning создает свой Error boundary.

    this.warnings = []; // стек блоков warning

    this.placeholderNodes = new Map(); // храним 1 placeholder

    this.buttonNodes = new Map(); // храним 1 button
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this),
      [this.phases.out]: this.out.bind(this)
    };
  }

  in(node) {
    if (node.block === 'warning') {
      this.warnings.push(node);
      return;
    }

    const warning = this.getLastWarning();
    if (!warning) return; // TODO считаем, что в блоке warning не более 1 button и не более 1 placeholer (хотя это не обязано быть так)
    // В противном случае, непонятно как их матчить друг с другом (например в такой ситуации: button, placeholder, button)
    // и, соответственно, выдавать ошибки

    if (node.block === 'placeholder') {
      if (!this.placeholderNodes.has(warning)) {
        const invalidButton = this.buttonNodes.get(warning);
        this.placeholderNodes.set(warning, node);
        if (invalidButton) return new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["WarningInvalidButtonPosition"](invalidButton.location);
      }

      return;
    }

    if (node.block === 'button') {
      if (!this.buttonNodes.has(warning)) this.buttonNodes.set(warning, node);
    }
  }

  out(node) {
    if (node.block !== 'warning') return;
    const warning = this.warnings.pop();
    this.buttonNodes.delete(warning);
    this.placeholderNodes.delete(warning);
  }

  getLastWarning() {
    const length = this.warnings.length;
    return this.warnings[length - 1];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ButtonPosition);

/***/ }),

/***/ "./src/rules/warning/buttonsize.js":
/*!*****************************************!*\
  !*** ./src/rules/warning/buttonsize.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rulebase.js */ "./src/rules/rulebase.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/rules/utils.js");
/* harmony import */ var _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist.js */ "./src/error/errorlist.js");





class ButtonSize extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['warning', 'button', 'text']); // Считаем, что блоки warning могут быть вложенными. Каждый вложенный блок warning создает свой Error boundary.

    this.warnings = []; // стек блоков warning

    this.textNodes = new Map();
    this.buttonNodes = new Map();
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this),
      [this.phases.out]: this.out.bind(this)
    };
  }

  in(node) {
    if (node.block === 'warning') {
      this.warnings.push(node);
      return;
    }

    const warning = this.getLastWarning();
    if (!warning) return;

    if (node.block === 'text') {
      if (!this.textNodes.has(warning)) this.textNodes.set(warning, node);
      return;
    }

    if (!this.buttonNodes.has(warning)) this.buttonNodes.set(warning, []);
    const buttonNodes = this.buttonNodes.get(warning);
    buttonNodes.push(node);
  }

  out(node) {
    if (node.block !== 'warning') return;
    const warning = this.warnings.pop();
    const firstTextNode = this.textNodes.get(warning);
    const buttons = this.buttonNodes.get(warning);
    if (!buttons) return;
    this.textNodes.delete(warning);
    this.buttonNodes.delete(warning);
    if (!firstTextNode) return;
    const sizeValA = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(firstTextNode.mods, 'size');
    const size = new _utils_js__WEBPACK_IMPORTED_MODULE_1__["Size"](sizeValA);
    size.add(1);
    const errors = [];

    for (let button of buttons) {
      const sizeValB = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(button.mods, 'size');

      if (!size.check(sizeValB)) {
        const error = new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["WarningInvalidButtonSize"](button.location);
        errors.push(error);
      }
    }

    return errors;
  }

  getLastWarning() {
    const length = this.warnings.length;
    return this.warnings[length - 1];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ButtonSize);

/***/ }),

/***/ "./src/rules/warning/placeholdersize.js":
/*!**********************************************!*\
  !*** ./src/rules/warning/placeholdersize.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rulebase.js */ "./src/rules/rulebase.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/rules/utils.js");
/* harmony import */ var _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist.js */ "./src/error/errorlist.js");



const correctSizes = ['s', 'm', 'l'];

class PlaceholderSize extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['warning', 'placeholder']);
    this.warnings = []; // стек блоков warning
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this),
      [this.phases.out]: this.out.bind(this)
    };
  }

  in(node) {
    if (node.block === 'warning') {
      this.warnings.push(node);
      return;
    }

    const warning = this.getLastWarning();
    if (!warning) return;
    const size = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'size');
    const ind = correctSizes.indexOf(size);
    if (ind === -1) return new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["WarningInvalidPlaceholderSize"](node.location);
  }

  out(node) {
    if (node.block !== 'warning') return;
    const warning = this.warnings.pop();
  }

  getLastWarning() {
    const length = this.warnings.length;
    return this.warnings[length - 1];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PlaceholderSize);

/***/ }),

/***/ "./src/rules/warning/textsizes.js":
/*!****************************************!*\
  !*** ./src/rules/warning/textsizes.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rulebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rulebase.js */ "./src/rules/rulebase.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/rules/utils.js");
/* harmony import */ var _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist.js */ "./src/error/errorlist.js");




class TextSizes extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['warning', 'text']); // Считаем, что блоки warning могут быть вложенными. Каждый вложенный блок warning создает свой Error boundary.

    this.warnings = []; // стек блоков warning

    this.textNodes = new Map();
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this),
      [this.phases.out]: this.out.bind(this)
    };
  }

  in(node) {
    if (node.block === 'warning') {
      this.warnings.push(node);
      return;
    }

    const warning = this.getLastWarning();
    if (!warning) return;
    if (!this.textNodes.has(warning)) this.textNodes.set(warning, []);
    const textNodes = this.textNodes.get(warning);
    textNodes.push(node);
  }

  out(node) {
    if (node.block !== 'warning') return;
    const warning = this.warnings.pop();
    const textNodes = this.textNodes.get(warning);
    this.textNodes.delete(warning);
    if (!textNodes) return;
    const [first, ...other] = textNodes;
    const sizeValA = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(first.mods, 'size');
    const size = new _utils_js__WEBPACK_IMPORTED_MODULE_1__["Size"](sizeValA);

    for (let text of other) {
      const sizeValB = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(text.mods, 'size'); // Даже если в рамках одного блока несколько ошибочных слов, то вовращаем одну ошибку.

      if (!size.check(sizeValB)) return new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["WarningTextSizeShouldBeEqual"](node.location);
    }
  }

  getLastWarning() {
    const length = this.warnings.length;
    return this.warnings[length - 1];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TextSizes);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcmtldGluZy90b29tdWNoLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90ZXh0L2gxaDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDJoMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJCTE9DSyIsIkVMRU0iLCJDT05URU5UIiwiTU9EUyIsIk1JWCIsIkVMRU1NT0RTIiwiUFJPUFMiLCJsb2NhdGlvbktleSIsIkpzb25Tb3VyY2VNYXAiLCJrZXkiLCJCZW1Ob2RlIiwiY29uc3RydWN0b3IiLCJub2RlIiwicGFyZW50IiwiYmxvY2siLCJlbGVtIiwibW9kcyIsIm1peCIsImVsZW1Nb2RzIiwibG9jYXRpb24iLCJzZWxlY3RvciIsIldhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwiLCJMaW50RXJyb3IiLCJjb2RlIiwiZXJyb3IiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uIiwiV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUiLCJUZXh0U2V2ZXJhbEgxIiwiVGV4dEludmFsaWRIMlBvc2l0aW9uIiwiVGV4dEludmFsaWRIM1Bvc2l0aW9uIiwiR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MiLCJJbnZhbGlkSW5wdXQiLCJFcnJvciIsInBvc2l0aW9uS2V5IiwiU3ltYm9sIiwicmVzdWx0IiwicGFyc2UiLCJqc29uIiwiZGF0YSIsInBvaW50ZXJzIiwiZSIsIm1hdGNoIiwicGF0aCIsInZhbHVlIiwidmFsdWVFbmQiLCJzdGFydCIsImVuZCIsIm1hcCIsInZhbCIsImxpbmUiLCJjb2x1bW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJjaGlsZCIsImluZCIsInBoYXNlcyIsIlJ1bGVCYXNlIiwicHJvdG90eXBlIiwicnVsZUNsYXNzZXMiLCJiZW1Ob2RlIiwiY29udGVudEFzQXJyYXkiLCJjYWxsIiwiaW4iLCJuZXh0Iiwib3V0IiwibWVkaWF0b3IiLCJlcnJvcnMiLCJpbml0Iiwic3RyaW5nVHJlZSIsImF0dGFjaFJvb3QiLCJtYXBwZXIiLCJyb290IiwiZ2V0SnNvbiIsImNhbGxBbGwiLCJydWxlc0luc3RhbmNlcyIsInJDbGFzcyIsIlJ1bGVNZWRpYXRvciIsInBoYXNlIiwiYWRkRXJyb3JzIiwiZWwiLCJUZXh0U2l6ZXMiLCJCdXR0b25TaXplIiwiQnV0dG9uUG9zaXRpb24iLCJQbGFjZWhvbGRlclNpemUiLCJTZXZlcmFsSDEiLCJIMUgyIiwiSDJIMyIsIlRvb011Y2giLCJtYXJrZXRpbmdCbG9ja3MiLCJncmlkIiwiZ3JpZEZyYWN0aW9uIiwidG90YWxNYXJrZXRpbmciLCJnZXRQaGFzZUhhbmRsZXJzTWFwIiwiYmluZCIsInNpemUiLCJnZXQiLCJpbmNsdWRlcyIsImZ1bGxTaXplIiwidG90YWxJbmZvIiwic2VsZWN0b3JzIiwiZ2V0U2VsZWN0b3JzIiwiSGFuZGxlclR5cGUiLCJIYW5kbGVyc01hcFR5cGUiLCJoYW5kbGVyc01hcCIsImFsd2F5c0NhbGxlZEhhbmRsZXJzIiwiYnVpbGRNYXAiLCJydWxlIiwiaGFuZGxlciIsImxlbmd0aCIsInB1c2giLCJnZXRLZXkiLCJoYW5kbGVycyIsImhhbmRsZXJFcnJvcnMiLCJnZXRNZXJnZWRFcnJvcnMiLCJhbGxFcnJvcnMiLCJvdGhlckVycm9ycyIsImgxVG9IMVBhcmVudE1hcCIsIk1hcCIsImgyUGFyZW50VG9IMk1hcCIsIm9yZGVyIiwiaXNIMSIsInNldCIsImlzSDIiLCJoYXMiLCJoMk5vZGVzIiwid3JvbmdIMiIsIlNldCIsImgxT3JkZXIiLCJjdXJyZW50UGFyZW50IiwiaDJOb2RlIiwiaDJPcmRlciIsImFkZCIsInBvc2l0aW9uIiwidHlwZSIsImgxd2FzIiwic2l6ZXNTY2FsZSIsIlNpemUiLCJjb3VudCIsImluZGV4T2YiLCJjaGVjayIsInNpemVCIiwiaXNEZWYiLCJ4IiwidW5kZWZpbmVkIiwib2JqIiwicHJvcHMiLCJjdXJyZW50IiwicHJvcCIsIndhcm5pbmdzIiwicGxhY2Vob2xkZXJOb2RlcyIsImJ1dHRvbk5vZGVzIiwid2FybmluZyIsImdldExhc3RXYXJuaW5nIiwiaW52YWxpZEJ1dHRvbiIsInBvcCIsImRlbGV0ZSIsInRleHROb2RlcyIsImZpcnN0VGV4dE5vZGUiLCJidXR0b25zIiwic2l6ZVZhbEEiLCJidXR0b24iLCJzaXplVmFsQiIsImNvcnJlY3RTaXplcyIsImZpcnN0Iiwib3RoZXIiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0NBR0E7QUFDQTs7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsc0RBQUosQ0FBV0MsMERBQVgsQ0FBZjs7QUFFQUMsTUFBTSxDQUFDQyxJQUFQLEdBQWMsVUFBU0MsR0FBVCxFQUFjO0FBQ3hCLFNBQU9MLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZQyxHQUFaLENBQVA7QUFDSCxDQUZELEMsQ0FJQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RyxDQUFDdkQsSUFBRCxFQUFPO0FBQ04sUUFBSUEsSUFBSSxDQUFDRSxLQUFMLEtBQWUsU0FBbkIsRUFDSTtBQUVKLFVBQU00SSxPQUFPLEdBQUcsS0FBS0gsUUFBTCxDQUFjTSxHQUFkLEVBQWhCO0FBQ0EsVUFBTUUsU0FBUyxHQUFHLEtBQUtBLFNBQUwsQ0FBZTdELEdBQWYsQ0FBbUJ3RCxPQUFuQixDQUFsQjtBQUVBLFNBQUtLLFNBQUwsQ0FBZUQsTUFBZixDQUFzQkosT0FBdEI7QUFFQSxRQUFJLENBQUNLLFNBQUwsRUFDSTtBQUVKLFVBQU0sQ0FBQ08sS0FBRCxFQUFRLEdBQUdDLEtBQVgsSUFBb0JSLFNBQTFCO0FBQ0EsVUFBTUcsUUFBUSxHQUFHaEUscURBQUcsQ0FBQ29FLEtBQUssQ0FBQ3RKLElBQVAsRUFBYSxNQUFiLENBQXBCO0FBQ0EsVUFBTWlGLElBQUksR0FBRyxJQUFJMEMsOENBQUosQ0FBU3VCLFFBQVQsQ0FBYjs7QUFFQSxTQUFLLElBQUlNLElBQVQsSUFBaUJELEtBQWpCLEVBQXdCO0FBQ3BCLFlBQU1ILFFBQVEsR0FBR2xFLHFEQUFHLENBQUNzRSxJQUFJLENBQUN4SixJQUFOLEVBQVksTUFBWixDQUFwQixDQURvQixDQUdwQjs7QUFDQSxVQUFJLENBQUNpRixJQUFJLENBQUM2QyxLQUFMLENBQVdzQixRQUFYLENBQUwsRUFDSSxPQUFPLElBQUkvSSxnRkFBSixDQUFpQ1QsSUFBSSxDQUFDTyxRQUF0QyxDQUFQO0FBQ1A7QUFDSjs7QUFFRHdJLGdCQUFjLEdBQUc7QUFDYixVQUFNNUMsTUFBTSxHQUFHLEtBQUt3QyxRQUFMLENBQWN4QyxNQUE3QjtBQUVBLFdBQU8sS0FBS3dDLFFBQUwsQ0FBY3hDLE1BQU0sR0FBRyxDQUF2QixDQUFQO0FBQ0g7O0FBakU0Qjs7QUFvRWxCNUIsd0VBQWYsRSIsImZpbGUiOiJsaW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IExpbnRlciBmcm9tICcuL3NyYy9saW50ZXIuanMnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9zcmMvcnVsZXMvbGlzdC5qcydcclxuXHJcbi8vIFRPRE8gZm9yIHRlc3RcclxuLy8gaW1wb3J0IHt0ZXN0cywgYW5zd2Vyc30gZnJvbSBcIi4vdGVzdGNhc2VzLmpzXCI7XHJcblxyXG5jb25zdCBsaW50ZXIgPSBuZXcgTGludGVyKHJ1bGVzKTtcclxuXHJcbndpbmRvdy5saW50ID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbGludGVyLmxpbnQoc3RyKTtcclxufTtcclxuXHJcbi8vIFRPRE8gZm9yIHRlc3RcclxuLypcclxudGVzdHMuZm9yRWFjaCgodGVzdCwgaW5kKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSB3aW5kb3cubGludCh0ZXN0KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygndGVzdDogJyArIChpbmQgKyAxKSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG59KVxyXG4qL1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlc2NhcGVkQ2hhcnMgPSB7XG4gICdiJzogJ1xcYicsXG4gICdmJzogJ1xcZicsXG4gICduJzogJ1xcbicsXG4gICdyJzogJ1xccicsXG4gICd0JzogJ1xcdCcsXG4gICdcIic6ICdcIicsXG4gICcvJzogJy8nLFxuICAnXFxcXCc6ICdcXFxcJ1xufTtcblxudmFyIEFfQ09ERSA9ICdhJy5jaGFyQ29kZUF0KCk7XG5cblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIChzb3VyY2UsIF8sIG9wdGlvbnMpIHtcbiAgdmFyIHBvaW50ZXJzID0ge307XG4gIHZhciBsaW5lID0gMDtcbiAgdmFyIGNvbHVtbiA9IDA7XG4gIHZhciBwb3MgPSAwO1xuICB2YXIgYmlnaW50ID0gb3B0aW9ucyAmJiBvcHRpb25zLmJpZ2ludCAmJiB0eXBlb2YgQmlnSW50ICE9ICd1bmRlZmluZWQnO1xuICByZXR1cm4ge1xuICAgIGRhdGE6IF9wYXJzZSgnJywgdHJ1ZSksXG4gICAgcG9pbnRlcnM6IHBvaW50ZXJzXG4gIH07XG5cbiAgZnVuY3Rpb24gX3BhcnNlKHB0ciwgdG9wTGV2ZWwpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIGRhdGE7XG4gICAgbWFwKHB0ciwgJ3ZhbHVlJyk7XG4gICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICBjYXNlICd0JzogcmVhZCgncnVlJyk7IGRhdGEgPSB0cnVlOyBicmVhaztcbiAgICAgIGNhc2UgJ2YnOiByZWFkKCdhbHNlJyk7IGRhdGEgPSBmYWxzZTsgYnJlYWs7XG4gICAgICBjYXNlICduJzogcmVhZCgndWxsJyk7IGRhdGEgPSBudWxsOyBicmVhaztcbiAgICAgIGNhc2UgJ1wiJzogZGF0YSA9IHBhcnNlU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgY2FzZSAnWyc6IGRhdGEgPSBwYXJzZUFycmF5KHB0cik7IGJyZWFrO1xuICAgICAgY2FzZSAneyc6IGRhdGEgPSBwYXJzZU9iamVjdChwdHIpOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJhY2tDaGFyKCk7XG4gICAgICAgIGlmICgnLTAxMjM0NTY3ODknLmluZGV4T2YoY2hhcikgPj0gMClcbiAgICAgICAgICBkYXRhID0gcGFyc2VOdW1iZXIoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICAgIH1cbiAgICBtYXAocHRyLCAndmFsdWVFbmQnKTtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgaWYgKHRvcExldmVsICYmIHBvcyA8IHNvdXJjZS5sZW5ndGgpIHVuZXhwZWN0ZWRUb2tlbigpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gd2hpdGVzcGFjZSgpIHtcbiAgICBsb29wOlxuICAgICAgd2hpbGUgKHBvcyA8IHNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgc3dpdGNoIChzb3VyY2VbcG9zXSkge1xuICAgICAgICAgIGNhc2UgJyAnOiBjb2x1bW4rKzsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFx0JzogY29sdW1uICs9IDQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xccic6IGNvbHVtbiA9IDA7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcbic6IGNvbHVtbiA9IDA7IGxpbmUrKzsgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogYnJlYWsgbG9vcDtcbiAgICAgICAgfVxuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU3RyaW5nKCkge1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgY2hhcjtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICdcIicpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT0gJ1xcXFwnKSB7XG4gICAgICAgIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICAgIGlmIChjaGFyIGluIGVzY2FwZWRDaGFycylcbiAgICAgICAgICBzdHIgKz0gZXNjYXBlZENoYXJzW2NoYXJdO1xuICAgICAgICBlbHNlIGlmIChjaGFyID09ICd1JylcbiAgICAgICAgICBzdHIgKz0gZ2V0Q2hhckNvZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyICs9IGNoYXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU51bWJlcigpIHtcbiAgICB2YXIgbnVtU3RyID0gJyc7XG4gICAgdmFyIGludGVnZXIgPSB0cnVlO1xuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnLScpIG51bVN0ciArPSBnZXRDaGFyKCk7XG5cbiAgICBudW1TdHIgKz0gc291cmNlW3Bvc10gPT0gJzAnXG4gICAgICAgICAgICAgID8gZ2V0Q2hhcigpXG4gICAgICAgICAgICAgIDogZ2V0RGlnaXRzKCk7XG5cbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJy4nKSB7XG4gICAgICBudW1TdHIgKz0gZ2V0Q2hhcigpICsgZ2V0RGlnaXRzKCk7XG4gICAgICBpbnRlZ2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICdlJyB8fCBzb3VyY2VbcG9zXSA9PSAnRScpIHtcbiAgICAgIG51bVN0ciArPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoc291cmNlW3Bvc10gPT0gJysnIHx8IHNvdXJjZVtwb3NdID09ICctJykgbnVtU3RyICs9IGdldENoYXIoKTtcbiAgICAgIG51bVN0ciArPSBnZXREaWdpdHMoKTtcbiAgICAgIGludGVnZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gK251bVN0cjtcbiAgICByZXR1cm4gYmlnaW50ICYmIGludGVnZXIgJiYgKHJlc3VsdCA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IHJlc3VsdCA8IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSKVxuICAgICAgICAgICAgPyBCaWdJbnQobnVtU3RyKVxuICAgICAgICAgICAgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUFycmF5KHB0cikge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgYXJyID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIGlmIChnZXRDaGFyKCkgPT0gJ10nKSByZXR1cm4gYXJyO1xuICAgIGJhY2tDaGFyKCk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIGl0ZW1QdHIgPSBwdHIgKyAnLycgKyBpO1xuICAgICAgYXJyLnB1c2goX3BhcnNlKGl0ZW1QdHIpKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ10nKSBicmVhaztcbiAgICAgIGlmIChjaGFyICE9ICcsJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU9iamVjdChwdHIpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGlmIChnZXRDaGFyKCkgPT0gJ30nKSByZXR1cm4gb2JqO1xuICAgIGJhY2tDaGFyKCk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIGxvYyA9IGdldExvYygpO1xuICAgICAgaWYgKGdldENoYXIoKSAhPSAnXCInKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHZhciBrZXkgPSBwYXJzZVN0cmluZygpO1xuICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgbWFwTG9jKHByb3BQdHIsICdrZXknLCBsb2MpO1xuICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIGlmIChnZXRDaGFyKCkgIT0gJzonKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIG9ialtrZXldID0gX3BhcnNlKHByb3BQdHIpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnfScpIGJyZWFrO1xuICAgICAgaWYgKGNoYXIgIT0gJywnKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQoc3RyKSB7XG4gICAgZm9yICh2YXIgaT0wOyBpPHN0ci5sZW5ndGg7IGkrKylcbiAgICAgIGlmIChnZXRDaGFyKCkgIT09IHN0cltpXSkgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGFyKCkge1xuICAgIGNoZWNrVW5leHBlY3RlZEVuZCgpO1xuICAgIHZhciBjaGFyID0gc291cmNlW3Bvc107XG4gICAgcG9zKys7XG4gICAgY29sdW1uKys7IC8vIG5ldyBsaW5lP1xuICAgIHJldHVybiBjaGFyO1xuICB9XG5cbiAgZnVuY3Rpb24gYmFja0NoYXIoKSB7XG4gICAgcG9zLS07XG4gICAgY29sdW1uLS07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGFyQ29kZSgpIHtcbiAgICB2YXIgY291bnQgPSA0O1xuICAgIHZhciBjb2RlID0gMDtcbiAgICB3aGlsZSAoY291bnQtLSkge1xuICAgICAgY29kZSA8PD0gNDtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoY2hhciA+PSAnYScgJiYgY2hhciA8PSAnZicpXG4gICAgICAgIGNvZGUgKz0gY2hhci5jaGFyQ29kZUF0KCkgLSBBX0NPREUgKyAxMDtcbiAgICAgIGVsc2UgaWYgKGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBjb2RlICs9ICtjaGFyO1xuICAgICAgZWxzZVxuICAgICAgICB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaWdpdHMoKSB7XG4gICAgdmFyIGRpZ2l0cyA9ICcnO1xuICAgIHdoaWxlIChzb3VyY2VbcG9zXSA+PSAnMCcgJiYgc291cmNlW3Bvc10gPD0gJzknKVxuICAgICAgZGlnaXRzICs9IGdldENoYXIoKTtcblxuICAgIGlmIChkaWdpdHMubGVuZ3RoKSByZXR1cm4gZGlnaXRzO1xuICAgIGNoZWNrVW5leHBlY3RlZEVuZCgpO1xuICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwKHB0ciwgcHJvcCkge1xuICAgIG1hcExvYyhwdHIsIHByb3AsIGdldExvYygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcExvYyhwdHIsIHByb3AsIGxvYykge1xuICAgIHBvaW50ZXJzW3B0cl0gPSBwb2ludGVyc1twdHJdIHx8IHt9O1xuICAgIHBvaW50ZXJzW3B0cl1bcHJvcF0gPSBsb2M7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb2MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbmU6IGxpbmUsXG4gICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgIHBvczogcG9zXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZXhwZWN0ZWRUb2tlbigpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgdG9rZW4gJyArIHNvdXJjZVtwb3NdICsgJyBpbiBKU09OIGF0IHBvc2l0aW9uICcgKyBwb3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gd2FzVW5leHBlY3RlZFRva2VuKCkge1xuICAgIGJhY2tDaGFyKCk7XG4gICAgdW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1VuZXhwZWN0ZWRFbmQoKSB7XG4gICAgaWYgKHBvcyA+PSBzb3VyY2UubGVuZ3RoKVxuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIGVuZCBvZiBKU09OIGlucHV0Jyk7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAoZGF0YSwgXywgb3B0aW9ucykge1xuICBpZiAoIXZhbGlkVHlwZShkYXRhKSkgcmV0dXJuO1xuICB2YXIgd3NMaW5lID0gMDtcbiAgdmFyIHdzUG9zLCB3c0NvbHVtbjtcbiAgdmFyIHdoaXRlc3BhY2UgPSB0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnMuc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25zO1xuICBzd2l0Y2ggKHR5cGVvZiB3aGl0ZXNwYWNlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHZhciBsZW4gPSB3aGl0ZXNwYWNlID4gMTBcbiAgICAgICAgICAgICAgICAgID8gMTBcbiAgICAgICAgICAgICAgICAgIDogd2hpdGVzcGFjZSA8IDBcbiAgICAgICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgICAgIDogTWF0aC5mbG9vcih3aGl0ZXNwYWNlKTtcbiAgICAgIHdoaXRlc3BhY2UgPSBsZW4gJiYgcmVwZWF0KGxlbiwgJyAnKTtcbiAgICAgIHdzUG9zID0gbGVuO1xuICAgICAgd3NDb2x1bW4gPSBsZW47XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgd2hpdGVzcGFjZSA9IHdoaXRlc3BhY2Uuc2xpY2UoMCwgMTApO1xuICAgICAgd3NQb3MgPSAwO1xuICAgICAgd3NDb2x1bW4gPSAwO1xuICAgICAgZm9yICh2YXIgaj0wOyBqPHdoaXRlc3BhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIGNoYXIgPSB3aGl0ZXNwYWNlW2pdO1xuICAgICAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgICAgICBjYXNlICcgJzogd3NDb2x1bW4rKzsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFx0Jzogd3NDb2x1bW4gKz0gNDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxyJzogd3NDb2x1bW4gPSAwOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXG4nOiB3c0NvbHVtbiA9IDA7IHdzTGluZSsrOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ3doaXRlc3BhY2UgY2hhcmFjdGVycyBub3QgYWxsb3dlZCBpbiBKU09OJyk7XG4gICAgICAgIH1cbiAgICAgICAgd3NQb3MrKztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB3aGl0ZXNwYWNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIGpzb24gPSAnJztcbiAgdmFyIHBvaW50ZXJzID0ge307XG4gIHZhciBsaW5lID0gMDtcbiAgdmFyIGNvbHVtbiA9IDA7XG4gIHZhciBwb3MgPSAwO1xuICB2YXIgZXM2ID0gb3B0aW9ucyAmJiBvcHRpb25zLmVzNiAmJiB0eXBlb2YgTWFwID09ICdmdW5jdGlvbic7XG4gIF9zdHJpbmdpZnkoZGF0YSwgMCwgJycpO1xuICByZXR1cm4ge1xuICAgIGpzb246IGpzb24sXG4gICAgcG9pbnRlcnM6IHBvaW50ZXJzXG4gIH07XG5cbiAgZnVuY3Rpb24gX3N0cmluZ2lmeShfZGF0YSwgbHZsLCBwdHIpIHtcbiAgICBtYXAocHRyLCAndmFsdWUnKTtcbiAgICBzd2l0Y2ggKHR5cGVvZiBfZGF0YSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2JpZ2ludCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgb3V0KCcnICsgX2RhdGEpOyBicmVhaztcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIG91dChxdW90ZWQoX2RhdGEpKTsgYnJlYWs7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoX2RhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICBvdXQoJ251bGwnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgX2RhdGEudG9KU09OID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBvdXQocXVvdGVkKF9kYXRhLnRvSlNPTigpKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfZGF0YSkpIHtcbiAgICAgICAgICBzdHJpbmdpZnlBcnJheSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGVzNikge1xuICAgICAgICAgIGlmIChfZGF0YS5jb25zdHJ1Y3Rvci5CWVRFU19QRVJfRUxFTUVOVClcbiAgICAgICAgICAgIHN0cmluZ2lmeUFycmF5KCk7XG4gICAgICAgICAgZWxzZSBpZiAoX2RhdGEgaW5zdGFuY2VvZiBNYXApXG4gICAgICAgICAgICBzdHJpbmdpZnlNYXBTZXQoKTtcbiAgICAgICAgICBlbHNlIGlmIChfZGF0YSBpbnN0YW5jZW9mIFNldClcbiAgICAgICAgICAgIHN0cmluZ2lmeU1hcFNldCh0cnVlKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBzdHJpbmdpZnlPYmplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHJpbmdpZnlPYmplY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXAocHRyLCAndmFsdWVFbmQnKTtcblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeUFycmF5KCkge1xuICAgICAgaWYgKF9kYXRhLmxlbmd0aCkge1xuICAgICAgICBvdXQoJ1snKTtcbiAgICAgICAgdmFyIGl0ZW1MdmwgPSBsdmwgKyAxO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8X2RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSkgb3V0KCcsJyk7XG4gICAgICAgICAgaW5kZW50KGl0ZW1MdmwpO1xuICAgICAgICAgIHZhciBpdGVtID0gdmFsaWRUeXBlKF9kYXRhW2ldKSA/IF9kYXRhW2ldIDogbnVsbDtcbiAgICAgICAgICB2YXIgaXRlbVB0ciA9IHB0ciArICcvJyArIGk7XG4gICAgICAgICAgX3N0cmluZ2lmeShpdGVtLCBpdGVtTHZsLCBpdGVtUHRyKTtcbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCddJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ1tdJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5T2JqZWN0KCkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhfZGF0YSk7XG4gICAgICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgb3V0KCd7Jyk7XG4gICAgICAgIHZhciBwcm9wTHZsID0gbHZsICsgMTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBfZGF0YVtrZXldO1xuICAgICAgICAgIGlmICh2YWxpZFR5cGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoaSkgb3V0KCcsJyk7XG4gICAgICAgICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICAgICAgICBpbmRlbnQocHJvcEx2bCk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleScpO1xuICAgICAgICAgICAgb3V0KHF1b3RlZChrZXkpKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICAgICAgICBvdXQoJzonKTtcbiAgICAgICAgICAgIGlmICh3aGl0ZXNwYWNlKSBvdXQoJyAnKTtcbiAgICAgICAgICAgIF9zdHJpbmdpZnkodmFsdWUsIHByb3BMdmwsIHByb3BQdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCd9Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ3t9Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5TWFwU2V0KGlzU2V0KSB7XG4gICAgICBpZiAoX2RhdGEuc2l6ZSkge1xuICAgICAgICBvdXQoJ3snKTtcbiAgICAgICAgdmFyIHByb3BMdmwgPSBsdmwgKyAxO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICB2YXIgZW50cmllcyA9IF9kYXRhLmVudHJpZXMoKTtcbiAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllcy5uZXh0KCk7XG4gICAgICAgIHdoaWxlICghZW50cnkuZG9uZSkge1xuICAgICAgICAgIHZhciBpdGVtID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgdmFyIGtleSA9IGl0ZW1bMF07XG4gICAgICAgICAgdmFyIHZhbHVlID0gaXNTZXQgPyB0cnVlIDogaXRlbVsxXTtcbiAgICAgICAgICBpZiAodmFsaWRUeXBlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKCFmaXJzdCkgb3V0KCcsJyk7XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgICAgICAgaW5kZW50KHByb3BMdmwpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXknKTtcbiAgICAgICAgICAgIG91dChxdW90ZWQoa2V5KSk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgICAgICAgb3V0KCc6Jyk7XG4gICAgICAgICAgICBpZiAod2hpdGVzcGFjZSkgb3V0KCcgJyk7XG4gICAgICAgICAgICBfc3RyaW5naWZ5KHZhbHVlLCBwcm9wTHZsLCBwcm9wUHRyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCd9Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ3t9Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb3V0KHN0cikge1xuICAgIGNvbHVtbiArPSBzdHIubGVuZ3RoO1xuICAgIHBvcyArPSBzdHIubGVuZ3RoO1xuICAgIGpzb24gKz0gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5kZW50KGx2bCkge1xuICAgIGlmICh3aGl0ZXNwYWNlKSB7XG4gICAgICBqc29uICs9ICdcXG4nICsgcmVwZWF0KGx2bCwgd2hpdGVzcGFjZSk7XG4gICAgICBsaW5lKys7XG4gICAgICBjb2x1bW4gPSAwO1xuICAgICAgd2hpbGUgKGx2bC0tKSB7XG4gICAgICAgIGlmICh3c0xpbmUpIHtcbiAgICAgICAgICBsaW5lICs9IHdzTGluZTtcbiAgICAgICAgICBjb2x1bW4gPSB3c0NvbHVtbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW4gKz0gd3NDb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgcG9zICs9IHdzUG9zO1xuICAgICAgfVxuICAgICAgcG9zICs9IDE7IC8vIFxcbiBjaGFyYWN0ZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXAocHRyLCBwcm9wKSB7XG4gICAgcG9pbnRlcnNbcHRyXSA9IHBvaW50ZXJzW3B0cl0gfHwge307XG4gICAgcG9pbnRlcnNbcHRyXVtwcm9wXSA9IHtcbiAgICAgIGxpbmU6IGxpbmUsXG4gICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgIHBvczogcG9zXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGVhdChuLCBzdHIpIHtcbiAgICByZXR1cm4gQXJyYXkobiArIDEpLmpvaW4oc3RyKTtcbiAgfVxufTtcblxuXG52YXIgVkFMSURfVFlQRVMgPSBbJ251bWJlcicsICdiaWdpbnQnLCAnYm9vbGVhbicsICdzdHJpbmcnLCAnb2JqZWN0J107XG5mdW5jdGlvbiB2YWxpZFR5cGUoZGF0YSkge1xuICByZXR1cm4gVkFMSURfVFlQRVMuaW5kZXhPZih0eXBlb2YgZGF0YSkgPj0gMDtcbn1cblxuXG52YXIgRVNDX1FVT1RFID0gL1wifFxcXFwvZztcbnZhciBFU0NfQiA9IC9bXFxiXS9nO1xudmFyIEVTQ19GID0gL1xcZi9nO1xudmFyIEVTQ19OID0gL1xcbi9nO1xudmFyIEVTQ19SID0gL1xcci9nO1xudmFyIEVTQ19UID0gL1xcdC9nO1xuZnVuY3Rpb24gcXVvdGVkKHN0cikge1xuICBzdHIgPSBzdHIucmVwbGFjZShFU0NfUVVPVEUsICdcXFxcJCYnKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfRiwgJ1xcXFxmJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX0IsICdcXFxcYicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19OLCAnXFxcXG4nKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfUiwgJ1xcXFxyJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX1QsICdcXFxcdCcpO1xuICByZXR1cm4gJ1wiJyArIHN0ciArICdcIic7XG59XG5cblxudmFyIEVTQ18wID0gL34vZztcbnZhciBFU0NfMSA9IC9cXC8vZztcbmZ1bmN0aW9uIGVzY2FwZUpzb25Qb2ludGVyKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoRVNDXzAsICd+MCcpXG4gICAgICAgICAgICAucmVwbGFjZShFU0NfMSwgJ34xJyk7XG59XG4iLCJpbXBvcnQgUFJPUFMgZnJvbSAnLi9wcm9wbmFtZXMuanMnO1xyXG5pbXBvcnQgSnNvblNvdXJjZU1hcCBmcm9tICcuL2pzb25zb3VyY2VtYXAuanMnO1xyXG5cclxuY29uc3Qge0JMT0NLLCBFTEVNLCBDT05URU5ULCBNT0RTLCBNSVgsIEVMRU1NT0RTfSA9IFBST1BTO1xyXG5jb25zdCBsb2NhdGlvbktleSA9IEpzb25Tb3VyY2VNYXAua2V5O1xyXG5cclxuY2xhc3MgQmVtTm9kZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXHJcbiAgICAgKiBAcGFyYW0ge0JlbU5vZGV9IHBhcmVudFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLmJsb2NrID0gbm9kZVtCTE9DS107XHJcbiAgICAgICAgdGhpcy5lbGVtID0gbm9kZVtFTEVNXTtcclxuICAgICAgICB0aGlzLm1vZHMgPSBub2RlW01PRFNdO1xyXG4gICAgICAgIHRoaXMubWl4ID0gbm9kZVtNSVhdO1xyXG4gICAgICAgIHRoaXMuZWxlbU1vZHMgPSBub2RlW0VMRU1NT0RTXTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG5vZGVbbG9jYXRpb25LZXldO1xyXG5cclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy5ibG9jayArICh0aGlzLmVsZW0gPyAoYF9fJHt0aGlzLmVsZW19YCkgOiAnJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlbU5vZGU7IiwiaW1wb3J0IExpbnRFcnJvciBmcm9tICcuL2xpbnRlcnJvci5qcyc7XHJcblxyXG5jbGFzcyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5URVhUX1NJWkVTX1NIT1VMRF9CRV9FUVVBTCcsIGVycm9yOiAn0KLQtdC60YHRgtGLINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC90Ysg0LHRi9GC0Ywg0L7QtNC90L7Qs9C+INGA0LDQt9C80LXRgNCwLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fU0laRScsIGVycm9yOiAn0KDQsNC30LzQtdGAINC60L3QvtC/0LrQuCDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC90LAgMSDRiNCw0LMg0LHQvtC70YzRiNC1INGN0YLQsNC70L7QvdC90L7Qs9C+LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1BPU0lUSU9OJywgZXJyb3I6ICfQkdC70L7QuiBidXR0b24g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9C+0YHQu9C1INCx0LvQvtC60LAgcGxhY2Vob2xkZXIuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfUExBQ0VIT0xERVJfU0laRScsIGVycm9yOiAn0JTQvtC/0YPRgdGC0LjQvNGL0LUg0YDQsNC30LzQtdGA0Ysg0LTQu9GPINCx0LvQvtC60LAgcGxhY2Vob2xkZXIg0LIg0LHQu9C+0LrQtSB3YXJuaW5nOiBzLCBtLCBsLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTZXZlcmFsSDEgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULlNFVkVSQUxfSDEnLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQtdC00LjQvdGB0YLQstC10L3QvdGL0LwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIMlBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gyX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgzUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDNfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDRgtGA0LXRgtGM0LXQs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdHUklELlRPT19NVUNIX01BUktFVElOR19CTE9DS1MnLCBlcnJvcjogJ9Cc0LDRgNC60LXRgtC40L3Qs9C+0LLRi9C1INCx0LvQvtC60Lgg0L3QtSDQvNC+0LPRg9GCINC30LDQvdC40LzQsNGC0Ywg0LHQvtC70YzRiNC1INC/0L7Qu9C+0LLQuNC90Ysg0L7RgiDQstGB0LXRhSDQutC+0LvQvtC90L7QuiDQsdC70L7QutCwIGdyaWQnLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24sXHJcbiAgICBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFRleHRTZXZlcmFsSDEsXHJcbiAgICBUZXh0SW52YWxpZEgyUG9zaXRpb24sXHJcbiAgICBUZXh0SW52YWxpZEgzUG9zaXRpb24sXHJcbiAgICBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc1xyXG59IiwiXHJcbmNsYXNzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7Y29kZSwgZXJyb3IsIGxvY2F0aW9ufSkge1xyXG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludEVycm9yOyIsIlxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyDQndC10YDQsNC30YDQtdGI0LjQvNGL0LUg0L7RiNC40LHQutC4LCDQv9C+0YHQu9C1INC60L7RgtC+0YDRi9GFINC/0YDQtdC60YDQsNGJ0LDQtdC8INGA0LDQsdC+0YLRgy4g0JjRhSDRh9C40YHQu9C+INC80L7QttC10YIg0YHQvtC60YDQsNGJ0LDRgtGM0YHRj1xyXG4gKiDQv9C+INC80LXRgNC1INC00L7QsdCw0LLQu9C10L3QuNGPINC90L7QstGL0YUg0L/RgNCw0LLQuNC7INCyINC70LjQvdGC0LXRgC5cclxuICovXHJcbmNsYXNzIEludmFsaWRJbnB1dCBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiSW52YWxpZCBpbnB1dFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEludmFsaWRJbnB1dFxyXG59IiwiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcg0JDQtNCw0L/RgtC10YAg0YTRg9C90LrRhtC40LggcGFyc2Ug0LjQtyDQsdC40LHQu9C40L7RgtC10LrQuCBqc29uLXNvdXJjZS1tYXBcclxuICovXHJcblxyXG5pbXBvcnQge3BhcnNlfSBmcm9tICdqc29uLXNvdXJjZS1tYXAnO1xyXG5pbXBvcnQgUFJPUFMgZnJvbSAnLi9wcm9wbmFtZXMuanMnO1xyXG5pbXBvcnQge0ludmFsaWRJbnB1dH0gZnJvbSBcIi4vZXJyb3Ivc3lzdGVtLmpzXCI7XHJcblxyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcblxyXG5jb25zdCBwb3NpdGlvbktleSA9IFN5bWJvbCgnUG9zaXRpb24nKTtcclxuXHJcbmNsYXNzIEpzb25Tb3VyY2VNYXAge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN0cikge1xyXG4gICAgICAgIHRoaXMuc3RyID0gc3RyO1xyXG4gICAgICAgIHRoaXMuanNvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wb2ludGVycyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SnNvbiA9ICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZSh0aGlzLnN0cik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmpzb24gPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludGVycyA9IHJlc3VsdC5wb2ludGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZElucHV0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGNoKHRoaXMuanNvbiwgJycpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYXRjaCA9IChub2RlLCBwYXRoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCB2YWx1ZUVuZH0gPSB0aGlzLnBvaW50ZXJzW3BhdGhdO1xyXG5cclxuICAgICAgICAvLyArMSDQuiBjb2wsINGCLtC6LiDQsdC40LHQu9C40L7RgtC10LrQsCDQstC10LTQtdGCINC+0YLRgdGH0LXRgiDQvtGCIDAuXHJcbiAgICAgICAgLy8g0J/RgNC4INGN0YLQvtC8IGxpbmUg0LHQtdC3INC40LfQvNC10L3QtdC90LjRjywg0YIu0LouINC40YHRhdC+0LTQvdGL0LkgSlNPTiDQvtCx0LXRgNC90YPQu9C4ICjQv9C+0LvQvtC20LjQu9C4INCy0L3Rg9GC0YDRjCDRgdCy0L7QudGB0YLQstCwIFwiY29udGVudFwiKVxyXG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IFt2YWx1ZSwgdmFsdWVFbmRdLm1hcCh2YWwgPT4gKHtsaW5lOiB2YWwubGluZSwgY29sdW1uOiB2YWwuY29sdW1uICsgMX0pKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGVbQ09OVEVOVF07XHJcblxyXG4gICAgICAgIG5vZGVbcG9zaXRpb25LZXldID0ge3N0YXJ0LCBlbmR9O1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkcmVuKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKGNoaWxkLCBgJHtwYXRofS8ke0NPTlRFTlR9LyR7aW5kfWApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGRyZW4sIGAke3BhdGh9LyR7Q09OVEVOVH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBrZXkgPSBwb3NpdGlvbktleTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSnNvblNvdXJjZU1hcDsiLCJpbXBvcnQgUFJPUFMgZnJvbSBcIi4vcHJvcG5hbWVzLmpzXCI7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcbmltcG9ydCBCZW1Ob2RlIGZyb20gJy4vYmVtbm9kZS5qcyc7XHJcbmltcG9ydCBSdWxlTWVkaWF0b3IgZnJvbSAnLi9ydWxlcy9ydWxlbWVkaWF0b3IuanMnO1xyXG5pbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4vcnVsZXMvcnVsZWJhc2UuanNcIjtcclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgTGludGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTwhUnVsZUJhc2U+fSBydWxlQ2xhc3Nlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihydWxlQ2xhc3NlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlQ2xhc3NlcyA9IHJ1bGVDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBsaW50KHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdHJpbmdUcmVlID0gdGhpcy5hdHRhY2hSb290KHN0cik7XHJcbiAgICAgICAgY29uc3QgbWFwcGVyID0gbmV3IEpzb25Tb3VyY2VNYXAoc3RyaW5nVHJlZSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG1hcHBlci5nZXRKc29uKHN0cmluZ1RyZWUpO1xyXG5cclxuICAgICAgICB0aGlzLm5leHQocm9vdCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsKHBoYXNlcy5lbmQpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGZpbHRlciBlcnJvcnNcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCBydWxlc0luc3RhbmNlcyA9IHRoaXMucnVsZUNsYXNzZXMubWFwKHJDbGFzcyA9PiBuZXcgckNsYXNzKCkpO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbmV3IFJ1bGVNZWRpYXRvcihydWxlc0luc3RhbmNlcyk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDQktGF0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC+0LHRitC10LrRgtC+0Lwg0LjQu9C4INC80LDRgdGB0LjQstC+0LwgKNC00LXRgNC10LLQviDQuNC70Lgg0LvQtdGBKS4g0JTQvtCx0LDQstC40Lwg0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQutC+0YDQtdC90YwsINGH0YLQvtCx0Ysg0LLRgdC10LPQtNCwINCx0YvQu9C+INC00LXRgNC10LLQvi4gKi9cclxuICAgIGF0dGFjaFJvb3QgPSBzdHIgPT4gYHtcIiR7Q09OVEVOVH1cIjpcXG4ke3N0cn1cXG59YDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXHJcbiAgICAgKiBAcGFyYW0ge0JlbU5vZGV9IHBhcmVudFxyXG4gICAgICovXHJcbiAgICBuZXh0ID0gKG5vZGUsIHBhcmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJlbU5vZGUgPSBuZXcgQmVtTm9kZShub2RlLCBwYXJlbnQpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jb250ZW50QXNBcnJheShub2RlW0NPTlRFTlRdKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsKHBoYXNlcy5pbiwgYmVtTm9kZSk7XHJcblxyXG4gICAgICAgIGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KGNoaWxkLCBiZW1Ob2RlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsKHBoYXNlcy5vdXQsIGJlbU5vZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5tZWRpYXRvci5jYWxsKHBoYXNlLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5tZWRpYXRvci5jYWxsQWxsKHBoYXNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcnJvcnMoZXJyb3JzKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbLi4uZXJyb3JzLCAuLi50aGlzLmVycm9yc107XHJcbiAgICB9XHJcblxyXG4gICAgY29udGVudEFzQXJyYXkoZWwpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbCkpXHJcbiAgICAgICAgICAgIHJldHVybiBlbDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsID8gW2VsXSA6IFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW50ZXI7IiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgQkxPQ0s6IFwiYmxvY2tcIixcclxuICAgIEVMRU06IFwiZWxlbVwiLFxyXG4gICAgQ09OVEVOVDogXCJjb250ZW50XCIsXHJcbiAgICBNT0RTOiBcIm1vZHNcIixcclxuICAgIE1JWDogXCJtaXhcIixcclxuICAgIEVMRU1NT0RTOiAnZWxlbU1vZHMnXHJcbn07IiwiaW1wb3J0IFRleHRTaXplcyBmcm9tICcuL3dhcm5pbmcvdGV4dHNpemVzLmpzJ1xyXG5pbXBvcnQgQnV0dG9uU2l6ZSBmcm9tICcuL3dhcm5pbmcvYnV0dG9uc2l6ZS5qcydcclxuaW1wb3J0IEJ1dHRvblBvc2l0aW9uIGZyb20gJy4vd2FybmluZy9idXR0b25wb3NpdGlvbi5qcydcclxuaW1wb3J0IFBsYWNlaG9sZGVyU2l6ZSBmcm9tICcuL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzJ1xyXG5pbXBvcnQgU2V2ZXJhbEgxIGZyb20gJy4vdGV4dC9zZXZlcmFsaDEuanMnXHJcbmltcG9ydCBIMUgyIGZyb20gJy4vdGV4dC9oMWgyLmpzJ1xyXG5pbXBvcnQgSDJIMyBmcm9tICcuL3RleHQvaDJoMy5qcydcclxuaW1wb3J0IFRvb011Y2ggZnJvbSAnLi9tYXJrZXRpbmcvdG9vbXVjaC5qcydcclxuXHJcbmNvbnN0IHJ1bGVzID0gW1xyXG4gICAgVGV4dFNpemVzLCBCdXR0b25TaXplLCBCdXR0b25Qb3NpdGlvbiwgUGxhY2Vob2xkZXJTaXplLFxyXG4gICAgU2V2ZXJhbEgxLCBIMUgyLCBIMkgzLFxyXG4gICAgVG9vTXVjaFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcnVsZXM7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7R3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3N9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3RcIjtcclxuXHJcbmNvbnN0IG1hcmtldGluZ0Jsb2NrcyA9IFsnY29tbWVyY2lhbCcsICdvZmZlciddO1xyXG5cclxuY2xhc3MgVG9vTXVjaCBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnZ3JpZCcsICdncmlkX19mcmFjdGlvbicsIC4uLm1hcmtldGluZ0Jsb2Nrc10pO1xyXG5cclxuICAgICAgICB0aGlzLmdyaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAodGhpcy5ncmlkICYmIG5vZGUuc2VsZWN0b3IgPT09ICdncmlkX19mcmFjdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBub2RlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdncmlkJykge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSBub2RlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmdyaWRGcmFjdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplID0gK2dldCh0aGlzLmdyaWRGcmFjdGlvbi5lbGVtTW9kcywgJ20tY29sJyk7XHJcblxyXG4gICAgICAgIGlmIChtYXJrZXRpbmdCbG9ja3MuaW5jbHVkZXMobm9kZS5ibG9jaykpXHJcbiAgICAgICAgICAgIHRoaXMudG90YWxNYXJrZXRpbmcgKz0gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLnNlbGVjdG9yID09PSAnZ3JpZF9fZnJhY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnZ3JpZCcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZnVsbFNpemUgPSArZ2V0KG5vZGUubW9kcywgJ20tY29sdW1ucycpO1xyXG4gICAgICAgIGxldCBlcnJvcjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxNYXJrZXRpbmcgKiAyID49IGZ1bGxTaXplKVxyXG4gICAgICAgICAgICBlcnJvciA9IG5ldyBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrcyhub2RlLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbEluZm8gPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvb011Y2g7IiwiXHJcbmNsYXNzIFJ1bGVCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICog0J3QsNCx0L7RgCDRgdC10LvQtdC60YLQvtGA0L7QsiAoQmVtTm9kZS5zZWxlY3Rvcikg0YPQt9C70L7Qsiwg0L3QsCDQutC+0YLQvtGA0YvRhSDQsdGD0LTQtdGCINGB0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L/RgNCw0LLQuNC70L4uXHJcbiAgICAgKiDQldGB0LvQuCDQvdC1INC30LDQtNCw0L0gLSDQsdGD0LTQtdGCINGB0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L3QsCDQutCw0LbQtNC+0Lwg0YPQt9C70LUgKFRPRE8pLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2VsZWN0b3JzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9ycyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSBzZWxlY3RvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VsZWN0b3JzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge09iamVjdDxSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzLCBSdWxlQmFzZS5IYW5kbGVyVHlwZT59XHJcbiAgICAgKi9cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgLy8gVE9ETyBlcnJvciBlbWl0dGluZ1xyXG4gICAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBAZW51bXtzdHJpbmd9ICovXHJcblJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMgPSB7XHJcbiAgICAvKiDQktGF0L7QtNC40Lwg0LIg0L7Rh9C10YDQtdC00L3QvtC5INGD0LfQtdC7INC00LXRgNC10LLQsCovXHJcbiAgICBpbjogJ2luJyxcclxuICAgIC8qINCS0YvRhdC+0LTQuNC8ICovXHJcbiAgICBvdXQ6ICdvdXQnLFxyXG4gICAgLyog0JfQsNC60LDQvdGH0LjQstCw0LXQvCDQvtCx0YXQvtC0INC00LXRgNC10LLQsCAqL1xyXG4gICAgZW5kOiAnZW5kJ1xyXG59O1xyXG5cclxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihCZW1Ob2RlKTogKCFMaW50RXJyb3J8dW5kZWZpbmVkKX0gKi9cclxuUnVsZUJhc2UuSGFuZGxlclR5cGU7XHJcblxyXG4vKiogQHR5cGVkZWYge09iamVjdDxSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzLCBPYmplY3Q8c3RyaW5nLCBSdWxlQmFzZS5IYW5kbGVyVHlwZT4+fSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyc01hcFR5cGU7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZUJhc2U7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gJy4vcnVsZWJhc2UuanMnO1xyXG5cclxuY29uc3QgcGhhc2VzID0gUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcztcclxuXHJcbmNsYXNzIFJ1bGVNZWRpYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMgPSBydWxlcztcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyc01hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuYWx3YXlzQ2FsbGVkSGFuZGxlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmJ1aWxkTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRNYXAoKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5mb3JFYWNoKHJ1bGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBydWxlLmdldFNlbGVjdG9ycygpO1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyc01hcCA9IHJ1bGUuZ2V0UGhhc2VIYW5kbGVyc01hcCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgcGhhc2UgaW4gaGFuZGxlcnNNYXApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVyc01hcFtwaGFzZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RvcnMubGVuZ3RoICYmIHBoYXNlICE9PSBwaGFzZXMuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbHdheXNDYWxsZWRIYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhbmRsZXJzTWFwW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzTWFwW2tleV0ucHVzaChoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRLZXkocGhhc2UsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHBoYXNlICsgJyQnICsgc2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheTwhTGludEVycm9yPn1cclxuICAgICAqL1xyXG4gICAgY2FsbChwaGFzZSwgYmVtTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5KHBoYXNlLCBiZW1Ob2RlLnNlbGVjdG9yKTtcclxuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwW2tleV0gfHwgW107XHJcbiAgICAgICAgbGV0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICBoYW5kbGVycyA9IFsuLi5oYW5kbGVycywgLi4udGhpcy5hbHdheXNDYWxsZWRIYW5kbGVyc107XHJcblxyXG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJFcnJvcnMgPSBoYW5kbGVyKGJlbU5vZGUpO1xyXG5cclxuICAgICAgICAgICAgZXJyb3JzID0gdGhpcy5nZXRNZXJnZWRFcnJvcnMoZXJyb3JzLCBoYW5kbGVyRXJyb3JzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgbGV0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKVtwaGFzZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyRXJyb3JzID0gaGFuZGxlcihudWxsKTtcclxuXHJcbiAgICAgICAgICAgIGVycm9ycyA9IHRoaXMuZ2V0TWVyZ2VkRXJyb3JzKGVycm9ycywgaGFuZGxlckVycm9ycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVyZ2VkRXJyb3JzKGFsbEVycm9ycywgb3RoZXJFcnJvcnMpIHtcclxuICAgICAgICBpZiAoIW90aGVyRXJyb3JzKVxyXG4gICAgICAgICAgICByZXR1cm4gYWxsRXJyb3JzO1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvdGhlckVycm9ycykpXHJcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWxsRXJyb3JzLCAuLi5vdGhlckVycm9yc107XHJcblxyXG4gICAgICAgIHJldHVybiBbLi4uYWxsRXJyb3JzLCBvdGhlckVycm9yc107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJ1bGVNZWRpYXRvcjsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0SW52YWxpZEgyUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIEgxSDIgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXA8QmVtTm9kZSwge25vZGU6IEJlbU5vZGUsIG9yZGVyOiBudW1iZXJ9Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcCA9IG5ldyBNYXAoKTsgLy8ge2gxLW5vZGUsIGgxLXBhcmVudCB3aXRoIG9yZGVyfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXA8QmVtTm9kZSwgQXJyYXk8e25vZGU6IEJlbU5vZGUsIG9yZGVyOiBudW1iZXJ9Pj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5oMlBhcmVudFRvSDJNYXAgPSBuZXcgTWFwKCk7IC8vIHtwYXJlbnQsIGgyLWNoaWxkcyB3aXRoIG9yZGVyfVxyXG5cclxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cclxuICAgICAgICB0aGlzLm9yZGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmVuZF06IHRoaXMuZW5kLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSDEobm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAuc2V0KG5vZGUsIHtub2RlOiBub2RlLnBhcmVudCwgb3JkZXI6IHRoaXMub3JkZXIrK30pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNIMihub2RlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBub2RlLnBhcmVudDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oMlBhcmVudFRvSDJNYXAuaGFzKHBhcmVudCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmgyUGFyZW50VG9IMk1hcC5zZXQocGFyZW50LCBbXSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoMk5vZGVzID0gdGhpcy5oMlBhcmVudFRvSDJNYXAuZ2V0KHBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICBoMk5vZGVzLnB1c2goe25vZGU6IG5vZGUsIG9yZGVyOiB0aGlzLm9yZGVyKyt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5kKCkge1xyXG4gICAgICAgIGNvbnN0IHdyb25nSDIgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwLmZvckVhY2goKHtub2RlOiBwYXJlbnQsIG9yZGVyOiBoMU9yZGVyfSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50OyBjdXJyZW50UGFyZW50OyBjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGgyTm9kZXMgPSB0aGlzLmgyUGFyZW50VG9IMk1hcC5nZXQoY3VycmVudFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFoMk5vZGVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGgyTm9kZXMuZm9yRWFjaCgoe25vZGU6IGgyTm9kZSwgb3JkZXI6IGgyT3JkZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGgyT3JkZXIgPCBoMU9yZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0gyLmFkZChoMk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgd3JvbmdIMi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChuZXcgVGV4dEludmFsaWRIMlBvc2l0aW9uKG5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpc0gxKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgJiYgdHlwZSA9PT0gJ2gxJztcclxuICAgIH1cclxuXHJcbiAgICBpc0gyKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgJiYgdHlwZSA9PT0gJ2gyJztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSDFIMjsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0SW52YWxpZEgyUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbi8vIFRPRE8g0Y3RgtC+IGNvcHktcGFzdGUg0YLQtdGB0YLQsCBoMWgyLmpzINGBINC30LDQvNC10L3QvtC5IGgxIC0+IGgyINCyINC80LXRgtC+0LTQtSBpc0gxINC4IGgyIC0+IGgzINCyINC80LXRgtC+0LTQtSBpc0gyXHJcblxyXG5jbGFzcyBIMkgzIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7TWFwPEJlbU5vZGUsIHtub2RlOiBCZW1Ob2RlLCBvcmRlcjogbnVtYmVyfT59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAgPSBuZXcgTWFwKCk7IC8vIHtoMS1ub2RlLCBoMS1wYXJlbnQgd2l0aCBvcmRlcn1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7TWFwPEJlbU5vZGUsIEFycmF5PHtub2RlOiBCZW1Ob2RlLCBvcmRlcjogbnVtYmVyfT4+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaDJQYXJlbnRUb0gyTWFwID0gbmV3IE1hcCgpOyAvLyB7cGFyZW50LCBoMi1jaGlsZHMgd2l0aCBvcmRlcn1cclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXHJcbiAgICAgICAgdGhpcy5vcmRlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5lbmRdOiB0aGlzLmVuZC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0gxKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwLnNldChub2RlLCB7bm9kZTogbm9kZS5wYXJlbnQsIG9yZGVyOiB0aGlzLm9yZGVyKyt9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzSDIobm9kZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaDJQYXJlbnRUb0gyTWFwLmhhcyhwYXJlbnQpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oMlBhcmVudFRvSDJNYXAuc2V0KHBhcmVudCwgW10pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaDJOb2RlcyA9IHRoaXMuaDJQYXJlbnRUb0gyTWFwLmdldChwYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgaDJOb2Rlcy5wdXNoKHtub2RlOiBub2RlLCBvcmRlcjogdGhpcy5vcmRlcisrfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZCgpIHtcclxuICAgICAgICBjb25zdCB3cm9uZ0gyID0gbmV3IFNldCgpO1xyXG5cclxuICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcC5mb3JFYWNoKCh7bm9kZTogcGFyZW50LCBvcmRlcjogaDFPcmRlcn0pID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY3VycmVudFBhcmVudCA9IHBhcmVudDsgY3VycmVudFBhcmVudDsgY3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnQucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoMk5vZGVzID0gdGhpcy5oMlBhcmVudFRvSDJNYXAuZ2V0KGN1cnJlbnRQYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaDJOb2RlcylcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBoMk5vZGVzLmZvckVhY2goKHtub2RlOiBoMk5vZGUsIG9yZGVyOiBoMk9yZGVyfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoMk9yZGVyIDwgaDFPcmRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdIMi5hZGQoaDJOb2RlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIHdyb25nSDIuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2gobmV3IFRleHRJbnZhbGlkSDJQb3NpdGlvbihub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIMShub2RlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdldChub2RlLm1vZHMsICd0eXBlJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlICYmIHR5cGUgPT09ICdoMic7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIMihub2RlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdldChub2RlLm1vZHMsICd0eXBlJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlICYmIHR5cGUgPT09ICdoMyc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEgySDM7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7VGV4dFNldmVyYWxIMX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuXHJcbmNsYXNzIFNldmVyYWxIMSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgdGhpcy5oMXdhcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgIT09ICdoMScpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmgxd2FzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDF3YXMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0U2V2ZXJhbEgxKG5vZGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXZlcmFsSDE7IiwiXHJcbmNvbnN0IHNpemVzU2NhbGUgPSBbXCJ4eHhzXCIsIFwieHhzXCIsIFwieHNcIiwgXCJzXCIsIFwibVwiLCBcImxcIiwgXCJ4bFwiLCBcInh4bFwiLCBcInh4eGxcIiwgXCJ4eHh4bFwiLCBcInh4eHh4bFwiXTtcclxuXHJcbmNsYXNzIFNpemUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2l6ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxyXG4gICAgICogQHJldHVybiB7U2l6ZX1cclxuICAgICAqL1xyXG4gICAgYWRkKGNvdW50KSB7XHJcbiAgICAgICAgbGV0IGluZCA9IHNpemVzU2NhbGUuaW5kZXhPZih0aGlzLnNpemUpO1xyXG5cclxuICAgICAgICBpZiAofmluZClcclxuICAgICAgICAgICAgaW5kID0gaW5kICsgY291bnQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemVzU2NhbGVbaW5kXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2soc2l6ZUIpIHtcclxuICAgICAgICByZXR1cm4gISEodGhpcy5zaXplICYmIHNpemVCKSAmJiB0aGlzLnNpemUgPT09IHNpemVCO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaXNEZWYoeCkge1xyXG4gICAgcmV0dXJuIHggIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldChvYmosIC4uLnByb3BzKSB7XHJcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgLy8g0YTRg9C90LrRhtC40Lgg0L3QtSDQv9GA0LXQtNC/0L7Qu9Cw0LPQsNGO0YLRgdGPXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICBsZXQgY3VycmVudCA9IG9iajtcclxuXHJcbiAgICBmb3IgKGxldCBwcm9wIG9mIHByb3BzKSB7XHJcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XHJcblxyXG4gICAgICAgIGlmICghaXNEZWYocHJvcCkpXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgU2l6ZSxcclxuICAgIGdldFxyXG59IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAnYnV0dG9uJywgJ3BsYWNlaG9sZGVyJ10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJOb2RlcyA9IG5ldyBNYXAoKTsgLy8g0YXRgNCw0L3QuNC8IDEgcGxhY2Vob2xkZXJcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzID0gbmV3IE1hcCgpOyAvLyDRhdGA0LDQvdC40LwgMSBidXR0b25cclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFRPRE8g0YHRh9C40YLQsNC10LwsINGH0YLQviDQsiDQsdC70L7QutC1IHdhcm5pbmcg0L3QtSDQsdC+0LvQtdC1IDEgYnV0dG9uINC4INC90LUg0LHQvtC70LXQtSAxIHBsYWNlaG9sZXIgKNGF0L7RgtGPINGN0YLQviDQvdC1INC+0LHRj9C30LDQvdC+INCx0YvRgtGMINGC0LDQuilcclxuICAgICAgICAvLyDQkiDQv9GA0L7RgtC40LLQvdC+0Lwg0YHQu9GD0YfQsNC1LCDQvdC10L/QvtC90Y/RgtC90L4g0LrQsNC6INC40YUg0LzQsNGC0YfQuNGC0Ywg0LTRgNGD0LMg0YEg0LTRgNGD0LPQvtC8ICjQvdCw0L/RgNC40LzQtdGAINCyINGC0LDQutC+0Lkg0YHQuNGC0YPQsNGG0LjQuDogYnV0dG9uLCBwbGFjZWhvbGRlciwgYnV0dG9uKVxyXG4gICAgICAgIC8vINC4LCDRgdC+0L7RgtCy0LXRgtGB0YLQstC10L3QvdC+LCDQstGL0LTQsNCy0LDRgtGMINC+0YjQuNCx0LrQuFxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAncGxhY2Vob2xkZXInKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlck5vZGVzLmhhcyh3YXJuaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW52YWxpZEJ1dHRvbiA9IHRoaXMuYnV0dG9uTm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJOb2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGludmFsaWRCdXR0b24pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uKGludmFsaWRCdXR0b24ubG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ2J1dHRvbicpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbk5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJOb2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Qb3NpdGlvbjsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblNpemV9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuaW1wb3J0IHtUZXh0SW52YWxpZEgyUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3RcIjtcclxuXHJcbmNsYXNzIEJ1dHRvblNpemUgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAnYnV0dG9uJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlcyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHROb2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbk5vZGVzID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGJ1dHRvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0VGV4dE5vZGUgPSB0aGlzLnRleHROb2Rlcy5nZXQod2FybmluZyk7XHJcbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuYnV0dG9uTm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIWJ1dHRvbnMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIWZpcnN0VGV4dE5vZGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZVZhbEEgPSBnZXQoZmlyc3RUZXh0Tm9kZS5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIHNpemUuYWRkKDEpO1xyXG5cclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZVZhbEIgPSBnZXQoYnV0dG9uLm1vZHMsICdzaXplJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXNpemUuY2hlY2soc2l6ZVZhbEIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUoYnV0dG9uLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TaXplOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jb25zdCBjb3JyZWN0U2l6ZXMgPSBbJ3MnLCAnbScsICdsJ107XHJcblxyXG5jbGFzcyBQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAncGxhY2Vob2xkZXInXSk7XHJcblxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSBnZXQobm9kZS5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IGluZCA9IGNvcnJlY3RTaXplcy5pbmRleE9mKHNpemUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbmQgPT09IC0xKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplKG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYWNlaG9sZGVyU2l6ZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBUZXh0U2l6ZXMgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAndGV4dCddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnRleHROb2RlcyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50ZXh0Tm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICB0aGlzLnRleHROb2Rlcy5zZXQod2FybmluZywgW10pO1xyXG5cclxuICAgICAgICBjb25zdCB0ZXh0Tm9kZXMgPSB0aGlzLnRleHROb2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIHRleHROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuICAgICAgICBjb25zdCB0ZXh0Tm9kZXMgPSB0aGlzLnRleHROb2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0Tm9kZXMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgW2ZpcnN0LCAuLi5vdGhlcl0gPSB0ZXh0Tm9kZXM7XHJcbiAgICAgICAgY29uc3Qgc2l6ZVZhbEEgPSBnZXQoZmlyc3QubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBzaXplID0gbmV3IFNpemUoc2l6ZVZhbEEpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB0ZXh0IG9mIG90aGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemVWYWxCID0gZ2V0KHRleHQubW9kcywgJ3NpemUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vINCU0LDQttC1INC10YHQu9C4INCyINGA0LDQvNC60LDRhSDQvtC00L3QvtCz0L4g0LHQu9C+0LrQsCDQvdC10YHQutC+0LvRjNC60L4g0L7RiNC40LHQvtGH0L3Ri9GFINGB0LvQvtCyLCDRgtC+INCy0L7QstGA0LDRidCw0LXQvCDQvtC00L3RgyDQvtGI0LjQsdC60YMuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZS5jaGVjayhzaXplVmFsQikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwobm9kZS5sb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFNpemVzOyJdLCJzb3VyY2VSb290IjoiIn0=