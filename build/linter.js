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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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


const linter = new _src_linter_js__WEBPACK_IMPORTED_MODULE_0__["default"](_src_rules_list_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

window.lint = function (str) {
  return linter.lint(str);
};

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
  MIX
} = _propnames_js__WEBPACK_IMPORTED_MODULE_0__["default"];
const locationKey = _jsonsourcemap_js__WEBPACK_IMPORTED_MODULE_1__["default"].key;

class BemNode {
  /**
   * @param {Object} node
   */
  constructor(node) {
    this.block = node[BLOCK];
    this.elem = node[ELEM];
    this.mods = node[MODS];
    this.mix = node[MIX];
    this.location = node[locationKey];
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
        // TODO error emitting
        throw new Error("Invalid input data");
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
        col: val.column + 1
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

    _defineProperty(this, "next", node => {
      const bemNode = new _bemnode_js__WEBPACK_IMPORTED_MODULE_2__["default"](node);
      const children = this.contentAsArray(node[CONTENT]);
      this.call(phases.in, bemNode);
      children.map(child => {
        this.next(child);
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
    this.next(root);
    this.callAll(phases.end); // TODO filter errors

    return this.serializeErrors(); // return this.errors;
  }

  init() {
    const rulesInstances = this.ruleClasses.map(rClass => new rClass());
    this.mediator = new _rules_rulemediator_js__WEBPACK_IMPORTED_MODULE_3__["default"](rulesInstances);
    this.errors = [];
  }
  /* Вход может быть объектом или массивом (дерево или лес). Добавим виртуальный корень, всегда было дерево. */


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

  serializeErrors() {
    return this.errors.map(({
      code,
      error,
      location
    }) => {
      const {
        start,
        end
      } = location;
      const serializedLocation = {
        "start": {},
        "end": {}
      };
      serializedLocation["start"] = {
        "column": location.start.col,
        "line": location.start.line
      };
      serializedLocation["end"] = {
        "column": location.end.col,
        "line": location.end.line
      };
      return {
        "code": code,
        "error": error,
        "location": serializedLocation
      };
    });
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
  MIX: "mix"
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



const rules = [_warning_textsizes_js__WEBPACK_IMPORTED_MODULE_0__["default"], _warning_buttonsize_js__WEBPACK_IMPORTED_MODULE_1__["default"], _warning_buttonposition_js__WEBPACK_IMPORTED_MODULE_2__["default"]];
/* harmony default export */ __webpack_exports__["default"] = (rules);

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
    const handlers = this.handlersMap[key] || [];
    const errors = handlers.map(handler => handler(bemNode));
    return errors.filter(result => result);
  }

  callAll(phase) {
    const errors = [];
    this.rules.forEach(rule => {
      const handler = rule.getPhaseHandlersMap()[phase];
      if (handler) errors.push(handler(null));
    });
    return errors.filter(result => result);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (RuleMediator);

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
    if (!warning) return;

    if (node.block === 'placeholder') {
      if (!this.placeholderNodes.has(warning)) {
        this.placeholderNodes.set(warning, node);
        if (this.buttonNodes.has(warning)) return new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["WarningInvalidButtonPosition"](warning.location);
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
    this.buttonNodes.delete(warning); // TODO error emitting
    // TODO предполагаем, что текстовые ноды обязаны быть, т.к. иначе эталонный размер не определен и поедут другие правила. Проверить предположение.

    if (!firstTextNode) throw "Invalid JSON";
    const sizeValA = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(firstTextNode.mods, 'size');
    const size = new _utils_js__WEBPACK_IMPORTED_MODULE_1__["Size"](sizeValA);
    size.add(1);

    for (let button of buttons) {
      const sizeValB = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(button.mods, 'size'); // Даже если в рамках одного блока несколько ошибочных слов, то вовращаем одну ошибку.

      if (!size.check(sizeValB)) return new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["WarningInvalidButtonSize"](node.location);
    }
  }

  getLastWarning() {
    const length = this.warnings.length;
    return this.warnings[length - 1];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ButtonSize);

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
    this.textNodes.delete(warning); // TODO error emitting
    // TODO предполагаем, что текстовые ноды обязаны быть, т.к. иначе эталонный размер не определен и поедут другие правила. Проверить предположение.

    if (!textNodes) throw "Invalid JSON";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzb25zb3VyY2VtYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpbnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvcG5hbWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvd2FybmluZy9idXR0b25wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvd2FybmluZy9idXR0b25zaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJCTE9DSyIsIkVMRU0iLCJDT05URU5UIiwiTU9EUyIsIk1JWCIsIlBST1BTIiwibG9jYXRpb25LZXkiLCJKc29uU291cmNlTWFwIiwia2V5IiwiQmVtTm9kZSIsImNvbnN0cnVjdG9yIiwibm9kZSIsImJsb2NrIiwiZWxlbSIsIm1vZHMiLCJtaXgiLCJsb2NhdGlvbiIsInNlbGVjdG9yIiwiV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCIsIkxpbnRFcnJvciIsImNvZGUiLCJlcnJvciIsIldhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSIsIldhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24iLCJXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSIsIlRleHRTZXZlcmFsSDEiLCJUZXh0SW52YWxpZEgyUG9zaXRpb24iLCJUZXh0SW52YWxpZEgzUG9zaXRpb24iLCJHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2NrcyIsInBvc2l0aW9uS2V5IiwiU3ltYm9sIiwicmVzdWx0IiwicGFyc2UiLCJqc29uIiwiZGF0YSIsInBvaW50ZXJzIiwiZSIsIkVycm9yIiwibWF0Y2giLCJwYXRoIiwidmFsdWUiLCJ2YWx1ZUVuZCIsInN0YXJ0IiwiZW5kIiwibWFwIiwidmFsIiwibGluZSIsImNvbCIsImNvbHVtbiIsImNoaWxkcmVuIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImNoaWxkIiwiaW5kIiwicGhhc2VzIiwiUnVsZUJhc2UiLCJwcm90b3R5cGUiLCJydWxlQ2xhc3NlcyIsImJlbU5vZGUiLCJjb250ZW50QXNBcnJheSIsImNhbGwiLCJpbiIsIm5leHQiLCJvdXQiLCJtZWRpYXRvciIsImVycm9ycyIsImluaXQiLCJzdHJpbmdUcmVlIiwiYXR0YWNoUm9vdCIsIm1hcHBlciIsInJvb3QiLCJnZXRKc29uIiwiY2FsbEFsbCIsInNlcmlhbGl6ZUVycm9ycyIsInJ1bGVzSW5zdGFuY2VzIiwickNsYXNzIiwiUnVsZU1lZGlhdG9yIiwicGhhc2UiLCJhZGRFcnJvcnMiLCJzZXJpYWxpemVkTG9jYXRpb24iLCJlbCIsIlRleHRTaXplcyIsIkJ1dHRvblNpemUiLCJCdXR0b25Qb3NpdGlvbiIsInNlbGVjdG9ycyIsImdldFNlbGVjdG9ycyIsImdldFBoYXNlSGFuZGxlcnNNYXAiLCJIYW5kbGVyVHlwZSIsIkhhbmRsZXJzTWFwVHlwZSIsImhhbmRsZXJzTWFwIiwiYnVpbGRNYXAiLCJydWxlIiwiaGFuZGxlciIsImdldEtleSIsInB1c2giLCJoYW5kbGVycyIsImZpbHRlciIsInNpemVzU2NhbGUiLCJTaXplIiwic2l6ZSIsImFkZCIsImNvdW50IiwiaW5kZXhPZiIsImNoZWNrIiwic2l6ZUIiLCJpc0RlZiIsIngiLCJ1bmRlZmluZWQiLCJnZXQiLCJvYmoiLCJwcm9wcyIsImN1cnJlbnQiLCJwcm9wIiwid2FybmluZ3MiLCJwbGFjZWhvbGRlck5vZGVzIiwiTWFwIiwiYnV0dG9uTm9kZXMiLCJiaW5kIiwid2FybmluZyIsImdldExhc3RXYXJuaW5nIiwiaGFzIiwic2V0IiwicG9wIiwiZGVsZXRlIiwibGVuZ3RoIiwidGV4dE5vZGVzIiwiZmlyc3RUZXh0Tm9kZSIsImJ1dHRvbnMiLCJzaXplVmFsQSIsImJ1dHRvbiIsInNpemVWYWxCIiwiZmlyc3QiLCJvdGhlciIsInRleHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsc0RBQUosQ0FBV0MsMERBQVgsQ0FBZjs7QUFFQUMsTUFBTSxDQUFDQyxJQUFQLEdBQWMsVUFBU0MsR0FBVCxFQUFjO0FBQ3hCLFNBQU9MLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZQyxHQUFaLENBQVA7QUFDSCxDQUZELEM7Ozs7Ozs7Ozs7OztBQ0xhOztBQUVi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QjtBQUNwQixZQUFNRixRQUFRLEdBQUd0QixxREFBRyxDQUFDeUIsSUFBSSxDQUFDeEgsSUFBTixFQUFZLE1BQVosQ0FBcEIsQ0FEb0IsQ0FHcEI7O0FBQ0EsVUFBSSxDQUFDc0YsSUFBSSxDQUFDSSxLQUFMLENBQVcyQixRQUFYLENBQUwsRUFDSSxPQUFPLElBQUlqSCxnRkFBSixDQUFpQ1AsSUFBSSxDQUFDSyxRQUF0QyxDQUFQO0FBQ1A7QUFDSjs7QUFFRHdHLGdCQUFjLEdBQUc7QUFDYixVQUFNSyxNQUFNLEdBQUcsS0FBS1gsUUFBTCxDQUFjVyxNQUE3QjtBQUVBLFdBQU8sS0FBS1gsUUFBTCxDQUFjVyxNQUFNLEdBQUcsQ0FBdkIsQ0FBUDtBQUNIOztBQW5FNEI7O0FBc0VsQjNDLHdFQUFmLEUiLCJmaWxlIjoibGludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTGludGVyIGZyb20gJy4vc3JjL2xpbnRlci5qcyc7XHJcbmltcG9ydCBydWxlcyBmcm9tICcuL3NyYy9ydWxlcy9saXN0LmpzJ1xyXG5cclxuY29uc3QgbGludGVyID0gbmV3IExpbnRlcihydWxlcyk7XHJcblxyXG53aW5kb3cubGludCA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgcmV0dXJuIGxpbnRlci5saW50KHN0cik7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVzY2FwZWRDaGFycyA9IHtcbiAgJ2InOiAnXFxiJyxcbiAgJ2YnOiAnXFxmJyxcbiAgJ24nOiAnXFxuJyxcbiAgJ3InOiAnXFxyJyxcbiAgJ3QnOiAnXFx0JyxcbiAgJ1wiJzogJ1wiJyxcbiAgJy8nOiAnLycsXG4gICdcXFxcJzogJ1xcXFwnXG59O1xuXG52YXIgQV9DT0RFID0gJ2EnLmNoYXJDb2RlQXQoKTtcblxuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgXywgb3B0aW9ucykge1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBiaWdpbnQgPSBvcHRpb25zICYmIG9wdGlvbnMuYmlnaW50ICYmIHR5cGVvZiBCaWdJbnQgIT0gJ3VuZGVmaW5lZCc7XG4gIHJldHVybiB7XG4gICAgZGF0YTogX3BhcnNlKCcnLCB0cnVlKSxcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfcGFyc2UocHRyLCB0b3BMZXZlbCkge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgZGF0YTtcbiAgICBtYXAocHRyLCAndmFsdWUnKTtcbiAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgIGNhc2UgJ3QnOiByZWFkKCdydWUnKTsgZGF0YSA9IHRydWU7IGJyZWFrO1xuICAgICAgY2FzZSAnZic6IHJlYWQoJ2Fsc2UnKTsgZGF0YSA9IGZhbHNlOyBicmVhaztcbiAgICAgIGNhc2UgJ24nOiByZWFkKCd1bGwnKTsgZGF0YSA9IG51bGw7IGJyZWFrO1xuICAgICAgY2FzZSAnXCInOiBkYXRhID0gcGFyc2VTdHJpbmcoKTsgYnJlYWs7XG4gICAgICBjYXNlICdbJzogZGF0YSA9IHBhcnNlQXJyYXkocHRyKTsgYnJlYWs7XG4gICAgICBjYXNlICd7JzogZGF0YSA9IHBhcnNlT2JqZWN0KHB0cik7IGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYmFja0NoYXIoKTtcbiAgICAgICAgaWYgKCctMDEyMzQ1Njc4OScuaW5kZXhPZihjaGFyKSA+PSAwKVxuICAgICAgICAgIGRhdGEgPSBwYXJzZU51bWJlcigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICBpZiAodG9wTGV2ZWwgJiYgcG9zIDwgc291cmNlLmxlbmd0aCkgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZXNwYWNlKCkge1xuICAgIGxvb3A6XG4gICAgICB3aGlsZSAocG9zIDwgc291cmNlLmxlbmd0aCkge1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZVtwb3NdKSB7XG4gICAgICAgICAgY2FzZSAnICc6IGNvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiBjb2x1bW4gKz0gNDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxyJzogY29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogY29sdW1uID0gMDsgbGluZSsrOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBicmVhayBsb29wO1xuICAgICAgICB9XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTdHJpbmcoKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuICAgIHZhciBjaGFyO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ1wiJykge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnXFxcXCcpIHtcbiAgICAgICAgY2hhciA9IGdldENoYXIoKTtcbiAgICAgICAgaWYgKGNoYXIgaW4gZXNjYXBlZENoYXJzKVxuICAgICAgICAgIHN0ciArPSBlc2NhcGVkQ2hhcnNbY2hhcl07XG4gICAgICAgIGVsc2UgaWYgKGNoYXIgPT0gJ3UnKVxuICAgICAgICAgIHN0ciArPSBnZXRDaGFyQ29kZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgKz0gY2hhcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTnVtYmVyKCkge1xuICAgIHZhciBudW1TdHIgPSAnJztcbiAgICB2YXIgaW50ZWdlciA9IHRydWU7XG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICctJykgbnVtU3RyICs9IGdldENoYXIoKTtcblxuICAgIG51bVN0ciArPSBzb3VyY2VbcG9zXSA9PSAnMCdcbiAgICAgICAgICAgICAgPyBnZXRDaGFyKClcbiAgICAgICAgICAgICAgOiBnZXREaWdpdHMoKTtcblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnLicpIHtcbiAgICAgIG51bVN0ciArPSBnZXRDaGFyKCkgKyBnZXREaWdpdHMoKTtcbiAgICAgIGludGVnZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJ2UnIHx8IHNvdXJjZVtwb3NdID09ICdFJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKTtcbiAgICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnKycgfHwgc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgbnVtU3RyICs9IGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSArbnVtU3RyO1xuICAgIHJldHVybiBiaWdpbnQgJiYgaW50ZWdlciAmJiAocmVzdWx0ID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgcmVzdWx0IDwgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpXG4gICAgICAgICAgICA/IEJpZ0ludChudW1TdHIpXG4gICAgICAgICAgICA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQXJyYXkocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKGdldENoYXIoKSA9PSAnXScpIHJldHVybiBhcnI7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgaXRlbVB0ciA9IHB0ciArICcvJyArIGk7XG4gICAgICBhcnIucHVzaChfcGFyc2UoaXRlbVB0cikpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXScpIGJyZWFrO1xuICAgICAgaWYgKGNoYXIgIT0gJywnKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlT2JqZWN0KHB0cikge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgb2JqID0ge307XG4gICAgaWYgKGdldENoYXIoKSA9PSAnfScpIHJldHVybiBvYmo7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgbG9jID0gZ2V0TG9jKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICdcIicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgdmFyIGtleSA9IHBhcnNlU3RyaW5nKCk7XG4gICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICBtYXBMb2MocHJvcFB0ciwgJ2tleScsIGxvYyk7XG4gICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaWYgKGdldENoYXIoKSAhPSAnOicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgb2JqW2tleV0gPSBfcGFyc2UocHJvcFB0cik7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICd9JykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZChzdHIpIHtcbiAgICBmb3IgKHZhciBpPTA7IGk8c3RyLmxlbmd0aDsgaSsrKVxuICAgICAgaWYgKGdldENoYXIoKSAhPT0gc3RyW2ldKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXIoKSB7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdmFyIGNoYXIgPSBzb3VyY2VbcG9zXTtcbiAgICBwb3MrKztcbiAgICBjb2x1bW4rKzsgLy8gbmV3IGxpbmU/XG4gICAgcmV0dXJuIGNoYXI7XG4gIH1cblxuICBmdW5jdGlvbiBiYWNrQ2hhcigpIHtcbiAgICBwb3MtLTtcbiAgICBjb2x1bW4tLTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXJDb2RlKCkge1xuICAgIHZhciBjb3VudCA9IDQ7XG4gICAgdmFyIGNvZGUgPSAwO1xuICAgIHdoaWxlIChjb3VudC0tKSB7XG4gICAgICBjb2RlIDw8PSA0O1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChjaGFyID49ICdhJyAmJiBjaGFyIDw9ICdmJylcbiAgICAgICAgY29kZSArPSBjaGFyLmNoYXJDb2RlQXQoKSAtIEFfQ09ERSArIDEwO1xuICAgICAgZWxzZSBpZiAoY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIGNvZGUgKz0gK2NoYXI7XG4gICAgICBlbHNlXG4gICAgICAgIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpZ2l0cygpIHtcbiAgICB2YXIgZGlnaXRzID0gJyc7XG4gICAgd2hpbGUgKHNvdXJjZVtwb3NdID49ICcwJyAmJiBzb3VyY2VbcG9zXSA8PSAnOScpXG4gICAgICBkaWdpdHMgKz0gZ2V0Q2hhcigpO1xuXG4gICAgaWYgKGRpZ2l0cy5sZW5ndGgpIHJldHVybiBkaWdpdHM7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXAocHRyLCBwcm9wKSB7XG4gICAgbWFwTG9jKHB0ciwgcHJvcCwgZ2V0TG9jKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwTG9jKHB0ciwgcHJvcCwgbG9jKSB7XG4gICAgcG9pbnRlcnNbcHRyXSA9IHBvaW50ZXJzW3B0cl0gfHwge307XG4gICAgcG9pbnRlcnNbcHRyXVtwcm9wXSA9IGxvYztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvYygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdW5leHBlY3RlZFRva2VuKCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCB0b2tlbiAnICsgc291cmNlW3Bvc10gKyAnIGluIEpTT04gYXQgcG9zaXRpb24gJyArIHBvcyk7XG4gIH1cblxuICBmdW5jdGlvbiB3YXNVbmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgYmFja0NoYXIoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVW5leHBlY3RlZEVuZCgpIHtcbiAgICBpZiAocG9zID49IHNvdXJjZS5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIEpTT04gaW5wdXQnKTtcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChkYXRhLCBfLCBvcHRpb25zKSB7XG4gIGlmICghdmFsaWRUeXBlKGRhdGEpKSByZXR1cm47XG4gIHZhciB3c0xpbmUgPSAwO1xuICB2YXIgd3NQb3MsIHdzQ29sdW1uO1xuICB2YXIgd2hpdGVzcGFjZSA9IHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5zcGFjZVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnM7XG4gIHN3aXRjaCAodHlwZW9mIHdoaXRlc3BhY2UpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgdmFyIGxlbiA9IHdoaXRlc3BhY2UgPiAxMFxuICAgICAgICAgICAgICAgICAgPyAxMFxuICAgICAgICAgICAgICAgICAgOiB3aGl0ZXNwYWNlIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICAgOiBNYXRoLmZsb29yKHdoaXRlc3BhY2UpO1xuICAgICAgd2hpdGVzcGFjZSA9IGxlbiAmJiByZXBlYXQobGVuLCAnICcpO1xuICAgICAgd3NQb3MgPSBsZW47XG4gICAgICB3c0NvbHVtbiA9IGxlbjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICB3aGl0ZXNwYWNlID0gd2hpdGVzcGFjZS5zbGljZSgwLCAxMCk7XG4gICAgICB3c1BvcyA9IDA7XG4gICAgICB3c0NvbHVtbiA9IDA7XG4gICAgICBmb3IgKHZhciBqPTA7IGo8d2hpdGVzcGFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY2hhciA9IHdoaXRlc3BhY2Vbal07XG4gICAgICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgICAgIGNhc2UgJyAnOiB3c0NvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiB3c0NvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiB3c0NvbHVtbiA9IDA7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcbic6IHdzQ29sdW1uID0gMDsgd3NMaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGluIEpTT04nKTtcbiAgICAgICAgfVxuICAgICAgICB3c1BvcysrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdoaXRlc3BhY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIganNvbiA9ICcnO1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBlczYgPSBvcHRpb25zICYmIG9wdGlvbnMuZXM2ICYmIHR5cGVvZiBNYXAgPT0gJ2Z1bmN0aW9uJztcbiAgX3N0cmluZ2lmeShkYXRhLCAwLCAnJyk7XG4gIHJldHVybiB7XG4gICAganNvbjoganNvbixcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfc3RyaW5naWZ5KF9kYXRhLCBsdmwsIHB0cikge1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHN3aXRjaCAodHlwZW9mIF9kYXRhKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBvdXQoJycgKyBfZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgb3V0KHF1b3RlZChfZGF0YSkpOyBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChfZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIG91dCgnbnVsbCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfZGF0YS50b0pTT04gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG91dChxdW90ZWQoX2RhdGEudG9KU09OKCkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9kYXRhKSkge1xuICAgICAgICAgIHN0cmluZ2lmeUFycmF5KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXM2KSB7XG4gICAgICAgICAgaWYgKF9kYXRhLmNvbnN0cnVjdG9yLkJZVEVTX1BFUl9FTEVNRU5UKVxuICAgICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgICBlbHNlIGlmIChfZGF0YSBpbnN0YW5jZW9mIE1hcClcbiAgICAgICAgICAgIHN0cmluZ2lmeU1hcFNldCgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgU2V0KVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KHRydWUpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5QXJyYXkoKSB7XG4gICAgICBpZiAoX2RhdGEubGVuZ3RoKSB7XG4gICAgICAgIG91dCgnWycpO1xuICAgICAgICB2YXIgaXRlbUx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxfZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICBpbmRlbnQoaXRlbUx2bCk7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB2YWxpZFR5cGUoX2RhdGFbaV0pID8gX2RhdGFbaV0gOiBudWxsO1xuICAgICAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgICAgICBfc3RyaW5naWZ5KGl0ZW0sIGl0ZW1MdmwsIGl0ZW1QdHIpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ10nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgnW10nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlPYmplY3QoKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9kYXRhKTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgICBvdXQoJ3snKTtcbiAgICAgICAgdmFyIHByb3BMdmwgPSBsdmwgKyAxO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlNYXBTZXQoaXNTZXQpIHtcbiAgICAgIGlmIChfZGF0YS5zaXplKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIHZhciBlbnRyaWVzID0gX2RhdGEuZW50cmllcygpO1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgd2hpbGUgKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICB2YXIga2V5ID0gaXRlbVswXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpc1NldCA/IHRydWUgOiBpdGVtWzFdO1xuICAgICAgICAgIGlmICh2YWxpZFR5cGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoIWZpcnN0KSBvdXQoJywnKTtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICAgICAgICBpbmRlbnQocHJvcEx2bCk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleScpO1xuICAgICAgICAgICAgb3V0KHF1b3RlZChrZXkpKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICAgICAgICBvdXQoJzonKTtcbiAgICAgICAgICAgIGlmICh3aGl0ZXNwYWNlKSBvdXQoJyAnKTtcbiAgICAgICAgICAgIF9zdHJpbmdpZnkodmFsdWUsIHByb3BMdmwsIHByb3BQdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvdXQoc3RyKSB7XG4gICAgY29sdW1uICs9IHN0ci5sZW5ndGg7XG4gICAgcG9zICs9IHN0ci5sZW5ndGg7XG4gICAganNvbiArPSBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBpbmRlbnQobHZsKSB7XG4gICAgaWYgKHdoaXRlc3BhY2UpIHtcbiAgICAgIGpzb24gKz0gJ1xcbicgKyByZXBlYXQobHZsLCB3aGl0ZXNwYWNlKTtcbiAgICAgIGxpbmUrKztcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICB3aGlsZSAobHZsLS0pIHtcbiAgICAgICAgaWYgKHdzTGluZSkge1xuICAgICAgICAgIGxpbmUgKz0gd3NMaW5lO1xuICAgICAgICAgIGNvbHVtbiA9IHdzQ29sdW1uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbiArPSB3c0NvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gd3NQb3M7XG4gICAgICB9XG4gICAgICBwb3MgKz0gMTsgLy8gXFxuIGNoYXJhY3RlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwZWF0KG4sIHN0cikge1xuICAgIHJldHVybiBBcnJheShuICsgMSkuam9pbihzdHIpO1xuICB9XG59O1xuXG5cbnZhciBWQUxJRF9UWVBFUyA9IFsnbnVtYmVyJywgJ2JpZ2ludCcsICdib29sZWFuJywgJ3N0cmluZycsICdvYmplY3QnXTtcbmZ1bmN0aW9uIHZhbGlkVHlwZShkYXRhKSB7XG4gIHJldHVybiBWQUxJRF9UWVBFUy5pbmRleE9mKHR5cGVvZiBkYXRhKSA+PSAwO1xufVxuXG5cbnZhciBFU0NfUVVPVEUgPSAvXCJ8XFxcXC9nO1xudmFyIEVTQ19CID0gL1tcXGJdL2c7XG52YXIgRVNDX0YgPSAvXFxmL2c7XG52YXIgRVNDX04gPSAvXFxuL2c7XG52YXIgRVNDX1IgPSAvXFxyL2c7XG52YXIgRVNDX1QgPSAvXFx0L2c7XG5mdW5jdGlvbiBxdW90ZWQoc3RyKSB7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKEVTQ19RVU9URSwgJ1xcXFwkJicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19GLCAnXFxcXGYnKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfQiwgJ1xcXFxiJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX04sICdcXFxcbicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19SLCAnXFxcXHInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfVCwgJ1xcXFx0Jyk7XG4gIHJldHVybiAnXCInICsgc3RyICsgJ1wiJztcbn1cblxuXG52YXIgRVNDXzAgPSAvfi9nO1xudmFyIEVTQ18xID0gL1xcLy9nO1xuZnVuY3Rpb24gZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShFU0NfMCwgJ34wJylcbiAgICAgICAgICAgIC5yZXBsYWNlKEVTQ18xLCAnfjEnKTtcbn1cbiIsImltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcblxyXG5jb25zdCB7QkxPQ0ssIEVMRU0sIENPTlRFTlQsIE1PRFMsIE1JWH0gPSBQUk9QUztcclxuY29uc3QgbG9jYXRpb25LZXkgPSBKc29uU291cmNlTWFwLmtleTtcclxuXHJcbmNsYXNzIEJlbU5vZGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlKSB7XHJcbiAgICAgICAgdGhpcy5ibG9jayA9IG5vZGVbQkxPQ0tdO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IG5vZGVbRUxFTV07XHJcbiAgICAgICAgdGhpcy5tb2RzID0gbm9kZVtNT0RTXTtcclxuICAgICAgICB0aGlzLm1peCA9IG5vZGVbTUlYXTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG5vZGVbbG9jYXRpb25LZXldO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy5ibG9jayArICh0aGlzLmVsZW0gPyAoYF9fJHt0aGlzLmVsZW19YCkgOiAnJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlbU5vZGU7IiwiaW1wb3J0IExpbnRFcnJvciBmcm9tICcuL2xpbnRlcnJvci5qcyc7XHJcblxyXG5jbGFzcyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5URVhUX1NJWkVTX1NIT1VMRF9CRV9FUVVBTCcsIGVycm9yOiAn0KLQtdC60YHRgtGLINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC90Ysg0LHRi9GC0Ywg0L7QtNC90L7Qs9C+INGA0LDQt9C80LXRgNCwLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fU0laRScsIGVycm9yOiAn0KDQsNC30LzQtdGAINC60L3QvtC/0LrQuCDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC90LAgMSDRiNCw0LMg0LHQvtC70YzRiNC1INGN0YLQsNC70L7QvdC90L7Qs9C+LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1BPU0lUSU9OJywgZXJyb3I6ICfQkdC70L7QuiBidXR0b24g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9C+0YHQu9C1INCx0LvQvtC60LAgcGxhY2Vob2xkZXIuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfUExBQ0VIT0xERVJfU0laRScsIGVycm9yOiAn0JTQvtC/0YPRgdGC0LjQvNGL0LUg0YDQsNC30LzQtdGA0Ysg0LTQu9GPINCx0LvQvtC60LAgcGxhY2Vob2xkZXIg0LIg0LHQu9C+0LrQtSB3YXJuaW5nOiBzLCBtLCBsLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTZXZlcmFsSDEgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULlNFVkVSQUxfSDEnLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQtdC00LjQvdGB0YLQstC10L3QvdGL0LwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIMlBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gyX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgzUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDNfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDRgtGA0LXRgtGM0LXQs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdHUklELlRPT19NVUNIX01BUktFVElOR19CTE9DS1MnLCBlcnJvcjogJ9Cc0LDRgNC60LXRgtC40L3Qs9C+0LLRi9C1INCx0LvQvtC60Lgg0L3QtSDQvNC+0LPRg9GCINC30LDQvdC40LzQsNGC0Ywg0LHQvtC70YzRiNC1INC/0L7Qu9C+0LLQuNC90Ysg0L7RgiDQstGB0LXRhSDQutC+0LvQvtC90L7QuiDQsdC70L7QutCwIGdyaWQnLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24sXHJcbiAgICBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFRleHRTZXZlcmFsSDEsXHJcbiAgICBUZXh0SW52YWxpZEgyUG9zaXRpb24sXHJcbiAgICBUZXh0SW52YWxpZEgzUG9zaXRpb24sXHJcbiAgICBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc1xyXG59IiwiXHJcbmNsYXNzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7Y29kZSwgZXJyb3IsIGxvY2F0aW9ufSkge1xyXG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludEVycm9yOyIsIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3INCQ0LTQsNC/0YLQtdGAINGE0YPQvdC60YbQuNC4IHBhcnNlINC40Lcg0LHQuNCx0LvQuNC+0YLQtdC60LgganNvbi1zb3VyY2UtbWFwXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtwYXJzZX0gZnJvbSAnanNvbi1zb3VyY2UtbWFwJztcclxuaW1wb3J0IFBST1BTIGZyb20gJy4vcHJvcG5hbWVzLmpzJztcclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5cclxuY29uc3QgcG9zaXRpb25LZXkgPSBTeW1ib2woJ1Bvc2l0aW9uJyk7XHJcblxyXG5jbGFzcyBKc29uU291cmNlTWFwIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzdHIpIHtcclxuICAgICAgICB0aGlzLnN0ciA9IHN0cjtcclxuICAgICAgICB0aGlzLmpzb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucG9pbnRlcnMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEpzb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2UodGhpcy5zdHIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5qc29uID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRlcnMgPSByZXN1bHQucG9pbnRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgLy8gVE9ETyBlcnJvciBlbWl0dGluZ1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IGRhdGFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGNoKHRoaXMuanNvbiwgJycpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYXRjaCA9IChub2RlLCBwYXRoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCB2YWx1ZUVuZH0gPSB0aGlzLnBvaW50ZXJzW3BhdGhdO1xyXG5cclxuICAgICAgICAvLyArMSDQuiBjb2wsINGCLtC6LiDQsdC40LHQu9C40L7RgtC10LrQsCDQstC10LTQtdGCINC+0YLRgdGH0LXRgiDQvtGCIDAuXHJcbiAgICAgICAgLy8g0J/RgNC4INGN0YLQvtC8IGxpbmUg0LHQtdC3INC40LfQvNC10L3QtdC90LjRjywg0YIu0LouINC40YHRhdC+0LTQvdGL0LkgSlNPTiDQvtCx0LXRgNC90YPQu9C4ICjQv9C+0LvQvtC20LjQu9C4INCy0L3Rg9GC0YDRjCDRgdCy0L7QudGB0YLQstCwIFwiY29udGVudFwiKVxyXG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IFt2YWx1ZSwgdmFsdWVFbmRdLm1hcCh2YWwgPT4gKHtsaW5lOiB2YWwubGluZSwgY29sOiB2YWwuY29sdW1uICsgMX0pKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGVbQ09OVEVOVF07XHJcblxyXG4gICAgICAgIG5vZGVbcG9zaXRpb25LZXldID0ge3N0YXJ0LCBlbmR9O1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkcmVuKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKGNoaWxkLCBgJHtwYXRofS8ke0NPTlRFTlR9LyR7aW5kfWApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGRyZW4sIGAke3BhdGh9LyR7Q09OVEVOVH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBrZXkgPSBwb3NpdGlvbktleTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSnNvblNvdXJjZU1hcDsiLCJpbXBvcnQgUFJPUFMgZnJvbSBcIi4vcHJvcG5hbWVzLmpzXCI7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcbmltcG9ydCBCZW1Ob2RlIGZyb20gJy4vYmVtbm9kZS5qcyc7XHJcbmltcG9ydCBSdWxlTWVkaWF0b3IgZnJvbSAnLi9ydWxlcy9ydWxlbWVkaWF0b3IuanMnO1xyXG5pbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4vcnVsZXMvcnVsZWJhc2UuanNcIjtcclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgTGludGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTwhUnVsZUJhc2U+fSBydWxlQ2xhc3Nlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihydWxlQ2xhc3NlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlQ2xhc3NlcyA9IHJ1bGVDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBsaW50KHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdHJpbmdUcmVlID0gdGhpcy5hdHRhY2hSb290KHN0cik7XHJcbiAgICAgICAgY29uc3QgbWFwcGVyID0gbmV3IEpzb25Tb3VyY2VNYXAoc3RyaW5nVHJlZSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG1hcHBlci5nZXRKc29uKHN0cmluZ1RyZWUpO1xyXG5cclxuICAgICAgICB0aGlzLm5leHQocm9vdCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsKHBoYXNlcy5lbmQpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGZpbHRlciBlcnJvcnNcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpYWxpemVFcnJvcnMoKTtcclxuICAgICAgICAvLyByZXR1cm4gdGhpcy5lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCBydWxlc0luc3RhbmNlcyA9IHRoaXMucnVsZUNsYXNzZXMubWFwKHJDbGFzcyA9PiBuZXcgckNsYXNzKCkpO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbmV3IFJ1bGVNZWRpYXRvcihydWxlc0luc3RhbmNlcyk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDQktGF0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC+0LHRitC10LrRgtC+0Lwg0LjQu9C4INC80LDRgdGB0LjQstC+0LwgKNC00LXRgNC10LLQviDQuNC70Lgg0LvQtdGBKS4g0JTQvtCx0LDQstC40Lwg0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQutC+0YDQtdC90YwsINCy0YHQtdCz0LTQsCDQsdGL0LvQviDQtNC10YDQtdCy0L4uICovXHJcbiAgICBhdHRhY2hSb290ID0gc3RyID0+IGB7XCIke0NPTlRFTlR9XCI6XFxuJHtzdHJ9XFxufWA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICovXHJcbiAgICBuZXh0ID0gKG5vZGUpID0+IHtcclxuICAgICAgICBjb25zdCBiZW1Ob2RlID0gbmV3IEJlbU5vZGUobm9kZSk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNvbnRlbnRBc0FycmF5KG5vZGVbQ09OVEVOVF0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLmluLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLm91dCwgYmVtTm9kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGwocGhhc2UsIGJlbU5vZGUpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGwocGhhc2UsIGJlbU5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxBbGwocGhhc2UpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGxBbGwocGhhc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVycm9ycyhlcnJvcnMpIHtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFsuLi5lcnJvcnMsIC4uLnRoaXMuZXJyb3JzXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXJpYWxpemVFcnJvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzLm1hcCgoe2NvZGUsIGVycm9yLCBsb2NhdGlvbn0pID0+IHtcclxuICAgICAgICAgICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gbG9jYXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRMb2NhdGlvbiA9IHtcInN0YXJ0XCI6IHt9LCBcImVuZFwiOiB7fX07XHJcblxyXG4gICAgICAgICAgICBzZXJpYWxpemVkTG9jYXRpb25bXCJzdGFydFwiXSA9IHtcImNvbHVtblwiOiBsb2NhdGlvbi5zdGFydC5jb2wsIFwibGluZVwiOiBsb2NhdGlvbi5zdGFydC5saW5lfTtcclxuICAgICAgICAgICAgc2VyaWFsaXplZExvY2F0aW9uW1wiZW5kXCJdID0ge1wiY29sdW1uXCI6IGxvY2F0aW9uLmVuZC5jb2wsIFwibGluZVwiOiBsb2NhdGlvbi5lbmQubGluZX07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgXCJjb2RlXCI6IGNvZGUsXHJcbiAgICAgICAgICAgICAgICBcImVycm9yXCI6IGVycm9yLFxyXG4gICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiOiBzZXJpYWxpemVkTG9jYXRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnRBc0FycmF5KGVsKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKVxyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcblxyXG4gICAgICAgIHJldHVybiBlbCA/IFtlbF0gOiBbXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludGVyOyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIEJMT0NLOiBcImJsb2NrXCIsXHJcbiAgICBFTEVNOiBcImVsZW1cIixcclxuICAgIENPTlRFTlQ6IFwiY29udGVudFwiLFxyXG4gICAgTU9EUzogXCJtb2RzXCIsXHJcbiAgICBNSVg6IFwibWl4XCJcclxufTsiLCJpbXBvcnQgVGV4dFNpemVzIGZyb20gJy4vd2FybmluZy90ZXh0c2l6ZXMuanMnXHJcbmltcG9ydCBCdXR0b25TaXplIGZyb20gJy4vd2FybmluZy9idXR0b25zaXplLmpzJ1xyXG5pbXBvcnQgQnV0dG9uUG9zaXRpb24gZnJvbSAnLi93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzJ1xyXG5cclxuY29uc3QgcnVsZXMgPSBbVGV4dFNpemVzLCBCdXR0b25TaXplLCBCdXR0b25Qb3NpdGlvbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlczsiLCJcclxuY2xhc3MgUnVsZUJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQndCw0LHQvtGAINGB0LXQu9C10LrRgtC+0YDQvtCyIChCZW1Ob2RlLnNlbGVjdG9yKSDRg9C30LvQvtCyLCDQvdCwINC60L7RgtC+0YDRi9GFINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQv9GA0LDQstC40LvQvi5cclxuICAgICAqINCV0YHQu9C4INC90LUg0LfQsNC00LDQvSAtINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvdCwINC60LDQttC00L7QvCDRg9C30LvQtSAoVE9ETykuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZWxlY3RvcnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3JzID0gW10pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqIEBlbnVte3N0cmluZ30gKi9cclxuUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcyA9IHtcclxuICAgIC8qINCS0YXQvtC00LjQvCDQsiDQvtGH0LXRgNC10LTQvdC+0Lkg0YPQt9C10Lsg0LTQtdGA0LXQstCwKi9cclxuICAgIGluOiAnaW4nLFxyXG4gICAgLyog0JLRi9GF0L7QtNC40LwgKi9cclxuICAgIG91dDogJ291dCcsXHJcbiAgICAvKiDQl9Cw0LrQsNC90YfQuNCy0LDQtdC8INC+0LHRhdC+0LQg0LTQtdGA0LXQstCwICovXHJcbiAgICBlbmQ6ICdlbmQnXHJcbn07XHJcblxyXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKEJlbU5vZGUpOiAoIUxpbnRFcnJvcnx1bmRlZmluZWQpfSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyVHlwZTtcclxuXHJcbi8qKiBAdHlwZWRlZiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIE9iamVjdDxzdHJpbmcsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPj59ICovXHJcblJ1bGVCYXNlLkhhbmRsZXJzTWFwVHlwZTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlQmFzZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSAnLi9ydWxlYmFzZS5qcyc7XHJcblxyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgUnVsZU1lZGlhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5idWlsZE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWFwKCkge1xyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gcnVsZS5nZXRTZWxlY3RvcnMoKTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnNNYXAgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHBoYXNlIGluIGhhbmRsZXJzTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNNYXBbcGhhc2VdO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShwaGFzZSwgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFuZGxlcnNNYXBba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyc01hcFtrZXldID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XS5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEtleShwaGFzZSwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gcGhhc2UgKyAnJCcgKyBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0FycmF5PCFMaW50RXJyb3I+fVxyXG4gICAgICovXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIGJlbU5vZGUuc2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtrZXldIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IGhhbmRsZXJzLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoYmVtTm9kZSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IHJ1bGUuZ2V0UGhhc2VIYW5kbGVyc01hcCgpW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goaGFuZGxlcihudWxsKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlTWVkaWF0b3I7IiwiXHJcbmNvbnN0IHNpemVzU2NhbGUgPSBbXCJ4eHhzXCIsIFwieHhzXCIsIFwieHNcIiwgXCJzXCIsIFwibVwiLCBcImxcIiwgXCJ4bFwiLCBcInh4bFwiLCBcInh4eGxcIiwgXCJ4eHh4bFwiLCBcInh4eHh4bFwiXTtcclxuXHJcbmNsYXNzIFNpemUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2l6ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxyXG4gICAgICogQHJldHVybiB7U2l6ZX1cclxuICAgICAqL1xyXG4gICAgYWRkKGNvdW50KSB7XHJcbiAgICAgICAgbGV0IGluZCA9IHNpemVzU2NhbGUuaW5kZXhPZih0aGlzLnNpemUpO1xyXG5cclxuICAgICAgICBpZiAofmluZClcclxuICAgICAgICAgICAgaW5kID0gaW5kICsgY291bnQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemVzU2NhbGVbaW5kXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2soc2l6ZUIpIHtcclxuICAgICAgICByZXR1cm4gISEodGhpcy5zaXplICYmIHNpemVCKSAmJiB0aGlzLnNpemUgPT09IHNpemVCO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaXNEZWYoeCkge1xyXG4gICAgcmV0dXJuIHggIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldChvYmosIC4uLnByb3BzKSB7XHJcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgLy8g0YTRg9C90LrRhtC40Lgg0L3QtSDQv9GA0LXQtNC/0L7Qu9Cw0LPQsNGO0YLRgdGPXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICBsZXQgY3VycmVudCA9IG9iajtcclxuXHJcbiAgICBmb3IgKGxldCBwcm9wIG9mIHByb3BzKSB7XHJcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XHJcblxyXG4gICAgICAgIGlmICghaXNEZWYocHJvcCkpXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgU2l6ZSxcclxuICAgIGdldFxyXG59IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAnYnV0dG9uJywgJ3BsYWNlaG9sZGVyJ10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJOb2RlcyA9IG5ldyBNYXAoKTsgLy8g0YXRgNCw0L3QuNC8IDEgcGxhY2Vob2xkZXJcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzID0gbmV3IE1hcCgpOyAvLyDRhdGA0LDQvdC40LwgMSBidXR0b25cclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAncGxhY2Vob2xkZXInKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlck5vZGVzLmhhcyh3YXJuaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uKHdhcm5pbmcubG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ2J1dHRvbicpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbk5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJOb2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Qb3NpdGlvbjsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblNpemV9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIEJ1dHRvblNpemUgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAnYnV0dG9uJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlcyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHROb2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbk5vZGVzID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGJ1dHRvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0VGV4dE5vZGUgPSB0aGlzLnRleHROb2Rlcy5nZXQod2FybmluZyk7XHJcbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuYnV0dG9uTm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIWJ1dHRvbnMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgLy8gVE9ETyDQv9GA0LXQtNC/0L7Qu9Cw0LPQsNC10LwsINGH0YLQviDRgtC10LrRgdGC0L7QstGL0LUg0L3QvtC00Ysg0L7QsdGP0LfQsNC90Ysg0LHRi9GC0YwsINGCLtC6LiDQuNC90LDRh9C1INGN0YLQsNC70L7QvdC90YvQuSDRgNCw0LfQvNC10YAg0L3QtSDQvtC/0YDQtdC00LXQu9C10L0g0Lgg0L/QvtC10LTRg9GCINC00YDRg9Cz0LjQtSDQv9GA0LDQstC40LvQsC4g0J/RgNC+0LLQtdGA0LjRgtGMINC/0YDQtdC00L/QvtC70L7QttC10L3QuNC1LlxyXG4gICAgICAgIGlmICghZmlyc3RUZXh0Tm9kZSlcclxuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIEpTT05cIjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZVZhbEEgPSBnZXQoZmlyc3RUZXh0Tm9kZS5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIHNpemUuYWRkKDEpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldChidXR0b24ubW9kcywgJ3NpemUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vINCU0LDQttC1INC10YHQu9C4INCyINGA0LDQvNC60LDRhSDQvtC00L3QvtCz0L4g0LHQu9C+0LrQsCDQvdC10YHQutC+0LvRjNC60L4g0L7RiNC40LHQvtGH0L3Ri9GFINGB0LvQvtCyLCDRgtC+INCy0L7QstGA0LDRidCw0LXQvCDQvtC00L3RgyDQvtGI0LjQsdC60YMuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZS5jaGVjayhzaXplVmFsQikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZShub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TaXplOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWx9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIFRleHRTaXplcyBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgLy8gVE9ETyDQv9GA0LXQtNC/0L7Qu9Cw0LPQsNC10LwsINGH0YLQviDRgtC10LrRgdGC0L7QstGL0LUg0L3QvtC00Ysg0L7QsdGP0LfQsNC90Ysg0LHRi9GC0YwsINGCLtC6LiDQuNC90LDRh9C1INGN0YLQsNC70L7QvdC90YvQuSDRgNCw0LfQvNC10YAg0L3QtSDQvtC/0YDQtdC00LXQu9C10L0g0Lgg0L/QvtC10LTRg9GCINC00YDRg9Cz0LjQtSDQv9GA0LDQstC40LvQsC4g0J/RgNC+0LLQtdGA0LjRgtGMINC/0YDQtdC00L/QvtC70L7QttC10L3QuNC1LlxyXG4gICAgICAgIGlmICghdGV4dE5vZGVzKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgSlNPTlwiO1xyXG5cclxuICAgICAgICBjb25zdCBbZmlyc3QsIC4uLm90aGVyXSA9IHRleHROb2RlcztcclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdC5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHRleHQgb2Ygb3RoZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZVZhbEIgPSBnZXQodGV4dC5tb2RzLCAnc2l6ZScpO1xyXG5cclxuICAgICAgICAgICAgLy8g0JTQsNC20LUg0LXRgdC70Lgg0LIg0YDQsNC80LrQsNGFINC+0LTQvdC+0LPQviDQsdC70L7QutCwINC90LXRgdC60L7Qu9GM0LrQviDQvtGI0LjQsdC+0YfQvdGL0YUg0YHQu9C+0LIsINGC0L4g0LLQvtCy0YDQsNGJ0LDQtdC8INC+0LTQvdGDINC+0YjQuNCx0LrRgy5cclxuICAgICAgICAgICAgaWYgKCFzaXplLmNoZWNrKHNpemVWYWxCKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbChub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0U2l6ZXM7Il0sInNvdXJjZVJvb3QiOiIifQ==