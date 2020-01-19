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
    // TODO
    console.log(e);
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
      } catch (e) {
        // TODO
        console.log(e);
      }
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
      } catch (e) {
        // TODO
        console.log(e);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcmtldGluZy90b29tdWNoLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90ZXh0L2gxaDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDJoMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJlIiwiY29uc29sZSIsImxvZyIsIkJMT0NLIiwiRUxFTSIsIkNPTlRFTlQiLCJNT0RTIiwiTUlYIiwiRUxFTU1PRFMiLCJQUk9QUyIsImxvY2F0aW9uS2V5IiwiSnNvblNvdXJjZU1hcCIsImtleSIsIkJlbU5vZGUiLCJjb25zdHJ1Y3RvciIsIm5vZGUiLCJwYXJlbnQiLCJibG9jayIsImVsZW0iLCJtb2RzIiwibWl4IiwiZWxlbU1vZHMiLCJsb2NhdGlvbiIsInNlbGVjdG9yIiwiV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCIsIkxpbnRFcnJvciIsImNvZGUiLCJlcnJvciIsIldhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSIsIldhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24iLCJXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSIsIlRleHRTZXZlcmFsSDEiLCJUZXh0SW52YWxpZEgyUG9zaXRpb24iLCJUZXh0SW52YWxpZEgzUG9zaXRpb24iLCJHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2NrcyIsIkludmFsaWRJbnB1dCIsIkVycm9yIiwicG9zaXRpb25LZXkiLCJTeW1ib2wiLCJyZXN1bHQiLCJwYXJzZSIsImpzb24iLCJkYXRhIiwicG9pbnRlcnMiLCJtYXRjaCIsInBhdGgiLCJ2YWx1ZSIsInZhbHVlRW5kIiwic3RhcnQiLCJlbmQiLCJtYXAiLCJ2YWwiLCJsaW5lIiwiY29sdW1uIiwiY2hpbGRyZW4iLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiY2hpbGQiLCJpbmQiLCJwaGFzZXMiLCJSdWxlQmFzZSIsInByb3RvdHlwZSIsInJ1bGVDbGFzc2VzIiwiYmVtTm9kZSIsImNvbnRlbnRBc0FycmF5IiwiY2FsbCIsImluIiwibmV4dCIsIm91dCIsIm1lZGlhdG9yIiwiZXJyb3JzIiwiaW5pdCIsInN0cmluZ1RyZWUiLCJhdHRhY2hSb290IiwibWFwcGVyIiwicm9vdCIsImdldEpzb24iLCJjYWxsQWxsIiwicnVsZXNJbnN0YW5jZXMiLCJyQ2xhc3MiLCJSdWxlTWVkaWF0b3IiLCJwaGFzZSIsImFkZEVycm9ycyIsImVsIiwiZmxhdCIsIkluZmluaXR5IiwiVGV4dFNpemVzIiwiQnV0dG9uU2l6ZSIsIkJ1dHRvblBvc2l0aW9uIiwiUGxhY2Vob2xkZXJTaXplIiwiU2V2ZXJhbEgxIiwiSDFIMiIsIkgySDMiLCJUb29NdWNoIiwibWFya2V0aW5nQmxvY2tzIiwiZ3JpZCIsImdyaWRGcmFjdGlvbiIsInRvdGFsTWFya2V0aW5nIiwiZ2V0UGhhc2VIYW5kbGVyc01hcCIsImJpbmQiLCJzaXplIiwiZ2V0IiwiaW5jbHVkZXMiLCJmdWxsU2l6ZSIsInRvdGFsSW5mbyIsInNlbGVjdG9ycyIsImdldFNlbGVjdG9ycyIsIkhhbmRsZXJUeXBlIiwiSGFuZGxlcnNNYXBUeXBlIiwiaGFuZGxlcnNNYXAiLCJhbHdheXNDYWxsZWRIYW5kbGVycyIsImJ1aWxkTWFwIiwicnVsZSIsImhhbmRsZXIiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0S2V5IiwiaGFuZGxlcnMiLCJoYW5kbGVyRXJyb3JzIiwiZ2V0TWVyZ2VkRXJyb3JzIiwiYWxsRXJyb3JzIiwib3RoZXJFcnJvcnMiLCJoMVRvSDFQYXJlbnRNYXAiLCJNYXAiLCJoMlBhcmVudFRvSDJNYXAiLCJvcmRlciIsImlzSDEiLCJzZXQiLCJpc0gyIiwiaGFzIiwiaDJOb2RlcyIsIndyb25nSDIiLCJTZXQiLCJoMU9yZGVyIiwiY3VycmVudFBhcmVudCIsImgyTm9kZSIsImgyT3JkZXIiLCJhZGQiLCJwb3NpdGlvbiIsInR5cGUiLCJoMXdhcyIsInNpemVzU2NhbGUiLCJTaXplIiwiY291bnQiLCJpbmRleE9mIiwiY2hlY2siLCJzaXplQiIsImlzRGVmIiwieCIsInVuZGVmaW5lZCIsIm9iaiIsInByb3BzIiwiY3VycmVudCIsInByb3AiLCJ3YXJuaW5ncyIsInBsYWNlaG9sZGVyTm9kZXMiLCJidXR0b25Ob2RlcyIsIndhcm5pbmciLCJnZXRMYXN0V2FybmluZyIsImludmFsaWRCdXR0b24iLCJwb3AiLCJkZWxldGUiLCJ0ZXh0Tm9kZXMiLCJmaXJzdFRleHROb2RlIiwiYnV0dG9ucyIsInNpemVWYWxBIiwiYnV0dG9uIiwic2l6ZVZhbEIiLCJjb3JyZWN0U2l6ZXMiLCJmaXJzdCIsIm90aGVyIiwidGV4dCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtDQUdBO0FBQ0E7O0FBRUEsTUFBTUEsTUFBTSxHQUFHLElBQUlDLHNEQUFKLENBQVdDLDBEQUFYLENBQWY7O0FBRUFDLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjLFVBQVNDLEdBQVQsRUFBYztBQUN4QixNQUFJO0FBQ0EsV0FBT0wsTUFBTSxDQUFDSSxJQUFQLENBQVlDLEdBQVosQ0FBUDtBQUNILEdBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDUjtBQUNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWUYsQ0FBWjtBQUVBLFdBQU8sRUFBUDtBQUNIO0FBQ0os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RG9CLENBR3BCOztBQUNBLFVBQUksQ0FBQ2tGLElBQUksQ0FBQzZDLEtBQUwsQ0FBV3NCLFFBQVgsQ0FBTCxFQUNJLE9BQU8sSUFBSWhKLGdGQUFKLENBQWlDVCxJQUFJLENBQUNPLFFBQXRDLENBQVA7QUFDUDtBQUNKOztBQUVEeUksZ0JBQWMsR0FBRztBQUNiLFVBQU01QyxNQUFNLEdBQUcsS0FBS3dDLFFBQUwsQ0FBY3hDLE1BQTdCO0FBRUEsV0FBTyxLQUFLd0MsUUFBTCxDQUFjeEMsTUFBTSxHQUFHLENBQXZCLENBQVA7QUFDSDs7QUFqRTRCOztBQW9FbEI1Qix3RUFBZixFIiwiZmlsZSI6ImxpbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTGludGVyIGZyb20gJy4vc3JjL2xpbnRlci5qcyc7XHJcbmltcG9ydCBydWxlcyBmcm9tICcuL3NyYy9ydWxlcy9saXN0LmpzJ1xyXG5cclxuLy8gVE9ETyBmb3IgdGVzdFxyXG4vLyBpbXBvcnQge3Rlc3RzLCBhbnN3ZXJzfSBmcm9tIFwiLi90ZXN0Y2FzZXMuanNcIjtcclxuXHJcbmNvbnN0IGxpbnRlciA9IG5ldyBMaW50ZXIocnVsZXMpO1xyXG5cclxud2luZG93LmxpbnQgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIGxpbnRlci5saW50KHN0cik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBUT0RPIGZvciB0ZXN0XHJcbi8qXHJcbnRlc3RzLmZvckVhY2goKHRlc3QsIGluZCkgPT4ge1xyXG4gICAgY29uc3QgcmVzID0gd2luZG93LmxpbnQodGVzdCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ3Rlc3Q6ICcgKyAoaW5kICsgMSkpO1xyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxufSlcclxuKi9cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXNjYXBlZENoYXJzID0ge1xuICAnYic6ICdcXGInLFxuICAnZic6ICdcXGYnLFxuICAnbic6ICdcXG4nLFxuICAncic6ICdcXHInLFxuICAndCc6ICdcXHQnLFxuICAnXCInOiAnXCInLFxuICAnLyc6ICcvJyxcbiAgJ1xcXFwnOiAnXFxcXCdcbn07XG5cbnZhciBBX0NPREUgPSAnYScuY2hhckNvZGVBdCgpO1xuXG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc291cmNlLCBfLCBvcHRpb25zKSB7XG4gIHZhciBwb2ludGVycyA9IHt9O1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW4gPSAwO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGJpZ2ludCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5iaWdpbnQgJiYgdHlwZW9mIEJpZ0ludCAhPSAndW5kZWZpbmVkJztcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiBfcGFyc2UoJycsIHRydWUpLFxuICAgIHBvaW50ZXJzOiBwb2ludGVyc1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9wYXJzZShwdHIsIHRvcExldmVsKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBkYXRhO1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgY2FzZSAndCc6IHJlYWQoJ3J1ZScpOyBkYXRhID0gdHJ1ZTsgYnJlYWs7XG4gICAgICBjYXNlICdmJzogcmVhZCgnYWxzZScpOyBkYXRhID0gZmFsc2U7IGJyZWFrO1xuICAgICAgY2FzZSAnbic6IHJlYWQoJ3VsbCcpOyBkYXRhID0gbnVsbDsgYnJlYWs7XG4gICAgICBjYXNlICdcIic6IGRhdGEgPSBwYXJzZVN0cmluZygpOyBicmVhaztcbiAgICAgIGNhc2UgJ1snOiBkYXRhID0gcGFyc2VBcnJheShwdHIpOyBicmVhaztcbiAgICAgIGNhc2UgJ3snOiBkYXRhID0gcGFyc2VPYmplY3QocHRyKTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBiYWNrQ2hhcigpO1xuICAgICAgICBpZiAoJy0wMTIzNDU2Nzg5Jy5pbmRleE9mKGNoYXIpID49IDApXG4gICAgICAgICAgZGF0YSA9IHBhcnNlTnVtYmVyKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgICB9XG4gICAgbWFwKHB0ciwgJ3ZhbHVlRW5kJyk7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIGlmICh0b3BMZXZlbCAmJiBwb3MgPCBzb3VyY2UubGVuZ3RoKSB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdoaXRlc3BhY2UoKSB7XG4gICAgbG9vcDpcbiAgICAgIHdoaWxlIChwb3MgPCBzb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgIHN3aXRjaCAoc291cmNlW3Bvc10pIHtcbiAgICAgICAgICBjYXNlICcgJzogY29sdW1uKys7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcdCc6IGNvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiBjb2x1bW4gPSAwOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXG4nOiBjb2x1bW4gPSAwOyBsaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrIGxvb3A7XG4gICAgICAgIH1cbiAgICAgICAgcG9zKys7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVN0cmluZygpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgdmFyIGNoYXI7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXCInKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09ICdcXFxcJykge1xuICAgICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgICBpZiAoY2hhciBpbiBlc2NhcGVkQ2hhcnMpXG4gICAgICAgICAgc3RyICs9IGVzY2FwZWRDaGFyc1tjaGFyXTtcbiAgICAgICAgZWxzZSBpZiAoY2hhciA9PSAndScpXG4gICAgICAgICAgc3RyICs9IGdldENoYXJDb2RlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSBjaGFyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VOdW1iZXIoKSB7XG4gICAgdmFyIG51bVN0ciA9ICcnO1xuICAgIHZhciBpbnRlZ2VyID0gdHJ1ZTtcbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuXG4gICAgbnVtU3RyICs9IHNvdXJjZVtwb3NdID09ICcwJ1xuICAgICAgICAgICAgICA/IGdldENoYXIoKVxuICAgICAgICAgICAgICA6IGdldERpZ2l0cygpO1xuXG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICcuJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKSArIGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnZScgfHwgc291cmNlW3Bvc10gPT0gJ0UnKSB7XG4gICAgICBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKHNvdXJjZVtwb3NdID09ICcrJyB8fCBzb3VyY2VbcG9zXSA9PSAnLScpIG51bVN0ciArPSBnZXRDaGFyKCk7XG4gICAgICBudW1TdHIgKz0gZ2V0RGlnaXRzKCk7XG4gICAgICBpbnRlZ2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9ICtudW1TdHI7XG4gICAgcmV0dXJuIGJpZ2ludCAmJiBpbnRlZ2VyICYmIChyZXN1bHQgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCByZXN1bHQgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUilcbiAgICAgICAgICAgID8gQmlnSW50KG51bVN0cilcbiAgICAgICAgICAgIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VBcnJheShwdHIpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICBpZiAoZ2V0Q2hhcigpID09ICddJykgcmV0dXJuIGFycjtcbiAgICBiYWNrQ2hhcigpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgIGFyci5wdXNoKF9wYXJzZShpdGVtUHRyKSk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICddJykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VPYmplY3QocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBvYmogPSB7fTtcbiAgICBpZiAoZ2V0Q2hhcigpID09ICd9JykgcmV0dXJuIG9iajtcbiAgICBiYWNrQ2hhcigpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBsb2MgPSBnZXRMb2MoKTtcbiAgICAgIGlmIChnZXRDaGFyKCkgIT0gJ1wiJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB2YXIga2V5ID0gcGFyc2VTdHJpbmcoKTtcbiAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgIG1hcExvYyhwcm9wUHRyLCAna2V5JywgbG9jKTtcbiAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICc6Jykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBvYmpba2V5XSA9IF9wYXJzZShwcm9wUHRyKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ30nKSBicmVhaztcbiAgICAgIGlmIChjaGFyICE9ICcsJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkKHN0cikge1xuICAgIGZvciAodmFyIGk9MDsgaTxzdHIubGVuZ3RoOyBpKyspXG4gICAgICBpZiAoZ2V0Q2hhcigpICE9PSBzdHJbaV0pIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hhcigpIHtcbiAgICBjaGVja1VuZXhwZWN0ZWRFbmQoKTtcbiAgICB2YXIgY2hhciA9IHNvdXJjZVtwb3NdO1xuICAgIHBvcysrO1xuICAgIGNvbHVtbisrOyAvLyBuZXcgbGluZT9cbiAgICByZXR1cm4gY2hhcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhY2tDaGFyKCkge1xuICAgIHBvcy0tO1xuICAgIGNvbHVtbi0tO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hhckNvZGUoKSB7XG4gICAgdmFyIGNvdW50ID0gNDtcbiAgICB2YXIgY29kZSA9IDA7XG4gICAgd2hpbGUgKGNvdW50LS0pIHtcbiAgICAgIGNvZGUgPDw9IDQ7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ2YnKVxuICAgICAgICBjb2RlICs9IGNoYXIuY2hhckNvZGVBdCgpIC0gQV9DT0RFICsgMTA7XG4gICAgICBlbHNlIGlmIChjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgY29kZSArPSArY2hhcjtcbiAgICAgIGVsc2VcbiAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlnaXRzKCkge1xuICAgIHZhciBkaWdpdHMgPSAnJztcbiAgICB3aGlsZSAoc291cmNlW3Bvc10gPj0gJzAnICYmIHNvdXJjZVtwb3NdIDw9ICc5JylcbiAgICAgIGRpZ2l0cyArPSBnZXRDaGFyKCk7XG5cbiAgICBpZiAoZGlnaXRzLmxlbmd0aCkgcmV0dXJuIGRpZ2l0cztcbiAgICBjaGVja1VuZXhwZWN0ZWRFbmQoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBtYXBMb2MocHRyLCBwcm9wLCBnZXRMb2MoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXBMb2MocHRyLCBwcm9wLCBsb2MpIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0gbG9jO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBwb3M6IHBvc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1bmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIHRva2VuICcgKyBzb3VyY2VbcG9zXSArICcgaW4gSlNPTiBhdCBwb3NpdGlvbiAnICsgcG9zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhc1VuZXhwZWN0ZWRUb2tlbigpIHtcbiAgICBiYWNrQ2hhcigpO1xuICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVbmV4cGVjdGVkRW5kKCkge1xuICAgIGlmIChwb3MgPj0gc291cmNlLmxlbmd0aClcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgSlNPTiBpbnB1dCcpO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKGRhdGEsIF8sIG9wdGlvbnMpIHtcbiAgaWYgKCF2YWxpZFR5cGUoZGF0YSkpIHJldHVybjtcbiAgdmFyIHdzTGluZSA9IDA7XG4gIHZhciB3c1Bvcywgd3NDb2x1bW47XG4gIHZhciB3aGl0ZXNwYWNlID0gdHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLnNwYWNlXG4gICAgICAgICAgICAgICAgICAgIDogb3B0aW9ucztcbiAgc3dpdGNoICh0eXBlb2Ygd2hpdGVzcGFjZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICB2YXIgbGVuID0gd2hpdGVzcGFjZSA+IDEwXG4gICAgICAgICAgICAgICAgICA/IDEwXG4gICAgICAgICAgICAgICAgICA6IHdoaXRlc3BhY2UgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgICAgICA6IE1hdGguZmxvb3Iod2hpdGVzcGFjZSk7XG4gICAgICB3aGl0ZXNwYWNlID0gbGVuICYmIHJlcGVhdChsZW4sICcgJyk7XG4gICAgICB3c1BvcyA9IGxlbjtcbiAgICAgIHdzQ29sdW1uID0gbGVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHdoaXRlc3BhY2UgPSB3aGl0ZXNwYWNlLnNsaWNlKDAsIDEwKTtcbiAgICAgIHdzUG9zID0gMDtcbiAgICAgIHdzQ29sdW1uID0gMDtcbiAgICAgIGZvciAodmFyIGo9MDsgajx3aGl0ZXNwYWNlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBjaGFyID0gd2hpdGVzcGFjZVtqXTtcbiAgICAgICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICAgICAgY2FzZSAnICc6IHdzQ29sdW1uKys7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcdCc6IHdzQ29sdW1uICs9IDQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xccic6IHdzQ29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogd3NDb2x1bW4gPSAwOyB3c0xpbmUrKzsgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCd3aGl0ZXNwYWNlIGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgaW4gSlNPTicpO1xuICAgICAgICB9XG4gICAgICAgIHdzUG9zKys7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgd2hpdGVzcGFjZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBqc29uID0gJyc7XG4gIHZhciBwb2ludGVycyA9IHt9O1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW4gPSAwO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGVzNiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lczYgJiYgdHlwZW9mIE1hcCA9PSAnZnVuY3Rpb24nO1xuICBfc3RyaW5naWZ5KGRhdGEsIDAsICcnKTtcbiAgcmV0dXJuIHtcbiAgICBqc29uOiBqc29uLFxuICAgIHBvaW50ZXJzOiBwb2ludGVyc1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9zdHJpbmdpZnkoX2RhdGEsIGx2bCwgcHRyKSB7XG4gICAgbWFwKHB0ciwgJ3ZhbHVlJyk7XG4gICAgc3dpdGNoICh0eXBlb2YgX2RhdGEpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIG91dCgnJyArIF9kYXRhKTsgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBvdXQocXVvdGVkKF9kYXRhKSk7IGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKF9kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgb3V0KCdudWxsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF9kYXRhLnRvSlNPTiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb3V0KHF1b3RlZChfZGF0YS50b0pTT04oKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoX2RhdGEpKSB7XG4gICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgfSBlbHNlIGlmIChlczYpIHtcbiAgICAgICAgICBpZiAoX2RhdGEuY29uc3RydWN0b3IuQllURVNfUEVSX0VMRU1FTlQpXG4gICAgICAgICAgICBzdHJpbmdpZnlBcnJheSgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgTWFwKVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KCk7XG4gICAgICAgICAgZWxzZSBpZiAoX2RhdGEgaW5zdGFuY2VvZiBTZXQpXG4gICAgICAgICAgICBzdHJpbmdpZnlNYXBTZXQodHJ1ZSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RyaW5naWZ5T2JqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyaW5naWZ5T2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWFwKHB0ciwgJ3ZhbHVlRW5kJyk7XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlBcnJheSgpIHtcbiAgICAgIGlmIChfZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgb3V0KCdbJyk7XG4gICAgICAgIHZhciBpdGVtTHZsID0gbHZsICsgMTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPF9kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkpIG91dCgnLCcpO1xuICAgICAgICAgIGluZGVudChpdGVtTHZsKTtcbiAgICAgICAgICB2YXIgaXRlbSA9IHZhbGlkVHlwZShfZGF0YVtpXSkgPyBfZGF0YVtpXSA6IG51bGw7XG4gICAgICAgICAgdmFyIGl0ZW1QdHIgPSBwdHIgKyAnLycgKyBpO1xuICAgICAgICAgIF9zdHJpbmdpZnkoaXRlbSwgaXRlbUx2bCwgaXRlbVB0cik7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnXScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCdbXScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdCgpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoX2RhdGEpO1xuICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgdmFyIHZhbHVlID0gX2RhdGFba2V5XTtcbiAgICAgICAgICBpZiAodmFsaWRUeXBlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKGkpIG91dCgnLCcpO1xuICAgICAgICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgICAgICAgaW5kZW50KHByb3BMdmwpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXknKTtcbiAgICAgICAgICAgIG91dChxdW90ZWQoa2V5KSk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgICAgICAgb3V0KCc6Jyk7XG4gICAgICAgICAgICBpZiAod2hpdGVzcGFjZSkgb3V0KCcgJyk7XG4gICAgICAgICAgICBfc3RyaW5naWZ5KHZhbHVlLCBwcm9wTHZsLCBwcm9wUHRyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnfScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCd7fScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeU1hcFNldChpc1NldCkge1xuICAgICAgaWYgKF9kYXRhLnNpemUpIHtcbiAgICAgICAgb3V0KCd7Jyk7XG4gICAgICAgIHZhciBwcm9wTHZsID0gbHZsICsgMTtcbiAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGVudHJpZXMgPSBfZGF0YS5lbnRyaWVzKCk7XG4gICAgICAgIHZhciBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB3aGlsZSAoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgIHZhciBrZXkgPSBpdGVtWzBdO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGlzU2V0ID8gdHJ1ZSA6IGl0ZW1bMV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICghZmlyc3QpIG91dCgnLCcpO1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnfScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCd7fScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG91dChzdHIpIHtcbiAgICBjb2x1bW4gKz0gc3RyLmxlbmd0aDtcbiAgICBwb3MgKz0gc3RyLmxlbmd0aDtcbiAgICBqc29uICs9IHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluZGVudChsdmwpIHtcbiAgICBpZiAod2hpdGVzcGFjZSkge1xuICAgICAganNvbiArPSAnXFxuJyArIHJlcGVhdChsdmwsIHdoaXRlc3BhY2UpO1xuICAgICAgbGluZSsrO1xuICAgICAgY29sdW1uID0gMDtcbiAgICAgIHdoaWxlIChsdmwtLSkge1xuICAgICAgICBpZiAod3NMaW5lKSB7XG4gICAgICAgICAgbGluZSArPSB3c0xpbmU7XG4gICAgICAgICAgY29sdW1uID0gd3NDb2x1bW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uICs9IHdzQ29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIHBvcyArPSB3c1BvcztcbiAgICAgIH1cbiAgICAgIHBvcyArPSAxOyAvLyBcXG4gY2hhcmFjdGVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFwKHB0ciwgcHJvcCkge1xuICAgIHBvaW50ZXJzW3B0cl0gPSBwb2ludGVyc1twdHJdIHx8IHt9O1xuICAgIHBvaW50ZXJzW3B0cl1bcHJvcF0gPSB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBwb3M6IHBvc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiByZXBlYXQobiwgc3RyKSB7XG4gICAgcmV0dXJuIEFycmF5KG4gKyAxKS5qb2luKHN0cik7XG4gIH1cbn07XG5cblxudmFyIFZBTElEX1RZUEVTID0gWydudW1iZXInLCAnYmlnaW50JywgJ2Jvb2xlYW4nLCAnc3RyaW5nJywgJ29iamVjdCddO1xuZnVuY3Rpb24gdmFsaWRUeXBlKGRhdGEpIHtcbiAgcmV0dXJuIFZBTElEX1RZUEVTLmluZGV4T2YodHlwZW9mIGRhdGEpID49IDA7XG59XG5cblxudmFyIEVTQ19RVU9URSA9IC9cInxcXFxcL2c7XG52YXIgRVNDX0IgPSAvW1xcYl0vZztcbnZhciBFU0NfRiA9IC9cXGYvZztcbnZhciBFU0NfTiA9IC9cXG4vZztcbnZhciBFU0NfUiA9IC9cXHIvZztcbnZhciBFU0NfVCA9IC9cXHQvZztcbmZ1bmN0aW9uIHF1b3RlZChzdHIpIHtcbiAgc3RyID0gc3RyLnJlcGxhY2UoRVNDX1FVT1RFLCAnXFxcXCQmJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX0YsICdcXFxcZicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19CLCAnXFxcXGInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfTiwgJ1xcXFxuJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX1IsICdcXFxccicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19ULCAnXFxcXHQnKTtcbiAgcmV0dXJuICdcIicgKyBzdHIgKyAnXCInO1xufVxuXG5cbnZhciBFU0NfMCA9IC9+L2c7XG52YXIgRVNDXzEgPSAvXFwvL2c7XG5mdW5jdGlvbiBlc2NhcGVKc29uUG9pbnRlcihzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKEVTQ18wLCAnfjAnKVxuICAgICAgICAgICAgLnJlcGxhY2UoRVNDXzEsICd+MScpO1xufVxuIiwiaW1wb3J0IFBST1BTIGZyb20gJy4vcHJvcG5hbWVzLmpzJztcclxuaW1wb3J0IEpzb25Tb3VyY2VNYXAgZnJvbSAnLi9qc29uc291cmNlbWFwLmpzJztcclxuXHJcbmNvbnN0IHtCTE9DSywgRUxFTSwgQ09OVEVOVCwgTU9EUywgTUlYLCBFTEVNTU9EU30gPSBQUk9QUztcclxuY29uc3QgbG9jYXRpb25LZXkgPSBKc29uU291cmNlTWFwLmtleTtcclxuXHJcbmNsYXNzIEJlbU5vZGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICogQHBhcmFtIHtCZW1Ob2RlfSBwYXJlbnRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5ibG9jayA9IG5vZGVbQkxPQ0tdO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IG5vZGVbRUxFTV07XHJcbiAgICAgICAgdGhpcy5tb2RzID0gbm9kZVtNT0RTXTtcclxuICAgICAgICB0aGlzLm1peCA9IG5vZGVbTUlYXTtcclxuICAgICAgICB0aGlzLmVsZW1Nb2RzID0gbm9kZVtFTEVNTU9EU107XHJcblxyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBub2RlW2xvY2F0aW9uS2V5XTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHRoaXMuYmxvY2sgKyAodGhpcy5lbGVtID8gKGBfXyR7dGhpcy5lbGVtfWApIDogJycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZW1Ob2RlOyIsImltcG9ydCBMaW50RXJyb3IgZnJvbSAnLi9saW50ZXJyb3IuanMnO1xyXG5cclxuY2xhc3MgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuVEVYVF9TSVpFU19TSE9VTERfQkVfRVFVQUwnLCBlcnJvcjogJ9Ci0LXQutGB0YLRiyDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQvdGLINCx0YvRgtGMINC+0LTQvdC+0LPQviDRgNCw0LfQvNC10YDQsC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1NJWkUnLCBlcnJvcjogJ9Cg0LDQt9C80LXRgCDQutC90L7Qv9C60Lgg0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQvdCwIDEg0YjQsNCzINCx0L7Qu9GM0YjQtSDRjdGC0LDQu9C+0L3QvdC+0LPQvi4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX0JVVFRPTl9QT1NJVElPTicsIGVycm9yOiAn0JHQu9C+0LogYnV0dG9uINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/QvtGB0LvQtSDQsdC70L7QutCwIHBsYWNlaG9sZGVyLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX1BMQUNFSE9MREVSX1NJWkUnLCBlcnJvcjogJ9CU0L7Qv9GD0YHRgtC40LzRi9C1INGA0LDQt9C80LXRgNGLINC00LvRjyDQsdC70L7QutCwIHBsYWNlaG9sZGVyINCyINCx0LvQvtC60LUgd2FybmluZzogcywgbSwgbC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0U2V2ZXJhbEgxIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5TRVZFUkFMX0gxJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0L/QtdGA0LLQvtCz0L4g0YPRgNC+0LLQvdGPINC90LAg0YHRgtGA0LDQvdC40YbQtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0LXQtNC40L3RgdGC0LLQtdC90L3Ri9C8LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRJbnZhbGlkSDJQb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuSU5WQUxJRF9IMl9QT1NJVElPTicsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INCy0YLQvtGA0L7Qs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIM1Bvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gzX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0YLRgNC10YLRjNC10LPQviDRg9GA0L7QstC90Y8g0L3QtSDQvNC+0LbQtdGCINC90LDRhdC+0LTQuNGC0YzRgdGPINC/0LXRgNC10LQg0LfQsNCz0L7Qu9C+0LLQutC+0Lwg0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnR1JJRC5UT09fTVVDSF9NQVJLRVRJTkdfQkxPQ0tTJywgZXJyb3I6ICfQnNCw0YDQutC10YLQuNC90LPQvtCy0YvQtSDQsdC70L7QutC4INC90LUg0LzQvtCz0YPRgiDQt9Cw0L3QuNC80LDRgtGMINCx0L7Qu9GM0YjQtSDQv9C+0LvQvtCy0LjQvdGLINC+0YIg0LLRgdC10YUg0LrQvtC70L7QvdC+0Log0LHQu9C+0LrQsCBncmlkJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIFdhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwsXHJcbiAgICBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUsXHJcbiAgICBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uLFxyXG4gICAgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUsXHJcbiAgICBUZXh0U2V2ZXJhbEgxLFxyXG4gICAgVGV4dEludmFsaWRIMlBvc2l0aW9uLFxyXG4gICAgVGV4dEludmFsaWRIM1Bvc2l0aW9uLFxyXG4gICAgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3NcclxufSIsIlxyXG5jbGFzcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3Ioe2NvZGUsIGVycm9yLCBsb2NhdGlvbn0pIHtcclxuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbnRFcnJvcjsiLCJcclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcg0J3QtdGA0LDQt9GA0LXRiNC40LzRi9C1INC+0YjQuNCx0LrQuCwg0L/QvtGB0LvQtSDQutC+0YLQvtGA0YvRhSDQv9GA0LXQutGA0LDRidCw0LXQvCDRgNCw0LHQvtGC0YMuINCY0YUg0YfQuNGB0LvQviDQvNC+0LbQtdGCINGB0L7QutGA0LDRidCw0YLRjNGB0Y9cclxuICog0L/QviDQvNC10YDQtSDQtNC+0LHQsNCy0LvQtdC90LjRjyDQvdC+0LLRi9GFINC/0YDQsNCy0LjQuyDQsiDQu9C40L3RgtC10YAuXHJcbiAqL1xyXG5jbGFzcyBJbnZhbGlkSW5wdXQgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkludmFsaWQgaW5wdXRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBJbnZhbGlkSW5wdXRcclxufSIsIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3INCQ0LTQsNC/0YLQtdGAINGE0YPQvdC60YbQuNC4IHBhcnNlINC40Lcg0LHQuNCx0LvQuNC+0YLQtdC60LgganNvbi1zb3VyY2UtbWFwXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtwYXJzZX0gZnJvbSAnanNvbi1zb3VyY2UtbWFwJztcclxuaW1wb3J0IFBST1BTIGZyb20gJy4vcHJvcG5hbWVzLmpzJztcclxuaW1wb3J0IHtJbnZhbGlkSW5wdXR9IGZyb20gXCIuL2Vycm9yL3N5c3RlbS5qc1wiO1xyXG5cclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5cclxuY29uc3QgcG9zaXRpb25LZXkgPSBTeW1ib2woJ1Bvc2l0aW9uJyk7XHJcblxyXG5jbGFzcyBKc29uU291cmNlTWFwIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzdHIpIHtcclxuICAgICAgICB0aGlzLnN0ciA9IHN0cjtcclxuICAgICAgICB0aGlzLmpzb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucG9pbnRlcnMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEpzb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2UodGhpcy5zdHIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5qc29uID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRlcnMgPSByZXN1bHQucG9pbnRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXRjaCh0aGlzLmpzb24sICcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuanNvbjtcclxuICAgIH07XHJcblxyXG4gICAgbWF0Y2ggPSAobm9kZSwgcGF0aCkgPT4ge1xyXG4gICAgICAgIGlmICghbm9kZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB7dmFsdWUsIHZhbHVlRW5kfSA9IHRoaXMucG9pbnRlcnNbcGF0aF07XHJcblxyXG4gICAgICAgIC8vICsxINC6IGNvbCwg0YIu0LouINCx0LjQsdC70LjQvtGC0LXQutCwINCy0LXQtNC10YIg0L7RgtGB0YfQtdGCINC+0YIgMC5cclxuICAgICAgICAvLyDQn9GA0Lgg0Y3RgtC+0LwgbGluZSDQsdC10Lcg0LjQt9C80LXQvdC10L3QuNGPLCDRgi7Qui4g0LjRgdGF0L7QtNC90YvQuSBKU09OINC+0LHQtdGA0L3Rg9C70LggKNC/0L7Qu9C+0LbQuNC70Lgg0LLQvdGD0YLRgNGMINGB0LLQvtC50YHRgtCy0LAgXCJjb250ZW50XCIpXHJcbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gW3ZhbHVlLCB2YWx1ZUVuZF0ubWFwKHZhbCA9PiAoe2xpbmU6IHZhbC5saW5lLCBjb2x1bW46IHZhbC5jb2x1bW4gKyAxfSkpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZVtDT05URU5UXTtcclxuXHJcbiAgICAgICAgaWYgKCFjaGlsZHJlbilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBub2RlW3Bvc2l0aW9uS2V5XSA9IHtzdGFydCwgZW5kfTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGQsIGAke3BhdGh9LyR7Q09OVEVOVH0vJHtpbmR9YCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaChjaGlsZHJlbiwgYCR7cGF0aH0vJHtDT05URU5UfWApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGtleSA9IHBvc2l0aW9uS2V5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKc29uU291cmNlTWFwOyIsImltcG9ydCBQUk9QUyBmcm9tIFwiLi9wcm9wbmFtZXMuanNcIjtcclxuaW1wb3J0IEpzb25Tb3VyY2VNYXAgZnJvbSAnLi9qc29uc291cmNlbWFwLmpzJztcclxuaW1wb3J0IEJlbU5vZGUgZnJvbSAnLi9iZW1ub2RlLmpzJztcclxuaW1wb3J0IFJ1bGVNZWRpYXRvciBmcm9tICcuL3J1bGVzL3J1bGVtZWRpYXRvci5qcyc7XHJcbmltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi9ydWxlcy9ydWxlYmFzZS5qc1wiO1xyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcbmNvbnN0IHBoYXNlcyA9IFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXM7XHJcblxyXG5jbGFzcyBMaW50ZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PCFSdWxlQmFzZT59IHJ1bGVDbGFzc2VzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVDbGFzc2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLnJ1bGVDbGFzc2VzID0gcnVsZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWF0b3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGxpbnQoc3RyKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0cmluZ1RyZWUgPSB0aGlzLmF0dGFjaFJvb3Qoc3RyKTtcclxuICAgICAgICBjb25zdCBtYXBwZXIgPSBuZXcgSnNvblNvdXJjZU1hcChzdHJpbmdUcmVlKTtcclxuICAgICAgICBjb25zdCByb290ID0gbWFwcGVyLmdldEpzb24oc3RyaW5nVHJlZSk7XHJcblxyXG4gICAgICAgIHRoaXMubmV4dChyb290LCBudWxsKTtcclxuICAgICAgICB0aGlzLmNhbGxBbGwocGhhc2VzLmVuZCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gZmlsdGVyIGVycm9yc1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGNvbnN0IHJ1bGVzSW5zdGFuY2VzID0gdGhpcy5ydWxlQ2xhc3Nlcy5tYXAockNsYXNzID0+IG5ldyByQ2xhc3MoKSk7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWF0b3IgPSBuZXcgUnVsZU1lZGlhdG9yKHJ1bGVzSW5zdGFuY2VzKTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qINCS0YXQvtC0INC80L7QttC10YIg0LHRi9GC0Ywg0L7QsdGK0LXQutGC0L7QvCDQuNC70Lgg0LzQsNGB0YHQuNCy0L7QvCAo0LTQtdGA0LXQstC+INC40LvQuCDQu9C10YEpLiDQlNC+0LHQsNCy0LjQvCDQstC40YDRgtGD0LDQu9GM0L3Ri9C5INC60L7RgNC10L3RjCwg0YfRgtC+0LHRiyDQstGB0LXQs9C00LAg0LHRi9C70L4g0LTQtdGA0LXQstC+LiAqL1xyXG4gICAgYXR0YWNoUm9vdCA9IHN0ciA9PiBge1wiJHtDT05URU5UfVwiOlxcbiR7c3RyfVxcbn1gO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcclxuICAgICAqIEBwYXJhbSB7QmVtTm9kZX0gcGFyZW50XHJcbiAgICAgKi9cclxuICAgIG5leHQgPSAobm9kZSwgcGFyZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgYmVtTm9kZSA9IG5ldyBCZW1Ob2RlKG5vZGUsIHBhcmVudCk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNvbnRlbnRBc0FycmF5KG5vZGVbQ09OVEVOVF0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLmluLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoY2hpbGQsIGJlbU5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLm91dCwgYmVtTm9kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGwocGhhc2UsIGJlbU5vZGUpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGwocGhhc2UsIGJlbU5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxBbGwocGhhc2UpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGxBbGwocGhhc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVycm9ycyhlcnJvcnMpIHtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFsuLi5lcnJvcnMsIC4uLnRoaXMuZXJyb3JzXTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50QXNBcnJheShlbCkge1xyXG4gICAgICAgIC8vIFRPRE8g0LIg0YLQtdGB0YLQvtCy0YvRhSDRgdGC0YDQsNC90LjRh9C60LDRhSDQv9C+0L/QsNC00LDRjtGC0YHRjyDRgdC70YPRh9Cw0LgsINC60L7Qs9C00LAg0LIg0LzQsNGB0YHQuNCy0LUgY29udGVudCDQu9C10LbQuNGCINC80LDRgdGB0LjQsi4g0KHQtNC10LvQsNC10Lwg0L7QtNC40L0g0L/Qu9C+0YHQutC40Lkg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKVxyXG4gICAgICAgICAgICByZXR1cm4gZWwuZmxhdChJbmZpbml0eSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbCA/IFtlbF0gOiBbXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludGVyOyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIEJMT0NLOiBcImJsb2NrXCIsXHJcbiAgICBFTEVNOiBcImVsZW1cIixcclxuICAgIENPTlRFTlQ6IFwiY29udGVudFwiLFxyXG4gICAgTU9EUzogXCJtb2RzXCIsXHJcbiAgICBNSVg6IFwibWl4XCIsXHJcbiAgICBFTEVNTU9EUzogJ2VsZW1Nb2RzJ1xyXG59OyIsImltcG9ydCBUZXh0U2l6ZXMgZnJvbSAnLi93YXJuaW5nL3RleHRzaXplcy5qcydcclxuaW1wb3J0IEJ1dHRvblNpemUgZnJvbSAnLi93YXJuaW5nL2J1dHRvbnNpemUuanMnXHJcbmltcG9ydCBCdXR0b25Qb3NpdGlvbiBmcm9tICcuL3dhcm5pbmcvYnV0dG9ucG9zaXRpb24uanMnXHJcbmltcG9ydCBQbGFjZWhvbGRlclNpemUgZnJvbSAnLi93YXJuaW5nL3BsYWNlaG9sZGVyc2l6ZS5qcydcclxuaW1wb3J0IFNldmVyYWxIMSBmcm9tICcuL3RleHQvc2V2ZXJhbGgxLmpzJ1xyXG5pbXBvcnQgSDFIMiBmcm9tICcuL3RleHQvaDFoMi5qcydcclxuaW1wb3J0IEgySDMgZnJvbSAnLi90ZXh0L2gyaDMuanMnXHJcbmltcG9ydCBUb29NdWNoIGZyb20gJy4vbWFya2V0aW5nL3Rvb211Y2guanMnXHJcblxyXG5jb25zdCBydWxlcyA9IFtcclxuICAgIFRleHRTaXplcywgQnV0dG9uU2l6ZSwgQnV0dG9uUG9zaXRpb24sIFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFNldmVyYWxIMSwgSDFIMiwgSDJIMyxcclxuICAgIFRvb011Y2hcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJ1bGVzOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge0dyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0XCI7XHJcblxyXG5jb25zdCBtYXJrZXRpbmdCbG9ja3MgPSBbJ2NvbW1lcmNpYWwnLCAnb2ZmZXInXTtcclxuXHJcbmNsYXNzIFRvb011Y2ggZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ2dyaWQnLCAnZ3JpZF9fZnJhY3Rpb24nLCAuLi5tYXJrZXRpbmdCbG9ja3NdKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxNYXJrZXRpbmcgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZCAmJiBub2RlLnNlbGVjdG9yID09PSAnZ3JpZF9fZnJhY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnZ3JpZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5ncmlkRnJhY3Rpb24pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9ICtnZXQodGhpcy5ncmlkRnJhY3Rpb24uZWxlbU1vZHMsICdtLWNvbCcpO1xyXG5cclxuICAgICAgICBpZiAobWFya2V0aW5nQmxvY2tzLmluY2x1ZGVzKG5vZGUuYmxvY2spKVxyXG4gICAgICAgICAgICB0aGlzLnRvdGFsTWFya2V0aW5nICs9IHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5zZWxlY3RvciA9PT0gJ2dyaWRfX2ZyYWN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ2dyaWQnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGZ1bGxTaXplID0gK2dldChub2RlLm1vZHMsICdtLWNvbHVtbnMnKTtcclxuICAgICAgICBsZXQgZXJyb3I7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsTWFya2V0aW5nICogMiA+PSBmdWxsU2l6ZSlcclxuICAgICAgICAgICAgZXJyb3IgPSBuZXcgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3Mobm9kZS5sb2NhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JpZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMudG90YWxNYXJrZXRpbmcgPSAwO1xyXG4gICAgICAgIHRoaXMudG90YWxJbmZvID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb29NdWNoOyIsIlxyXG5jbGFzcyBSdWxlQmFzZSB7XHJcbiAgICAvKipcclxuICAgICAqINCd0LDQsdC+0YAg0YHQtdC70LXQutGC0L7RgNC+0LIgKEJlbU5vZGUuc2VsZWN0b3IpINGD0LfQu9C+0LIsINC90LAg0LrQvtGC0L7RgNGL0YUg0LHRg9C00LXRgiDRgdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC/0YDQsNCy0LjQu9C+LlxyXG4gICAgICog0JXRgdC70Lgg0L3QtSDQt9Cw0LTQsNC9IC0g0LHRg9C00LXRgiDRgdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC90LAg0LrQsNC20LTQvtC8INGD0LfQu9C1IChUT0RPKS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHNlbGVjdG9yc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvcnMgPSBbXSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JzID0gc2VsZWN0b3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdG9ycygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3Q8UnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcywgUnVsZUJhc2UuSGFuZGxlclR5cGU+fVxyXG4gICAgICovXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIC8vIFRPRE8gZXJyb3IgZW1pdHRpbmdcclxuICAgICAgICB0aHJvdyBcIm5vdCBpbXBsZW1lbnRlZFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiogQGVudW17c3RyaW5nfSAqL1xyXG5SdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzID0ge1xyXG4gICAgLyog0JLRhdC+0LTQuNC8INCyINC+0YfQtdGA0LXQtNC90L7QuSDRg9C30LXQuyDQtNC10YDQtdCy0LAqL1xyXG4gICAgaW46ICdpbicsXHJcbiAgICAvKiDQktGL0YXQvtC00LjQvCAqL1xyXG4gICAgb3V0OiAnb3V0JyxcclxuICAgIC8qINCX0LDQutCw0L3Rh9C40LLQsNC10Lwg0L7QsdGF0L7QtCDQtNC10YDQtdCy0LAgKi9cclxuICAgIGVuZDogJ2VuZCdcclxufTtcclxuXHJcbi8qKiBAdHlwZWRlZiB7ZnVuY3Rpb24oQmVtTm9kZSk6ICghTGludEVycm9yfHVuZGVmaW5lZCl9ICovXHJcblJ1bGVCYXNlLkhhbmRsZXJUeXBlO1xyXG5cclxuLyoqIEB0eXBlZGVmIHtPYmplY3Q8UnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcywgT2JqZWN0PHN0cmluZywgUnVsZUJhc2UuSGFuZGxlclR5cGU+Pn0gKi9cclxuUnVsZUJhc2UuSGFuZGxlcnNNYXBUeXBlO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJ1bGVCYXNlOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tICcuL3J1bGViYXNlLmpzJztcclxuXHJcbmNvbnN0IHBoYXNlcyA9IFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXM7XHJcblxyXG5jbGFzcyBSdWxlTWVkaWF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IocnVsZXMpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlcnNNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLmFsd2F5c0NhbGxlZEhhbmRsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5idWlsZE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWFwKCkge1xyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gcnVsZS5nZXRTZWxlY3RvcnMoKTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnNNYXAgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHBoYXNlIGluIGhhbmRsZXJzTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNNYXBbcGhhc2VdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0b3JzLmxlbmd0aCAmJiBwaGFzZSAhPT0gcGhhc2VzLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWx3YXlzQ2FsbGVkSGFuZGxlcnMucHVzaChoYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5KHBoYXNlLCBzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYW5kbGVyc01hcFtrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzTWFwW2tleV0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyc01hcFtrZXldLnB1c2goaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0S2V5KHBoYXNlLCBzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiBwaGFzZSArICckJyArIHNlbGVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7QXJyYXk8IUxpbnRFcnJvcj59XHJcbiAgICAgKi9cclxuICAgIGNhbGwocGhhc2UsIGJlbU5vZGUpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShwaGFzZSwgYmVtTm9kZS5zZWxlY3Rvcik7XHJcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtrZXldIHx8IFtdO1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaGFuZGxlcnMgPSBbLi4uaGFuZGxlcnMsIC4uLnRoaXMuYWx3YXlzQ2FsbGVkSGFuZGxlcnNdO1xyXG5cclxuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlckVycm9ycyA9IGhhbmRsZXIoYmVtTm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXJyb3JzID0gdGhpcy5nZXRNZXJnZWRFcnJvcnMoZXJyb3JzLCBoYW5kbGVyRXJyb3JzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgbGV0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKVtwaGFzZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlckVycm9ycyA9IGhhbmRsZXIobnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXJyb3JzID0gdGhpcy5nZXRNZXJnZWRFcnJvcnMoZXJyb3JzLCBoYW5kbGVyRXJyb3JzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRNZXJnZWRFcnJvcnMoYWxsRXJyb3JzLCBvdGhlckVycm9ycykge1xyXG4gICAgICAgIGlmICghb3RoZXJFcnJvcnMpXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxFcnJvcnM7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG90aGVyRXJyb3JzKSlcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hbGxFcnJvcnMsIC4uLm90aGVyRXJyb3JzXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFsuLi5hbGxFcnJvcnMsIG90aGVyRXJyb3JzXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZU1lZGlhdG9yOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgSDFIMiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge01hcDxCZW1Ob2RlLCB7bm9kZTogQmVtTm9kZSwgb3JkZXI6IG51bWJlcn0+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwID0gbmV3IE1hcCgpOyAvLyB7aDEtbm9kZSwgaDEtcGFyZW50IHdpdGggb3JkZXJ9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge01hcDxCZW1Ob2RlLCBBcnJheTx7bm9kZTogQmVtTm9kZSwgb3JkZXI6IG51bWJlcn0+Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmgyUGFyZW50VG9IMk1hcCA9IG5ldyBNYXAoKTsgLy8ge3BhcmVudCwgaDItY2hpbGRzIHdpdGggb3JkZXJ9XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xyXG4gICAgICAgIHRoaXMub3JkZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuZW5kXTogdGhpcy5lbmQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIMShub2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcC5zZXQobm9kZSwge25vZGU6IG5vZGUucGFyZW50LCBvcmRlcjogdGhpcy5vcmRlcisrfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0gyKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUucGFyZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmgyUGFyZW50VG9IMk1hcC5oYXMocGFyZW50KSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaDJQYXJlbnRUb0gyTWFwLnNldChwYXJlbnQsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGgyTm9kZXMgPSB0aGlzLmgyUGFyZW50VG9IMk1hcC5nZXQocGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIGgyTm9kZXMucHVzaCh7bm9kZTogbm9kZSwgb3JkZXI6IHRoaXMub3JkZXIrK30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmQoKSB7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdIMiA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAuZm9yRWFjaCgoe25vZGU6IHBhcmVudCwgb3JkZXI6IGgxT3JkZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnQ7IGN1cnJlbnRQYXJlbnQ7IGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaDJOb2RlcyA9IHRoaXMuaDJQYXJlbnRUb0gyTWFwLmdldChjdXJyZW50UGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWgyTm9kZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaDJOb2Rlcy5mb3JFYWNoKCh7bm9kZTogaDJOb2RlLCBvcmRlcjogaDJPcmRlcn0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaDJPcmRlciA8IGgxT3JkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nSDIuYWRkKGgyTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB3cm9uZ0gyLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBUZXh0SW52YWxpZEgyUG9zaXRpb24obm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSDEobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHlwZSAmJiB0eXBlID09PSAnaDEnO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSDIobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHlwZSAmJiB0eXBlID09PSAnaDInO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIMUgyOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuLy8gVE9ETyDRjdGC0L4gY29weS1wYXN0ZSDRgtC10YHRgtCwIGgxaDIuanMg0YEg0LfQsNC80LXQvdC+0LkgaDEgLT4gaDIg0LIg0LzQtdGC0L7QtNC1IGlzSDEg0LggaDIgLT4gaDMg0LIg0LzQtdGC0L7QtNC1IGlzSDJcclxuXHJcbmNsYXNzIEgySDMgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXA8QmVtTm9kZSwge25vZGU6IEJlbU5vZGUsIG9yZGVyOiBudW1iZXJ9Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcCA9IG5ldyBNYXAoKTsgLy8ge2gxLW5vZGUsIGgxLXBhcmVudCB3aXRoIG9yZGVyfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXA8QmVtTm9kZSwgQXJyYXk8e25vZGU6IEJlbU5vZGUsIG9yZGVyOiBudW1iZXJ9Pj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5oMlBhcmVudFRvSDJNYXAgPSBuZXcgTWFwKCk7IC8vIHtwYXJlbnQsIGgyLWNoaWxkcyB3aXRoIG9yZGVyfVxyXG5cclxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cclxuICAgICAgICB0aGlzLm9yZGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmVuZF06IHRoaXMuZW5kLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSDEobm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAuc2V0KG5vZGUsIHtub2RlOiBub2RlLnBhcmVudCwgb3JkZXI6IHRoaXMub3JkZXIrK30pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNIMihub2RlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBub2RlLnBhcmVudDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oMlBhcmVudFRvSDJNYXAuaGFzKHBhcmVudCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmgyUGFyZW50VG9IMk1hcC5zZXQocGFyZW50LCBbXSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoMk5vZGVzID0gdGhpcy5oMlBhcmVudFRvSDJNYXAuZ2V0KHBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICBoMk5vZGVzLnB1c2goe25vZGU6IG5vZGUsIG9yZGVyOiB0aGlzLm9yZGVyKyt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5kKCkge1xyXG4gICAgICAgIGNvbnN0IHdyb25nSDIgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwLmZvckVhY2goKHtub2RlOiBwYXJlbnQsIG9yZGVyOiBoMU9yZGVyfSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50OyBjdXJyZW50UGFyZW50OyBjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGgyTm9kZXMgPSB0aGlzLmgyUGFyZW50VG9IMk1hcC5nZXQoY3VycmVudFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFoMk5vZGVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGgyTm9kZXMuZm9yRWFjaCgoe25vZGU6IGgyTm9kZSwgb3JkZXI6IGgyT3JkZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGgyT3JkZXIgPCBoMU9yZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0gyLmFkZChoMk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgd3JvbmdIMi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChuZXcgVGV4dEludmFsaWRIMlBvc2l0aW9uKG5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpc0gxKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgJiYgdHlwZSA9PT0gJ2gyJztcclxuICAgIH1cclxuXHJcbiAgICBpc0gyKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgJiYgdHlwZSA9PT0gJ2gzJztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSDJIMzsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0U2V2ZXJhbEgxfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5cclxuY2xhc3MgU2V2ZXJhbEgxIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICB0aGlzLmgxd2FzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSAhPT0gJ2gxJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaDF3YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5oMXdhcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHRTZXZlcmFsSDEobm9kZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldmVyYWxIMTsiLCJcclxuY29uc3Qgc2l6ZXNTY2FsZSA9IFtcInh4eHNcIiwgXCJ4eHNcIiwgXCJ4c1wiLCBcInNcIiwgXCJtXCIsIFwibFwiLCBcInhsXCIsIFwieHhsXCIsIFwieHh4bFwiLCBcInh4eHhsXCIsIFwieHh4eHhsXCJdO1xyXG5cclxuY2xhc3MgU2l6ZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICovXHJcbiAgICBhZGQoY291bnQpIHtcclxuICAgICAgICBsZXQgaW5kID0gc2l6ZXNTY2FsZS5pbmRleE9mKHRoaXMuc2l6ZSk7XHJcblxyXG4gICAgICAgIGlmICh+aW5kKVxyXG4gICAgICAgICAgICBpbmQgPSBpbmQgKyBjb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZXNTY2FsZVtpbmRdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjaGVjayhzaXplQikge1xyXG4gICAgICAgIHJldHVybiAhISh0aGlzLnNpemUgJiYgc2l6ZUIpICYmIHRoaXMuc2l6ZSA9PT0gc2l6ZUI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc0RlZih4KSB7XHJcbiAgICByZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KG9iaiwgLi4ucHJvcHMpIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSAvLyDRhNGD0L3QutGG0LjQuCDQvdC1INC/0YDQtdC00L/QvtC70LDQs9Cw0Y7RgtGB0Y9cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGxldCBjdXJyZW50ID0gb2JqO1xyXG5cclxuICAgIGZvciAobGV0IHByb3Agb2YgcHJvcHMpIHtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0RlZihwcm9wKSlcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBTaXplLFxyXG4gICAgZ2V0XHJcbn0iLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBCdXR0b25Qb3NpdGlvbiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAncGxhY2Vob2xkZXInXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzID0gbmV3IE1hcCgpOyAvLyDRhdGA0LDQvdC40LwgMSBwbGFjZWhvbGRlclxyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIGJ1dHRvblxyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVE9ETyDRgdGH0LjRgtCw0LXQvCwg0YfRgtC+INCyINCx0LvQvtC60LUgd2FybmluZyDQvdC1INCx0L7Qu9C10LUgMSBidXR0b24g0Lgg0L3QtSDQsdC+0LvQtdC1IDEgcGxhY2Vob2xlciAo0YXQvtGC0Y8g0Y3RgtC+INC90LUg0L7QsdGP0LfQsNC90L4g0LHRi9GC0Ywg0YLQsNC6KVxyXG4gICAgICAgIC8vINCSINC/0YDQvtGC0LjQstC90L7QvCDRgdC70YPRh9Cw0LUsINC90LXQv9C+0L3Rj9GC0L3QviDQutCw0Log0LjRhSDQvNCw0YLRh9C40YLRjCDQtNGA0YPQsyDRgSDQtNGA0YPQs9C+0LwgKNC90LDQv9GA0LjQvNC10YAg0LIg0YLQsNC60L7QuSDRgdC40YLRg9Cw0YbQuNC4OiBidXR0b24sIHBsYWNlaG9sZGVyLCBidXR0b24pXHJcbiAgICAgICAgLy8g0LgsINGB0L7QvtGC0LLQtdGC0YHRgtCy0LXQvdC90L4sINCy0YvQtNCw0LLQsNGC0Ywg0L7RiNC40LHQutC4XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdwbGFjZWhvbGRlcicpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyTm9kZXMuaGFzKHdhcm5pbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZhbGlkQnV0dG9uID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW52YWxpZEJ1dHRvbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24oaW52YWxpZEJ1dHRvbi5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblBvc2l0aW9uOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdFwiO1xyXG5cclxuY2xhc3MgQnV0dG9uU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAndGV4dCddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnRleHROb2RlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnV0dG9uTm9kZXMgPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgYnV0dG9uTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RUZXh0Tm9kZSA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuICAgICAgICBjb25zdCBidXR0b25zID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghYnV0dG9ucylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghZmlyc3RUZXh0Tm9kZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdFRleHROb2RlLm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgc2l6ZS5hZGQoMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldChidXR0b24ubW9kcywgJ3NpemUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZS5jaGVjayhzaXplVmFsQikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZShidXR0b24ubG9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNpemU7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemV9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNvbnN0IGNvcnJlY3RTaXplcyA9IFsncycsICdtJywgJ2wnXTtcclxuXHJcbmNsYXNzIFBsYWNlaG9sZGVyU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdwbGFjZWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGdldChub2RlLm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3QgaW5kID0gY29ycmVjdFNpemVzLmluZGV4T2Yoc2l6ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGluZCA9PT0gLTEpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUobm9kZS5sb2NhdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxhY2Vob2xkZXJTaXplOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWx9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIFRleHRTaXplcyBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIXRleHROb2RlcylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBbZmlyc3QsIC4uLm90aGVyXSA9IHRleHROb2RlcztcclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdC5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHRleHQgb2Ygb3RoZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZVZhbEIgPSBnZXQodGV4dC5tb2RzLCAnc2l6ZScpO1xyXG5cclxuICAgICAgICAgICAgLy8g0JTQsNC20LUg0LXRgdC70Lgg0LIg0YDQsNC80LrQsNGFINC+0LTQvdC+0LPQviDQsdC70L7QutCwINC90LXRgdC60L7Qu9GM0LrQviDQvtGI0LjQsdC+0YfQvdGL0YUg0YHQu9C+0LIsINGC0L4g0LLQvtCy0YDQsNGJ0LDQtdC8INC+0LTQvdGDINC+0YjQuNCx0LrRgy5cclxuICAgICAgICAgICAgaWYgKCFzaXplLmNoZWNrKHNpemVWYWxCKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbChub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0U2l6ZXM7Il0sInNvdXJjZVJvb3QiOiIifQ==