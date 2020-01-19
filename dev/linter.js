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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcmtldGluZy90b29tdWNoLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90ZXh0L2gxaDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDJoMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJCTE9DSyIsIkVMRU0iLCJDT05URU5UIiwiTU9EUyIsIk1JWCIsIkVMRU1NT0RTIiwiUFJPUFMiLCJsb2NhdGlvbktleSIsIkpzb25Tb3VyY2VNYXAiLCJrZXkiLCJCZW1Ob2RlIiwiY29uc3RydWN0b3IiLCJub2RlIiwicGFyZW50IiwiYmxvY2siLCJlbGVtIiwibW9kcyIsIm1peCIsImVsZW1Nb2RzIiwibG9jYXRpb24iLCJzZWxlY3RvciIsIldhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwiLCJMaW50RXJyb3IiLCJjb2RlIiwiZXJyb3IiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uIiwiV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUiLCJUZXh0U2V2ZXJhbEgxIiwiVGV4dEludmFsaWRIMlBvc2l0aW9uIiwiVGV4dEludmFsaWRIM1Bvc2l0aW9uIiwiR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MiLCJJbnZhbGlkSW5wdXQiLCJFcnJvciIsInBvc2l0aW9uS2V5IiwiU3ltYm9sIiwicmVzdWx0IiwicGFyc2UiLCJqc29uIiwiZGF0YSIsInBvaW50ZXJzIiwiZSIsIm1hdGNoIiwicGF0aCIsInZhbHVlIiwidmFsdWVFbmQiLCJzdGFydCIsImVuZCIsIm1hcCIsInZhbCIsImxpbmUiLCJjb2x1bW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJjaGlsZCIsImluZCIsInBoYXNlcyIsIlJ1bGVCYXNlIiwicHJvdG90eXBlIiwicnVsZUNsYXNzZXMiLCJiZW1Ob2RlIiwiY29udGVudEFzQXJyYXkiLCJjYWxsIiwiaW4iLCJuZXh0Iiwib3V0IiwibWVkaWF0b3IiLCJlcnJvcnMiLCJpbml0Iiwic3RyaW5nVHJlZSIsImF0dGFjaFJvb3QiLCJtYXBwZXIiLCJyb290IiwiZ2V0SnNvbiIsImNhbGxBbGwiLCJydWxlc0luc3RhbmNlcyIsInJDbGFzcyIsIlJ1bGVNZWRpYXRvciIsInBoYXNlIiwiYWRkRXJyb3JzIiwiZWwiLCJmbGF0IiwiSW5maW5pdHkiLCJUZXh0U2l6ZXMiLCJCdXR0b25TaXplIiwiQnV0dG9uUG9zaXRpb24iLCJQbGFjZWhvbGRlclNpemUiLCJTZXZlcmFsSDEiLCJIMUgyIiwiSDJIMyIsIlRvb011Y2giLCJtYXJrZXRpbmdCbG9ja3MiLCJncmlkIiwiZ3JpZEZyYWN0aW9uIiwidG90YWxNYXJrZXRpbmciLCJnZXRQaGFzZUhhbmRsZXJzTWFwIiwiYmluZCIsInNpemUiLCJnZXQiLCJpbmNsdWRlcyIsImZ1bGxTaXplIiwidG90YWxJbmZvIiwic2VsZWN0b3JzIiwiZ2V0U2VsZWN0b3JzIiwiSGFuZGxlclR5cGUiLCJIYW5kbGVyc01hcFR5cGUiLCJoYW5kbGVyc01hcCIsImFsd2F5c0NhbGxlZEhhbmRsZXJzIiwiYnVpbGRNYXAiLCJydWxlIiwiaGFuZGxlciIsImxlbmd0aCIsInB1c2giLCJnZXRLZXkiLCJoYW5kbGVycyIsImhhbmRsZXJFcnJvcnMiLCJnZXRNZXJnZWRFcnJvcnMiLCJhbGxFcnJvcnMiLCJvdGhlckVycm9ycyIsImgxVG9IMVBhcmVudE1hcCIsIk1hcCIsImgyUGFyZW50VG9IMk1hcCIsIm9yZGVyIiwiaXNIMSIsInNldCIsImlzSDIiLCJoYXMiLCJoMk5vZGVzIiwid3JvbmdIMiIsIlNldCIsImgxT3JkZXIiLCJjdXJyZW50UGFyZW50IiwiaDJOb2RlIiwiaDJPcmRlciIsImFkZCIsInBvc2l0aW9uIiwidHlwZSIsImgxd2FzIiwic2l6ZXNTY2FsZSIsIlNpemUiLCJjb3VudCIsImluZGV4T2YiLCJjaGVjayIsInNpemVCIiwiaXNEZWYiLCJ4IiwidW5kZWZpbmVkIiwib2JqIiwicHJvcHMiLCJjdXJyZW50IiwicHJvcCIsIndhcm5pbmdzIiwicGxhY2Vob2xkZXJOb2RlcyIsImJ1dHRvbk5vZGVzIiwid2FybmluZyIsImdldExhc3RXYXJuaW5nIiwiaW52YWxpZEJ1dHRvbiIsInBvcCIsImRlbGV0ZSIsInRleHROb2RlcyIsImZpcnN0VGV4dE5vZGUiLCJidXR0b25zIiwic2l6ZVZhbEEiLCJidXR0b24iLCJzaXplVmFsQiIsImNvcnJlY3RTaXplcyIsImZpcnN0Iiwib3RoZXIiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0NBR0E7QUFDQTs7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsc0RBQUosQ0FBV0MsMERBQVgsQ0FBZjs7QUFFQUMsTUFBTSxDQUFDQyxJQUFQLEdBQWMsVUFBU0MsR0FBVCxFQUFjO0FBQ3hCLFNBQU9MLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZQyxHQUFaLENBQVA7QUFDSCxDQUZELEMsQ0FJQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FB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bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTGludGVyIGZyb20gJy4vc3JjL2xpbnRlci5qcyc7XHJcbmltcG9ydCBydWxlcyBmcm9tICcuL3NyYy9ydWxlcy9saXN0LmpzJ1xyXG5cclxuLy8gVE9ETyBmb3IgdGVzdFxyXG4vLyBpbXBvcnQge3Rlc3RzLCBhbnN3ZXJzfSBmcm9tIFwiLi90ZXN0Y2FzZXMuanNcIjtcclxuXHJcbmNvbnN0IGxpbnRlciA9IG5ldyBMaW50ZXIocnVsZXMpO1xyXG5cclxud2luZG93LmxpbnQgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIHJldHVybiBsaW50ZXIubGludChzdHIpO1xyXG59O1xyXG5cclxuLy8gVE9ETyBmb3IgdGVzdFxyXG4vKnRlc3RzLmZvckVhY2goKHRlc3QsIGluZCkgPT4ge1xyXG4gICAgY29uc3QgcmVzID0gd2luZG93LmxpbnQodGVzdCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ3Rlc3Q6ICcgKyAoaW5kICsgMSkpO1xyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxufSkqL1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlc2NhcGVkQ2hhcnMgPSB7XG4gICdiJzogJ1xcYicsXG4gICdmJzogJ1xcZicsXG4gICduJzogJ1xcbicsXG4gICdyJzogJ1xccicsXG4gICd0JzogJ1xcdCcsXG4gICdcIic6ICdcIicsXG4gICcvJzogJy8nLFxuICAnXFxcXCc6ICdcXFxcJ1xufTtcblxudmFyIEFfQ09ERSA9ICdhJy5jaGFyQ29kZUF0KCk7XG5cblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIChzb3VyY2UsIF8sIG9wdGlvbnMpIHtcbiAgdmFyIHBvaW50ZXJzID0ge307XG4gIHZhciBsaW5lID0gMDtcbiAgdmFyIGNvbHVtbiA9IDA7XG4gIHZhciBwb3MgPSAwO1xuICB2YXIgYmlnaW50ID0gb3B0aW9ucyAmJiBvcHRpb25zLmJpZ2ludCAmJiB0eXBlb2YgQmlnSW50ICE9ICd1bmRlZmluZWQnO1xuICByZXR1cm4ge1xuICAgIGRhdGE6IF9wYXJzZSgnJywgdHJ1ZSksXG4gICAgcG9pbnRlcnM6IHBvaW50ZXJzXG4gIH07XG5cbiAgZnVuY3Rpb24gX3BhcnNlKHB0ciwgdG9wTGV2ZWwpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIGRhdGE7XG4gICAgbWFwKHB0ciwgJ3ZhbHVlJyk7XG4gICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICBjYXNlICd0JzogcmVhZCgncnVlJyk7IGRhdGEgPSB0cnVlOyBicmVhaztcbiAgICAgIGNhc2UgJ2YnOiByZWFkKCdhbHNlJyk7IGRhdGEgPSBmYWxzZTsgYnJlYWs7XG4gICAgICBjYXNlICduJzogcmVhZCgndWxsJyk7IGRhdGEgPSBudWxsOyBicmVhaztcbiAgICAgIGNhc2UgJ1wiJzogZGF0YSA9IHBhcnNlU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgY2FzZSAnWyc6IGRhdGEgPSBwYXJzZUFycmF5KHB0cik7IGJyZWFrO1xuICAgICAgY2FzZSAneyc6IGRhdGEgPSBwYXJzZU9iamVjdChwdHIpOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJhY2tDaGFyKCk7XG4gICAgICAgIGlmICgnLTAxMjM0NTY3ODknLmluZGV4T2YoY2hhcikgPj0gMClcbiAgICAgICAgICBkYXRhID0gcGFyc2VOdW1iZXIoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICAgIH1cbiAgICBtYXAocHRyLCAndmFsdWVFbmQnKTtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgaWYgKHRvcExldmVsICYmIHBvcyA8IHNvdXJjZS5sZW5ndGgpIHVuZXhwZWN0ZWRUb2tlbigpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gd2hpdGVzcGFjZSgpIHtcbiAgICBsb29wOlxuICAgICAgd2hpbGUgKHBvcyA8IHNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgc3dpdGNoIChzb3VyY2VbcG9zXSkge1xuICAgICAgICAgIGNhc2UgJyAnOiBjb2x1bW4rKzsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFx0JzogY29sdW1uICs9IDQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xccic6IGNvbHVtbiA9IDA7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcbic6IGNvbHVtbiA9IDA7IGxpbmUrKzsgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogYnJlYWsgbG9vcDtcbiAgICAgICAgfVxuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU3RyaW5nKCkge1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgY2hhcjtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICdcIicpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT0gJ1xcXFwnKSB7XG4gICAgICAgIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICAgIGlmIChjaGFyIGluIGVzY2FwZWRDaGFycylcbiAgICAgICAgICBzdHIgKz0gZXNjYXBlZENoYXJzW2NoYXJdO1xuICAgICAgICBlbHNlIGlmIChjaGFyID09ICd1JylcbiAgICAgICAgICBzdHIgKz0gZ2V0Q2hhckNvZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyICs9IGNoYXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU51bWJlcigpIHtcbiAgICB2YXIgbnVtU3RyID0gJyc7XG4gICAgdmFyIGludGVnZXIgPSB0cnVlO1xuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnLScpIG51bVN0ciArPSBnZXRDaGFyKCk7XG5cbiAgICBudW1TdHIgKz0gc291cmNlW3Bvc10gPT0gJzAnXG4gICAgICAgICAgICAgID8gZ2V0Q2hhcigpXG4gICAgICAgICAgICAgIDogZ2V0RGlnaXRzKCk7XG5cbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJy4nKSB7XG4gICAgICBudW1TdHIgKz0gZ2V0Q2hhcigpICsgZ2V0RGlnaXRzKCk7XG4gICAgICBpbnRlZ2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICdlJyB8fCBzb3VyY2VbcG9zXSA9PSAnRScpIHtcbiAgICAgIG51bVN0ciArPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoc291cmNlW3Bvc10gPT0gJysnIHx8IHNvdXJjZVtwb3NdID09ICctJykgbnVtU3RyICs9IGdldENoYXIoKTtcbiAgICAgIG51bVN0ciArPSBnZXREaWdpdHMoKTtcbiAgICAgIGludGVnZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gK251bVN0cjtcbiAgICByZXR1cm4gYmlnaW50ICYmIGludGVnZXIgJiYgKHJlc3VsdCA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IHJlc3VsdCA8IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSKVxuICAgICAgICAgICAgPyBCaWdJbnQobnVtU3RyKVxuICAgICAgICAgICAgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUFycmF5KHB0cikge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgYXJyID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIGlmIChnZXRDaGFyKCkgPT0gJ10nKSByZXR1cm4gYXJyO1xuICAgIGJhY2tDaGFyKCk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIGl0ZW1QdHIgPSBwdHIgKyAnLycgKyBpO1xuICAgICAgYXJyLnB1c2goX3BhcnNlKGl0ZW1QdHIpKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ10nKSBicmVhaztcbiAgICAgIGlmIChjaGFyICE9ICcsJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU9iamVjdChwdHIpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGlmIChnZXRDaGFyKCkgPT0gJ30nKSByZXR1cm4gb2JqO1xuICAgIGJhY2tDaGFyKCk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIGxvYyA9IGdldExvYygpO1xuICAgICAgaWYgKGdldENoYXIoKSAhPSAnXCInKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHZhciBrZXkgPSBwYXJzZVN0cmluZygpO1xuICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgbWFwTG9jKHByb3BQdHIsICdrZXknLCBsb2MpO1xuICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIGlmIChnZXRDaGFyKCkgIT0gJzonKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIG9ialtrZXldID0gX3BhcnNlKHByb3BQdHIpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnfScpIGJyZWFrO1xuICAgICAgaWYgKGNoYXIgIT0gJywnKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQoc3RyKSB7XG4gICAgZm9yICh2YXIgaT0wOyBpPHN0ci5sZW5ndGg7IGkrKylcbiAgICAgIGlmIChnZXRDaGFyKCkgIT09IHN0cltpXSkgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGFyKCkge1xuICAgIGNoZWNrVW5leHBlY3RlZEVuZCgpO1xuICAgIHZhciBjaGFyID0gc291cmNlW3Bvc107XG4gICAgcG9zKys7XG4gICAgY29sdW1uKys7IC8vIG5ldyBsaW5lP1xuICAgIHJldHVybiBjaGFyO1xuICB9XG5cbiAgZnVuY3Rpb24gYmFja0NoYXIoKSB7XG4gICAgcG9zLS07XG4gICAgY29sdW1uLS07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGFyQ29kZSgpIHtcbiAgICB2YXIgY291bnQgPSA0O1xuICAgIHZhciBjb2RlID0gMDtcbiAgICB3aGlsZSAoY291bnQtLSkge1xuICAgICAgY29kZSA8PD0gNDtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoY2hhciA+PSAnYScgJiYgY2hhciA8PSAnZicpXG4gICAgICAgIGNvZGUgKz0gY2hhci5jaGFyQ29kZUF0KCkgLSBBX0NPREUgKyAxMDtcbiAgICAgIGVsc2UgaWYgKGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBjb2RlICs9ICtjaGFyO1xuICAgICAgZWxzZVxuICAgICAgICB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaWdpdHMoKSB7XG4gICAgdmFyIGRpZ2l0cyA9ICcnO1xuICAgIHdoaWxlIChzb3VyY2VbcG9zXSA+PSAnMCcgJiYgc291cmNlW3Bvc10gPD0gJzknKVxuICAgICAgZGlnaXRzICs9IGdldENoYXIoKTtcblxuICAgIGlmIChkaWdpdHMubGVuZ3RoKSByZXR1cm4gZGlnaXRzO1xuICAgIGNoZWNrVW5leHBlY3RlZEVuZCgpO1xuICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwKHB0ciwgcHJvcCkge1xuICAgIG1hcExvYyhwdHIsIHByb3AsIGdldExvYygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcExvYyhwdHIsIHByb3AsIGxvYykge1xuICAgIHBvaW50ZXJzW3B0cl0gPSBwb2ludGVyc1twdHJdIHx8IHt9O1xuICAgIHBvaW50ZXJzW3B0cl1bcHJvcF0gPSBsb2M7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb2MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbmU6IGxpbmUsXG4gICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgIHBvczogcG9zXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZXhwZWN0ZWRUb2tlbigpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgdG9rZW4gJyArIHNvdXJjZVtwb3NdICsgJyBpbiBKU09OIGF0IHBvc2l0aW9uICcgKyBwb3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gd2FzVW5leHBlY3RlZFRva2VuKCkge1xuICAgIGJhY2tDaGFyKCk7XG4gICAgdW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1VuZXhwZWN0ZWRFbmQoKSB7XG4gICAgaWYgKHBvcyA+PSBzb3VyY2UubGVuZ3RoKVxuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIGVuZCBvZiBKU09OIGlucHV0Jyk7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAoZGF0YSwgXywgb3B0aW9ucykge1xuICBpZiAoIXZhbGlkVHlwZShkYXRhKSkgcmV0dXJuO1xuICB2YXIgd3NMaW5lID0gMDtcbiAgdmFyIHdzUG9zLCB3c0NvbHVtbjtcbiAgdmFyIHdoaXRlc3BhY2UgPSB0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnMuc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25zO1xuICBzd2l0Y2ggKHR5cGVvZiB3aGl0ZXNwYWNlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHZhciBsZW4gPSB3aGl0ZXNwYWNlID4gMTBcbiAgICAgICAgICAgICAgICAgID8gMTBcbiAgICAgICAgICAgICAgICAgIDogd2hpdGVzcGFjZSA8IDBcbiAgICAgICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgICAgIDogTWF0aC5mbG9vcih3aGl0ZXNwYWNlKTtcbiAgICAgIHdoaXRlc3BhY2UgPSBsZW4gJiYgcmVwZWF0KGxlbiwgJyAnKTtcbiAgICAgIHdzUG9zID0gbGVuO1xuICAgICAgd3NDb2x1bW4gPSBsZW47XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgd2hpdGVzcGFjZSA9IHdoaXRlc3BhY2Uuc2xpY2UoMCwgMTApO1xuICAgICAgd3NQb3MgPSAwO1xuICAgICAgd3NDb2x1bW4gPSAwO1xuICAgICAgZm9yICh2YXIgaj0wOyBqPHdoaXRlc3BhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIGNoYXIgPSB3aGl0ZXNwYWNlW2pdO1xuICAgICAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgICAgICBjYXNlICcgJzogd3NDb2x1bW4rKzsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFx0Jzogd3NDb2x1bW4gKz0gNDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxyJzogd3NDb2x1bW4gPSAwOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXG4nOiB3c0NvbHVtbiA9IDA7IHdzTGluZSsrOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ3doaXRlc3BhY2UgY2hhcmFjdGVycyBub3QgYWxsb3dlZCBpbiBKU09OJyk7XG4gICAgICAgIH1cbiAgICAgICAgd3NQb3MrKztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB3aGl0ZXNwYWNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIGpzb24gPSAnJztcbiAgdmFyIHBvaW50ZXJzID0ge307XG4gIHZhciBsaW5lID0gMDtcbiAgdmFyIGNvbHVtbiA9IDA7XG4gIHZhciBwb3MgPSAwO1xuICB2YXIgZXM2ID0gb3B0aW9ucyAmJiBvcHRpb25zLmVzNiAmJiB0eXBlb2YgTWFwID09ICdmdW5jdGlvbic7XG4gIF9zdHJpbmdpZnkoZGF0YSwgMCwgJycpO1xuICByZXR1cm4ge1xuICAgIGpzb246IGpzb24sXG4gICAgcG9pbnRlcnM6IHBvaW50ZXJzXG4gIH07XG5cbiAgZnVuY3Rpb24gX3N0cmluZ2lmeShfZGF0YSwgbHZsLCBwdHIpIHtcbiAgICBtYXAocHRyLCAndmFsdWUnKTtcbiAgICBzd2l0Y2ggKHR5cGVvZiBfZGF0YSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2JpZ2ludCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgb3V0KCcnICsgX2RhdGEpOyBicmVhaztcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIG91dChxdW90ZWQoX2RhdGEpKTsgYnJlYWs7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoX2RhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICBvdXQoJ251bGwnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgX2RhdGEudG9KU09OID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBvdXQocXVvdGVkKF9kYXRhLnRvSlNPTigpKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfZGF0YSkpIHtcbiAgICAgICAgICBzdHJpbmdpZnlBcnJheSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGVzNikge1xuICAgICAgICAgIGlmIChfZGF0YS5jb25zdHJ1Y3Rvci5CWVRFU19QRVJfRUxFTUVOVClcbiAgICAgICAgICAgIHN0cmluZ2lmeUFycmF5KCk7XG4gICAgICAgICAgZWxzZSBpZiAoX2RhdGEgaW5zdGFuY2VvZiBNYXApXG4gICAgICAgICAgICBzdHJpbmdpZnlNYXBTZXQoKTtcbiAgICAgICAgICBlbHNlIGlmIChfZGF0YSBpbnN0YW5jZW9mIFNldClcbiAgICAgICAgICAgIHN0cmluZ2lmeU1hcFNldCh0cnVlKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBzdHJpbmdpZnlPYmplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHJpbmdpZnlPYmplY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXAocHRyLCAndmFsdWVFbmQnKTtcblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeUFycmF5KCkge1xuICAgICAgaWYgKF9kYXRhLmxlbmd0aCkge1xuICAgICAgICBvdXQoJ1snKTtcbiAgICAgICAgdmFyIGl0ZW1MdmwgPSBsdmwgKyAxO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8X2RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSkgb3V0KCcsJyk7XG4gICAgICAgICAgaW5kZW50KGl0ZW1MdmwpO1xuICAgICAgICAgIHZhciBpdGVtID0gdmFsaWRUeXBlKF9kYXRhW2ldKSA/IF9kYXRhW2ldIDogbnVsbDtcbiAgICAgICAgICB2YXIgaXRlbVB0ciA9IHB0ciArICcvJyArIGk7XG4gICAgICAgICAgX3N0cmluZ2lmeShpdGVtLCBpdGVtTHZsLCBpdGVtUHRyKTtcbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCddJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ1tdJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5T2JqZWN0KCkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhfZGF0YSk7XG4gICAgICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgb3V0KCd7Jyk7XG4gICAgICAgIHZhciBwcm9wTHZsID0gbHZsICsgMTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBfZGF0YVtrZXldO1xuICAgICAgICAgIGlmICh2YWxpZFR5cGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoaSkgb3V0KCcsJyk7XG4gICAgICAgICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICAgICAgICBpbmRlbnQocHJvcEx2bCk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleScpO1xuICAgICAgICAgICAgb3V0KHF1b3RlZChrZXkpKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICAgICAgICBvdXQoJzonKTtcbiAgICAgICAgICAgIGlmICh3aGl0ZXNwYWNlKSBvdXQoJyAnKTtcbiAgICAgICAgICAgIF9zdHJpbmdpZnkodmFsdWUsIHByb3BMdmwsIHByb3BQdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCd9Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ3t9Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5TWFwU2V0KGlzU2V0KSB7XG4gICAgICBpZiAoX2RhdGEuc2l6ZSkge1xuICAgICAgICBvdXQoJ3snKTtcbiAgICAgICAgdmFyIHByb3BMdmwgPSBsdmwgKyAxO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICB2YXIgZW50cmllcyA9IF9kYXRhLmVudHJpZXMoKTtcbiAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllcy5uZXh0KCk7XG4gICAgICAgIHdoaWxlICghZW50cnkuZG9uZSkge1xuICAgICAgICAgIHZhciBpdGVtID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgdmFyIGtleSA9IGl0ZW1bMF07XG4gICAgICAgICAgdmFyIHZhbHVlID0gaXNTZXQgPyB0cnVlIDogaXRlbVsxXTtcbiAgICAgICAgICBpZiAodmFsaWRUeXBlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKCFmaXJzdCkgb3V0KCcsJyk7XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgICAgICAgaW5kZW50KHByb3BMdmwpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXknKTtcbiAgICAgICAgICAgIG91dChxdW90ZWQoa2V5KSk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgICAgICAgb3V0KCc6Jyk7XG4gICAgICAgICAgICBpZiAod2hpdGVzcGFjZSkgb3V0KCcgJyk7XG4gICAgICAgICAgICBfc3RyaW5naWZ5KHZhbHVlLCBwcm9wTHZsLCBwcm9wUHRyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCd9Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ3t9Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb3V0KHN0cikge1xuICAgIGNvbHVtbiArPSBzdHIubGVuZ3RoO1xuICAgIHBvcyArPSBzdHIubGVuZ3RoO1xuICAgIGpzb24gKz0gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5kZW50KGx2bCkge1xuICAgIGlmICh3aGl0ZXNwYWNlKSB7XG4gICAgICBqc29uICs9ICdcXG4nICsgcmVwZWF0KGx2bCwgd2hpdGVzcGFjZSk7XG4gICAgICBsaW5lKys7XG4gICAgICBjb2x1bW4gPSAwO1xuICAgICAgd2hpbGUgKGx2bC0tKSB7XG4gICAgICAgIGlmICh3c0xpbmUpIHtcbiAgICAgICAgICBsaW5lICs9IHdzTGluZTtcbiAgICAgICAgICBjb2x1bW4gPSB3c0NvbHVtbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW4gKz0gd3NDb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgcG9zICs9IHdzUG9zO1xuICAgICAgfVxuICAgICAgcG9zICs9IDE7IC8vIFxcbiBjaGFyYWN0ZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXAocHRyLCBwcm9wKSB7XG4gICAgcG9pbnRlcnNbcHRyXSA9IHBvaW50ZXJzW3B0cl0gfHwge307XG4gICAgcG9pbnRlcnNbcHRyXVtwcm9wXSA9IHtcbiAgICAgIGxpbmU6IGxpbmUsXG4gICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgIHBvczogcG9zXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGVhdChuLCBzdHIpIHtcbiAgICByZXR1cm4gQXJyYXkobiArIDEpLmpvaW4oc3RyKTtcbiAgfVxufTtcblxuXG52YXIgVkFMSURfVFlQRVMgPSBbJ251bWJlcicsICdiaWdpbnQnLCAnYm9vbGVhbicsICdzdHJpbmcnLCAnb2JqZWN0J107XG5mdW5jdGlvbiB2YWxpZFR5cGUoZGF0YSkge1xuICByZXR1cm4gVkFMSURfVFlQRVMuaW5kZXhPZih0eXBlb2YgZGF0YSkgPj0gMDtcbn1cblxuXG52YXIgRVNDX1FVT1RFID0gL1wifFxcXFwvZztcbnZhciBFU0NfQiA9IC9bXFxiXS9nO1xudmFyIEVTQ19GID0gL1xcZi9nO1xudmFyIEVTQ19OID0gL1xcbi9nO1xudmFyIEVTQ19SID0gL1xcci9nO1xudmFyIEVTQ19UID0gL1xcdC9nO1xuZnVuY3Rpb24gcXVvdGVkKHN0cikge1xuICBzdHIgPSBzdHIucmVwbGFjZShFU0NfUVVPVEUsICdcXFxcJCYnKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfRiwgJ1xcXFxmJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX0IsICdcXFxcYicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19OLCAnXFxcXG4nKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfUiwgJ1xcXFxyJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX1QsICdcXFxcdCcpO1xuICByZXR1cm4gJ1wiJyArIHN0ciArICdcIic7XG59XG5cblxudmFyIEVTQ18wID0gL34vZztcbnZhciBFU0NfMSA9IC9cXC8vZztcbmZ1bmN0aW9uIGVzY2FwZUpzb25Qb2ludGVyKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoRVNDXzAsICd+MCcpXG4gICAgICAgICAgICAucmVwbGFjZShFU0NfMSwgJ34xJyk7XG59XG4iLCJpbXBvcnQgUFJPUFMgZnJvbSAnLi9wcm9wbmFtZXMuanMnO1xyXG5pbXBvcnQgSnNvblNvdXJjZU1hcCBmcm9tICcuL2pzb25zb3VyY2VtYXAuanMnO1xyXG5cclxuY29uc3Qge0JMT0NLLCBFTEVNLCBDT05URU5ULCBNT0RTLCBNSVgsIEVMRU1NT0RTfSA9IFBST1BTO1xyXG5jb25zdCBsb2NhdGlvbktleSA9IEpzb25Tb3VyY2VNYXAua2V5O1xyXG5cclxuY2xhc3MgQmVtTm9kZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXHJcbiAgICAgKiBAcGFyYW0ge0JlbU5vZGV9IHBhcmVudFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLmJsb2NrID0gbm9kZVtCTE9DS107XHJcbiAgICAgICAgdGhpcy5lbGVtID0gbm9kZVtFTEVNXTtcclxuICAgICAgICB0aGlzLm1vZHMgPSBub2RlW01PRFNdO1xyXG4gICAgICAgIHRoaXMubWl4ID0gbm9kZVtNSVhdO1xyXG4gICAgICAgIHRoaXMuZWxlbU1vZHMgPSBub2RlW0VMRU1NT0RTXTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG5vZGVbbG9jYXRpb25LZXldO1xyXG5cclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy5ibG9jayArICh0aGlzLmVsZW0gPyAoYF9fJHt0aGlzLmVsZW19YCkgOiAnJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlbU5vZGU7IiwiaW1wb3J0IExpbnRFcnJvciBmcm9tICcuL2xpbnRlcnJvci5qcyc7XHJcblxyXG5jbGFzcyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5URVhUX1NJWkVTX1NIT1VMRF9CRV9FUVVBTCcsIGVycm9yOiAn0KLQtdC60YHRgtGLINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC90Ysg0LHRi9GC0Ywg0L7QtNC90L7Qs9C+INGA0LDQt9C80LXRgNCwLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fU0laRScsIGVycm9yOiAn0KDQsNC30LzQtdGAINC60L3QvtC/0LrQuCDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC90LAgMSDRiNCw0LMg0LHQvtC70YzRiNC1INGN0YLQsNC70L7QvdC90L7Qs9C+LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1BPU0lUSU9OJywgZXJyb3I6ICfQkdC70L7QuiBidXR0b24g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9C+0YHQu9C1INCx0LvQvtC60LAgcGxhY2Vob2xkZXIuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfUExBQ0VIT0xERVJfU0laRScsIGVycm9yOiAn0JTQvtC/0YPRgdGC0LjQvNGL0LUg0YDQsNC30LzQtdGA0Ysg0LTQu9GPINCx0LvQvtC60LAgcGxhY2Vob2xkZXIg0LIg0LHQu9C+0LrQtSB3YXJuaW5nOiBzLCBtLCBsLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTZXZlcmFsSDEgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULlNFVkVSQUxfSDEnLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQtdC00LjQvdGB0YLQstC10L3QvdGL0LwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIMlBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gyX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgzUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDNfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDRgtGA0LXRgtGM0LXQs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdHUklELlRPT19NVUNIX01BUktFVElOR19CTE9DS1MnLCBlcnJvcjogJ9Cc0LDRgNC60LXRgtC40L3Qs9C+0LLRi9C1INCx0LvQvtC60Lgg0L3QtSDQvNC+0LPRg9GCINC30LDQvdC40LzQsNGC0Ywg0LHQvtC70YzRiNC1INC/0L7Qu9C+0LLQuNC90Ysg0L7RgiDQstGB0LXRhSDQutC+0LvQvtC90L7QuiDQsdC70L7QutCwIGdyaWQnLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24sXHJcbiAgICBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFRleHRTZXZlcmFsSDEsXHJcbiAgICBUZXh0SW52YWxpZEgyUG9zaXRpb24sXHJcbiAgICBUZXh0SW52YWxpZEgzUG9zaXRpb24sXHJcbiAgICBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc1xyXG59IiwiXHJcbmNsYXNzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7Y29kZSwgZXJyb3IsIGxvY2F0aW9ufSkge1xyXG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludEVycm9yOyIsIlxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyDQndC10YDQsNC30YDQtdGI0LjQvNGL0LUg0L7RiNC40LHQutC4LCDQv9C+0YHQu9C1INC60L7RgtC+0YDRi9GFINC/0YDQtdC60YDQsNGJ0LDQtdC8INGA0LDQsdC+0YLRgy4g0JjRhSDRh9C40YHQu9C+INC80L7QttC10YIg0YHQvtC60YDQsNGJ0LDRgtGM0YHRj1xyXG4gKiDQv9C+INC80LXRgNC1INC00L7QsdCw0LLQu9C10L3QuNGPINC90L7QstGL0YUg0L/RgNCw0LLQuNC7INCyINC70LjQvdGC0LXRgC5cclxuICovXHJcbmNsYXNzIEludmFsaWRJbnB1dCBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiSW52YWxpZCBpbnB1dFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEludmFsaWRJbnB1dFxyXG59IiwiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcg0JDQtNCw0L/RgtC10YAg0YTRg9C90LrRhtC40LggcGFyc2Ug0LjQtyDQsdC40LHQu9C40L7RgtC10LrQuCBqc29uLXNvdXJjZS1tYXBcclxuICovXHJcblxyXG5pbXBvcnQge3BhcnNlfSBmcm9tICdqc29uLXNvdXJjZS1tYXAnO1xyXG5pbXBvcnQgUFJPUFMgZnJvbSAnLi9wcm9wbmFtZXMuanMnO1xyXG5pbXBvcnQge0ludmFsaWRJbnB1dH0gZnJvbSBcIi4vZXJyb3Ivc3lzdGVtLmpzXCI7XHJcblxyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcblxyXG5jb25zdCBwb3NpdGlvbktleSA9IFN5bWJvbCgnUG9zaXRpb24nKTtcclxuXHJcbmNsYXNzIEpzb25Tb3VyY2VNYXAge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN0cikge1xyXG4gICAgICAgIHRoaXMuc3RyID0gc3RyO1xyXG4gICAgICAgIHRoaXMuanNvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wb2ludGVycyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SnNvbiA9ICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZSh0aGlzLnN0cik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmpzb24gPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludGVycyA9IHJlc3VsdC5wb2ludGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZElucHV0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGNoKHRoaXMuanNvbiwgJycpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYXRjaCA9IChub2RlLCBwYXRoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCB2YWx1ZUVuZH0gPSB0aGlzLnBvaW50ZXJzW3BhdGhdO1xyXG5cclxuICAgICAgICAvLyArMSDQuiBjb2wsINGCLtC6LiDQsdC40LHQu9C40L7RgtC10LrQsCDQstC10LTQtdGCINC+0YLRgdGH0LXRgiDQvtGCIDAuXHJcbiAgICAgICAgLy8g0J/RgNC4INGN0YLQvtC8IGxpbmUg0LHQtdC3INC40LfQvNC10L3QtdC90LjRjywg0YIu0LouINC40YHRhdC+0LTQvdGL0LkgSlNPTiDQvtCx0LXRgNC90YPQu9C4ICjQv9C+0LvQvtC20LjQu9C4INCy0L3Rg9GC0YDRjCDRgdCy0L7QudGB0YLQstCwIFwiY29udGVudFwiKVxyXG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IFt2YWx1ZSwgdmFsdWVFbmRdLm1hcCh2YWwgPT4gKHtsaW5lOiB2YWwubGluZSwgY29sdW1uOiB2YWwuY29sdW1uICsgMX0pKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGVbQ09OVEVOVF07XHJcblxyXG4gICAgICAgIG5vZGVbcG9zaXRpb25LZXldID0ge3N0YXJ0LCBlbmR9O1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkcmVuKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKGNoaWxkLCBgJHtwYXRofS8ke0NPTlRFTlR9LyR7aW5kfWApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGRyZW4sIGAke3BhdGh9LyR7Q09OVEVOVH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBrZXkgPSBwb3NpdGlvbktleTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSnNvblNvdXJjZU1hcDsiLCJpbXBvcnQgUFJPUFMgZnJvbSBcIi4vcHJvcG5hbWVzLmpzXCI7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcbmltcG9ydCBCZW1Ob2RlIGZyb20gJy4vYmVtbm9kZS5qcyc7XHJcbmltcG9ydCBSdWxlTWVkaWF0b3IgZnJvbSAnLi9ydWxlcy9ydWxlbWVkaWF0b3IuanMnO1xyXG5pbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4vcnVsZXMvcnVsZWJhc2UuanNcIjtcclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgTGludGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTwhUnVsZUJhc2U+fSBydWxlQ2xhc3Nlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihydWxlQ2xhc3NlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlQ2xhc3NlcyA9IHJ1bGVDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBsaW50KHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdHJpbmdUcmVlID0gdGhpcy5hdHRhY2hSb290KHN0cik7XHJcbiAgICAgICAgY29uc3QgbWFwcGVyID0gbmV3IEpzb25Tb3VyY2VNYXAoc3RyaW5nVHJlZSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG1hcHBlci5nZXRKc29uKHN0cmluZ1RyZWUpO1xyXG5cclxuICAgICAgICB0aGlzLm5leHQocm9vdCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsKHBoYXNlcy5lbmQpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGZpbHRlciBlcnJvcnNcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCBydWxlc0luc3RhbmNlcyA9IHRoaXMucnVsZUNsYXNzZXMubWFwKHJDbGFzcyA9PiBuZXcgckNsYXNzKCkpO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbmV3IFJ1bGVNZWRpYXRvcihydWxlc0luc3RhbmNlcyk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDQktGF0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC+0LHRitC10LrRgtC+0Lwg0LjQu9C4INC80LDRgdGB0LjQstC+0LwgKNC00LXRgNC10LLQviDQuNC70Lgg0LvQtdGBKS4g0JTQvtCx0LDQstC40Lwg0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQutC+0YDQtdC90YwsINGH0YLQvtCx0Ysg0LLRgdC10LPQtNCwINCx0YvQu9C+INC00LXRgNC10LLQvi4gKi9cclxuICAgIGF0dGFjaFJvb3QgPSBzdHIgPT4gYHtcIiR7Q09OVEVOVH1cIjpcXG4ke3N0cn1cXG59YDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXHJcbiAgICAgKiBAcGFyYW0ge0JlbU5vZGV9IHBhcmVudFxyXG4gICAgICovXHJcbiAgICBuZXh0ID0gKG5vZGUsIHBhcmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJlbU5vZGUgPSBuZXcgQmVtTm9kZShub2RlLCBwYXJlbnQpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jb250ZW50QXNBcnJheShub2RlW0NPTlRFTlRdKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsKHBoYXNlcy5pbiwgYmVtTm9kZSk7XHJcblxyXG4gICAgICAgIGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KGNoaWxkLCBiZW1Ob2RlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsKHBoYXNlcy5vdXQsIGJlbU5vZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5tZWRpYXRvci5jYWxsKHBoYXNlLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5tZWRpYXRvci5jYWxsQWxsKHBoYXNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcnJvcnMoZXJyb3JzKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbLi4uZXJyb3JzLCAuLi50aGlzLmVycm9yc107XHJcbiAgICB9XHJcblxyXG4gICAgY29udGVudEFzQXJyYXkoZWwpIHtcclxuICAgICAgICAvLyBUT0RPINCyINGC0LXRgdGC0L7QstGL0YUg0YHRgtGA0LDQvdC40YfQutCw0YUg0L/QvtC/0LDQtNCw0Y7RgtGB0Y8g0YHQu9GD0YfQsNC4LCDQutC+0LPQtNCwINCyINC80LDRgdGB0LjQstC1IGNvbnRlbnQg0LvQtdC20LjRgiDQvNCw0YHRgdC40LIuINCh0LTQtdC70LDQtdC8INC+0LTQuNC9INC/0LvQvtGB0LrQuNC5INC80LDRgdGB0LjQslxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIGVsLmZsYXQoSW5maW5pdHkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWwgPyBbZWxdIDogW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbnRlcjsiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBCTE9DSzogXCJibG9ja1wiLFxyXG4gICAgRUxFTTogXCJlbGVtXCIsXHJcbiAgICBDT05URU5UOiBcImNvbnRlbnRcIixcclxuICAgIE1PRFM6IFwibW9kc1wiLFxyXG4gICAgTUlYOiBcIm1peFwiLFxyXG4gICAgRUxFTU1PRFM6ICdlbGVtTW9kcydcclxufTsiLCJpbXBvcnQgVGV4dFNpemVzIGZyb20gJy4vd2FybmluZy90ZXh0c2l6ZXMuanMnXHJcbmltcG9ydCBCdXR0b25TaXplIGZyb20gJy4vd2FybmluZy9idXR0b25zaXplLmpzJ1xyXG5pbXBvcnQgQnV0dG9uUG9zaXRpb24gZnJvbSAnLi93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzJ1xyXG5pbXBvcnQgUGxhY2Vob2xkZXJTaXplIGZyb20gJy4vd2FybmluZy9wbGFjZWhvbGRlcnNpemUuanMnXHJcbmltcG9ydCBTZXZlcmFsSDEgZnJvbSAnLi90ZXh0L3NldmVyYWxoMS5qcydcclxuaW1wb3J0IEgxSDIgZnJvbSAnLi90ZXh0L2gxaDIuanMnXHJcbmltcG9ydCBIMkgzIGZyb20gJy4vdGV4dC9oMmgzLmpzJ1xyXG5pbXBvcnQgVG9vTXVjaCBmcm9tICcuL21hcmtldGluZy90b29tdWNoLmpzJ1xyXG5cclxuY29uc3QgcnVsZXMgPSBbXHJcbiAgICBUZXh0U2l6ZXMsIEJ1dHRvblNpemUsIEJ1dHRvblBvc2l0aW9uLCBQbGFjZWhvbGRlclNpemUsXHJcbiAgICBTZXZlcmFsSDEsIEgxSDIsIEgySDMsXHJcbiAgICBUb29NdWNoXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlczsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc30gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdFwiO1xyXG5cclxuY29uc3QgbWFya2V0aW5nQmxvY2tzID0gWydjb21tZXJjaWFsJywgJ29mZmVyJ107XHJcblxyXG5jbGFzcyBUb29NdWNoIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWydncmlkJywgJ2dyaWRfX2ZyYWN0aW9uJywgLi4ubWFya2V0aW5nQmxvY2tzXSk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JpZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGFsTWFya2V0aW5nID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmdyaWQgJiYgbm9kZS5zZWxlY3RvciA9PT0gJ2dyaWRfX2ZyYWN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ2dyaWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZ3JpZEZyYWN0aW9uKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSArZ2V0KHRoaXMuZ3JpZEZyYWN0aW9uLmVsZW1Nb2RzLCAnbS1jb2wnKTtcclxuXHJcbiAgICAgICAgaWYgKG1hcmtldGluZ0Jsb2Nrcy5pbmNsdWRlcyhub2RlLmJsb2NrKSlcclxuICAgICAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyArPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuc2VsZWN0b3IgPT09ICdncmlkX19mcmFjdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICdncmlkJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBmdWxsU2l6ZSA9ICtnZXQobm9kZS5tb2RzLCAnbS1jb2x1bW5zJyk7XHJcbiAgICAgICAgbGV0IGVycm9yO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b3RhbE1hcmtldGluZyAqIDIgPj0gZnVsbFNpemUpXHJcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzKG5vZGUubG9jYXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmdyaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRvdGFsTWFya2V0aW5nID0gMDtcclxuICAgICAgICB0aGlzLnRvdGFsSW5mbyA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9vTXVjaDsiLCJcclxuY2xhc3MgUnVsZUJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQndCw0LHQvtGAINGB0LXQu9C10LrRgtC+0YDQvtCyIChCZW1Ob2RlLnNlbGVjdG9yKSDRg9C30LvQvtCyLCDQvdCwINC60L7RgtC+0YDRi9GFINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQv9GA0LDQstC40LvQvi5cclxuICAgICAqINCV0YHQu9C4INC90LUg0LfQsNC00LDQvSAtINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvdCwINC60LDQttC00L7QvCDRg9C30LvQtSAoVE9ETykuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZWxlY3RvcnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3JzID0gW10pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqIEBlbnVte3N0cmluZ30gKi9cclxuUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcyA9IHtcclxuICAgIC8qINCS0YXQvtC00LjQvCDQsiDQvtGH0LXRgNC10LTQvdC+0Lkg0YPQt9C10Lsg0LTQtdGA0LXQstCwKi9cclxuICAgIGluOiAnaW4nLFxyXG4gICAgLyog0JLRi9GF0L7QtNC40LwgKi9cclxuICAgIG91dDogJ291dCcsXHJcbiAgICAvKiDQl9Cw0LrQsNC90YfQuNCy0LDQtdC8INC+0LHRhdC+0LQg0LTQtdGA0LXQstCwICovXHJcbiAgICBlbmQ6ICdlbmQnXHJcbn07XHJcblxyXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKEJlbU5vZGUpOiAoIUxpbnRFcnJvcnx1bmRlZmluZWQpfSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyVHlwZTtcclxuXHJcbi8qKiBAdHlwZWRlZiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIE9iamVjdDxzdHJpbmcsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPj59ICovXHJcblJ1bGVCYXNlLkhhbmRsZXJzTWFwVHlwZTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlQmFzZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSAnLi9ydWxlYmFzZS5qcyc7XHJcblxyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgUnVsZU1lZGlhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5hbHdheXNDYWxsZWRIYW5kbGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVpbGRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZE1hcCgpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHJ1bGUuZ2V0U2VsZWN0b3JzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJzTWFwID0gcnVsZS5nZXRQaGFzZUhhbmRsZXJzTWFwKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBwaGFzZSBpbiBoYW5kbGVyc01hcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzTWFwW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdG9ycy5sZW5ndGggJiYgcGhhc2UgIT09IHBoYXNlcy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsd2F5c0NhbGxlZEhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShwaGFzZSwgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFuZGxlcnNNYXBba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyc01hcFtrZXldID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XS5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEtleShwaGFzZSwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gcGhhc2UgKyAnJCcgKyBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0FycmF5PCFMaW50RXJyb3I+fVxyXG4gICAgICovXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIGJlbU5vZGUuc2VsZWN0b3IpO1xyXG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBba2V5XSB8fCBbXTtcclxuICAgICAgICBsZXQgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGhhbmRsZXJzID0gWy4uLmhhbmRsZXJzLCAuLi50aGlzLmFsd2F5c0NhbGxlZEhhbmRsZXJzXTtcclxuXHJcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlckVycm9ycyA9IGhhbmRsZXIoYmVtTm9kZSk7XHJcblxyXG4gICAgICAgICAgICBlcnJvcnMgPSB0aGlzLmdldE1lcmdlZEVycm9ycyhlcnJvcnMsIGhhbmRsZXJFcnJvcnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxBbGwocGhhc2UpIHtcclxuICAgICAgICBsZXQgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IHJ1bGUuZ2V0UGhhc2VIYW5kbGVyc01hcCgpW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaGFuZGxlcilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJFcnJvcnMgPSBoYW5kbGVyKG51bGwpO1xyXG5cclxuICAgICAgICAgICAgZXJyb3JzID0gdGhpcy5nZXRNZXJnZWRFcnJvcnMoZXJyb3JzLCBoYW5kbGVyRXJyb3JzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRNZXJnZWRFcnJvcnMoYWxsRXJyb3JzLCBvdGhlckVycm9ycykge1xyXG4gICAgICAgIGlmICghb3RoZXJFcnJvcnMpXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxFcnJvcnM7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG90aGVyRXJyb3JzKSlcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hbGxFcnJvcnMsIC4uLm90aGVyRXJyb3JzXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFsuLi5hbGxFcnJvcnMsIG90aGVyRXJyb3JzXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZU1lZGlhdG9yOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgSDFIMiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge01hcDxCZW1Ob2RlLCB7bm9kZTogQmVtTm9kZSwgb3JkZXI6IG51bWJlcn0+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwID0gbmV3IE1hcCgpOyAvLyB7aDEtbm9kZSwgaDEtcGFyZW50IHdpdGggb3JkZXJ9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge01hcDxCZW1Ob2RlLCBBcnJheTx7bm9kZTogQmVtTm9kZSwgb3JkZXI6IG51bWJlcn0+Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmgyUGFyZW50VG9IMk1hcCA9IG5ldyBNYXAoKTsgLy8ge3BhcmVudCwgaDItY2hpbGRzIHdpdGggb3JkZXJ9XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xyXG4gICAgICAgIHRoaXMub3JkZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuZW5kXTogdGhpcy5lbmQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIMShub2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcC5zZXQobm9kZSwge25vZGU6IG5vZGUucGFyZW50LCBvcmRlcjogdGhpcy5vcmRlcisrfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0gyKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUucGFyZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmgyUGFyZW50VG9IMk1hcC5oYXMocGFyZW50KSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaDJQYXJlbnRUb0gyTWFwLnNldChwYXJlbnQsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGgyTm9kZXMgPSB0aGlzLmgyUGFyZW50VG9IMk1hcC5nZXQocGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIGgyTm9kZXMucHVzaCh7bm9kZTogbm9kZSwgb3JkZXI6IHRoaXMub3JkZXIrK30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmQoKSB7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdIMiA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAuZm9yRWFjaCgoe25vZGU6IHBhcmVudCwgb3JkZXI6IGgxT3JkZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnQ7IGN1cnJlbnRQYXJlbnQ7IGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaDJOb2RlcyA9IHRoaXMuaDJQYXJlbnRUb0gyTWFwLmdldChjdXJyZW50UGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWgyTm9kZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaDJOb2Rlcy5mb3JFYWNoKCh7bm9kZTogaDJOb2RlLCBvcmRlcjogaDJPcmRlcn0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaDJPcmRlciA8IGgxT3JkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nSDIuYWRkKGgyTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB3cm9uZ0gyLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBUZXh0SW52YWxpZEgyUG9zaXRpb24obm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSDEobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHlwZSAmJiB0eXBlID09PSAnaDEnO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSDIobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHlwZSAmJiB0eXBlID09PSAnaDInO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIMUgyOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuLy8gVE9ETyDRjdGC0L4gY29weS1wYXN0ZSDRgtC10YHRgtCwIGgxaDIuanMg0YEg0LfQsNC80LXQvdC+0LkgaDEgLT4gaDIg0LIg0LzQtdGC0L7QtNC1IGlzSDEg0LggaDIgLT4gaDMg0LIg0LzQtdGC0L7QtNC1IGlzSDJcclxuXHJcbmNsYXNzIEgySDMgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXA8QmVtTm9kZSwge25vZGU6IEJlbU5vZGUsIG9yZGVyOiBudW1iZXJ9Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmgxVG9IMVBhcmVudE1hcCA9IG5ldyBNYXAoKTsgLy8ge2gxLW5vZGUsIGgxLXBhcmVudCB3aXRoIG9yZGVyfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXA8QmVtTm9kZSwgQXJyYXk8e25vZGU6IEJlbU5vZGUsIG9yZGVyOiBudW1iZXJ9Pj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5oMlBhcmVudFRvSDJNYXAgPSBuZXcgTWFwKCk7IC8vIHtwYXJlbnQsIGgyLWNoaWxkcyB3aXRoIG9yZGVyfVxyXG5cclxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cclxuICAgICAgICB0aGlzLm9yZGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmVuZF06IHRoaXMuZW5kLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSDEobm9kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5oMVRvSDFQYXJlbnRNYXAuc2V0KG5vZGUsIHtub2RlOiBub2RlLnBhcmVudCwgb3JkZXI6IHRoaXMub3JkZXIrK30pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNIMihub2RlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBub2RlLnBhcmVudDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oMlBhcmVudFRvSDJNYXAuaGFzKHBhcmVudCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmgyUGFyZW50VG9IMk1hcC5zZXQocGFyZW50LCBbXSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoMk5vZGVzID0gdGhpcy5oMlBhcmVudFRvSDJNYXAuZ2V0KHBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICBoMk5vZGVzLnB1c2goe25vZGU6IG5vZGUsIG9yZGVyOiB0aGlzLm9yZGVyKyt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5kKCkge1xyXG4gICAgICAgIGNvbnN0IHdyb25nSDIgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaDFUb0gxUGFyZW50TWFwLmZvckVhY2goKHtub2RlOiBwYXJlbnQsIG9yZGVyOiBoMU9yZGVyfSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50OyBjdXJyZW50UGFyZW50OyBjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGgyTm9kZXMgPSB0aGlzLmgyUGFyZW50VG9IMk1hcC5nZXQoY3VycmVudFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFoMk5vZGVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGgyTm9kZXMuZm9yRWFjaCgoe25vZGU6IGgyTm9kZSwgb3JkZXI6IGgyT3JkZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGgyT3JkZXIgPCBoMU9yZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0gyLmFkZChoMk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgd3JvbmdIMi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChuZXcgVGV4dEludmFsaWRIMlBvc2l0aW9uKG5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpc0gxKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgJiYgdHlwZSA9PT0gJ2gyJztcclxuICAgIH1cclxuXHJcbiAgICBpc0gyKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgJiYgdHlwZSA9PT0gJ2gzJztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSDJIMzsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0U2V2ZXJhbEgxfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5cclxuY2xhc3MgU2V2ZXJhbEgxIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICB0aGlzLmgxd2FzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSAhPT0gJ2gxJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaDF3YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5oMXdhcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHRTZXZlcmFsSDEobm9kZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldmVyYWxIMTsiLCJcclxuY29uc3Qgc2l6ZXNTY2FsZSA9IFtcInh4eHNcIiwgXCJ4eHNcIiwgXCJ4c1wiLCBcInNcIiwgXCJtXCIsIFwibFwiLCBcInhsXCIsIFwieHhsXCIsIFwieHh4bFwiLCBcInh4eHhsXCIsIFwieHh4eHhsXCJdO1xyXG5cclxuY2xhc3MgU2l6ZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICovXHJcbiAgICBhZGQoY291bnQpIHtcclxuICAgICAgICBsZXQgaW5kID0gc2l6ZXNTY2FsZS5pbmRleE9mKHRoaXMuc2l6ZSk7XHJcblxyXG4gICAgICAgIGlmICh+aW5kKVxyXG4gICAgICAgICAgICBpbmQgPSBpbmQgKyBjb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZXNTY2FsZVtpbmRdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjaGVjayhzaXplQikge1xyXG4gICAgICAgIHJldHVybiAhISh0aGlzLnNpemUgJiYgc2l6ZUIpICYmIHRoaXMuc2l6ZSA9PT0gc2l6ZUI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc0RlZih4KSB7XHJcbiAgICByZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KG9iaiwgLi4ucHJvcHMpIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSAvLyDRhNGD0L3QutGG0LjQuCDQvdC1INC/0YDQtdC00L/QvtC70LDQs9Cw0Y7RgtGB0Y9cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGxldCBjdXJyZW50ID0gb2JqO1xyXG5cclxuICAgIGZvciAobGV0IHByb3Agb2YgcHJvcHMpIHtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0RlZihwcm9wKSlcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBTaXplLFxyXG4gICAgZ2V0XHJcbn0iLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBCdXR0b25Qb3NpdGlvbiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAncGxhY2Vob2xkZXInXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzID0gbmV3IE1hcCgpOyAvLyDRhdGA0LDQvdC40LwgMSBwbGFjZWhvbGRlclxyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIGJ1dHRvblxyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVE9ETyDRgdGH0LjRgtCw0LXQvCwg0YfRgtC+INCyINCx0LvQvtC60LUgd2FybmluZyDQvdC1INCx0L7Qu9C10LUgMSBidXR0b24g0Lgg0L3QtSDQsdC+0LvQtdC1IDEgcGxhY2Vob2xlciAo0YXQvtGC0Y8g0Y3RgtC+INC90LUg0L7QsdGP0LfQsNC90L4g0LHRi9GC0Ywg0YLQsNC6KVxyXG4gICAgICAgIC8vINCSINC/0YDQvtGC0LjQstC90L7QvCDRgdC70YPRh9Cw0LUsINC90LXQv9C+0L3Rj9GC0L3QviDQutCw0Log0LjRhSDQvNCw0YLRh9C40YLRjCDQtNGA0YPQsyDRgSDQtNGA0YPQs9C+0LwgKNC90LDQv9GA0LjQvNC10YAg0LIg0YLQsNC60L7QuSDRgdC40YLRg9Cw0YbQuNC4OiBidXR0b24sIHBsYWNlaG9sZGVyLCBidXR0b24pXHJcbiAgICAgICAgLy8g0LgsINGB0L7QvtGC0LLQtdGC0YHRgtCy0LXQvdC90L4sINCy0YvQtNCw0LLQsNGC0Ywg0L7RiNC40LHQutC4XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdwbGFjZWhvbGRlcicpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyTm9kZXMuaGFzKHdhcm5pbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZhbGlkQnV0dG9uID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW52YWxpZEJ1dHRvbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24oaW52YWxpZEJ1dHRvbi5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblBvc2l0aW9uOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdFwiO1xyXG5cclxuY2xhc3MgQnV0dG9uU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAndGV4dCddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnRleHROb2RlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnV0dG9uTm9kZXMgPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgYnV0dG9uTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RUZXh0Tm9kZSA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuICAgICAgICBjb25zdCBidXR0b25zID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghYnV0dG9ucylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghZmlyc3RUZXh0Tm9kZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdFRleHROb2RlLm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgc2l6ZS5hZGQoMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldChidXR0b24ubW9kcywgJ3NpemUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZS5jaGVjayhzaXplVmFsQikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZShidXR0b24ubG9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNpemU7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemV9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNvbnN0IGNvcnJlY3RTaXplcyA9IFsncycsICdtJywgJ2wnXTtcclxuXHJcbmNsYXNzIFBsYWNlaG9sZGVyU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdwbGFjZWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGdldChub2RlLm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3QgaW5kID0gY29ycmVjdFNpemVzLmluZGV4T2Yoc2l6ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGluZCA9PT0gLTEpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUobm9kZS5sb2NhdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxhY2Vob2xkZXJTaXplOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWx9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIFRleHRTaXplcyBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIXRleHROb2RlcylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBbZmlyc3QsIC4uLm90aGVyXSA9IHRleHROb2RlcztcclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdC5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHRleHQgb2Ygb3RoZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZVZhbEIgPSBnZXQodGV4dC5tb2RzLCAnc2l6ZScpO1xyXG5cclxuICAgICAgICAgICAgLy8g0JTQsNC20LUg0LXRgdC70Lgg0LIg0YDQsNC80LrQsNGFINC+0LTQvdC+0LPQviDQsdC70L7QutCwINC90LXRgdC60L7Qu9GM0LrQviDQvtGI0LjQsdC+0YfQvdGL0YUg0YHQu9C+0LIsINGC0L4g0LLQvtCy0YDQsNGJ0LDQtdC8INC+0LTQvdGDINC+0YjQuNCx0LrRgy5cclxuICAgICAgICAgICAgaWYgKCFzaXplLmNoZWNrKHNpemVWYWxCKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbChub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0U2l6ZXM7Il0sInNvdXJjZVJvb3QiOiIifQ==