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

    console.log('test: ' + ind);
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
    }

    if (type === 'h1') {
      const errors = [];
      this.h2Nodes.forEach(node => {
        const error = new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["TextInvalidH2Position"](node.location);
        errors.push(error);
      });

      if (errors.length) {
        this.h2Nodes = [];
        return errors;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcmtldGluZy90b29tdWNoLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90ZXh0L2gxaDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDJoMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJCTE9DSyIsIkVMRU0iLCJDT05URU5UIiwiTU9EUyIsIk1JWCIsIkVMRU1NT0RTIiwiUFJPUFMiLCJsb2NhdGlvbktleSIsIkpzb25Tb3VyY2VNYXAiLCJrZXkiLCJCZW1Ob2RlIiwiY29uc3RydWN0b3IiLCJub2RlIiwiYmxvY2siLCJlbGVtIiwibW9kcyIsIm1peCIsImVsZW1Nb2RzIiwibG9jYXRpb24iLCJzZWxlY3RvciIsIldhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwiLCJMaW50RXJyb3IiLCJjb2RlIiwiZXJyb3IiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uIiwiV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUiLCJUZXh0U2V2ZXJhbEgxIiwiVGV4dEludmFsaWRIMlBvc2l0aW9uIiwiVGV4dEludmFsaWRIM1Bvc2l0aW9uIiwiR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MiLCJJbnZhbGlkSW5wdXQiLCJFcnJvciIsInBvc2l0aW9uS2V5IiwiU3ltYm9sIiwicmVzdWx0IiwicGFyc2UiLCJqc29uIiwiZGF0YSIsInBvaW50ZXJzIiwiZSIsIm1hdGNoIiwicGF0aCIsInZhbHVlIiwidmFsdWVFbmQiLCJzdGFydCIsImVuZCIsIm1hcCIsInZhbCIsImxpbmUiLCJjb2x1bW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJjaGlsZCIsImluZCIsInBoYXNlcyIsIlJ1bGVCYXNlIiwicHJvdG90eXBlIiwicnVsZUNsYXNzZXMiLCJiZW1Ob2RlIiwiY29udGVudEFzQXJyYXkiLCJjYWxsIiwiaW4iLCJuZXh0Iiwib3V0IiwibWVkaWF0b3IiLCJlcnJvcnMiLCJpbml0Iiwic3RyaW5nVHJlZSIsImF0dGFjaFJvb3QiLCJtYXBwZXIiLCJyb290IiwiZ2V0SnNvbiIsImNhbGxBbGwiLCJydWxlc0luc3RhbmNlcyIsInJDbGFzcyIsIlJ1bGVNZWRpYXRvciIsInBoYXNlIiwiYWRkRXJyb3JzIiwiZWwiLCJUZXh0U2l6ZXMiLCJCdXR0b25TaXplIiwiQnV0dG9uUG9zaXRpb24iLCJQbGFjZWhvbGRlclNpemUiLCJTZXZlcmFsSDEiLCJIMUgyIiwiSDJIMyIsIlRvb011Y2giLCJtYXJrZXRpbmdCbG9ja3MiLCJncmlkIiwiZ3JpZEZyYWN0aW9uIiwidG90YWxNYXJrZXRpbmciLCJnZXRQaGFzZUhhbmRsZXJzTWFwIiwiYmluZCIsInNpemUiLCJnZXQiLCJpbmNsdWRlcyIsImZ1bGxTaXplIiwidG90YWxJbmZvIiwic2VsZWN0b3JzIiwiZ2V0U2VsZWN0b3JzIiwiSGFuZGxlclR5cGUiLCJIYW5kbGVyc01hcFR5cGUiLCJoYW5kbGVyc01hcCIsImJ1aWxkTWFwIiwicnVsZSIsImhhbmRsZXIiLCJnZXRLZXkiLCJwdXNoIiwiaGFuZGxlcnMiLCJoYW5kbGVyRXJyb3JzIiwiZmlsdGVyIiwiaDJOb2RlcyIsInR5cGUiLCJsZW5ndGgiLCJoM05vZGVzIiwiaDJ3YXMiLCJoMXdhcyIsInNpemVzU2NhbGUiLCJTaXplIiwiYWRkIiwiY291bnQiLCJpbmRleE9mIiwiY2hlY2siLCJzaXplQiIsImlzRGVmIiwieCIsInVuZGVmaW5lZCIsIm9iaiIsInByb3BzIiwiY3VycmVudCIsInByb3AiLCJ3YXJuaW5ncyIsInBsYWNlaG9sZGVyTm9kZXMiLCJNYXAiLCJidXR0b25Ob2RlcyIsIndhcm5pbmciLCJnZXRMYXN0V2FybmluZyIsImhhcyIsImludmFsaWRCdXR0b24iLCJzZXQiLCJwb3AiLCJkZWxldGUiLCJ0ZXh0Tm9kZXMiLCJmaXJzdFRleHROb2RlIiwiYnV0dG9ucyIsInNpemVWYWxBIiwiYnV0dG9uIiwic2l6ZVZhbEIiLCJjb3JyZWN0U2l6ZXMiLCJmaXJzdCIsIm90aGVyIiwidGV4dCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFF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QUFJeUIsOENBQUosQ0FBUzJCLFFBQVQsQ0FBYjs7QUFFQSxTQUFLLElBQUlNLElBQVQsSUFBaUJELEtBQWpCLEVBQXdCO0FBQ3BCLFlBQU1ILFFBQVEsR0FBR3JELHFEQUFHLENBQUN5RCxJQUFJLENBQUMzSSxJQUFOLEVBQVksTUFBWixDQUFwQixDQURvQixDQUdwQjs7QUFDQSxVQUFJLENBQUNpRixJQUFJLENBQUM2QixLQUFMLENBQVd5QixRQUFYLENBQUwsRUFDSSxPQUFPLElBQUlsSSxnRkFBSixDQUFpQ1IsSUFBSSxDQUFDTSxRQUF0QyxDQUFQO0FBQ1A7QUFDSjs7QUFFRHlILGdCQUFjLEdBQUc7QUFDYixVQUFNdkIsTUFBTSxHQUFHLEtBQUtrQixRQUFMLENBQWNsQixNQUE3QjtBQUVBLFdBQU8sS0FBS2tCLFFBQUwsQ0FBY2xCLE1BQU0sR0FBRyxDQUF2QixDQUFQO0FBQ0g7O0FBakU0Qjs7QUFvRWxCbEMsd0VBQWYsRSIsImZpbGUiOiJsaW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IExpbnRlciBmcm9tICcuL3NyYy9saW50ZXIuanMnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9zcmMvcnVsZXMvbGlzdC5qcydcclxuXHJcbi8vIFRPRE8gZm9yIHRlc3RcclxuLy8gaW1wb3J0IHt0ZXN0cywgYW5zd2Vyc30gZnJvbSBcIi4vdGVzdGNhc2VzLmpzXCI7XHJcblxyXG5jb25zdCBsaW50ZXIgPSBuZXcgTGludGVyKHJ1bGVzKTtcclxuXHJcbndpbmRvdy5saW50ID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbGludGVyLmxpbnQoc3RyKTtcclxufTtcclxuXHJcbi8vIFRPRE8gZm9yIHRlc3RcclxuLyp0ZXN0cy5mb3JFYWNoKCh0ZXN0LCBpbmQpID0+IHtcclxuICAgIGNvbnN0IHJlcyA9IHdpbmRvdy5saW50KHRlc3QpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCd0ZXN0OiAnICsgaW5kKTtcclxuICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbn0pKi9cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXNjYXBlZENoYXJzID0ge1xuICAnYic6ICdcXGInLFxuICAnZic6ICdcXGYnLFxuICAnbic6ICdcXG4nLFxuICAncic6ICdcXHInLFxuICAndCc6ICdcXHQnLFxuICAnXCInOiAnXCInLFxuICAnLyc6ICcvJyxcbiAgJ1xcXFwnOiAnXFxcXCdcbn07XG5cbnZhciBBX0NPREUgPSAnYScuY2hhckNvZGVBdCgpO1xuXG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc291cmNlLCBfLCBvcHRpb25zKSB7XG4gIHZhciBwb2ludGVycyA9IHt9O1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW4gPSAwO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGJpZ2ludCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5iaWdpbnQgJiYgdHlwZW9mIEJpZ0ludCAhPSAndW5kZWZpbmVkJztcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiBfcGFyc2UoJycsIHRydWUpLFxuICAgIHBvaW50ZXJzOiBwb2ludGVyc1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9wYXJzZShwdHIsIHRvcExldmVsKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBkYXRhO1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgY2FzZSAndCc6IHJlYWQoJ3J1ZScpOyBkYXRhID0gdHJ1ZTsgYnJlYWs7XG4gICAgICBjYXNlICdmJzogcmVhZCgnYWxzZScpOyBkYXRhID0gZmFsc2U7IGJyZWFrO1xuICAgICAgY2FzZSAnbic6IHJlYWQoJ3VsbCcpOyBkYXRhID0gbnVsbDsgYnJlYWs7XG4gICAgICBjYXNlICdcIic6IGRhdGEgPSBwYXJzZVN0cmluZygpOyBicmVhaztcbiAgICAgIGNhc2UgJ1snOiBkYXRhID0gcGFyc2VBcnJheShwdHIpOyBicmVhaztcbiAgICAgIGNhc2UgJ3snOiBkYXRhID0gcGFyc2VPYmplY3QocHRyKTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBiYWNrQ2hhcigpO1xuICAgICAgICBpZiAoJy0wMTIzNDU2Nzg5Jy5pbmRleE9mKGNoYXIpID49IDApXG4gICAgICAgICAgZGF0YSA9IHBhcnNlTnVtYmVyKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgICB9XG4gICAgbWFwKHB0ciwgJ3ZhbHVlRW5kJyk7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIGlmICh0b3BMZXZlbCAmJiBwb3MgPCBzb3VyY2UubGVuZ3RoKSB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdoaXRlc3BhY2UoKSB7XG4gICAgbG9vcDpcbiAgICAgIHdoaWxlIChwb3MgPCBzb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgIHN3aXRjaCAoc291cmNlW3Bvc10pIHtcbiAgICAgICAgICBjYXNlICcgJzogY29sdW1uKys7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcdCc6IGNvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiBjb2x1bW4gPSAwOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXG4nOiBjb2x1bW4gPSAwOyBsaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrIGxvb3A7XG4gICAgICAgIH1cbiAgICAgICAgcG9zKys7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVN0cmluZygpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgdmFyIGNoYXI7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXCInKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09ICdcXFxcJykge1xuICAgICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgICBpZiAoY2hhciBpbiBlc2NhcGVkQ2hhcnMpXG4gICAgICAgICAgc3RyICs9IGVzY2FwZWRDaGFyc1tjaGFyXTtcbiAgICAgICAgZWxzZSBpZiAoY2hhciA9PSAndScpXG4gICAgICAgICAgc3RyICs9IGdldENoYXJDb2RlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSBjaGFyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VOdW1iZXIoKSB7XG4gICAgdmFyIG51bVN0ciA9ICcnO1xuICAgIHZhciBpbnRlZ2VyID0gdHJ1ZTtcbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuXG4gICAgbnVtU3RyICs9IHNvdXJjZVtwb3NdID09ICcwJ1xuICAgICAgICAgICAgICA/IGdldENoYXIoKVxuICAgICAgICAgICAgICA6IGdldERpZ2l0cygpO1xuXG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICcuJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKSArIGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnZScgfHwgc291cmNlW3Bvc10gPT0gJ0UnKSB7XG4gICAgICBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKHNvdXJjZVtwb3NdID09ICcrJyB8fCBzb3VyY2VbcG9zXSA9PSAnLScpIG51bVN0ciArPSBnZXRDaGFyKCk7XG4gICAgICBudW1TdHIgKz0gZ2V0RGlnaXRzKCk7XG4gICAgICBpbnRlZ2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9ICtudW1TdHI7XG4gICAgcmV0dXJuIGJpZ2ludCAmJiBpbnRlZ2VyICYmIChyZXN1bHQgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCByZXN1bHQgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUilcbiAgICAgICAgICAgID8gQmlnSW50KG51bVN0cilcbiAgICAgICAgICAgIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VBcnJheShwdHIpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICBpZiAoZ2V0Q2hhcigpID09ICddJykgcmV0dXJuIGFycjtcbiAgICBiYWNrQ2hhcigpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgIGFyci5wdXNoKF9wYXJzZShpdGVtUHRyKSk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICddJykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VPYmplY3QocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBvYmogPSB7fTtcbiAgICBpZiAoZ2V0Q2hhcigpID09ICd9JykgcmV0dXJuIG9iajtcbiAgICBiYWNrQ2hhcigpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBsb2MgPSBnZXRMb2MoKTtcbiAgICAgIGlmIChnZXRDaGFyKCkgIT0gJ1wiJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB2YXIga2V5ID0gcGFyc2VTdHJpbmcoKTtcbiAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgIG1hcExvYyhwcm9wUHRyLCAna2V5JywgbG9jKTtcbiAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICc6Jykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBvYmpba2V5XSA9IF9wYXJzZShwcm9wUHRyKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ30nKSBicmVhaztcbiAgICAgIGlmIChjaGFyICE9ICcsJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkKHN0cikge1xuICAgIGZvciAodmFyIGk9MDsgaTxzdHIubGVuZ3RoOyBpKyspXG4gICAgICBpZiAoZ2V0Q2hhcigpICE9PSBzdHJbaV0pIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hhcigpIHtcbiAgICBjaGVja1VuZXhwZWN0ZWRFbmQoKTtcbiAgICB2YXIgY2hhciA9IHNvdXJjZVtwb3NdO1xuICAgIHBvcysrO1xuICAgIGNvbHVtbisrOyAvLyBuZXcgbGluZT9cbiAgICByZXR1cm4gY2hhcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhY2tDaGFyKCkge1xuICAgIHBvcy0tO1xuICAgIGNvbHVtbi0tO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hhckNvZGUoKSB7XG4gICAgdmFyIGNvdW50ID0gNDtcbiAgICB2YXIgY29kZSA9IDA7XG4gICAgd2hpbGUgKGNvdW50LS0pIHtcbiAgICAgIGNvZGUgPDw9IDQ7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ2YnKVxuICAgICAgICBjb2RlICs9IGNoYXIuY2hhckNvZGVBdCgpIC0gQV9DT0RFICsgMTA7XG4gICAgICBlbHNlIGlmIChjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgY29kZSArPSArY2hhcjtcbiAgICAgIGVsc2VcbiAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlnaXRzKCkge1xuICAgIHZhciBkaWdpdHMgPSAnJztcbiAgICB3aGlsZSAoc291cmNlW3Bvc10gPj0gJzAnICYmIHNvdXJjZVtwb3NdIDw9ICc5JylcbiAgICAgIGRpZ2l0cyArPSBnZXRDaGFyKCk7XG5cbiAgICBpZiAoZGlnaXRzLmxlbmd0aCkgcmV0dXJuIGRpZ2l0cztcbiAgICBjaGVja1VuZXhwZWN0ZWRFbmQoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBtYXBMb2MocHRyLCBwcm9wLCBnZXRMb2MoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXBMb2MocHRyLCBwcm9wLCBsb2MpIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0gbG9jO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBwb3M6IHBvc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1bmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIHRva2VuICcgKyBzb3VyY2VbcG9zXSArICcgaW4gSlNPTiBhdCBwb3NpdGlvbiAnICsgcG9zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhc1VuZXhwZWN0ZWRUb2tlbigpIHtcbiAgICBiYWNrQ2hhcigpO1xuICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVbmV4cGVjdGVkRW5kKCkge1xuICAgIGlmIChwb3MgPj0gc291cmNlLmxlbmd0aClcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgSlNPTiBpbnB1dCcpO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKGRhdGEsIF8sIG9wdGlvbnMpIHtcbiAgaWYgKCF2YWxpZFR5cGUoZGF0YSkpIHJldHVybjtcbiAgdmFyIHdzTGluZSA9IDA7XG4gIHZhciB3c1Bvcywgd3NDb2x1bW47XG4gIHZhciB3aGl0ZXNwYWNlID0gdHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLnNwYWNlXG4gICAgICAgICAgICAgICAgICAgIDogb3B0aW9ucztcbiAgc3dpdGNoICh0eXBlb2Ygd2hpdGVzcGFjZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICB2YXIgbGVuID0gd2hpdGVzcGFjZSA+IDEwXG4gICAgICAgICAgICAgICAgICA/IDEwXG4gICAgICAgICAgICAgICAgICA6IHdoaXRlc3BhY2UgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgICAgICA6IE1hdGguZmxvb3Iod2hpdGVzcGFjZSk7XG4gICAgICB3aGl0ZXNwYWNlID0gbGVuICYmIHJlcGVhdChsZW4sICcgJyk7XG4gICAgICB3c1BvcyA9IGxlbjtcbiAgICAgIHdzQ29sdW1uID0gbGVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHdoaXRlc3BhY2UgPSB3aGl0ZXNwYWNlLnNsaWNlKDAsIDEwKTtcbiAgICAgIHdzUG9zID0gMDtcbiAgICAgIHdzQ29sdW1uID0gMDtcbiAgICAgIGZvciAodmFyIGo9MDsgajx3aGl0ZXNwYWNlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBjaGFyID0gd2hpdGVzcGFjZVtqXTtcbiAgICAgICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICAgICAgY2FzZSAnICc6IHdzQ29sdW1uKys7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcdCc6IHdzQ29sdW1uICs9IDQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xccic6IHdzQ29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogd3NDb2x1bW4gPSAwOyB3c0xpbmUrKzsgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCd3aGl0ZXNwYWNlIGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgaW4gSlNPTicpO1xuICAgICAgICB9XG4gICAgICAgIHdzUG9zKys7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgd2hpdGVzcGFjZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBqc29uID0gJyc7XG4gIHZhciBwb2ludGVycyA9IHt9O1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW4gPSAwO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGVzNiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lczYgJiYgdHlwZW9mIE1hcCA9PSAnZnVuY3Rpb24nO1xuICBfc3RyaW5naWZ5KGRhdGEsIDAsICcnKTtcbiAgcmV0dXJuIHtcbiAgICBqc29uOiBqc29uLFxuICAgIHBvaW50ZXJzOiBwb2ludGVyc1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9zdHJpbmdpZnkoX2RhdGEsIGx2bCwgcHRyKSB7XG4gICAgbWFwKHB0ciwgJ3ZhbHVlJyk7XG4gICAgc3dpdGNoICh0eXBlb2YgX2RhdGEpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIG91dCgnJyArIF9kYXRhKTsgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBvdXQocXVvdGVkKF9kYXRhKSk7IGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKF9kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgb3V0KCdudWxsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF9kYXRhLnRvSlNPTiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb3V0KHF1b3RlZChfZGF0YS50b0pTT04oKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoX2RhdGEpKSB7XG4gICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgfSBlbHNlIGlmIChlczYpIHtcbiAgICAgICAgICBpZiAoX2RhdGEuY29uc3RydWN0b3IuQllURVNfUEVSX0VMRU1FTlQpXG4gICAgICAgICAgICBzdHJpbmdpZnlBcnJheSgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgTWFwKVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KCk7XG4gICAgICAgICAgZWxzZSBpZiAoX2RhdGEgaW5zdGFuY2VvZiBTZXQpXG4gICAgICAgICAgICBzdHJpbmdpZnlNYXBTZXQodHJ1ZSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RyaW5naWZ5T2JqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyaW5naWZ5T2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWFwKHB0ciwgJ3ZhbHVlRW5kJyk7XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlBcnJheSgpIHtcbiAgICAgIGlmIChfZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgb3V0KCdbJyk7XG4gICAgICAgIHZhciBpdGVtTHZsID0gbHZsICsgMTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPF9kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkpIG91dCgnLCcpO1xuICAgICAgICAgIGluZGVudChpdGVtTHZsKTtcbiAgICAgICAgICB2YXIgaXRlbSA9IHZhbGlkVHlwZShfZGF0YVtpXSkgPyBfZGF0YVtpXSA6IG51bGw7XG4gICAgICAgICAgdmFyIGl0ZW1QdHIgPSBwdHIgKyAnLycgKyBpO1xuICAgICAgICAgIF9zdHJpbmdpZnkoaXRlbSwgaXRlbUx2bCwgaXRlbVB0cik7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnXScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCdbXScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdCgpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoX2RhdGEpO1xuICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgdmFyIHZhbHVlID0gX2RhdGFba2V5XTtcbiAgICAgICAgICBpZiAodmFsaWRUeXBlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKGkpIG91dCgnLCcpO1xuICAgICAgICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgICAgICAgaW5kZW50KHByb3BMdmwpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXknKTtcbiAgICAgICAgICAgIG91dChxdW90ZWQoa2V5KSk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgICAgICAgb3V0KCc6Jyk7XG4gICAgICAgICAgICBpZiAod2hpdGVzcGFjZSkgb3V0KCcgJyk7XG4gICAgICAgICAgICBfc3RyaW5naWZ5KHZhbHVlLCBwcm9wTHZsLCBwcm9wUHRyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnfScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCd7fScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeU1hcFNldChpc1NldCkge1xuICAgICAgaWYgKF9kYXRhLnNpemUpIHtcbiAgICAgICAgb3V0KCd7Jyk7XG4gICAgICAgIHZhciBwcm9wTHZsID0gbHZsICsgMTtcbiAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGVudHJpZXMgPSBfZGF0YS5lbnRyaWVzKCk7XG4gICAgICAgIHZhciBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB3aGlsZSAoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgIHZhciBrZXkgPSBpdGVtWzBdO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGlzU2V0ID8gdHJ1ZSA6IGl0ZW1bMV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICghZmlyc3QpIG91dCgnLCcpO1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnfScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCd7fScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG91dChzdHIpIHtcbiAgICBjb2x1bW4gKz0gc3RyLmxlbmd0aDtcbiAgICBwb3MgKz0gc3RyLmxlbmd0aDtcbiAgICBqc29uICs9IHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluZGVudChsdmwpIHtcbiAgICBpZiAod2hpdGVzcGFjZSkge1xuICAgICAganNvbiArPSAnXFxuJyArIHJlcGVhdChsdmwsIHdoaXRlc3BhY2UpO1xuICAgICAgbGluZSsrO1xuICAgICAgY29sdW1uID0gMDtcbiAgICAgIHdoaWxlIChsdmwtLSkge1xuICAgICAgICBpZiAod3NMaW5lKSB7XG4gICAgICAgICAgbGluZSArPSB3c0xpbmU7XG4gICAgICAgICAgY29sdW1uID0gd3NDb2x1bW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uICs9IHdzQ29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIHBvcyArPSB3c1BvcztcbiAgICAgIH1cbiAgICAgIHBvcyArPSAxOyAvLyBcXG4gY2hhcmFjdGVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFwKHB0ciwgcHJvcCkge1xuICAgIHBvaW50ZXJzW3B0cl0gPSBwb2ludGVyc1twdHJdIHx8IHt9O1xuICAgIHBvaW50ZXJzW3B0cl1bcHJvcF0gPSB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBwb3M6IHBvc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiByZXBlYXQobiwgc3RyKSB7XG4gICAgcmV0dXJuIEFycmF5KG4gKyAxKS5qb2luKHN0cik7XG4gIH1cbn07XG5cblxudmFyIFZBTElEX1RZUEVTID0gWydudW1iZXInLCAnYmlnaW50JywgJ2Jvb2xlYW4nLCAnc3RyaW5nJywgJ29iamVjdCddO1xuZnVuY3Rpb24gdmFsaWRUeXBlKGRhdGEpIHtcbiAgcmV0dXJuIFZBTElEX1RZUEVTLmluZGV4T2YodHlwZW9mIGRhdGEpID49IDA7XG59XG5cblxudmFyIEVTQ19RVU9URSA9IC9cInxcXFxcL2c7XG52YXIgRVNDX0IgPSAvW1xcYl0vZztcbnZhciBFU0NfRiA9IC9cXGYvZztcbnZhciBFU0NfTiA9IC9cXG4vZztcbnZhciBFU0NfUiA9IC9cXHIvZztcbnZhciBFU0NfVCA9IC9cXHQvZztcbmZ1bmN0aW9uIHF1b3RlZChzdHIpIHtcbiAgc3RyID0gc3RyLnJlcGxhY2UoRVNDX1FVT1RFLCAnXFxcXCQmJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX0YsICdcXFxcZicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19CLCAnXFxcXGInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfTiwgJ1xcXFxuJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX1IsICdcXFxccicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19ULCAnXFxcXHQnKTtcbiAgcmV0dXJuICdcIicgKyBzdHIgKyAnXCInO1xufVxuXG5cbnZhciBFU0NfMCA9IC9+L2c7XG52YXIgRVNDXzEgPSAvXFwvL2c7XG5mdW5jdGlvbiBlc2NhcGVKc29uUG9pbnRlcihzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKEVTQ18wLCAnfjAnKVxuICAgICAgICAgICAgLnJlcGxhY2UoRVNDXzEsICd+MScpO1xufVxuIiwiaW1wb3J0IFBST1BTIGZyb20gJy4vcHJvcG5hbWVzLmpzJztcclxuaW1wb3J0IEpzb25Tb3VyY2VNYXAgZnJvbSAnLi9qc29uc291cmNlbWFwLmpzJztcclxuXHJcbmNvbnN0IHtCTE9DSywgRUxFTSwgQ09OVEVOVCwgTU9EUywgTUlYLCBFTEVNTU9EU30gPSBQUk9QUztcclxuY29uc3QgbG9jYXRpb25LZXkgPSBKc29uU291cmNlTWFwLmtleTtcclxuXHJcbmNsYXNzIEJlbU5vZGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlKSB7XHJcbiAgICAgICAgdGhpcy5ibG9jayA9IG5vZGVbQkxPQ0tdO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IG5vZGVbRUxFTV07XHJcbiAgICAgICAgdGhpcy5tb2RzID0gbm9kZVtNT0RTXTtcclxuICAgICAgICB0aGlzLm1peCA9IG5vZGVbTUlYXTtcclxuICAgICAgICB0aGlzLmVsZW1Nb2RzID0gbm9kZVtFTEVNTU9EU11cclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG5vZGVbbG9jYXRpb25LZXldO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy5ibG9jayArICh0aGlzLmVsZW0gPyAoYF9fJHt0aGlzLmVsZW19YCkgOiAnJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlbU5vZGU7IiwiaW1wb3J0IExpbnRFcnJvciBmcm9tICcuL2xpbnRlcnJvci5qcyc7XHJcblxyXG5jbGFzcyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5URVhUX1NJWkVTX1NIT1VMRF9CRV9FUVVBTCcsIGVycm9yOiAn0KLQtdC60YHRgtGLINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC90Ysg0LHRi9GC0Ywg0L7QtNC90L7Qs9C+INGA0LDQt9C80LXRgNCwLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fU0laRScsIGVycm9yOiAn0KDQsNC30LzQtdGAINC60L3QvtC/0LrQuCDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC90LAgMSDRiNCw0LMg0LHQvtC70YzRiNC1INGN0YLQsNC70L7QvdC90L7Qs9C+LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1BPU0lUSU9OJywgZXJyb3I6ICfQkdC70L7QuiBidXR0b24g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9C+0YHQu9C1INCx0LvQvtC60LAgcGxhY2Vob2xkZXIuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfUExBQ0VIT0xERVJfU0laRScsIGVycm9yOiAn0JTQvtC/0YPRgdGC0LjQvNGL0LUg0YDQsNC30LzQtdGA0Ysg0LTQu9GPINCx0LvQvtC60LAgcGxhY2Vob2xkZXIg0LIg0LHQu9C+0LrQtSB3YXJuaW5nOiBzLCBtLCBsLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTZXZlcmFsSDEgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULlNFVkVSQUxfSDEnLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQtdC00LjQvdGB0YLQstC10L3QvdGL0LwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIMlBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gyX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgzUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDNfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDRgtGA0LXRgtGM0LXQs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdHUklELlRPT19NVUNIX01BUktFVElOR19CTE9DS1MnLCBlcnJvcjogJ9Cc0LDRgNC60LXRgtC40L3Qs9C+0LLRi9C1INCx0LvQvtC60Lgg0L3QtSDQvNC+0LPRg9GCINC30LDQvdC40LzQsNGC0Ywg0LHQvtC70YzRiNC1INC/0L7Qu9C+0LLQuNC90Ysg0L7RgiDQstGB0LXRhSDQutC+0LvQvtC90L7QuiDQsdC70L7QutCwIGdyaWQnLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24sXHJcbiAgICBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFRleHRTZXZlcmFsSDEsXHJcbiAgICBUZXh0SW52YWxpZEgyUG9zaXRpb24sXHJcbiAgICBUZXh0SW52YWxpZEgzUG9zaXRpb24sXHJcbiAgICBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc1xyXG59IiwiXHJcbmNsYXNzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7Y29kZSwgZXJyb3IsIGxvY2F0aW9ufSkge1xyXG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludEVycm9yOyIsIlxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyDQndC10YDQsNC30YDQtdGI0LjQvNGL0LUg0L7RiNC40LHQutC4LCDQv9C+0YHQu9C1INC60L7RgtC+0YDRi9GFINC/0YDQtdC60YDQsNGJ0LDQtdC8INGA0LDQsdC+0YLRgy4g0JjRhSDRh9C40YHQu9C+INC80L7QttC10YIg0YHQvtC60YDQsNGJ0LDRgtGM0YHRj1xyXG4gKiDQv9C+INC80LXRgNC1INC00L7QsdCw0LLQu9C10L3QuNGPINC90L7QstGL0YUg0L/RgNCw0LLQuNC7INCyINC70LjQvdGC0LXRgC5cclxuICovXHJcbmNsYXNzIEludmFsaWRJbnB1dCBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiSW52YWxpZCBpbnB1dFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEludmFsaWRJbnB1dFxyXG59IiwiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcg0JDQtNCw0L/RgtC10YAg0YTRg9C90LrRhtC40LggcGFyc2Ug0LjQtyDQsdC40LHQu9C40L7RgtC10LrQuCBqc29uLXNvdXJjZS1tYXBcclxuICovXHJcblxyXG5pbXBvcnQge3BhcnNlfSBmcm9tICdqc29uLXNvdXJjZS1tYXAnO1xyXG5pbXBvcnQgUFJPUFMgZnJvbSAnLi9wcm9wbmFtZXMuanMnO1xyXG5pbXBvcnQge0ludmFsaWRJbnB1dH0gZnJvbSBcIi4vZXJyb3Ivc3lzdGVtLmpzXCI7XHJcblxyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcblxyXG5jb25zdCBwb3NpdGlvbktleSA9IFN5bWJvbCgnUG9zaXRpb24nKTtcclxuXHJcbmNsYXNzIEpzb25Tb3VyY2VNYXAge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN0cikge1xyXG4gICAgICAgIHRoaXMuc3RyID0gc3RyO1xyXG4gICAgICAgIHRoaXMuanNvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wb2ludGVycyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SnNvbiA9ICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZSh0aGlzLnN0cik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmpzb24gPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludGVycyA9IHJlc3VsdC5wb2ludGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZElucHV0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGNoKHRoaXMuanNvbiwgJycpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYXRjaCA9IChub2RlLCBwYXRoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCB2YWx1ZUVuZH0gPSB0aGlzLnBvaW50ZXJzW3BhdGhdO1xyXG5cclxuICAgICAgICAvLyArMSDQuiBjb2wsINGCLtC6LiDQsdC40LHQu9C40L7RgtC10LrQsCDQstC10LTQtdGCINC+0YLRgdGH0LXRgiDQvtGCIDAuXHJcbiAgICAgICAgLy8g0J/RgNC4INGN0YLQvtC8IGxpbmUg0LHQtdC3INC40LfQvNC10L3QtdC90LjRjywg0YIu0LouINC40YHRhdC+0LTQvdGL0LkgSlNPTiDQvtCx0LXRgNC90YPQu9C4ICjQv9C+0LvQvtC20LjQu9C4INCy0L3Rg9GC0YDRjCDRgdCy0L7QudGB0YLQstCwIFwiY29udGVudFwiKVxyXG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IFt2YWx1ZSwgdmFsdWVFbmRdLm1hcCh2YWwgPT4gKHtsaW5lOiB2YWwubGluZSwgY29sdW1uOiB2YWwuY29sdW1uICsgMX0pKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGVbQ09OVEVOVF07XHJcblxyXG4gICAgICAgIG5vZGVbcG9zaXRpb25LZXldID0ge3N0YXJ0LCBlbmR9O1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkcmVuKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKGNoaWxkLCBgJHtwYXRofS8ke0NPTlRFTlR9LyR7aW5kfWApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGRyZW4sIGAke3BhdGh9LyR7Q09OVEVOVH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBrZXkgPSBwb3NpdGlvbktleTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSnNvblNvdXJjZU1hcDsiLCJpbXBvcnQgUFJPUFMgZnJvbSBcIi4vcHJvcG5hbWVzLmpzXCI7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcbmltcG9ydCBCZW1Ob2RlIGZyb20gJy4vYmVtbm9kZS5qcyc7XHJcbmltcG9ydCBSdWxlTWVkaWF0b3IgZnJvbSAnLi9ydWxlcy9ydWxlbWVkaWF0b3IuanMnO1xyXG5pbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4vcnVsZXMvcnVsZWJhc2UuanNcIjtcclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgTGludGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTwhUnVsZUJhc2U+fSBydWxlQ2xhc3Nlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihydWxlQ2xhc3NlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlQ2xhc3NlcyA9IHJ1bGVDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBsaW50KHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdHJpbmdUcmVlID0gdGhpcy5hdHRhY2hSb290KHN0cik7XHJcbiAgICAgICAgY29uc3QgbWFwcGVyID0gbmV3IEpzb25Tb3VyY2VNYXAoc3RyaW5nVHJlZSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG1hcHBlci5nZXRKc29uKHN0cmluZ1RyZWUpO1xyXG5cclxuICAgICAgICB0aGlzLm5leHQocm9vdCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsKHBoYXNlcy5lbmQpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGZpbHRlciBlcnJvcnNcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCBydWxlc0luc3RhbmNlcyA9IHRoaXMucnVsZUNsYXNzZXMubWFwKHJDbGFzcyA9PiBuZXcgckNsYXNzKCkpO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbmV3IFJ1bGVNZWRpYXRvcihydWxlc0luc3RhbmNlcyk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDQktGF0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC+0LHRitC10LrRgtC+0Lwg0LjQu9C4INC80LDRgdGB0LjQstC+0LwgKNC00LXRgNC10LLQviDQuNC70Lgg0LvQtdGBKS4g0JTQvtCx0LDQstC40Lwg0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQutC+0YDQtdC90YwsINCy0YHQtdCz0LTQsCDQsdGL0LvQviDQtNC10YDQtdCy0L4uICovXHJcbiAgICBhdHRhY2hSb290ID0gc3RyID0+IGB7XCIke0NPTlRFTlR9XCI6XFxuJHtzdHJ9XFxufWA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICovXHJcbiAgICBuZXh0ID0gKG5vZGUpID0+IHtcclxuICAgICAgICBjb25zdCBiZW1Ob2RlID0gbmV3IEJlbU5vZGUobm9kZSk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNvbnRlbnRBc0FycmF5KG5vZGVbQ09OVEVOVF0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLmluLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLm91dCwgYmVtTm9kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGwocGhhc2UsIGJlbU5vZGUpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGwocGhhc2UsIGJlbU5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxBbGwocGhhc2UpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGxBbGwocGhhc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVycm9ycyhlcnJvcnMpIHtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFsuLi5lcnJvcnMsIC4uLnRoaXMuZXJyb3JzXTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50QXNBcnJheShlbCkge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG5cclxuICAgICAgICByZXR1cm4gZWwgPyBbZWxdIDogW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbnRlcjsiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBCTE9DSzogXCJibG9ja1wiLFxyXG4gICAgRUxFTTogXCJlbGVtXCIsXHJcbiAgICBDT05URU5UOiBcImNvbnRlbnRcIixcclxuICAgIE1PRFM6IFwibW9kc1wiLFxyXG4gICAgTUlYOiBcIm1peFwiLFxyXG4gICAgRUxFTU1PRFM6ICdlbGVtTW9kcydcclxufTsiLCJpbXBvcnQgVGV4dFNpemVzIGZyb20gJy4vd2FybmluZy90ZXh0c2l6ZXMuanMnXHJcbmltcG9ydCBCdXR0b25TaXplIGZyb20gJy4vd2FybmluZy9idXR0b25zaXplLmpzJ1xyXG5pbXBvcnQgQnV0dG9uUG9zaXRpb24gZnJvbSAnLi93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzJ1xyXG5pbXBvcnQgUGxhY2Vob2xkZXJTaXplIGZyb20gJy4vd2FybmluZy9wbGFjZWhvbGRlcnNpemUuanMnXHJcbmltcG9ydCBTZXZlcmFsSDEgZnJvbSAnLi90ZXh0L3NldmVyYWxoMS5qcydcclxuaW1wb3J0IEgxSDIgZnJvbSAnLi90ZXh0L2gxaDIuanMnXHJcbmltcG9ydCBIMkgzIGZyb20gJy4vdGV4dC9oMmgzLmpzJ1xyXG5pbXBvcnQgVG9vTXVjaCBmcm9tICcuL21hcmtldGluZy90b29tdWNoLmpzJ1xyXG5cclxuY29uc3QgcnVsZXMgPSBbXHJcbiAgICBUZXh0U2l6ZXMsIEJ1dHRvblNpemUsIEJ1dHRvblBvc2l0aW9uLCBQbGFjZWhvbGRlclNpemUsXHJcbiAgICBTZXZlcmFsSDEsIEgxSDIsIEgySDMsXHJcbiAgICBUb29NdWNoXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlczsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc30gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdFwiO1xyXG5cclxuY29uc3QgbWFya2V0aW5nQmxvY2tzID0gWydjb21tZXJjaWFsJywgJ29mZmVyJ107XHJcblxyXG5jbGFzcyBUb29NdWNoIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWydncmlkJywgJ2dyaWRfX2ZyYWN0aW9uJywgLi4ubWFya2V0aW5nQmxvY2tzXSk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JpZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGFsTWFya2V0aW5nID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmdyaWQgJiYgbm9kZS5zZWxlY3RvciA9PT0gJ2dyaWRfX2ZyYWN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ2dyaWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZ3JpZEZyYWN0aW9uKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSArZ2V0KHRoaXMuZ3JpZEZyYWN0aW9uLmVsZW1Nb2RzLCAnbS1jb2wnKTtcclxuXHJcbiAgICAgICAgaWYgKG1hcmtldGluZ0Jsb2Nrcy5pbmNsdWRlcyhub2RlLmJsb2NrKSlcclxuICAgICAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyArPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuc2VsZWN0b3IgPT09ICdncmlkX19mcmFjdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICdncmlkJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBmdWxsU2l6ZSA9ICtnZXQobm9kZS5tb2RzLCAnbS1jb2x1bW5zJyk7XHJcbiAgICAgICAgbGV0IGVycm9yO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b3RhbE1hcmtldGluZyAqIDIgPj0gZnVsbFNpemUpXHJcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzKG5vZGUubG9jYXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmdyaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRvdGFsTWFya2V0aW5nID0gMDtcclxuICAgICAgICB0aGlzLnRvdGFsSW5mbyA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9vTXVjaDsiLCJcclxuY2xhc3MgUnVsZUJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQndCw0LHQvtGAINGB0LXQu9C10LrRgtC+0YDQvtCyIChCZW1Ob2RlLnNlbGVjdG9yKSDRg9C30LvQvtCyLCDQvdCwINC60L7RgtC+0YDRi9GFINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQv9GA0LDQstC40LvQvi5cclxuICAgICAqINCV0YHQu9C4INC90LUg0LfQsNC00LDQvSAtINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvdCwINC60LDQttC00L7QvCDRg9C30LvQtSAoVE9ETykuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZWxlY3RvcnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3JzID0gW10pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqIEBlbnVte3N0cmluZ30gKi9cclxuUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcyA9IHtcclxuICAgIC8qINCS0YXQvtC00LjQvCDQsiDQvtGH0LXRgNC10LTQvdC+0Lkg0YPQt9C10Lsg0LTQtdGA0LXQstCwKi9cclxuICAgIGluOiAnaW4nLFxyXG4gICAgLyog0JLRi9GF0L7QtNC40LwgKi9cclxuICAgIG91dDogJ291dCcsXHJcbiAgICAvKiDQl9Cw0LrQsNC90YfQuNCy0LDQtdC8INC+0LHRhdC+0LQg0LTQtdGA0LXQstCwICovXHJcbiAgICBlbmQ6ICdlbmQnXHJcbn07XHJcblxyXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKEJlbU5vZGUpOiAoIUxpbnRFcnJvcnx1bmRlZmluZWQpfSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyVHlwZTtcclxuXHJcbi8qKiBAdHlwZWRlZiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIE9iamVjdDxzdHJpbmcsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPj59ICovXHJcblJ1bGVCYXNlLkhhbmRsZXJzTWFwVHlwZTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlQmFzZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSAnLi9ydWxlYmFzZS5qcyc7XHJcblxyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgUnVsZU1lZGlhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5idWlsZE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWFwKCkge1xyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gcnVsZS5nZXRTZWxlY3RvcnMoKTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnNNYXAgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHBoYXNlIGluIGhhbmRsZXJzTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNNYXBbcGhhc2VdO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShwaGFzZSwgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFuZGxlcnNNYXBba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyc01hcFtrZXldID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XS5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEtleShwaGFzZSwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gcGhhc2UgKyAnJCcgKyBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0FycmF5PCFMaW50RXJyb3I+fVxyXG4gICAgICovXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIGJlbU5vZGUuc2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtrZXldIHx8IFtdO1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlckVycm9ycyA9IGhhbmRsZXIoYmVtTm9kZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWhhbmRsZXJFcnJvcnMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYW5kbGVyRXJyb3JzKSlcclxuICAgICAgICAgICAgICAgIGVycm9ycyA9IFsuLi5oYW5kbGVyRXJyb3JzLCAuLi5lcnJvcnNdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChoYW5kbGVyRXJyb3JzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IHJ1bGUuZ2V0UGhhc2VIYW5kbGVyc01hcCgpW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goaGFuZGxlcihudWxsKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlTWVkaWF0b3I7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7VGV4dEludmFsaWRIMlBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBIMUgyIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICB0aGlzLmgyTm9kZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdldChub2RlLm1vZHMsICd0eXBlJyk7XHJcblxyXG4gICAgICAgIGlmICghdHlwZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2gyJykge1xyXG4gICAgICAgICAgICB0aGlzLmgyTm9kZXMucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDEnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oMk5vZGVzLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZXh0SW52YWxpZEgyUG9zaXRpb24obm9kZS5sb2NhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmgyTm9kZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIMUgyOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDNQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuXHJcbi8vIFRPRE8g0KHRh9C40YLQsNC10LwsINGH0YLQviBIMiDQtdC00LjQvdGB0YLQstC10L3QvdGL0LkgKNGF0L7RgtGPINCyINC+0LHRidC10Lwg0YHQu9GD0YfQsNC1INGN0YLQviDQvdC1INGC0LDQuikuINCY0L3QsNGH0LUg0YLQsNC60LDRjyDQttC1INC/0YDQvtCx0LvQtdC80LAsINGH0YLQviDQuCDQsiBidXR0b25wb3NpdGlvbi5qc1xyXG4vLyDQn9C+0Y3RgtC+0LzRgyDQv9GA0L7RgdGC0L4g0LrQvtC/0LjQv9Cw0YHRgtC40Lwg0YLQtdGB0YIgaDFoMlxyXG5jbGFzcyBIMkgzIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICB0aGlzLmgzTm9kZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmgyd2FzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICBpZiAoIXR5cGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdoMycpIHtcclxuICAgICAgICAgICAgdGhpcy5oM05vZGVzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPINCf0YDQvtC00L7Qu9C20LDQtdC8INCw0L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0L7Qu9GM0LrQviDQtNC+INC/0LXRgNCy0L7Qs9C+IGgyXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdoMicgJiYgIXRoaXMuaDJ3YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5oMndhcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaDNOb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGV4dEludmFsaWRIM1Bvc2l0aW9uKG5vZGUubG9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIMkgzOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRTZXZlcmFsSDF9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcblxyXG5jbGFzcyBTZXZlcmFsSDEgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIHRoaXMuaDF3YXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdldChub2RlLm1vZHMsICd0eXBlJyk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlICE9PSAnaDEnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5oMXdhcykge1xyXG4gICAgICAgICAgICB0aGlzLmgxd2FzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dFNldmVyYWxIMShub2RlLmxvY2F0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V2ZXJhbEgxOyIsIlxyXG5jb25zdCBzaXplc1NjYWxlID0gW1wieHh4c1wiLCBcInh4c1wiLCBcInhzXCIsIFwic1wiLCBcIm1cIiwgXCJsXCIsIFwieGxcIiwgXCJ4eGxcIiwgXCJ4eHhsXCIsIFwieHh4eGxcIiwgXCJ4eHh4eGxcIl07XHJcblxyXG5jbGFzcyBTaXplIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpemVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY291bnRcclxuICAgICAqIEByZXR1cm4ge1NpemV9XHJcbiAgICAgKi9cclxuICAgIGFkZChjb3VudCkge1xyXG4gICAgICAgIGxldCBpbmQgPSBzaXplc1NjYWxlLmluZGV4T2YodGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgaWYgKH5pbmQpXHJcbiAgICAgICAgICAgIGluZCA9IGluZCArIGNvdW50O1xyXG5cclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplc1NjYWxlW2luZF07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKHNpemVCKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuc2l6ZSAmJiBzaXplQikgJiYgdGhpcy5zaXplID09PSBzaXplQjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGlzRGVmKHgpIHtcclxuICAgIHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXQob2JqLCAuLi5wcm9wcykge1xyXG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIC8vINGE0YPQvdC60YbQuNC4INC90LUg0L/RgNC10LTQv9C+0LvQsNCz0LDRjtGC0YHRj1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XHJcblxyXG4gICAgZm9yIChsZXQgcHJvcCBvZiBwcm9wcykge1xyXG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xyXG5cclxuICAgICAgICBpZiAoIWlzRGVmKHByb3ApKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICAgIFNpemUsXHJcbiAgICBnZXRcclxufSIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIEJ1dHRvblBvc2l0aW9uIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ2J1dHRvbicsICdwbGFjZWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlcyA9IG5ldyBNYXAoKTsgLy8g0YXRgNCw0L3QuNC8IDEgYnV0dG9uXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUT0RPINGB0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC90LUg0LHQvtC70LXQtSAxIGJ1dHRvbiDQuCDQvdC1INCx0L7Qu9C10LUgMSBwbGFjZWhvbGVyICjRhdC+0YLRjyDRjdGC0L4g0L3QtSDQvtCx0Y/Qt9Cw0L3QviDQsdGL0YLRjCDRgtCw0LopXHJcbiAgICAgICAgLy8g0JIg0L/RgNC+0YLQuNCy0L3QvtC8INGB0LvRg9GH0LDQtSwg0L3QtdC/0L7QvdGP0YLQvdC+INC60LDQuiDQuNGFINC80LDRgtGH0LjRgtGMINC00YDRg9CzINGBINC00YDRg9Cz0L7QvCAo0L3QsNC/0YDQuNC80LXRgCDQsiDRgtCw0LrQvtC5INGB0LjRgtGD0LDRhtC40Lg6IGJ1dHRvbiwgcGxhY2Vob2xkZXIsIGJ1dHRvbilcclxuICAgICAgICAvLyDQuCwg0YHQvtC+0YLQstC10YLRgdGC0LLQtdC90L3Qviwg0LLRi9C00LDQstCw0YLRjCDQvtGI0LjQsdC60LhcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3BsYWNlaG9sZGVyJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGxhY2Vob2xkZXJOb2Rlcy5oYXMod2FybmluZykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludmFsaWRCdXR0b24gPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkQnV0dG9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbihpbnZhbGlkQnV0dG9uLmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uUG9zaXRpb247IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRCdXR0b25TaXplfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcbmltcG9ydCB7VGV4dEludmFsaWRIMlBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0XCI7XHJcblxyXG5jbGFzcyBCdXR0b25TaXplIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ2J1dHRvbicsICd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50ZXh0Tm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbk5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5zZXQod2FybmluZywgW10pO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b25Ob2RlcyA9IHRoaXMuYnV0dG9uTm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBidXR0b25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuICAgICAgICBjb25zdCBmaXJzdFRleHROb2RlID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKCFidXR0b25zKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKCFmaXJzdFRleHROb2RlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0VGV4dE5vZGUubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBzaXplID0gbmV3IFNpemUoc2l6ZVZhbEEpO1xyXG5cclxuICAgICAgICBzaXplLmFkZCgxKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemVWYWxCID0gZ2V0KGJ1dHRvbi5tb2RzLCAnc2l6ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzaXplLmNoZWNrKHNpemVWYWxCKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgV2FybmluZ0ludmFsaWRCdXR0b25TaXplKGJ1dHRvbi5sb2NhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uU2l6ZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY29uc3QgY29ycmVjdFNpemVzID0gWydzJywgJ20nLCAnbCddO1xyXG5cclxuY2xhc3MgUGxhY2Vob2xkZXJTaXplIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ3BsYWNlaG9sZGVyJ10pO1xyXG5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplID0gZ2V0KG5vZGUubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBpbmQgPSBjb3JyZWN0U2l6ZXMuaW5kZXhPZihzaXplKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaW5kID09PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZShub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGFjZWhvbGRlclNpemU7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbH0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgVGV4dFNpemVzIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0ZXh0Tm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghdGV4dE5vZGVzKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IFtmaXJzdCwgLi4ub3RoZXJdID0gdGV4dE5vZGVzO1xyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0Lm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdGV4dCBvZiBvdGhlcikge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldCh0ZXh0Lm1vZHMsICdzaXplJyk7XHJcblxyXG4gICAgICAgICAgICAvLyDQlNCw0LbQtSDQtdGB0LvQuCDQsiDRgNCw0LzQutCw0YUg0L7QtNC90L7Qs9C+INCx0LvQvtC60LAg0L3QtdGB0LrQvtC70YzQutC+INC+0YjQuNCx0L7Rh9C90YvRhSDRgdC70L7Qsiwg0YLQviDQstC+0LLRgNCw0YnQsNC10Lwg0L7QtNC90YMg0L7RiNC40LHQutGDLlxyXG4gICAgICAgICAgICBpZiAoIXNpemUuY2hlY2soc2l6ZVZhbEIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsKG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRTaXplczsiXSwic291cmNlUm9vdCI6IiJ9