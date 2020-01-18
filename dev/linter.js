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
/* harmony import */ var _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/errorlist.js */ "./src/error/errorlist.js");
/* harmony import */ var _error_system_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error/system.js */ "./src/error/system.js");





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
    if (this.totalMarketing * 2 >= fullSize) error = new _error_errorlist_js__WEBPACK_IMPORTED_MODULE_2__["GridTooMuchMarketingBlocks"](node.location);
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
    this.buttonNodes.delete(warning); // TODO предполагаем, что текстовые ноды обязаны быть, т.к. иначе эталонный размер не определен и поедут другие правила. Проверить предположение.

    if (!firstTextNode) throw new _error_system_js__WEBPACK_IMPORTED_MODULE_3__["NoTextNode"]();
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
    this.textNodes.delete(warning); // TODO error emitting
    // TODO предполагаем, что текстовые ноды обязаны быть, т.к. иначе эталонный размер не определен и поедут другие правила. Проверить предположение.

    if (!textNodes) throw new _error_system_js__WEBPACK_IMPORTED_MODULE_3__["NoTextNode"]();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcmtldGluZy90b29tdWNoLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZW1lZGlhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90ZXh0L2gxaDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDJoMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJCTE9DSyIsIkVMRU0iLCJDT05URU5UIiwiTU9EUyIsIk1JWCIsIkVMRU1NT0RTIiwiUFJPUFMiLCJsb2NhdGlvbktleSIsIkpzb25Tb3VyY2VNYXAiLCJrZXkiLCJCZW1Ob2RlIiwiY29uc3RydWN0b3IiLCJub2RlIiwiYmxvY2siLCJlbGVtIiwibW9kcyIsIm1peCIsImVsZW1Nb2RzIiwibG9jYXRpb24iLCJzZWxlY3RvciIsIldhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwiLCJMaW50RXJyb3IiLCJjb2RlIiwiZXJyb3IiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUiLCJXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uIiwiV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUiLCJUZXh0U2V2ZXJhbEgxIiwiVGV4dEludmFsaWRIMlBvc2l0aW9uIiwiVGV4dEludmFsaWRIM1Bvc2l0aW9uIiwiR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MiLCJJbnZhbGlkSW5wdXQiLCJFcnJvciIsIk5vVGV4dE5vZGUiLCJwb3NpdGlvbktleSIsIlN5bWJvbCIsInJlc3VsdCIsInBhcnNlIiwianNvbiIsImRhdGEiLCJwb2ludGVycyIsImUiLCJtYXRjaCIsInBhdGgiLCJ2YWx1ZSIsInZhbHVlRW5kIiwic3RhcnQiLCJlbmQiLCJtYXAiLCJ2YWwiLCJsaW5lIiwiY29sdW1uIiwiY2hpbGRyZW4iLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiY2hpbGQiLCJpbmQiLCJwaGFzZXMiLCJSdWxlQmFzZSIsInByb3RvdHlwZSIsInJ1bGVDbGFzc2VzIiwiYmVtTm9kZSIsImNvbnRlbnRBc0FycmF5IiwiY2FsbCIsImluIiwibmV4dCIsIm91dCIsIm1lZGlhdG9yIiwiZXJyb3JzIiwiaW5pdCIsInN0cmluZ1RyZWUiLCJhdHRhY2hSb290IiwibWFwcGVyIiwicm9vdCIsImdldEpzb24iLCJjYWxsQWxsIiwicnVsZXNJbnN0YW5jZXMiLCJyQ2xhc3MiLCJSdWxlTWVkaWF0b3IiLCJwaGFzZSIsImFkZEVycm9ycyIsImVsIiwiVGV4dFNpemVzIiwiQnV0dG9uU2l6ZSIsIkJ1dHRvblBvc2l0aW9uIiwiUGxhY2Vob2xkZXJTaXplIiwiU2V2ZXJhbEgxIiwiSDFIMiIsIkgySDMiLCJUb29NdWNoIiwibWFya2V0aW5nQmxvY2tzIiwiZ3JpZCIsImdyaWRGcmFjdGlvbiIsInRvdGFsTWFya2V0aW5nIiwiZ2V0UGhhc2VIYW5kbGVyc01hcCIsImJpbmQiLCJzaXplIiwiZ2V0IiwiaW5jbHVkZXMiLCJmdWxsU2l6ZSIsInRvdGFsSW5mbyIsInNlbGVjdG9ycyIsImdldFNlbGVjdG9ycyIsIkhhbmRsZXJUeXBlIiwiSGFuZGxlcnNNYXBUeXBlIiwiaGFuZGxlcnNNYXAiLCJidWlsZE1hcCIsInJ1bGUiLCJoYW5kbGVyIiwiZ2V0S2V5IiwicHVzaCIsImhhbmRsZXJzIiwiaGFuZGxlckVycm9ycyIsImZpbHRlciIsImgyTm9kZXMiLCJoMXdhcyIsInR5cGUiLCJsZW5ndGgiLCJoM05vZGVzIiwiaDJ3YXMiLCJzaXplc1NjYWxlIiwiU2l6ZSIsImFkZCIsImNvdW50IiwiaW5kZXhPZiIsImNoZWNrIiwic2l6ZUIiLCJpc0RlZiIsIngiLCJ1bmRlZmluZWQiLCJvYmoiLCJwcm9wcyIsImN1cnJlbnQiLCJwcm9wIiwid2FybmluZ3MiLCJwbGFjZWhvbGRlck5vZGVzIiwiTWFwIiwiYnV0dG9uTm9kZXMiLCJ3YXJuaW5nIiwiZ2V0TGFzdFdhcm5pbmciLCJoYXMiLCJpbnZhbGlkQnV0dG9uIiwic2V0IiwicG9wIiwiZGVsZXRlIiwidGV4dE5vZGVzIiwiZmlyc3RUZXh0Tm9kZSIsImJ1dHRvbnMiLCJzaXplVmFsQSIsImJ1dHRvbiIsInNpemVWYWxCIiwiY29ycmVjdFNpemVzIiwiZmlyc3QiLCJvdGhlciIsInRleHQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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TyxTQUFMLENBQWVELE1BQWYsQ0FBc0JOLE9BQXRCLEVBUE0sQ0FTTjtBQUNBOztBQUNBLFFBQUksQ0FBQ08sU0FBTCxFQUNJLE1BQU0sSUFBSWpILDJEQUFKLEVBQU47QUFFSixVQUFNLENBQUN3SCxLQUFELEVBQVEsR0FBR0MsS0FBWCxJQUFvQlIsU0FBMUI7QUFDQSxVQUFNRyxRQUFRLEdBQUduRCxxREFBRyxDQUFDdUQsS0FBSyxDQUFDMUksSUFBUCxFQUFhLE1BQWIsQ0FBcEI7QUFDQSxVQUFNa0YsSUFBSSxHQUFHLElBQUl5Qiw4Q0FBSixDQUFTMkIsUUFBVCxDQUFiOztBQUVBLFNBQUssSUFBSU0sSUFBVCxJQUFpQkQsS0FBakIsRUFBd0I7QUFDcEIsWUFBTUgsUUFBUSxHQUFHckQscURBQUcsQ0FBQ3lELElBQUksQ0FBQzVJLElBQU4sRUFBWSxNQUFaLENBQXBCLENBRG9CLENBR3BCOztBQUNBLFVBQUksQ0FBQ2tGLElBQUksQ0FBQzZCLEtBQUwsQ0FBV3lCLFFBQVgsQ0FBTCxFQUNJLE9BQU8sSUFBSW5JLGdGQUFKLENBQWlDUixJQUFJLENBQUNNLFFBQXRDLENBQVA7QUFDUDtBQUNKOztBQUVEMEgsZ0JBQWMsR0FBRztBQUNiLFVBQU10QixNQUFNLEdBQUcsS0FBS2lCLFFBQUwsQ0FBY2pCLE1BQTdCO0FBRUEsV0FBTyxLQUFLaUIsUUFBTCxDQUFjakIsTUFBTSxHQUFHLENBQXZCLENBQVA7QUFDSDs7QUFuRTRCOztBQXNFbEJuQyx3RUFBZixFIiwiZmlsZSI6ImxpbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTGludGVyIGZyb20gJy4vc3JjL2xpbnRlci5qcyc7XHJcbmltcG9ydCBydWxlcyBmcm9tICcuL3NyYy9ydWxlcy9saXN0LmpzJ1xyXG5cclxuXHJcbmNvbnN0IGxpbnRlciA9IG5ldyBMaW50ZXIocnVsZXMpO1xyXG5cclxud2luZG93LmxpbnQgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIHJldHVybiBsaW50ZXIubGludChzdHIpO1xyXG59O1xyXG5cclxuXHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVzY2FwZWRDaGFycyA9IHtcbiAgJ2InOiAnXFxiJyxcbiAgJ2YnOiAnXFxmJyxcbiAgJ24nOiAnXFxuJyxcbiAgJ3InOiAnXFxyJyxcbiAgJ3QnOiAnXFx0JyxcbiAgJ1wiJzogJ1wiJyxcbiAgJy8nOiAnLycsXG4gICdcXFxcJzogJ1xcXFwnXG59O1xuXG52YXIgQV9DT0RFID0gJ2EnLmNoYXJDb2RlQXQoKTtcblxuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgXywgb3B0aW9ucykge1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBiaWdpbnQgPSBvcHRpb25zICYmIG9wdGlvbnMuYmlnaW50ICYmIHR5cGVvZiBCaWdJbnQgIT0gJ3VuZGVmaW5lZCc7XG4gIHJldHVybiB7XG4gICAgZGF0YTogX3BhcnNlKCcnLCB0cnVlKSxcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfcGFyc2UocHRyLCB0b3BMZXZlbCkge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgZGF0YTtcbiAgICBtYXAocHRyLCAndmFsdWUnKTtcbiAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgIGNhc2UgJ3QnOiByZWFkKCdydWUnKTsgZGF0YSA9IHRydWU7IGJyZWFrO1xuICAgICAgY2FzZSAnZic6IHJlYWQoJ2Fsc2UnKTsgZGF0YSA9IGZhbHNlOyBicmVhaztcbiAgICAgIGNhc2UgJ24nOiByZWFkKCd1bGwnKTsgZGF0YSA9IG51bGw7IGJyZWFrO1xuICAgICAgY2FzZSAnXCInOiBkYXRhID0gcGFyc2VTdHJpbmcoKTsgYnJlYWs7XG4gICAgICBjYXNlICdbJzogZGF0YSA9IHBhcnNlQXJyYXkocHRyKTsgYnJlYWs7XG4gICAgICBjYXNlICd7JzogZGF0YSA9IHBhcnNlT2JqZWN0KHB0cik7IGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYmFja0NoYXIoKTtcbiAgICAgICAgaWYgKCctMDEyMzQ1Njc4OScuaW5kZXhPZihjaGFyKSA+PSAwKVxuICAgICAgICAgIGRhdGEgPSBwYXJzZU51bWJlcigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICBpZiAodG9wTGV2ZWwgJiYgcG9zIDwgc291cmNlLmxlbmd0aCkgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZXNwYWNlKCkge1xuICAgIGxvb3A6XG4gICAgICB3aGlsZSAocG9zIDwgc291cmNlLmxlbmd0aCkge1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZVtwb3NdKSB7XG4gICAgICAgICAgY2FzZSAnICc6IGNvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiBjb2x1bW4gKz0gNDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxyJzogY29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogY29sdW1uID0gMDsgbGluZSsrOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBicmVhayBsb29wO1xuICAgICAgICB9XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTdHJpbmcoKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuICAgIHZhciBjaGFyO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ1wiJykge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnXFxcXCcpIHtcbiAgICAgICAgY2hhciA9IGdldENoYXIoKTtcbiAgICAgICAgaWYgKGNoYXIgaW4gZXNjYXBlZENoYXJzKVxuICAgICAgICAgIHN0ciArPSBlc2NhcGVkQ2hhcnNbY2hhcl07XG4gICAgICAgIGVsc2UgaWYgKGNoYXIgPT0gJ3UnKVxuICAgICAgICAgIHN0ciArPSBnZXRDaGFyQ29kZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgKz0gY2hhcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTnVtYmVyKCkge1xuICAgIHZhciBudW1TdHIgPSAnJztcbiAgICB2YXIgaW50ZWdlciA9IHRydWU7XG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICctJykgbnVtU3RyICs9IGdldENoYXIoKTtcblxuICAgIG51bVN0ciArPSBzb3VyY2VbcG9zXSA9PSAnMCdcbiAgICAgICAgICAgICAgPyBnZXRDaGFyKClcbiAgICAgICAgICAgICAgOiBnZXREaWdpdHMoKTtcblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnLicpIHtcbiAgICAgIG51bVN0ciArPSBnZXRDaGFyKCkgKyBnZXREaWdpdHMoKTtcbiAgICAgIGludGVnZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJ2UnIHx8IHNvdXJjZVtwb3NdID09ICdFJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKTtcbiAgICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnKycgfHwgc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgbnVtU3RyICs9IGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSArbnVtU3RyO1xuICAgIHJldHVybiBiaWdpbnQgJiYgaW50ZWdlciAmJiAocmVzdWx0ID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgcmVzdWx0IDwgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpXG4gICAgICAgICAgICA/IEJpZ0ludChudW1TdHIpXG4gICAgICAgICAgICA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQXJyYXkocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKGdldENoYXIoKSA9PSAnXScpIHJldHVybiBhcnI7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgaXRlbVB0ciA9IHB0ciArICcvJyArIGk7XG4gICAgICBhcnIucHVzaChfcGFyc2UoaXRlbVB0cikpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXScpIGJyZWFrO1xuICAgICAgaWYgKGNoYXIgIT0gJywnKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlT2JqZWN0KHB0cikge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgb2JqID0ge307XG4gICAgaWYgKGdldENoYXIoKSA9PSAnfScpIHJldHVybiBvYmo7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgbG9jID0gZ2V0TG9jKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICdcIicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgdmFyIGtleSA9IHBhcnNlU3RyaW5nKCk7XG4gICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICBtYXBMb2MocHJvcFB0ciwgJ2tleScsIGxvYyk7XG4gICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaWYgKGdldENoYXIoKSAhPSAnOicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgb2JqW2tleV0gPSBfcGFyc2UocHJvcFB0cik7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICd9JykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZChzdHIpIHtcbiAgICBmb3IgKHZhciBpPTA7IGk8c3RyLmxlbmd0aDsgaSsrKVxuICAgICAgaWYgKGdldENoYXIoKSAhPT0gc3RyW2ldKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXIoKSB7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdmFyIGNoYXIgPSBzb3VyY2VbcG9zXTtcbiAgICBwb3MrKztcbiAgICBjb2x1bW4rKzsgLy8gbmV3IGxpbmU/XG4gICAgcmV0dXJuIGNoYXI7XG4gIH1cblxuICBmdW5jdGlvbiBiYWNrQ2hhcigpIHtcbiAgICBwb3MtLTtcbiAgICBjb2x1bW4tLTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXJDb2RlKCkge1xuICAgIHZhciBjb3VudCA9IDQ7XG4gICAgdmFyIGNvZGUgPSAwO1xuICAgIHdoaWxlIChjb3VudC0tKSB7XG4gICAgICBjb2RlIDw8PSA0O1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChjaGFyID49ICdhJyAmJiBjaGFyIDw9ICdmJylcbiAgICAgICAgY29kZSArPSBjaGFyLmNoYXJDb2RlQXQoKSAtIEFfQ09ERSArIDEwO1xuICAgICAgZWxzZSBpZiAoY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIGNvZGUgKz0gK2NoYXI7XG4gICAgICBlbHNlXG4gICAgICAgIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpZ2l0cygpIHtcbiAgICB2YXIgZGlnaXRzID0gJyc7XG4gICAgd2hpbGUgKHNvdXJjZVtwb3NdID49ICcwJyAmJiBzb3VyY2VbcG9zXSA8PSAnOScpXG4gICAgICBkaWdpdHMgKz0gZ2V0Q2hhcigpO1xuXG4gICAgaWYgKGRpZ2l0cy5sZW5ndGgpIHJldHVybiBkaWdpdHM7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXAocHRyLCBwcm9wKSB7XG4gICAgbWFwTG9jKHB0ciwgcHJvcCwgZ2V0TG9jKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwTG9jKHB0ciwgcHJvcCwgbG9jKSB7XG4gICAgcG9pbnRlcnNbcHRyXSA9IHBvaW50ZXJzW3B0cl0gfHwge307XG4gICAgcG9pbnRlcnNbcHRyXVtwcm9wXSA9IGxvYztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvYygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdW5leHBlY3RlZFRva2VuKCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCB0b2tlbiAnICsgc291cmNlW3Bvc10gKyAnIGluIEpTT04gYXQgcG9zaXRpb24gJyArIHBvcyk7XG4gIH1cblxuICBmdW5jdGlvbiB3YXNVbmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgYmFja0NoYXIoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVW5leHBlY3RlZEVuZCgpIHtcbiAgICBpZiAocG9zID49IHNvdXJjZS5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIEpTT04gaW5wdXQnKTtcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChkYXRhLCBfLCBvcHRpb25zKSB7XG4gIGlmICghdmFsaWRUeXBlKGRhdGEpKSByZXR1cm47XG4gIHZhciB3c0xpbmUgPSAwO1xuICB2YXIgd3NQb3MsIHdzQ29sdW1uO1xuICB2YXIgd2hpdGVzcGFjZSA9IHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5zcGFjZVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnM7XG4gIHN3aXRjaCAodHlwZW9mIHdoaXRlc3BhY2UpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgdmFyIGxlbiA9IHdoaXRlc3BhY2UgPiAxMFxuICAgICAgICAgICAgICAgICAgPyAxMFxuICAgICAgICAgICAgICAgICAgOiB3aGl0ZXNwYWNlIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICAgOiBNYXRoLmZsb29yKHdoaXRlc3BhY2UpO1xuICAgICAgd2hpdGVzcGFjZSA9IGxlbiAmJiByZXBlYXQobGVuLCAnICcpO1xuICAgICAgd3NQb3MgPSBsZW47XG4gICAgICB3c0NvbHVtbiA9IGxlbjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICB3aGl0ZXNwYWNlID0gd2hpdGVzcGFjZS5zbGljZSgwLCAxMCk7XG4gICAgICB3c1BvcyA9IDA7XG4gICAgICB3c0NvbHVtbiA9IDA7XG4gICAgICBmb3IgKHZhciBqPTA7IGo8d2hpdGVzcGFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY2hhciA9IHdoaXRlc3BhY2Vbal07XG4gICAgICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgICAgIGNhc2UgJyAnOiB3c0NvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiB3c0NvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiB3c0NvbHVtbiA9IDA7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcbic6IHdzQ29sdW1uID0gMDsgd3NMaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGluIEpTT04nKTtcbiAgICAgICAgfVxuICAgICAgICB3c1BvcysrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdoaXRlc3BhY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIganNvbiA9ICcnO1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBlczYgPSBvcHRpb25zICYmIG9wdGlvbnMuZXM2ICYmIHR5cGVvZiBNYXAgPT0gJ2Z1bmN0aW9uJztcbiAgX3N0cmluZ2lmeShkYXRhLCAwLCAnJyk7XG4gIHJldHVybiB7XG4gICAganNvbjoganNvbixcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfc3RyaW5naWZ5KF9kYXRhLCBsdmwsIHB0cikge1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHN3aXRjaCAodHlwZW9mIF9kYXRhKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBvdXQoJycgKyBfZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgb3V0KHF1b3RlZChfZGF0YSkpOyBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChfZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIG91dCgnbnVsbCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfZGF0YS50b0pTT04gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG91dChxdW90ZWQoX2RhdGEudG9KU09OKCkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9kYXRhKSkge1xuICAgICAgICAgIHN0cmluZ2lmeUFycmF5KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXM2KSB7XG4gICAgICAgICAgaWYgKF9kYXRhLmNvbnN0cnVjdG9yLkJZVEVTX1BFUl9FTEVNRU5UKVxuICAgICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgICBlbHNlIGlmIChfZGF0YSBpbnN0YW5jZW9mIE1hcClcbiAgICAgICAgICAgIHN0cmluZ2lmeU1hcFNldCgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgU2V0KVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KHRydWUpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5QXJyYXkoKSB7XG4gICAgICBpZiAoX2RhdGEubGVuZ3RoKSB7XG4gICAgICAgIG91dCgnWycpO1xuICAgICAgICB2YXIgaXRlbUx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxfZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICBpbmRlbnQoaXRlbUx2bCk7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB2YWxpZFR5cGUoX2RhdGFbaV0pID8gX2RhdGFbaV0gOiBudWxsO1xuICAgICAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgICAgICBfc3RyaW5naWZ5KGl0ZW0sIGl0ZW1MdmwsIGl0ZW1QdHIpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ10nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgnW10nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlPYmplY3QoKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9kYXRhKTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgICBvdXQoJ3snKTtcbiAgICAgICAgdmFyIHByb3BMdmwgPSBsdmwgKyAxO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlNYXBTZXQoaXNTZXQpIHtcbiAgICAgIGlmIChfZGF0YS5zaXplKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIHZhciBlbnRyaWVzID0gX2RhdGEuZW50cmllcygpO1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgd2hpbGUgKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICB2YXIga2V5ID0gaXRlbVswXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpc1NldCA/IHRydWUgOiBpdGVtWzFdO1xuICAgICAgICAgIGlmICh2YWxpZFR5cGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoIWZpcnN0KSBvdXQoJywnKTtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICAgICAgICBpbmRlbnQocHJvcEx2bCk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleScpO1xuICAgICAgICAgICAgb3V0KHF1b3RlZChrZXkpKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICAgICAgICBvdXQoJzonKTtcbiAgICAgICAgICAgIGlmICh3aGl0ZXNwYWNlKSBvdXQoJyAnKTtcbiAgICAgICAgICAgIF9zdHJpbmdpZnkodmFsdWUsIHByb3BMdmwsIHByb3BQdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvdXQoc3RyKSB7XG4gICAgY29sdW1uICs9IHN0ci5sZW5ndGg7XG4gICAgcG9zICs9IHN0ci5sZW5ndGg7XG4gICAganNvbiArPSBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBpbmRlbnQobHZsKSB7XG4gICAgaWYgKHdoaXRlc3BhY2UpIHtcbiAgICAgIGpzb24gKz0gJ1xcbicgKyByZXBlYXQobHZsLCB3aGl0ZXNwYWNlKTtcbiAgICAgIGxpbmUrKztcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICB3aGlsZSAobHZsLS0pIHtcbiAgICAgICAgaWYgKHdzTGluZSkge1xuICAgICAgICAgIGxpbmUgKz0gd3NMaW5lO1xuICAgICAgICAgIGNvbHVtbiA9IHdzQ29sdW1uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbiArPSB3c0NvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gd3NQb3M7XG4gICAgICB9XG4gICAgICBwb3MgKz0gMTsgLy8gXFxuIGNoYXJhY3RlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwZWF0KG4sIHN0cikge1xuICAgIHJldHVybiBBcnJheShuICsgMSkuam9pbihzdHIpO1xuICB9XG59O1xuXG5cbnZhciBWQUxJRF9UWVBFUyA9IFsnbnVtYmVyJywgJ2JpZ2ludCcsICdib29sZWFuJywgJ3N0cmluZycsICdvYmplY3QnXTtcbmZ1bmN0aW9uIHZhbGlkVHlwZShkYXRhKSB7XG4gIHJldHVybiBWQUxJRF9UWVBFUy5pbmRleE9mKHR5cGVvZiBkYXRhKSA+PSAwO1xufVxuXG5cbnZhciBFU0NfUVVPVEUgPSAvXCJ8XFxcXC9nO1xudmFyIEVTQ19CID0gL1tcXGJdL2c7XG52YXIgRVNDX0YgPSAvXFxmL2c7XG52YXIgRVNDX04gPSAvXFxuL2c7XG52YXIgRVNDX1IgPSAvXFxyL2c7XG52YXIgRVNDX1QgPSAvXFx0L2c7XG5mdW5jdGlvbiBxdW90ZWQoc3RyKSB7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKEVTQ19RVU9URSwgJ1xcXFwkJicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19GLCAnXFxcXGYnKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfQiwgJ1xcXFxiJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX04sICdcXFxcbicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19SLCAnXFxcXHInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfVCwgJ1xcXFx0Jyk7XG4gIHJldHVybiAnXCInICsgc3RyICsgJ1wiJztcbn1cblxuXG52YXIgRVNDXzAgPSAvfi9nO1xudmFyIEVTQ18xID0gL1xcLy9nO1xuZnVuY3Rpb24gZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShFU0NfMCwgJ34wJylcbiAgICAgICAgICAgIC5yZXBsYWNlKEVTQ18xLCAnfjEnKTtcbn1cbiIsImltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcblxyXG5jb25zdCB7QkxPQ0ssIEVMRU0sIENPTlRFTlQsIE1PRFMsIE1JWCwgRUxFTU1PRFN9ID0gUFJPUFM7XHJcbmNvbnN0IGxvY2F0aW9uS2V5ID0gSnNvblNvdXJjZU1hcC5rZXk7XHJcblxyXG5jbGFzcyBCZW1Ob2RlIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSkge1xyXG4gICAgICAgIHRoaXMuYmxvY2sgPSBub2RlW0JMT0NLXTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBub2RlW0VMRU1dO1xyXG4gICAgICAgIHRoaXMubW9kcyA9IG5vZGVbTU9EU107XHJcbiAgICAgICAgdGhpcy5taXggPSBub2RlW01JWF07XHJcbiAgICAgICAgdGhpcy5lbGVtTW9kcyA9IG5vZGVbRUxFTU1PRFNdXHJcblxyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBub2RlW2xvY2F0aW9uS2V5XTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHRoaXMuYmxvY2sgKyAodGhpcy5lbGVtID8gKGBfXyR7dGhpcy5lbGVtfWApIDogJycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZW1Ob2RlOyIsImltcG9ydCBMaW50RXJyb3IgZnJvbSAnLi9saW50ZXJyb3IuanMnO1xyXG5cclxuY2xhc3MgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuVEVYVF9TSVpFU19TSE9VTERfQkVfRVFVQUwnLCBlcnJvcjogJ9Ci0LXQutGB0YLRiyDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQvdGLINCx0YvRgtGMINC+0LTQvdC+0LPQviDRgNCw0LfQvNC10YDQsC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1NJWkUnLCBlcnJvcjogJ9Cg0LDQt9C80LXRgCDQutC90L7Qv9C60Lgg0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQvdCwIDEg0YjQsNCzINCx0L7Qu9GM0YjQtSDRjdGC0LDQu9C+0L3QvdC+0LPQvi4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX0JVVFRPTl9QT1NJVElPTicsIGVycm9yOiAn0JHQu9C+0LogYnV0dG9uINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/QvtGB0LvQtSDQsdC70L7QutCwIHBsYWNlaG9sZGVyLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX1BMQUNFSE9MREVSX1NJWkUnLCBlcnJvcjogJ9CU0L7Qv9GD0YHRgtC40LzRi9C1INGA0LDQt9C80LXRgNGLINC00LvRjyDQsdC70L7QutCwIHBsYWNlaG9sZGVyINCyINCx0LvQvtC60LUgd2FybmluZzogcywgbSwgbC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0U2V2ZXJhbEgxIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5TRVZFUkFMX0gxJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0L/QtdGA0LLQvtCz0L4g0YPRgNC+0LLQvdGPINC90LAg0YHRgtGA0LDQvdC40YbQtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0LXQtNC40L3RgdGC0LLQtdC90L3Ri9C8LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRJbnZhbGlkSDJQb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuSU5WQUxJRF9IMl9QT1NJVElPTicsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INCy0YLQvtGA0L7Qs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIM1Bvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gzX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0YLRgNC10YLRjNC10LPQviDRg9GA0L7QstC90Y8g0L3QtSDQvNC+0LbQtdGCINC90LDRhdC+0LTQuNGC0YzRgdGPINC/0LXRgNC10LQg0LfQsNCz0L7Qu9C+0LLQutC+0Lwg0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnR1JJRC5UT09fTVVDSF9NQVJLRVRJTkdfQkxPQ0tTJywgZXJyb3I6ICfQnNCw0YDQutC10YLQuNC90LPQvtCy0YvQtSDQsdC70L7QutC4INC90LUg0LzQvtCz0YPRgiDQt9Cw0L3QuNC80LDRgtGMINCx0L7Qu9GM0YjQtSDQv9C+0LvQvtCy0LjQvdGLINC+0YIg0LLRgdC10YUg0LrQvtC70L7QvdC+0Log0LHQu9C+0LrQsCBncmlkJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIFdhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwsXHJcbiAgICBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUsXHJcbiAgICBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uLFxyXG4gICAgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUsXHJcbiAgICBUZXh0U2V2ZXJhbEgxLFxyXG4gICAgVGV4dEludmFsaWRIMlBvc2l0aW9uLFxyXG4gICAgVGV4dEludmFsaWRIM1Bvc2l0aW9uLFxyXG4gICAgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3NcclxufSIsIlxyXG5jbGFzcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3Ioe2NvZGUsIGVycm9yLCBsb2NhdGlvbn0pIHtcclxuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbnRFcnJvcjsiLCJcclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcg0J3QtdGA0LDQt9GA0LXRiNC40LzRi9C1INC+0YjQuNCx0LrQuCwg0L/QvtGB0LvQtSDQutC+0YLQvtGA0YvRhSDQv9GA0LXQutGA0LDRidCw0LXQvCDRgNCw0LHQvtGC0YMuINCY0YUg0YfQuNGB0LvQviDQvNC+0LbQtdGCINGB0L7QutGA0LDRidCw0YLRjNGB0Y9cclxuICog0L/QviDQvNC10YDQtSDQtNC+0LHQsNCy0LvQtdC90LjRjyDQvdC+0LLRi9GFINC/0YDQsNCy0LjQuyDQsiDQu9C40L3RgtC10YAuXHJcbiAqL1xyXG5jbGFzcyBJbnZhbGlkSW5wdXQgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkludmFsaWQgaW5wdXRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5vVGV4dE5vZGUgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkF0IGxlYXN0IDEgdGV4dCBub2RlIGV4cGVjdGVkXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgSW52YWxpZElucHV0LFxyXG4gICAgTm9UZXh0Tm9kZVxyXG59IiwiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcg0JDQtNCw0L/RgtC10YAg0YTRg9C90LrRhtC40LggcGFyc2Ug0LjQtyDQsdC40LHQu9C40L7RgtC10LrQuCBqc29uLXNvdXJjZS1tYXBcclxuICovXHJcblxyXG5pbXBvcnQge3BhcnNlfSBmcm9tICdqc29uLXNvdXJjZS1tYXAnO1xyXG5pbXBvcnQgUFJPUFMgZnJvbSAnLi9wcm9wbmFtZXMuanMnO1xyXG5pbXBvcnQge0ludmFsaWRJbnB1dH0gZnJvbSBcIi4vZXJyb3Ivc3lzdGVtLmpzXCI7XHJcblxyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcblxyXG5jb25zdCBwb3NpdGlvbktleSA9IFN5bWJvbCgnUG9zaXRpb24nKTtcclxuXHJcbmNsYXNzIEpzb25Tb3VyY2VNYXAge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN0cikge1xyXG4gICAgICAgIHRoaXMuc3RyID0gc3RyO1xyXG4gICAgICAgIHRoaXMuanNvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wb2ludGVycyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SnNvbiA9ICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZSh0aGlzLnN0cik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmpzb24gPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludGVycyA9IHJlc3VsdC5wb2ludGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZElucHV0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGNoKHRoaXMuanNvbiwgJycpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYXRjaCA9IChub2RlLCBwYXRoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCB2YWx1ZUVuZH0gPSB0aGlzLnBvaW50ZXJzW3BhdGhdO1xyXG5cclxuICAgICAgICAvLyArMSDQuiBjb2wsINGCLtC6LiDQsdC40LHQu9C40L7RgtC10LrQsCDQstC10LTQtdGCINC+0YLRgdGH0LXRgiDQvtGCIDAuXHJcbiAgICAgICAgLy8g0J/RgNC4INGN0YLQvtC8IGxpbmUg0LHQtdC3INC40LfQvNC10L3QtdC90LjRjywg0YIu0LouINC40YHRhdC+0LTQvdGL0LkgSlNPTiDQvtCx0LXRgNC90YPQu9C4ICjQv9C+0LvQvtC20LjQu9C4INCy0L3Rg9GC0YDRjCDRgdCy0L7QudGB0YLQstCwIFwiY29udGVudFwiKVxyXG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IFt2YWx1ZSwgdmFsdWVFbmRdLm1hcCh2YWwgPT4gKHtsaW5lOiB2YWwubGluZSwgY29sdW1uOiB2YWwuY29sdW1uICsgMX0pKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGVbQ09OVEVOVF07XHJcblxyXG4gICAgICAgIG5vZGVbcG9zaXRpb25LZXldID0ge3N0YXJ0LCBlbmR9O1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkcmVuKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKGNoaWxkLCBgJHtwYXRofS8ke0NPTlRFTlR9LyR7aW5kfWApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGRyZW4sIGAke3BhdGh9LyR7Q09OVEVOVH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBrZXkgPSBwb3NpdGlvbktleTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSnNvblNvdXJjZU1hcDsiLCJpbXBvcnQgUFJPUFMgZnJvbSBcIi4vcHJvcG5hbWVzLmpzXCI7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcbmltcG9ydCBCZW1Ob2RlIGZyb20gJy4vYmVtbm9kZS5qcyc7XHJcbmltcG9ydCBSdWxlTWVkaWF0b3IgZnJvbSAnLi9ydWxlcy9ydWxlbWVkaWF0b3IuanMnO1xyXG5pbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4vcnVsZXMvcnVsZWJhc2UuanNcIjtcclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgTGludGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTwhUnVsZUJhc2U+fSBydWxlQ2xhc3Nlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihydWxlQ2xhc3NlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlQ2xhc3NlcyA9IHJ1bGVDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBsaW50KHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdHJpbmdUcmVlID0gdGhpcy5hdHRhY2hSb290KHN0cik7XHJcbiAgICAgICAgY29uc3QgbWFwcGVyID0gbmV3IEpzb25Tb3VyY2VNYXAoc3RyaW5nVHJlZSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG1hcHBlci5nZXRKc29uKHN0cmluZ1RyZWUpO1xyXG5cclxuICAgICAgICB0aGlzLm5leHQocm9vdCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsKHBoYXNlcy5lbmQpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGZpbHRlciBlcnJvcnNcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCBydWxlc0luc3RhbmNlcyA9IHRoaXMucnVsZUNsYXNzZXMubWFwKHJDbGFzcyA9PiBuZXcgckNsYXNzKCkpO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbmV3IFJ1bGVNZWRpYXRvcihydWxlc0luc3RhbmNlcyk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDQktGF0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC+0LHRitC10LrRgtC+0Lwg0LjQu9C4INC80LDRgdGB0LjQstC+0LwgKNC00LXRgNC10LLQviDQuNC70Lgg0LvQtdGBKS4g0JTQvtCx0LDQstC40Lwg0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQutC+0YDQtdC90YwsINCy0YHQtdCz0LTQsCDQsdGL0LvQviDQtNC10YDQtdCy0L4uICovXHJcbiAgICBhdHRhY2hSb290ID0gc3RyID0+IGB7XCIke0NPTlRFTlR9XCI6XFxuJHtzdHJ9XFxufWA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICovXHJcbiAgICBuZXh0ID0gKG5vZGUpID0+IHtcclxuICAgICAgICBjb25zdCBiZW1Ob2RlID0gbmV3IEJlbU5vZGUobm9kZSk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNvbnRlbnRBc0FycmF5KG5vZGVbQ09OVEVOVF0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLmluLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLm91dCwgYmVtTm9kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGwocGhhc2UsIGJlbU5vZGUpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGwocGhhc2UsIGJlbU5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxBbGwocGhhc2UpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGxBbGwocGhhc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVycm9ycyhlcnJvcnMpIHtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFsuLi5lcnJvcnMsIC4uLnRoaXMuZXJyb3JzXTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50QXNBcnJheShlbCkge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG5cclxuICAgICAgICByZXR1cm4gZWwgPyBbZWxdIDogW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbnRlcjsiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBCTE9DSzogXCJibG9ja1wiLFxyXG4gICAgRUxFTTogXCJlbGVtXCIsXHJcbiAgICBDT05URU5UOiBcImNvbnRlbnRcIixcclxuICAgIE1PRFM6IFwibW9kc1wiLFxyXG4gICAgTUlYOiBcIm1peFwiLFxyXG4gICAgRUxFTU1PRFM6ICdlbGVtTW9kcydcclxufTsiLCJpbXBvcnQgVGV4dFNpemVzIGZyb20gJy4vd2FybmluZy90ZXh0c2l6ZXMuanMnXHJcbmltcG9ydCBCdXR0b25TaXplIGZyb20gJy4vd2FybmluZy9idXR0b25zaXplLmpzJ1xyXG5pbXBvcnQgQnV0dG9uUG9zaXRpb24gZnJvbSAnLi93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzJ1xyXG5pbXBvcnQgUGxhY2Vob2xkZXJTaXplIGZyb20gJy4vd2FybmluZy9wbGFjZWhvbGRlcnNpemUuanMnXHJcbmltcG9ydCBTZXZlcmFsSDEgZnJvbSAnLi90ZXh0L3NldmVyYWxoMS5qcydcclxuaW1wb3J0IEgxSDIgZnJvbSAnLi90ZXh0L2gxaDIuanMnXHJcbmltcG9ydCBIMkgzIGZyb20gJy4vdGV4dC9oMmgzLmpzJ1xyXG5pbXBvcnQgVG9vTXVjaCBmcm9tICcuL21hcmtldGluZy90b29tdWNoLmpzJ1xyXG5cclxuY29uc3QgcnVsZXMgPSBbXHJcbiAgICBUZXh0U2l6ZXMsIEJ1dHRvblNpemUsIEJ1dHRvblBvc2l0aW9uLCBQbGFjZWhvbGRlclNpemUsXHJcbiAgICBTZXZlcmFsSDEsIEgxSDIsIEgySDMsXHJcbiAgICBUb29NdWNoXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlczsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblNpemV9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuaW1wb3J0IHtOb1RleHROb2RlfSBmcm9tIFwiLi4vLi4vZXJyb3Ivc3lzdGVtLmpzXCI7XHJcbmltcG9ydCB7R3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3N9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3RcIjtcclxuXHJcbmNvbnN0IG1hcmtldGluZ0Jsb2NrcyA9IFsnY29tbWVyY2lhbCcsICdvZmZlciddO1xyXG5cclxuY2xhc3MgVG9vTXVjaCBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnZ3JpZCcsICdncmlkX19mcmFjdGlvbicsIC4uLm1hcmtldGluZ0Jsb2Nrc10pO1xyXG5cclxuICAgICAgICB0aGlzLmdyaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAodGhpcy5ncmlkICYmIG5vZGUuc2VsZWN0b3IgPT09ICdncmlkX19mcmFjdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkRnJhY3Rpb24gPSBub2RlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdncmlkJykge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSBub2RlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmdyaWRGcmFjdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplID0gK2dldCh0aGlzLmdyaWRGcmFjdGlvbi5lbGVtTW9kcywgJ20tY29sJyk7XHJcblxyXG4gICAgICAgIGlmIChtYXJrZXRpbmdCbG9ja3MuaW5jbHVkZXMobm9kZS5ibG9jaykpXHJcbiAgICAgICAgICAgIHRoaXMudG90YWxNYXJrZXRpbmcgKz0gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLnNlbGVjdG9yID09PSAnZ3JpZF9fZnJhY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEZyYWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnZ3JpZCcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZnVsbFNpemUgPSArZ2V0KG5vZGUubW9kcywgJ20tY29sdW1ucycpO1xyXG4gICAgICAgIGxldCBlcnJvcjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxNYXJrZXRpbmcgKiAyID49IGZ1bGxTaXplKVxyXG4gICAgICAgICAgICBlcnJvciA9IG5ldyBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrcyhub2RlLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdyaWRGcmFjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50b3RhbE1hcmtldGluZyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbEluZm8gPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvb011Y2g7IiwiXHJcbmNsYXNzIFJ1bGVCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICog0J3QsNCx0L7RgCDRgdC10LvQtdC60YLQvtGA0L7QsiAoQmVtTm9kZS5zZWxlY3Rvcikg0YPQt9C70L7Qsiwg0L3QsCDQutC+0YLQvtGA0YvRhSDQsdGD0LTQtdGCINGB0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L/RgNCw0LLQuNC70L4uXHJcbiAgICAgKiDQldGB0LvQuCDQvdC1INC30LDQtNCw0L0gLSDQsdGD0LTQtdGCINGB0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L3QsCDQutCw0LbQtNC+0Lwg0YPQt9C70LUgKFRPRE8pLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2VsZWN0b3JzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9ycyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSBzZWxlY3RvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VsZWN0b3JzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge09iamVjdDxSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzLCBSdWxlQmFzZS5IYW5kbGVyVHlwZT59XHJcbiAgICAgKi9cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgLy8gVE9ETyBlcnJvciBlbWl0dGluZ1xyXG4gICAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBAZW51bXtzdHJpbmd9ICovXHJcblJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMgPSB7XHJcbiAgICAvKiDQktGF0L7QtNC40Lwg0LIg0L7Rh9C10YDQtdC00L3QvtC5INGD0LfQtdC7INC00LXRgNC10LLQsCovXHJcbiAgICBpbjogJ2luJyxcclxuICAgIC8qINCS0YvRhdC+0LTQuNC8ICovXHJcbiAgICBvdXQ6ICdvdXQnLFxyXG4gICAgLyog0JfQsNC60LDQvdGH0LjQstCw0LXQvCDQvtCx0YXQvtC0INC00LXRgNC10LLQsCAqL1xyXG4gICAgZW5kOiAnZW5kJ1xyXG59O1xyXG5cclxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihCZW1Ob2RlKTogKCFMaW50RXJyb3J8dW5kZWZpbmVkKX0gKi9cclxuUnVsZUJhc2UuSGFuZGxlclR5cGU7XHJcblxyXG4vKiogQHR5cGVkZWYge09iamVjdDxSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzLCBPYmplY3Q8c3RyaW5nLCBSdWxlQmFzZS5IYW5kbGVyVHlwZT4+fSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyc01hcFR5cGU7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZUJhc2U7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gJy4vcnVsZWJhc2UuanMnO1xyXG5cclxuY29uc3QgcGhhc2VzID0gUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcztcclxuXHJcbmNsYXNzIFJ1bGVNZWRpYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMgPSBydWxlcztcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyc01hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuYnVpbGRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZE1hcCgpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHJ1bGUuZ2V0U2VsZWN0b3JzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJzTWFwID0gcnVsZS5nZXRQaGFzZUhhbmRsZXJzTWFwKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBwaGFzZSBpbiBoYW5kbGVyc01hcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzTWFwW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhbmRsZXJzTWFwW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzTWFwW2tleV0ucHVzaChoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRLZXkocGhhc2UsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHBoYXNlICsgJyQnICsgc2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheTwhTGludEVycm9yPn1cclxuICAgICAqL1xyXG4gICAgY2FsbChwaGFzZSwgYmVtTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5KHBoYXNlLCBiZW1Ob2RlLnNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBba2V5XSB8fCBbXTtcclxuICAgICAgICBsZXQgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJFcnJvcnMgPSBoYW5kbGVyKGJlbU5vZGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFoYW5kbGVyRXJyb3JzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFuZGxlckVycm9ycykpXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBbLi4uaGFuZGxlckVycm9ycywgLi4uZXJyb3JzXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goaGFuZGxlckVycm9ycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEFsbChwaGFzZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKVtwaGFzZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFuZGxlcilcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGhhbmRsZXIobnVsbCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZU1lZGlhdG9yOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgSDFIMiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgdGhpcy5oMk5vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5oMXdhcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0eXBlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDJOb2Rlcy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETyDQn9GA0L7QtNC+0LvQttCw0LXQvCDQsNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtC+0LvRjNC60L4g0LTQviDQv9C10YDQstC+0LPQviBoMVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDEnICYmICF0aGlzLmgxd2FzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDF3YXMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLmgyTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRleHRJbnZhbGlkSDJQb3NpdGlvbihub2RlLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9ycy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSDFIMjsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0SW52YWxpZEgzUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcblxyXG4vLyBUT0RPINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4gSDIg0LXQtNC40L3RgdGC0LLQtdC90L3Ri9C5ICjRhdC+0YLRjyDQsiDQvtCx0YnQtdC8INGB0LvRg9GH0LDQtSDRjdGC0L4g0L3QtSDRgtCw0LopLiDQmNC90LDRh9C1INGC0LDQutCw0Y8g0LbQtSDQv9GA0L7QsdC70LXQvNCwLCDRh9GC0L4g0Lgg0LIgYnV0dG9ucG9zaXRpb24uanNcclxuLy8g0J/QvtGN0YLQvtC80YMg0L/RgNC+0YHRgtC+INC60L7Qv9C40L/QsNGB0YLQuNC8INGC0LXRgdGCIGgxaDJcclxuY2xhc3MgSDJIMyBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsndGV4dCddKTtcclxuXHJcbiAgICAgICAgdGhpcy5oM05vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5oMndhcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0KG5vZGUubW9kcywgJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0eXBlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDMnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDNOb2Rlcy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETyDQn9GA0L7QtNC+0LvQttCw0LXQvCDQsNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtC+0LvRjNC60L4g0LTQviDQv9C10YDQstC+0LPQviBoMlxyXG4gICAgICAgIGlmICh0eXBlID09PSAnaDInICYmICF0aGlzLmgyd2FzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaDJ3YXMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLmgzTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRleHRJbnZhbGlkSDNQb3NpdGlvbihub2RlLmxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9ycy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSDJIMzsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtUZXh0U2V2ZXJhbEgxfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5cclxuY2xhc3MgU2V2ZXJhbEgxIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICB0aGlzLmgxd2FzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSAhPT0gJ2gxJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaDF3YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5oMXdhcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHRTZXZlcmFsSDEobm9kZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldmVyYWxIMTsiLCJcclxuY29uc3Qgc2l6ZXNTY2FsZSA9IFtcInh4eHNcIiwgXCJ4eHNcIiwgXCJ4c1wiLCBcInNcIiwgXCJtXCIsIFwibFwiLCBcInhsXCIsIFwieHhsXCIsIFwieHh4bFwiLCBcInh4eHhsXCIsIFwieHh4eHhsXCJdO1xyXG5cclxuY2xhc3MgU2l6ZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICovXHJcbiAgICBhZGQoY291bnQpIHtcclxuICAgICAgICBsZXQgaW5kID0gc2l6ZXNTY2FsZS5pbmRleE9mKHRoaXMuc2l6ZSk7XHJcblxyXG4gICAgICAgIGlmICh+aW5kKVxyXG4gICAgICAgICAgICBpbmQgPSBpbmQgKyBjb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZXNTY2FsZVtpbmRdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjaGVjayhzaXplQikge1xyXG4gICAgICAgIHJldHVybiAhISh0aGlzLnNpemUgJiYgc2l6ZUIpICYmIHRoaXMuc2l6ZSA9PT0gc2l6ZUI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc0RlZih4KSB7XHJcbiAgICByZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KG9iaiwgLi4ucHJvcHMpIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSAvLyDRhNGD0L3QutGG0LjQuCDQvdC1INC/0YDQtdC00L/QvtC70LDQs9Cw0Y7RgtGB0Y9cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGxldCBjdXJyZW50ID0gb2JqO1xyXG5cclxuICAgIGZvciAobGV0IHByb3Agb2YgcHJvcHMpIHtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0RlZihwcm9wKSlcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBTaXplLFxyXG4gICAgZ2V0XHJcbn0iLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBCdXR0b25Qb3NpdGlvbiBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAncGxhY2Vob2xkZXInXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzID0gbmV3IE1hcCgpOyAvLyDRhdGA0LDQvdC40LwgMSBwbGFjZWhvbGRlclxyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIGJ1dHRvblxyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVE9ETyDRgdGH0LjRgtCw0LXQvCwg0YfRgtC+INCyINCx0LvQvtC60LUgd2FybmluZyDQvdC1INCx0L7Qu9C10LUgMSBidXR0b24g0Lgg0L3QtSDQsdC+0LvQtdC1IDEgcGxhY2Vob2xlciAo0YXQvtGC0Y8g0Y3RgtC+INC90LUg0L7QsdGP0LfQsNC90L4g0LHRi9GC0Ywg0YLQsNC6KVxyXG4gICAgICAgIC8vINCSINC/0YDQvtGC0LjQstC90L7QvCDRgdC70YPRh9Cw0LUsINC90LXQv9C+0L3Rj9GC0L3QviDQutCw0Log0LjRhSDQvNCw0YLRh9C40YLRjCDQtNGA0YPQsyDRgSDQtNGA0YPQs9C+0LwgKNC90LDQv9GA0LjQvNC10YAg0LIg0YLQsNC60L7QuSDRgdC40YLRg9Cw0YbQuNC4OiBidXR0b24sIHBsYWNlaG9sZGVyLCBidXR0b24pXHJcbiAgICAgICAgLy8g0LgsINGB0L7QvtGC0LLQtdGC0YHRgtCy0LXQvdC90L4sINCy0YvQtNCw0LLQsNGC0Ywg0L7RiNC40LHQutC4XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdwbGFjZWhvbGRlcicpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyTm9kZXMuaGFzKHdhcm5pbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZhbGlkQnV0dG9uID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW52YWxpZEJ1dHRvbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24oaW52YWxpZEJ1dHRvbi5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblBvc2l0aW9uOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5pbXBvcnQge05vVGV4dE5vZGV9IGZyb20gXCIuLi8uLi9lcnJvci9zeXN0ZW0uanNcIjtcclxuaW1wb3J0IHtUZXh0SW52YWxpZEgyUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3RcIjtcclxuXHJcbmNsYXNzIEJ1dHRvblNpemUgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAnYnV0dG9uJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlcyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHROb2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbk5vZGVzID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGJ1dHRvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0VGV4dE5vZGUgPSB0aGlzLnRleHROb2Rlcy5nZXQod2FybmluZyk7XHJcbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuYnV0dG9uTm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBpZiAoIWJ1dHRvbnMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICAvLyBUT0RPINC/0YDQtdC00L/QvtC70LDQs9Cw0LXQvCwg0YfRgtC+INGC0LXQutGB0YLQvtCy0YvQtSDQvdC+0LTRiyDQvtCx0Y/Qt9Cw0L3RiyDQsdGL0YLRjCwg0YIu0LouINC40L3QsNGH0LUg0Y3RgtCw0LvQvtC90L3Ri9C5INGA0LDQt9C80LXRgCDQvdC1INC+0L/RgNC10LTQtdC70LXQvSDQuCDQv9C+0LXQtNGD0YIg0LTRgNGD0LPQuNC1INC/0YDQsNCy0LjQu9CwLiDQn9GA0L7QstC10YDQuNGC0Ywg0L/RgNC10LTQv9C+0LvQvtC20LXQvdC40LUuXHJcbiAgICAgICAgaWYgKCFmaXJzdFRleHROb2RlKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9UZXh0Tm9kZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdFRleHROb2RlLm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgc2l6ZS5hZGQoMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldChidXR0b24ubW9kcywgJ3NpemUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZS5jaGVjayhzaXplVmFsQikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZShidXR0b24ubG9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNpemU7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemV9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNvbnN0IGNvcnJlY3RTaXplcyA9IFsncycsICdtJywgJ2wnXTtcclxuXHJcbmNsYXNzIFBsYWNlaG9sZGVyU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdwbGFjZWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGdldChub2RlLm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3QgaW5kID0gY29ycmVjdFNpemVzLmluZGV4T2Yoc2l6ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGluZCA9PT0gLTEpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUobm9kZS5sb2NhdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxhY2Vob2xkZXJTaXplOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWx9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuaW1wb3J0IHtOb1RleHROb2RlfSBmcm9tIFwiLi4vLi4vZXJyb3Ivc3lzdGVtLmpzXCI7XHJcblxyXG5jbGFzcyBUZXh0U2l6ZXMgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAndGV4dCddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnRleHROb2RlcyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50ZXh0Tm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICB0aGlzLnRleHROb2Rlcy5zZXQod2FybmluZywgW10pO1xyXG5cclxuICAgICAgICBjb25zdCB0ZXh0Tm9kZXMgPSB0aGlzLnRleHROb2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIHRleHROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuICAgICAgICBjb25zdCB0ZXh0Tm9kZXMgPSB0aGlzLnRleHROb2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETyBlcnJvciBlbWl0dGluZ1xyXG4gICAgICAgIC8vIFRPRE8g0L/RgNC10LTQv9C+0LvQsNCz0LDQtdC8LCDRh9GC0L4g0YLQtdC60YHRgtC+0LLRi9C1INC90L7QtNGLINC+0LHRj9C30LDQvdGLINCx0YvRgtGMLCDRgi7Qui4g0LjQvdCw0YfQtSDRjdGC0LDQu9C+0L3QvdGL0Lkg0YDQsNC30LzQtdGAINC90LUg0L7Qv9GA0LXQtNC10LvQtdC9INC4INC/0L7QtdC00YPRgiDQtNGA0YPQs9C40LUg0L/RgNCw0LLQuNC70LAuINCf0YDQvtCy0LXRgNC40YLRjCDQv9GA0LXQtNC/0L7Qu9C+0LbQtdC90LjQtS5cclxuICAgICAgICBpZiAoIXRleHROb2RlcylcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGV4dE5vZGUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgW2ZpcnN0LCAuLi5vdGhlcl0gPSB0ZXh0Tm9kZXM7XHJcbiAgICAgICAgY29uc3Qgc2l6ZVZhbEEgPSBnZXQoZmlyc3QubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBzaXplID0gbmV3IFNpemUoc2l6ZVZhbEEpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB0ZXh0IG9mIG90aGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemVWYWxCID0gZ2V0KHRleHQubW9kcywgJ3NpemUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vINCU0LDQttC1INC10YHQu9C4INCyINGA0LDQvNC60LDRhSDQvtC00L3QvtCz0L4g0LHQu9C+0LrQsCDQvdC10YHQutC+0LvRjNC60L4g0L7RiNC40LHQvtGH0L3Ri9GFINGB0LvQvtCyLCDRgtC+INCy0L7QstGA0LDRidCw0LXQvCDQvtC00L3RgyDQvtGI0LjQsdC60YMuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZS5jaGVjayhzaXplVmFsQikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwobm9kZS5sb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFNpemVzOyJdLCJzb3VyY2VSb290IjoiIn0=