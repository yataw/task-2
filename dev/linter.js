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

/*tests.forEach((test, ind) => {
    const res = window.lint(test);

    console.log('test: ' + (ind + 1));
    console.log(res);
})*/

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcmtldGluZy90b29tdWNoLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90ZXh0L2gxaDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDJoMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJlIiwiQkxPQ0siLCJFTEVNIiwiQ09OVEVOVCIsIk1PRFMiLCJNSVgiLCJFTEVNTU9EUyIsIlBST1BTIiwibG9jYXRpb25LZXkiLCJKc29uU291cmNlTWFwIiwia2V5IiwiQmVtTm9kZSIsImNvbnN0cnVjdG9yIiwibm9kZSIsInBhcmVudCIsImJsb2NrIiwiZWxlbSIsIm1vZHMiLCJtaXgiLCJlbGVtTW9kcyIsImxvY2F0aW9uIiwic2VsZWN0b3IiLCJXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIiwiTGludEVycm9yIiwiY29kZSIsImVycm9yIiwiV2FybmluZ0ludmFsaWRCdXR0b25TaXplIiwiV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbiIsIldhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplIiwiVGV4dFNldmVyYWxIMSIsIlRleHRJbnZhbGlkSDJQb3NpdGlvbiIsIlRleHRJbnZhbGlkSDNQb3NpdGlvbiIsIkdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzIiwiSW52YWxpZElucHV0IiwiRXJyb3IiLCJwb3NpdGlvbktleSIsIlN5bWJvbCIsInJlc3VsdCIsInBhcnNlIiwianNvbiIsImRhdGEiLCJwb2ludGVycyIsIm1hdGNoIiwicGF0aCIsInZhbHVlIiwidmFsdWVFbmQiLCJzdGFydCIsImVuZCIsIm1hcCIsInZhbCIsImxpbmUiLCJjb2x1bW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJjaGlsZCIsImluZCIsInBoYXNlcyIsIlJ1bGVCYXNlIiwicHJvdG90eXBlIiwicnVsZUNsYXNzZXMiLCJiZW1Ob2RlIiwiY29udGVudEFzQXJyYXkiLCJjYWxsIiwiaW4iLCJuZXh0Iiwib3V0IiwibWVkaWF0b3IiLCJlcnJvcnMiLCJpbml0Iiwic3RyaW5nVHJlZSIsImF0dGFjaFJvb3QiLCJtYXBwZXIiLCJyb290IiwiZ2V0SnNvbiIsImNhbGxBbGwiLCJydWxlc0luc3RhbmNlcyIsInJDbGFzcyIsIlJ1bGVNZWRpYXRvciIsInBoYXNlIiwiYWRkRXJyb3JzIiwiZWwiLCJmbGF0IiwiSW5maW5pdHkiLCJUZXh0U2l6ZXMiLCJCdXR0b25TaXplIiwiQnV0dG9uUG9zaXRpb24iLCJQbGFjZWhvbGRlclNpemUiLCJTZXZlcmFsSDEiLCJIMUgyIiwiSDJIMyIsIlRvb011Y2giLCJtYXJrZXRpbmdCbG9ja3MiLCJncmlkIiwiZ3JpZEZyYWN0aW9uIiwidG90YWxNYXJrZXRpbmciLCJnZXRQaGFzZUhhbmRsZXJzTWFwIiwiYmluZCIsInNpemUiLCJnZXQiLCJpbmNsdWRlcyIsImZ1bGxTaXplIiwidG90YWxJbmZvIiwic2VsZWN0b3JzIiwiZ2V0U2VsZWN0b3JzIiwiSGFuZGxlclR5cGUiLCJIYW5kbGVyc01hcFR5cGUiLCJoYW5kbGVyc01hcCIsImFsd2F5c0NhbGxlZEhhbmRsZXJzIiwiYnVpbGRNYXAiLCJydWxlIiwiaGFuZGxlciIsImxlbmd0aCIsInB1c2giLCJnZXRLZXkiLCJoYW5kbGVycyIsImhhbmRsZXJFcnJvcnMiLCJnZXRNZXJnZWRFcnJvcnMiLCJhbGxFcnJvcnMiLCJvdGhlckVycm9ycyIsImgxVG9IMVBhcmVudE1hcCIsIk1hcCIsImgyUGFyZW50VG9IMk1hcCIsIm9yZGVyIiwiaXNIMSIsInNldCIsImlzSDIiLCJoYXMiLCJoMk5vZGVzIiwid3JvbmdIMiIsIlNldCIsImgxT3JkZXIiLCJjdXJyZW50UGFyZW50IiwiaDJOb2RlIiwiaDJPcmRlciIsImFkZCIsInBvc2l0aW9uIiwidHlwZSIsImgxd2FzIiwic2l6ZXNTY2FsZSIsIlNpemUiLCJjb3VudCIsImluZGV4T2YiLCJjaGVjayIsInNpemVCIiwiaXNEZWYiLCJ4IiwidW5kZWZpbmVkIiwib2JqIiwicHJvcHMiLCJjdXJyZW50IiwicHJvcCIsIndhcm5pbmdzIiwicGxhY2Vob2xkZXJOb2RlcyIsImJ1dHRvbk5vZGVzIiwid2FybmluZyIsImdldExhc3RXYXJuaW5nIiwiaW52YWxpZEJ1dHRvbiIsInBvcCIsImRlbGV0ZSIsInRleHROb2RlcyIsImZpcnN0VGV4dE5vZGUiLCJidXR0b25zIiwic2l6ZVZhbEEiLCJidXR0b24iLCJzaXplVmFsQiIsImNvcnJlY3RTaXplcyIsImZpcnN0Iiwib3RoZXIiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0NBR0E7QUFDQTs7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsc0RBQUosQ0FBV0MsMERBQVgsQ0FBZjs7QUFFQUMsTUFBTSxDQUFDQyxJQUFQLEdBQWMsVUFBU0MsR0FBVCxFQUFjO0FBQ3hCLE1BQUk7QUFDQSxXQUFPTCxNQUFNLENBQUNJLElBQVAsQ0FBWUMsR0FBWixDQUFQO0FBQ0gsR0FGRCxDQUVFLE9BQU9DLENBQVAsRUFBVTtBQUNSLFdBQU8sRUFBUDtBQUNIO0FBQ0osQ0FORCxDLENBUUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsYUFBYTtBQUN6Qyw2QkFBNkIsY0FBYztBQUMzQyw0QkFBNEIsYUFBYTtBQUN6QyxxQ0FBcUM7QUFDckMsdUNBQXVDO0FBQ3ZDLGFBQWEsMkJBQTJCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsZ0NBQWdDO0FBQ2hDLGdDQUFnQyxRQUFRO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixjQUFjO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixtQ0FBbUM7QUFDbkMsa0NBQWtDO0FBQ2xDLGtDQUFrQyxVQUFVO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxPQUFPO0FBQ1AsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLE9BQU87QUFDUCxlQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaGRBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxNQUFNO0FBQUNDLE9BQUQ7QUFBUUMsTUFBUjtBQUFjQyxTQUFkO0FBQXVCQyxNQUF2QjtBQUE2QkMsS0FBN0I7QUFBa0NDO0FBQWxDLElBQThDQyxxREFBcEQ7QUFDQSxNQUFNQyxXQUFXLEdBQUdDLHlEQUFhLENBQUNDLEdBQWxDOztBQUVBLE1BQU1DLE9BQU4sQ0FBYztBQUNWOzs7O0FBSUFDLGFBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxNQUFQLEVBQWU7QUFDdEIsU0FBS0MsS0FBTCxHQUFhRixJQUFJLENBQUNaLEtBQUQsQ0FBakI7QUFDQSxTQUFLZSxJQUFMLEdBQVlILElBQUksQ0FBQ1gsSUFBRCxDQUFoQjtBQUNBLFNBQUtlLElBQUwsR0FBWUosSUFBSSxDQUFDVCxJQUFELENBQWhCO0FBQ0EsU0FBS2MsR0FBTCxHQUFXTCxJQUFJLENBQUNSLEdBQUQsQ0FBZjtBQUNBLFNBQUtjLFFBQUwsR0FBZ0JOLElBQUksQ0FBQ1AsUUFBRCxDQUFwQjtBQUVBLFNBQUtjLFFBQUwsR0FBZ0JQLElBQUksQ0FBQ0wsV0FBRCxDQUFwQjtBQUVBLFNBQUtNLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtPLFFBQUwsR0FBZ0IsS0FBS04sS0FBTCxJQUFjLEtBQUtDLElBQUwsR0FBYyxLQUFJLEtBQUtBLElBQUssRUFBNUIsR0FBaUMsRUFBL0MsQ0FBaEI7QUFDSDs7QUFoQlM7O0FBbUJDTCxzRUFBZixFOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQSxNQUFNVyw0QkFBTixTQUEyQ0MscURBQTNDLENBQXFEO0FBQ2pEWCxhQUFXLENBQUNRLFFBQUQsRUFDWDtBQUNJLFVBQU07QUFBQ0ksVUFBSSxFQUFFLG9DQUFQO0FBQTZDQyxXQUFLLEVBQUUsb0RBQXBEO0FBQTBHTDtBQUExRyxLQUFOO0FBQ0g7O0FBSmdEOztBQU9yRCxNQUFNTSx3QkFBTixTQUF1Q0gscURBQXZDLENBQWlEO0FBQzdDWCxhQUFXLENBQUNRLFFBQUQsRUFDWDtBQUNJLFVBQU07QUFBQ0ksVUFBSSxFQUFFLDZCQUFQO0FBQXNDQyxXQUFLLEVBQUUsdUVBQTdDO0FBQXNITDtBQUF0SCxLQUFOO0FBQ0g7O0FBSjRDOztBQU9qRCxNQUFNTyw0QkFBTixTQUEyQ0oscURBQTNDLENBQXFEO0FBQ2pEWCxhQUFXLENBQUNRLFFBQUQsRUFDWDtBQUNJLFVBQU07QUFBQ0ksVUFBSSxFQUFFLGlDQUFQO0FBQTBDQyxXQUFLLEVBQUUsa0VBQWpEO0FBQXFITDtBQUFySCxLQUFOO0FBQ0g7O0FBSmdEOztBQU9yRCxNQUFNUSw2QkFBTixTQUE0Q0wscURBQTVDLENBQXNEO0FBQ2xEWCxhQUFXLENBQUNRLFFBQUQsRUFDWDtBQUNJLFVBQU07QUFBQ0ksVUFBSSxFQUFFLGtDQUFQO0FBQTJDQyxXQUFLLEVBQUUsb0VBQWxEO0FBQXdITDtBQUF4SCxLQUFOO0FBQ0g7O0FBSmlEOztBQU90RCxNQUFNUyxhQUFOLFNBQTRCTixxREFBNUIsQ0FBc0M7QUFDbENYLGFBQVcsQ0FBQ1EsUUFBRCxFQUNYO0FBQ0ksVUFBTTtBQUFDSSxVQUFJLEVBQUUsaUJBQVA7QUFBMEJDLFdBQUssRUFBRSxnRUFBakM7QUFBbUdMO0FBQW5HLEtBQU47QUFDSDs7QUFKaUM7O0FBT3RDLE1BQU1VLHFCQUFOLFNBQW9DUCxxREFBcEMsQ0FBOEM7QUFDMUNYLGFBQVcsQ0FBQ1EsUUFBRCxFQUNYO0FBQ0ksVUFBTTtBQUFDSSxVQUFJLEVBQUUsMEJBQVA7QUFBbUNDLFdBQUssRUFBRSwrRUFBMUM7QUFBMkhMO0FBQTNILEtBQU47QUFDSDs7QUFKeUM7O0FBTzlDLE1BQU1XLHFCQUFOLFNBQW9DUixxREFBcEMsQ0FBOEM7QUFDMUNYLGFBQVcsQ0FBQ1EsUUFBRCxFQUNYO0FBQ0ksVUFBTTtBQUFDSSxVQUFJLEVBQUUsMEJBQVA7QUFBbUNDLFdBQUssRUFBRSxnRkFBMUM7QUFBNEhMO0FBQTVILEtBQU47QUFDSDs7QUFKeUM7O0FBTzlDLE1BQU1ZLDBCQUFOLFNBQXlDVCxxREFBekMsQ0FBbUQ7QUFDL0NYLGFBQVcsQ0FBQ1EsUUFBRCxFQUNYO0FBQ0ksVUFBTTtBQUFDSSxVQUFJLEVBQUUsZ0NBQVA7QUFBeUNDLFdBQUssRUFBRSxrRkFBaEQ7QUFBb0lMO0FBQXBJLEtBQU47QUFDSDs7QUFKOEM7Ozs7Ozs7Ozs7Ozs7O0FDbERuRDtBQUFBLE1BQU1HLFNBQU4sQ0FBZ0I7QUFDWlgsYUFBVyxDQUFDO0FBQUNZLFFBQUQ7QUFBT0MsU0FBUDtBQUFjTDtBQUFkLEdBQUQsRUFBMEI7QUFDakMsU0FBS0ksSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0wsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7QUFMVzs7QUFRREcsd0VBQWYsRTs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBOzs7O0FBSUEsTUFBTVUsWUFBTixTQUEyQkMsS0FBM0IsQ0FBaUM7QUFDN0J0QixhQUFXLEdBQUc7QUFDVixVQUFNLGVBQU47QUFDSDs7QUFINEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xqQzs7O0FBSUE7QUFDQTtBQUNBO0FBR0EsTUFBTTtBQUFDVDtBQUFELElBQVlJLHFEQUFsQjtBQUVBLE1BQU00QixXQUFXLEdBQUdDLE1BQU0sQ0FBQyxVQUFELENBQTFCOztBQUVBLE1BQU0zQixhQUFOLENBQW9CO0FBQ2hCOzs7QUFHQUcsYUFBVyxDQUFDYixHQUFELEVBQU07QUFBQSxxQ0FNUCxNQUFNO0FBQ1osVUFBSTtBQUNBLGNBQU1zQyxNQUFNLEdBQUdDLDZEQUFLLENBQUMsS0FBS3ZDLEdBQU4sQ0FBcEI7QUFFQSxhQUFLd0MsSUFBTCxHQUFZRixNQUFNLENBQUNHLElBQW5CO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQkosTUFBTSxDQUFDSSxRQUF2QjtBQUNILE9BTEQsQ0FNQSxPQUFNekMsQ0FBTixFQUFTO0FBQ0wsY0FBTSxJQUFJaUMsNkRBQUosRUFBTjtBQUNIOztBQUVELFdBQUtTLEtBQUwsQ0FBVyxLQUFLSCxJQUFoQixFQUFzQixFQUF0QjtBQUVBLGFBQU8sS0FBS0EsSUFBWjtBQUNILEtBcEJnQjs7QUFBQSxtQ0FzQlQsQ0FBQzFCLElBQUQsRUFBTzhCLElBQVAsS0FBZ0I7QUFDcEIsWUFBTTtBQUFDQyxhQUFEO0FBQVFDO0FBQVIsVUFBb0IsS0FBS0osUUFBTCxDQUFjRSxJQUFkLENBQTFCLENBRG9CLENBR3BCO0FBQ0E7O0FBQ0EsWUFBTSxDQUFDRyxLQUFELEVBQVFDLEdBQVIsSUFBZSxDQUFDSCxLQUFELEVBQVFDLFFBQVIsRUFBa0JHLEdBQWxCLENBQXNCQyxHQUFHLEtBQUs7QUFBQ0MsWUFBSSxFQUFFRCxHQUFHLENBQUNDLElBQVg7QUFBaUJDLGNBQU0sRUFBRUYsR0FBRyxDQUFDRSxNQUFKLEdBQWE7QUFBdEMsT0FBTCxDQUF6QixDQUFyQjtBQUNBLFlBQU1DLFFBQVEsR0FBR3ZDLElBQUksQ0FBQ1YsT0FBRCxDQUFyQjtBQUVBVSxVQUFJLENBQUNzQixXQUFELENBQUosR0FBb0I7QUFBQ1csYUFBRDtBQUFRQztBQUFSLE9BQXBCO0FBRUEsVUFBSSxDQUFDSyxRQUFMLEVBQ0k7O0FBRUosVUFBSUMsS0FBSyxDQUFDQyxPQUFOLENBQWNGLFFBQWQsQ0FBSixFQUE2QjtBQUN6QkEsZ0JBQVEsQ0FBQ0csT0FBVCxDQUFpQixDQUFDQyxLQUFELEVBQVFDLEdBQVIsS0FBZ0I7QUFDN0IsZUFBS2YsS0FBTCxDQUFXYyxLQUFYLEVBQW1CLEdBQUViLElBQUssSUFBR3hDLE9BQVEsSUFBR3NELEdBQUksRUFBNUM7QUFDSCxTQUZEO0FBR0gsT0FKRCxNQUlPO0FBQ0gsYUFBS2YsS0FBTCxDQUFXVSxRQUFYLEVBQXNCLEdBQUVULElBQUssSUFBR3hDLE9BQVEsRUFBeEM7QUFDSDtBQUNKLEtBMUNnQjs7QUFDYixTQUFLSixHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLd0MsSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLRSxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7O0FBUmU7O2dCQUFkaEMsYSxTQWdEVzBCLFc7O0FBR0YxQiw0RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsTUFBTTtBQUFDTjtBQUFELElBQVlJLHFEQUFsQjtBQUNBLE1BQU1tRCxNQUFNLEdBQUdDLDBEQUFRLENBQUNDLFNBQVQsQ0FBbUJGLE1BQWxDOztBQUVBLE1BQU0vRCxNQUFOLENBQWE7QUFDVDs7O0FBR0FpQixhQUFXLENBQUNpRCxXQUFXLEdBQUcsRUFBZixFQUFtQjtBQUFBLHdDQWdDakI5RCxHQUFHLElBQUssS0FBSUksT0FBUSxPQUFNSixHQUFJLEtBaENiOztBQUFBLGtDQXNDdkIsQ0FBQ2MsSUFBRCxFQUFPQyxNQUFQLEtBQWtCO0FBQ3JCLFlBQU1nRCxPQUFPLEdBQUcsSUFBSW5ELG1EQUFKLENBQVlFLElBQVosRUFBa0JDLE1BQWxCLENBQWhCO0FBQ0EsWUFBTXNDLFFBQVEsR0FBRyxLQUFLVyxjQUFMLENBQW9CbEQsSUFBSSxDQUFDVixPQUFELENBQXhCLENBQWpCO0FBRUEsV0FBSzZELElBQUwsQ0FBVU4sTUFBTSxDQUFDTyxFQUFqQixFQUFxQkgsT0FBckI7QUFFQVYsY0FBUSxDQUFDSixHQUFULENBQWNRLEtBQUQsSUFBVztBQUNwQixhQUFLVSxJQUFMLENBQVVWLEtBQVYsRUFBaUJNLE9BQWpCO0FBQ0gsT0FGRDtBQUlBLFdBQUtFLElBQUwsQ0FBVU4sTUFBTSxDQUFDUyxHQUFqQixFQUFzQkwsT0FBdEI7QUFDSCxLQWpENkI7O0FBQzFCLFNBQUtELFdBQUwsR0FBbUJBLFdBQW5CO0FBRUEsU0FBS08sUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0g7QUFFRDs7Ozs7QUFHQXZFLE1BQUksQ0FBQ0MsR0FBRCxFQUFNO0FBQ04sU0FBS3VFLElBQUw7QUFFQSxVQUFNQyxVQUFVLEdBQUcsS0FBS0MsVUFBTCxDQUFnQnpFLEdBQWhCLENBQW5CO0FBQ0EsVUFBTTBFLE1BQU0sR0FBRyxJQUFJaEUseURBQUosQ0FBa0I4RCxVQUFsQixDQUFmO0FBQ0EsVUFBTUcsSUFBSSxHQUFHRCxNQUFNLENBQUNFLE9BQVAsQ0FBZUosVUFBZixDQUFiO0FBRUEsU0FBS0wsSUFBTCxDQUFVUSxJQUFWLEVBQWdCLElBQWhCO0FBQ0EsU0FBS0UsT0FBTCxDQUFhbEIsTUFBTSxDQUFDWCxHQUFwQixFQVJNLENBVU47O0FBQ0EsV0FBTyxLQUFLc0IsTUFBWjtBQUNIOztBQUVEQyxNQUFJLEdBQUc7QUFDSCxVQUFNTyxjQUFjLEdBQUcsS0FBS2hCLFdBQUwsQ0FBaUJiLEdBQWpCLENBQXFCOEIsTUFBTSxJQUFJLElBQUlBLE1BQUosRUFBL0IsQ0FBdkI7QUFFQSxTQUFLVixRQUFMLEdBQWdCLElBQUlXLDhEQUFKLENBQWlCRixjQUFqQixDQUFoQjtBQUNBLFNBQUtSLE1BQUwsR0FBYyxFQUFkO0FBQ0g7QUFFRDs7O0FBb0JBTCxNQUFJLENBQUNnQixLQUFELEVBQVFsQixPQUFSLEVBQWlCO0FBQ2pCLFVBQU1PLE1BQU0sR0FBRyxLQUFLRCxRQUFMLENBQWNKLElBQWQsQ0FBbUJnQixLQUFuQixFQUEwQmxCLE9BQTFCLENBQWY7QUFFQSxTQUFLbUIsU0FBTCxDQUFlWixNQUFmO0FBQ0g7O0FBRURPLFNBQU8sQ0FBQ0ksS0FBRCxFQUFRO0FBQ1gsVUFBTVgsTUFBTSxHQUFHLEtBQUtELFFBQUwsQ0FBY1EsT0FBZCxDQUFzQkksS0FBdEIsQ0FBZjtBQUVBLFNBQUtDLFNBQUwsQ0FBZVosTUFBZjtBQUNIOztBQUVEWSxXQUFTLENBQUNaLE1BQUQsRUFBUztBQUNkLFNBQUtBLE1BQUwsR0FBYyxDQUFDLEdBQUdBLE1BQUosRUFBWSxHQUFHLEtBQUtBLE1BQXBCLENBQWQ7QUFDSDs7QUFFRE4sZ0JBQWMsQ0FBQ21CLEVBQUQsRUFBSztBQUNmO0FBQ0EsUUFBSTdCLEtBQUssQ0FBQ0MsT0FBTixDQUFjNEIsRUFBZCxDQUFKLEVBQ0ksT0FBT0EsRUFBRSxDQUFDQyxJQUFILENBQVFDLFFBQVIsQ0FBUDtBQUVKLFdBQU9GLEVBQUUsR0FBRyxDQUFDQSxFQUFELENBQUgsR0FBVSxFQUFuQjtBQUNIOztBQTdFUTs7QUFnRkV2RixxRUFBZixFOzs7Ozs7Ozs7Ozs7QUN6RkE7QUFBZTtBQUNYTSxPQUFLLEVBQUUsT0FESTtBQUVYQyxNQUFJLEVBQUUsTUFGSztBQUdYQyxTQUFPLEVBQUUsU0FIRTtBQUlYQyxNQUFJLEVBQUUsTUFKSztBQUtYQyxLQUFHLEVBQUUsS0FMTTtBQU1YQyxVQUFRLEVBQUU7QUFOQyxDQUFmLEU7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNVixLQUFLLEdBQUcsQ0FDVnlGLDZEQURVLEVBQ0NDLDhEQURELEVBQ2FDLGtFQURiLEVBQzZCQyxtRUFEN0IsRUFFVkMsMERBRlUsRUFFQ0MscURBRkQsRUFFT0MscURBRlAsRUFHVkMsNkRBSFUsQ0FBZDtBQU1laEcsb0VBQWYsRTs7Ozs7Ozs7Ozs7O0FDZkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxNQUFNaUcsZUFBZSxHQUFHLENBQUMsWUFBRCxFQUFlLE9BQWYsQ0FBeEI7O0FBRUEsTUFBTUQsT0FBTixTQUFzQmpDLG9EQUF0QixDQUErQjtBQUMzQi9DLGFBQVcsR0FBRztBQUNWLFVBQU0sQ0FBQyxNQUFELEVBQVMsZ0JBQVQsRUFBMkIsR0FBR2lGLGVBQTlCLENBQU47QUFFQSxTQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFFQSxTQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBQ0g7O0FBRURDLHFCQUFtQixHQUFHO0FBQ2xCLFdBQU87QUFDSCxPQUFDLEtBQUt2QyxNQUFMLENBQVlPLEVBQWIsR0FBa0IsS0FBS0EsRUFBTCxDQUFRaUMsSUFBUixDQUFhLElBQWIsQ0FEZjtBQUVILE9BQUMsS0FBS3hDLE1BQUwsQ0FBWVMsR0FBYixHQUFtQixLQUFLQSxHQUFMLENBQVMrQixJQUFULENBQWMsSUFBZDtBQUZoQixLQUFQO0FBSUg7O0FBRURqQyxJQUFFLENBQUNwRCxJQUFELEVBQU87QUFDTCxRQUFJLEtBQUtpRixJQUFMLElBQWFqRixJQUFJLENBQUNRLFFBQUwsS0FBa0IsZ0JBQW5DLEVBQXFEO0FBQ2pELFdBQUswRSxZQUFMLEdBQW9CbEYsSUFBcEI7QUFFQTtBQUNIOztBQUVELFFBQUlBLElBQUksQ0FBQ0UsS0FBTCxLQUFlLE1BQW5CLEVBQTJCO0FBQ3ZCLFdBQUsrRSxJQUFMLEdBQVlqRixJQUFaO0FBRUE7QUFDSDs7QUFFRCxRQUFJLENBQUMsS0FBS2tGLFlBQVYsRUFDSTtBQUVKLFVBQU1JLElBQUksR0FBRyxDQUFDQyxxREFBRyxDQUFDLEtBQUtMLFlBQUwsQ0FBa0I1RSxRQUFuQixFQUE2QixPQUE3QixDQUFqQjtBQUVBLFFBQUkwRSxlQUFlLENBQUNRLFFBQWhCLENBQXlCeEYsSUFBSSxDQUFDRSxLQUE5QixDQUFKLEVBQ0ksS0FBS2lGLGNBQUwsSUFBdUJHLElBQXZCO0FBQ1A7O0FBRURoQyxLQUFHLENBQUN0RCxJQUFELEVBQU87QUFDTixRQUFJQSxJQUFJLENBQUNRLFFBQUwsS0FBa0IsZ0JBQXRCLEVBQXdDO0FBQ3BDLFdBQUswRSxZQUFMLEdBQW9CLElBQXBCO0FBRUE7QUFDSDs7QUFFRCxRQUFJbEYsSUFBSSxDQUFDRSxLQUFMLEtBQWUsTUFBbkIsRUFDSTtBQUVKLFVBQU11RixRQUFRLEdBQUcsQ0FBQ0YscURBQUcsQ0FBQ3ZGLElBQUksQ0FBQ0ksSUFBTixFQUFZLFdBQVosQ0FBckI7QUFDQSxRQUFJUSxLQUFKO0FBRUEsUUFBSSxLQUFLdUUsY0FBTCxHQUFzQixDQUF0QixJQUEyQk0sUUFBL0IsRUFDSTdFLEtBQUssR0FBRyxJQUFJTywyRUFBSixDQUErQm5CLElBQUksQ0FBQ08sUUFBcEMsQ0FBUjtBQUVKLFNBQUswRSxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBQ0EsU0FBS08sU0FBTCxHQUFpQixDQUFqQjtBQUVBLFdBQU85RSxLQUFQO0FBQ0g7O0FBN0QwQjs7QUFnRWhCbUUsc0VBQWYsRTs7Ozs7Ozs7Ozs7O0FDckVBO0FBQUEsTUFBTWpDLFFBQU4sQ0FBZTtBQUNYOzs7Ozs7QUFNQS9DLGFBQVcsQ0FBQzRGLFNBQVMsR0FBRyxFQUFiLEVBQWlCO0FBQ3hCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0g7O0FBRURDLGNBQVksR0FBRztBQUNYLFdBQU8sS0FBS0QsU0FBWjtBQUNIO0FBRUQ7Ozs7O0FBR0FQLHFCQUFtQixHQUFHO0FBQ2xCO0FBQ0EsVUFBTSxpQkFBTjtBQUNIOztBQXJCVTtBQXdCZjs7O0FBQ0F0QyxRQUFRLENBQUNDLFNBQVQsQ0FBbUJGLE1BQW5CLEdBQTRCO0FBQ3hCO0FBQ0FPLElBQUUsRUFBRSxJQUZvQjs7QUFHeEI7QUFDQUUsS0FBRyxFQUFFLEtBSm1COztBQUt4QjtBQUNBcEIsS0FBRyxFQUFFO0FBTm1CLENBQTVCO0FBU0E7O0FBQ0FZLFFBQVEsQ0FBQytDLFdBQVQ7QUFFQTs7QUFDQS9DLFFBQVEsQ0FBQ2dELGVBQVQ7QUFHZWhELHVFQUFmLEU7Ozs7Ozs7Ozs7OztBQzFDQTtBQUFBO0FBQUE7QUFFQSxNQUFNRCxNQUFNLEdBQUdDLG9EQUFRLENBQUNDLFNBQVQsQ0FBbUJGLE1BQWxDOztBQUVBLE1BQU1xQixZQUFOLENBQW1CO0FBQ2ZuRSxhQUFXLENBQUNoQixLQUFELEVBQVE7QUFDZixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFFQSxTQUFLZ0gsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUtDLG9CQUFMLEdBQTRCLEVBQTVCO0FBQ0EsU0FBS0MsUUFBTDtBQUNIOztBQUVEQSxVQUFRLEdBQUc7QUFDUCxTQUFLbEgsS0FBTCxDQUFXMkQsT0FBWCxDQUFtQndELElBQUksSUFBSTtBQUN2QixZQUFNUCxTQUFTLEdBQUdPLElBQUksQ0FBQ04sWUFBTCxFQUFsQjtBQUNBLFlBQU1HLFdBQVcsR0FBR0csSUFBSSxDQUFDZCxtQkFBTCxFQUFwQjs7QUFFQSxXQUFLLElBQUlqQixLQUFULElBQWtCNEIsV0FBbEIsRUFBK0I7QUFDM0IsY0FBTUksT0FBTyxHQUFHSixXQUFXLENBQUM1QixLQUFELENBQTNCOztBQUVBLFlBQUksQ0FBQ3dCLFNBQVMsQ0FBQ1MsTUFBWCxJQUFxQmpDLEtBQUssS0FBS3RCLE1BQU0sQ0FBQ1gsR0FBMUMsRUFBK0M7QUFDM0MsZUFBSzhELG9CQUFMLENBQTBCSyxJQUExQixDQUErQkYsT0FBL0I7QUFFQTtBQUNIOztBQUVEUixpQkFBUyxDQUFDakQsT0FBVixDQUFrQmxDLFFBQVEsSUFBSTtBQUMxQixnQkFBTVgsR0FBRyxHQUFHLEtBQUt5RyxNQUFMLENBQVluQyxLQUFaLEVBQW1CM0QsUUFBbkIsQ0FBWjtBQUVBLGNBQUksQ0FBQyxLQUFLdUYsV0FBTCxDQUFpQmxHLEdBQWpCLENBQUwsRUFDSSxLQUFLa0csV0FBTCxDQUFpQmxHLEdBQWpCLElBQXdCLEVBQXhCO0FBRUosZUFBS2tHLFdBQUwsQ0FBaUJsRyxHQUFqQixFQUFzQndHLElBQXRCLENBQTJCRixPQUEzQjtBQUNILFNBUEQ7QUFRSDtBQUNKLEtBdEJEO0FBdUJIOztBQUVERyxRQUFNLENBQUNuQyxLQUFELEVBQVEzRCxRQUFSLEVBQWtCO0FBQ3BCLFdBQU8yRCxLQUFLLEdBQUcsR0FBUixHQUFjM0QsUUFBckI7QUFDSDtBQUVEOzs7OztBQUdBMkMsTUFBSSxDQUFDZ0IsS0FBRCxFQUFRbEIsT0FBUixFQUFpQjtBQUNqQixVQUFNcEQsR0FBRyxHQUFHLEtBQUt5RyxNQUFMLENBQVluQyxLQUFaLEVBQW1CbEIsT0FBTyxDQUFDekMsUUFBM0IsQ0FBWjtBQUNBLFFBQUkrRixRQUFRLEdBQUcsS0FBS1IsV0FBTCxDQUFpQmxHLEdBQWpCLEtBQXlCLEVBQXhDO0FBQ0EsUUFBSTJELE1BQU0sR0FBRyxFQUFiO0FBRUErQyxZQUFRLEdBQUcsQ0FBQyxHQUFHQSxRQUFKLEVBQWMsR0FBRyxLQUFLUCxvQkFBdEIsQ0FBWDtBQUVBTyxZQUFRLENBQUM3RCxPQUFULENBQWlCeUQsT0FBTyxJQUFJO0FBQ3hCLFlBQU1LLGFBQWEsR0FBR0wsT0FBTyxDQUFDbEQsT0FBRCxDQUE3QjtBQUVBTyxZQUFNLEdBQUcsS0FBS2lELGVBQUwsQ0FBcUJqRCxNQUFyQixFQUE2QmdELGFBQTdCLENBQVQ7QUFDSCxLQUpEO0FBTUEsV0FBT2hELE1BQVA7QUFDSDs7QUFFRE8sU0FBTyxDQUFDSSxLQUFELEVBQVE7QUFDWCxRQUFJWCxNQUFNLEdBQUcsRUFBYjtBQUVBLFNBQUt6RSxLQUFMLENBQVcyRCxPQUFYLENBQW1Cd0QsSUFBSSxJQUFJO0FBQ3ZCLFlBQU1DLE9BQU8sR0FBR0QsSUFBSSxDQUFDZCxtQkFBTCxHQUEyQmpCLEtBQTNCLENBQWhCO0FBRUEsVUFBSSxDQUFDZ0MsT0FBTCxFQUNJO0FBRUosWUFBTUssYUFBYSxHQUFHTCxPQUFPLENBQUMsSUFBRCxDQUE3QjtBQUVBM0MsWUFBTSxHQUFHLEtBQUtpRCxlQUFMLENBQXFCakQsTUFBckIsRUFBNkJnRCxhQUE3QixDQUFUO0FBQ0gsS0FURDtBQVdBLFdBQU9oRCxNQUFQO0FBQ0g7O0FBRURpRCxpQkFBZSxDQUFDQyxTQUFELEVBQVlDLFdBQVosRUFBeUI7QUFDcEMsUUFBSSxDQUFDQSxXQUFMLEVBQ0ksT0FBT0QsU0FBUDtBQUVKLFFBQUlsRSxLQUFLLENBQUNDLE9BQU4sQ0FBY2tFLFdBQWQsQ0FBSixFQUNJLE9BQU8sQ0FBQyxHQUFHRCxTQUFKLEVBQWUsR0FBR0MsV0FBbEIsQ0FBUDtBQUVKLFdBQU8sQ0FBQyxHQUFHRCxTQUFKLEVBQWVDLFdBQWYsQ0FBUDtBQUNIOztBQW5GYzs7QUFzRkp6QywyRUFBZixFOzs7Ozs7Ozs7Ozs7QUMxRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTVcsSUFBTixTQUFtQi9CLG9EQUFuQixDQUE0QjtBQUN4Qi9DLGFBQVcsR0FBRztBQUNWLFVBQU0sQ0FBQyxNQUFELENBQU47QUFFQTs7OztBQUdBLFNBQUs2RyxlQUFMLEdBQXVCLElBQUlDLEdBQUosRUFBdkIsQ0FOVSxDQU13Qjs7QUFDbEM7Ozs7QUFHQSxTQUFLQyxlQUFMLEdBQXVCLElBQUlELEdBQUosRUFBdkIsQ0FWVSxDQVV3Qjs7QUFFbEM7O0FBQ0EsU0FBS0UsS0FBTCxHQUFhLENBQWI7QUFDSDs7QUFFRDNCLHFCQUFtQixHQUFHO0FBQ2xCLFdBQU87QUFDSCxPQUFDLEtBQUt2QyxNQUFMLENBQVlPLEVBQWIsR0FBa0IsS0FBS0EsRUFBTCxDQUFRaUMsSUFBUixDQUFhLElBQWIsQ0FEZjtBQUVILE9BQUMsS0FBS3hDLE1BQUwsQ0FBWVgsR0FBYixHQUFtQixLQUFLQSxHQUFMLENBQVNtRCxJQUFULENBQWMsSUFBZDtBQUZoQixLQUFQO0FBSUg7O0FBRURqQyxJQUFFLENBQUNwRCxJQUFELEVBQU87QUFDTCxRQUFJLEtBQUtnSCxJQUFMLENBQVVoSCxJQUFWLENBQUosRUFBcUI7QUFDakIsV0FBSzRHLGVBQUwsQ0FBcUJLLEdBQXJCLENBQXlCakgsSUFBekIsRUFBK0I7QUFBQ0EsWUFBSSxFQUFFQSxJQUFJLENBQUNDLE1BQVo7QUFBb0I4RyxhQUFLLEVBQUUsS0FBS0EsS0FBTDtBQUEzQixPQUEvQjtBQUVBO0FBQ0g7O0FBRUQsUUFBSSxLQUFLRyxJQUFMLENBQVVsSCxJQUFWLENBQUosRUFBcUI7QUFDakIsWUFBTUMsTUFBTSxHQUFHRCxJQUFJLENBQUNDLE1BQXBCO0FBRUEsVUFBSSxDQUFDLEtBQUs2RyxlQUFMLENBQXFCSyxHQUFyQixDQUF5QmxILE1BQXpCLENBQUwsRUFDSSxLQUFLNkcsZUFBTCxDQUFxQkcsR0FBckIsQ0FBeUJoSCxNQUF6QixFQUFpQyxFQUFqQztBQUVKLFlBQU1tSCxPQUFPLEdBQUcsS0FBS04sZUFBTCxDQUFxQnZCLEdBQXJCLENBQXlCdEYsTUFBekIsQ0FBaEI7QUFFQW1ILGFBQU8sQ0FBQ2YsSUFBUixDQUFhO0FBQUNyRyxZQUFJLEVBQUVBLElBQVA7QUFBYStHLGFBQUssRUFBRSxLQUFLQSxLQUFMO0FBQXBCLE9BQWI7QUFDSDtBQUNKOztBQUVEN0UsS0FBRyxHQUFHO0FBQ0YsVUFBTW1GLE9BQU8sR0FBRyxJQUFJQyxHQUFKLEVBQWhCO0FBRUEsU0FBS1YsZUFBTCxDQUFxQmxFLE9BQXJCLENBQTZCLENBQUM7QUFBQzFDLFVBQUksRUFBRUMsTUFBUDtBQUFlOEcsV0FBSyxFQUFFUTtBQUF0QixLQUFELEtBQW9DO0FBQzdELFdBQUssSUFBSUMsYUFBYSxHQUFHdkgsTUFBekIsRUFBaUN1SCxhQUFqQyxFQUFnREEsYUFBYSxHQUFHQSxhQUFhLENBQUN2SCxNQUE5RSxFQUFzRjtBQUNsRixjQUFNbUgsT0FBTyxHQUFHLEtBQUtOLGVBQUwsQ0FBcUJ2QixHQUFyQixDQUF5QmlDLGFBQXpCLENBQWhCO0FBRUEsWUFBSSxDQUFDSixPQUFMLEVBQ0k7QUFFSkEsZUFBTyxDQUFDMUUsT0FBUixDQUFnQixDQUFDO0FBQUMxQyxjQUFJLEVBQUV5SCxNQUFQO0FBQWVWLGVBQUssRUFBRVc7QUFBdEIsU0FBRCxLQUFvQztBQUNoRCxjQUFJQSxPQUFPLEdBQUdILE9BQWQsRUFDSUYsT0FBTyxDQUFDTSxHQUFSLENBQVlGLE1BQVo7QUFDUCxTQUhEO0FBSUg7QUFDSixLQVpEO0FBY0EsVUFBTWpFLE1BQU0sR0FBRyxFQUFmO0FBRUE2RCxXQUFPLENBQUMzRSxPQUFSLENBQWdCMUMsSUFBSSxJQUFJO0FBQ3BCd0QsWUFBTSxDQUFDNkMsSUFBUCxDQUFZLElBQUlwRix5RUFBSixDQUEwQmpCLElBQUksQ0FBQzRILFFBQS9CLENBQVo7QUFDSCxLQUZEO0FBSUEsV0FBT3BFLE1BQVA7QUFDSDs7QUFFRHdELE1BQUksQ0FBQ2hILElBQUQsRUFBTztBQUNQLFVBQU02SCxJQUFJLEdBQUd0QyxxREFBRyxDQUFDdkYsSUFBSSxDQUFDSSxJQUFOLEVBQVksTUFBWixDQUFoQjtBQUVBLFdBQU95SCxJQUFJLElBQUlBLElBQUksS0FBSyxJQUF4QjtBQUNIOztBQUVEWCxNQUFJLENBQUNsSCxJQUFELEVBQU87QUFDUCxVQUFNNkgsSUFBSSxHQUFHdEMscURBQUcsQ0FBQ3ZGLElBQUksQ0FBQ0ksSUFBTixFQUFZLE1BQVosQ0FBaEI7QUFFQSxXQUFPeUgsSUFBSSxJQUFJQSxJQUFJLEtBQUssSUFBeEI7QUFDSDs7QUEvRXVCOztBQWtGYmhELG1FQUFmLEU7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7Q0FHQTs7QUFFQSxNQUFNQyxJQUFOLFNBQW1CaEMsb0RBQW5CLENBQTRCO0FBQ3hCL0MsYUFBVyxHQUFHO0FBQ1YsVUFBTSxDQUFDLE1BQUQsQ0FBTjtBQUVBOzs7O0FBR0EsU0FBSzZHLGVBQUwsR0FBdUIsSUFBSUMsR0FBSixFQUF2QixDQU5VLENBTXdCOztBQUNsQzs7OztBQUdBLFNBQUtDLGVBQUwsR0FBdUIsSUFBSUQsR0FBSixFQUF2QixDQVZVLENBVXdCOztBQUVsQzs7QUFDQSxTQUFLRSxLQUFMLEdBQWEsQ0FBYjtBQUNIOztBQUVEM0IscUJBQW1CLEdBQUc7QUFDbEIsV0FBTztBQUNILE9BQUMsS0FBS3ZDLE1BQUwsQ0FBWU8sRUFBYixHQUFrQixLQUFLQSxFQUFMLENBQVFpQyxJQUFSLENBQWEsSUFBYixDQURmO0FBRUgsT0FBQyxLQUFLeEMsTUFBTCxDQUFZWCxHQUFiLEdBQW1CLEtBQUtBLEdBQUwsQ0FBU21ELElBQVQsQ0FBYyxJQUFkO0FBRmhCLEtBQVA7QUFJSDs7QUFFRGpDLElBQUUsQ0FBQ3BELElBQUQsRUFBTztBQUNMLFFBQUksS0FBS2dILElBQUwsQ0FBVWhILElBQVYsQ0FBSixFQUFxQjtBQUNqQixXQUFLNEcsZUFBTCxDQUFxQkssR0FBckIsQ0FBeUJqSCxJQUF6QixFQUErQjtBQUFDQSxZQUFJLEVBQUVBLElBQUksQ0FBQ0MsTUFBWjtBQUFvQjhHLGFBQUssRUFBRSxLQUFLQSxLQUFMO0FBQTNCLE9BQS9CO0FBRUE7QUFDSDs7QUFFRCxRQUFJLEtBQUtHLElBQUwsQ0FBVWxILElBQVYsQ0FBSixFQUFxQjtBQUNqQixZQUFNQyxNQUFNLEdBQUdELElBQUksQ0FBQ0MsTUFBcEI7QUFFQSxVQUFJLENBQUMsS0FBSzZHLGVBQUwsQ0FBcUJLLEdBQXJCLENBQXlCbEgsTUFBekIsQ0FBTCxFQUNJLEtBQUs2RyxlQUFMLENBQXFCRyxHQUFyQixDQUF5QmhILE1BQXpCLEVBQWlDLEVBQWpDO0FBRUosWUFBTW1ILE9BQU8sR0FBRyxLQUFLTixlQUFMLENBQXFCdkIsR0FBckIsQ0FBeUJ0RixNQUF6QixDQUFoQjtBQUVBbUgsYUFBTyxDQUFDZixJQUFSLENBQWE7QUFBQ3JHLFlBQUksRUFBRUEsSUFBUDtBQUFhK0csYUFBSyxFQUFFLEtBQUtBLEtBQUw7QUFBcEIsT0FBYjtBQUNIO0FBQ0o7O0FBRUQ3RSxLQUFHLEdBQUc7QUFDRixVQUFNbUYsT0FBTyxHQUFHLElBQUlDLEdBQUosRUFBaEI7QUFFQSxTQUFLVixlQUFMLENBQXFCbEUsT0FBckIsQ0FBNkIsQ0FBQztBQUFDMUMsVUFBSSxFQUFFQyxNQUFQO0FBQWU4RyxXQUFLLEVBQUVRO0FBQXRCLEtBQUQsS0FBb0M7QUFDN0QsV0FBSyxJQUFJQyxhQUFhLEdBQUd2SCxNQUF6QixFQUFpQ3VILGFBQWpDLEVBQWdEQSxhQUFhLEdBQUdBLGFBQWEsQ0FBQ3ZILE1BQTlFLEVBQXNGO0FBQ2xGLGNBQU1tSCxPQUFPLEdBQUcsS0FBS04sZUFBTCxDQUFxQnZCLEdBQXJCLENBQXlCaUMsYUFBekIsQ0FBaEI7QUFFQSxZQUFJLENBQUNKLE9BQUwsRUFDSTtBQUVKQSxlQUFPLENBQUMxRSxPQUFSLENBQWdCLENBQUM7QUFBQzFDLGNBQUksRUFBRXlILE1BQVA7QUFBZVYsZUFBSyxFQUFFVztBQUF0QixTQUFELEtBQW9DO0FBQ2hELGNBQUlBLE9BQU8sR0FBR0gsT0FBZCxFQUNJRixPQUFPLENBQUNNLEdBQVIsQ0FBWUYsTUFBWjtBQUNQLFNBSEQ7QUFJSDtBQUNKLEtBWkQ7QUFjQSxVQUFNakUsTUFBTSxHQUFHLEVBQWY7QUFFQTZELFdBQU8sQ0FBQzNFLE9BQVIsQ0FBZ0IxQyxJQUFJLElBQUk7QUFDcEJ3RCxZQUFNLENBQUM2QyxJQUFQLENBQVksSUFBSXBGLHlFQUFKLENBQTBCakIsSUFBSSxDQUFDNEgsUUFBL0IsQ0FBWjtBQUNILEtBRkQ7QUFJQSxXQUFPcEUsTUFBUDtBQUNIOztBQUVEd0QsTUFBSSxDQUFDaEgsSUFBRCxFQUFPO0FBQ1AsVUFBTTZILElBQUksR0FBR3RDLHFEQUFHLENBQUN2RixJQUFJLENBQUNJLElBQU4sRUFBWSxNQUFaLENBQWhCO0FBRUEsV0FBT3lILElBQUksSUFBSUEsSUFBSSxLQUFLLElBQXhCO0FBQ0g7O0FBRURYLE1BQUksQ0FBQ2xILElBQUQsRUFBTztBQUNQLFVBQU02SCxJQUFJLEdBQUd0QyxxREFBRyxDQUFDdkYsSUFBSSxDQUFDSSxJQUFOLEVBQVksTUFBWixDQUFoQjtBQUVBLFdBQU95SCxJQUFJLElBQUlBLElBQUksS0FBSyxJQUF4QjtBQUNIOztBQS9FdUI7O0FBa0ZiL0MsbUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUdBLE1BQU1GLFNBQU4sU0FBd0I5QixvREFBeEIsQ0FBaUM7QUFDN0IvQyxhQUFXLEdBQUc7QUFDVixVQUFNLENBQUMsTUFBRCxDQUFOO0FBRUEsU0FBSytILEtBQUwsR0FBYSxLQUFiO0FBQ0g7O0FBRUQxQyxxQkFBbUIsR0FBRztBQUNsQixXQUFPO0FBQ0gsT0FBQyxLQUFLdkMsTUFBTCxDQUFZTyxFQUFiLEdBQWtCLEtBQUtBLEVBQUwsQ0FBUWlDLElBQVIsQ0FBYSxJQUFiO0FBRGYsS0FBUDtBQUdIOztBQUVEakMsSUFBRSxDQUFDcEQsSUFBRCxFQUFPO0FBQ0wsVUFBTTZILElBQUksR0FBR3RDLHFEQUFHLENBQUN2RixJQUFJLENBQUNJLElBQU4sRUFBWSxNQUFaLENBQWhCO0FBRUEsUUFBSXlILElBQUksS0FBSyxJQUFiLEVBQ0k7O0FBRUosUUFBSSxDQUFDLEtBQUtDLEtBQVYsRUFBaUI7QUFDYixXQUFLQSxLQUFMLEdBQWEsSUFBYjtBQUVBO0FBQ0g7O0FBRUQsV0FBTyxJQUFJOUcsaUVBQUosQ0FBa0JoQixJQUFJLENBQUNPLFFBQXZCLENBQVA7QUFDSDs7QUExQjRCOztBQTZCbEJxRSx3RUFBZixFOzs7Ozs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUFBO0FBQUEsTUFBTW1ELFVBQVUsR0FBRyxDQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLElBQWhCLEVBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDLEdBQWhDLEVBQXFDLElBQXJDLEVBQTJDLEtBQTNDLEVBQWtELE1BQWxELEVBQTBELE9BQTFELEVBQW1FLFFBQW5FLENBQW5COztBQUVBLE1BQU1DLElBQU4sQ0FBVztBQUNQOzs7QUFHQWpJLGFBQVcsQ0FBQ3VGLElBQUQsRUFBTztBQUNkLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIO0FBRUQ7Ozs7OztBQUlBcUMsS0FBRyxDQUFDTSxLQUFELEVBQVE7QUFDUCxRQUFJckYsR0FBRyxHQUFHbUYsVUFBVSxDQUFDRyxPQUFYLENBQW1CLEtBQUs1QyxJQUF4QixDQUFWO0FBRUEsUUFBSSxDQUFDMUMsR0FBTCxFQUNJQSxHQUFHLEdBQUdBLEdBQUcsR0FBR3FGLEtBQVo7QUFFSixTQUFLM0MsSUFBTCxHQUFZeUMsVUFBVSxDQUFDbkYsR0FBRCxDQUF0QjtBQUVBLFdBQU8sSUFBUDtBQUNIOztBQUVEdUYsT0FBSyxDQUFDQyxLQUFELEVBQVE7QUFDVCxXQUFPLENBQUMsRUFBRSxLQUFLOUMsSUFBTCxJQUFhOEMsS0FBZixDQUFELElBQTBCLEtBQUs5QyxJQUFMLEtBQWM4QyxLQUEvQztBQUNIOztBQXpCTTs7QUE2QlgsU0FBU0MsS0FBVCxDQUFlQyxDQUFmLEVBQWtCO0FBQ2QsU0FBT0EsQ0FBQyxLQUFLQyxTQUFiO0FBQ0g7O0FBR0QsU0FBU2hELEdBQVQsQ0FBYWlELEdBQWIsRUFBa0IsR0FBR0MsS0FBckIsRUFBNEI7QUFDeEIsTUFBSSxDQUFDRCxHQUFELElBQVEsT0FBT0EsR0FBUCxLQUFlLFFBQTNCLEVBQXFDO0FBQ2pDLFdBQU9ELFNBQVA7QUFFSixNQUFJRyxPQUFPLEdBQUdGLEdBQWQ7O0FBRUEsT0FBSyxJQUFJRyxJQUFULElBQWlCRixLQUFqQixFQUF3QjtBQUNwQkMsV0FBTyxHQUFHQSxPQUFPLENBQUNDLElBQUQsQ0FBakI7QUFFQSxRQUFJLENBQUNOLEtBQUssQ0FBQ00sSUFBRCxDQUFWLEVBQ0ksT0FBT0osU0FBUDtBQUNQOztBQUVELFNBQU9HLE9BQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNuREQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTWhFLGNBQU4sU0FBNkI1QixvREFBN0IsQ0FBc0M7QUFDbEMvQyxhQUFXLEdBQUc7QUFDVixVQUFNLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsYUFBdEIsQ0FBTixFQURVLENBR1Y7O0FBQ0EsU0FBSzZJLFFBQUwsR0FBZ0IsRUFBaEIsQ0FKVSxDQUlVOztBQUNwQixTQUFLQyxnQkFBTCxHQUF3QixJQUFJaEMsR0FBSixFQUF4QixDQUxVLENBS3lCOztBQUNuQyxTQUFLaUMsV0FBTCxHQUFtQixJQUFJakMsR0FBSixFQUFuQixDQU5VLENBTW9CO0FBQ2pDOztBQUVEekIscUJBQW1CLEdBQUc7QUFDbEIsV0FBTztBQUNILE9BQUMsS0FBS3ZDLE1BQUwsQ0FBWU8sRUFBYixHQUFrQixLQUFLQSxFQUFMLENBQVFpQyxJQUFSLENBQWEsSUFBYixDQURmO0FBRUgsT0FBQyxLQUFLeEMsTUFBTCxDQUFZUyxHQUFiLEdBQW1CLEtBQUtBLEdBQUwsQ0FBUytCLElBQVQsQ0FBYyxJQUFkO0FBRmhCLEtBQVA7QUFJSDs7QUFFRGpDLElBQUUsQ0FBQ3BELElBQUQsRUFBTztBQUNMLFFBQUlBLElBQUksQ0FBQ0UsS0FBTCxLQUFlLFNBQW5CLEVBQThCO0FBQzFCLFdBQUswSSxRQUFMLENBQWN2QyxJQUFkLENBQW1CckcsSUFBbkI7QUFFQTtBQUNIOztBQUVELFVBQU0rSSxPQUFPLEdBQUcsS0FBS0MsY0FBTCxFQUFoQjtBQUVBLFFBQUksQ0FBQ0QsT0FBTCxFQUNJLE9BVkMsQ0FZTDtBQUNBO0FBQ0E7O0FBQ0EsUUFBSS9JLElBQUksQ0FBQ0UsS0FBTCxLQUFlLGFBQW5CLEVBQWtDO0FBQzlCLFVBQUksQ0FBQyxLQUFLMkksZ0JBQUwsQ0FBc0IxQixHQUF0QixDQUEwQjRCLE9BQTFCLENBQUwsRUFBeUM7QUFDckMsY0FBTUUsYUFBYSxHQUFHLEtBQUtILFdBQUwsQ0FBaUJ2RCxHQUFqQixDQUFxQndELE9BQXJCLENBQXRCO0FBRUEsYUFBS0YsZ0JBQUwsQ0FBc0I1QixHQUF0QixDQUEwQjhCLE9BQTFCLEVBQW1DL0ksSUFBbkM7QUFFQSxZQUFJaUosYUFBSixFQUNJLE9BQU8sSUFBSW5JLGdGQUFKLENBQWlDbUksYUFBYSxDQUFDMUksUUFBL0MsQ0FBUDtBQUNQOztBQUVEO0FBQ0g7O0FBRUQsUUFBSVAsSUFBSSxDQUFDRSxLQUFMLEtBQWUsUUFBbkIsRUFBNkI7QUFDekIsVUFBSSxDQUFDLEtBQUs0SSxXQUFMLENBQWlCM0IsR0FBakIsQ0FBcUI0QixPQUFyQixDQUFMLEVBQ0ksS0FBS0QsV0FBTCxDQUFpQjdCLEdBQWpCLENBQXFCOEIsT0FBckIsRUFBOEIvSSxJQUE5QjtBQUNQO0FBQ0o7O0FBRURzRCxLQUFHLENBQUN0RCxJQUFELEVBQU87QUFDTixRQUFJQSxJQUFJLENBQUNFLEtBQUwsS0FBZSxTQUFuQixFQUNJO0FBRUosVUFBTTZJLE9BQU8sR0FBRyxLQUFLSCxRQUFMLENBQWNNLEdBQWQsRUFBaEI7QUFFQSxTQUFLSixXQUFMLENBQWlCSyxNQUFqQixDQUF3QkosT0FBeEI7QUFDQSxTQUFLRixnQkFBTCxDQUFzQk0sTUFBdEIsQ0FBNkJKLE9BQTdCO0FBQ0g7O0FBRURDLGdCQUFjLEdBQUc7QUFDYixVQUFNNUMsTUFBTSxHQUFHLEtBQUt3QyxRQUFMLENBQWN4QyxNQUE3QjtBQUVBLFdBQU8sS0FBS3dDLFFBQUwsQ0FBY3hDLE1BQU0sR0FBRyxDQUF2QixDQUFQO0FBQ0g7O0FBakVpQzs7QUFvRXZCMUIsNkVBQWYsRTs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUQsVUFBTixTQUF5QjNCLG9EQUF6QixDQUFrQztBQUM5Qi9DLGFBQVcsR0FBRztBQUNWLFVBQU0sQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixNQUF0QixDQUFOLEVBRFUsQ0FHVjs7QUFDQSxTQUFLNkksUUFBTCxHQUFnQixFQUFoQixDQUpVLENBSVU7O0FBQ3BCLFNBQUtRLFNBQUwsR0FBaUIsSUFBSXZDLEdBQUosRUFBakI7QUFDQSxTQUFLaUMsV0FBTCxHQUFtQixJQUFJakMsR0FBSixFQUFuQjtBQUNIOztBQUVEekIscUJBQW1CLEdBQUc7QUFDbEIsV0FBTztBQUNILE9BQUMsS0FBS3ZDLE1BQUwsQ0FBWU8sRUFBYixHQUFrQixLQUFLQSxFQUFMLENBQVFpQyxJQUFSLENBQWEsSUFBYixDQURmO0FBRUgsT0FBQyxLQUFLeEMsTUFBTCxDQUFZUyxHQUFiLEdBQW1CLEtBQUtBLEdBQUwsQ0FBUytCLElBQVQsQ0FBYyxJQUFkO0FBRmhCLEtBQVA7QUFJSDs7QUFFRGpDLElBQUUsQ0FBQ3BELElBQUQsRUFBTztBQUNMLFFBQUlBLElBQUksQ0FBQ0UsS0FBTCxLQUFlLFNBQW5CLEVBQThCO0FBQzFCLFdBQUswSSxRQUFMLENBQWN2QyxJQUFkLENBQW1CckcsSUFBbkI7QUFFQTtBQUNIOztBQUVELFVBQU0rSSxPQUFPLEdBQUcsS0FBS0MsY0FBTCxFQUFoQjtBQUVBLFFBQUksQ0FBQ0QsT0FBTCxFQUNJOztBQUVKLFFBQUkvSSxJQUFJLENBQUNFLEtBQUwsS0FBZSxNQUFuQixFQUEyQjtBQUN2QixVQUFJLENBQUMsS0FBS2tKLFNBQUwsQ0FBZWpDLEdBQWYsQ0FBbUI0QixPQUFuQixDQUFMLEVBQ0ksS0FBS0ssU0FBTCxDQUFlbkMsR0FBZixDQUFtQjhCLE9BQW5CLEVBQTRCL0ksSUFBNUI7QUFFSjtBQUNIOztBQUVELFFBQUksQ0FBQyxLQUFLOEksV0FBTCxDQUFpQjNCLEdBQWpCLENBQXFCNEIsT0FBckIsQ0FBTCxFQUNJLEtBQUtELFdBQUwsQ0FBaUI3QixHQUFqQixDQUFxQjhCLE9BQXJCLEVBQThCLEVBQTlCO0FBRUosVUFBTUQsV0FBVyxHQUFHLEtBQUtBLFdBQUwsQ0FBaUJ2RCxHQUFqQixDQUFxQndELE9BQXJCLENBQXBCO0FBRUFELGVBQVcsQ0FBQ3pDLElBQVosQ0FBaUJyRyxJQUFqQjtBQUNIOztBQUVEc0QsS0FBRyxDQUFDdEQsSUFBRCxFQUFPO0FBQ04sUUFBSUEsSUFBSSxDQUFDRSxLQUFMLEtBQWUsU0FBbkIsRUFDSTtBQUVKLFVBQU02SSxPQUFPLEdBQUcsS0FBS0gsUUFBTCxDQUFjTSxHQUFkLEVBQWhCO0FBQ0EsVUFBTUcsYUFBYSxHQUFHLEtBQUtELFNBQUwsQ0FBZTdELEdBQWYsQ0FBbUJ3RCxPQUFuQixDQUF0QjtBQUNBLFVBQU1PLE9BQU8sR0FBRyxLQUFLUixXQUFMLENBQWlCdkQsR0FBakIsQ0FBcUJ3RCxPQUFyQixDQUFoQjtBQUVBLFFBQUksQ0FBQ08sT0FBTCxFQUNJO0FBRUosU0FBS0YsU0FBTCxDQUFlRCxNQUFmLENBQXNCSixPQUF0QjtBQUNBLFNBQUtELFdBQUwsQ0FBaUJLLE1BQWpCLENBQXdCSixPQUF4QjtBQUVBLFFBQUksQ0FBQ00sYUFBTCxFQUNJO0FBRUosVUFBTUUsUUFBUSxHQUFHaEUscURBQUcsQ0FBQzhELGFBQWEsQ0FBQ2pKLElBQWYsRUFBcUIsTUFBckIsQ0FBcEI7QUFDQSxVQUFNa0YsSUFBSSxHQUFHLElBQUkwQyw4Q0FBSixDQUFTdUIsUUFBVCxDQUFiO0FBRUFqRSxRQUFJLENBQUNxQyxHQUFMLENBQVMsQ0FBVDtBQUVBLFVBQU1uRSxNQUFNLEdBQUcsRUFBZjs7QUFFQSxTQUFLLElBQUlnRyxNQUFULElBQW1CRixPQUFuQixFQUE0QjtBQUN4QixZQUFNRyxRQUFRLEdBQUdsRSxxREFBRyxDQUFDaUUsTUFBTSxDQUFDcEosSUFBUixFQUFjLE1BQWQsQ0FBcEI7O0FBRUEsVUFBSSxDQUFDa0YsSUFBSSxDQUFDNkMsS0FBTCxDQUFXc0IsUUFBWCxDQUFMLEVBQTJCO0FBQ3ZCLGNBQU03SSxLQUFLLEdBQUcsSUFBSUMsNEVBQUosQ0FBNkIySSxNQUFNLENBQUNqSixRQUFwQyxDQUFkO0FBRUFpRCxjQUFNLENBQUM2QyxJQUFQLENBQVl6RixLQUFaO0FBQ0g7QUFDSjs7QUFFRCxXQUFPNEMsTUFBUDtBQUNIOztBQUVEd0YsZ0JBQWMsR0FBRztBQUNiLFVBQU01QyxNQUFNLEdBQUcsS0FBS3dDLFFBQUwsQ0FBY3hDLE1BQTdCO0FBRUEsV0FBTyxLQUFLd0MsUUFBTCxDQUFjeEMsTUFBTSxHQUFHLENBQXZCLENBQVA7QUFDSDs7QUFyRjZCOztBQXdGbkIzQix5RUFBZixFOzs7Ozs7Ozs7Ozs7QUM3RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxNQUFNaUYsWUFBWSxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQXJCOztBQUVBLE1BQU0vRSxlQUFOLFNBQThCN0Isb0RBQTlCLENBQXVDO0FBQ25DL0MsYUFBVyxHQUFHO0FBQ1YsVUFBTSxDQUFDLFNBQUQsRUFBWSxhQUFaLENBQU47QUFFQSxTQUFLNkksUUFBTCxHQUFnQixFQUFoQixDQUhVLENBR1U7QUFDdkI7O0FBRUR4RCxxQkFBbUIsR0FBRztBQUNsQixXQUFPO0FBQ0gsT0FBQyxLQUFLdkMsTUFBTCxDQUFZTyxFQUFiLEdBQWtCLEtBQUtBLEVBQUwsQ0FBUWlDLElBQVIsQ0FBYSxJQUFiLENBRGY7QUFFSCxPQUFDLEtBQUt4QyxNQUFMLENBQVlTLEdBQWIsR0FBbUIsS0FBS0EsR0FBTCxDQUFTK0IsSUFBVCxDQUFjLElBQWQ7QUFGaEIsS0FBUDtBQUlIOztBQUVEakMsSUFBRSxDQUFDcEQsSUFBRCxFQUFPO0FBQ0wsUUFBSUEsSUFBSSxDQUFDRSxLQUFMLEtBQWUsU0FBbkIsRUFBOEI7QUFDMUIsV0FBSzBJLFFBQUwsQ0FBY3ZDLElBQWQsQ0FBbUJyRyxJQUFuQjtBQUVBO0FBQ0g7O0FBRUQsVUFBTStJLE9BQU8sR0FBRyxLQUFLQyxjQUFMLEVBQWhCO0FBRUEsUUFBSSxDQUFDRCxPQUFMLEVBQ0k7QUFFSixVQUFNekQsSUFBSSxHQUFHQyxxREFBRyxDQUFDdkYsSUFBSSxDQUFDSSxJQUFOLEVBQVksTUFBWixDQUFoQjtBQUNBLFVBQU13QyxHQUFHLEdBQUc4RyxZQUFZLENBQUN4QixPQUFiLENBQXFCNUMsSUFBckIsQ0FBWjtBQUVBLFFBQUkxQyxHQUFHLEtBQUssQ0FBQyxDQUFiLEVBQ0ksT0FBTyxJQUFJN0IsaUZBQUosQ0FBa0NmLElBQUksQ0FBQ08sUUFBdkMsQ0FBUDtBQUVQOztBQUVEK0MsS0FBRyxDQUFDdEQsSUFBRCxFQUFPO0FBQ04sUUFBSUEsSUFBSSxDQUFDRSxLQUFMLEtBQWUsU0FBbkIsRUFDSTtBQUVKLFVBQU02SSxPQUFPLEdBQUcsS0FBS0gsUUFBTCxDQUFjTSxHQUFkLEVBQWhCO0FBQ0g7O0FBRURGLGdCQUFjLEdBQUc7QUFDYixVQUFNNUMsTUFBTSxHQUFHLEtBQUt3QyxRQUFMLENBQWN4QyxNQUE3QjtBQUVBLFdBQU8sS0FBS3dDLFFBQUwsQ0FBY3hDLE1BQU0sR0FBRyxDQUF2QixDQUFQO0FBQ0g7O0FBN0NrQzs7QUFnRHhCekIsOEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDdERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBLE1BQU1ILFNBQU4sU0FBd0IxQixvREFBeEIsQ0FBaUM7QUFDN0IvQyxhQUFXLEdBQUc7QUFDVixVQUFNLENBQUMsU0FBRCxFQUFZLE1BQVosQ0FBTixFQURVLENBR1Y7O0FBQ0EsU0FBSzZJLFFBQUwsR0FBZ0IsRUFBaEIsQ0FKVSxDQUlVOztBQUNwQixTQUFLUSxTQUFMLEdBQWlCLElBQUl2QyxHQUFKLEVBQWpCO0FBQ0g7O0FBRUR6QixxQkFBbUIsR0FBRztBQUNsQixXQUFPO0FBQ0gsT0FBQyxLQUFLdkMsTUFBTCxDQUFZTyxFQUFiLEdBQWtCLEtBQUtBLEVBQUwsQ0FBUWlDLElBQVIsQ0FBYSxJQUFiLENBRGY7QUFFSCxPQUFDLEtBQUt4QyxNQUFMLENBQVlTLEdBQWIsR0FBbUIsS0FBS0EsR0FBTCxDQUFTK0IsSUFBVCxDQUFjLElBQWQ7QUFGaEIsS0FBUDtBQUlIOztBQUVEakMsSUFBRSxDQUFDcEQsSUFBRCxFQUFPO0FBQ0wsUUFBSUEsSUFBSSxDQUFDRSxLQUFMLEtBQWUsU0FBbkIsRUFBOEI7QUFDMUIsV0FBSzBJLFFBQUwsQ0FBY3ZDLElBQWQsQ0FBbUJyRyxJQUFuQjtBQUVBO0FBQ0g7O0FBRUQsVUFBTStJLE9BQU8sR0FBRyxLQUFLQyxjQUFMLEVBQWhCO0FBRUEsUUFBSSxDQUFDRCxPQUFMLEVBQ0k7QUFFSixRQUFJLENBQUMsS0FBS0ssU0FBTCxDQUFlakMsR0FBZixDQUFtQjRCLE9BQW5CLENBQUwsRUFDSSxLQUFLSyxTQUFMLENBQWVuQyxHQUFmLENBQW1COEIsT0FBbkIsRUFBNEIsRUFBNUI7QUFFSixVQUFNSyxTQUFTLEdBQUcsS0FBS0EsU0FBTCxDQUFlN0QsR0FBZixDQUFtQndELE9BQW5CLENBQWxCO0FBRUFLLGFBQVMsQ0FBQy9DLElBQVYsQ0FBZXJHLElBQWY7QUFDSDs7QUFFRHNELEtBQUcsQ0FBQ3RELElBQUQsRUFBTztBQUNOLFFBQUlBLElBQUksQ0FBQ0UsS0FBTCxLQUFlLFNBQW5CLEVBQ0k7QUFFSixVQUFNNkksT0FBTyxHQUFHLEtBQUtILFFBQUwsQ0FBY00sR0FBZCxFQUFoQjtBQUNBLFVBQU1FLFNBQVMsR0FBRyxLQUFLQSxTQUFMLENBQWU3RCxHQUFmLENBQW1Cd0QsT0FBbkIsQ0FBbEI7QUFFQSxTQUFLSyxTQUFMLENBQWVELE1BQWYsQ0FBc0JKLE9BQXRCO0FBRUEsUUFBSSxDQUFDSyxTQUFMLEVBQ0k7QUFFSixVQUFNLENBQUNPLEtBQUQsRUFBUSxHQUFHQyxLQUFYLElBQW9CUixTQUExQjtBQUNBLFVBQU1HLFFBQVEsR0FBR2hFLHFEQUFHLENBQUNvRSxLQUFLLENBQUN2SixJQUFQLEVBQWEsTUFBYixDQUFwQjtBQUNBLFVBQU1rRixJQUFJLEdBQUcsSUFBSTBDLDhDQUFKLENBQVN1QixRQUFULENBQWI7O0FBRUEsU0FBSyxJQUFJTSxJQUFULElBQWlCRCxLQUFqQixFQUF3QjtBQUNwQixZQUFNSCxRQUFRLEdBQUdsRSxxREFBRyxDQUFDc0UsSUFBSSxDQUFDekosSUFBTixFQUFZLE1BQVosQ0FBcEIsQ0FEb0IsQ0FHcEI7O0FBQ0EsVUFBSSxDQUFDa0YsSUFBSSxDQUFDNkMsS0FBTCxDQUFXc0IsUUFBWCxDQUFMLEVBQ0ksT0FBTyxJQUFJaEosZ0ZBQUosQ0FBaUNULElBQUksQ0FBQ08sUUFBdEMsQ0FBUDtBQUNQO0FBQ0o7O0FBRUR5SSxnQkFBYyxHQUFHO0FBQ2IsVUFBTTVDLE1BQU0sR0FBRyxLQUFLd0MsUUFBTCxDQUFjeEMsTUFBN0I7QUFFQSxXQUFPLEtBQUt3QyxRQUFMLENBQWN4QyxNQUFNLEdBQUcsQ0FBdkIsQ0FBUDtBQUNIOztBQWpFNEI7O0FBb0VsQjVCLHdFQUFmLEUiLCJmaWxlIjoibGludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBMaW50ZXIgZnJvbSAnLi9zcmMvbGludGVyLmpzJztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vc3JjL3J1bGVzL2xpc3QuanMnXHJcblxyXG4vLyBUT0RPIGZvciB0ZXN0XHJcbi8vIGltcG9ydCB7dGVzdHMsIGFuc3dlcnN9IGZyb20gXCIuL3Rlc3RjYXNlcy5qc1wiO1xyXG5cclxuY29uc3QgbGludGVyID0gbmV3IExpbnRlcihydWxlcyk7XHJcblxyXG53aW5kb3cubGludCA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbGludGVyLmxpbnQoc3RyKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBUT0RPIGZvciB0ZXN0XHJcbi8qdGVzdHMuZm9yRWFjaCgodGVzdCwgaW5kKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSB3aW5kb3cubGludCh0ZXN0KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygndGVzdDogJyArIChpbmQgKyAxKSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG59KSovXHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVzY2FwZWRDaGFycyA9IHtcbiAgJ2InOiAnXFxiJyxcbiAgJ2YnOiAnXFxmJyxcbiAgJ24nOiAnXFxuJyxcbiAgJ3InOiAnXFxyJyxcbiAgJ3QnOiAnXFx0JyxcbiAgJ1wiJzogJ1wiJyxcbiAgJy8nOiAnLycsXG4gICdcXFxcJzogJ1xcXFwnXG59O1xuXG52YXIgQV9DT0RFID0gJ2EnLmNoYXJDb2RlQXQoKTtcblxuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgXywgb3B0aW9ucykge1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBiaWdpbnQgPSBvcHRpb25zICYmIG9wdGlvbnMuYmlnaW50ICYmIHR5cGVvZiBCaWdJbnQgIT0gJ3VuZGVmaW5lZCc7XG4gIHJldHVybiB7XG4gICAgZGF0YTogX3BhcnNlKCcnLCB0cnVlKSxcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfcGFyc2UocHRyLCB0b3BMZXZlbCkge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgZGF0YTtcbiAgICBtYXAocHRyLCAndmFsdWUnKTtcbiAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgIGNhc2UgJ3QnOiByZWFkKCdydWUnKTsgZGF0YSA9IHRydWU7IGJyZWFrO1xuICAgICAgY2FzZSAnZic6IHJlYWQoJ2Fsc2UnKTsgZGF0YSA9IGZhbHNlOyBicmVhaztcbiAgICAgIGNhc2UgJ24nOiByZWFkKCd1bGwnKTsgZGF0YSA9IG51bGw7IGJyZWFrO1xuICAgICAgY2FzZSAnXCInOiBkYXRhID0gcGFyc2VTdHJpbmcoKTsgYnJlYWs7XG4gICAgICBjYXNlICdbJzogZGF0YSA9IHBhcnNlQXJyYXkocHRyKTsgYnJlYWs7XG4gICAgICBjYXNlICd7JzogZGF0YSA9IHBhcnNlT2JqZWN0KHB0cik7IGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYmFja0NoYXIoKTtcbiAgICAgICAgaWYgKCctMDEyMzQ1Njc4OScuaW5kZXhPZihjaGFyKSA+PSAwKVxuICAgICAgICAgIGRhdGEgPSBwYXJzZU51bWJlcigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICBpZiAodG9wTGV2ZWwgJiYgcG9zIDwgc291cmNlLmxlbmd0aCkgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZXNwYWNlKCkge1xuICAgIGxvb3A6XG4gICAgICB3aGlsZSAocG9zIDwgc291cmNlLmxlbmd0aCkge1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZVtwb3NdKSB7XG4gICAgICAgICAgY2FzZSAnICc6IGNvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiBjb2x1bW4gKz0gNDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxyJzogY29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogY29sdW1uID0gMDsgbGluZSsrOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBicmVhayBsb29wO1xuICAgICAgICB9XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTdHJpbmcoKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuICAgIHZhciBjaGFyO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ1wiJykge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnXFxcXCcpIHtcbiAgICAgICAgY2hhciA9IGdldENoYXIoKTtcbiAgICAgICAgaWYgKGNoYXIgaW4gZXNjYXBlZENoYXJzKVxuICAgICAgICAgIHN0ciArPSBlc2NhcGVkQ2hhcnNbY2hhcl07XG4gICAgICAgIGVsc2UgaWYgKGNoYXIgPT0gJ3UnKVxuICAgICAgICAgIHN0ciArPSBnZXRDaGFyQ29kZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgKz0gY2hhcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTnVtYmVyKCkge1xuICAgIHZhciBudW1TdHIgPSAnJztcbiAgICB2YXIgaW50ZWdlciA9IHRydWU7XG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICctJykgbnVtU3RyICs9IGdldENoYXIoKTtcblxuICAgIG51bVN0ciArPSBzb3VyY2VbcG9zXSA9PSAnMCdcbiAgICAgICAgICAgICAgPyBnZXRDaGFyKClcbiAgICAgICAgICAgICAgOiBnZXREaWdpdHMoKTtcblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnLicpIHtcbiAgICAgIG51bVN0ciArPSBnZXRDaGFyKCkgKyBnZXREaWdpdHMoKTtcbiAgICAgIGludGVnZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJ2UnIHx8IHNvdXJjZVtwb3NdID09ICdFJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKTtcbiAgICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnKycgfHwgc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgbnVtU3RyICs9IGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSArbnVtU3RyO1xuICAgIHJldHVybiBiaWdpbnQgJiYgaW50ZWdlciAmJiAocmVzdWx0ID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgcmVzdWx0IDwgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpXG4gICAgICAgICAgICA/IEJpZ0ludChudW1TdHIpXG4gICAgICAgICAgICA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQXJyYXkocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKGdldENoYXIoKSA9PSAnXScpIHJldHVybiBhcnI7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgaXRlbVB0ciA9IHB0ciArICcvJyArIGk7XG4gICAgICBhcnIucHVzaChfcGFyc2UoaXRlbVB0cikpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXScpIGJyZWFrO1xuICAgICAgaWYgKGNoYXIgIT0gJywnKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlT2JqZWN0KHB0cikge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgb2JqID0ge307XG4gICAgaWYgKGdldENoYXIoKSA9PSAnfScpIHJldHVybiBvYmo7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgbG9jID0gZ2V0TG9jKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICdcIicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgdmFyIGtleSA9IHBhcnNlU3RyaW5nKCk7XG4gICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICBtYXBMb2MocHJvcFB0ciwgJ2tleScsIGxvYyk7XG4gICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaWYgKGdldENoYXIoKSAhPSAnOicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgb2JqW2tleV0gPSBfcGFyc2UocHJvcFB0cik7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICd9JykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZChzdHIpIHtcbiAgICBmb3IgKHZhciBpPTA7IGk8c3RyLmxlbmd0aDsgaSsrKVxuICAgICAgaWYgKGdldENoYXIoKSAhPT0gc3RyW2ldKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXIoKSB7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdmFyIGNoYXIgPSBzb3VyY2VbcG9zXTtcbiAgICBwb3MrKztcbiAgICBjb2x1bW4rKzsgLy8gbmV3IGxpbmU/XG4gICAgcmV0dXJuIGNoYXI7XG4gIH1cblxuICBmdW5jdGlvbiBiYWNrQ2hhcigpIHtcbiAgICBwb3MtLTtcbiAgICBjb2x1bW4tLTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXJDb2RlKCkge1xuICAgIHZhciBjb3VudCA9IDQ7XG4gICAgdmFyIGNvZGUgPSAwO1xuICAgIHdoaWxlIChjb3VudC0tKSB7XG4gICAgICBjb2RlIDw8PSA0O1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChjaGFyID49ICdhJyAmJiBjaGFyIDw9ICdmJylcbiAgICAgICAgY29kZSArPSBjaGFyLmNoYXJDb2RlQXQoKSAtIEFfQ09ERSArIDEwO1xuICAgICAgZWxzZSBpZiAoY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIGNvZGUgKz0gK2NoYXI7XG4gICAgICBlbHNlXG4gICAgICAgIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpZ2l0cygpIHtcbiAgICB2YXIgZGlnaXRzID0gJyc7XG4gICAgd2hpbGUgKHNvdXJjZVtwb3NdID49ICcwJyAmJiBzb3VyY2VbcG9zXSA8PSAnOScpXG4gICAgICBkaWdpdHMgKz0gZ2V0Q2hhcigpO1xuXG4gICAgaWYgKGRpZ2l0cy5sZW5ndGgpIHJldHVybiBkaWdpdHM7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXAocHRyLCBwcm9wKSB7XG4gICAgbWFwTG9jKHB0ciwgcHJvcCwgZ2V0TG9jKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwTG9jKHB0ciwgcHJvcCwgbG9jKSB7XG4gICAgcG9pbnRlcnNbcHRyXSA9IHBvaW50ZXJzW3B0cl0gfHwge307XG4gICAgcG9pbnRlcnNbcHRyXVtwcm9wXSA9IGxvYztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvYygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdW5leHBlY3RlZFRva2VuKCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCB0b2tlbiAnICsgc291cmNlW3Bvc10gKyAnIGluIEpTT04gYXQgcG9zaXRpb24gJyArIHBvcyk7XG4gIH1cblxuICBmdW5jdGlvbiB3YXNVbmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgYmFja0NoYXIoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVW5leHBlY3RlZEVuZCgpIHtcbiAgICBpZiAocG9zID49IHNvdXJjZS5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIEpTT04gaW5wdXQnKTtcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChkYXRhLCBfLCBvcHRpb25zKSB7XG4gIGlmICghdmFsaWRUeXBlKGRhdGEpKSByZXR1cm47XG4gIHZhciB3c0xpbmUgPSAwO1xuICB2YXIgd3NQb3MsIHdzQ29sdW1uO1xuICB2YXIgd2hpdGVzcGFjZSA9IHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5zcGFjZVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnM7XG4gIHN3aXRjaCAodHlwZW9mIHdoaXRlc3BhY2UpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgdmFyIGxlbiA9IHdoaXRlc3BhY2UgPiAxMFxuICAgICAgICAgICAgICAgICAgPyAxMFxuICAgICAgICAgICAgICAgICAgOiB3aGl0ZXNwYWNlIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICAgOiBNYXRoLmZsb29yKHdoaXRlc3BhY2UpO1xuICAgICAgd2hpdGVzcGFjZSA9IGxlbiAmJiByZXBlYXQobGVuLCAnICcpO1xuICAgICAgd3NQb3MgPSBsZW47XG4gICAgICB3c0NvbHVtbiA9IGxlbjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICB3aGl0ZXNwYWNlID0gd2hpdGVzcGFjZS5zbGljZSgwLCAxMCk7XG4gICAgICB3c1BvcyA9IDA7XG4gICAgICB3c0NvbHVtbiA9IDA7XG4gICAgICBmb3IgKHZhciBqPTA7IGo8d2hpdGVzcGFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY2hhciA9IHdoaXRlc3BhY2Vbal07XG4gICAgICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgICAgIGNhc2UgJyAnOiB3c0NvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiB3c0NvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiB3c0NvbHVtbiA9IDA7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcbic6IHdzQ29sdW1uID0gMDsgd3NMaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGluIEpTT04nKTtcbiAgICAgICAgfVxuICAgICAgICB3c1BvcysrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdoaXRlc3BhY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIganNvbiA9ICcnO1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBlczYgPSBvcHRpb25zICYmIG9wdGlvbnMuZXM2ICYmIHR5cGVvZiBNYXAgPT0gJ2Z1bmN0aW9uJztcbiAgX3N0cmluZ2lmeShkYXRhLCAwLCAnJyk7XG4gIHJldHVybiB7XG4gICAganNvbjoganNvbixcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfc3RyaW5naWZ5KF9kYXRhLCBsdmwsIHB0cikge1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHN3aXRjaCAodHlwZW9mIF9kYXRhKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBvdXQoJycgKyBfZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgb3V0KHF1b3RlZChfZGF0YSkpOyBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChfZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIG91dCgnbnVsbCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfZGF0YS50b0pTT04gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG91dChxdW90ZWQoX2RhdGEudG9KU09OKCkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9kYXRhKSkge1xuICAgICAgICAgIHN0cmluZ2lmeUFycmF5KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXM2KSB7XG4gICAgICAgICAgaWYgKF9kYXRhLmNvbnN0cnVjdG9yLkJZVEVTX1BFUl9FTEVNRU5UKVxuICAgICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgICBlbHNlIGlmIChfZGF0YSBpbnN0YW5jZW9mIE1hcClcbiAgICAgICAgICAgIHN0cmluZ2lmeU1hcFNldCgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgU2V0KVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KHRydWUpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5QXJyYXkoKSB7XG4gICAgICBpZiAoX2RhdGEubGVuZ3RoKSB7XG4gICAgICAgIG91dCgnWycpO1xuICAgICAgICB2YXIgaXRlbUx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxfZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICBpbmRlbnQoaXRlbUx2bCk7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB2YWxpZFR5cGUoX2RhdGFbaV0pID8gX2RhdGFbaV0gOiBudWxsO1xuICAgICAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgICAgICBfc3RyaW5naWZ5KGl0ZW0sIGl0ZW1MdmwsIGl0ZW1QdHIpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ10nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgnW10nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlPYmplY3QoKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9kYXRhKTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgICBvdXQoJ3snKTtcbiAgICAgICAgdmFyIHByb3BMdmwgPSBsdmwgKyAxO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlNYXBTZXQoaXNTZXQpIHtcbiAgICAgIGlmIChfZGF0YS5zaXplKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIHZhciBlbnRyaWVzID0gX2RhdGEuZW50cmllcygpO1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgd2hpbGUgKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICB2YXIga2V5ID0gaXRlbVswXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpc1NldCA/IHRydWUgOiBpdGVtWzFdO1xuICAgICAgICAgIGlmICh2YWxpZFR5cGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoIWZpcnN0KSBvdXQoJywnKTtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICAgICAgICBpbmRlbnQocHJvcEx2bCk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleScpO1xuICAgICAgICAgICAgb3V0KHF1b3RlZChrZXkpKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICAgICAgICBvdXQoJzonKTtcbiAgICAgICAgICAgIGlmICh3aGl0ZXNwYWNlKSBvdXQoJyAnKTtcbiAgICAgICAgICAgIF9zdHJpbmdpZnkodmFsdWUsIHByb3BMdmwsIHByb3BQdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvdXQoc3RyKSB7XG4gICAgY29sdW1uICs9IHN0ci5sZW5ndGg7XG4gICAgcG9zICs9IHN0ci5sZW5ndGg7XG4gICAganNvbiArPSBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBpbmRlbnQobHZsKSB7XG4gICAgaWYgKHdoaXRlc3BhY2UpIHtcbiAgICAgIGpzb24gKz0gJ1xcbicgKyByZXBlYXQobHZsLCB3aGl0ZXNwYWNlKTtcbiAgICAgIGxpbmUrKztcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICB3aGlsZSAobHZsLS0pIHtcbiAgICAgICAgaWYgKHdzTGluZSkge1xuICAgICAgICAgIGxpbmUgKz0gd3NMaW5lO1xuICAgICAgICAgIGNvbHVtbiA9IHdzQ29sdW1uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbiArPSB3c0NvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gd3NQb3M7XG4gICAgICB9XG4gICAgICBwb3MgKz0gMTsgLy8gXFxuIGNoYXJhY3RlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwZWF0KG4sIHN0cikge1xuICAgIHJldHVybiBBcnJheShuICsgMSkuam9pbihzdHIpO1xuICB9XG59O1xuXG5cbnZhciBWQUxJRF9UWVBFUyA9IFsnbnVtYmVyJywgJ2JpZ2ludCcsICdib29sZWFuJywgJ3N0cmluZycsICdvYmplY3QnXTtcbmZ1bmN0aW9uIHZhbGlkVHlwZShkYXRhKSB7XG4gIHJldHVybiBWQUxJRF9UWVBFUy5pbmRleE9mKHR5cGVvZiBkYXRhKSA+PSAwO1xufVxuXG5cbnZhciBFU0NfUVVPVEUgPSAvXCJ8XFxcXC9nO1xudmFyIEVTQ19CID0gL1tcXGJdL2c7XG52YXIgRVNDX0YgPSAvXFxmL2c7XG52YXIgRVNDX04gPSAvXFxuL2c7XG52YXIgRVNDX1IgPSAvXFxyL2c7XG52YXIgRVNDX1QgPSAvXFx0L2c7XG5mdW5jdGlvbiBxdW90ZWQoc3RyKSB7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKEVTQ19RVU9URSwgJ1xcXFwkJicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19GLCAnXFxcXGYnKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfQiwgJ1xcXFxiJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX04sICdcXFxcbicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19SLCAnXFxcXHInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfVCwgJ1xcXFx0Jyk7XG4gIHJldHVybiAnXCInICsgc3RyICsgJ1wiJztcbn1cblxuXG52YXIgRVNDXzAgPSAvfi9nO1xudmFyIEVTQ18xID0gL1xcLy9nO1xuZnVuY3Rpb24gZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShFU0NfMCwgJ34wJylcbiAgICAgICAgICAgIC5yZXBsYWNlKEVTQ18xLCAnfjEnKTtcbn1cbiIsImltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcblxyXG5jb25zdCB7QkxPQ0ssIEVMRU0sIENPTlRFTlQsIE1PRFMsIE1JWCwgRUxFTU1PRFN9ID0gUFJPUFM7XHJcbmNvbnN0IGxvY2F0aW9uS2V5ID0gSnNvblNvdXJjZU1hcC5rZXk7XHJcblxyXG5jbGFzcyBCZW1Ob2RlIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcclxuICAgICAqIEBwYXJhbSB7QmVtTm9kZX0gcGFyZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuYmxvY2sgPSBub2RlW0JMT0NLXTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBub2RlW0VMRU1dO1xyXG4gICAgICAgIHRoaXMubW9kcyA9IG5vZGVbTU9EU107XHJcbiAgICAgICAgdGhpcy5taXggPSBub2RlW01JWF07XHJcbiAgICAgICAgdGhpcy5lbGVtTW9kcyA9IG5vZGVbRUxFTU1PRFNdO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbm9kZVtsb2NhdGlvbktleV07XHJcblxyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLmJsb2NrICsgKHRoaXMuZWxlbSA/IChgX18ke3RoaXMuZWxlbX1gKSA6ICcnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmVtTm9kZTsiLCJpbXBvcnQgTGludEVycm9yIGZyb20gJy4vbGludGVycm9yLmpzJztcclxuXHJcbmNsYXNzIFdhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLlRFWFRfU0laRVNfU0hPVUxEX0JFX0VRVUFMJywgZXJyb3I6ICfQotC10LrRgdGC0Ysg0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20L3RiyDQsdGL0YLRjCDQvtC00L3QvtCz0L4g0YDQsNC30LzQtdGA0LAuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRCdXR0b25TaXplIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX0JVVFRPTl9TSVpFJywgZXJyb3I6ICfQoNCw0LfQvNC10YAg0LrQvdC+0L/QutC4INCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L3QsCAxINGI0LDQsyDQsdC+0LvRjNGI0LUg0Y3RgtCw0LvQvtC90L3QvtCz0L4uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fUE9TSVRJT04nLCBlcnJvcjogJ9CR0LvQvtC6IGJ1dHRvbiDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC/0L7RgdC70LUg0LHQu9C+0LrQsCBwbGFjZWhvbGRlci4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9QTEFDRUhPTERFUl9TSVpFJywgZXJyb3I6ICfQlNC+0L/Rg9GB0YLQuNC80YvQtSDRgNCw0LfQvNC10YDRiyDQtNC70Y8g0LHQu9C+0LrQsCBwbGFjZWhvbGRlciDQsiDQsdC70L7QutC1IHdhcm5pbmc6IHMsIG0sIGwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFNldmVyYWxIMSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuU0VWRVJBTF9IMScsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3RjyDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINC10LTQuNC90YHRgtCy0LXQvdC90YvQvC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgyUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDJfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8g0L3QtSDQvNC+0LbQtdGCINC90LDRhdC+0LTQuNGC0YzRgdGPINC/0LXRgNC10LQg0LfQsNCz0L7Qu9C+0LLQutC+0Lwg0L/QtdGA0LLQvtCz0L4g0YPRgNC+0LLQvdGPLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRJbnZhbGlkSDNQb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuSU5WQUxJRF9IM19QT1NJVElPTicsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INGC0YDQtdGC0YzQtdCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INCy0YLQvtGA0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2NrcyBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ0dSSUQuVE9PX01VQ0hfTUFSS0VUSU5HX0JMT0NLUycsIGVycm9yOiAn0JzQsNGA0LrQtdGC0LjQvdCz0L7QstGL0LUg0LHQu9C+0LrQuCDQvdC1INC80L7Qs9GD0YIg0LfQsNC90LjQvNCw0YLRjCDQsdC+0LvRjNGI0LUg0L/QvtC70L7QstC40L3RiyDQvtGCINCy0YHQtdGFINC60L7Qu9C+0L3QvtC6INCx0LvQvtC60LAgZ3JpZCcsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsLFxyXG4gICAgV2FybmluZ0ludmFsaWRCdXR0b25TaXplLFxyXG4gICAgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbixcclxuICAgIFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplLFxyXG4gICAgVGV4dFNldmVyYWxIMSxcclxuICAgIFRleHRJbnZhbGlkSDJQb3NpdGlvbixcclxuICAgIFRleHRJbnZhbGlkSDNQb3NpdGlvbixcclxuICAgIEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzXHJcbn0iLCJcclxuY2xhc3MgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHtjb2RlLCBlcnJvciwgbG9jYXRpb259KSB7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcclxuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW50RXJyb3I7IiwiXHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3INCd0LXRgNCw0LfRgNC10YjQuNC80YvQtSDQvtGI0LjQsdC60LgsINC/0L7RgdC70LUg0LrQvtGC0L7RgNGL0YUg0L/RgNC10LrRgNCw0YnQsNC10Lwg0YDQsNCx0L7RgtGDLiDQmNGFINGH0LjRgdC70L4g0LzQvtC20LXRgiDRgdC+0LrRgNCw0YnQsNGC0YzRgdGPXHJcbiAqINC/0L4g0LzQtdGA0LUg0LTQvtCx0LDQstC70LXQvdC40Y8g0L3QvtCy0YvRhSDQv9GA0LDQstC40Lsg0LIg0LvQuNC90YLQtdGALlxyXG4gKi9cclxuY2xhc3MgSW52YWxpZElucHV0IGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJJbnZhbGlkIGlucHV0XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgSW52YWxpZElucHV0XHJcbn0iLCIvKipcclxuICogQGZpbGVvdmVydmlldyDQkNC00LDQv9GC0LXRgCDRhNGD0L3QutGG0LjQuCBwYXJzZSDQuNC3INCx0LjQsdC70LjQvtGC0LXQutC4IGpzb24tc291cmNlLW1hcFxyXG4gKi9cclxuXHJcbmltcG9ydCB7cGFyc2V9IGZyb20gJ2pzb24tc291cmNlLW1hcCc7XHJcbmltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCB7SW52YWxpZElucHV0fSBmcm9tIFwiLi9lcnJvci9zeXN0ZW0uanNcIjtcclxuXHJcblxyXG5jb25zdCB7Q09OVEVOVH0gPSBQUk9QUztcclxuXHJcbmNvbnN0IHBvc2l0aW9uS2V5ID0gU3ltYm9sKCdQb3NpdGlvbicpO1xyXG5cclxuY2xhc3MgSnNvblNvdXJjZU1hcCB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3RyKSB7XHJcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XHJcbiAgICAgICAgdGhpcy5qc29uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvaW50ZXJzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRKc29uID0gKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlKHRoaXMuc3RyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuanNvbiA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJzID0gcmVzdWx0LnBvaW50ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkSW5wdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWF0Y2godGhpcy5qc29uLCAnJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmpzb247XHJcbiAgICB9O1xyXG5cclxuICAgIG1hdGNoID0gKG5vZGUsIHBhdGgpID0+IHtcclxuICAgICAgICBjb25zdCB7dmFsdWUsIHZhbHVlRW5kfSA9IHRoaXMucG9pbnRlcnNbcGF0aF07XHJcblxyXG4gICAgICAgIC8vICsxINC6IGNvbCwg0YIu0LouINCx0LjQsdC70LjQvtGC0LXQutCwINCy0LXQtNC10YIg0L7RgtGB0YfQtdGCINC+0YIgMC5cclxuICAgICAgICAvLyDQn9GA0Lgg0Y3RgtC+0LwgbGluZSDQsdC10Lcg0LjQt9C80LXQvdC10L3QuNGPLCDRgi7Qui4g0LjRgdGF0L7QtNC90YvQuSBKU09OINC+0LHQtdGA0L3Rg9C70LggKNC/0L7Qu9C+0LbQuNC70Lgg0LLQvdGD0YLRgNGMINGB0LLQvtC50YHRgtCy0LAgXCJjb250ZW50XCIpXHJcbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gW3ZhbHVlLCB2YWx1ZUVuZF0ubWFwKHZhbCA9PiAoe2xpbmU6IHZhbC5saW5lLCBjb2x1bW46IHZhbC5jb2x1bW4gKyAxfSkpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZVtDT05URU5UXTtcclxuXHJcbiAgICAgICAgbm9kZVtwb3NpdGlvbktleV0gPSB7c3RhcnQsIGVuZH07XHJcblxyXG4gICAgICAgIGlmICghY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGQsIGAke3BhdGh9LyR7Q09OVEVOVH0vJHtpbmR9YCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaChjaGlsZHJlbiwgYCR7cGF0aH0vJHtDT05URU5UfWApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGtleSA9IHBvc2l0aW9uS2V5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKc29uU291cmNlTWFwOyIsImltcG9ydCBQUk9QUyBmcm9tIFwiLi9wcm9wbmFtZXMuanNcIjtcclxuaW1wb3J0IEpzb25Tb3VyY2VNYXAgZnJvbSAnLi9qc29uc291cmNlbWFwLmpzJztcclxuaW1wb3J0IEJlbU5vZGUgZnJvbSAnLi9iZW1ub2RlLmpzJztcclxuaW1wb3J0IFJ1bGVNZWRpYXRvciBmcm9tICcuL3J1bGVzL3J1bGVtZWRpYXRvci5qcyc7XHJcbmltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi9ydWxlcy9ydWxlYmFzZS5qc1wiO1xyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcbmNvbnN0IHBoYXNlcyA9IFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXM7XHJcblxyXG5jbGFzcyBMaW50ZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PCFSdWxlQmFzZT59IHJ1bGVDbGFzc2VzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVDbGFzc2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLnJ1bGVDbGFzc2VzID0gcnVsZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWF0b3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGxpbnQoc3RyKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0cmluZ1RyZWUgPSB0aGlzLmF0dGFjaFJvb3Qoc3RyKTtcclxuICAgICAgICBjb25zdCBtYXBwZXIgPSBuZXcgSnNvblNvdXJjZU1hcChzdHJpbmdUcmVlKTtcclxuICAgICAgICBjb25zdCByb290ID0gbWFwcGVyLmdldEpzb24oc3RyaW5nVHJlZSk7XHJcblxyXG4gICAgICAgIHRoaXMubmV4dChyb290LCBudWxsKTtcclxuICAgICAgICB0aGlzLmNhbGxBbGwocGhhc2VzLmVuZCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gZmlsdGVyIGVycm9yc1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGNvbnN0IHJ1bGVzSW5zdGFuY2VzID0gdGhpcy5ydWxlQ2xhc3Nlcy5tYXAockNsYXNzID0+IG5ldyByQ2xhc3MoKSk7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWF0b3IgPSBuZXcgUnVsZU1lZGlhdG9yKHJ1bGVzSW5zdGFuY2VzKTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qINCS0YXQvtC0INC80L7QttC10YIg0LHRi9GC0Ywg0L7QsdGK0LXQutGC0L7QvCDQuNC70Lgg0LzQsNGB0YHQuNCy0L7QvCAo0LTQtdGA0LXQstC+INC40LvQuCDQu9C10YEpLiDQlNC+0LHQsNCy0LjQvCDQstC40YDRgtGD0LDQu9GM0L3Ri9C5INC60L7RgNC10L3RjCwg0YfRgtC+0LHRiyDQstGB0LXQs9C00LAg0LHRi9C70L4g0LTQtdGA0LXQstC+LiAqL1xyXG4gICAgYXR0YWNoUm9vdCA9IHN0ciA9PiBge1wiJHtDT05URU5UfVwiOlxcbiR7c3RyfVxcbn1gO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcclxuICAgICAqIEBwYXJhbSB7QmVtTm9kZX0gcGFyZW50XHJcbiAgICAgKi9cclxuICAgIG5leHQgPSAobm9kZSwgcGFyZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgYmVtTm9kZSA9IG5ldyBCZW1Ob2RlKG5vZGUsIHBhcmVudCk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNvbnRlbnRBc0FycmF5KG5vZGVbQ09OVEVOVF0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLmluLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoY2hpbGQsIGJlbU5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLm91dCwgYmVtTm9kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGwocGhhc2UsIGJlbU5vZGUpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGwocGhhc2UsIGJlbU5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxBbGwocGhhc2UpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGxBbGwocGhhc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVycm9ycyhlcnJvcnMpIHtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFsuLi5lcnJvcnMsIC4uLnRoaXMuZXJyb3JzXTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50QXNBcnJheShlbCkge1xyXG4gICAgICAgIC8vIFRPRE8g0LIg0YLQtdGB0YLQvtCy0YvRhSDRgdGC0YDQsNC90LjRh9C60LDRhSDQv9C+0L/QsNC00LDRjtGC0YHRjyDRgdC70YPRh9Cw0LgsINC60L7Qs9C00LAg0LIg0LzQsNGB0YHQuNCy0LUgY29udGVudCDQu9C10LbQuNGCINC80LDRgdGB0LjQsi4g0KHQtNC10LvQsNC10Lwg0L7QtNC40L0g0L/Qu9C+0YHQutC40Lkg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKVxyXG4gICAgICAgICAgICByZXR1cm4gZWwuZmxhdChJbmZpbml0eSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbCA/IFtlbF0gOiBbXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludGVyOyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIEJMT0NLOiBcImJsb2NrXCIsXHJcbiAgICBFTEVNOiBcImVsZW1cIixcclxuICAgIENPTlRFTlQ6IFwiY29udGVudFwiLFxyXG4gICAgTU9EUzogXCJtb2RzXCIsXHJcbiAgICBNSVg6IFwibWl4XCIsXHJcbiAgICBFTEVNTU9EUzogJ2VsZW1Nb2RzJ1xyXG59OyIsImltcG9ydCBUZXh0U2l6ZXMgZnJvbSAnLi93YXJuaW5nL3RleHRzaXplcy5qcydcclxuaW1wb3J0IEJ1dHRvblNpemUgZnJvbSAnLi93YXJuaW5nL2J1dHRvbnNpemUuanMnXHJcbmltcG9ydCBCdXR0b25Qb3NpdGlvbiBmcm9tICcuL3dhcm5pbmcvYnV0dG9ucG9zaXRpb24uanMnXHJcbmltcG9ydCBQbGFjZWhvbGRlclNpemUgZnJvbSAnLi93YXJuaW5nL3BsYWNlaG9sZGVyc2l6ZS5qcydcclxuaW1wb3J0IFNldmVyYWxIMSBmcm9tICcuL3RleHQvc2V2ZXJhbGgxLmpzJ1xyXG5pbXBvcnQgSDFIMiBmcm9tICcuL3RleHQvaDFoMi5qcydcclxuaW1wb3J0IEgySDMgZnJvbSAnLi90ZXh0L2gyaDMuanMnXHJcbmltcG9ydCBUb29NdWNoIGZyb20gJy4vbWFya2V0aW5nL3Rvb211Y2guanMnXHJcblxyXG5jb25zdCBydWxlcyA9IFtcclxuICAgIFRleHRTaXplcywgQnV0dG9uU2l6ZSwgQnV0dG9uUG9zaXRpb24sIFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFNldmVyYWxIMSwgSDFIMiwgSDJIMyxcclxuICAgIFRvb011Y2hcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJ1bGVzOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge0dyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0XCI7XHJcblxyXG5jb25zdCBtYXJrZXRpbmdCbG9ja3MgPSBbJ2NvbW1lcmNpYWwnLCAnb2ZmZXInXTtcclxuXHJcbmNsYXNzIFRvb011Y2ggZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ2dyaWQnLCAnZ3JpZF9fZnJhY3Rpb24nLCAuLi5tYXJrZXRpbmdCbG9ja3NdKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxNYXJrZXRpbmcgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZCAmJiBub2RlLnNlbGVjdG9yID09PSAnZ3JpZF9fZnJhY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnZ3JpZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5ncmlkRnJhY3Rpb24pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9ICtnZXQodGhpcy5ncmlkRnJhY3Rpb24uZWxlbU1vZHMsICdtLWNvbCcpO1xyXG5cclxuICAgICAgICBpZiAobWFya2V0aW5nQmxvY2tzLmluY2x1ZGVzKG5vZGUuYmxvY2spKVxyXG4gICAgICAgICAgICB0aGlzLnRvdGFsTWFya2V0aW5nICs9IHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5zZWxlY3RvciA9PT0gJ2dyaWRfX2ZyYWN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ2dyaWQnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGZ1bGxTaXplID0gK2dldChub2RlLm1vZHMsICdtLWNvbHVtbnMnKTtcclxuICAgICAgICBsZXQgZXJyb3I7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsTWFya2V0aW5nICogMiA+PSBmdWxsU2l6ZSlcclxuICAgICAgICAgICAgZXJyb3IgPSBuZXcgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3Mobm9kZS5sb2NhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JpZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMudG90YWxNYXJrZXRpbmcgPSAwO1xyXG4gICAgICAgIHRoaXMudG90YWxJbmZvID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb29NdWNoOyIsIlxyXG5jbGFzcyBSdWxlQmFzZSB7XHJcbiAgICAvKipcclxuICAgICAqINCd0LDQsdC+0YAg0YHQtdC70LXQutGC0L7RgNC+0LIgKEJlbU5vZGUuc2VsZWN0b3IpINGD0LfQu9C+0LIsINC90LAg0LrQvtGC0L7RgNGL0YUg0LHRg9C00LXRgiDRgdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC/0YDQsNCy0LjQu9C+LlxyXG4gICAgICog0JXRgdC70Lgg0L3QtSDQt9Cw0LTQsNC9IC0g0LHRg9C00LXRgiDRgdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC90LAg0LrQsNC20LTQvtC8INGD0LfQu9C1IChUT0RPKS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHNlbGVjdG9yc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvcnMgPSBbXSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JzID0gc2VsZWN0b3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdG9ycygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3Q8UnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcywgUnVsZUJhc2UuSGFuZGxlclR5cGU+fVxyXG4gICAgICovXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIC8vIFRPRE8gZXJyb3IgZW1pdHRpbmdcclxuICAgICAgICB0aHJvdyBcIm5vdCBpbXBsZW1lbnRlZFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiogQGVudW17c3RyaW5nfSAqL1xyXG5SdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzID0ge1xyXG4gICAgLyog0JLRhdC+0LTQuNC8INCyINC+0YfQtdGA0LXQtNC90L7QuSDRg9C30LXQuyDQtNC10YDQtdCy0LAqL1xyXG4gICAgaW46ICdpbicsXHJcbiAgICAvKiDQktGL0YXQvtC00LjQvCAqL1xyXG4gICAgb3V0OiAnb3V0JyxcclxuICAgIC8qINCX0LDQutCw0L3Rh9C40LLQsNC10Lwg0L7QsdGF0L7QtCDQtNC10YDQtdCy0LAgKi9cclxuICAgIGVuZDogJ2VuZCdcclxufTtcclxuXHJcbi8qKiBAdHlwZWRlZiB7ZnVuY3Rpb24oQmVtTm9kZSk6ICghTGludEVycm9yfHVuZGVmaW5lZCl9ICovXHJcblJ1bGVCYXNlLkhhbmRsZXJUeXBlO1xyXG5cclxuLyoqIEB0eXBlZGVmIHtPYmplY3Q8UnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcywgT2JqZWN0PHN0cmluZywgUnVsZUJhc2UuSGFuZGxlclR5cGU+Pn0gKi9cclxuUnVsZUJhc2UuSGFuZGxlcnNNYXBUeXBlO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJ1bGVCYXNlOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tICcuL3J1bGViYXNlLmpzJztcclxuXHJcbmNvbnN0IHBoYXNlcyA9IFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXM7XHJcblxyXG5jbGFzcyBSdWxlTWVkaWF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IocnVsZXMpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlcnNNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLmFsd2F5c0NhbGxlZEhhbmRsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5idWlsZE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWFwKCkge1xyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gcnVsZS5nZXRTZWxlY3RvcnMoKTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnNNYXAgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHBoYXNlIGluIGhhbmRsZXJzTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNNYXBbcGhhc2VdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0b3JzLmxlbmd0aCAmJiBwaGFzZSAhPT0gcGhhc2VzLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWx3YXlzQ2FsbGVkSGFuZGxlcnMucHVzaChoYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5KHBoYXNlLCBzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYW5kbGVyc01hcFtrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzTWFwW2tleV0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyc01hcFtrZXldLnB1c2goaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0S2V5KHBoYXNlLCBzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiBwaGFzZSArICckJyArIHNlbGVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7QXJyYXk8IUxpbnRFcnJvcj59XHJcbiAgICAgKi9cclxuICAgIGNhbGwocGhhc2UsIGJlbU5vZGUpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShwaGFzZSwgYmVtTm9kZS5zZWxlY3Rvcik7XHJcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtrZXldIHx8IFtdO1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaGFuZGxlcnMgPSBbLi4uaGFuZGxlcnMsIC4uLnRoaXMuYWx3YXlzQ2FsbGVkSGFuZGxlcnNdO1xyXG5cclxuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyRXJyb3JzID0gaGFuZGxlcihiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgIGVycm9ycyA9IHRoaXMuZ2V0TWVyZ2VkRXJyb3JzKGVycm9ycywgaGFuZGxlckVycm9ycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEFsbChwaGFzZSkge1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5ydWxlcy5mb3JFYWNoKHJ1bGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gcnVsZS5nZXRQaGFzZUhhbmRsZXJzTWFwKClbcGhhc2VdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlckVycm9ycyA9IGhhbmRsZXIobnVsbCk7XHJcblxyXG4gICAgICAgICAgICBlcnJvcnMgPSB0aGlzLmdldE1lcmdlZEVycm9ycyhlcnJvcnMsIGhhbmRsZXJFcnJvcnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1lcmdlZEVycm9ycyhhbGxFcnJvcnMsIG90aGVyRXJyb3JzKSB7XHJcbiAgICAgICAgaWYgKCFvdGhlckVycm9ycylcclxuICAgICAgICAgICAgcmV0dXJuIGFsbEVycm9ycztcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3RoZXJFcnJvcnMpKVxyXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFsbEVycm9ycywgLi4ub3RoZXJFcnJvcnNdO1xyXG5cclxuICAgICAgICByZXR1cm4gWy4uLmFsbEVycm9ycywgb3RoZXJFcnJvcnNdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlTWVkaWF0b3I7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7VGV4dEludmFsaWRIMlBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBIMUgyIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7TWFwPEJlbU5vZGUsIHtub2RlOiBCZW1Ob2RlLCBvcmRlcjogbnVtYmVyfT59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAgPSBuZXcgTWFwKCk7IC8vIHtoMS1ub2RlLCBoMS1wYXJlbnQgd2l0aCBvcmRlcn1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7TWFwPEJlbU5vZGUsIEFycmF5PHtub2RlOiBCZW1Ob2RlLCBvcmRlcjogbnVtYmVyfT4+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaDJQYXJlbnRUb0gyTWFwID0gbmV3IE1hcCgpOyAvLyB7cGFyZW50LCBoMi1jaGlsZHMgd2l0aCBvcmRlcn1cclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXHJcbiAgICAgICAgdGhpcy5vcmRlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5lbmRdOiB0aGlzLmVuZC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0gxKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwLnNldChub2RlLCB7bm9kZTogbm9kZS5wYXJlbnQsIG9yZGVyOiB0aGlzLm9yZGVyKyt9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzSDIobm9kZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaDJQYXJlbnRUb0gyTWFwLmhhcyhwYXJlbnQpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oMlBhcmVudFRvSDJNYXAuc2V0KHBhcmVudCwgW10pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaDJOb2RlcyA9IHRoaXMuaDJQYXJlbnRUb0gyTWFwLmdldChwYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgaDJOb2Rlcy5wdXNoKHtub2RlOiBub2RlLCBvcmRlcjogdGhpcy5vcmRlcisrfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZCgpIHtcclxuICAgICAgICBjb25zdCB3cm9uZ0gyID0gbmV3IFNldCgpO1xyXG5cclxuICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcC5mb3JFYWNoKCh7bm9kZTogcGFyZW50LCBvcmRlcjogaDFPcmRlcn0pID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY3VycmVudFBhcmVudCA9IHBhcmVudDsgY3VycmVudFBhcmVudDsgY3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnQucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoMk5vZGVzID0gdGhpcy5oMlBhcmVudFRvSDJNYXAuZ2V0KGN1cnJlbnRQYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaDJOb2RlcylcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBoMk5vZGVzLmZvckVhY2goKHtub2RlOiBoMk5vZGUsIG9yZGVyOiBoMk9yZGVyfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoMk9yZGVyIDwgaDFPcmRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdIMi5hZGQoaDJOb2RlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIHdyb25nSDIuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2gobmV3IFRleHRJbnZhbGlkSDJQb3NpdGlvbihub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIMShub2RlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdldChub2RlLm1vZHMsICd0eXBlJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlICYmIHR5cGUgPT09ICdoMSc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIMihub2RlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdldChub2RlLm1vZHMsICd0eXBlJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlICYmIHR5cGUgPT09ICdoMic7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEgxSDI7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7VGV4dEludmFsaWRIMlBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG4vLyBUT0RPINGN0YLQviBjb3B5LXBhc3RlINGC0LXRgdGC0LAgaDFoMi5qcyDRgSDQt9Cw0LzQtdC90L7QuSBoMSAtPiBoMiDQsiDQvNC10YLQvtC00LUgaXNIMSDQuCBoMiAtPiBoMyDQsiDQvNC10YLQvtC00LUgaXNIMlxyXG5cclxuY2xhc3MgSDJIMyBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge01hcDxCZW1Ob2RlLCB7bm9kZTogQmVtTm9kZSwgb3JkZXI6IG51bWJlcn0+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwID0gbmV3IE1hcCgpOyAvLyB7aDEtbm9kZSwgaDEtcGFyZW50IHdpdGggb3JkZXJ9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge01hcDxCZW1Ob2RlLCBBcnJheTx7bm9kZTogQmVtTm9kZSwgb3JkZXI6IG51bWJlcn0+Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmgyUGFyZW50VG9IMk1hcCA9IG5ldyBNYXAoKTsgLy8ge3BhcmVudCwgaDItY2hpbGRzIHdpdGggb3JkZXJ9XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xyXG4gICAgICAgIHRoaXMub3JkZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuZW5kXTogdGhpcy5lbmQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIMShub2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcC5zZXQobm9kZSwge25vZGU6IG5vZGUucGFyZW50LCBvcmRlcjogdGhpcy5vcmRlcisrfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0gyKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUucGFyZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmgyUGFyZW50VG9IMk1hcC5oYXMocGFyZW50KSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaDJQYXJlbnRUb0gyTWFwLnNldChwYXJlbnQsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGgyTm9kZXMgPSB0aGlzLmgyUGFyZW50VG9IMk1hcC5nZXQocGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIGgyTm9kZXMucHVzaCh7bm9kZTogbm9kZSwgb3JkZXI6IHRoaXMub3JkZXIrK30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmQoKSB7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdIMiA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAuZm9yRWFjaCgoe25vZGU6IHBhcmVudCwgb3JkZXI6IGgxT3JkZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnQ7IGN1cnJlbnRQYXJlbnQ7IGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaDJOb2RlcyA9IHRoaXMuaDJQYXJlbnRUb0gyTWFwLmdldChjdXJyZW50UGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWgyTm9kZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaDJOb2Rlcy5mb3JFYWNoKCh7bm9kZTogaDJOb2RlLCBvcmRlcjogaDJPcmRlcn0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaDJPcmRlciA8IGgxT3JkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nSDIuYWRkKGgyTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB3cm9uZ0gyLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBUZXh0SW52YWxpZEgyUG9zaXRpb24obm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSDEobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHlwZSAmJiB0eXBlID09PSAnaDInO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSDIobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHlwZSAmJiB0eXBlID09PSAnaDMnO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIMkgzOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRTZXZlcmFsSDF9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcblxyXG5jbGFzcyBTZXZlcmFsSDEgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIHRoaXMuaDF3YXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdldChub2RlLm1vZHMsICd0eXBlJyk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlICE9PSAnaDEnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5oMXdhcykge1xyXG4gICAgICAgICAgICB0aGlzLmgxd2FzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dFNldmVyYWxIMShub2RlLmxvY2F0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V2ZXJhbEgxOyIsIlxyXG5jb25zdCBzaXplc1NjYWxlID0gW1wieHh4c1wiLCBcInh4c1wiLCBcInhzXCIsIFwic1wiLCBcIm1cIiwgXCJsXCIsIFwieGxcIiwgXCJ4eGxcIiwgXCJ4eHhsXCIsIFwieHh4eGxcIiwgXCJ4eHh4eGxcIl07XHJcblxyXG5jbGFzcyBTaXplIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpemVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY291bnRcclxuICAgICAqIEByZXR1cm4ge1NpemV9XHJcbiAgICAgKi9cclxuICAgIGFkZChjb3VudCkge1xyXG4gICAgICAgIGxldCBpbmQgPSBzaXplc1NjYWxlLmluZGV4T2YodGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgaWYgKH5pbmQpXHJcbiAgICAgICAgICAgIGluZCA9IGluZCArIGNvdW50O1xyXG5cclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplc1NjYWxlW2luZF07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKHNpemVCKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuc2l6ZSAmJiBzaXplQikgJiYgdGhpcy5zaXplID09PSBzaXplQjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGlzRGVmKHgpIHtcclxuICAgIHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXQob2JqLCAuLi5wcm9wcykge1xyXG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIC8vINGE0YPQvdC60YbQuNC4INC90LUg0L/RgNC10LTQv9C+0LvQsNCz0LDRjtGC0YHRj1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XHJcblxyXG4gICAgZm9yIChsZXQgcHJvcCBvZiBwcm9wcykge1xyXG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xyXG5cclxuICAgICAgICBpZiAoIWlzRGVmKHByb3ApKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICAgIFNpemUsXHJcbiAgICBnZXRcclxufSIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIEJ1dHRvblBvc2l0aW9uIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ2J1dHRvbicsICdwbGFjZWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlcyA9IG5ldyBNYXAoKTsgLy8g0YXRgNCw0L3QuNC8IDEgYnV0dG9uXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUT0RPINGB0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC90LUg0LHQvtC70LXQtSAxIGJ1dHRvbiDQuCDQvdC1INCx0L7Qu9C10LUgMSBwbGFjZWhvbGVyICjRhdC+0YLRjyDRjdGC0L4g0L3QtSDQvtCx0Y/Qt9Cw0L3QviDQsdGL0YLRjCDRgtCw0LopXHJcbiAgICAgICAgLy8g0JIg0L/RgNC+0YLQuNCy0L3QvtC8INGB0LvRg9GH0LDQtSwg0L3QtdC/0L7QvdGP0YLQvdC+INC60LDQuiDQuNGFINC80LDRgtGH0LjRgtGMINC00YDRg9CzINGBINC00YDRg9Cz0L7QvCAo0L3QsNC/0YDQuNC80LXRgCDQsiDRgtCw0LrQvtC5INGB0LjRgtGD0LDRhtC40Lg6IGJ1dHRvbiwgcGxhY2Vob2xkZXIsIGJ1dHRvbilcclxuICAgICAgICAvLyDQuCwg0YHQvtC+0YLQstC10YLRgdGC0LLQtdC90L3Qviwg0LLRi9C00LDQstCw0YLRjCDQvtGI0LjQsdC60LhcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3BsYWNlaG9sZGVyJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGxhY2Vob2xkZXJOb2Rlcy5oYXMod2FybmluZykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludmFsaWRCdXR0b24gPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkQnV0dG9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbihpbnZhbGlkQnV0dG9uLmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uUG9zaXRpb247IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRCdXR0b25TaXplfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcbmltcG9ydCB7VGV4dEludmFsaWRIMlBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0XCI7XHJcblxyXG5jbGFzcyBCdXR0b25TaXplIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ2J1dHRvbicsICd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50ZXh0Tm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbk5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5zZXQod2FybmluZywgW10pO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b25Ob2RlcyA9IHRoaXMuYnV0dG9uTm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBidXR0b25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuICAgICAgICBjb25zdCBmaXJzdFRleHROb2RlID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKCFidXR0b25zKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKCFmaXJzdFRleHROb2RlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0VGV4dE5vZGUubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBzaXplID0gbmV3IFNpemUoc2l6ZVZhbEEpO1xyXG5cclxuICAgICAgICBzaXplLmFkZCgxKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemVWYWxCID0gZ2V0KGJ1dHRvbi5tb2RzLCAnc2l6ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzaXplLmNoZWNrKHNpemVWYWxCKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgV2FybmluZ0ludmFsaWRCdXR0b25TaXplKGJ1dHRvbi5sb2NhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uU2l6ZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY29uc3QgY29ycmVjdFNpemVzID0gWydzJywgJ20nLCAnbCddO1xyXG5cclxuY2xhc3MgUGxhY2Vob2xkZXJTaXplIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ3BsYWNlaG9sZGVyJ10pO1xyXG5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplID0gZ2V0KG5vZGUubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBpbmQgPSBjb3JyZWN0U2l6ZXMuaW5kZXhPZihzaXplKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaW5kID09PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZShub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGFjZWhvbGRlclNpemU7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbH0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgVGV4dFNpemVzIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0ZXh0Tm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghdGV4dE5vZGVzKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IFtmaXJzdCwgLi4ub3RoZXJdID0gdGV4dE5vZGVzO1xyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0Lm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdGV4dCBvZiBvdGhlcikge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldCh0ZXh0Lm1vZHMsICdzaXplJyk7XHJcblxyXG4gICAgICAgICAgICAvLyDQlNCw0LbQtSDQtdGB0LvQuCDQsiDRgNCw0LzQutCw0YUg0L7QtNC90L7Qs9C+INCx0LvQvtC60LAg0L3QtdGB0LrQvtC70YzQutC+INC+0YjQuNCx0L7Rh9C90YvRhSDRgdC70L7Qsiwg0YLQviDQstC+0LLRgNCw0YnQsNC10Lwg0L7QtNC90YMg0L7RiNC40LHQutGDLlxyXG4gICAgICAgICAgICBpZiAoIXNpemUuY2hlY2soc2l6ZVZhbEIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsKG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRTaXplczsiXSwic291cmNlUm9vdCI6IiJ9