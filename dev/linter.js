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
  try {
    return linter.lint(str);
  } catch (e) {
    return [];
  }
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
      if (!node) return;
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
      if (!children) return;
      node[positionKey] = {
        start,
        end
      };

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
    // TODO в тестовых страничках попадаются случаи, когда в массиве content лежит массив. Сделаем один плоский массив
    if (Array.isArray(el)) return el.flat(Infinity);
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
      try {
        const handlerErrors = handler(bemNode);
        errors = this.getMergedErrors(errors, handlerErrors);
      } catch (e) {}
    });
    return errors;
  }

  callAll(phase) {
    let errors = [];
    this.rules.forEach(rule => {
      const handler = rule.getPhaseHandlersMap()[phase];
      if (!handler) return;

      try {
        const handlerErrors = handler(null);
        errors = this.getMergedErrors(errors, handlerErrors);
      } catch (e) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcmtldGluZy90b29tdWNoLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90ZXh0L2gxaDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDJoMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJlIiwiQkxPQ0siLCJFTEVNIiwiQ09OVEVOVCIsIk1PRFMiLCJNSVgiLCJFTEVNTU9EUyIsIlBST1BTIiwibG9jYXRpb25LZXkiLCJKc29uU291cmNlTWFwIiwia2V5IiwiQmVtTm9kZSIsImNvbnN0cnVjdG9yIiwibm9kZSIsInBhcmVudCIsImJsb2NrIiwiZWxlbSIsIm1vZHMiLCJtaXgiLCJlbGVtTW9kcyIsImxvY2F0aW9uIiwic2VsZWN0b3IiLCJXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIiwiTGludEVycm9yIiwiY29kZSIsImVycm9yIiwiV2FybmluZ0ludmFsaWRCdXR0b25TaXplIiwiV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbiIsIldhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplIiwiVGV4dFNldmVyYWxIMSIsIlRleHRJbnZhbGlkSDJQb3NpdGlvbiIsIlRleHRJbnZhbGlkSDNQb3NpdGlvbiIsIkdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzIiwiSW52YWxpZElucHV0IiwiRXJyb3IiLCJwb3NpdGlvbktleSIsIlN5bWJvbCIsInJlc3VsdCIsInBhcnNlIiwianNvbiIsImRhdGEiLCJwb2ludGVycyIsIm1hdGNoIiwicGF0aCIsInZhbHVlIiwidmFsdWVFbmQiLCJzdGFydCIsImVuZCIsIm1hcCIsInZhbCIsImxpbmUiLCJjb2x1bW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJjaGlsZCIsImluZCIsInBoYXNlcyIsIlJ1bGVCYXNlIiwicHJvdG90eXBlIiwicnVsZUNsYXNzZXMiLCJiZW1Ob2RlIiwiY29udGVudEFzQXJyYXkiLCJjYWxsIiwiaW4iLCJuZXh0Iiwib3V0IiwibWVkaWF0b3IiLCJlcnJvcnMiLCJpbml0Iiwic3RyaW5nVHJlZSIsImF0dGFjaFJvb3QiLCJtYXBwZXIiLCJyb290IiwiZ2V0SnNvbiIsImNhbGxBbGwiLCJydWxlc0luc3RhbmNlcyIsInJDbGFzcyIsIlJ1bGVNZWRpYXRvciIsInBoYXNlIiwiYWRkRXJyb3JzIiwiZWwiLCJmbGF0IiwiSW5maW5pdHkiLCJUZXh0U2l6ZXMiLCJCdXR0b25TaXplIiwiQnV0dG9uUG9zaXRpb24iLCJQbGFjZWhvbGRlclNpemUiLCJTZXZlcmFsSDEiLCJIMUgyIiwiSDJIMyIsIlRvb011Y2giLCJtYXJrZXRpbmdCbG9ja3MiLCJncmlkIiwiZ3JpZEZyYWN0aW9uIiwidG90YWxNYXJrZXRpbmciLCJnZXRQaGFzZUhhbmRsZXJzTWFwIiwiYmluZCIsInNpemUiLCJnZXQiLCJpbmNsdWRlcyIsImZ1bGxTaXplIiwidG90YWxJbmZvIiwic2VsZWN0b3JzIiwiZ2V0U2VsZWN0b3JzIiwiSGFuZGxlclR5cGUiLCJIYW5kbGVyc01hcFR5cGUiLCJoYW5kbGVyc01hcCIsImFsd2F5c0NhbGxlZEhhbmRsZXJzIiwiYnVpbGRNYXAiLCJydWxlIiwiaGFuZGxlciIsImxlbmd0aCIsInB1c2giLCJnZXRLZXkiLCJoYW5kbGVycyIsImhhbmRsZXJFcnJvcnMiLCJnZXRNZXJnZWRFcnJvcnMiLCJhbGxFcnJvcnMiLCJvdGhlckVycm9ycyIsImgxVG9IMVBhcmVudE1hcCIsIk1hcCIsImgyUGFyZW50VG9IMk1hcCIsIm9yZGVyIiwiaXNIMSIsInNldCIsImlzSDIiLCJoYXMiLCJoMk5vZGVzIiwid3JvbmdIMiIsIlNldCIsImgxT3JkZXIiLCJjdXJyZW50UGFyZW50IiwiaDJOb2RlIiwiaDJPcmRlciIsImFkZCIsInBvc2l0aW9uIiwidHlwZSIsImgxd2FzIiwic2l6ZXNTY2FsZSIsIlNpemUiLCJjb3VudCIsImluZGV4T2YiLCJjaGVjayIsInNpemVCIiwiaXNEZWYiLCJ4IiwidW5kZWZpbmVkIiwib2JqIiwicHJvcHMiLCJjdXJyZW50IiwicHJvcCIsIndhcm5pbmdzIiwicGxhY2Vob2xkZXJOb2RlcyIsImJ1dHRvbk5vZGVzIiwid2FybmluZyIsImdldExhc3RXYXJuaW5nIiwiaW52YWxpZEJ1dHRvbiIsInBvcCIsImRlbGV0ZSIsInRleHROb2RlcyIsImZpcnN0VGV4dE5vZGUiLCJidXR0b25zIiwic2l6ZVZhbEEiLCJidXR0b24iLCJzaXplVmFsQiIsImNvcnJlY3RTaXplcyIsImZpcnN0Iiwib3RoZXIiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0NBR0E7QUFDQTs7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsc0RBQUosQ0FBV0MsMERBQVgsQ0FBZjs7QUFFQUMsTUFBTSxDQUFDQyxJQUFQLEdBQWMsVUFBU0MsR0FBVCxFQUFjO0FBQ3hCLE1BQUk7QUFDQSxXQUFPTCxNQUFNLENBQUNJLElBQVAsQ0FBWUMsR0FBWixDQUFQO0FBQ0gsR0FGRCxDQUVFLE9BQU9DLENBQVAsRUFBVTtBQUNSLFdBQU8sRUFBUDtBQUNIO0FBQ0osQ0FORCxDLENBUUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQmE7O0FBRWI7QUFDQTtB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Z0JBQWMsR0FBRztBQUNiLFVBQU01QyxNQUFNLEdBQUcsS0FBS3dDLFFBQUwsQ0FBY3hDLE1BQTdCO0FBRUEsV0FBTyxLQUFLd0MsUUFBTCxDQUFjeEMsTUFBTSxHQUFHLENBQXZCLENBQVA7QUFDSDs7QUFqRTRCOztBQW9FbEI1Qix3RUFBZixFIiwiZmlsZSI6ImxpbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTGludGVyIGZyb20gJy4vc3JjL2xpbnRlci5qcyc7XHJcbmltcG9ydCBydWxlcyBmcm9tICcuL3NyYy9ydWxlcy9saXN0LmpzJ1xyXG5cclxuLy8gVE9ETyBmb3IgdGVzdFxyXG4vLyBpbXBvcnQge3Rlc3RzLCBhbnN3ZXJzfSBmcm9tIFwiLi90ZXN0Y2FzZXMuanNcIjtcclxuXHJcbmNvbnN0IGxpbnRlciA9IG5ldyBMaW50ZXIocnVsZXMpO1xyXG5cclxud2luZG93LmxpbnQgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIGxpbnRlci5saW50KHN0cik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gVE9ETyBmb3IgdGVzdFxyXG4vKlxyXG50ZXN0cy5mb3JFYWNoKCh0ZXN0LCBpbmQpID0+IHtcclxuICAgIGNvbnN0IHJlcyA9IHdpbmRvdy5saW50KHRlc3QpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCd0ZXN0OiAnICsgKGluZCArIDEpKTtcclxuICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbn0pXHJcbiovXHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVzY2FwZWRDaGFycyA9IHtcbiAgJ2InOiAnXFxiJyxcbiAgJ2YnOiAnXFxmJyxcbiAgJ24nOiAnXFxuJyxcbiAgJ3InOiAnXFxyJyxcbiAgJ3QnOiAnXFx0JyxcbiAgJ1wiJzogJ1wiJyxcbiAgJy8nOiAnLycsXG4gICdcXFxcJzogJ1xcXFwnXG59O1xuXG52YXIgQV9DT0RFID0gJ2EnLmNoYXJDb2RlQXQoKTtcblxuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgXywgb3B0aW9ucykge1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBiaWdpbnQgPSBvcHRpb25zICYmIG9wdGlvbnMuYmlnaW50ICYmIHR5cGVvZiBCaWdJbnQgIT0gJ3VuZGVmaW5lZCc7XG4gIHJldHVybiB7XG4gICAgZGF0YTogX3BhcnNlKCcnLCB0cnVlKSxcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfcGFyc2UocHRyLCB0b3BMZXZlbCkge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgZGF0YTtcbiAgICBtYXAocHRyLCAndmFsdWUnKTtcbiAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgIGNhc2UgJ3QnOiByZWFkKCdydWUnKTsgZGF0YSA9IHRydWU7IGJyZWFrO1xuICAgICAgY2FzZSAnZic6IHJlYWQoJ2Fsc2UnKTsgZGF0YSA9IGZhbHNlOyBicmVhaztcbiAgICAgIGNhc2UgJ24nOiByZWFkKCd1bGwnKTsgZGF0YSA9IG51bGw7IGJyZWFrO1xuICAgICAgY2FzZSAnXCInOiBkYXRhID0gcGFyc2VTdHJpbmcoKTsgYnJlYWs7XG4gICAgICBjYXNlICdbJzogZGF0YSA9IHBhcnNlQXJyYXkocHRyKTsgYnJlYWs7XG4gICAgICBjYXNlICd7JzogZGF0YSA9IHBhcnNlT2JqZWN0KHB0cik7IGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYmFja0NoYXIoKTtcbiAgICAgICAgaWYgKCctMDEyMzQ1Njc4OScuaW5kZXhPZihjaGFyKSA+PSAwKVxuICAgICAgICAgIGRhdGEgPSBwYXJzZU51bWJlcigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICBpZiAodG9wTGV2ZWwgJiYgcG9zIDwgc291cmNlLmxlbmd0aCkgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZXNwYWNlKCkge1xuICAgIGxvb3A6XG4gICAgICB3aGlsZSAocG9zIDwgc291cmNlLmxlbmd0aCkge1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZVtwb3NdKSB7XG4gICAgICAgICAgY2FzZSAnICc6IGNvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiBjb2x1bW4gKz0gNDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxyJzogY29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogY29sdW1uID0gMDsgbGluZSsrOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBicmVhayBsb29wO1xuICAgICAgICB9XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTdHJpbmcoKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuICAgIHZhciBjaGFyO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ1wiJykge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnXFxcXCcpIHtcbiAgICAgICAgY2hhciA9IGdldENoYXIoKTtcbiAgICAgICAgaWYgKGNoYXIgaW4gZXNjYXBlZENoYXJzKVxuICAgICAgICAgIHN0ciArPSBlc2NhcGVkQ2hhcnNbY2hhcl07XG4gICAgICAgIGVsc2UgaWYgKGNoYXIgPT0gJ3UnKVxuICAgICAgICAgIHN0ciArPSBnZXRDaGFyQ29kZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgKz0gY2hhcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTnVtYmVyKCkge1xuICAgIHZhciBudW1TdHIgPSAnJztcbiAgICB2YXIgaW50ZWdlciA9IHRydWU7XG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICctJykgbnVtU3RyICs9IGdldENoYXIoKTtcblxuICAgIG51bVN0ciArPSBzb3VyY2VbcG9zXSA9PSAnMCdcbiAgICAgICAgICAgICAgPyBnZXRDaGFyKClcbiAgICAgICAgICAgICAgOiBnZXREaWdpdHMoKTtcblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnLicpIHtcbiAgICAgIG51bVN0ciArPSBnZXRDaGFyKCkgKyBnZXREaWdpdHMoKTtcbiAgICAgIGludGVnZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJ2UnIHx8IHNvdXJjZVtwb3NdID09ICdFJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKTtcbiAgICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnKycgfHwgc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgbnVtU3RyICs9IGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSArbnVtU3RyO1xuICAgIHJldHVybiBiaWdpbnQgJiYgaW50ZWdlciAmJiAocmVzdWx0ID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgcmVzdWx0IDwgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpXG4gICAgICAgICAgICA/IEJpZ0ludChudW1TdHIpXG4gICAgICAgICAgICA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQXJyYXkocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKGdldENoYXIoKSA9PSAnXScpIHJldHVybiBhcnI7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgaXRlbVB0ciA9IHB0ciArICcvJyArIGk7XG4gICAgICBhcnIucHVzaChfcGFyc2UoaXRlbVB0cikpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXScpIGJyZWFrO1xuICAgICAgaWYgKGNoYXIgIT0gJywnKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlT2JqZWN0KHB0cikge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgb2JqID0ge307XG4gICAgaWYgKGdldENoYXIoKSA9PSAnfScpIHJldHVybiBvYmo7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgbG9jID0gZ2V0TG9jKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICdcIicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgdmFyIGtleSA9IHBhcnNlU3RyaW5nKCk7XG4gICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICBtYXBMb2MocHJvcFB0ciwgJ2tleScsIGxvYyk7XG4gICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaWYgKGdldENoYXIoKSAhPSAnOicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgb2JqW2tleV0gPSBfcGFyc2UocHJvcFB0cik7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICd9JykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZChzdHIpIHtcbiAgICBmb3IgKHZhciBpPTA7IGk8c3RyLmxlbmd0aDsgaSsrKVxuICAgICAgaWYgKGdldENoYXIoKSAhPT0gc3RyW2ldKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXIoKSB7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdmFyIGNoYXIgPSBzb3VyY2VbcG9zXTtcbiAgICBwb3MrKztcbiAgICBjb2x1bW4rKzsgLy8gbmV3IGxpbmU/XG4gICAgcmV0dXJuIGNoYXI7XG4gIH1cblxuICBmdW5jdGlvbiBiYWNrQ2hhcigpIHtcbiAgICBwb3MtLTtcbiAgICBjb2x1bW4tLTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXJDb2RlKCkge1xuICAgIHZhciBjb3VudCA9IDQ7XG4gICAgdmFyIGNvZGUgPSAwO1xuICAgIHdoaWxlIChjb3VudC0tKSB7XG4gICAgICBjb2RlIDw8PSA0O1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChjaGFyID49ICdhJyAmJiBjaGFyIDw9ICdmJylcbiAgICAgICAgY29kZSArPSBjaGFyLmNoYXJDb2RlQXQoKSAtIEFfQ09ERSArIDEwO1xuICAgICAgZWxzZSBpZiAoY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIGNvZGUgKz0gK2NoYXI7XG4gICAgICBlbHNlXG4gICAgICAgIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpZ2l0cygpIHtcbiAgICB2YXIgZGlnaXRzID0gJyc7XG4gICAgd2hpbGUgKHNvdXJjZVtwb3NdID49ICcwJyAmJiBzb3VyY2VbcG9zXSA8PSAnOScpXG4gICAgICBkaWdpdHMgKz0gZ2V0Q2hhcigpO1xuXG4gICAgaWYgKGRpZ2l0cy5sZW5ndGgpIHJldHVybiBkaWdpdHM7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXAocHRyLCBwcm9wKSB7XG4gICAgbWFwTG9jKHB0ciwgcHJvcCwgZ2V0TG9jKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwTG9jKHB0ciwgcHJvcCwgbG9jKSB7XG4gICAgcG9pbnRlcnNbcHRyXSA9IHBvaW50ZXJzW3B0cl0gfHwge307XG4gICAgcG9pbnRlcnNbcHRyXVtwcm9wXSA9IGxvYztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvYygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdW5leHBlY3RlZFRva2VuKCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCB0b2tlbiAnICsgc291cmNlW3Bvc10gKyAnIGluIEpTT04gYXQgcG9zaXRpb24gJyArIHBvcyk7XG4gIH1cblxuICBmdW5jdGlvbiB3YXNVbmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgYmFja0NoYXIoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVW5leHBlY3RlZEVuZCgpIHtcbiAgICBpZiAocG9zID49IHNvdXJjZS5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIEpTT04gaW5wdXQnKTtcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChkYXRhLCBfLCBvcHRpb25zKSB7XG4gIGlmICghdmFsaWRUeXBlKGRhdGEpKSByZXR1cm47XG4gIHZhciB3c0xpbmUgPSAwO1xuICB2YXIgd3NQb3MsIHdzQ29sdW1uO1xuICB2YXIgd2hpdGVzcGFjZSA9IHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5zcGFjZVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnM7XG4gIHN3aXRjaCAodHlwZW9mIHdoaXRlc3BhY2UpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgdmFyIGxlbiA9IHdoaXRlc3BhY2UgPiAxMFxuICAgICAgICAgICAgICAgICAgPyAxMFxuICAgICAgICAgICAgICAgICAgOiB3aGl0ZXNwYWNlIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICAgOiBNYXRoLmZsb29yKHdoaXRlc3BhY2UpO1xuICAgICAgd2hpdGVzcGFjZSA9IGxlbiAmJiByZXBlYXQobGVuLCAnICcpO1xuICAgICAgd3NQb3MgPSBsZW47XG4gICAgICB3c0NvbHVtbiA9IGxlbjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICB3aGl0ZXNwYWNlID0gd2hpdGVzcGFjZS5zbGljZSgwLCAxMCk7XG4gICAgICB3c1BvcyA9IDA7XG4gICAgICB3c0NvbHVtbiA9IDA7XG4gICAgICBmb3IgKHZhciBqPTA7IGo8d2hpdGVzcGFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY2hhciA9IHdoaXRlc3BhY2Vbal07XG4gICAgICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgICAgIGNhc2UgJyAnOiB3c0NvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiB3c0NvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiB3c0NvbHVtbiA9IDA7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcbic6IHdzQ29sdW1uID0gMDsgd3NMaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGluIEpTT04nKTtcbiAgICAgICAgfVxuICAgICAgICB3c1BvcysrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdoaXRlc3BhY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIganNvbiA9ICcnO1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBlczYgPSBvcHRpb25zICYmIG9wdGlvbnMuZXM2ICYmIHR5cGVvZiBNYXAgPT0gJ2Z1bmN0aW9uJztcbiAgX3N0cmluZ2lmeShkYXRhLCAwLCAnJyk7XG4gIHJldHVybiB7XG4gICAganNvbjoganNvbixcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfc3RyaW5naWZ5KF9kYXRhLCBsdmwsIHB0cikge1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHN3aXRjaCAodHlwZW9mIF9kYXRhKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBvdXQoJycgKyBfZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgb3V0KHF1b3RlZChfZGF0YSkpOyBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChfZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIG91dCgnbnVsbCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfZGF0YS50b0pTT04gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG91dChxdW90ZWQoX2RhdGEudG9KU09OKCkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9kYXRhKSkge1xuICAgICAgICAgIHN0cmluZ2lmeUFycmF5KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXM2KSB7XG4gICAgICAgICAgaWYgKF9kYXRhLmNvbnN0cnVjdG9yLkJZVEVTX1BFUl9FTEVNRU5UKVxuICAgICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgICBlbHNlIGlmIChfZGF0YSBpbnN0YW5jZW9mIE1hcClcbiAgICAgICAgICAgIHN0cmluZ2lmeU1hcFNldCgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgU2V0KVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KHRydWUpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5QXJyYXkoKSB7XG4gICAgICBpZiAoX2RhdGEubGVuZ3RoKSB7XG4gICAgICAgIG91dCgnWycpO1xuICAgICAgICB2YXIgaXRlbUx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxfZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICBpbmRlbnQoaXRlbUx2bCk7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB2YWxpZFR5cGUoX2RhdGFbaV0pID8gX2RhdGFbaV0gOiBudWxsO1xuICAgICAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgICAgICBfc3RyaW5naWZ5KGl0ZW0sIGl0ZW1MdmwsIGl0ZW1QdHIpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ10nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgnW10nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlPYmplY3QoKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9kYXRhKTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgICBvdXQoJ3snKTtcbiAgICAgICAgdmFyIHByb3BMdmwgPSBsdmwgKyAxO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlNYXBTZXQoaXNTZXQpIHtcbiAgICAgIGlmIChfZGF0YS5zaXplKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIHZhciBlbnRyaWVzID0gX2RhdGEuZW50cmllcygpO1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgd2hpbGUgKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICB2YXIga2V5ID0gaXRlbVswXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpc1NldCA/IHRydWUgOiBpdGVtWzFdO1xuICAgICAgICAgIGlmICh2YWxpZFR5cGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoIWZpcnN0KSBvdXQoJywnKTtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICAgICAgICBpbmRlbnQocHJvcEx2bCk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleScpO1xuICAgICAgICAgICAgb3V0KHF1b3RlZChrZXkpKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICAgICAgICBvdXQoJzonKTtcbiAgICAgICAgICAgIGlmICh3aGl0ZXNwYWNlKSBvdXQoJyAnKTtcbiAgICAgICAgICAgIF9zdHJpbmdpZnkodmFsdWUsIHByb3BMdmwsIHByb3BQdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvdXQoc3RyKSB7XG4gICAgY29sdW1uICs9IHN0ci5sZW5ndGg7XG4gICAgcG9zICs9IHN0ci5sZW5ndGg7XG4gICAganNvbiArPSBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBpbmRlbnQobHZsKSB7XG4gICAgaWYgKHdoaXRlc3BhY2UpIHtcbiAgICAgIGpzb24gKz0gJ1xcbicgKyByZXBlYXQobHZsLCB3aGl0ZXNwYWNlKTtcbiAgICAgIGxpbmUrKztcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICB3aGlsZSAobHZsLS0pIHtcbiAgICAgICAgaWYgKHdzTGluZSkge1xuICAgICAgICAgIGxpbmUgKz0gd3NMaW5lO1xuICAgICAgICAgIGNvbHVtbiA9IHdzQ29sdW1uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbiArPSB3c0NvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gd3NQb3M7XG4gICAgICB9XG4gICAgICBwb3MgKz0gMTsgLy8gXFxuIGNoYXJhY3RlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwZWF0KG4sIHN0cikge1xuICAgIHJldHVybiBBcnJheShuICsgMSkuam9pbihzdHIpO1xuICB9XG59O1xuXG5cbnZhciBWQUxJRF9UWVBFUyA9IFsnbnVtYmVyJywgJ2JpZ2ludCcsICdib29sZWFuJywgJ3N0cmluZycsICdvYmplY3QnXTtcbmZ1bmN0aW9uIHZhbGlkVHlwZShkYXRhKSB7XG4gIHJldHVybiBWQUxJRF9UWVBFUy5pbmRleE9mKHR5cGVvZiBkYXRhKSA+PSAwO1xufVxuXG5cbnZhciBFU0NfUVVPVEUgPSAvXCJ8XFxcXC9nO1xudmFyIEVTQ19CID0gL1tcXGJdL2c7XG52YXIgRVNDX0YgPSAvXFxmL2c7XG52YXIgRVNDX04gPSAvXFxuL2c7XG52YXIgRVNDX1IgPSAvXFxyL2c7XG52YXIgRVNDX1QgPSAvXFx0L2c7XG5mdW5jdGlvbiBxdW90ZWQoc3RyKSB7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKEVTQ19RVU9URSwgJ1xcXFwkJicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19GLCAnXFxcXGYnKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfQiwgJ1xcXFxiJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX04sICdcXFxcbicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19SLCAnXFxcXHInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfVCwgJ1xcXFx0Jyk7XG4gIHJldHVybiAnXCInICsgc3RyICsgJ1wiJztcbn1cblxuXG52YXIgRVNDXzAgPSAvfi9nO1xudmFyIEVTQ18xID0gL1xcLy9nO1xuZnVuY3Rpb24gZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShFU0NfMCwgJ34wJylcbiAgICAgICAgICAgIC5yZXBsYWNlKEVTQ18xLCAnfjEnKTtcbn1cbiIsImltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcblxyXG5jb25zdCB7QkxPQ0ssIEVMRU0sIENPTlRFTlQsIE1PRFMsIE1JWCwgRUxFTU1PRFN9ID0gUFJPUFM7XHJcbmNvbnN0IGxvY2F0aW9uS2V5ID0gSnNvblNvdXJjZU1hcC5rZXk7XHJcblxyXG5jbGFzcyBCZW1Ob2RlIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcclxuICAgICAqIEBwYXJhbSB7QmVtTm9kZX0gcGFyZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuYmxvY2sgPSBub2RlW0JMT0NLXTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBub2RlW0VMRU1dO1xyXG4gICAgICAgIHRoaXMubW9kcyA9IG5vZGVbTU9EU107XHJcbiAgICAgICAgdGhpcy5taXggPSBub2RlW01JWF07XHJcbiAgICAgICAgdGhpcy5lbGVtTW9kcyA9IG5vZGVbRUxFTU1PRFNdO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbm9kZVtsb2NhdGlvbktleV07XHJcblxyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLmJsb2NrICsgKHRoaXMuZWxlbSA/IChgX18ke3RoaXMuZWxlbX1gKSA6ICcnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmVtTm9kZTsiLCJpbXBvcnQgTGludEVycm9yIGZyb20gJy4vbGludGVycm9yLmpzJztcclxuXHJcbmNsYXNzIFdhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLlRFWFRfU0laRVNfU0hPVUxEX0JFX0VRVUFMJywgZXJyb3I6ICfQotC10LrRgdGC0Ysg0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20L3RiyDQsdGL0YLRjCDQvtC00L3QvtCz0L4g0YDQsNC30LzQtdGA0LAuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRCdXR0b25TaXplIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX0JVVFRPTl9TSVpFJywgZXJyb3I6ICfQoNCw0LfQvNC10YAg0LrQvdC+0L/QutC4INCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L3QsCAxINGI0LDQsyDQsdC+0LvRjNGI0LUg0Y3RgtCw0LvQvtC90L3QvtCz0L4uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fUE9TSVRJT04nLCBlcnJvcjogJ9CR0LvQvtC6IGJ1dHRvbiDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC/0L7RgdC70LUg0LHQu9C+0LrQsCBwbGFjZWhvbGRlci4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9QTEFDRUhPTERFUl9TSVpFJywgZXJyb3I6ICfQlNC+0L/Rg9GB0YLQuNC80YvQtSDRgNCw0LfQvNC10YDRiyDQtNC70Y8g0LHQu9C+0LrQsCBwbGFjZWhvbGRlciDQsiDQsdC70L7QutC1IHdhcm5pbmc6IHMsIG0sIGwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFNldmVyYWxIMSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuU0VWRVJBTF9IMScsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3RjyDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINC10LTQuNC90YHRgtCy0LXQvdC90YvQvC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgyUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDJfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8g0L3QtSDQvNC+0LbQtdGCINC90LDRhdC+0LTQuNGC0YzRgdGPINC/0LXRgNC10LQg0LfQsNCz0L7Qu9C+0LLQutC+0Lwg0L/QtdGA0LLQvtCz0L4g0YPRgNC+0LLQvdGPLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRJbnZhbGlkSDNQb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuSU5WQUxJRF9IM19QT1NJVElPTicsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INGC0YDQtdGC0YzQtdCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INCy0YLQvtGA0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2NrcyBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ0dSSUQuVE9PX01VQ0hfTUFSS0VUSU5HX0JMT0NLUycsIGVycm9yOiAn0JzQsNGA0LrQtdGC0LjQvdCz0L7QstGL0LUg0LHQu9C+0LrQuCDQvdC1INC80L7Qs9GD0YIg0LfQsNC90LjQvNCw0YLRjCDQsdC+0LvRjNGI0LUg0L/QvtC70L7QstC40L3RiyDQvtGCINCy0YHQtdGFINC60L7Qu9C+0L3QvtC6INCx0LvQvtC60LAgZ3JpZCcsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsLFxyXG4gICAgV2FybmluZ0ludmFsaWRCdXR0b25TaXplLFxyXG4gICAgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbixcclxuICAgIFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplLFxyXG4gICAgVGV4dFNldmVyYWxIMSxcclxuICAgIFRleHRJbnZhbGlkSDJQb3NpdGlvbixcclxuICAgIFRleHRJbnZhbGlkSDNQb3NpdGlvbixcclxuICAgIEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzXHJcbn0iLCJcclxuY2xhc3MgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHtjb2RlLCBlcnJvciwgbG9jYXRpb259KSB7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcclxuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW50RXJyb3I7IiwiXHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3INCd0LXRgNCw0LfRgNC10YjQuNC80YvQtSDQvtGI0LjQsdC60LgsINC/0L7RgdC70LUg0LrQvtGC0L7RgNGL0YUg0L/RgNC10LrRgNCw0YnQsNC10Lwg0YDQsNCx0L7RgtGDLiDQmNGFINGH0LjRgdC70L4g0LzQvtC20LXRgiDRgdC+0LrRgNCw0YnQsNGC0YzRgdGPXHJcbiAqINC/0L4g0LzQtdGA0LUg0LTQvtCx0LDQstC70LXQvdC40Y8g0L3QvtCy0YvRhSDQv9GA0LDQstC40Lsg0LIg0LvQuNC90YLQtdGALlxyXG4gKi9cclxuY2xhc3MgSW52YWxpZElucHV0IGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJJbnZhbGlkIGlucHV0XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgSW52YWxpZElucHV0XHJcbn0iLCIvKipcclxuICogQGZpbGVvdmVydmlldyDQkNC00LDQv9GC0LXRgCDRhNGD0L3QutGG0LjQuCBwYXJzZSDQuNC3INCx0LjQsdC70LjQvtGC0LXQutC4IGpzb24tc291cmNlLW1hcFxyXG4gKi9cclxuXHJcbmltcG9ydCB7cGFyc2V9IGZyb20gJ2pzb24tc291cmNlLW1hcCc7XHJcbmltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCB7SW52YWxpZElucHV0fSBmcm9tIFwiLi9lcnJvci9zeXN0ZW0uanNcIjtcclxuXHJcblxyXG5jb25zdCB7Q09OVEVOVH0gPSBQUk9QUztcclxuXHJcbmNvbnN0IHBvc2l0aW9uS2V5ID0gU3ltYm9sKCdQb3NpdGlvbicpO1xyXG5cclxuY2xhc3MgSnNvblNvdXJjZU1hcCB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3RyKSB7XHJcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XHJcbiAgICAgICAgdGhpcy5qc29uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvaW50ZXJzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRKc29uID0gKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlKHRoaXMuc3RyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuanNvbiA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJzID0gcmVzdWx0LnBvaW50ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkSW5wdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWF0Y2godGhpcy5qc29uLCAnJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmpzb247XHJcbiAgICB9O1xyXG5cclxuICAgIG1hdGNoID0gKG5vZGUsIHBhdGgpID0+IHtcclxuICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCB2YWx1ZUVuZH0gPSB0aGlzLnBvaW50ZXJzW3BhdGhdO1xyXG5cclxuICAgICAgICAvLyArMSDQuiBjb2wsINGCLtC6LiDQsdC40LHQu9C40L7RgtC10LrQsCDQstC10LTQtdGCINC+0YLRgdGH0LXRgiDQvtGCIDAuXHJcbiAgICAgICAgLy8g0J/RgNC4INGN0YLQvtC8IGxpbmUg0LHQtdC3INC40LfQvNC10L3QtdC90LjRjywg0YIu0LouINC40YHRhdC+0LTQvdGL0LkgSlNPTiDQvtCx0LXRgNC90YPQu9C4ICjQv9C+0LvQvtC20LjQu9C4INCy0L3Rg9GC0YDRjCDRgdCy0L7QudGB0YLQstCwIFwiY29udGVudFwiKVxyXG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IFt2YWx1ZSwgdmFsdWVFbmRdLm1hcCh2YWwgPT4gKHtsaW5lOiB2YWwubGluZSwgY29sdW1uOiB2YWwuY29sdW1uICsgMX0pKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGVbQ09OVEVOVF07XHJcblxyXG4gICAgICAgIGlmICghY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgbm9kZVtwb3NpdGlvbktleV0gPSB7c3RhcnQsIGVuZH07XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKGNoaWxkLCBgJHtwYXRofS8ke0NPTlRFTlR9LyR7aW5kfWApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGRyZW4sIGAke3BhdGh9LyR7Q09OVEVOVH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBrZXkgPSBwb3NpdGlvbktleTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSnNvblNvdXJjZU1hcDsiLCJpbXBvcnQgUFJPUFMgZnJvbSBcIi4vcHJvcG5hbWVzLmpzXCI7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcbmltcG9ydCBCZW1Ob2RlIGZyb20gJy4vYmVtbm9kZS5qcyc7XHJcbmltcG9ydCBSdWxlTWVkaWF0b3IgZnJvbSAnLi9ydWxlcy9ydWxlbWVkaWF0b3IuanMnO1xyXG5pbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4vcnVsZXMvcnVsZWJhc2UuanNcIjtcclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgTGludGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTwhUnVsZUJhc2U+fSBydWxlQ2xhc3Nlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihydWxlQ2xhc3NlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlQ2xhc3NlcyA9IHJ1bGVDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBsaW50KHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdHJpbmdUcmVlID0gdGhpcy5hdHRhY2hSb290KHN0cik7XHJcbiAgICAgICAgY29uc3QgbWFwcGVyID0gbmV3IEpzb25Tb3VyY2VNYXAoc3RyaW5nVHJlZSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG1hcHBlci5nZXRKc29uKHN0cmluZ1RyZWUpO1xyXG5cclxuICAgICAgICB0aGlzLm5leHQocm9vdCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsKHBoYXNlcy5lbmQpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGZpbHRlciBlcnJvcnNcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCBydWxlc0luc3RhbmNlcyA9IHRoaXMucnVsZUNsYXNzZXMubWFwKHJDbGFzcyA9PiBuZXcgckNsYXNzKCkpO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbmV3IFJ1bGVNZWRpYXRvcihydWxlc0luc3RhbmNlcyk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDQktGF0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC+0LHRitC10LrRgtC+0Lwg0LjQu9C4INC80LDRgdGB0LjQstC+0LwgKNC00LXRgNC10LLQviDQuNC70Lgg0LvQtdGBKS4g0JTQvtCx0LDQstC40Lwg0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQutC+0YDQtdC90YwsINGH0YLQvtCx0Ysg0LLRgdC10LPQtNCwINCx0YvQu9C+INC00LXRgNC10LLQvi4gKi9cclxuICAgIGF0dGFjaFJvb3QgPSBzdHIgPT4gYHtcIiR7Q09OVEVOVH1cIjpcXG4ke3N0cn1cXG59YDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXHJcbiAgICAgKiBAcGFyYW0ge0JlbU5vZGV9IHBhcmVudFxyXG4gICAgICovXHJcbiAgICBuZXh0ID0gKG5vZGUsIHBhcmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJlbU5vZGUgPSBuZXcgQmVtTm9kZShub2RlLCBwYXJlbnQpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jb250ZW50QXNBcnJheShub2RlW0NPTlRFTlRdKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsKHBoYXNlcy5pbiwgYmVtTm9kZSk7XHJcblxyXG4gICAgICAgIGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KGNoaWxkLCBiZW1Ob2RlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsKHBoYXNlcy5vdXQsIGJlbU5vZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5tZWRpYXRvci5jYWxsKHBoYXNlLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5tZWRpYXRvci5jYWxsQWxsKHBoYXNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcnJvcnMoZXJyb3JzKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbLi4uZXJyb3JzLCAuLi50aGlzLmVycm9yc107XHJcbiAgICB9XHJcblxyXG4gICAgY29udGVudEFzQXJyYXkoZWwpIHtcclxuICAgICAgICAvLyBUT0RPINCyINGC0LXRgdGC0L7QstGL0YUg0YHRgtGA0LDQvdC40YfQutCw0YUg0L/QvtC/0LDQtNCw0Y7RgtGB0Y8g0YHQu9GD0YfQsNC4LCDQutC+0LPQtNCwINCyINC80LDRgdGB0LjQstC1IGNvbnRlbnQg0LvQtdC20LjRgiDQvNCw0YHRgdC40LIuINCh0LTQtdC70LDQtdC8INC+0LTQuNC9INC/0LvQvtGB0LrQuNC5INC80LDRgdGB0LjQslxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIGVsLmZsYXQoSW5maW5pdHkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWwgPyBbZWxdIDogW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbnRlcjsiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBCTE9DSzogXCJibG9ja1wiLFxyXG4gICAgRUxFTTogXCJlbGVtXCIsXHJcbiAgICBDT05URU5UOiBcImNvbnRlbnRcIixcclxuICAgIE1PRFM6IFwibW9kc1wiLFxyXG4gICAgTUlYOiBcIm1peFwiLFxyXG4gICAgRUxFTU1PRFM6ICdlbGVtTW9kcydcclxufTsiLCJpbXBvcnQgVGV4dFNpemVzIGZyb20gJy4vd2FybmluZy90ZXh0c2l6ZXMuanMnXHJcbmltcG9ydCBCdXR0b25TaXplIGZyb20gJy4vd2FybmluZy9idXR0b25zaXplLmpzJ1xyXG5pbXBvcnQgQnV0dG9uUG9zaXRpb24gZnJvbSAnLi93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzJ1xyXG5pbXBvcnQgUGxhY2Vob2xkZXJTaXplIGZyb20gJy4vd2FybmluZy9wbGFjZWhvbGRlcnNpemUuanMnXHJcbmltcG9ydCBTZXZlcmFsSDEgZnJvbSAnLi90ZXh0L3NldmVyYWxoMS5qcydcclxuaW1wb3J0IEgxSDIgZnJvbSAnLi90ZXh0L2gxaDIuanMnXHJcbmltcG9ydCBIMkgzIGZyb20gJy4vdGV4dC9oMmgzLmpzJ1xyXG5pbXBvcnQgVG9vTXVjaCBmcm9tICcuL21hcmtldGluZy90b29tdWNoLmpzJ1xyXG5cclxuY29uc3QgcnVsZXMgPSBbXHJcbiAgICBUZXh0U2l6ZXMsIEJ1dHRvblNpemUsIEJ1dHRvblBvc2l0aW9uLCBQbGFjZWhvbGRlclNpemUsXHJcbiAgICBTZXZlcmFsSDEsIEgxSDIsIEgySDMsXHJcbiAgICBUb29NdWNoXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlczsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc30gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdFwiO1xyXG5cclxuY29uc3QgbWFya2V0aW5nQmxvY2tzID0gWydjb21tZXJjaWFsJywgJ29mZmVyJ107XHJcblxyXG5jbGFzcyBUb29NdWNoIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWydncmlkJywgJ2dyaWRfX2ZyYWN0aW9uJywgLi4ubWFya2V0aW5nQmxvY2tzXSk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JpZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGFsTWFya2V0aW5nID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmdyaWQgJiYgbm9kZS5zZWxlY3RvciA9PT0gJ2dyaWRfX2ZyYWN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ2dyaWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZ3JpZEZyYWN0aW9uKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSArZ2V0KHRoaXMuZ3JpZEZyYWN0aW9uLmVsZW1Nb2RzLCAnbS1jb2wnKTtcclxuXHJcbiAgICAgICAgaWYgKG1hcmtldGluZ0Jsb2Nrcy5pbmNsdWRlcyhub2RlLmJsb2NrKSlcclxuICAgICAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyArPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuc2VsZWN0b3IgPT09ICdncmlkX19mcmFjdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICdncmlkJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBmdWxsU2l6ZSA9ICtnZXQobm9kZS5tb2RzLCAnbS1jb2x1bW5zJyk7XHJcbiAgICAgICAgbGV0IGVycm9yO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b3RhbE1hcmtldGluZyAqIDIgPj0gZnVsbFNpemUpXHJcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzKG5vZGUubG9jYXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmdyaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRvdGFsTWFya2V0aW5nID0gMDtcclxuICAgICAgICB0aGlzLnRvdGFsSW5mbyA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9vTXVjaDsiLCJcclxuY2xhc3MgUnVsZUJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQndCw0LHQvtGAINGB0LXQu9C10LrRgtC+0YDQvtCyIChCZW1Ob2RlLnNlbGVjdG9yKSDRg9C30LvQvtCyLCDQvdCwINC60L7RgtC+0YDRi9GFINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQv9GA0LDQstC40LvQvi5cclxuICAgICAqINCV0YHQu9C4INC90LUg0LfQsNC00LDQvSAtINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvdCwINC60LDQttC00L7QvCDRg9C30LvQtSAoVE9ETykuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZWxlY3RvcnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3JzID0gW10pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqIEBlbnVte3N0cmluZ30gKi9cclxuUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcyA9IHtcclxuICAgIC8qINCS0YXQvtC00LjQvCDQsiDQvtGH0LXRgNC10LTQvdC+0Lkg0YPQt9C10Lsg0LTQtdGA0LXQstCwKi9cclxuICAgIGluOiAnaW4nLFxyXG4gICAgLyog0JLRi9GF0L7QtNC40LwgKi9cclxuICAgIG91dDogJ291dCcsXHJcbiAgICAvKiDQl9Cw0LrQsNC90YfQuNCy0LDQtdC8INC+0LHRhdC+0LQg0LTQtdGA0LXQstCwICovXHJcbiAgICBlbmQ6ICdlbmQnXHJcbn07XHJcblxyXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKEJlbU5vZGUpOiAoIUxpbnRFcnJvcnx1bmRlZmluZWQpfSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyVHlwZTtcclxuXHJcbi8qKiBAdHlwZWRlZiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIE9iamVjdDxzdHJpbmcsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPj59ICovXHJcblJ1bGVCYXNlLkhhbmRsZXJzTWFwVHlwZTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlQmFzZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSAnLi9ydWxlYmFzZS5qcyc7XHJcblxyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgUnVsZU1lZGlhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5hbHdheXNDYWxsZWRIYW5kbGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVpbGRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZE1hcCgpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHJ1bGUuZ2V0U2VsZWN0b3JzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJzTWFwID0gcnVsZS5nZXRQaGFzZUhhbmRsZXJzTWFwKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBwaGFzZSBpbiBoYW5kbGVyc01hcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzTWFwW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdG9ycy5sZW5ndGggJiYgcGhhc2UgIT09IHBoYXNlcy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsd2F5c0NhbGxlZEhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShwaGFzZSwgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFuZGxlcnNNYXBba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyc01hcFtrZXldID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XS5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEtleShwaGFzZSwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gcGhhc2UgKyAnJCcgKyBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0FycmF5PCFMaW50RXJyb3I+fVxyXG4gICAgICovXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIGJlbU5vZGUuc2VsZWN0b3IpO1xyXG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBba2V5XSB8fCBbXTtcclxuICAgICAgICBsZXQgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGhhbmRsZXJzID0gWy4uLmhhbmRsZXJzLCAuLi50aGlzLmFsd2F5c0NhbGxlZEhhbmRsZXJzXTtcclxuXHJcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJFcnJvcnMgPSBoYW5kbGVyKGJlbU5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGVycm9ycyA9IHRoaXMuZ2V0TWVyZ2VkRXJyb3JzKGVycm9ycywgaGFuZGxlckVycm9ycyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxBbGwocGhhc2UpIHtcclxuICAgICAgICBsZXQgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IHJ1bGUuZ2V0UGhhc2VIYW5kbGVyc01hcCgpW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaGFuZGxlcilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyRXJyb3JzID0gaGFuZGxlcihudWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSB0aGlzLmdldE1lcmdlZEVycm9ycyhlcnJvcnMsIGhhbmRsZXJFcnJvcnMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRNZXJnZWRFcnJvcnMoYWxsRXJyb3JzLCBvdGhlckVycm9ycykge1xyXG4gICAgICAgIGlmICghb3RoZXJFcnJvcnMpXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxFcnJvcnM7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG90aGVyRXJyb3JzKSlcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hbGxFcnJvcnMsIC4uLm90aGVyRXJyb3JzXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFsuLi5hbGxFcnJvcnMsIG90aGVyRXJyb3JzXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZU1lZGlhdG9yOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgSDFIMiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge01hcDxCZW1Ob2RlLCB7bm9kZTogQmVtTm9kZSwgb3JkZXI6IG51bWJlcn0+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwID0gbmV3IE1hcCgpOyAvLyB7aDEtbm9kZSwgaDEtcGFyZW50IHdpdGggb3JkZXJ9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge01hcDxCZW1Ob2RlLCBBcnJheTx7bm9kZTogQmVtTm9kZSwgb3JkZXI6IG51bWJlcn0+Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmgyUGFyZW50VG9IMk1hcCA9IG5ldyBNYXAoKTsgLy8ge3BhcmVudCwgaDItY2hpbGRzIHdpdGggb3JkZXJ9XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xyXG4gICAgICAgIHRoaXMub3JkZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuZW5kXTogdGhpcy5lbmQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIMShub2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcC5zZXQobm9kZSwge25vZGU6IG5vZGUucGFyZW50LCBvcmRlcjogdGhpcy5vcmRlcisrfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0gyKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUucGFyZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmgyUGFyZW50VG9IMk1hcC5oYXMocGFyZW50KSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaDJQYXJlbnRUb0gyTWFwLnNldChwYXJlbnQsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGgyTm9kZXMgPSB0aGlzLmgyUGFyZW50VG9IMk1hcC5nZXQocGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIGgyTm9kZXMucHVzaCh7bm9kZTogbm9kZSwgb3JkZXI6IHRoaXMub3JkZXIrK30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmQoKSB7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdIMiA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAuZm9yRWFjaCgoe25vZGU6IHBhcmVudCwgb3JkZXI6IGgxT3JkZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnQ7IGN1cnJlbnRQYXJlbnQ7IGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaDJOb2RlcyA9IHRoaXMuaDJQYXJlbnRUb0gyTWFwLmdldChjdXJyZW50UGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWgyTm9kZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaDJOb2Rlcy5mb3JFYWNoKCh7bm9kZTogaDJOb2RlLCBvcmRlcjogaDJPcmRlcn0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaDJPcmRlciA8IGgxT3JkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nSDIuYWRkKGgyTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB3cm9uZ0gyLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBUZXh0SW52YWxpZEgyUG9zaXRpb24obm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSDEobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHlwZSAmJiB0eXBlID09PSAnaDEnO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSDIobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHlwZSAmJiB0eXBlID09PSAnaDInO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIMUgyOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuLy8gVE9ETyDRjdGC0L4gY29weS1wYXN0ZSDRgtC10YHRgtCwIGgxaDIuanMg0YEg0LfQsNC80LXQvdC+0LkgaDEgLT4gaDIg0LIg0LzQtdGC0L7QtNC1IGlzSDEg0LggaDIgLT4gaDMg0LIg0LzQtdGC0L7QtNC1IGlzSDJcclxuXHJcbmNsYXNzIEgySDMgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXA8QmVtTm9kZSwge25vZGU6IEJlbU5vZGUsIG9yZGVyOiBudW1iZXJ9Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcCA9IG5ldyBNYXAoKTsgLy8ge2gxLW5vZGUsIGgxLXBhcmVudCB3aXRoIG9yZGVyfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXA8QmVtTm9kZSwgQXJyYXk8e25vZGU6IEJlbU5vZGUsIG9yZGVyOiBudW1iZXJ9Pj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5oMlBhcmVudFRvSDJNYXAgPSBuZXcgTWFwKCk7IC8vIHtwYXJlbnQsIGgyLWNoaWxkcyB3aXRoIG9yZGVyfVxyXG5cclxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cclxuICAgICAgICB0aGlzLm9yZGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmVuZF06IHRoaXMuZW5kLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSDEobm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAuc2V0KG5vZGUsIHtub2RlOiBub2RlLnBhcmVudCwgb3JkZXI6IHRoaXMub3JkZXIrK30pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNIMihub2RlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBub2RlLnBhcmVudDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oMlBhcmVudFRvSDJNYXAuaGFzKHBhcmVudCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmgyUGFyZW50VG9IMk1hcC5zZXQocGFyZW50LCBbXSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoMk5vZGVzID0gdGhpcy5oMlBhcmVudFRvSDJNYXAuZ2V0KHBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICBoMk5vZGVzLnB1c2goe25vZGU6IG5vZGUsIG9yZGVyOiB0aGlzLm9yZGVyKyt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5kKCkge1xyXG4gICAgICAgIGNvbnN0IHdyb25nSDIgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwLmZvckVhY2goKHtub2RlOiBwYXJlbnQsIG9yZGVyOiBoMU9yZGVyfSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50OyBjdXJyZW50UGFyZW50OyBjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGgyTm9kZXMgPSB0aGlzLmgyUGFyZW50VG9IMk1hcC5nZXQoY3VycmVudFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFoMk5vZGVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGgyTm9kZXMuZm9yRWFjaCgoe25vZGU6IGgyTm9kZSwgb3JkZXI6IGgyT3JkZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGgyT3JkZXIgPCBoMU9yZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0gyLmFkZChoMk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgd3JvbmdIMi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChuZXcgVGV4dEludmFsaWRIMlBvc2l0aW9uKG5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpc0gxKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgJiYgdHlwZSA9PT0gJ2gyJztcclxuICAgIH1cclxuXHJcbiAgICBpc0gyKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgJiYgdHlwZSA9PT0gJ2gzJztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSDJIMzsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0U2V2ZXJhbEgxfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5cclxuY2xhc3MgU2V2ZXJhbEgxIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICB0aGlzLmgxd2FzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSAhPT0gJ2gxJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaDF3YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5oMXdhcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHRTZXZlcmFsSDEobm9kZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldmVyYWxIMTsiLCJcclxuY29uc3Qgc2l6ZXNTY2FsZSA9IFtcInh4eHNcIiwgXCJ4eHNcIiwgXCJ4c1wiLCBcInNcIiwgXCJtXCIsIFwibFwiLCBcInhsXCIsIFwieHhsXCIsIFwieHh4bFwiLCBcInh4eHhsXCIsIFwieHh4eHhsXCJdO1xyXG5cclxuY2xhc3MgU2l6ZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICovXHJcbiAgICBhZGQoY291bnQpIHtcclxuICAgICAgICBsZXQgaW5kID0gc2l6ZXNTY2FsZS5pbmRleE9mKHRoaXMuc2l6ZSk7XHJcblxyXG4gICAgICAgIGlmICh+aW5kKVxyXG4gICAgICAgICAgICBpbmQgPSBpbmQgKyBjb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZXNTY2FsZVtpbmRdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjaGVjayhzaXplQikge1xyXG4gICAgICAgIHJldHVybiAhISh0aGlzLnNpemUgJiYgc2l6ZUIpICYmIHRoaXMuc2l6ZSA9PT0gc2l6ZUI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc0RlZih4KSB7XHJcbiAgICByZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KG9iaiwgLi4ucHJvcHMpIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSAvLyDRhNGD0L3QutGG0LjQuCDQvdC1INC/0YDQtdC00L/QvtC70LDQs9Cw0Y7RgtGB0Y9cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGxldCBjdXJyZW50ID0gb2JqO1xyXG5cclxuICAgIGZvciAobGV0IHByb3Agb2YgcHJvcHMpIHtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0RlZihwcm9wKSlcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBTaXplLFxyXG4gICAgZ2V0XHJcbn0iLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBCdXR0b25Qb3NpdGlvbiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAncGxhY2Vob2xkZXInXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzID0gbmV3IE1hcCgpOyAvLyDRhdGA0LDQvdC40LwgMSBwbGFjZWhvbGRlclxyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIGJ1dHRvblxyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVE9ETyDRgdGH0LjRgtCw0LXQvCwg0YfRgtC+INCyINCx0LvQvtC60LUgd2FybmluZyDQvdC1INCx0L7Qu9C10LUgMSBidXR0b24g0Lgg0L3QtSDQsdC+0LvQtdC1IDEgcGxhY2Vob2xlciAo0YXQvtGC0Y8g0Y3RgtC+INC90LUg0L7QsdGP0LfQsNC90L4g0LHRi9GC0Ywg0YLQsNC6KVxyXG4gICAgICAgIC8vINCSINC/0YDQvtGC0LjQstC90L7QvCDRgdC70YPRh9Cw0LUsINC90LXQv9C+0L3Rj9GC0L3QviDQutCw0Log0LjRhSDQvNCw0YLRh9C40YLRjCDQtNGA0YPQsyDRgSDQtNGA0YPQs9C+0LwgKNC90LDQv9GA0LjQvNC10YAg0LIg0YLQsNC60L7QuSDRgdC40YLRg9Cw0YbQuNC4OiBidXR0b24sIHBsYWNlaG9sZGVyLCBidXR0b24pXHJcbiAgICAgICAgLy8g0LgsINGB0L7QvtGC0LLQtdGC0YHRgtCy0LXQvdC90L4sINCy0YvQtNCw0LLQsNGC0Ywg0L7RiNC40LHQutC4XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdwbGFjZWhvbGRlcicpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyTm9kZXMuaGFzKHdhcm5pbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZhbGlkQnV0dG9uID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW52YWxpZEJ1dHRvbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24oaW52YWxpZEJ1dHRvbi5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblBvc2l0aW9uOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdFwiO1xyXG5cclxuY2xhc3MgQnV0dG9uU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAndGV4dCddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnRleHROb2RlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnV0dG9uTm9kZXMgPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgYnV0dG9uTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RUZXh0Tm9kZSA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuICAgICAgICBjb25zdCBidXR0b25zID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghYnV0dG9ucylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghZmlyc3RUZXh0Tm9kZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdFRleHROb2RlLm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgc2l6ZS5hZGQoMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldChidXR0b24ubW9kcywgJ3NpemUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZS5jaGVjayhzaXplVmFsQikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZShidXR0b24ubG9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNpemU7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemV9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNvbnN0IGNvcnJlY3RTaXplcyA9IFsncycsICdtJywgJ2wnXTtcclxuXHJcbmNsYXNzIFBsYWNlaG9sZGVyU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdwbGFjZWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGdldChub2RlLm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3QgaW5kID0gY29ycmVjdFNpemVzLmluZGV4T2Yoc2l6ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGluZCA9PT0gLTEpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUobm9kZS5sb2NhdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxhY2Vob2xkZXJTaXplOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWx9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIFRleHRTaXplcyBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIXRleHROb2RlcylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBbZmlyc3QsIC4uLm90aGVyXSA9IHRleHROb2RlcztcclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdC5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHRleHQgb2Ygb3RoZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZVZhbEIgPSBnZXQodGV4dC5tb2RzLCAnc2l6ZScpO1xyXG5cclxuICAgICAgICAgICAgLy8g0JTQsNC20LUg0LXRgdC70Lgg0LIg0YDQsNC80LrQsNGFINC+0LTQvdC+0LPQviDQsdC70L7QutCwINC90LXRgdC60L7Qu9GM0LrQviDQvtGI0LjQsdC+0YfQvdGL0YUg0YHQu9C+0LIsINGC0L4g0LLQvtCy0YDQsNGJ0LDQtdC8INC+0LTQvdGDINC+0YjQuNCx0LrRgy5cclxuICAgICAgICAgICAgaWYgKCFzaXplLmNoZWNrKHNpemVWYWxCKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbChub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0U2l6ZXM7Il0sInNvdXJjZVJvb3QiOiIifQ==