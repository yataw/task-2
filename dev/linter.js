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
/* harmony import */ var _testcases_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./testcases.js */ "./testcases.js");

 // TODO for test


const linter = new _src_linter_js__WEBPACK_IMPORTED_MODULE_0__["default"](_src_rules_list_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

window.lint = function (str) {
  return linter.lint(str);
}; // TODO for test


_testcases_js__WEBPACK_IMPORTED_MODULE_2__["tests"].forEach(test => {
  const res = window.lint(test);
  console.log(res);
});

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

/***/ }),

/***/ "./testcases.js":
/*!**********************!*\
  !*** ./testcases.js ***!
  \**********************/
/*! exports provided: tests, answers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tests", function() { return tests; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "answers", function() { return answers; });
const tests = [`
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "l"}}
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "m"}}
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "m"}},
        {
            "block": "warning",
            "content": [
                {"block": "text", "mods": {"size": "l"}},
                {"block": "text", "mods": {"size": "m"}}
            ]
        }
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "l"}},
        {
            "block": "warning",
            "content": [
                {"block": "text", "mods": {"size": "l"}},
                {"block": "text", "mods": {"size": "m"}},
                {
                    "block": "warning",
                    "content": [
                        {"block": "text", "mods": {"size": "m"}},
                        {"block": "text", "mods": {"size": "m"}},
                        {
                            "block": "warning",
                            "content": [
                                {"block": "text", "mods": {"size": "l"}},
                                {"block": "text", "mods": {"size": "m"}}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } }
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } }
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        {"block": "text", "mods": {"size": "l"}},
        { "block": "button", "mods": { "size": "m" } }
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        {"block": "text", "mods": {"size": "l"}},
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}
    `];
const answers = {};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGViYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlbWVkaWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvdGV4dHNpemVzLmpzIiwid2VicGFjazovLy8uL3Rlc3RjYXNlcy5qcyJdLCJuYW1lcyI6WyJsaW50ZXIiLCJMaW50ZXIiLCJydWxlcyIsIndpbmRvdyIsImxpbnQiLCJzdHIiLCJ0ZXN0cyIsImZvckVhY2giLCJ0ZXN0IiwicmVzIiwiY29uc29sZSIsImxvZyIsIkJMT0NLIiwiRUxFTSIsIkNPTlRFTlQiLCJNT0RTIiwiTUlYIiwiUFJPUFMiLCJsb2NhdGlvbktleSIsIkpzb25Tb3VyY2VNYXAiLCJrZXkiLCJCZW1Ob2RlIiwiY29uc3RydWN0b3IiLCJub2RlIiwiYmxvY2siLCJlbGVtIiwibW9kcyIsIm1peCIsImxvY2F0aW9uIiwic2VsZWN0b3IiLCJXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIiwiTGludEVycm9yIiwiY29kZSIsImVycm9yIiwiV2FybmluZ0ludmFsaWRCdXR0b25TaXplIiwiV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbiIsIldhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplIiwiVGV4dFNldmVyYWxIMSIsIlRleHRJbnZhbGlkSDJQb3NpdGlvbiIsIlRleHRJbnZhbGlkSDNQb3NpdGlvbiIsIkdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzIiwiSW52YWxpZElucHV0IiwiRXJyb3IiLCJOb1RleHROb2RlIiwicG9zaXRpb25LZXkiLCJTeW1ib2wiLCJyZXN1bHQiLCJwYXJzZSIsImpzb24iLCJkYXRhIiwicG9pbnRlcnMiLCJlIiwibWF0Y2giLCJwYXRoIiwidmFsdWUiLCJ2YWx1ZUVuZCIsInN0YXJ0IiwiZW5kIiwibWFwIiwidmFsIiwibGluZSIsImNvbHVtbiIsImNoaWxkcmVuIiwiQXJyYXkiLCJpc0FycmF5IiwiY2hpbGQiLCJpbmQiLCJwaGFzZXMiLCJSdWxlQmFzZSIsInByb3RvdHlwZSIsInJ1bGVDbGFzc2VzIiwiYmVtTm9kZSIsImNvbnRlbnRBc0FycmF5IiwiY2FsbCIsImluIiwibmV4dCIsIm91dCIsIm1lZGlhdG9yIiwiZXJyb3JzIiwiaW5pdCIsInN0cmluZ1RyZWUiLCJhdHRhY2hSb290IiwibWFwcGVyIiwicm9vdCIsImdldEpzb24iLCJjYWxsQWxsIiwicnVsZXNJbnN0YW5jZXMiLCJyQ2xhc3MiLCJSdWxlTWVkaWF0b3IiLCJwaGFzZSIsImFkZEVycm9ycyIsImVsIiwiVGV4dFNpemVzIiwiQnV0dG9uU2l6ZSIsIkJ1dHRvblBvc2l0aW9uIiwic2VsZWN0b3JzIiwiZ2V0U2VsZWN0b3JzIiwiZ2V0UGhhc2VIYW5kbGVyc01hcCIsIkhhbmRsZXJUeXBlIiwiSGFuZGxlcnNNYXBUeXBlIiwiaGFuZGxlcnNNYXAiLCJidWlsZE1hcCIsInJ1bGUiLCJoYW5kbGVyIiwiZ2V0S2V5IiwicHVzaCIsImhhbmRsZXJzIiwiZmlsdGVyIiwic2l6ZXNTY2FsZSIsIlNpemUiLCJzaXplIiwiYWRkIiwiY291bnQiLCJpbmRleE9mIiwiY2hlY2siLCJzaXplQiIsImlzRGVmIiwieCIsInVuZGVmaW5lZCIsImdldCIsIm9iaiIsInByb3BzIiwiY3VycmVudCIsInByb3AiLCJ3YXJuaW5ncyIsInBsYWNlaG9sZGVyTm9kZXMiLCJNYXAiLCJidXR0b25Ob2RlcyIsImJpbmQiLCJ3YXJuaW5nIiwiZ2V0TGFzdFdhcm5pbmciLCJoYXMiLCJzZXQiLCJwb3AiLCJkZWxldGUiLCJsZW5ndGgiLCJ0ZXh0Tm9kZXMiLCJmaXJzdFRleHROb2RlIiwiYnV0dG9ucyIsInNpemVWYWxBIiwiYnV0dG9uIiwic2l6ZVZhbEIiLCJmaXJzdCIsIm90aGVyIiwidGV4dCIsImFuc3dlcnMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FB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Yjs7QUFFQSxTQUFLLElBQUlLLElBQVQsSUFBaUJELEtBQWpCLEVBQXdCO0FBQ3BCLFlBQU1GLFFBQVEsR0FBR3RCLHFEQUFHLENBQUN5QixJQUFJLENBQUN0SCxJQUFOLEVBQVksTUFBWixDQUFwQixDQURvQixDQUdwQjs7QUFDQSxVQUFJLENBQUNvRixJQUFJLENBQUNJLEtBQUwsQ0FBVzJCLFFBQVgsQ0FBTCxFQUNJLE9BQU8sSUFBSS9HLGdGQUFKLENBQWlDUCxJQUFJLENBQUNLLFFBQXRDLENBQVA7QUFDUDtBQUNKOztBQUVEc0csZ0JBQWMsR0FBRztBQUNiLFVBQU1LLE1BQU0sR0FBRyxLQUFLWCxRQUFMLENBQWNXLE1BQTdCO0FBRUEsV0FBTyxLQUFLWCxRQUFMLENBQWNXLE1BQU0sR0FBRyxDQUF2QixDQUFQO0FBQ0g7O0FBbkU0Qjs7QUFzRWxCM0Msd0VBQWYsRTs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFBQTtBQUFBLE1BQU10RixLQUFLLEdBQUcsQ0FDVDs7Ozs7Ozs7S0FEUyxFQVdUOzs7Ozs7OztLQVhTLEVBcUJUOzs7Ozs7Ozs7Ozs7Ozs7S0FyQlMsRUF1Q1Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdkNTLEVBc0VUOzs7Ozs7OztLQXRFUyxFQWdGVDs7Ozs7Ozs7S0FoRlMsRUEwRlQ7Ozs7Ozs7OztLQTFGUyxFQXFHVDs7Ozs7Ozs7O0tBckdTLENBQWQ7QUFpSEEsTUFBTTJJLE9BQU8sR0FBRyxFQUFoQiIsImZpbGUiOiJsaW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IExpbnRlciBmcm9tICcuL3NyYy9saW50ZXIuanMnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9zcmMvcnVsZXMvbGlzdC5qcydcclxuXHJcbi8vIFRPRE8gZm9yIHRlc3RcclxuaW1wb3J0IHt0ZXN0cywgYW5zd2Vyc30gZnJvbSBcIi4vdGVzdGNhc2VzLmpzXCI7XHJcblxyXG5jb25zdCBsaW50ZXIgPSBuZXcgTGludGVyKHJ1bGVzKTtcclxuXHJcbndpbmRvdy5saW50ID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbGludGVyLmxpbnQoc3RyKTtcclxufTtcclxuXHJcbi8vIFRPRE8gZm9yIHRlc3RcclxuXHJcbnRlc3RzLmZvckVhY2godGVzdCA9PiB7XHJcbiAgICBjb25zdCByZXMgPSB3aW5kb3cubGludCh0ZXN0KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG59KVxyXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlc2NhcGVkQ2hhcnMgPSB7XG4gICdiJzogJ1xcYicsXG4gICdmJzogJ1xcZicsXG4gICduJzogJ1xcbicsXG4gICdyJzogJ1xccicsXG4gICd0JzogJ1xcdCcsXG4gICdcIic6ICdcIicsXG4gICcvJzogJy8nLFxuICAnXFxcXCc6ICdcXFxcJ1xufTtcblxudmFyIEFfQ09ERSA9ICdhJy5jaGFyQ29kZUF0KCk7XG5cblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIChzb3VyY2UsIF8sIG9wdGlvbnMpIHtcbiAgdmFyIHBvaW50ZXJzID0ge307XG4gIHZhciBsaW5lID0gMDtcbiAgdmFyIGNvbHVtbiA9IDA7XG4gIHZhciBwb3MgPSAwO1xuICB2YXIgYmlnaW50ID0gb3B0aW9ucyAmJiBvcHRpb25zLmJpZ2ludCAmJiB0eXBlb2YgQmlnSW50ICE9ICd1bmRlZmluZWQnO1xuICByZXR1cm4ge1xuICAgIGRhdGE6IF9wYXJzZSgnJywgdHJ1ZSksXG4gICAgcG9pbnRlcnM6IHBvaW50ZXJzXG4gIH07XG5cbiAgZnVuY3Rpb24gX3BhcnNlKHB0ciwgdG9wTGV2ZWwpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIGRhdGE7XG4gICAgbWFwKHB0ciwgJ3ZhbHVlJyk7XG4gICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICBjYXNlICd0JzogcmVhZCgncnVlJyk7IGRhdGEgPSB0cnVlOyBicmVhaztcbiAgICAgIGNhc2UgJ2YnOiByZWFkKCdhbHNlJyk7IGRhdGEgPSBmYWxzZTsgYnJlYWs7XG4gICAgICBjYXNlICduJzogcmVhZCgndWxsJyk7IGRhdGEgPSBudWxsOyBicmVhaztcbiAgICAgIGNhc2UgJ1wiJzogZGF0YSA9IHBhcnNlU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgY2FzZSAnWyc6IGRhdGEgPSBwYXJzZUFycmF5KHB0cik7IGJyZWFrO1xuICAgICAgY2FzZSAneyc6IGRhdGEgPSBwYXJzZU9iamVjdChwdHIpOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJhY2tDaGFyKCk7XG4gICAgICAgIGlmICgnLTAxMjM0NTY3ODknLmluZGV4T2YoY2hhcikgPj0gMClcbiAgICAgICAgICBkYXRhID0gcGFyc2VOdW1iZXIoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICAgIH1cbiAgICBtYXAocHRyLCAndmFsdWVFbmQnKTtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgaWYgKHRvcExldmVsICYmIHBvcyA8IHNvdXJjZS5sZW5ndGgpIHVuZXhwZWN0ZWRUb2tlbigpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gd2hpdGVzcGFjZSgpIHtcbiAgICBsb29wOlxuICAgICAgd2hpbGUgKHBvcyA8IHNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgc3dpdGNoIChzb3VyY2VbcG9zXSkge1xuICAgICAgICAgIGNhc2UgJyAnOiBjb2x1bW4rKzsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFx0JzogY29sdW1uICs9IDQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xccic6IGNvbHVtbiA9IDA7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcbic6IGNvbHVtbiA9IDA7IGxpbmUrKzsgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogYnJlYWsgbG9vcDtcbiAgICAgICAgfVxuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU3RyaW5nKCkge1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgY2hhcjtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICdcIicpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT0gJ1xcXFwnKSB7XG4gICAgICAgIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICAgIGlmIChjaGFyIGluIGVzY2FwZWRDaGFycylcbiAgICAgICAgICBzdHIgKz0gZXNjYXBlZENoYXJzW2NoYXJdO1xuICAgICAgICBlbHNlIGlmIChjaGFyID09ICd1JylcbiAgICAgICAgICBzdHIgKz0gZ2V0Q2hhckNvZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyICs9IGNoYXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU51bWJlcigpIHtcbiAgICB2YXIgbnVtU3RyID0gJyc7XG4gICAgdmFyIGludGVnZXIgPSB0cnVlO1xuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnLScpIG51bVN0ciArPSBnZXRDaGFyKCk7XG5cbiAgICBudW1TdHIgKz0gc291cmNlW3Bvc10gPT0gJzAnXG4gICAgICAgICAgICAgID8gZ2V0Q2hhcigpXG4gICAgICAgICAgICAgIDogZ2V0RGlnaXRzKCk7XG5cbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJy4nKSB7XG4gICAgICBudW1TdHIgKz0gZ2V0Q2hhcigpICsgZ2V0RGlnaXRzKCk7XG4gICAgICBpbnRlZ2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICdlJyB8fCBzb3VyY2VbcG9zXSA9PSAnRScpIHtcbiAgICAgIG51bVN0ciArPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoc291cmNlW3Bvc10gPT0gJysnIHx8IHNvdXJjZVtwb3NdID09ICctJykgbnVtU3RyICs9IGdldENoYXIoKTtcbiAgICAgIG51bVN0ciArPSBnZXREaWdpdHMoKTtcbiAgICAgIGludGVnZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gK251bVN0cjtcbiAgICByZXR1cm4gYmlnaW50ICYmIGludGVnZXIgJiYgKHJlc3VsdCA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IHJlc3VsdCA8IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSKVxuICAgICAgICAgICAgPyBCaWdJbnQobnVtU3RyKVxuICAgICAgICAgICAgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUFycmF5KHB0cikge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgYXJyID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIGlmIChnZXRDaGFyKCkgPT0gJ10nKSByZXR1cm4gYXJyO1xuICAgIGJhY2tDaGFyKCk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIGl0ZW1QdHIgPSBwdHIgKyAnLycgKyBpO1xuICAgICAgYXJyLnB1c2goX3BhcnNlKGl0ZW1QdHIpKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ10nKSBicmVhaztcbiAgICAgIGlmIChjaGFyICE9ICcsJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU9iamVjdChwdHIpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGlmIChnZXRDaGFyKCkgPT0gJ30nKSByZXR1cm4gb2JqO1xuICAgIGJhY2tDaGFyKCk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIGxvYyA9IGdldExvYygpO1xuICAgICAgaWYgKGdldENoYXIoKSAhPSAnXCInKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHZhciBrZXkgPSBwYXJzZVN0cmluZygpO1xuICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgbWFwTG9jKHByb3BQdHIsICdrZXknLCBsb2MpO1xuICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIGlmIChnZXRDaGFyKCkgIT0gJzonKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIG9ialtrZXldID0gX3BhcnNlKHByb3BQdHIpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnfScpIGJyZWFrO1xuICAgICAgaWYgKGNoYXIgIT0gJywnKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQoc3RyKSB7XG4gICAgZm9yICh2YXIgaT0wOyBpPHN0ci5sZW5ndGg7IGkrKylcbiAgICAgIGlmIChnZXRDaGFyKCkgIT09IHN0cltpXSkgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGFyKCkge1xuICAgIGNoZWNrVW5leHBlY3RlZEVuZCgpO1xuICAgIHZhciBjaGFyID0gc291cmNlW3Bvc107XG4gICAgcG9zKys7XG4gICAgY29sdW1uKys7IC8vIG5ldyBsaW5lP1xuICAgIHJldHVybiBjaGFyO1xuICB9XG5cbiAgZnVuY3Rpb24gYmFja0NoYXIoKSB7XG4gICAgcG9zLS07XG4gICAgY29sdW1uLS07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaGFyQ29kZSgpIHtcbiAgICB2YXIgY291bnQgPSA0O1xuICAgIHZhciBjb2RlID0gMDtcbiAgICB3aGlsZSAoY291bnQtLSkge1xuICAgICAgY29kZSA8PD0gNDtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoY2hhciA+PSAnYScgJiYgY2hhciA8PSAnZicpXG4gICAgICAgIGNvZGUgKz0gY2hhci5jaGFyQ29kZUF0KCkgLSBBX0NPREUgKyAxMDtcbiAgICAgIGVsc2UgaWYgKGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBjb2RlICs9ICtjaGFyO1xuICAgICAgZWxzZVxuICAgICAgICB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaWdpdHMoKSB7XG4gICAgdmFyIGRpZ2l0cyA9ICcnO1xuICAgIHdoaWxlIChzb3VyY2VbcG9zXSA+PSAnMCcgJiYgc291cmNlW3Bvc10gPD0gJzknKVxuICAgICAgZGlnaXRzICs9IGdldENoYXIoKTtcblxuICAgIGlmIChkaWdpdHMubGVuZ3RoKSByZXR1cm4gZGlnaXRzO1xuICAgIGNoZWNrVW5leHBlY3RlZEVuZCgpO1xuICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwKHB0ciwgcHJvcCkge1xuICAgIG1hcExvYyhwdHIsIHByb3AsIGdldExvYygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcExvYyhwdHIsIHByb3AsIGxvYykge1xuICAgIHBvaW50ZXJzW3B0cl0gPSBwb2ludGVyc1twdHJdIHx8IHt9O1xuICAgIHBvaW50ZXJzW3B0cl1bcHJvcF0gPSBsb2M7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb2MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbmU6IGxpbmUsXG4gICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgIHBvczogcG9zXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZXhwZWN0ZWRUb2tlbigpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgdG9rZW4gJyArIHNvdXJjZVtwb3NdICsgJyBpbiBKU09OIGF0IHBvc2l0aW9uICcgKyBwb3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gd2FzVW5leHBlY3RlZFRva2VuKCkge1xuICAgIGJhY2tDaGFyKCk7XG4gICAgdW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1VuZXhwZWN0ZWRFbmQoKSB7XG4gICAgaWYgKHBvcyA+PSBzb3VyY2UubGVuZ3RoKVxuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIGVuZCBvZiBKU09OIGlucHV0Jyk7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAoZGF0YSwgXywgb3B0aW9ucykge1xuICBpZiAoIXZhbGlkVHlwZShkYXRhKSkgcmV0dXJuO1xuICB2YXIgd3NMaW5lID0gMDtcbiAgdmFyIHdzUG9zLCB3c0NvbHVtbjtcbiAgdmFyIHdoaXRlc3BhY2UgPSB0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnMuc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25zO1xuICBzd2l0Y2ggKHR5cGVvZiB3aGl0ZXNwYWNlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHZhciBsZW4gPSB3aGl0ZXNwYWNlID4gMTBcbiAgICAgICAgICAgICAgICAgID8gMTBcbiAgICAgICAgICAgICAgICAgIDogd2hpdGVzcGFjZSA8IDBcbiAgICAgICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgICAgIDogTWF0aC5mbG9vcih3aGl0ZXNwYWNlKTtcbiAgICAgIHdoaXRlc3BhY2UgPSBsZW4gJiYgcmVwZWF0KGxlbiwgJyAnKTtcbiAgICAgIHdzUG9zID0gbGVuO1xuICAgICAgd3NDb2x1bW4gPSBsZW47XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgd2hpdGVzcGFjZSA9IHdoaXRlc3BhY2Uuc2xpY2UoMCwgMTApO1xuICAgICAgd3NQb3MgPSAwO1xuICAgICAgd3NDb2x1bW4gPSAwO1xuICAgICAgZm9yICh2YXIgaj0wOyBqPHdoaXRlc3BhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIGNoYXIgPSB3aGl0ZXNwYWNlW2pdO1xuICAgICAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgICAgICBjYXNlICcgJzogd3NDb2x1bW4rKzsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFx0Jzogd3NDb2x1bW4gKz0gNDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxyJzogd3NDb2x1bW4gPSAwOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXG4nOiB3c0NvbHVtbiA9IDA7IHdzTGluZSsrOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ3doaXRlc3BhY2UgY2hhcmFjdGVycyBub3QgYWxsb3dlZCBpbiBKU09OJyk7XG4gICAgICAgIH1cbiAgICAgICAgd3NQb3MrKztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB3aGl0ZXNwYWNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIGpzb24gPSAnJztcbiAgdmFyIHBvaW50ZXJzID0ge307XG4gIHZhciBsaW5lID0gMDtcbiAgdmFyIGNvbHVtbiA9IDA7XG4gIHZhciBwb3MgPSAwO1xuICB2YXIgZXM2ID0gb3B0aW9ucyAmJiBvcHRpb25zLmVzNiAmJiB0eXBlb2YgTWFwID09ICdmdW5jdGlvbic7XG4gIF9zdHJpbmdpZnkoZGF0YSwgMCwgJycpO1xuICByZXR1cm4ge1xuICAgIGpzb246IGpzb24sXG4gICAgcG9pbnRlcnM6IHBvaW50ZXJzXG4gIH07XG5cbiAgZnVuY3Rpb24gX3N0cmluZ2lmeShfZGF0YSwgbHZsLCBwdHIpIHtcbiAgICBtYXAocHRyLCAndmFsdWUnKTtcbiAgICBzd2l0Y2ggKHR5cGVvZiBfZGF0YSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2JpZ2ludCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgb3V0KCcnICsgX2RhdGEpOyBicmVhaztcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIG91dChxdW90ZWQoX2RhdGEpKTsgYnJlYWs7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoX2RhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICBvdXQoJ251bGwnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgX2RhdGEudG9KU09OID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBvdXQocXVvdGVkKF9kYXRhLnRvSlNPTigpKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfZGF0YSkpIHtcbiAgICAgICAgICBzdHJpbmdpZnlBcnJheSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGVzNikge1xuICAgICAgICAgIGlmIChfZGF0YS5jb25zdHJ1Y3Rvci5CWVRFU19QRVJfRUxFTUVOVClcbiAgICAgICAgICAgIHN0cmluZ2lmeUFycmF5KCk7XG4gICAgICAgICAgZWxzZSBpZiAoX2RhdGEgaW5zdGFuY2VvZiBNYXApXG4gICAgICAgICAgICBzdHJpbmdpZnlNYXBTZXQoKTtcbiAgICAgICAgICBlbHNlIGlmIChfZGF0YSBpbnN0YW5jZW9mIFNldClcbiAgICAgICAgICAgIHN0cmluZ2lmeU1hcFNldCh0cnVlKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBzdHJpbmdpZnlPYmplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHJpbmdpZnlPYmplY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXAocHRyLCAndmFsdWVFbmQnKTtcblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeUFycmF5KCkge1xuICAgICAgaWYgKF9kYXRhLmxlbmd0aCkge1xuICAgICAgICBvdXQoJ1snKTtcbiAgICAgICAgdmFyIGl0ZW1MdmwgPSBsdmwgKyAxO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8X2RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSkgb3V0KCcsJyk7XG4gICAgICAgICAgaW5kZW50KGl0ZW1MdmwpO1xuICAgICAgICAgIHZhciBpdGVtID0gdmFsaWRUeXBlKF9kYXRhW2ldKSA/IF9kYXRhW2ldIDogbnVsbDtcbiAgICAgICAgICB2YXIgaXRlbVB0ciA9IHB0ciArICcvJyArIGk7XG4gICAgICAgICAgX3N0cmluZ2lmeShpdGVtLCBpdGVtTHZsLCBpdGVtUHRyKTtcbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCddJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ1tdJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5T2JqZWN0KCkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhfZGF0YSk7XG4gICAgICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgb3V0KCd7Jyk7XG4gICAgICAgIHZhciBwcm9wTHZsID0gbHZsICsgMTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBfZGF0YVtrZXldO1xuICAgICAgICAgIGlmICh2YWxpZFR5cGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoaSkgb3V0KCcsJyk7XG4gICAgICAgICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICAgICAgICBpbmRlbnQocHJvcEx2bCk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleScpO1xuICAgICAgICAgICAgb3V0KHF1b3RlZChrZXkpKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICAgICAgICBvdXQoJzonKTtcbiAgICAgICAgICAgIGlmICh3aGl0ZXNwYWNlKSBvdXQoJyAnKTtcbiAgICAgICAgICAgIF9zdHJpbmdpZnkodmFsdWUsIHByb3BMdmwsIHByb3BQdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCd9Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ3t9Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5TWFwU2V0KGlzU2V0KSB7XG4gICAgICBpZiAoX2RhdGEuc2l6ZSkge1xuICAgICAgICBvdXQoJ3snKTtcbiAgICAgICAgdmFyIHByb3BMdmwgPSBsdmwgKyAxO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICB2YXIgZW50cmllcyA9IF9kYXRhLmVudHJpZXMoKTtcbiAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllcy5uZXh0KCk7XG4gICAgICAgIHdoaWxlICghZW50cnkuZG9uZSkge1xuICAgICAgICAgIHZhciBpdGVtID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgdmFyIGtleSA9IGl0ZW1bMF07XG4gICAgICAgICAgdmFyIHZhbHVlID0gaXNTZXQgPyB0cnVlIDogaXRlbVsxXTtcbiAgICAgICAgICBpZiAodmFsaWRUeXBlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKCFmaXJzdCkgb3V0KCcsJyk7XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgICAgICAgaW5kZW50KHByb3BMdmwpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXknKTtcbiAgICAgICAgICAgIG91dChxdW90ZWQoa2V5KSk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgICAgICAgb3V0KCc6Jyk7XG4gICAgICAgICAgICBpZiAod2hpdGVzcGFjZSkgb3V0KCcgJyk7XG4gICAgICAgICAgICBfc3RyaW5naWZ5KHZhbHVlLCBwcm9wTHZsLCBwcm9wUHRyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpbmRlbnQobHZsKTtcbiAgICAgICAgb3V0KCd9Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQoJ3t9Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb3V0KHN0cikge1xuICAgIGNvbHVtbiArPSBzdHIubGVuZ3RoO1xuICAgIHBvcyArPSBzdHIubGVuZ3RoO1xuICAgIGpzb24gKz0gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5kZW50KGx2bCkge1xuICAgIGlmICh3aGl0ZXNwYWNlKSB7XG4gICAgICBqc29uICs9ICdcXG4nICsgcmVwZWF0KGx2bCwgd2hpdGVzcGFjZSk7XG4gICAgICBsaW5lKys7XG4gICAgICBjb2x1bW4gPSAwO1xuICAgICAgd2hpbGUgKGx2bC0tKSB7XG4gICAgICAgIGlmICh3c0xpbmUpIHtcbiAgICAgICAgICBsaW5lICs9IHdzTGluZTtcbiAgICAgICAgICBjb2x1bW4gPSB3c0NvbHVtbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW4gKz0gd3NDb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgcG9zICs9IHdzUG9zO1xuICAgICAgfVxuICAgICAgcG9zICs9IDE7IC8vIFxcbiBjaGFyYWN0ZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXAocHRyLCBwcm9wKSB7XG4gICAgcG9pbnRlcnNbcHRyXSA9IHBvaW50ZXJzW3B0cl0gfHwge307XG4gICAgcG9pbnRlcnNbcHRyXVtwcm9wXSA9IHtcbiAgICAgIGxpbmU6IGxpbmUsXG4gICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgIHBvczogcG9zXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGVhdChuLCBzdHIpIHtcbiAgICByZXR1cm4gQXJyYXkobiArIDEpLmpvaW4oc3RyKTtcbiAgfVxufTtcblxuXG52YXIgVkFMSURfVFlQRVMgPSBbJ251bWJlcicsICdiaWdpbnQnLCAnYm9vbGVhbicsICdzdHJpbmcnLCAnb2JqZWN0J107XG5mdW5jdGlvbiB2YWxpZFR5cGUoZGF0YSkge1xuICByZXR1cm4gVkFMSURfVFlQRVMuaW5kZXhPZih0eXBlb2YgZGF0YSkgPj0gMDtcbn1cblxuXG52YXIgRVNDX1FVT1RFID0gL1wifFxcXFwvZztcbnZhciBFU0NfQiA9IC9bXFxiXS9nO1xudmFyIEVTQ19GID0gL1xcZi9nO1xudmFyIEVTQ19OID0gL1xcbi9nO1xudmFyIEVTQ19SID0gL1xcci9nO1xudmFyIEVTQ19UID0gL1xcdC9nO1xuZnVuY3Rpb24gcXVvdGVkKHN0cikge1xuICBzdHIgPSBzdHIucmVwbGFjZShFU0NfUVVPVEUsICdcXFxcJCYnKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfRiwgJ1xcXFxmJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX0IsICdcXFxcYicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19OLCAnXFxcXG4nKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfUiwgJ1xcXFxyJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX1QsICdcXFxcdCcpO1xuICByZXR1cm4gJ1wiJyArIHN0ciArICdcIic7XG59XG5cblxudmFyIEVTQ18wID0gL34vZztcbnZhciBFU0NfMSA9IC9cXC8vZztcbmZ1bmN0aW9uIGVzY2FwZUpzb25Qb2ludGVyKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoRVNDXzAsICd+MCcpXG4gICAgICAgICAgICAucmVwbGFjZShFU0NfMSwgJ34xJyk7XG59XG4iLCJpbXBvcnQgUFJPUFMgZnJvbSAnLi9wcm9wbmFtZXMuanMnO1xyXG5pbXBvcnQgSnNvblNvdXJjZU1hcCBmcm9tICcuL2pzb25zb3VyY2VtYXAuanMnO1xyXG5cclxuY29uc3Qge0JMT0NLLCBFTEVNLCBDT05URU5ULCBNT0RTLCBNSVh9ID0gUFJPUFM7XHJcbmNvbnN0IGxvY2F0aW9uS2V5ID0gSnNvblNvdXJjZU1hcC5rZXk7XHJcblxyXG5jbGFzcyBCZW1Ob2RlIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSkge1xyXG4gICAgICAgIHRoaXMuYmxvY2sgPSBub2RlW0JMT0NLXTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBub2RlW0VMRU1dO1xyXG4gICAgICAgIHRoaXMubW9kcyA9IG5vZGVbTU9EU107XHJcbiAgICAgICAgdGhpcy5taXggPSBub2RlW01JWF07XHJcblxyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBub2RlW2xvY2F0aW9uS2V5XTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHRoaXMuYmxvY2sgKyAodGhpcy5lbGVtID8gKGBfXyR7dGhpcy5lbGVtfWApIDogJycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZW1Ob2RlOyIsImltcG9ydCBMaW50RXJyb3IgZnJvbSAnLi9saW50ZXJyb3IuanMnO1xyXG5cclxuY2xhc3MgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuVEVYVF9TSVpFU19TSE9VTERfQkVfRVFVQUwnLCBlcnJvcjogJ9Ci0LXQutGB0YLRiyDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQvdGLINCx0YvRgtGMINC+0LTQvdC+0LPQviDRgNCw0LfQvNC10YDQsC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1NJWkUnLCBlcnJvcjogJ9Cg0LDQt9C80LXRgCDQutC90L7Qv9C60Lgg0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQvdCwIDEg0YjQsNCzINCx0L7Qu9GM0YjQtSDRjdGC0LDQu9C+0L3QvdC+0LPQvi4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX0JVVFRPTl9QT1NJVElPTicsIGVycm9yOiAn0JHQu9C+0LogYnV0dG9uINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/QvtGB0LvQtSDQsdC70L7QutCwIHBsYWNlaG9sZGVyLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX1BMQUNFSE9MREVSX1NJWkUnLCBlcnJvcjogJ9CU0L7Qv9GD0YHRgtC40LzRi9C1INGA0LDQt9C80LXRgNGLINC00LvRjyDQsdC70L7QutCwIHBsYWNlaG9sZGVyINCyINCx0LvQvtC60LUgd2FybmluZzogcywgbSwgbC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0U2V2ZXJhbEgxIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5TRVZFUkFMX0gxJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0L/QtdGA0LLQvtCz0L4g0YPRgNC+0LLQvdGPINC90LAg0YHRgtGA0LDQvdC40YbQtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0LXQtNC40L3RgdGC0LLQtdC90L3Ri9C8LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRJbnZhbGlkSDJQb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuSU5WQUxJRF9IMl9QT1NJVElPTicsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INCy0YLQvtGA0L7Qs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIM1Bvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gzX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0YLRgNC10YLRjNC10LPQviDRg9GA0L7QstC90Y8g0L3QtSDQvNC+0LbQtdGCINC90LDRhdC+0LTQuNGC0YzRgdGPINC/0LXRgNC10LQg0LfQsNCz0L7Qu9C+0LLQutC+0Lwg0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnR1JJRC5UT09fTVVDSF9NQVJLRVRJTkdfQkxPQ0tTJywgZXJyb3I6ICfQnNCw0YDQutC10YLQuNC90LPQvtCy0YvQtSDQsdC70L7QutC4INC90LUg0LzQvtCz0YPRgiDQt9Cw0L3QuNC80LDRgtGMINCx0L7Qu9GM0YjQtSDQv9C+0LvQvtCy0LjQvdGLINC+0YIg0LLRgdC10YUg0LrQvtC70L7QvdC+0Log0LHQu9C+0LrQsCBncmlkJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIFdhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwsXHJcbiAgICBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUsXHJcbiAgICBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uLFxyXG4gICAgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUsXHJcbiAgICBUZXh0U2V2ZXJhbEgxLFxyXG4gICAgVGV4dEludmFsaWRIMlBvc2l0aW9uLFxyXG4gICAgVGV4dEludmFsaWRIM1Bvc2l0aW9uLFxyXG4gICAgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3NcclxufSIsIlxyXG5jbGFzcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3Ioe2NvZGUsIGVycm9yLCBsb2NhdGlvbn0pIHtcclxuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbnRFcnJvcjsiLCJcclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcg0J3QtdGA0LDQt9GA0LXRiNC40LzRi9C1INC+0YjQuNCx0LrQuCwg0L/QvtGB0LvQtSDQutC+0YLQvtGA0YvRhSDQv9GA0LXQutGA0LDRidCw0LXQvCDRgNCw0LHQvtGC0YMuINCY0YUg0YfQuNGB0LvQviDQvNC+0LbQtdGCINGB0L7QutGA0LDRidCw0YLRjNGB0Y9cclxuICog0L/QviDQvNC10YDQtSDQtNC+0LHQsNCy0LvQtdC90LjRjyDQvdC+0LLRi9GFINC/0YDQsNCy0LjQuyDQsiDQu9C40L3RgtC10YAuXHJcbiAqL1xyXG5jbGFzcyBJbnZhbGlkSW5wdXQgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkludmFsaWQgaW5wdXRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5vVGV4dE5vZGUgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkF0IGxlYXN0IDEgdGV4dCBub2RlIGV4cGVjdGVkXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgSW52YWxpZElucHV0LFxyXG4gICAgTm9UZXh0Tm9kZVxyXG59IiwiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcg0JDQtNCw0L/RgtC10YAg0YTRg9C90LrRhtC40LggcGFyc2Ug0LjQtyDQsdC40LHQu9C40L7RgtC10LrQuCBqc29uLXNvdXJjZS1tYXBcclxuICovXHJcblxyXG5pbXBvcnQge3BhcnNlfSBmcm9tICdqc29uLXNvdXJjZS1tYXAnO1xyXG5pbXBvcnQgUFJPUFMgZnJvbSAnLi9wcm9wbmFtZXMuanMnO1xyXG5pbXBvcnQge0ludmFsaWRJbnB1dH0gZnJvbSBcIi4vZXJyb3Ivc3lzdGVtLmpzXCI7XHJcblxyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcblxyXG5jb25zdCBwb3NpdGlvbktleSA9IFN5bWJvbCgnUG9zaXRpb24nKTtcclxuXHJcbmNsYXNzIEpzb25Tb3VyY2VNYXAge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN0cikge1xyXG4gICAgICAgIHRoaXMuc3RyID0gc3RyO1xyXG4gICAgICAgIHRoaXMuanNvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wb2ludGVycyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SnNvbiA9ICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZSh0aGlzLnN0cik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmpzb24gPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludGVycyA9IHJlc3VsdC5wb2ludGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZElucHV0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGNoKHRoaXMuanNvbiwgJycpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYXRjaCA9IChub2RlLCBwYXRoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCB2YWx1ZUVuZH0gPSB0aGlzLnBvaW50ZXJzW3BhdGhdO1xyXG5cclxuICAgICAgICAvLyArMSDQuiBjb2wsINGCLtC6LiDQsdC40LHQu9C40L7RgtC10LrQsCDQstC10LTQtdGCINC+0YLRgdGH0LXRgiDQvtGCIDAuXHJcbiAgICAgICAgLy8g0J/RgNC4INGN0YLQvtC8IGxpbmUg0LHQtdC3INC40LfQvNC10L3QtdC90LjRjywg0YIu0LouINC40YHRhdC+0LTQvdGL0LkgSlNPTiDQvtCx0LXRgNC90YPQu9C4ICjQv9C+0LvQvtC20LjQu9C4INCy0L3Rg9GC0YDRjCDRgdCy0L7QudGB0YLQstCwIFwiY29udGVudFwiKVxyXG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IFt2YWx1ZSwgdmFsdWVFbmRdLm1hcCh2YWwgPT4gKHtsaW5lOiB2YWwubGluZSwgY29sdW1uOiB2YWwuY29sdW1uICsgMX0pKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGVbQ09OVEVOVF07XHJcblxyXG4gICAgICAgIG5vZGVbcG9zaXRpb25LZXldID0ge3N0YXJ0LCBlbmR9O1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkcmVuKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKGNoaWxkLCBgJHtwYXRofS8ke0NPTlRFTlR9LyR7aW5kfWApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGRyZW4sIGAke3BhdGh9LyR7Q09OVEVOVH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBrZXkgPSBwb3NpdGlvbktleTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSnNvblNvdXJjZU1hcDsiLCJpbXBvcnQgUFJPUFMgZnJvbSBcIi4vcHJvcG5hbWVzLmpzXCI7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcbmltcG9ydCBCZW1Ob2RlIGZyb20gJy4vYmVtbm9kZS5qcyc7XHJcbmltcG9ydCBSdWxlTWVkaWF0b3IgZnJvbSAnLi9ydWxlcy9ydWxlbWVkaWF0b3IuanMnO1xyXG5pbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4vcnVsZXMvcnVsZWJhc2UuanNcIjtcclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgTGludGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTwhUnVsZUJhc2U+fSBydWxlQ2xhc3Nlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihydWxlQ2xhc3NlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlQ2xhc3NlcyA9IHJ1bGVDbGFzc2VzO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBsaW50KHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdHJpbmdUcmVlID0gdGhpcy5hdHRhY2hSb290KHN0cik7XHJcbiAgICAgICAgY29uc3QgbWFwcGVyID0gbmV3IEpzb25Tb3VyY2VNYXAoc3RyaW5nVHJlZSk7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IG1hcHBlci5nZXRKc29uKHN0cmluZ1RyZWUpO1xyXG5cclxuICAgICAgICB0aGlzLm5leHQocm9vdCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsKHBoYXNlcy5lbmQpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGZpbHRlciBlcnJvcnNcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCBydWxlc0luc3RhbmNlcyA9IHRoaXMucnVsZUNsYXNzZXMubWFwKHJDbGFzcyA9PiBuZXcgckNsYXNzKCkpO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhdG9yID0gbmV3IFJ1bGVNZWRpYXRvcihydWxlc0luc3RhbmNlcyk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDQktGF0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC+0LHRitC10LrRgtC+0Lwg0LjQu9C4INC80LDRgdGB0LjQstC+0LwgKNC00LXRgNC10LLQviDQuNC70Lgg0LvQtdGBKS4g0JTQvtCx0LDQstC40Lwg0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQutC+0YDQtdC90YwsINCy0YHQtdCz0LTQsCDQsdGL0LvQviDQtNC10YDQtdCy0L4uICovXHJcbiAgICBhdHRhY2hSb290ID0gc3RyID0+IGB7XCIke0NPTlRFTlR9XCI6XFxuJHtzdHJ9XFxufWA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICovXHJcbiAgICBuZXh0ID0gKG5vZGUpID0+IHtcclxuICAgICAgICBjb25zdCBiZW1Ob2RlID0gbmV3IEJlbU5vZGUobm9kZSk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNvbnRlbnRBc0FycmF5KG5vZGVbQ09OVEVOVF0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLmluLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwocGhhc2VzLm91dCwgYmVtTm9kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGwocGhhc2UsIGJlbU5vZGUpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGwocGhhc2UsIGJlbU5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxBbGwocGhhc2UpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lZGlhdG9yLmNhbGxBbGwocGhhc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVycm9ycyhlcnJvcnMpIHtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFsuLi5lcnJvcnMsIC4uLnRoaXMuZXJyb3JzXTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50QXNBcnJheShlbCkge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG5cclxuICAgICAgICByZXR1cm4gZWwgPyBbZWxdIDogW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbnRlcjsiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBCTE9DSzogXCJibG9ja1wiLFxyXG4gICAgRUxFTTogXCJlbGVtXCIsXHJcbiAgICBDT05URU5UOiBcImNvbnRlbnRcIixcclxuICAgIE1PRFM6IFwibW9kc1wiLFxyXG4gICAgTUlYOiBcIm1peFwiXHJcbn07IiwiaW1wb3J0IFRleHRTaXplcyBmcm9tICcuL3dhcm5pbmcvdGV4dHNpemVzLmpzJ1xyXG5pbXBvcnQgQnV0dG9uU2l6ZSBmcm9tICcuL3dhcm5pbmcvYnV0dG9uc2l6ZS5qcydcclxuaW1wb3J0IEJ1dHRvblBvc2l0aW9uIGZyb20gJy4vd2FybmluZy9idXR0b25wb3NpdGlvbi5qcydcclxuXHJcbmNvbnN0IHJ1bGVzID0gW1RleHRTaXplcywgQnV0dG9uU2l6ZSwgQnV0dG9uUG9zaXRpb25dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcnVsZXM7IiwiXHJcbmNsYXNzIFJ1bGVCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICog0J3QsNCx0L7RgCDRgdC10LvQtdC60YLQvtGA0L7QsiAoQmVtTm9kZS5zZWxlY3Rvcikg0YPQt9C70L7Qsiwg0L3QsCDQutC+0YLQvtGA0YvRhSDQsdGD0LTQtdGCINGB0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L/RgNCw0LLQuNC70L4uXHJcbiAgICAgKiDQldGB0LvQuCDQvdC1INC30LDQtNCw0L0gLSDQsdGD0LTQtdGCINGB0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L3QsCDQutCw0LbQtNC+0Lwg0YPQt9C70LUgKFRPRE8pLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2VsZWN0b3JzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9ycyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSBzZWxlY3RvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VsZWN0b3JzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge09iamVjdDxSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzLCBSdWxlQmFzZS5IYW5kbGVyVHlwZT59XHJcbiAgICAgKi9cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgLy8gVE9ETyBlcnJvciBlbWl0dGluZ1xyXG4gICAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBAZW51bXtzdHJpbmd9ICovXHJcblJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMgPSB7XHJcbiAgICAvKiDQktGF0L7QtNC40Lwg0LIg0L7Rh9C10YDQtdC00L3QvtC5INGD0LfQtdC7INC00LXRgNC10LLQsCovXHJcbiAgICBpbjogJ2luJyxcclxuICAgIC8qINCS0YvRhdC+0LTQuNC8ICovXHJcbiAgICBvdXQ6ICdvdXQnLFxyXG4gICAgLyog0JfQsNC60LDQvdGH0LjQstCw0LXQvCDQvtCx0YXQvtC0INC00LXRgNC10LLQsCAqL1xyXG4gICAgZW5kOiAnZW5kJ1xyXG59O1xyXG5cclxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihCZW1Ob2RlKTogKCFMaW50RXJyb3J8dW5kZWZpbmVkKX0gKi9cclxuUnVsZUJhc2UuSGFuZGxlclR5cGU7XHJcblxyXG4vKiogQHR5cGVkZWYge09iamVjdDxSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzLCBPYmplY3Q8c3RyaW5nLCBSdWxlQmFzZS5IYW5kbGVyVHlwZT4+fSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyc01hcFR5cGU7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZUJhc2U7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gJy4vcnVsZWJhc2UuanMnO1xyXG5cclxuY29uc3QgcGhhc2VzID0gUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcztcclxuXHJcbmNsYXNzIFJ1bGVNZWRpYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMgPSBydWxlcztcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyc01hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuYnVpbGRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZE1hcCgpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHJ1bGUuZ2V0U2VsZWN0b3JzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXJzTWFwID0gcnVsZS5nZXRQaGFzZUhhbmRsZXJzTWFwKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBwaGFzZSBpbiBoYW5kbGVyc01hcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzTWFwW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhbmRsZXJzTWFwW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzTWFwW2tleV0ucHVzaChoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRLZXkocGhhc2UsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHBoYXNlICsgJyQnICsgc2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheTwhTGludEVycm9yPn1cclxuICAgICAqL1xyXG4gICAgY2FsbChwaGFzZSwgYmVtTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5KHBoYXNlLCBiZW1Ob2RlLnNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBba2V5XSB8fCBbXTtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBoYW5kbGVycy5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKGJlbU5vZGUpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycy5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEFsbChwaGFzZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKVtwaGFzZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFuZGxlcilcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGhhbmRsZXIobnVsbCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnVsZU1lZGlhdG9yOyIsIlxyXG5jb25zdCBzaXplc1NjYWxlID0gW1wieHh4c1wiLCBcInh4c1wiLCBcInhzXCIsIFwic1wiLCBcIm1cIiwgXCJsXCIsIFwieGxcIiwgXCJ4eGxcIiwgXCJ4eHhsXCIsIFwieHh4eGxcIiwgXCJ4eHh4eGxcIl07XHJcblxyXG5jbGFzcyBTaXplIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpemVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY291bnRcclxuICAgICAqIEByZXR1cm4ge1NpemV9XHJcbiAgICAgKi9cclxuICAgIGFkZChjb3VudCkge1xyXG4gICAgICAgIGxldCBpbmQgPSBzaXplc1NjYWxlLmluZGV4T2YodGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgaWYgKH5pbmQpXHJcbiAgICAgICAgICAgIGluZCA9IGluZCArIGNvdW50O1xyXG5cclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplc1NjYWxlW2luZF07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKHNpemVCKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuc2l6ZSAmJiBzaXplQikgJiYgdGhpcy5zaXplID09PSBzaXplQjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGlzRGVmKHgpIHtcclxuICAgIHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXQob2JqLCAuLi5wcm9wcykge1xyXG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIC8vINGE0YPQvdC60YbQuNC4INC90LUg0L/RgNC10LTQv9C+0LvQsNCz0LDRjtGC0YHRj1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XHJcblxyXG4gICAgZm9yIChsZXQgcHJvcCBvZiBwcm9wcykge1xyXG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xyXG5cclxuICAgICAgICBpZiAoIWlzRGVmKHByb3ApKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICAgIFNpemUsXHJcbiAgICBnZXRcclxufSIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIEJ1dHRvblBvc2l0aW9uIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ2J1dHRvbicsICdwbGFjZWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlcyA9IG5ldyBNYXAoKTsgLy8g0YXRgNCw0L3QuNC8IDEgYnV0dG9uXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3BsYWNlaG9sZGVyJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGxhY2Vob2xkZXJOb2Rlcy5oYXMod2FybmluZykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJOb2Rlcy5zZXQod2FybmluZywgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uTm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbih3YXJuaW5nLmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uUG9zaXRpb247IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRCdXR0b25TaXplfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcbmltcG9ydCB7Tm9UZXh0Tm9kZX0gZnJvbSBcIi4uLy4uL2Vycm9yL3N5c3RlbS5qc1wiO1xyXG5cclxuY2xhc3MgQnV0dG9uU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAndGV4dCddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnRleHROb2RlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnV0dG9uTm9kZXMgPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgYnV0dG9uTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RUZXh0Tm9kZSA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuICAgICAgICBjb25zdCBidXR0b25zID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghYnV0dG9ucylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8g0L/RgNC10LTQv9C+0LvQsNCz0LDQtdC8LCDRh9GC0L4g0YLQtdC60YHRgtC+0LLRi9C1INC90L7QtNGLINC+0LHRj9C30LDQvdGLINCx0YvRgtGMLCDRgi7Qui4g0LjQvdCw0YfQtSDRjdGC0LDQu9C+0L3QvdGL0Lkg0YDQsNC30LzQtdGAINC90LUg0L7Qv9GA0LXQtNC10LvQtdC9INC4INC/0L7QtdC00YPRgiDQtNGA0YPQs9C40LUg0L/RgNCw0LLQuNC70LAuINCf0YDQvtCy0LXRgNC40YLRjCDQv9GA0LXQtNC/0L7Qu9C+0LbQtdC90LjQtS5cclxuICAgICAgICBpZiAoIWZpcnN0VGV4dE5vZGUpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1RleHROb2RlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0VGV4dE5vZGUubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBzaXplID0gbmV3IFNpemUoc2l6ZVZhbEEpO1xyXG5cclxuICAgICAgICBzaXplLmFkZCgxKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZVZhbEIgPSBnZXQoYnV0dG9uLm1vZHMsICdzaXplJyk7XHJcblxyXG4gICAgICAgICAgICAvLyDQlNCw0LbQtSDQtdGB0LvQuCDQsiDRgNCw0LzQutCw0YUg0L7QtNC90L7Qs9C+INCx0LvQvtC60LAg0L3QtdGB0LrQvtC70YzQutC+INC+0YjQuNCx0L7Rh9C90YvRhSDRgdC70L7Qsiwg0YLQviDQstC+0LLRgNCw0YnQsNC10Lwg0L7QtNC90YMg0L7RiNC40LHQutGDLlxyXG4gICAgICAgICAgICBpZiAoIXNpemUuY2hlY2soc2l6ZVZhbEIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nSW52YWxpZEJ1dHRvblNpemUobm9kZS5sb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uU2l6ZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcbmltcG9ydCB7Tm9UZXh0Tm9kZX0gZnJvbSBcIi4uLy4uL2Vycm9yL3N5c3RlbS5qc1wiO1xyXG5cclxuY2xhc3MgVGV4dFNpemVzIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0ZXh0Tm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gZXJyb3IgZW1pdHRpbmdcclxuICAgICAgICAvLyBUT0RPINC/0YDQtdC00L/QvtC70LDQs9Cw0LXQvCwg0YfRgtC+INGC0LXQutGB0YLQvtCy0YvQtSDQvdC+0LTRiyDQvtCx0Y/Qt9Cw0L3RiyDQsdGL0YLRjCwg0YIu0LouINC40L3QsNGH0LUg0Y3RgtCw0LvQvtC90L3Ri9C5INGA0LDQt9C80LXRgCDQvdC1INC+0L/RgNC10LTQtdC70LXQvSDQuCDQv9C+0LXQtNGD0YIg0LTRgNGD0LPQuNC1INC/0YDQsNCy0LjQu9CwLiDQn9GA0L7QstC10YDQuNGC0Ywg0L/RgNC10LTQv9C+0LvQvtC20LXQvdC40LUuXHJcbiAgICAgICAgaWYgKCF0ZXh0Tm9kZXMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1RleHROb2RlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IFtmaXJzdCwgLi4ub3RoZXJdID0gdGV4dE5vZGVzO1xyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0Lm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdGV4dCBvZiBvdGhlcikge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldCh0ZXh0Lm1vZHMsICdzaXplJyk7XHJcblxyXG4gICAgICAgICAgICAvLyDQlNCw0LbQtSDQtdGB0LvQuCDQsiDRgNCw0LzQutCw0YUg0L7QtNC90L7Qs9C+INCx0LvQvtC60LAg0L3QtdGB0LrQvtC70YzQutC+INC+0YjQuNCx0L7Rh9C90YvRhSDRgdC70L7Qsiwg0YLQviDQstC+0LLRgNCw0YnQsNC10Lwg0L7QtNC90YMg0L7RiNC40LHQutGDLlxyXG4gICAgICAgICAgICBpZiAoIXNpemUuY2hlY2soc2l6ZVZhbEIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsKG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRTaXplczsiLCJjb25zdCB0ZXN0cyA9IFtcclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG4gICAgYFxyXG4gICAge1xyXG4gICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibFwifX0sXHJcbiAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibVwifX1cclxuICAgIF1cclxufVxyXG4gICAgYCxcclxuXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJtXCJ9fSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAgICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcIm1cIn19XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgICAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibVwifX0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJtXCJ9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibVwifX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcIm1cIn19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG4gICAgYFxyXG4gICAge1xyXG4gICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAgeyBcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJsXCIgfSB9LFxyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcImJ1dHRvblwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJ4bFwiIH0gfVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwibFwiIH0gfSxcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJidXR0b25cIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwic1wiIH0gfVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcInBsYWNlaG9sZGVyXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcIm1cIiB9IH0sXHJcbiAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibFwifX0sXHJcbiAgICAgICAgeyBcImJsb2NrXCI6IFwiYnV0dG9uXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcIm1cIiB9IH1cclxuICAgIF1cclxufVxyXG4gICAgYCxcclxuXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJidXR0b25cIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwibVwiIH0gfSxcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJwbGFjZWhvbGRlclwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJtXCIgfSB9XHJcbiAgICBdXHJcbn1cclxuICAgIGBcclxuXTtcclxuXHJcbmNvbnN0IGFuc3dlcnMgPSB7fVxyXG5cclxuZXhwb3J0IHt0ZXN0cywgYW5zd2Vyc307Il0sInNvdXJjZVJvb3QiOiIifQ==