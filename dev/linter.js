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

tests.forEach(test => {
    const res = window.lint(test);

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
   */
  constructor(node) {
    this.block = node[BLOCK];
    this.elem = node[ELEM];
    this.mods = node[MODS];
    this.mix = node[MIX];
    this.elemMods = node[ELEMMODS];
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

/***/ "./src/error/system.js":
/*!*****************************!*\
  !*** ./src/error/system.js ***!
  \*****************************/
/*! exports provided: InvalidInput, NoTextNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidInput", function() { return InvalidInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoTextNode", function() { return NoTextNode; });
/**
 * @fileoverview Неразрешимые ошибки, после которых прекращаем работу. Их число может сокращаться
 * по мере добавления новых правил в линтер.
 */
class InvalidInput extends Error {
  constructor() {
    super("Invalid input");
  }

}

class NoTextNode extends Error {
  constructor() {
    super("At least 1 text node expected");
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

    return this.errors;
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








const rules = [
/*TextSizes, ButtonSize, ButtonPosition, PlaceholderSize,*/
_text_severalh1_js__WEBPACK_IMPORTED_MODULE_4__["default"], _text_h1h2_js__WEBPACK_IMPORTED_MODULE_5__["default"], _text_h2h3_js__WEBPACK_IMPORTED_MODULE_6__["default"]
/*TooMuch*/
];
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
    let errors = [];
    handlers.forEach(handler => {
      const handlerErrors = handler(bemNode);
      if (!handlerErrors) return;
      if (Array.isArray(handlerErrors)) errors = [...handlerErrors, ...errors];else errors.push(handlerErrors);
    });
    return errors;
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
    this.h2Nodes = [];
    this.h1was = false;
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this)
    };
  }

  in(node) {
    const type = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'type');
    if (!type) return;

    if (type === 'h2') {
      this.h2Nodes.push(node);
      return;
    } // TODO Продолжаем анализировать только до первого h1


    if (type === 'h1' && !this.h1was) {
      this.h1was = true;
      const errors = [];
      this.h2Nodes.forEach(node => {
        const error = new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["TextInvalidH2Position"](node.location);
        errors.push(error);
      });
      if (errors.length) return errors;
    }
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


 // TODO Считаем, что H2 единственный (хотя в общем случае это не так). Иначе такая же проблема, что и в buttonposition.js
// Поэтому просто копипастим тест h1h2

class H2H3 extends _rulebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(['text']);
    this.h3Nodes = [];
    this.h2was = false;
  }

  getPhaseHandlersMap() {
    return {
      [this.phases.in]: this.in.bind(this)
    };
  }

  in(node) {
    const type = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node.mods, 'type');
    if (!type) return;

    if (type === 'h3') {
      this.h3Nodes.push(node);
      return;
    } // TODO Продолжаем анализировать только до первого h2


    if (type === 'h2' && !this.h2was) {
      this.h2was = true;
      const errors = [];
      this.h3Nodes.forEach(node => {
        const error = new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["TextInvalidH3Position"](node.location);
        errors.push(error);
      });
      if (errors.length) return errors;
    }
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
/* harmony import */ var _error_system_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error/system.js */ "./src/error/system.js");






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
/* harmony import */ var _error_system_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error/system.js */ "./src/error/system.js");





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcmtldGluZy90b29tdWNoLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90ZXh0L2gxaDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDJoMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJCTE9DSyIsIkVMRU0iLCJDT05URU5UIiwiTU9EUyIsIk1JWCIsIkVMRU1NT0RTIiwiUFJPUFMiLCJsb2NhdGlvbktleSIsIkpzb25Tb3VyY2VNYXAiLCJrZXkiLCJCZW1Ob2RlIiwiY29uc3RydWN0b3IiLCJub2RlIiwiYmxvY2siLCJlbGVtIiwibW9kcyIsIm1peCIsImVsZW1Nb2RzIiwibG9jYXRpb24iLCJzZWxlY3RvciIsIldhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwiLCJMaW50RXJyb3IiLCJjb2RlIiwiZXJyb3IiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uIiwiV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUiLCJUZXh0U2V2ZXJhbEgxIiwiVGV4dEludmFsaWRIMlBvc2l0aW9uIiwiVGV4dEludmFsaWRIM1Bvc2l0aW9uIiwiR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MiLCJJbnZhbGlkSW5wdXQiLCJFcnJvciIsIk5vVGV4dE5vZGUiLCJwb3NpdGlvbktleSIsIlN5bWJvbCIsInJlc3VsdCIsInBhcnNlIiwianNvbiIsImRhdGEiLCJwb2ludGVycyIsImUiLCJtYXRjaCIsInBhdGgiLCJ2YWx1ZSIsInZhbHVlRW5kIiwic3RhcnQiLCJlbmQiLCJtYXAiLCJ2YWwiLCJsaW5lIiwiY29sdW1uIiwiY2hpbGRyZW4iLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiY2hpbGQiLCJpbmQiLCJwaGFzZXMiLCJSdWxlQmFzZSIsInByb3RvdHlwZSIsInJ1bGVDbGFzc2VzIiwiYmVtTm9kZSIsImNvbnRlbnRBc0FycmF5IiwiY2FsbCIsImluIiwibmV4dCIsIm91dCIsIm1lZGlhdG9yIiwiZXJyb3JzIiwiaW5pdCIsInN0cmluZ1RyZWUiLCJhdHRhY2hSb290IiwibWFwcGVyIiwicm9vdCIsImdldEpzb24iLCJjYWxsQWxsIiwicnVsZXNJbnN0YW5jZXMiLCJyQ2xhc3MiLCJSdWxlTWVkaWF0b3IiLCJwaGFzZSIsImFkZEVycm9ycyIsImVsIiwiU2V2ZXJhbEgxIiwiSDFIMiIsIkgySDMiLCJtYXJrZXRpbmdCbG9ja3MiLCJUb29NdWNoIiwiZ3JpZCIsImdyaWRGcmFjdGlvbiIsInRvdGFsTWFya2V0aW5nIiwiZ2V0UGhhc2VIYW5kbGVyc01hcCIsImJpbmQiLCJzaXplIiwiZ2V0IiwiaW5jbHVkZXMiLCJmdWxsU2l6ZSIsInRvdGFsSW5mbyIsInNlbGVjdG9ycyIsImdldFNlbGVjdG9ycyIsIkhhbmRsZXJUeXBlIiwiSGFuZGxlcnNNYXBUeXBlIiwiaGFuZGxlcnNNYXAiLCJidWlsZE1hcCIsInJ1bGUiLCJoYW5kbGVyIiwiZ2V0S2V5IiwicHVzaCIsImhhbmRsZXJzIiwiaGFuZGxlckVycm9ycyIsImZpbHRlciIsImgyTm9kZXMiLCJoMXdhcyIsInR5cGUiLCJsZW5ndGgiLCJoM05vZGVzIiwiaDJ3YXMiLCJzaXplc1NjYWxlIiwiU2l6ZSIsImFkZCIsImNvdW50IiwiaW5kZXhPZiIsImNoZWNrIiwic2l6ZUIiLCJpc0RlZiIsIngiLCJ1bmRlZmluZWQiLCJvYmoiLCJwcm9wcyIsImN1cnJlbnQiLCJwcm9wIiwiQnV0dG9uUG9zaXRpb24iLCJ3YXJuaW5ncyIsInBsYWNlaG9sZGVyTm9kZXMiLCJNYXAiLCJidXR0b25Ob2RlcyIsIndhcm5pbmciLCJnZXRMYXN0V2FybmluZyIsImhhcyIsImludmFsaWRCdXR0b24iLCJzZXQiLCJwb3AiLCJkZWxldGUiLCJCdXR0b25TaXplIiwidGV4dE5vZGVzIiwiZmlyc3RUZXh0Tm9kZSIsImJ1dHRvbnMiLCJzaXplVmFsQSIsImJ1dHRvbiIsInNpemVWYWxCIiwiY29ycmVjdFNpemVzIiwiUGxhY2Vob2xkZXJTaXplIiwiVGV4dFNpemVzIiwiZmlyc3QiLCJvdGhlciIsInRleHQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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QUQsRUFBUSxHQUFHQyxLQUFYLElBQW9CVixTQUExQjtBQUNBLFVBQU1HLFFBQVEsR0FBR3JELHFEQUFHLENBQUMyRCxLQUFLLENBQUMxSSxJQUFQLEVBQWEsTUFBYixDQUFwQjtBQUNBLFVBQU04RSxJQUFJLEdBQUcsSUFBSXlCLDhDQUFKLENBQVM2QixRQUFULENBQWI7O0FBRUEsU0FBSyxJQUFJUSxJQUFULElBQWlCRCxLQUFqQixFQUF3QjtBQUNwQixZQUFNTCxRQUFRLEdBQUd2RCxxREFBRyxDQUFDNkQsSUFBSSxDQUFDNUksSUFBTixFQUFZLE1BQVosQ0FBcEIsQ0FEb0IsQ0FHcEI7O0FBQ0EsVUFBSSxDQUFDOEUsSUFBSSxDQUFDNkIsS0FBTCxDQUFXMkIsUUFBWCxDQUFMLEVBQ0ksT0FBTyxJQUFJakksZ0ZBQUosQ0FBaUNSLElBQUksQ0FBQ00sUUFBdEMsQ0FBUDtBQUNQO0FBQ0o7O0FBRUR1SCxnQkFBYyxHQUFHO0FBQ2IsVUFBTXZCLE1BQU0sR0FBRyxLQUFLa0IsUUFBTCxDQUFjbEIsTUFBN0I7QUFFQSxXQUFPLEtBQUtrQixRQUFMLENBQWNsQixNQUFNLEdBQUcsQ0FBdkIsQ0FBUDtBQUNIOztBQWpFNEI7O0FBb0VsQnNDLHdFQUFmLEUiLCJmaWxlIjoibGludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBMaW50ZXIgZnJvbSAnLi9zcmMvbGludGVyLmpzJztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vc3JjL3J1bGVzL2xpc3QuanMnXHJcblxyXG4vLyBUT0RPIGZvciB0ZXN0XHJcbi8vIGltcG9ydCB7dGVzdHMsIGFuc3dlcnN9IGZyb20gXCIuL3Rlc3RjYXNlcy5qc1wiO1xyXG5cclxuY29uc3QgbGludGVyID0gbmV3IExpbnRlcihydWxlcyk7XHJcblxyXG53aW5kb3cubGludCA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgcmV0dXJuIGxpbnRlci5saW50KHN0cik7XHJcbn07XHJcblxyXG4vLyBUT0RPIGZvciB0ZXN0XHJcbi8qXHJcblxyXG50ZXN0cy5mb3JFYWNoKHRlc3QgPT4ge1xyXG4gICAgY29uc3QgcmVzID0gd2luZG93LmxpbnQodGVzdCk7XHJcblxyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxufSlcclxuKi9cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXNjYXBlZENoYXJzID0ge1xuICAnYic6ICdcXGInLFxuICAnZic6ICdcXGYnLFxuICAnbic6ICdcXG4nLFxuICAncic6ICdcXHInLFxuICAndCc6ICdcXHQnLFxuICAnXCInOiAnXCInLFxuICAnLyc6ICcvJyxcbiAgJ1xcXFwnOiAnXFxcXCdcbn07XG5cbnZhciBBX0NPREUgPSAnYScuY2hhckNvZGVBdCgpO1xuXG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc291cmNlLCBfLCBvcHRpb25zKSB7XG4gIHZhciBwb2ludGVycyA9IHt9O1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW4gPSAwO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGJpZ2ludCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5iaWdpbnQgJiYgdHlwZW9mIEJpZ0ludCAhPSAndW5kZWZpbmVkJztcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiBfcGFyc2UoJycsIHRydWUpLFxuICAgIHBvaW50ZXJzOiBwb2ludGVyc1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9wYXJzZShwdHIsIHRvcExldmVsKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBkYXRhO1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgY2FzZSAndCc6IHJlYWQoJ3J1ZScpOyBkYXRhID0gdHJ1ZTsgYnJlYWs7XG4gICAgICBjYXNlICdmJzogcmVhZCgnYWxzZScpOyBkYXRhID0gZmFsc2U7IGJyZWFrO1xuICAgICAgY2FzZSAnbic6IHJlYWQoJ3VsbCcpOyBkYXRhID0gbnVsbDsgYnJlYWs7XG4gICAgICBjYXNlICdcIic6IGRhdGEgPSBwYXJzZVN0cmluZygpOyBicmVhaztcbiAgICAgIGNhc2UgJ1snOiBkYXRhID0gcGFyc2VBcnJheShwdHIpOyBicmVhaztcbiAgICAgIGNhc2UgJ3snOiBkYXRhID0gcGFyc2VPYmplY3QocHRyKTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBiYWNrQ2hhcigpO1xuICAgICAgICBpZiAoJy0wMTIzNDU2Nzg5Jy5pbmRleE9mKGNoYXIpID49IDApXG4gICAgICAgICAgZGF0YSA9IHBhcnNlTnVtYmVyKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgICB9XG4gICAgbWFwKHB0ciwgJ3ZhbHVlRW5kJyk7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIGlmICh0b3BMZXZlbCAmJiBwb3MgPCBzb3VyY2UubGVuZ3RoKSB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdoaXRlc3BhY2UoKSB7XG4gICAgbG9vcDpcbiAgICAgIHdoaWxlIChwb3MgPCBzb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgIHN3aXRjaCAoc291cmNlW3Bvc10pIHtcbiAgICAgICAgICBjYXNlICcgJzogY29sdW1uKys7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcdCc6IGNvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiBjb2x1bW4gPSAwOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXG4nOiBjb2x1bW4gPSAwOyBsaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrIGxvb3A7XG4gICAgICAgIH1cbiAgICAgICAgcG9zKys7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVN0cmluZygpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgdmFyIGNoYXI7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXCInKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09ICdcXFxcJykge1xuICAgICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgICBpZiAoY2hhciBpbiBlc2NhcGVkQ2hhcnMpXG4gICAgICAgICAgc3RyICs9IGVzY2FwZWRDaGFyc1tjaGFyXTtcbiAgICAgICAgZWxzZSBpZiAoY2hhciA9PSAndScpXG4gICAgICAgICAgc3RyICs9IGdldENoYXJDb2RlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSBjaGFyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VOdW1iZXIoKSB7XG4gICAgdmFyIG51bVN0ciA9ICcnO1xuICAgIHZhciBpbnRlZ2VyID0gdHJ1ZTtcbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuXG4gICAgbnVtU3RyICs9IHNvdXJjZVtwb3NdID09ICcwJ1xuICAgICAgICAgICAgICA/IGdldENoYXIoKVxuICAgICAgICAgICAgICA6IGdldERpZ2l0cygpO1xuXG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICcuJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKSArIGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnZScgfHwgc291cmNlW3Bvc10gPT0gJ0UnKSB7XG4gICAgICBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKHNvdXJjZVtwb3NdID09ICcrJyB8fCBzb3VyY2VbcG9zXSA9PSAnLScpIG51bVN0ciArPSBnZXRDaGFyKCk7XG4gICAgICBudW1TdHIgKz0gZ2V0RGlnaXRzKCk7XG4gICAgICBpbnRlZ2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9ICtudW1TdHI7XG4gICAgcmV0dXJuIGJpZ2ludCAmJiBpbnRlZ2VyICYmIChyZXN1bHQgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCByZXN1bHQgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUilcbiAgICAgICAgICAgID8gQmlnSW50KG51bVN0cilcbiAgICAgICAgICAgIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VBcnJheShwdHIpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICBpZiAoZ2V0Q2hhcigpID09ICddJykgcmV0dXJuIGFycjtcbiAgICBiYWNrQ2hhcigpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgIGFyci5wdXNoKF9wYXJzZShpdGVtUHRyKSk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICddJykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VPYmplY3QocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBvYmogPSB7fTtcbiAgICBpZiAoZ2V0Q2hhcigpID09ICd9JykgcmV0dXJuIG9iajtcbiAgICBiYWNrQ2hhcigpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBsb2MgPSBnZXRMb2MoKTtcbiAgICAgIGlmIChnZXRDaGFyKCkgIT0gJ1wiJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB2YXIga2V5ID0gcGFyc2VTdHJpbmcoKTtcbiAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgIG1hcExvYyhwcm9wUHRyLCAna2V5JywgbG9jKTtcbiAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICc6Jykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBvYmpba2V5XSA9IF9wYXJzZShwcm9wUHRyKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ30nKSBicmVhaztcbiAgICAgIGlmIChjaGFyICE9ICcsJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkKHN0cikge1xuICAgIGZvciAodmFyIGk9MDsgaTxzdHIubGVuZ3RoOyBpKyspXG4gICAgICBpZiAoZ2V0Q2hhcigpICE9PSBzdHJbaV0pIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hhcigpIHtcbiAgICBjaGVja1VuZXhwZWN0ZWRFbmQoKTtcbiAgICB2YXIgY2hhciA9IHNvdXJjZVtwb3NdO1xuICAgIHBvcysrO1xuICAgIGNvbHVtbisrOyAvLyBuZXcgbGluZT9cbiAgICByZXR1cm4gY2hhcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhY2tDaGFyKCkge1xuICAgIHBvcy0tO1xuICAgIGNvbHVtbi0tO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hhckNvZGUoKSB7XG4gICAgdmFyIGNvdW50ID0gNDtcbiAgICB2YXIgY29kZSA9IDA7XG4gICAgd2hpbGUgKGNvdW50LS0pIHtcbiAgICAgIGNvZGUgPDw9IDQ7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ2YnKVxuICAgICAgICBjb2RlICs9IGNoYXIuY2hhckNvZGVBdCgpIC0gQV9DT0RFICsgMTA7XG4gICAgICBlbHNlIGlmIChjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgY29kZSArPSArY2hhcjtcbiAgICAgIGVsc2VcbiAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlnaXRzKCkge1xuICAgIHZhciBkaWdpdHMgPSAnJztcbiAgICB3aGlsZSAoc291cmNlW3Bvc10gPj0gJzAnICYmIHNvdXJjZVtwb3NdIDw9ICc5JylcbiAgICAgIGRpZ2l0cyArPSBnZXRDaGFyKCk7XG5cbiAgICBpZiAoZGlnaXRzLmxlbmd0aCkgcmV0dXJuIGRpZ2l0cztcbiAgICBjaGVja1VuZXhwZWN0ZWRFbmQoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBtYXBMb2MocHRyLCBwcm9wLCBnZXRMb2MoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXBMb2MocHRyLCBwcm9wLCBsb2MpIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0gbG9jO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBwb3M6IHBvc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1bmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIHRva2VuICcgKyBzb3VyY2VbcG9zXSArICcgaW4gSlNPTiBhdCBwb3NpdGlvbiAnICsgcG9zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhc1VuZXhwZWN0ZWRUb2tlbigpIHtcbiAgICBiYWNrQ2hhcigpO1xuICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVbmV4cGVjdGVkRW5kKCkge1xuICAgIGlmIChwb3MgPj0gc291cmNlLmxlbmd0aClcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgSlNPTiBpbnB1dCcpO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKGRhdGEsIF8sIG9wdGlvbnMpIHtcbiAgaWYgKCF2YWxpZFR5cGUoZGF0YSkpIHJldHVybjtcbiAgdmFyIHdzTGluZSA9IDA7XG4gIHZhciB3c1Bvcywgd3NDb2x1bW47XG4gIHZhciB3aGl0ZXNwYWNlID0gdHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLnNwYWNlXG4gICAgICAgICAgICAgICAgICAgIDogb3B0aW9ucztcbiAgc3dpdGNoICh0eXBlb2Ygd2hpdGVzcGFjZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICB2YXIgbGVuID0gd2hpdGVzcGFjZSA+IDEwXG4gICAgICAgICAgICAgICAgICA/IDEwXG4gICAgICAgICAgICAgICAgICA6IHdoaXRlc3BhY2UgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgICAgICA6IE1hdGguZmxvb3Iod2hpdGVzcGFjZSk7XG4gICAgICB3aGl0ZXNwYWNlID0gbGVuICYmIHJlcGVhdChsZW4sICcgJyk7XG4gICAgICB3c1BvcyA9IGxlbjtcbiAgICAgIHdzQ29sdW1uID0gbGVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHdoaXRlc3BhY2UgPSB3aGl0ZXNwYWNlLnNsaWNlKDAsIDEwKTtcbiAgICAgIHdzUG9zID0gMDtcbiAgICAgIHdzQ29sdW1uID0gMDtcbiAgICAgIGZvciAodmFyIGo9MDsgajx3aGl0ZXNwYWNlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBjaGFyID0gd2hpdGVzcGFjZVtqXTtcbiAgICAgICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICAgICAgY2FzZSAnICc6IHdzQ29sdW1uKys7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcdCc6IHdzQ29sdW1uICs9IDQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xccic6IHdzQ29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogd3NDb2x1bW4gPSAwOyB3c0xpbmUrKzsgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCd3aGl0ZXNwYWNlIGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgaW4gSlNPTicpO1xuICAgICAgICB9XG4gICAgICAgIHdzUG9zKys7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgd2hpdGVzcGFjZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBqc29uID0gJyc7XG4gIHZhciBwb2ludGVycyA9IHt9O1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW4gPSAwO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGVzNiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lczYgJiYgdHlwZW9mIE1hcCA9PSAnZnVuY3Rpb24nO1xuICBfc3RyaW5naWZ5KGRhdGEsIDAsICcnKTtcbiAgcmV0dXJuIHtcbiAgICBqc29uOiBqc29uLFxuICAgIHBvaW50ZXJzOiBwb2ludGVyc1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9zdHJpbmdpZnkoX2RhdGEsIGx2bCwgcHRyKSB7XG4gICAgbWFwKHB0ciwgJ3ZhbHVlJyk7XG4gICAgc3dpdGNoICh0eXBlb2YgX2RhdGEpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIG91dCgnJyArIF9kYXRhKTsgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBvdXQocXVvdGVkKF9kYXRhKSk7IGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKF9kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgb3V0KCdudWxsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF9kYXRhLnRvSlNPTiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb3V0KHF1b3RlZChfZGF0YS50b0pTT04oKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoX2RhdGEpKSB7XG4gICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgfSBlbHNlIGlmIChlczYpIHtcbiAgICAgICAgICBpZiAoX2RhdGEuY29uc3RydWN0b3IuQllURVNfUEVSX0VMRU1FTlQpXG4gICAgICAgICAgICBzdHJpbmdpZnlBcnJheSgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgTWFwKVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KCk7XG4gICAgICAgICAgZWxzZSBpZiAoX2RhdGEgaW5zdGFuY2VvZiBTZXQpXG4gICAgICAgICAgICBzdHJpbmdpZnlNYXBTZXQodHJ1ZSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RyaW5naWZ5T2JqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyaW5naWZ5T2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWFwKHB0ciwgJ3ZhbHVlRW5kJyk7XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlBcnJheSgpIHtcbiAgICAgIGlmIChfZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgb3V0KCdbJyk7XG4gICAgICAgIHZhciBpdGVtTHZsID0gbHZsICsgMTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPF9kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkpIG91dCgnLCcpO1xuICAgICAgICAgIGluZGVudChpdGVtTHZsKTtcbiAgICAgICAgICB2YXIgaXRlbSA9IHZhbGlkVHlwZShfZGF0YVtpXSkgPyBfZGF0YVtpXSA6IG51bGw7XG4gICAgICAgICAgdmFyIGl0ZW1QdHIgPSBwdHIgKyAnLycgKyBpO1xuICAgICAgICAgIF9zdHJpbmdpZnkoaXRlbSwgaXRlbUx2bCwgaXRlbVB0cik7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnXScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCdbXScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdCgpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoX2RhdGEpO1xuICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgdmFyIHZhbHVlID0gX2RhdGFba2V5XTtcbiAgICAgICAgICBpZiAodmFsaWRUeXBlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKGkpIG91dCgnLCcpO1xuICAgICAgICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgICAgICAgaW5kZW50KHByb3BMdmwpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXknKTtcbiAgICAgICAgICAgIG91dChxdW90ZWQoa2V5KSk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgICAgICAgb3V0KCc6Jyk7XG4gICAgICAgICAgICBpZiAod2hpdGVzcGFjZSkgb3V0KCcgJyk7XG4gICAgICAgICAgICBfc3RyaW5naWZ5KHZhbHVlLCBwcm9wTHZsLCBwcm9wUHRyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnfScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCd7fScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeU1hcFNldChpc1NldCkge1xuICAgICAgaWYgKF9kYXRhLnNpemUpIHtcbiAgICAgICAgb3V0KCd7Jyk7XG4gICAgICAgIHZhciBwcm9wTHZsID0gbHZsICsgMTtcbiAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGVudHJpZXMgPSBfZGF0YS5lbnRyaWVzKCk7XG4gICAgICAgIHZhciBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB3aGlsZSAoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgIHZhciBrZXkgPSBpdGVtWzBdO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGlzU2V0ID8gdHJ1ZSA6IGl0ZW1bMV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICghZmlyc3QpIG91dCgnLCcpO1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnfScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCd7fScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG91dChzdHIpIHtcbiAgICBjb2x1bW4gKz0gc3RyLmxlbmd0aDtcbiAgICBwb3MgKz0gc3RyLmxlbmd0aDtcbiAgICBqc29uICs9IHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluZGVudChsdmwpIHtcbiAgICBpZiAod2hpdGVzcGFjZSkge1xuICAgICAganNvbiArPSAnXFxuJyArIHJlcGVhdChsdmwsIHdoaXRlc3BhY2UpO1xuICAgICAgbGluZSsrO1xuICAgICAgY29sdW1uID0gMDtcbiAgICAgIHdoaWxlIChsdmwtLSkge1xuICAgICAgICBpZiAod3NMaW5lKSB7XG4gICAgICAgICAgbGluZSArPSB3c0xpbmU7XG4gICAgICAgICAgY29sdW1uID0gd3NDb2x1bW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uICs9IHdzQ29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIHBvcyArPSB3c1BvcztcbiAgICAgIH1cbiAgICAgIHBvcyArPSAxOyAvLyBcXG4gY2hhcmFjdGVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFwKHB0ciwgcHJvcCkge1xuICAgIHBvaW50ZXJzW3B0cl0gPSBwb2ludGVyc1twdHJdIHx8IHt9O1xuICAgIHBvaW50ZXJzW3B0cl1bcHJvcF0gPSB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBwb3M6IHBvc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiByZXBlYXQobiwgc3RyKSB7XG4gICAgcmV0dXJuIEFycmF5KG4gKyAxKS5qb2luKHN0cik7XG4gIH1cbn07XG5cblxudmFyIFZBTElEX1RZUEVTID0gWydudW1iZXInLCAnYmlnaW50JywgJ2Jvb2xlYW4nLCAnc3RyaW5nJywgJ29iamVjdCddO1xuZnVuY3Rpb24gdmFsaWRUeXBlKGRhdGEpIHtcbiAgcmV0dXJuIFZBTElEX1RZUEVTLmluZGV4T2YodHlwZW9mIGRhdGEpID49IDA7XG59XG5cblxudmFyIEVTQ19RVU9URSA9IC9cInxcXFxcL2c7XG52YXIgRVNDX0IgPSAvW1xcYl0vZztcbnZhciBFU0NfRiA9IC9cXGYvZztcbnZhciBFU0NfTiA9IC9cXG4vZztcbnZhciBFU0NfUiA9IC9cXHIvZztcbnZhciBFU0NfVCA9IC9cXHQvZztcbmZ1bmN0aW9uIHF1b3RlZChzdHIpIHtcbiAgc3RyID0gc3RyLnJlcGxhY2UoRVNDX1FVT1RFLCAnXFxcXCQmJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX0YsICdcXFxcZicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19CLCAnXFxcXGInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfTiwgJ1xcXFxuJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX1IsICdcXFxccicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19ULCAnXFxcXHQnKTtcbiAgcmV0dXJuICdcIicgKyBzdHIgKyAnXCInO1xufVxuXG5cbnZhciBFU0NfMCA9IC9+L2c7XG52YXIgRVNDXzEgPSAvXFwvL2c7XG5mdW5jdGlvbiBlc2NhcGVKc29uUG9pbnRlcihzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKEVTQ18wLCAnfjAnKVxuICAgICAgICAgICAgLnJlcGxhY2UoRVNDXzEsICd+MScpO1xufVxuIiwiaW1wb3J0IFBST1BTIGZyb20gJy4vcHJvcG5hbWVzLmpzJztcclxuaW1wb3J0IEpzb25Tb3VyY2VNYXAgZnJvbSAnLi9qc29uc291cmNlbWFwLmpzJztcclxuXHJcbmNvbnN0IHtCTE9DSywgRUxFTSwgQ09OVEVOVCwgTU9EUywgTUlYLCBFTEVNTU9EU30gPSBQUk9QUztcclxuY29uc3QgbG9jYXRpb25LZXkgPSBKc29uU291cmNlTWFwLmtleTtcclxuXHJcbmNsYXNzIEJlbU5vZGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlKSB7XHJcbiAgICAgICAgdGhpcy5ibG9jayA9IG5vZGVbQkxPQ0tdO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IG5vZGVbRUxFTV07XHJcbiAgICAgICAgdGhpcy5tb2RzID0gbm9kZVtNT0RTXTtcclxuICAgICAgICB0aGlzLm1peCA9IG5vZGVbTUlYXTtcclxuICAgICAgICB0aGlzLmVsZW1Nb2RzID0gbm9kZVtFTEVNTU9EU11cclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG5vZGVbbG9jYXRpb25LZXldO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy5ibG9jayArICh0aGlzLmVsZW0gPyAoYF9fJHt0aGlzLmVsZW19YCkgOiAnJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlbU5vZGU7IiwiaW1wb3J0IExpbnRFcnJvciBmcm9tICcuL2xpbnRlcnJvci5qcyc7XHJcblxyXG5jbGFzcyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5URVhUX1NJWkVTX1NIT1VMRF9CRV9FUVVBTCcsIGVycm9yOiAn0KLQtdC60YHRgtGLINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC90Ysg0LHRi9GC0Ywg0L7QtNC90L7Qs9C+INGA0LDQt9C80LXRgNCwLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fU0laRScsIGVycm9yOiAn0KDQsNC30LzQtdGAINC60L3QvtC/0LrQuCDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC90LAgMSDRiNCw0LMg0LHQvtC70YzRiNC1INGN0YLQsNC70L7QvdC90L7Qs9C+LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1BPU0lUSU9OJywgZXJyb3I6ICfQkdC70L7QuiBidXR0b24g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9C+0YHQu9C1INCx0LvQvtC60LAgcGxhY2Vob2xkZXIuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfUExBQ0VIT0xERVJfU0laRScsIGVycm9yOiAn0JTQvtC/0YPRgdGC0LjQvNGL0LUg0YDQsNC30LzQtdGA0Ysg0LTQu9GPINCx0LvQvtC60LAgcGxhY2Vob2xkZXIg0LIg0LHQu9C+0LrQtSB3YXJuaW5nOiBzLCBtLCBsLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTZXZlcmFsSDEgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULlNFVkVSQUxfSDEnLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQtdC00LjQvdGB0YLQstC10L3QvdGL0LwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIMlBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gyX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgzUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDNfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDRgtGA0LXRgtGM0LXQs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdHUklELlRPT19NVUNIX01BUktFVElOR19CTE9DS1MnLCBlcnJvcjogJ9Cc0LDRgNC60LXRgtC40L3Qs9C+0LLRi9C1INCx0LvQvtC60Lgg0L3QtSDQvNC+0LPRg9GCINC30LDQvdC40LzQsNGC0Ywg0LHQvtC70YzRiNC1INC/0L7Qu9C+0LLQuNC90Ysg0L7RgiDQstGB0LXRhSDQutC+0LvQvtC90L7QuiDQsdC70L7QutCwIGdyaWQnLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24sXHJcbiAgICBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFRleHRTZXZlcmFsSDEsXHJcbiAgICBUZXh0SW52YWxpZEgyUG9zaXRpb24sXHJcbiAgICBUZXh0SW52YWxpZEgzUG9zaXRpb24sXHJcbiAgICBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc1xyXG59IiwiXHJcbmNsYXNzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7Y29kZSwgZXJyb3IsIGxvY2F0aW9ufSkge1xyXG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludEVycm9yOyIsIlxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyDQndC10YDQsNC30YDQtdGI0LjQvNGL0LUg0L7RiNC40LHQutC4LCDQv9C+0YHQu9C1INC60L7RgtC+0YDRi9GFINC/0YDQtdC60YDQsNGJ0LDQtdC8INGA0LDQsdC+0YLRgy4g0JjRhSDRh9C40YHQu9C+INC80L7QttC10YIg0YHQvtC60YDQsNGJ0LDRgtGM0YHRj1xyXG4gKiDQv9C+INC80LXRgNC1INC00L7QsdCw0LLQu9C10L3QuNGPINC90L7QstGL0YUg0L/RgNCw0LLQuNC7INCyINC70LjQvdGC0LXRgC5cclxuICovXHJcbmNsYXNzIEludmFsaWRJbnB1dCBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiSW52YWxpZCBpbnB1dFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTm9UZXh0Tm9kZSBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiQXQgbGVhc3QgMSB0ZXh0IG5vZGUgZXhwZWN0ZWRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBJbnZhbGlkSW5wdXQsXHJcbiAgICBOb1RleHROb2RlXHJcbn0iLCIvKipcclxuICogQGZpbGVvdmVydmlldyDQkNC00LDQv9GC0LXRgCDRhNGD0L3QutGG0LjQuCBwYXJzZSDQuNC3INCx0LjQsdC70LjQvtGC0LXQutC4IGpzb24tc291cmNlLW1hcFxyXG4gKi9cclxuXHJcbmltcG9ydCB7cGFyc2V9IGZyb20gJ2pzb24tc291cmNlLW1hcCc7XHJcbmltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCB7SW52YWxpZElucHV0fSBmcm9tIFwiLi9lcnJvci9zeXN0ZW0uanNcIjtcclxuXHJcblxyXG5jb25zdCB7Q09OVEVOVH0gPSBQUk9QUztcclxuXHJcbmNvbnN0IHBvc2l0aW9uS2V5ID0gU3ltYm9sKCdQb3NpdGlvbicpO1xyXG5cclxuY2xhc3MgSnNvblNvdXJjZU1hcCB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3RyKSB7XHJcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XHJcbiAgICAgICAgdGhpcy5qc29uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvaW50ZXJzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRKc29uID0gKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlKHRoaXMuc3RyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuanNvbiA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJzID0gcmVzdWx0LnBvaW50ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkSW5wdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWF0Y2godGhpcy5qc29uLCAnJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmpzb247XHJcbiAgICB9O1xyXG5cclxuICAgIG1hdGNoID0gKG5vZGUsIHBhdGgpID0+IHtcclxuICAgICAgICBjb25zdCB7dmFsdWUsIHZhbHVlRW5kfSA9IHRoaXMucG9pbnRlcnNbcGF0aF07XHJcblxyXG4gICAgICAgIC8vICsxINC6IGNvbCwg0YIu0LouINCx0LjQsdC70LjQvtGC0LXQutCwINCy0LXQtNC10YIg0L7RgtGB0YfQtdGCINC+0YIgMC5cclxuICAgICAgICAvLyDQn9GA0Lgg0Y3RgtC+0LwgbGluZSDQsdC10Lcg0LjQt9C80LXQvdC10L3QuNGPLCDRgi7Qui4g0LjRgdGF0L7QtNC90YvQuSBKU09OINC+0LHQtdGA0L3Rg9C70LggKNC/0L7Qu9C+0LbQuNC70Lgg0LLQvdGD0YLRgNGMINGB0LLQvtC50YHRgtCy0LAgXCJjb250ZW50XCIpXHJcbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gW3ZhbHVlLCB2YWx1ZUVuZF0ubWFwKHZhbCA9PiAoe2xpbmU6IHZhbC5saW5lLCBjb2x1bW46IHZhbC5jb2x1bW4gKyAxfSkpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZVtDT05URU5UXTtcclxuXHJcbiAgICAgICAgbm9kZVtwb3NpdGlvbktleV0gPSB7c3RhcnQsIGVuZH07XHJcblxyXG4gICAgICAgIGlmICghY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGQsIGAke3BhdGh9LyR7Q09OVEVOVH0vJHtpbmR9YCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaChjaGlsZHJlbiwgYCR7cGF0aH0vJHtDT05URU5UfWApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGtleSA9IHBvc2l0aW9uS2V5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKc29uU291cmNlTWFwOyIsImltcG9ydCBQUk9QUyBmcm9tIFwiLi9wcm9wbmFtZXMuanNcIjtcclxuaW1wb3J0IEpzb25Tb3VyY2VNYXAgZnJvbSAnLi9qc29uc291cmNlbWFwLmpzJztcclxuaW1wb3J0IEJlbU5vZGUgZnJvbSAnLi9iZW1ub2RlLmpzJztcclxuaW1wb3J0IFJ1bGVNZWRpYXRvciBmcm9tICcuL3J1bGVzL3J1bGVtZWRpYXRvci5qcyc7XHJcbmltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi9ydWxlcy9ydWxlYmFzZS5qc1wiO1xyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcbmNvbnN0IHBoYXNlcyA9IFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXM7XHJcblxyXG5jbGFzcyBMaW50ZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PCFSdWxlQmFzZT59IHJ1bGVDbGFzc2VzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVDbGFzc2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLnJ1bGVDbGFzc2VzID0gcnVsZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWF0b3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGxpbnQoc3RyKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0cmluZ1RyZWUgPSB0aGlzLmF0dGFjaFJvb3Qoc3RyKTtcclxuICAgICAgICBjb25zdCBtYXBwZXIgPSBuZXcgSnNvblNvdXJjZU1hcChzdHJpbmdUcmVlKTtcclxuICAgICAgICBjb25zdCByb290ID0gbWFwcGVyLmdldEpzb24oc3RyaW5nVHJlZSk7XHJcblxyXG4gICAgICAgIHRoaXMubmV4dChyb290KTtcclxuICAgICAgICB0aGlzLmNhbGxBbGwocGhhc2VzLmVuZCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gZmlsdGVyIGVycm9yc1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGNvbnN0IHJ1bGVzSW5zdGFuY2VzID0gdGhpcy5ydWxlQ2xhc3Nlcy5tYXAockNsYXNzID0+IG5ldyByQ2xhc3MoKSk7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWF0b3IgPSBuZXcgUnVsZU1lZGlhdG9yKHJ1bGVzSW5zdGFuY2VzKTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qINCS0YXQvtC0INC80L7QttC10YIg0LHRi9GC0Ywg0L7QsdGK0LXQutGC0L7QvCDQuNC70Lgg0LzQsNGB0YHQuNCy0L7QvCAo0LTQtdGA0LXQstC+INC40LvQuCDQu9C10YEpLiDQlNC+0LHQsNCy0LjQvCDQstC40YDRgtGD0LDQu9GM0L3Ri9C5INC60L7RgNC10L3RjCwg0LLRgdC10LPQtNCwINCx0YvQu9C+INC00LXRgNC10LLQvi4gKi9cclxuICAgIGF0dGFjaFJvb3QgPSBzdHIgPT4gYHtcIiR7Q09OVEVOVH1cIjpcXG4ke3N0cn1cXG59YDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXHJcbiAgICAgKi9cclxuICAgIG5leHQgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJlbU5vZGUgPSBuZXcgQmVtTm9kZShub2RlKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY29udGVudEFzQXJyYXkobm9kZVtDT05URU5UXSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsbChwaGFzZXMuaW4sIGJlbU5vZGUpO1xyXG5cclxuICAgICAgICBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dChjaGlsZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsbChwaGFzZXMub3V0LCBiZW1Ob2RlKTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsbChwaGFzZSwgYmVtTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMubWVkaWF0b3IuY2FsbChwaGFzZSwgYmVtTm9kZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXJyb3JzKGVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEFsbChwaGFzZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMubWVkaWF0b3IuY2FsbEFsbChwaGFzZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXJyb3JzKGVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXJyb3JzKGVycm9ycykge1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gWy4uLmVycm9ycywgLi4udGhpcy5lcnJvcnNdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnRBc0FycmF5KGVsKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKVxyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcblxyXG4gICAgICAgIHJldHVybiBlbCA/IFtlbF0gOiBbXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludGVyOyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIEJMT0NLOiBcImJsb2NrXCIsXHJcbiAgICBFTEVNOiBcImVsZW1cIixcclxuICAgIENPTlRFTlQ6IFwiY29udGVudFwiLFxyXG4gICAgTU9EUzogXCJtb2RzXCIsXHJcbiAgICBNSVg6IFwibWl4XCIsXHJcbiAgICBFTEVNTU9EUzogJ2VsZW1Nb2RzJ1xyXG59OyIsImltcG9ydCBUZXh0U2l6ZXMgZnJvbSAnLi93YXJuaW5nL3RleHRzaXplcy5qcydcclxuaW1wb3J0IEJ1dHRvblNpemUgZnJvbSAnLi93YXJuaW5nL2J1dHRvbnNpemUuanMnXHJcbmltcG9ydCBCdXR0b25Qb3NpdGlvbiBmcm9tICcuL3dhcm5pbmcvYnV0dG9ucG9zaXRpb24uanMnXHJcbmltcG9ydCBQbGFjZWhvbGRlclNpemUgZnJvbSAnLi93YXJuaW5nL3BsYWNlaG9sZGVyc2l6ZS5qcydcclxuaW1wb3J0IFNldmVyYWxIMSBmcm9tICcuL3RleHQvc2V2ZXJhbGgxLmpzJ1xyXG5pbXBvcnQgSDFIMiBmcm9tICcuL3RleHQvaDFoMi5qcydcclxuaW1wb3J0IEgySDMgZnJvbSAnLi90ZXh0L2gyaDMuanMnXHJcbmltcG9ydCBUb29NdWNoIGZyb20gJy4vbWFya2V0aW5nL3Rvb211Y2guanMnXHJcblxyXG5jb25zdCBydWxlcyA9IFtcclxuICAgIC8qVGV4dFNpemVzLCBCdXR0b25TaXplLCBCdXR0b25Qb3NpdGlvbiwgUGxhY2Vob2xkZXJTaXplLCovXHJcbiAgICBTZXZlcmFsSDEsIEgxSDIsIEgySDMsXHJcbiAgICAvKlRvb011Y2gqL1xyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcnVsZXM7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7R3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3N9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3RcIjtcclxuXHJcbmNvbnN0IG1hcmtldGluZ0Jsb2NrcyA9IFsnY29tbWVyY2lhbCcsICdvZmZlciddO1xyXG5cclxuY2xhc3MgVG9vTXVjaCBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnZ3JpZCcsICdncmlkX19mcmFjdGlvbicsIC4uLm1hcmtldGluZ0Jsb2Nrc10pO1xyXG5cclxuICAgICAgICB0aGlzLmdyaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAodGhpcy5ncmlkICYmIG5vZGUuc2VsZWN0b3IgPT09ICdncmlkX19mcmFjdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBub2RlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdncmlkJykge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSBub2RlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmdyaWRGcmFjdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplID0gK2dldCh0aGlzLmdyaWRGcmFjdGlvbi5lbGVtTW9kcywgJ20tY29sJyk7XHJcblxyXG4gICAgICAgIGlmIChtYXJrZXRpbmdCbG9ja3MuaW5jbHVkZXMobm9kZS5ibG9jaykpXHJcbiAgICAgICAgICAgIHRoaXMudG90YWxNYXJrZXRpbmcgKz0gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLnNlbGVjdG9yID09PSAnZ3JpZF9fZnJhY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnZ3JpZCcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZnVsbFNpemUgPSArZ2V0KG5vZGUubW9kcywgJ20tY29sdW1ucycpO1xyXG4gICAgICAgIGxldCBlcnJvcjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxNYXJrZXRpbmcgKiAyID49IGZ1bGxTaXplKVxyXG4gICAgICAgICAgICBlcnJvciA9IG5ldyBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrcyhub2RlLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbEluZm8gPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvb011Y2g7IiwiXHJcbmNsYXNzIFJ1bGVCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICog0J3QsNCx0L7RgCDRgdC10LvQtdC60YLQvtGA0L7QsiAoQmVtTm9kZS5zZWxlY3Rvcikg0YPQt9C70L7Qsiwg0L3QsCDQutC+0YLQvtGA0YvRhSDQsdGD0LTQtdGCINGB0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L/RgNCw0LLQuNC70L4uXHJcbiAgICAgKiDQldGB0LvQuCDQvdC1INC30LDQtNCw0L0gLSDQsdGD0LTQtdGCINGB0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L3QsCDQutCw0LbQtNC+0Lwg0YPQt9C70LUgKFRPRE8pLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2VsZWN0b3JzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9ycyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSBzZWxlY3RvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VsZWN0b3JzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge09iamVjdDxSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzLCBSdWxlQmFzZS5IYW5kbGVyVHlwZT59XHJcbiAgICAgKi9cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgLy8gVE9ETyBlcnJvciBlbWl0dGluZ1xyXG4gICAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBAZW51bXtzdHJpbmd9ICovXHJcblJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMgPSB7XHJcbiAgICAvKiDQktGF0L7QtNC40Lwg0LIg0L7Rh9C10YDQtdC00L3QvtC5INGD0LfQtdC7INC00LXRgNC10LLQsCovXHJcbiAgICBpbjogJ2luJyxcclxuICAgIC8qINCS0YvRhdC+0LTQuNC8ICovXHJcbiAgICBvdXQ6ICdvdXQnLFxyXG4gICAgLyog0JfQsNC60LDQvdGH0LjQstCw0LXQvCDQvtCx0YXQvtC0INC00LXRgNC10LLQsCAqL1xyXG4gICAgZW5kOiAnZW5kJ1xyXG59O1xyXG5cclxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihCZW1Ob2RlKTogKCFMaW50RXJyb3J8dW5kZWZpbmVkKX0gKi9cclxuUnVsZUJhc2UuSGFuZGxlclR5cGU7XHJcblxyXG4vKiogQHR5cGVkZWYge09iamVjdDxSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzLCBPYmplY3Q8c3RyaW5nLCBSdWxlQmFzZS5IYW5kbGVyVHlwZT4+fSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyc01hcFR5cGU7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZUJhc2U7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gJy4vcnVsZWJhc2UuanMnO1xyXG5cclxuY29uc3QgcGhhc2VzID0gUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcztcclxuXHJcbmNsYXNzIFJ1bGVNZWRpYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMgPSBydWxlcztcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyc01hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuYnVpbGRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZE1hcCgpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHJ1bGUuZ2V0U2VsZWN0b3JzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJzTWFwID0gcnVsZS5nZXRQaGFzZUhhbmRsZXJzTWFwKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBwaGFzZSBpbiBoYW5kbGVyc01hcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzTWFwW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhbmRsZXJzTWFwW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzTWFwW2tleV0ucHVzaChoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRLZXkocGhhc2UsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHBoYXNlICsgJyQnICsgc2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheTwhTGludEVycm9yPn1cclxuICAgICAqL1xyXG4gICAgY2FsbChwaGFzZSwgYmVtTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5KHBoYXNlLCBiZW1Ob2RlLnNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBba2V5XSB8fCBbXTtcclxuICAgICAgICBsZXQgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJFcnJvcnMgPSBoYW5kbGVyKGJlbU5vZGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFoYW5kbGVyRXJyb3JzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFuZGxlckVycm9ycykpXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBbLi4uaGFuZGxlckVycm9ycywgLi4uZXJyb3JzXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goaGFuZGxlckVycm9ycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEFsbChwaGFzZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKVtwaGFzZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFuZGxlcilcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGhhbmRsZXIobnVsbCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZU1lZGlhdG9yOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgSDFIMiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgdGhpcy5oMk5vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5oMXdhcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0eXBlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDJOb2Rlcy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETyDQn9GA0L7QtNC+0LvQttCw0LXQvCDQsNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtC+0LvRjNC60L4g0LTQviDQv9C10YDQstC+0LPQviBoMVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDEnICYmICF0aGlzLmgxd2FzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDF3YXMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLmgyTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRleHRJbnZhbGlkSDJQb3NpdGlvbihub2RlLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9ycy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSDFIMjsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0SW52YWxpZEgzUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcblxyXG4vLyBUT0RPINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4gSDIg0LXQtNC40L3RgdGC0LLQtdC90L3Ri9C5ICjRhdC+0YLRjyDQsiDQvtCx0YnQtdC8INGB0LvRg9GH0LDQtSDRjdGC0L4g0L3QtSDRgtCw0LopLiDQmNC90LDRh9C1INGC0LDQutCw0Y8g0LbQtSDQv9GA0L7QsdC70LXQvNCwLCDRh9GC0L4g0Lgg0LIgYnV0dG9ucG9zaXRpb24uanNcclxuLy8g0J/QvtGN0YLQvtC80YMg0L/RgNC+0YHRgtC+INC60L7Qv9C40L/QsNGB0YLQuNC8INGC0LXRgdGCIGgxaDJcclxuY2xhc3MgSDJIMyBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgdGhpcy5oM05vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5oMndhcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0eXBlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDMnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDNOb2Rlcy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETyDQn9GA0L7QtNC+0LvQttCw0LXQvCDQsNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtC+0LvRjNC60L4g0LTQviDQv9C10YDQstC+0LPQviBoMlxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDInICYmICF0aGlzLmgyd2FzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDJ3YXMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLmgzTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRleHRJbnZhbGlkSDNQb3NpdGlvbihub2RlLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9ycy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSDJIMzsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0U2V2ZXJhbEgxfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5cclxuY2xhc3MgU2V2ZXJhbEgxIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICB0aGlzLmgxd2FzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSAhPT0gJ2gxJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaDF3YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5oMXdhcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHRTZXZlcmFsSDEobm9kZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldmVyYWxIMTsiLCJcclxuY29uc3Qgc2l6ZXNTY2FsZSA9IFtcInh4eHNcIiwgXCJ4eHNcIiwgXCJ4c1wiLCBcInNcIiwgXCJtXCIsIFwibFwiLCBcInhsXCIsIFwieHhsXCIsIFwieHh4bFwiLCBcInh4eHhsXCIsIFwieHh4eHhsXCJdO1xyXG5cclxuY2xhc3MgU2l6ZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICovXHJcbiAgICBhZGQoY291bnQpIHtcclxuICAgICAgICBsZXQgaW5kID0gc2l6ZXNTY2FsZS5pbmRleE9mKHRoaXMuc2l6ZSk7XHJcblxyXG4gICAgICAgIGlmICh+aW5kKVxyXG4gICAgICAgICAgICBpbmQgPSBpbmQgKyBjb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZXNTY2FsZVtpbmRdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjaGVjayhzaXplQikge1xyXG4gICAgICAgIHJldHVybiAhISh0aGlzLnNpemUgJiYgc2l6ZUIpICYmIHRoaXMuc2l6ZSA9PT0gc2l6ZUI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc0RlZih4KSB7XHJcbiAgICByZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KG9iaiwgLi4ucHJvcHMpIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSAvLyDRhNGD0L3QutGG0LjQuCDQvdC1INC/0YDQtdC00L/QvtC70LDQs9Cw0Y7RgtGB0Y9cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGxldCBjdXJyZW50ID0gb2JqO1xyXG5cclxuICAgIGZvciAobGV0IHByb3Agb2YgcHJvcHMpIHtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0RlZihwcm9wKSlcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBTaXplLFxyXG4gICAgZ2V0XHJcbn0iLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBCdXR0b25Qb3NpdGlvbiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAncGxhY2Vob2xkZXInXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzID0gbmV3IE1hcCgpOyAvLyDRhdGA0LDQvdC40LwgMSBwbGFjZWhvbGRlclxyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIGJ1dHRvblxyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVE9ETyDRgdGH0LjRgtCw0LXQvCwg0YfRgtC+INCyINCx0LvQvtC60LUgd2FybmluZyDQvdC1INCx0L7Qu9C10LUgMSBidXR0b24g0Lgg0L3QtSDQsdC+0LvQtdC1IDEgcGxhY2Vob2xlciAo0YXQvtGC0Y8g0Y3RgtC+INC90LUg0L7QsdGP0LfQsNC90L4g0LHRi9GC0Ywg0YLQsNC6KVxyXG4gICAgICAgIC8vINCSINC/0YDQvtGC0LjQstC90L7QvCDRgdC70YPRh9Cw0LUsINC90LXQv9C+0L3Rj9GC0L3QviDQutCw0Log0LjRhSDQvNCw0YLRh9C40YLRjCDQtNGA0YPQsyDRgSDQtNGA0YPQs9C+0LwgKNC90LDQv9GA0LjQvNC10YAg0LIg0YLQsNC60L7QuSDRgdC40YLRg9Cw0YbQuNC4OiBidXR0b24sIHBsYWNlaG9sZGVyLCBidXR0b24pXHJcbiAgICAgICAgLy8g0LgsINGB0L7QvtGC0LLQtdGC0YHRgtCy0LXQvdC90L4sINCy0YvQtNCw0LLQsNGC0Ywg0L7RiNC40LHQutC4XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdwbGFjZWhvbGRlcicpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyTm9kZXMuaGFzKHdhcm5pbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZhbGlkQnV0dG9uID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW52YWxpZEJ1dHRvbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24oaW52YWxpZEJ1dHRvbi5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblBvc2l0aW9uOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5pbXBvcnQge05vVGV4dE5vZGV9IGZyb20gXCIuLi8uLi9lcnJvci9zeXN0ZW0uanNcIjtcclxuaW1wb3J0IHtUZXh0SW52YWxpZEgyUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3RcIjtcclxuXHJcbmNsYXNzIEJ1dHRvblNpemUgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAnYnV0dG9uJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlcyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHROb2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbk5vZGVzID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGJ1dHRvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0VGV4dE5vZGUgPSB0aGlzLnRleHROb2Rlcy5nZXQod2FybmluZyk7XHJcbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuYnV0dG9uTm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIWJ1dHRvbnMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIWZpcnN0VGV4dE5vZGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZVZhbEEgPSBnZXQoZmlyc3RUZXh0Tm9kZS5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIHNpemUuYWRkKDEpO1xyXG5cclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZVZhbEIgPSBnZXQoYnV0dG9uLm1vZHMsICdzaXplJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXNpemUuY2hlY2soc2l6ZVZhbEIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUoYnV0dG9uLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TaXplOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jb25zdCBjb3JyZWN0U2l6ZXMgPSBbJ3MnLCAnbScsICdsJ107XHJcblxyXG5jbGFzcyBQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAncGxhY2Vob2xkZXInXSk7XHJcblxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSBnZXQobm9kZS5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IGluZCA9IGNvcnJlY3RTaXplcy5pbmRleE9mKHNpemUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbmQgPT09IC0xKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplKG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYWNlaG9sZGVyU2l6ZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcbmltcG9ydCB7Tm9UZXh0Tm9kZX0gZnJvbSBcIi4uLy4uL2Vycm9yL3N5c3RlbS5qc1wiO1xyXG5cclxuY2xhc3MgVGV4dFNpemVzIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0ZXh0Tm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghdGV4dE5vZGVzKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IFtmaXJzdCwgLi4ub3RoZXJdID0gdGV4dE5vZGVzO1xyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0Lm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdGV4dCBvZiBvdGhlcikge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldCh0ZXh0Lm1vZHMsICdzaXplJyk7XHJcblxyXG4gICAgICAgICAgICAvLyDQlNCw0LbQtSDQtdGB0LvQuCDQsiDRgNCw0LzQutCw0YUg0L7QtNC90L7Qs9C+INCx0LvQvtC60LAg0L3QtdGB0LrQvtC70YzQutC+INC+0YjQuNCx0L7Rh9C90YvRhSDRgdC70L7Qsiwg0YLQviDQstC+0LLRgNCw0YnQsNC10Lwg0L7QtNC90YMg0L7RiNC40LHQutGDLlxyXG4gICAgICAgICAgICBpZiAoIXNpemUuY2hlY2soc2l6ZVZhbEIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsKG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRTaXplczsiXSwic291cmNlUm9vdCI6IiJ9