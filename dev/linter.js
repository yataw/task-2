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
/* harmony import */ var _warning_placeholdersize_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./warning/placeholdersize.js */ "./src/rules/warning/placeholdersize.js");




const rules = [_warning_textsizes_js__WEBPACK_IMPORTED_MODULE_0__["default"], _warning_buttonsize_js__WEBPACK_IMPORTED_MODULE_1__["default"], _warning_buttonposition_js__WEBPACK_IMPORTED_MODULE_2__["default"], _warning_placeholdersize_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
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
        { "block": "placeholder", "mods": { "size": "xl" } }
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        { "block": "placeholder", "mods": { "size": "m" }}
    ]
}
    `, `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        { "block": "placeholder", "mods": { "size": "xl" }}
    ]
}
    `];
const answers = {};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGViYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlbWVkaWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0Y2FzZXMuanMiXSwibmFtZXMiOlsibGludGVyIiwiTGludGVyIiwicnVsZXMiLCJ3aW5kb3ciLCJsaW50Iiwic3RyIiwidGVzdHMiLCJmb3JFYWNoIiwidGVzdCIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJCTE9DSyIsIkVMRU0iLCJDT05URU5UIiwiTU9EUyIsIk1JWCIsIlBST1BTIiwibG9jYXRpb25LZXkiLCJKc29uU291cmNlTWFwIiwia2V5IiwiQmVtTm9kZSIsImNvbnN0cnVjdG9yIiwibm9kZSIsImJsb2NrIiwiZWxlbSIsIm1vZHMiLCJtaXgiLCJsb2NhdGlvbiIsInNlbGVjdG9yIiwiV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCIsIkxpbnRFcnJvciIsImNvZGUiLCJlcnJvciIsIldhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSIsIldhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24iLCJXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSIsIlRleHRTZXZlcmFsSDEiLCJUZXh0SW52YWxpZEgyUG9zaXRpb24iLCJUZXh0SW52YWxpZEgzUG9zaXRpb24iLCJHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2NrcyIsIkludmFsaWRJbnB1dCIsIkVycm9yIiwiTm9UZXh0Tm9kZSIsInBvc2l0aW9uS2V5IiwiU3ltYm9sIiwicmVzdWx0IiwicGFyc2UiLCJqc29uIiwiZGF0YSIsInBvaW50ZXJzIiwiZSIsIm1hdGNoIiwicGF0aCIsInZhbHVlIiwidmFsdWVFbmQiLCJzdGFydCIsImVuZCIsIm1hcCIsInZhbCIsImxpbmUiLCJjb2x1bW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImNoaWxkIiwiaW5kIiwicGhhc2VzIiwiUnVsZUJhc2UiLCJwcm90b3R5cGUiLCJydWxlQ2xhc3NlcyIsImJlbU5vZGUiLCJjb250ZW50QXNBcnJheSIsImNhbGwiLCJpbiIsIm5leHQiLCJvdXQiLCJtZWRpYXRvciIsImVycm9ycyIsImluaXQiLCJzdHJpbmdUcmVlIiwiYXR0YWNoUm9vdCIsIm1hcHBlciIsInJvb3QiLCJnZXRKc29uIiwiY2FsbEFsbCIsInJ1bGVzSW5zdGFuY2VzIiwickNsYXNzIiwiUnVsZU1lZGlhdG9yIiwicGhhc2UiLCJhZGRFcnJvcnMiLCJlbCIsIlRleHRTaXplcyIsIkJ1dHRvblNpemUiLCJCdXR0b25Qb3NpdGlvbiIsIlBsYWNlaG9sZGVyU2l6ZSIsInNlbGVjdG9ycyIsImdldFNlbGVjdG9ycyIsImdldFBoYXNlSGFuZGxlcnNNYXAiLCJIYW5kbGVyVHlwZSIsIkhhbmRsZXJzTWFwVHlwZSIsImhhbmRsZXJzTWFwIiwiYnVpbGRNYXAiLCJydWxlIiwiaGFuZGxlciIsImdldEtleSIsInB1c2giLCJoYW5kbGVycyIsImZpbHRlciIsInNpemVzU2NhbGUiLCJTaXplIiwic2l6ZSIsImFkZCIsImNvdW50IiwiaW5kZXhPZiIsImNoZWNrIiwic2l6ZUIiLCJpc0RlZiIsIngiLCJ1bmRlZmluZWQiLCJnZXQiLCJvYmoiLCJwcm9wcyIsImN1cnJlbnQiLCJwcm9wIiwid2FybmluZ3MiLCJwbGFjZWhvbGRlck5vZGVzIiwiTWFwIiwiYnV0dG9uTm9kZXMiLCJiaW5kIiwid2FybmluZyIsImdldExhc3RXYXJuaW5nIiwiaGFzIiwic2V0IiwicG9wIiwiZGVsZXRlIiwibGVuZ3RoIiwidGV4dE5vZGVzIiwiZmlyc3RUZXh0Tm9kZSIsImJ1dHRvbnMiLCJzaXplVmFsQSIsImJ1dHRvbiIsInNpemVWYWxCIiwiY29ycmVjdFNpemVzIiwiZmlyc3QiLCJvdGhlciIsInRleHQiLCJhbnN3ZXJzIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Q0FHQTs7QUFDQTtBQUVBLE1BQU1BLE1BQU0sR0FBRyxJQUFJQyxzREFBSixDQUFXQywwREFBWCxDQUFmOztBQUVBQyxNQUFNLENBQUNDLElBQVAsR0FBYyxVQUFTQyxHQUFULEVBQWM7QUFDeEIsU0FBT0wsTUFBTSxDQUFDSSxJQUFQLENBQVlDLEdBQVosQ0FBUDtBQUNILENBRkQsQyxDQUlBOzs7QUFFQUMsbURBQUssQ0FBQ0MsT0FBTixDQUFjQyxJQUFJLElBQUk7QUFDbEIsUUFBTUMsR0FBRyxHQUFHTixNQUFNLENBQUNDLElBQVAsQ0FBWUksSUFBWixDQUFaO0FBRUFFLFNBQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFaO0FBQ0gsQ0FKRCxFOzs7Ozs7Ozs7Ozs7QUNkYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGFBQWE7QUFDekMsNkJBQTZCLGNBQWM7QUFDM0MsNEJBQTRCLGFBQWE7QUFDekMscUNBQXFDO0FBQ3JDLHVDQUF1QztBQUN2QyxhQUFhLDJCQUEyQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLGdDQUFnQztBQUNoQyxnQ0FBZ0MsUUFBUTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJB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VDs7Ozs7Ozs7O0tBMUZTLEVBcUdUOzs7Ozs7Ozs7S0FyR1MsRUFpSFQ7Ozs7Ozs7O0tBakhTLEVBMkhUOzs7Ozs7OztLQTNIUyxDQUFkO0FBc0lBLE1BQU02SSxPQUFPLEdBQUcsRUFBaEIiLCJmaWxlIjoibGludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBMaW50ZXIgZnJvbSAnLi9zcmMvbGludGVyLmpzJztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vc3JjL3J1bGVzL2xpc3QuanMnXHJcblxyXG4vLyBUT0RPIGZvciB0ZXN0XHJcbmltcG9ydCB7dGVzdHMsIGFuc3dlcnN9IGZyb20gXCIuL3Rlc3RjYXNlcy5qc1wiO1xyXG5cclxuY29uc3QgbGludGVyID0gbmV3IExpbnRlcihydWxlcyk7XHJcblxyXG53aW5kb3cubGludCA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgcmV0dXJuIGxpbnRlci5saW50KHN0cik7XHJcbn07XHJcblxyXG4vLyBUT0RPIGZvciB0ZXN0XHJcblxyXG50ZXN0cy5mb3JFYWNoKHRlc3QgPT4ge1xyXG4gICAgY29uc3QgcmVzID0gd2luZG93LmxpbnQodGVzdCk7XHJcblxyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxufSlcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXNjYXBlZENoYXJzID0ge1xuICAnYic6ICdcXGInLFxuICAnZic6ICdcXGYnLFxuICAnbic6ICdcXG4nLFxuICAncic6ICdcXHInLFxuICAndCc6ICdcXHQnLFxuICAnXCInOiAnXCInLFxuICAnLyc6ICcvJyxcbiAgJ1xcXFwnOiAnXFxcXCdcbn07XG5cbnZhciBBX0NPREUgPSAnYScuY2hhckNvZGVBdCgpO1xuXG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc291cmNlLCBfLCBvcHRpb25zKSB7XG4gIHZhciBwb2ludGVycyA9IHt9O1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW4gPSAwO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGJpZ2ludCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5iaWdpbnQgJiYgdHlwZW9mIEJpZ0ludCAhPSAndW5kZWZpbmVkJztcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiBfcGFyc2UoJycsIHRydWUpLFxuICAgIHBvaW50ZXJzOiBwb2ludGVyc1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9wYXJzZShwdHIsIHRvcExldmVsKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBkYXRhO1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgY2FzZSAndCc6IHJlYWQoJ3J1ZScpOyBkYXRhID0gdHJ1ZTsgYnJlYWs7XG4gICAgICBjYXNlICdmJzogcmVhZCgnYWxzZScpOyBkYXRhID0gZmFsc2U7IGJyZWFrO1xuICAgICAgY2FzZSAnbic6IHJlYWQoJ3VsbCcpOyBkYXRhID0gbnVsbDsgYnJlYWs7XG4gICAgICBjYXNlICdcIic6IGRhdGEgPSBwYXJzZVN0cmluZygpOyBicmVhaztcbiAgICAgIGNhc2UgJ1snOiBkYXRhID0gcGFyc2VBcnJheShwdHIpOyBicmVhaztcbiAgICAgIGNhc2UgJ3snOiBkYXRhID0gcGFyc2VPYmplY3QocHRyKTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBiYWNrQ2hhcigpO1xuICAgICAgICBpZiAoJy0wMTIzNDU2Nzg5Jy5pbmRleE9mKGNoYXIpID49IDApXG4gICAgICAgICAgZGF0YSA9IHBhcnNlTnVtYmVyKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgICB9XG4gICAgbWFwKHB0ciwgJ3ZhbHVlRW5kJyk7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIGlmICh0b3BMZXZlbCAmJiBwb3MgPCBzb3VyY2UubGVuZ3RoKSB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdoaXRlc3BhY2UoKSB7XG4gICAgbG9vcDpcbiAgICAgIHdoaWxlIChwb3MgPCBzb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgIHN3aXRjaCAoc291cmNlW3Bvc10pIHtcbiAgICAgICAgICBjYXNlICcgJzogY29sdW1uKys7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcdCc6IGNvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiBjb2x1bW4gPSAwOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXG4nOiBjb2x1bW4gPSAwOyBsaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrIGxvb3A7XG4gICAgICAgIH1cbiAgICAgICAgcG9zKys7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVN0cmluZygpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgdmFyIGNoYXI7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXCInKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09ICdcXFxcJykge1xuICAgICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgICBpZiAoY2hhciBpbiBlc2NhcGVkQ2hhcnMpXG4gICAgICAgICAgc3RyICs9IGVzY2FwZWRDaGFyc1tjaGFyXTtcbiAgICAgICAgZWxzZSBpZiAoY2hhciA9PSAndScpXG4gICAgICAgICAgc3RyICs9IGdldENoYXJDb2RlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSBjaGFyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VOdW1iZXIoKSB7XG4gICAgdmFyIG51bVN0ciA9ICcnO1xuICAgIHZhciBpbnRlZ2VyID0gdHJ1ZTtcbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuXG4gICAgbnVtU3RyICs9IHNvdXJjZVtwb3NdID09ICcwJ1xuICAgICAgICAgICAgICA/IGdldENoYXIoKVxuICAgICAgICAgICAgICA6IGdldERpZ2l0cygpO1xuXG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICcuJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKSArIGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnZScgfHwgc291cmNlW3Bvc10gPT0gJ0UnKSB7XG4gICAgICBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKHNvdXJjZVtwb3NdID09ICcrJyB8fCBzb3VyY2VbcG9zXSA9PSAnLScpIG51bVN0ciArPSBnZXRDaGFyKCk7XG4gICAgICBudW1TdHIgKz0gZ2V0RGlnaXRzKCk7XG4gICAgICBpbnRlZ2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9ICtudW1TdHI7XG4gICAgcmV0dXJuIGJpZ2ludCAmJiBpbnRlZ2VyICYmIChyZXN1bHQgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCByZXN1bHQgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUilcbiAgICAgICAgICAgID8gQmlnSW50KG51bVN0cilcbiAgICAgICAgICAgIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VBcnJheShwdHIpIHtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICBpZiAoZ2V0Q2hhcigpID09ICddJykgcmV0dXJuIGFycjtcbiAgICBiYWNrQ2hhcigpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgIGFyci5wdXNoKF9wYXJzZShpdGVtUHRyKSk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICddJykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VPYmplY3QocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBvYmogPSB7fTtcbiAgICBpZiAoZ2V0Q2hhcigpID09ICd9JykgcmV0dXJuIG9iajtcbiAgICBiYWNrQ2hhcigpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBsb2MgPSBnZXRMb2MoKTtcbiAgICAgIGlmIChnZXRDaGFyKCkgIT0gJ1wiJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB2YXIga2V5ID0gcGFyc2VTdHJpbmcoKTtcbiAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgIG1hcExvYyhwcm9wUHRyLCAna2V5JywgbG9jKTtcbiAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICc6Jykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICBvYmpba2V5XSA9IF9wYXJzZShwcm9wUHRyKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIHZhciBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ30nKSBicmVhaztcbiAgICAgIGlmIChjaGFyICE9ICcsJykgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkKHN0cikge1xuICAgIGZvciAodmFyIGk9MDsgaTxzdHIubGVuZ3RoOyBpKyspXG4gICAgICBpZiAoZ2V0Q2hhcigpICE9PSBzdHJbaV0pIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hhcigpIHtcbiAgICBjaGVja1VuZXhwZWN0ZWRFbmQoKTtcbiAgICB2YXIgY2hhciA9IHNvdXJjZVtwb3NdO1xuICAgIHBvcysrO1xuICAgIGNvbHVtbisrOyAvLyBuZXcgbGluZT9cbiAgICByZXR1cm4gY2hhcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhY2tDaGFyKCkge1xuICAgIHBvcy0tO1xuICAgIGNvbHVtbi0tO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hhckNvZGUoKSB7XG4gICAgdmFyIGNvdW50ID0gNDtcbiAgICB2YXIgY29kZSA9IDA7XG4gICAgd2hpbGUgKGNvdW50LS0pIHtcbiAgICAgIGNvZGUgPDw9IDQ7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ2YnKVxuICAgICAgICBjb2RlICs9IGNoYXIuY2hhckNvZGVBdCgpIC0gQV9DT0RFICsgMTA7XG4gICAgICBlbHNlIGlmIChjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgY29kZSArPSArY2hhcjtcbiAgICAgIGVsc2VcbiAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlnaXRzKCkge1xuICAgIHZhciBkaWdpdHMgPSAnJztcbiAgICB3aGlsZSAoc291cmNlW3Bvc10gPj0gJzAnICYmIHNvdXJjZVtwb3NdIDw9ICc5JylcbiAgICAgIGRpZ2l0cyArPSBnZXRDaGFyKCk7XG5cbiAgICBpZiAoZGlnaXRzLmxlbmd0aCkgcmV0dXJuIGRpZ2l0cztcbiAgICBjaGVja1VuZXhwZWN0ZWRFbmQoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBtYXBMb2MocHRyLCBwcm9wLCBnZXRMb2MoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXBMb2MocHRyLCBwcm9wLCBsb2MpIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0gbG9jO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBwb3M6IHBvc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1bmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIHRva2VuICcgKyBzb3VyY2VbcG9zXSArICcgaW4gSlNPTiBhdCBwb3NpdGlvbiAnICsgcG9zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhc1VuZXhwZWN0ZWRUb2tlbigpIHtcbiAgICBiYWNrQ2hhcigpO1xuICAgIHVuZXhwZWN0ZWRUb2tlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVbmV4cGVjdGVkRW5kKCkge1xuICAgIGlmIChwb3MgPj0gc291cmNlLmxlbmd0aClcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgSlNPTiBpbnB1dCcpO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKGRhdGEsIF8sIG9wdGlvbnMpIHtcbiAgaWYgKCF2YWxpZFR5cGUoZGF0YSkpIHJldHVybjtcbiAgdmFyIHdzTGluZSA9IDA7XG4gIHZhciB3c1Bvcywgd3NDb2x1bW47XG4gIHZhciB3aGl0ZXNwYWNlID0gdHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLnNwYWNlXG4gICAgICAgICAgICAgICAgICAgIDogb3B0aW9ucztcbiAgc3dpdGNoICh0eXBlb2Ygd2hpdGVzcGFjZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICB2YXIgbGVuID0gd2hpdGVzcGFjZSA+IDEwXG4gICAgICAgICAgICAgICAgICA/IDEwXG4gICAgICAgICAgICAgICAgICA6IHdoaXRlc3BhY2UgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgICAgICA6IE1hdGguZmxvb3Iod2hpdGVzcGFjZSk7XG4gICAgICB3aGl0ZXNwYWNlID0gbGVuICYmIHJlcGVhdChsZW4sICcgJyk7XG4gICAgICB3c1BvcyA9IGxlbjtcbiAgICAgIHdzQ29sdW1uID0gbGVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHdoaXRlc3BhY2UgPSB3aGl0ZXNwYWNlLnNsaWNlKDAsIDEwKTtcbiAgICAgIHdzUG9zID0gMDtcbiAgICAgIHdzQ29sdW1uID0gMDtcbiAgICAgIGZvciAodmFyIGo9MDsgajx3aGl0ZXNwYWNlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBjaGFyID0gd2hpdGVzcGFjZVtqXTtcbiAgICAgICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICAgICAgY2FzZSAnICc6IHdzQ29sdW1uKys7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcdCc6IHdzQ29sdW1uICs9IDQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xccic6IHdzQ29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogd3NDb2x1bW4gPSAwOyB3c0xpbmUrKzsgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCd3aGl0ZXNwYWNlIGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgaW4gSlNPTicpO1xuICAgICAgICB9XG4gICAgICAgIHdzUG9zKys7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgd2hpdGVzcGFjZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBqc29uID0gJyc7XG4gIHZhciBwb2ludGVycyA9IHt9O1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW4gPSAwO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGVzNiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lczYgJiYgdHlwZW9mIE1hcCA9PSAnZnVuY3Rpb24nO1xuICBfc3RyaW5naWZ5KGRhdGEsIDAsICcnKTtcbiAgcmV0dXJuIHtcbiAgICBqc29uOiBqc29uLFxuICAgIHBvaW50ZXJzOiBwb2ludGVyc1xuICB9O1xuXG4gIGZ1bmN0aW9uIF9zdHJpbmdpZnkoX2RhdGEsIGx2bCwgcHRyKSB7XG4gICAgbWFwKHB0ciwgJ3ZhbHVlJyk7XG4gICAgc3dpdGNoICh0eXBlb2YgX2RhdGEpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIG91dCgnJyArIF9kYXRhKTsgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBvdXQocXVvdGVkKF9kYXRhKSk7IGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKF9kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgb3V0KCdudWxsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF9kYXRhLnRvSlNPTiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb3V0KHF1b3RlZChfZGF0YS50b0pTT04oKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoX2RhdGEpKSB7XG4gICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgfSBlbHNlIGlmIChlczYpIHtcbiAgICAgICAgICBpZiAoX2RhdGEuY29uc3RydWN0b3IuQllURVNfUEVSX0VMRU1FTlQpXG4gICAgICAgICAgICBzdHJpbmdpZnlBcnJheSgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgTWFwKVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KCk7XG4gICAgICAgICAgZWxzZSBpZiAoX2RhdGEgaW5zdGFuY2VvZiBTZXQpXG4gICAgICAgICAgICBzdHJpbmdpZnlNYXBTZXQodHJ1ZSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RyaW5naWZ5T2JqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyaW5naWZ5T2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWFwKHB0ciwgJ3ZhbHVlRW5kJyk7XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlBcnJheSgpIHtcbiAgICAgIGlmIChfZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgb3V0KCdbJyk7XG4gICAgICAgIHZhciBpdGVtTHZsID0gbHZsICsgMTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPF9kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkpIG91dCgnLCcpO1xuICAgICAgICAgIGluZGVudChpdGVtTHZsKTtcbiAgICAgICAgICB2YXIgaXRlbSA9IHZhbGlkVHlwZShfZGF0YVtpXSkgPyBfZGF0YVtpXSA6IG51bGw7XG4gICAgICAgICAgdmFyIGl0ZW1QdHIgPSBwdHIgKyAnLycgKyBpO1xuICAgICAgICAgIF9zdHJpbmdpZnkoaXRlbSwgaXRlbUx2bCwgaXRlbVB0cik7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnXScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCdbXScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdCgpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoX2RhdGEpO1xuICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgdmFyIHZhbHVlID0gX2RhdGFba2V5XTtcbiAgICAgICAgICBpZiAodmFsaWRUeXBlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKGkpIG91dCgnLCcpO1xuICAgICAgICAgICAgdmFyIHByb3BQdHIgPSBwdHIgKyAnLycgKyBlc2NhcGVKc29uUG9pbnRlcihrZXkpO1xuICAgICAgICAgICAgaW5kZW50KHByb3BMdmwpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXknKTtcbiAgICAgICAgICAgIG91dChxdW90ZWQoa2V5KSk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgICAgICAgb3V0KCc6Jyk7XG4gICAgICAgICAgICBpZiAod2hpdGVzcGFjZSkgb3V0KCcgJyk7XG4gICAgICAgICAgICBfc3RyaW5naWZ5KHZhbHVlLCBwcm9wTHZsLCBwcm9wUHRyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnfScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCd7fScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeU1hcFNldChpc1NldCkge1xuICAgICAgaWYgKF9kYXRhLnNpemUpIHtcbiAgICAgICAgb3V0KCd7Jyk7XG4gICAgICAgIHZhciBwcm9wTHZsID0gbHZsICsgMTtcbiAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGVudHJpZXMgPSBfZGF0YS5lbnRyaWVzKCk7XG4gICAgICAgIHZhciBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB3aGlsZSAoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgIHZhciBrZXkgPSBpdGVtWzBdO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGlzU2V0ID8gdHJ1ZSA6IGl0ZW1bMV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICghZmlyc3QpIG91dCgnLCcpO1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZW50KGx2bCk7XG4gICAgICAgIG91dCgnfScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0KCd7fScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG91dChzdHIpIHtcbiAgICBjb2x1bW4gKz0gc3RyLmxlbmd0aDtcbiAgICBwb3MgKz0gc3RyLmxlbmd0aDtcbiAgICBqc29uICs9IHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluZGVudChsdmwpIHtcbiAgICBpZiAod2hpdGVzcGFjZSkge1xuICAgICAganNvbiArPSAnXFxuJyArIHJlcGVhdChsdmwsIHdoaXRlc3BhY2UpO1xuICAgICAgbGluZSsrO1xuICAgICAgY29sdW1uID0gMDtcbiAgICAgIHdoaWxlIChsdmwtLSkge1xuICAgICAgICBpZiAod3NMaW5lKSB7XG4gICAgICAgICAgbGluZSArPSB3c0xpbmU7XG4gICAgICAgICAgY29sdW1uID0gd3NDb2x1bW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uICs9IHdzQ29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIHBvcyArPSB3c1BvcztcbiAgICAgIH1cbiAgICAgIHBvcyArPSAxOyAvLyBcXG4gY2hhcmFjdGVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFwKHB0ciwgcHJvcCkge1xuICAgIHBvaW50ZXJzW3B0cl0gPSBwb2ludGVyc1twdHJdIHx8IHt9O1xuICAgIHBvaW50ZXJzW3B0cl1bcHJvcF0gPSB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBwb3M6IHBvc1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiByZXBlYXQobiwgc3RyKSB7XG4gICAgcmV0dXJuIEFycmF5KG4gKyAxKS5qb2luKHN0cik7XG4gIH1cbn07XG5cblxudmFyIFZBTElEX1RZUEVTID0gWydudW1iZXInLCAnYmlnaW50JywgJ2Jvb2xlYW4nLCAnc3RyaW5nJywgJ29iamVjdCddO1xuZnVuY3Rpb24gdmFsaWRUeXBlKGRhdGEpIHtcbiAgcmV0dXJuIFZBTElEX1RZUEVTLmluZGV4T2YodHlwZW9mIGRhdGEpID49IDA7XG59XG5cblxudmFyIEVTQ19RVU9URSA9IC9cInxcXFxcL2c7XG52YXIgRVNDX0IgPSAvW1xcYl0vZztcbnZhciBFU0NfRiA9IC9cXGYvZztcbnZhciBFU0NfTiA9IC9cXG4vZztcbnZhciBFU0NfUiA9IC9cXHIvZztcbnZhciBFU0NfVCA9IC9cXHQvZztcbmZ1bmN0aW9uIHF1b3RlZChzdHIpIHtcbiAgc3RyID0gc3RyLnJlcGxhY2UoRVNDX1FVT1RFLCAnXFxcXCQmJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX0YsICdcXFxcZicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19CLCAnXFxcXGInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfTiwgJ1xcXFxuJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX1IsICdcXFxccicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19ULCAnXFxcXHQnKTtcbiAgcmV0dXJuICdcIicgKyBzdHIgKyAnXCInO1xufVxuXG5cbnZhciBFU0NfMCA9IC9+L2c7XG52YXIgRVNDXzEgPSAvXFwvL2c7XG5mdW5jdGlvbiBlc2NhcGVKc29uUG9pbnRlcihzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKEVTQ18wLCAnfjAnKVxuICAgICAgICAgICAgLnJlcGxhY2UoRVNDXzEsICd+MScpO1xufVxuIiwiaW1wb3J0IFBST1BTIGZyb20gJy4vcHJvcG5hbWVzLmpzJztcclxuaW1wb3J0IEpzb25Tb3VyY2VNYXAgZnJvbSAnLi9qc29uc291cmNlbWFwLmpzJztcclxuXHJcbmNvbnN0IHtCTE9DSywgRUxFTSwgQ09OVEVOVCwgTU9EUywgTUlYfSA9IFBST1BTO1xyXG5jb25zdCBsb2NhdGlvbktleSA9IEpzb25Tb3VyY2VNYXAua2V5O1xyXG5cclxuY2xhc3MgQmVtTm9kZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5vZGUpIHtcclxuICAgICAgICB0aGlzLmJsb2NrID0gbm9kZVtCTE9DS107XHJcbiAgICAgICAgdGhpcy5lbGVtID0gbm9kZVtFTEVNXTtcclxuICAgICAgICB0aGlzLm1vZHMgPSBub2RlW01PRFNdO1xyXG4gICAgICAgIHRoaXMubWl4ID0gbm9kZVtNSVhdO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbm9kZVtsb2NhdGlvbktleV07XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLmJsb2NrICsgKHRoaXMuZWxlbSA/IChgX18ke3RoaXMuZWxlbX1gKSA6ICcnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmVtTm9kZTsiLCJpbXBvcnQgTGludEVycm9yIGZyb20gJy4vbGludGVycm9yLmpzJztcclxuXHJcbmNsYXNzIFdhcm5pbmdUZXh0U2l6ZVNob3VsZEJlRXF1YWwgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLlRFWFRfU0laRVNfU0hPVUxEX0JFX0VRVUFMJywgZXJyb3I6ICfQotC10LrRgdGC0Ysg0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20L3RiyDQsdGL0YLRjCDQvtC00L3QvtCz0L4g0YDQsNC30LzQtdGA0LAuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRCdXR0b25TaXplIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5JTlZBTElEX0JVVFRPTl9TSVpFJywgZXJyb3I6ICfQoNCw0LfQvNC10YAg0LrQvdC+0L/QutC4INCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L3QsCAxINGI0LDQsyDQsdC+0LvRjNGI0LUg0Y3RgtCw0LvQvtC90L3QvtCz0L4uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fUE9TSVRJT04nLCBlcnJvcjogJ9CR0LvQvtC6IGJ1dHRvbiDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC/0L7RgdC70LUg0LHQu9C+0LrQsCBwbGFjZWhvbGRlci4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9QTEFDRUhPTERFUl9TSVpFJywgZXJyb3I6ICfQlNC+0L/Rg9GB0YLQuNC80YvQtSDRgNCw0LfQvNC10YDRiyDQtNC70Y8g0LHQu9C+0LrQsCBwbGFjZWhvbGRlciDQsiDQsdC70L7QutC1IHdhcm5pbmc6IHMsIG0sIGwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFNldmVyYWxIMSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuU0VWRVJBTF9IMScsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3RjyDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINC10LTQuNC90YHRgtCy0LXQvdC90YvQvC4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgyUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDJfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8g0L3QtSDQvNC+0LbQtdGCINC90LDRhdC+0LTQuNGC0YzRgdGPINC/0LXRgNC10LQg0LfQsNCz0L7Qu9C+0LLQutC+0Lwg0L/QtdGA0LLQvtCz0L4g0YPRgNC+0LLQvdGPLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRJbnZhbGlkSDNQb3NpdGlvbiBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1RFWFQuSU5WQUxJRF9IM19QT1NJVElPTicsIGVycm9yOiAn0JfQsNCz0L7Qu9C+0LLQvtC6INGC0YDQtdGC0YzQtdCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INCy0YLQvtGA0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2NrcyBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ0dSSUQuVE9PX01VQ0hfTUFSS0VUSU5HX0JMT0NLUycsIGVycm9yOiAn0JzQsNGA0LrQtdGC0LjQvdCz0L7QstGL0LUg0LHQu9C+0LrQuCDQvdC1INC80L7Qs9GD0YIg0LfQsNC90LjQvNCw0YLRjCDQsdC+0LvRjNGI0LUg0L/QvtC70L7QstC40L3RiyDQvtGCINCy0YHQtdGFINC60L7Qu9C+0L3QvtC6INCx0LvQvtC60LAgZ3JpZCcsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsLFxyXG4gICAgV2FybmluZ0ludmFsaWRCdXR0b25TaXplLFxyXG4gICAgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbixcclxuICAgIFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplLFxyXG4gICAgVGV4dFNldmVyYWxIMSxcclxuICAgIFRleHRJbnZhbGlkSDJQb3NpdGlvbixcclxuICAgIFRleHRJbnZhbGlkSDNQb3NpdGlvbixcclxuICAgIEdyaWRUb29NdWNoTWFya2V0aW5nQmxvY2tzXHJcbn0iLCJcclxuY2xhc3MgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHtjb2RlLCBlcnJvciwgbG9jYXRpb259KSB7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcclxuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW50RXJyb3I7IiwiXHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3INCd0LXRgNCw0LfRgNC10YjQuNC80YvQtSDQvtGI0LjQsdC60LgsINC/0L7RgdC70LUg0LrQvtGC0L7RgNGL0YUg0L/RgNC10LrRgNCw0YnQsNC10Lwg0YDQsNCx0L7RgtGDLiDQmNGFINGH0LjRgdC70L4g0LzQvtC20LXRgiDRgdC+0LrRgNCw0YnQsNGC0YzRgdGPXHJcbiAqINC/0L4g0LzQtdGA0LUg0LTQvtCx0LDQstC70LXQvdC40Y8g0L3QvtCy0YvRhSDQv9GA0LDQstC40Lsg0LIg0LvQuNC90YLQtdGALlxyXG4gKi9cclxuY2xhc3MgSW52YWxpZElucHV0IGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJJbnZhbGlkIGlucHV0XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBOb1RleHROb2RlIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJBdCBsZWFzdCAxIHRleHQgbm9kZSBleHBlY3RlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEludmFsaWRJbnB1dCxcclxuICAgIE5vVGV4dE5vZGVcclxufSIsIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3INCQ0LTQsNC/0YLQtdGAINGE0YPQvdC60YbQuNC4IHBhcnNlINC40Lcg0LHQuNCx0LvQuNC+0YLQtdC60LgganNvbi1zb3VyY2UtbWFwXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtwYXJzZX0gZnJvbSAnanNvbi1zb3VyY2UtbWFwJztcclxuaW1wb3J0IFBST1BTIGZyb20gJy4vcHJvcG5hbWVzLmpzJztcclxuaW1wb3J0IHtJbnZhbGlkSW5wdXR9IGZyb20gXCIuL2Vycm9yL3N5c3RlbS5qc1wiO1xyXG5cclxuXHJcbmNvbnN0IHtDT05URU5UfSA9IFBST1BTO1xyXG5cclxuY29uc3QgcG9zaXRpb25LZXkgPSBTeW1ib2woJ1Bvc2l0aW9uJyk7XHJcblxyXG5jbGFzcyBKc29uU291cmNlTWFwIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzdHIpIHtcclxuICAgICAgICB0aGlzLnN0ciA9IHN0cjtcclxuICAgICAgICB0aGlzLmpzb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucG9pbnRlcnMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEpzb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2UodGhpcy5zdHIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5qc29uID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRlcnMgPSByZXN1bHQucG9pbnRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXRjaCh0aGlzLmpzb24sICcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuanNvbjtcclxuICAgIH07XHJcblxyXG4gICAgbWF0Y2ggPSAobm9kZSwgcGF0aCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZSwgdmFsdWVFbmR9ID0gdGhpcy5wb2ludGVyc1twYXRoXTtcclxuXHJcbiAgICAgICAgLy8gKzEg0LogY29sLCDRgi7Qui4g0LHQuNCx0LvQuNC+0YLQtdC60LAg0LLQtdC00LXRgiDQvtGC0YHRh9C10YIg0L7RgiAwLlxyXG4gICAgICAgIC8vINCf0YDQuCDRjdGC0L7QvCBsaW5lINCx0LXQtyDQuNC30LzQtdC90LXQvdC40Y8sINGCLtC6LiDQuNGB0YXQvtC00L3Ri9C5IEpTT04g0L7QsdC10YDQvdGD0LvQuCAo0L/QvtC70L7QttC40LvQuCDQstC90YPRgtGA0Ywg0YHQstC+0LnRgdGC0LLQsCBcImNvbnRlbnRcIilcclxuICAgICAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBbdmFsdWUsIHZhbHVlRW5kXS5tYXAodmFsID0+ICh7bGluZTogdmFsLmxpbmUsIGNvbHVtbjogdmFsLmNvbHVtbiArIDF9KSk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBub2RlW0NPTlRFTlRdO1xyXG5cclxuICAgICAgICBub2RlW3Bvc2l0aW9uS2V5XSA9IHtzdGFydCwgZW5kfTtcclxuXHJcbiAgICAgICAgaWYgKCFjaGlsZHJlbilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaChjaGlsZCwgYCR7cGF0aH0vJHtDT05URU5UfS8ke2luZH1gKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1hdGNoKGNoaWxkcmVuLCBgJHtwYXRofS8ke0NPTlRFTlR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMga2V5ID0gcG9zaXRpb25LZXk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEpzb25Tb3VyY2VNYXA7IiwiaW1wb3J0IFBST1BTIGZyb20gXCIuL3Byb3BuYW1lcy5qc1wiO1xyXG5pbXBvcnQgSnNvblNvdXJjZU1hcCBmcm9tICcuL2pzb25zb3VyY2VtYXAuanMnO1xyXG5pbXBvcnQgQmVtTm9kZSBmcm9tICcuL2JlbW5vZGUuanMnO1xyXG5pbXBvcnQgUnVsZU1lZGlhdG9yIGZyb20gJy4vcnVsZXMvcnVsZW1lZGlhdG9yLmpzJztcclxuaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuL3J1bGVzL3J1bGViYXNlLmpzXCI7XHJcblxyXG5jb25zdCB7Q09OVEVOVH0gPSBQUk9QUztcclxuY29uc3QgcGhhc2VzID0gUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcztcclxuXHJcbmNsYXNzIExpbnRlciB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8IVJ1bGVCYXNlPn0gcnVsZUNsYXNzZXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocnVsZUNsYXNzZXMgPSBbXSkge1xyXG4gICAgICAgIHRoaXMucnVsZUNsYXNzZXMgPSBydWxlQ2xhc3NlcztcclxuXHJcbiAgICAgICAgdGhpcy5tZWRpYXRvciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqL1xyXG4gICAgbGludChzdHIpIHtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RyaW5nVHJlZSA9IHRoaXMuYXR0YWNoUm9vdChzdHIpO1xyXG4gICAgICAgIGNvbnN0IG1hcHBlciA9IG5ldyBKc29uU291cmNlTWFwKHN0cmluZ1RyZWUpO1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBtYXBwZXIuZ2V0SnNvbihzdHJpbmdUcmVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZXh0KHJvb3QpO1xyXG4gICAgICAgIHRoaXMuY2FsbEFsbChwaGFzZXMuZW5kKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETyBmaWx0ZXIgZXJyb3JzXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgcnVsZXNJbnN0YW5jZXMgPSB0aGlzLnJ1bGVDbGFzc2VzLm1hcChyQ2xhc3MgPT4gbmV3IHJDbGFzcygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tZWRpYXRvciA9IG5ldyBSdWxlTWVkaWF0b3IocnVsZXNJbnN0YW5jZXMpO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyog0JLRhdC+0LQg0LzQvtC20LXRgiDQsdGL0YLRjCDQvtCx0YrQtdC60YLQvtC8INC40LvQuCDQvNCw0YHRgdC40LLQvtC8ICjQtNC10YDQtdCy0L4g0LjQu9C4INC70LXRgSkuINCU0L7QsdCw0LLQuNC8INCy0LjRgNGC0YPQsNC70YzQvdGL0Lkg0LrQvtGA0LXQvdGMLCDQstGB0LXQs9C00LAg0LHRi9C70L4g0LTQtdGA0LXQstC+LiAqL1xyXG4gICAgYXR0YWNoUm9vdCA9IHN0ciA9PiBge1wiJHtDT05URU5UfVwiOlxcbiR7c3RyfVxcbn1gO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcclxuICAgICAqL1xyXG4gICAgbmV4dCA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYmVtTm9kZSA9IG5ldyBCZW1Ob2RlKG5vZGUpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jb250ZW50QXNBcnJheShub2RlW0NPTlRFTlRdKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsKHBoYXNlcy5pbiwgYmVtTm9kZSk7XHJcblxyXG4gICAgICAgIGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KGNoaWxkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsKHBoYXNlcy5vdXQsIGJlbU5vZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5tZWRpYXRvci5jYWxsKHBoYXNlLCBiZW1Ob2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5tZWRpYXRvci5jYWxsQWxsKHBoYXNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFcnJvcnMoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcnJvcnMoZXJyb3JzKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbLi4uZXJyb3JzLCAuLi50aGlzLmVycm9yc107XHJcbiAgICB9XHJcblxyXG4gICAgY29udGVudEFzQXJyYXkoZWwpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbCkpXHJcbiAgICAgICAgICAgIHJldHVybiBlbDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsID8gW2VsXSA6IFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW50ZXI7IiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgQkxPQ0s6IFwiYmxvY2tcIixcclxuICAgIEVMRU06IFwiZWxlbVwiLFxyXG4gICAgQ09OVEVOVDogXCJjb250ZW50XCIsXHJcbiAgICBNT0RTOiBcIm1vZHNcIixcclxuICAgIE1JWDogXCJtaXhcIlxyXG59OyIsImltcG9ydCBUZXh0U2l6ZXMgZnJvbSAnLi93YXJuaW5nL3RleHRzaXplcy5qcydcclxuaW1wb3J0IEJ1dHRvblNpemUgZnJvbSAnLi93YXJuaW5nL2J1dHRvbnNpemUuanMnXHJcbmltcG9ydCBCdXR0b25Qb3NpdGlvbiBmcm9tICcuL3dhcm5pbmcvYnV0dG9ucG9zaXRpb24uanMnXHJcbmltcG9ydCBQbGFjZWhvbGRlclNpemUgZnJvbSAnLi93YXJuaW5nL3BsYWNlaG9sZGVyc2l6ZS5qcydcclxuXHJcbmNvbnN0IHJ1bGVzID0gW1RleHRTaXplcywgQnV0dG9uU2l6ZSwgQnV0dG9uUG9zaXRpb24sIFBsYWNlaG9sZGVyU2l6ZV07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlczsiLCJcclxuY2xhc3MgUnVsZUJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQndCw0LHQvtGAINGB0LXQu9C10LrRgtC+0YDQvtCyIChCZW1Ob2RlLnNlbGVjdG9yKSDRg9C30LvQvtCyLCDQvdCwINC60L7RgtC+0YDRi9GFINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQv9GA0LDQstC40LvQvi5cclxuICAgICAqINCV0YHQu9C4INC90LUg0LfQsNC00LDQvSAtINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvdCwINC60LDQttC00L7QvCDRg9C30LvQtSAoVE9ETykuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZWxlY3RvcnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3JzID0gW10pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqIEBlbnVte3N0cmluZ30gKi9cclxuUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcyA9IHtcclxuICAgIC8qINCS0YXQvtC00LjQvCDQsiDQvtGH0LXRgNC10LTQvdC+0Lkg0YPQt9C10Lsg0LTQtdGA0LXQstCwKi9cclxuICAgIGluOiAnaW4nLFxyXG4gICAgLyog0JLRi9GF0L7QtNC40LwgKi9cclxuICAgIG91dDogJ291dCcsXHJcbiAgICAvKiDQl9Cw0LrQsNC90YfQuNCy0LDQtdC8INC+0LHRhdC+0LQg0LTQtdGA0LXQstCwICovXHJcbiAgICBlbmQ6ICdlbmQnXHJcbn07XHJcblxyXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKEJlbU5vZGUpOiAoIUxpbnRFcnJvcnx1bmRlZmluZWQpfSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyVHlwZTtcclxuXHJcbi8qKiBAdHlwZWRlZiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIE9iamVjdDxzdHJpbmcsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPj59ICovXHJcblJ1bGVCYXNlLkhhbmRsZXJzTWFwVHlwZTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlQmFzZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSAnLi9ydWxlYmFzZS5qcyc7XHJcblxyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgUnVsZU1lZGlhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5idWlsZE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWFwKCkge1xyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gcnVsZS5nZXRTZWxlY3RvcnMoKTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnNNYXAgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHBoYXNlIGluIGhhbmRsZXJzTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNNYXBbcGhhc2VdO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShwaGFzZSwgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFuZGxlcnNNYXBba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyc01hcFtrZXldID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XS5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEtleShwaGFzZSwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gcGhhc2UgKyAnJCcgKyBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0FycmF5PCFMaW50RXJyb3I+fVxyXG4gICAgICovXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIGJlbU5vZGUuc2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtrZXldIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IGhhbmRsZXJzLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoYmVtTm9kZSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IHJ1bGUuZ2V0UGhhc2VIYW5kbGVyc01hcCgpW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goaGFuZGxlcihudWxsKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlTWVkaWF0b3I7IiwiXHJcbmNvbnN0IHNpemVzU2NhbGUgPSBbXCJ4eHhzXCIsIFwieHhzXCIsIFwieHNcIiwgXCJzXCIsIFwibVwiLCBcImxcIiwgXCJ4bFwiLCBcInh4bFwiLCBcInh4eGxcIiwgXCJ4eHh4bFwiLCBcInh4eHh4bFwiXTtcclxuXHJcbmNsYXNzIFNpemUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2l6ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxyXG4gICAgICogQHJldHVybiB7U2l6ZX1cclxuICAgICAqL1xyXG4gICAgYWRkKGNvdW50KSB7XHJcbiAgICAgICAgbGV0IGluZCA9IHNpemVzU2NhbGUuaW5kZXhPZih0aGlzLnNpemUpO1xyXG5cclxuICAgICAgICBpZiAofmluZClcclxuICAgICAgICAgICAgaW5kID0gaW5kICsgY291bnQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemVzU2NhbGVbaW5kXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2soc2l6ZUIpIHtcclxuICAgICAgICByZXR1cm4gISEodGhpcy5zaXplICYmIHNpemVCKSAmJiB0aGlzLnNpemUgPT09IHNpemVCO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaXNEZWYoeCkge1xyXG4gICAgcmV0dXJuIHggIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldChvYmosIC4uLnByb3BzKSB7XHJcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgLy8g0YTRg9C90LrRhtC40Lgg0L3QtSDQv9GA0LXQtNC/0L7Qu9Cw0LPQsNGO0YLRgdGPXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICBsZXQgY3VycmVudCA9IG9iajtcclxuXHJcbiAgICBmb3IgKGxldCBwcm9wIG9mIHByb3BzKSB7XHJcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XHJcblxyXG4gICAgICAgIGlmICghaXNEZWYocHJvcCkpXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgU2l6ZSxcclxuICAgIGdldFxyXG59IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY2xhc3MgQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAnYnV0dG9uJywgJ3BsYWNlaG9sZGVyJ10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJOb2RlcyA9IG5ldyBNYXAoKTsgLy8g0YXRgNCw0L3QuNC8IDEgcGxhY2Vob2xkZXJcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzID0gbmV3IE1hcCgpOyAvLyDRhdGA0LDQvdC40LwgMSBidXR0b25cclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAncGxhY2Vob2xkZXInKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlck5vZGVzLmhhcyh3YXJuaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlck5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nSW52YWxpZEJ1dHRvblBvc2l0aW9uKHdhcm5pbmcubG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ2J1dHRvbicpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbk5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJOb2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Qb3NpdGlvbjsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZEJ1dHRvblNpemV9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuaW1wb3J0IHtOb1RleHROb2RlfSBmcm9tIFwiLi4vLi4vZXJyb3Ivc3lzdGVtLmpzXCI7XHJcblxyXG5jbGFzcyBCdXR0b25TaXplIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ2J1dHRvbicsICd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uTm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50ZXh0Tm9kZXMuaGFzKHdhcm5pbmcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbk5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5zZXQod2FybmluZywgW10pO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b25Ob2RlcyA9IHRoaXMuYnV0dG9uTm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICBidXR0b25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuICAgICAgICBjb25zdCBmaXJzdFRleHROb2RlID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKCFidXR0b25zKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETyDQv9GA0LXQtNC/0L7Qu9Cw0LPQsNC10LwsINGH0YLQviDRgtC10LrRgdGC0L7QstGL0LUg0L3QvtC00Ysg0L7QsdGP0LfQsNC90Ysg0LHRi9GC0YwsINGCLtC6LiDQuNC90LDRh9C1INGN0YLQsNC70L7QvdC90YvQuSDRgNCw0LfQvNC10YAg0L3QtSDQvtC/0YDQtdC00LXQu9C10L0g0Lgg0L/QvtC10LTRg9GCINC00YDRg9Cz0LjQtSDQv9GA0LDQstC40LvQsC4g0J/RgNC+0LLQtdGA0LjRgtGMINC/0YDQtdC00L/QvtC70L7QttC10L3QuNC1LlxyXG4gICAgICAgIGlmICghZmlyc3RUZXh0Tm9kZSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGV4dE5vZGUoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZVZhbEEgPSBnZXQoZmlyc3RUZXh0Tm9kZS5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIHNpemUuYWRkKDEpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldChidXR0b24ubW9kcywgJ3NpemUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vINCU0LDQttC1INC10YHQu9C4INCyINGA0LDQvNC60LDRhSDQvtC00L3QvtCz0L4g0LHQu9C+0LrQsCDQvdC10YHQutC+0LvRjNC60L4g0L7RiNC40LHQvtGH0L3Ri9GFINGB0LvQvtCyLCDRgtC+INCy0L7QstGA0LDRidCw0LXQvCDQvtC00L3RgyDQvtGI0LjQsdC60YMuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZS5jaGVjayhzaXplVmFsQikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZShub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TaXplOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jb25zdCBjb3JyZWN0U2l6ZXMgPSBbJ3MnLCAnbScsICdsJ107XHJcblxyXG5jbGFzcyBQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3dhcm5pbmcnLCAncGxhY2Vob2xkZXInXSk7XHJcblxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLm91dF06IHRoaXMub3V0LmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMuZ2V0TGFzdFdhcm5pbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKCF3YXJuaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSBnZXQobm9kZS5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IGluZCA9IGNvcnJlY3RTaXplcy5pbmRleE9mKHNpemUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbmQgPT09IC0xKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFdhcm5pbmdJbnZhbGlkUGxhY2Vob2xkZXJTaXplKG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG91dChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgIT09ICd3YXJuaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy53YXJuaW5ncy5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYWNlaG9sZGVyU2l6ZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcbmltcG9ydCB7Tm9UZXh0Tm9kZX0gZnJvbSBcIi4uLy4uL2Vycm9yL3N5c3RlbS5qc1wiO1xyXG5cclxuY2xhc3MgVGV4dFNpemVzIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIC8vINCh0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LHQu9C+0LrQuCB3YXJuaW5nINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LLQu9C+0LbQtdC90L3Ri9C80LguINCa0LDQttC00YvQuSDQstC70L7QttC10L3QvdGL0Lkg0LHQu9C+0Logd2FybmluZyDRgdC+0LfQtNCw0LXRgiDRgdCy0L7QuSBFcnJvciBib3VuZGFyeS5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0ZXh0Tm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gdGhpcy50ZXh0Tm9kZXMuZ2V0KHdhcm5pbmcpO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gZXJyb3IgZW1pdHRpbmdcclxuICAgICAgICAvLyBUT0RPINC/0YDQtdC00L/QvtC70LDQs9Cw0LXQvCwg0YfRgtC+INGC0LXQutGB0YLQvtCy0YvQtSDQvdC+0LTRiyDQvtCx0Y/Qt9Cw0L3RiyDQsdGL0YLRjCwg0YIu0LouINC40L3QsNGH0LUg0Y3RgtCw0LvQvtC90L3Ri9C5INGA0LDQt9C80LXRgCDQvdC1INC+0L/RgNC10LTQtdC70LXQvSDQuCDQv9C+0LXQtNGD0YIg0LTRgNGD0LPQuNC1INC/0YDQsNCy0LjQu9CwLiDQn9GA0L7QstC10YDQuNGC0Ywg0L/RgNC10LTQv9C+0LvQvtC20LXQvdC40LUuXHJcbiAgICAgICAgaWYgKCF0ZXh0Tm9kZXMpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1RleHROb2RlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IFtmaXJzdCwgLi4ub3RoZXJdID0gdGV4dE5vZGVzO1xyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0Lm1vZHMsICdzaXplJyk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG5ldyBTaXplKHNpemVWYWxBKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdGV4dCBvZiBvdGhlcikge1xyXG4gICAgICAgICAgICBjb25zdCBzaXplVmFsQiA9IGdldCh0ZXh0Lm1vZHMsICdzaXplJyk7XHJcblxyXG4gICAgICAgICAgICAvLyDQlNCw0LbQtSDQtdGB0LvQuCDQsiDRgNCw0LzQutCw0YUg0L7QtNC90L7Qs9C+INCx0LvQvtC60LAg0L3QtdGB0LrQvtC70YzQutC+INC+0YjQuNCx0L7Rh9C90YvRhSDRgdC70L7Qsiwg0YLQviDQstC+0LLRgNCw0YnQsNC10Lwg0L7QtNC90YMg0L7RiNC40LHQutGDLlxyXG4gICAgICAgICAgICBpZiAoIXNpemUuY2hlY2soc2l6ZVZhbEIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsKG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXN0V2FybmluZygpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLndhcm5pbmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3NbbGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRTaXplczsiLCJjb25zdCB0ZXN0cyA9IFtcclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG4gICAgYFxyXG4gICAge1xyXG4gICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibFwifX0sXHJcbiAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibVwifX1cclxuICAgIF1cclxufVxyXG4gICAgYCxcclxuXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJtXCJ9fSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAgICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcIm1cIn19XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgICAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibVwifX0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJtXCJ9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibVwifX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcIm1cIn19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG4gICAgYFxyXG4gICAge1xyXG4gICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAgeyBcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJsXCIgfSB9LFxyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcImJ1dHRvblwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJ4bFwiIH0gfVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwibFwiIH0gfSxcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJidXR0b25cIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwic1wiIH0gfVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcInBsYWNlaG9sZGVyXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcIm1cIiB9IH0sXHJcbiAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibFwifX0sXHJcbiAgICAgICAgeyBcImJsb2NrXCI6IFwiYnV0dG9uXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcIm1cIiB9IH1cclxuICAgIF1cclxufVxyXG4gICAgYCxcclxuXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJidXR0b25cIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwibVwiIH0gfSxcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJwbGFjZWhvbGRlclwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJ4bFwiIH0gfVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJwbGFjZWhvbGRlclwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJtXCIgfX1cclxuICAgIF1cclxufVxyXG4gICAgYCxcclxuXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJwbGFjZWhvbGRlclwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJ4bFwiIH19XHJcbiAgICBdXHJcbn1cclxuICAgIGBcclxuXTtcclxuXHJcbmNvbnN0IGFuc3dlcnMgPSB7fVxyXG5cclxuZXhwb3J0IHt0ZXN0cywgYW5zd2Vyc307Il0sInNvdXJjZVJvb3QiOiIifQ==