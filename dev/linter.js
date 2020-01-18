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
/* harmony import */ var _text_severalh1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text/severalh1.js */ "./src/rules/text/severalh1.js");
/* harmony import */ var _text_h1h2_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text/h1h2.js */ "./src/rules/text/h1h2.js");






const rules = [_warning_textsizes_js__WEBPACK_IMPORTED_MODULE_0__["default"], _warning_buttonsize_js__WEBPACK_IMPORTED_MODULE_1__["default"], _warning_buttonposition_js__WEBPACK_IMPORTED_MODULE_2__["default"], _warning_placeholdersize_js__WEBPACK_IMPORTED_MODULE_3__["default"], _text_severalh1_js__WEBPACK_IMPORTED_MODULE_4__["default"], _text_h1h2_js__WEBPACK_IMPORTED_MODULE_5__["default"]];
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
    if (!warning) return; // TODO считаем, что в блоке warning не более 1 button и не более 1 placeholer (хотя это не обязоно быть так)
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
        { "block": "button", "mods": { "size": "s" } },
        { "block": "button", "mods": { "size": "xl" } },
        { "block": "button", "mods": { "size": "l" } }
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
    `, `
    [
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]
    `, `
    [
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]
    `];
const answers = {};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzb24tc291cmNlLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmVtbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IvZXJyb3JsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lcnJvci9saW50ZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL3N5c3RlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanNvbnNvdXJjZW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9wbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGViYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlbWVkaWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RleHQvaDFoMi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdGV4dC9zZXZlcmFsaDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL2J1dHRvbnNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3dhcm5pbmcvcGxhY2Vob2xkZXJzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy93YXJuaW5nL3RleHRzaXplcy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0Y2FzZXMuanMiXSwibmFtZXMiOlsibGludGVyIiwiTGludGVyIiwicnVsZXMiLCJ3aW5kb3ciLCJsaW50Iiwic3RyIiwidGVzdHMiLCJmb3JFYWNoIiwidGVzdCIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJCTE9DSyIsIkVMRU0iLCJDT05URU5UIiwiTU9EUyIsIk1JWCIsIlBST1BTIiwibG9jYXRpb25LZXkiLCJKc29uU291cmNlTWFwIiwia2V5IiwiQmVtTm9kZSIsImNvbnN0cnVjdG9yIiwibm9kZSIsImJsb2NrIiwiZWxlbSIsIm1vZHMiLCJtaXgiLCJsb2NhdGlvbiIsInNlbGVjdG9yIiwiV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCIsIkxpbnRFcnJvciIsImNvZGUiLCJlcnJvciIsIldhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSIsIldhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24iLCJXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSIsIlRleHRTZXZlcmFsSDEiLCJUZXh0SW52YWxpZEgyUG9zaXRpb24iLCJUZXh0SW52YWxpZEgzUG9zaXRpb24iLCJHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2NrcyIsIkludmFsaWRJbnB1dCIsIkVycm9yIiwiTm9UZXh0Tm9kZSIsInBvc2l0aW9uS2V5IiwiU3ltYm9sIiwicmVzdWx0IiwicGFyc2UiLCJqc29uIiwiZGF0YSIsInBvaW50ZXJzIiwiZSIsIm1hdGNoIiwicGF0aCIsInZhbHVlIiwidmFsdWVFbmQiLCJzdGFydCIsImVuZCIsIm1hcCIsInZhbCIsImxpbmUiLCJjb2x1bW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImNoaWxkIiwiaW5kIiwicGhhc2VzIiwiUnVsZUJhc2UiLCJwcm90b3R5cGUiLCJydWxlQ2xhc3NlcyIsImJlbU5vZGUiLCJjb250ZW50QXNBcnJheSIsImNhbGwiLCJpbiIsIm5leHQiLCJvdXQiLCJtZWRpYXRvciIsImVycm9ycyIsImluaXQiLCJzdHJpbmdUcmVlIiwiYXR0YWNoUm9vdCIsIm1hcHBlciIsInJvb3QiLCJnZXRKc29uIiwiY2FsbEFsbCIsInJ1bGVzSW5zdGFuY2VzIiwickNsYXNzIiwiUnVsZU1lZGlhdG9yIiwicGhhc2UiLCJhZGRFcnJvcnMiLCJlbCIsIlRleHRTaXplcyIsIkJ1dHRvblNpemUiLCJCdXR0b25Qb3NpdGlvbiIsIlBsYWNlaG9sZGVyU2l6ZSIsIlNldmVyYWxIMSIsIkgxSDIiLCJzZWxlY3RvcnMiLCJnZXRTZWxlY3RvcnMiLCJnZXRQaGFzZUhhbmRsZXJzTWFwIiwiSGFuZGxlclR5cGUiLCJIYW5kbGVyc01hcFR5cGUiLCJoYW5kbGVyc01hcCIsImJ1aWxkTWFwIiwicnVsZSIsImhhbmRsZXIiLCJnZXRLZXkiLCJwdXNoIiwiaGFuZGxlcnMiLCJoYW5kbGVyRXJyb3JzIiwiZmlsdGVyIiwiaDJOb2RlcyIsImgxd2FzIiwiYmluZCIsInR5cGUiLCJnZXQiLCJsZW5ndGgiLCJzaXplc1NjYWxlIiwiU2l6ZSIsInNpemUiLCJhZGQiLCJjb3VudCIsImluZGV4T2YiLCJjaGVjayIsInNpemVCIiwiaXNEZWYiLCJ4IiwidW5kZWZpbmVkIiwib2JqIiwicHJvcHMiLCJjdXJyZW50IiwicHJvcCIsIndhcm5pbmdzIiwicGxhY2Vob2xkZXJOb2RlcyIsIk1hcCIsImJ1dHRvbk5vZGVzIiwid2FybmluZyIsImdldExhc3RXYXJuaW5nIiwiaGFzIiwiaW52YWxpZEJ1dHRvbiIsInNldCIsInBvcCIsImRlbGV0ZSIsInRleHROb2RlcyIsImZpcnN0VGV4dE5vZGUiLCJidXR0b25zIiwic2l6ZVZhbEEiLCJidXR0b24iLCJzaXplVmFsQiIsImNvcnJlY3RTaXplcyIsImZpcnN0Iiwib3RoZXIiLCJ0ZXh0IiwiYW5zd2VycyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7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QUFBO0FBQUE7QUFBQSxNQUFNdEYsS0FBSyxHQUFHLENBQ1Q7Ozs7Ozs7O0tBRFMsRUFXVDs7Ozs7Ozs7S0FYUyxFQXFCVDs7Ozs7Ozs7Ozs7Ozs7O0tBckJTLEVBdUNUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXZDUyxFQXNFVDs7Ozs7Ozs7S0F0RVMsRUFnRlQ7Ozs7Ozs7Ozs7S0FoRlMsRUE0RlQ7Ozs7Ozs7OztLQTVGUyxFQXVHVDs7Ozs7Ozs7O0tBdkdTLEVBbUhUOzs7Ozs7OztLQW5IUyxFQTZIVDs7Ozs7Ozs7S0E3SFMsRUF3SVQ7Ozs7Ozs7Ozs7O0tBeElTLEVBcUpUOzs7Ozs7Ozs7Ozs7Ozs7S0FySlMsQ0FBZDtBQXVLQSxNQUFNb0osT0FBTyxHQUFHLEVBQWhCIiwiZmlsZSI6ImxpbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTGludGVyIGZyb20gJy4vc3JjL2xpbnRlci5qcyc7XHJcbmltcG9ydCBydWxlcyBmcm9tICcuL3NyYy9ydWxlcy9saXN0LmpzJ1xyXG5cclxuLy8gVE9ETyBmb3IgdGVzdFxyXG5pbXBvcnQge3Rlc3RzLCBhbnN3ZXJzfSBmcm9tIFwiLi90ZXN0Y2FzZXMuanNcIjtcclxuXHJcbmNvbnN0IGxpbnRlciA9IG5ldyBMaW50ZXIocnVsZXMpO1xyXG5cclxud2luZG93LmxpbnQgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIHJldHVybiBsaW50ZXIubGludChzdHIpO1xyXG59O1xyXG5cclxuLy8gVE9ETyBmb3IgdGVzdFxyXG5cclxudGVzdHMuZm9yRWFjaCh0ZXN0ID0+IHtcclxuICAgIGNvbnN0IHJlcyA9IHdpbmRvdy5saW50KHRlc3QpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbn0pXHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVzY2FwZWRDaGFycyA9IHtcbiAgJ2InOiAnXFxiJyxcbiAgJ2YnOiAnXFxmJyxcbiAgJ24nOiAnXFxuJyxcbiAgJ3InOiAnXFxyJyxcbiAgJ3QnOiAnXFx0JyxcbiAgJ1wiJzogJ1wiJyxcbiAgJy8nOiAnLycsXG4gICdcXFxcJzogJ1xcXFwnXG59O1xuXG52YXIgQV9DT0RFID0gJ2EnLmNoYXJDb2RlQXQoKTtcblxuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgXywgb3B0aW9ucykge1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBiaWdpbnQgPSBvcHRpb25zICYmIG9wdGlvbnMuYmlnaW50ICYmIHR5cGVvZiBCaWdJbnQgIT0gJ3VuZGVmaW5lZCc7XG4gIHJldHVybiB7XG4gICAgZGF0YTogX3BhcnNlKCcnLCB0cnVlKSxcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfcGFyc2UocHRyLCB0b3BMZXZlbCkge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgZGF0YTtcbiAgICBtYXAocHRyLCAndmFsdWUnKTtcbiAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgIGNhc2UgJ3QnOiByZWFkKCdydWUnKTsgZGF0YSA9IHRydWU7IGJyZWFrO1xuICAgICAgY2FzZSAnZic6IHJlYWQoJ2Fsc2UnKTsgZGF0YSA9IGZhbHNlOyBicmVhaztcbiAgICAgIGNhc2UgJ24nOiByZWFkKCd1bGwnKTsgZGF0YSA9IG51bGw7IGJyZWFrO1xuICAgICAgY2FzZSAnXCInOiBkYXRhID0gcGFyc2VTdHJpbmcoKTsgYnJlYWs7XG4gICAgICBjYXNlICdbJzogZGF0YSA9IHBhcnNlQXJyYXkocHRyKTsgYnJlYWs7XG4gICAgICBjYXNlICd7JzogZGF0YSA9IHBhcnNlT2JqZWN0KHB0cik7IGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYmFja0NoYXIoKTtcbiAgICAgICAgaWYgKCctMDEyMzQ1Njc4OScuaW5kZXhPZihjaGFyKSA+PSAwKVxuICAgICAgICAgIGRhdGEgPSBwYXJzZU51bWJlcigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICBpZiAodG9wTGV2ZWwgJiYgcG9zIDwgc291cmNlLmxlbmd0aCkgdW5leHBlY3RlZFRva2VuKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZXNwYWNlKCkge1xuICAgIGxvb3A6XG4gICAgICB3aGlsZSAocG9zIDwgc291cmNlLmxlbmd0aCkge1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZVtwb3NdKSB7XG4gICAgICAgICAgY2FzZSAnICc6IGNvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiBjb2x1bW4gKz0gNDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxyJzogY29sdW1uID0gMDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnXFxuJzogY29sdW1uID0gMDsgbGluZSsrOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBicmVhayBsb29wO1xuICAgICAgICB9XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTdHJpbmcoKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuICAgIHZhciBjaGFyO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjaGFyID0gZ2V0Q2hhcigpO1xuICAgICAgaWYgKGNoYXIgPT0gJ1wiJykge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnXFxcXCcpIHtcbiAgICAgICAgY2hhciA9IGdldENoYXIoKTtcbiAgICAgICAgaWYgKGNoYXIgaW4gZXNjYXBlZENoYXJzKVxuICAgICAgICAgIHN0ciArPSBlc2NhcGVkQ2hhcnNbY2hhcl07XG4gICAgICAgIGVsc2UgaWYgKGNoYXIgPT0gJ3UnKVxuICAgICAgICAgIHN0ciArPSBnZXRDaGFyQ29kZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgd2FzVW5leHBlY3RlZFRva2VuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgKz0gY2hhcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTnVtYmVyKCkge1xuICAgIHZhciBudW1TdHIgPSAnJztcbiAgICB2YXIgaW50ZWdlciA9IHRydWU7XG4gICAgaWYgKHNvdXJjZVtwb3NdID09ICctJykgbnVtU3RyICs9IGdldENoYXIoKTtcblxuICAgIG51bVN0ciArPSBzb3VyY2VbcG9zXSA9PSAnMCdcbiAgICAgICAgICAgICAgPyBnZXRDaGFyKClcbiAgICAgICAgICAgICAgOiBnZXREaWdpdHMoKTtcblxuICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnLicpIHtcbiAgICAgIG51bVN0ciArPSBnZXRDaGFyKCkgKyBnZXREaWdpdHMoKTtcbiAgICAgIGludGVnZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlW3Bvc10gPT0gJ2UnIHx8IHNvdXJjZVtwb3NdID09ICdFJykge1xuICAgICAgbnVtU3RyICs9IGdldENoYXIoKTtcbiAgICAgIGlmIChzb3VyY2VbcG9zXSA9PSAnKycgfHwgc291cmNlW3Bvc10gPT0gJy0nKSBudW1TdHIgKz0gZ2V0Q2hhcigpO1xuICAgICAgbnVtU3RyICs9IGdldERpZ2l0cygpO1xuICAgICAgaW50ZWdlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSArbnVtU3RyO1xuICAgIHJldHVybiBiaWdpbnQgJiYgaW50ZWdlciAmJiAocmVzdWx0ID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgcmVzdWx0IDwgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpXG4gICAgICAgICAgICA/IEJpZ0ludChudW1TdHIpXG4gICAgICAgICAgICA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQXJyYXkocHRyKSB7XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKGdldENoYXIoKSA9PSAnXScpIHJldHVybiBhcnI7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgaXRlbVB0ciA9IHB0ciArICcvJyArIGk7XG4gICAgICBhcnIucHVzaChfcGFyc2UoaXRlbVB0cikpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCk7XG4gICAgICBpZiAoY2hhciA9PSAnXScpIGJyZWFrO1xuICAgICAgaWYgKGNoYXIgIT0gJywnKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlT2JqZWN0KHB0cikge1xuICAgIHdoaXRlc3BhY2UoKTtcbiAgICB2YXIgb2JqID0ge307XG4gICAgaWYgKGdldENoYXIoKSA9PSAnfScpIHJldHVybiBvYmo7XG4gICAgYmFja0NoYXIoKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgbG9jID0gZ2V0TG9jKCk7XG4gICAgICBpZiAoZ2V0Q2hhcigpICE9ICdcIicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgdmFyIGtleSA9IHBhcnNlU3RyaW5nKCk7XG4gICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICBtYXBMb2MocHJvcFB0ciwgJ2tleScsIGxvYyk7XG4gICAgICBtYXAocHJvcFB0ciwgJ2tleUVuZCcpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgaWYgKGdldENoYXIoKSAhPSAnOicpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgb2JqW2tleV0gPSBfcGFyc2UocHJvcFB0cik7XG4gICAgICB3aGl0ZXNwYWNlKCk7XG4gICAgICB2YXIgY2hhciA9IGdldENoYXIoKTtcbiAgICAgIGlmIChjaGFyID09ICd9JykgYnJlYWs7XG4gICAgICBpZiAoY2hhciAhPSAnLCcpIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZChzdHIpIHtcbiAgICBmb3IgKHZhciBpPTA7IGk8c3RyLmxlbmd0aDsgaSsrKVxuICAgICAgaWYgKGdldENoYXIoKSAhPT0gc3RyW2ldKSB3YXNVbmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXIoKSB7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdmFyIGNoYXIgPSBzb3VyY2VbcG9zXTtcbiAgICBwb3MrKztcbiAgICBjb2x1bW4rKzsgLy8gbmV3IGxpbmU/XG4gICAgcmV0dXJuIGNoYXI7XG4gIH1cblxuICBmdW5jdGlvbiBiYWNrQ2hhcigpIHtcbiAgICBwb3MtLTtcbiAgICBjb2x1bW4tLTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoYXJDb2RlKCkge1xuICAgIHZhciBjb3VudCA9IDQ7XG4gICAgdmFyIGNvZGUgPSAwO1xuICAgIHdoaWxlIChjb3VudC0tKSB7XG4gICAgICBjb2RlIDw8PSA0O1xuICAgICAgdmFyIGNoYXIgPSBnZXRDaGFyKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChjaGFyID49ICdhJyAmJiBjaGFyIDw9ICdmJylcbiAgICAgICAgY29kZSArPSBjaGFyLmNoYXJDb2RlQXQoKSAtIEFfQ09ERSArIDEwO1xuICAgICAgZWxzZSBpZiAoY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIGNvZGUgKz0gK2NoYXI7XG4gICAgICBlbHNlXG4gICAgICAgIHdhc1VuZXhwZWN0ZWRUb2tlbigpO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpZ2l0cygpIHtcbiAgICB2YXIgZGlnaXRzID0gJyc7XG4gICAgd2hpbGUgKHNvdXJjZVtwb3NdID49ICcwJyAmJiBzb3VyY2VbcG9zXSA8PSAnOScpXG4gICAgICBkaWdpdHMgKz0gZ2V0Q2hhcigpO1xuXG4gICAgaWYgKGRpZ2l0cy5sZW5ndGgpIHJldHVybiBkaWdpdHM7XG4gICAgY2hlY2tVbmV4cGVjdGVkRW5kKCk7XG4gICAgdW5leHBlY3RlZFRva2VuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXAocHRyLCBwcm9wKSB7XG4gICAgbWFwTG9jKHB0ciwgcHJvcCwgZ2V0TG9jKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwTG9jKHB0ciwgcHJvcCwgbG9jKSB7XG4gICAgcG9pbnRlcnNbcHRyXSA9IHBvaW50ZXJzW3B0cl0gfHwge307XG4gICAgcG9pbnRlcnNbcHRyXVtwcm9wXSA9IGxvYztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvYygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdW5leHBlY3RlZFRva2VuKCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCB0b2tlbiAnICsgc291cmNlW3Bvc10gKyAnIGluIEpTT04gYXQgcG9zaXRpb24gJyArIHBvcyk7XG4gIH1cblxuICBmdW5jdGlvbiB3YXNVbmV4cGVjdGVkVG9rZW4oKSB7XG4gICAgYmFja0NoYXIoKTtcbiAgICB1bmV4cGVjdGVkVG9rZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVW5leHBlY3RlZEVuZCgpIHtcbiAgICBpZiAocG9zID49IHNvdXJjZS5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIEpTT04gaW5wdXQnKTtcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChkYXRhLCBfLCBvcHRpb25zKSB7XG4gIGlmICghdmFsaWRUeXBlKGRhdGEpKSByZXR1cm47XG4gIHZhciB3c0xpbmUgPSAwO1xuICB2YXIgd3NQb3MsIHdzQ29sdW1uO1xuICB2YXIgd2hpdGVzcGFjZSA9IHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5zcGFjZVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnM7XG4gIHN3aXRjaCAodHlwZW9mIHdoaXRlc3BhY2UpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgdmFyIGxlbiA9IHdoaXRlc3BhY2UgPiAxMFxuICAgICAgICAgICAgICAgICAgPyAxMFxuICAgICAgICAgICAgICAgICAgOiB3aGl0ZXNwYWNlIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICAgOiBNYXRoLmZsb29yKHdoaXRlc3BhY2UpO1xuICAgICAgd2hpdGVzcGFjZSA9IGxlbiAmJiByZXBlYXQobGVuLCAnICcpO1xuICAgICAgd3NQb3MgPSBsZW47XG4gICAgICB3c0NvbHVtbiA9IGxlbjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICB3aGl0ZXNwYWNlID0gd2hpdGVzcGFjZS5zbGljZSgwLCAxMCk7XG4gICAgICB3c1BvcyA9IDA7XG4gICAgICB3c0NvbHVtbiA9IDA7XG4gICAgICBmb3IgKHZhciBqPTA7IGo8d2hpdGVzcGFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY2hhciA9IHdoaXRlc3BhY2Vbal07XG4gICAgICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgICAgIGNhc2UgJyAnOiB3c0NvbHVtbisrOyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHQnOiB3c0NvbHVtbiArPSA0OyBicmVhaztcbiAgICAgICAgICBjYXNlICdcXHInOiB3c0NvbHVtbiA9IDA7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1xcbic6IHdzQ29sdW1uID0gMDsgd3NMaW5lKys7IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGluIEpTT04nKTtcbiAgICAgICAgfVxuICAgICAgICB3c1BvcysrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdoaXRlc3BhY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIganNvbiA9ICcnO1xuICB2YXIgcG9pbnRlcnMgPSB7fTtcbiAgdmFyIGxpbmUgPSAwO1xuICB2YXIgY29sdW1uID0gMDtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBlczYgPSBvcHRpb25zICYmIG9wdGlvbnMuZXM2ICYmIHR5cGVvZiBNYXAgPT0gJ2Z1bmN0aW9uJztcbiAgX3N0cmluZ2lmeShkYXRhLCAwLCAnJyk7XG4gIHJldHVybiB7XG4gICAganNvbjoganNvbixcbiAgICBwb2ludGVyczogcG9pbnRlcnNcbiAgfTtcblxuICBmdW5jdGlvbiBfc3RyaW5naWZ5KF9kYXRhLCBsdmwsIHB0cikge1xuICAgIG1hcChwdHIsICd2YWx1ZScpO1xuICAgIHN3aXRjaCAodHlwZW9mIF9kYXRhKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBvdXQoJycgKyBfZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgb3V0KHF1b3RlZChfZGF0YSkpOyBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChfZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIG91dCgnbnVsbCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfZGF0YS50b0pTT04gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG91dChxdW90ZWQoX2RhdGEudG9KU09OKCkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9kYXRhKSkge1xuICAgICAgICAgIHN0cmluZ2lmeUFycmF5KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXM2KSB7XG4gICAgICAgICAgaWYgKF9kYXRhLmNvbnN0cnVjdG9yLkJZVEVTX1BFUl9FTEVNRU5UKVxuICAgICAgICAgICAgc3RyaW5naWZ5QXJyYXkoKTtcbiAgICAgICAgICBlbHNlIGlmIChfZGF0YSBpbnN0YW5jZW9mIE1hcClcbiAgICAgICAgICAgIHN0cmluZ2lmeU1hcFNldCgpO1xuICAgICAgICAgIGVsc2UgaWYgKF9kYXRhIGluc3RhbmNlb2YgU2V0KVxuICAgICAgICAgICAgc3RyaW5naWZ5TWFwU2V0KHRydWUpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0cmluZ2lmeU9iamVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hcChwdHIsICd2YWx1ZUVuZCcpO1xuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5QXJyYXkoKSB7XG4gICAgICBpZiAoX2RhdGEubGVuZ3RoKSB7XG4gICAgICAgIG91dCgnWycpO1xuICAgICAgICB2YXIgaXRlbUx2bCA9IGx2bCArIDE7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxfZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICBpbmRlbnQoaXRlbUx2bCk7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB2YWxpZFR5cGUoX2RhdGFbaV0pID8gX2RhdGFbaV0gOiBudWxsO1xuICAgICAgICAgIHZhciBpdGVtUHRyID0gcHRyICsgJy8nICsgaTtcbiAgICAgICAgICBfc3RyaW5naWZ5KGl0ZW0sIGl0ZW1MdmwsIGl0ZW1QdHIpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ10nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgnW10nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlPYmplY3QoKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9kYXRhKTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgICBvdXQoJ3snKTtcbiAgICAgICAgdmFyIHByb3BMdmwgPSBsdmwgKyAxO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgaWYgKHZhbGlkVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChpKSBvdXQoJywnKTtcbiAgICAgICAgICAgIHZhciBwcm9wUHRyID0gcHRyICsgJy8nICsgZXNjYXBlSnNvblBvaW50ZXIoa2V5KTtcbiAgICAgICAgICAgIGluZGVudChwcm9wTHZsKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5Jyk7XG4gICAgICAgICAgICBvdXQocXVvdGVkKGtleSkpO1xuICAgICAgICAgICAgbWFwKHByb3BQdHIsICdrZXlFbmQnKTtcbiAgICAgICAgICAgIG91dCgnOicpO1xuICAgICAgICAgICAgaWYgKHdoaXRlc3BhY2UpIG91dCgnICcpO1xuICAgICAgICAgICAgX3N0cmluZ2lmeSh2YWx1ZSwgcHJvcEx2bCwgcHJvcFB0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlNYXBTZXQoaXNTZXQpIHtcbiAgICAgIGlmIChfZGF0YS5zaXplKSB7XG4gICAgICAgIG91dCgneycpO1xuICAgICAgICB2YXIgcHJvcEx2bCA9IGx2bCArIDE7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIHZhciBlbnRyaWVzID0gX2RhdGEuZW50cmllcygpO1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgd2hpbGUgKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICB2YXIga2V5ID0gaXRlbVswXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpc1NldCA/IHRydWUgOiBpdGVtWzFdO1xuICAgICAgICAgIGlmICh2YWxpZFR5cGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoIWZpcnN0KSBvdXQoJywnKTtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcHJvcFB0ciA9IHB0ciArICcvJyArIGVzY2FwZUpzb25Qb2ludGVyKGtleSk7XG4gICAgICAgICAgICBpbmRlbnQocHJvcEx2bCk7XG4gICAgICAgICAgICBtYXAocHJvcFB0ciwgJ2tleScpO1xuICAgICAgICAgICAgb3V0KHF1b3RlZChrZXkpKTtcbiAgICAgICAgICAgIG1hcChwcm9wUHRyLCAna2V5RW5kJyk7XG4gICAgICAgICAgICBvdXQoJzonKTtcbiAgICAgICAgICAgIGlmICh3aGl0ZXNwYWNlKSBvdXQoJyAnKTtcbiAgICAgICAgICAgIF9zdHJpbmdpZnkodmFsdWUsIHByb3BMdmwsIHByb3BQdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudChsdmwpO1xuICAgICAgICBvdXQoJ30nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dCgne30nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvdXQoc3RyKSB7XG4gICAgY29sdW1uICs9IHN0ci5sZW5ndGg7XG4gICAgcG9zICs9IHN0ci5sZW5ndGg7XG4gICAganNvbiArPSBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBpbmRlbnQobHZsKSB7XG4gICAgaWYgKHdoaXRlc3BhY2UpIHtcbiAgICAgIGpzb24gKz0gJ1xcbicgKyByZXBlYXQobHZsLCB3aGl0ZXNwYWNlKTtcbiAgICAgIGxpbmUrKztcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICB3aGlsZSAobHZsLS0pIHtcbiAgICAgICAgaWYgKHdzTGluZSkge1xuICAgICAgICAgIGxpbmUgKz0gd3NMaW5lO1xuICAgICAgICAgIGNvbHVtbiA9IHdzQ29sdW1uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbiArPSB3c0NvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBwb3MgKz0gd3NQb3M7XG4gICAgICB9XG4gICAgICBwb3MgKz0gMTsgLy8gXFxuIGNoYXJhY3RlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcChwdHIsIHByb3ApIHtcbiAgICBwb2ludGVyc1twdHJdID0gcG9pbnRlcnNbcHRyXSB8fCB7fTtcbiAgICBwb2ludGVyc1twdHJdW3Byb3BdID0ge1xuICAgICAgbGluZTogbGluZSxcbiAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgcG9zOiBwb3NcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwZWF0KG4sIHN0cikge1xuICAgIHJldHVybiBBcnJheShuICsgMSkuam9pbihzdHIpO1xuICB9XG59O1xuXG5cbnZhciBWQUxJRF9UWVBFUyA9IFsnbnVtYmVyJywgJ2JpZ2ludCcsICdib29sZWFuJywgJ3N0cmluZycsICdvYmplY3QnXTtcbmZ1bmN0aW9uIHZhbGlkVHlwZShkYXRhKSB7XG4gIHJldHVybiBWQUxJRF9UWVBFUy5pbmRleE9mKHR5cGVvZiBkYXRhKSA+PSAwO1xufVxuXG5cbnZhciBFU0NfUVVPVEUgPSAvXCJ8XFxcXC9nO1xudmFyIEVTQ19CID0gL1tcXGJdL2c7XG52YXIgRVNDX0YgPSAvXFxmL2c7XG52YXIgRVNDX04gPSAvXFxuL2c7XG52YXIgRVNDX1IgPSAvXFxyL2c7XG52YXIgRVNDX1QgPSAvXFx0L2c7XG5mdW5jdGlvbiBxdW90ZWQoc3RyKSB7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKEVTQ19RVU9URSwgJ1xcXFwkJicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19GLCAnXFxcXGYnKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfQiwgJ1xcXFxiJylcbiAgICAgICAgICAgLnJlcGxhY2UoRVNDX04sICdcXFxcbicpXG4gICAgICAgICAgIC5yZXBsYWNlKEVTQ19SLCAnXFxcXHInKVxuICAgICAgICAgICAucmVwbGFjZShFU0NfVCwgJ1xcXFx0Jyk7XG4gIHJldHVybiAnXCInICsgc3RyICsgJ1wiJztcbn1cblxuXG52YXIgRVNDXzAgPSAvfi9nO1xudmFyIEVTQ18xID0gL1xcLy9nO1xuZnVuY3Rpb24gZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShFU0NfMCwgJ34wJylcbiAgICAgICAgICAgIC5yZXBsYWNlKEVTQ18xLCAnfjEnKTtcbn1cbiIsImltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCBKc29uU291cmNlTWFwIGZyb20gJy4vanNvbnNvdXJjZW1hcC5qcyc7XHJcblxyXG5jb25zdCB7QkxPQ0ssIEVMRU0sIENPTlRFTlQsIE1PRFMsIE1JWH0gPSBQUk9QUztcclxuY29uc3QgbG9jYXRpb25LZXkgPSBKc29uU291cmNlTWFwLmtleTtcclxuXHJcbmNsYXNzIEJlbU5vZGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlKSB7XHJcbiAgICAgICAgdGhpcy5ibG9jayA9IG5vZGVbQkxPQ0tdO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IG5vZGVbRUxFTV07XHJcbiAgICAgICAgdGhpcy5tb2RzID0gbm9kZVtNT0RTXTtcclxuICAgICAgICB0aGlzLm1peCA9IG5vZGVbTUlYXTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG5vZGVbbG9jYXRpb25LZXldO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy5ibG9jayArICh0aGlzLmVsZW0gPyAoYF9fJHt0aGlzLmVsZW19YCkgOiAnJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlbU5vZGU7IiwiaW1wb3J0IExpbnRFcnJvciBmcm9tICcuL2xpbnRlcnJvci5qcyc7XHJcblxyXG5jbGFzcyBXYXJuaW5nVGV4dFNpemVTaG91bGRCZUVxdWFsIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnV0FSTklORy5URVhUX1NJWkVTX1NIT1VMRF9CRV9FUVVBTCcsIGVycm9yOiAn0KLQtdC60YHRgtGLINCyINCx0LvQvtC60LUgd2FybmluZyDQtNC+0LvQttC90Ysg0LHRi9GC0Ywg0L7QtNC90L7Qs9C+INGA0LDQt9C80LXRgNCwLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSBleHRlbmRzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBzdXBlcih7Y29kZTogJ1dBUk5JTkcuSU5WQUxJRF9CVVRUT05fU0laRScsIGVycm9yOiAn0KDQsNC30LzQtdGAINC60L3QvtC/0LrQuCDQsiDQsdC70L7QutC1IHdhcm5pbmcg0LTQvtC70LbQtdC9INCx0YvRgtGMINC90LAgMSDRiNCw0LMg0LHQvtC70YzRiNC1INGN0YLQsNC70L7QvdC90L7Qs9C+LicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfQlVUVE9OX1BPU0lUSU9OJywgZXJyb3I6ICfQkdC70L7QuiBidXR0b24g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9C+0YHQu9C1INCx0LvQvtC60LAgcGxhY2Vob2xkZXIuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ0ludmFsaWRQbGFjZWhvbGRlclNpemUgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdXQVJOSU5HLklOVkFMSURfUExBQ0VIT0xERVJfU0laRScsIGVycm9yOiAn0JTQvtC/0YPRgdGC0LjQvNGL0LUg0YDQsNC30LzQtdGA0Ysg0LTQu9GPINCx0LvQvtC60LAgcGxhY2Vob2xkZXIg0LIg0LHQu9C+0LrQtSB3YXJuaW5nOiBzLCBtLCBsLicsIGxvY2F0aW9ufSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTZXZlcmFsSDEgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULlNFVkVSQUxfSDEnLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8g0L3QsCDRgdGC0YDQsNC90LjRhtC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQtdC00LjQvdGB0YLQstC10L3QvdGL0LwuJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dEludmFsaWRIMlBvc2l0aW9uIGV4dGVuZHMgTGludEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHtjb2RlOiAnVEVYVC5JTlZBTElEX0gyX1BPU0lUSU9OJywgZXJyb3I6ICfQl9Cw0LPQvtC70L7QstC+0Log0LLRgtC+0YDQvtCz0L4g0YPRgNC+0LLQvdGPINC90LUg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C10YDQtdC0INC30LDQs9C+0LvQvtCy0LrQvtC8INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rjy4nLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0SW52YWxpZEgzUG9zaXRpb24gZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdURVhULklOVkFMSURfSDNfUE9TSVRJT04nLCBlcnJvcjogJ9CX0LDQs9C+0LvQvtCy0L7QuiDRgtGA0LXRgtGM0LXQs9C+INGD0YDQvtCy0L3RjyDQvdC1INC80L7QttC10YIg0L3QsNGF0L7QtNC40YLRjNGB0Y8g0L/QtdGA0LXQtCDQt9Cw0LPQvtC70L7QstC60L7QvCDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8uJywgbG9jYXRpb259KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3JpZFRvb011Y2hNYXJrZXRpbmdCbG9ja3MgZXh0ZW5kcyBMaW50RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoe2NvZGU6ICdHUklELlRPT19NVUNIX01BUktFVElOR19CTE9DS1MnLCBlcnJvcjogJ9Cc0LDRgNC60LXRgtC40L3Qs9C+0LLRi9C1INCx0LvQvtC60Lgg0L3QtSDQvNC+0LPRg9GCINC30LDQvdC40LzQsNGC0Ywg0LHQvtC70YzRiNC1INC/0L7Qu9C+0LLQuNC90Ysg0L7RgiDQstGB0LXRhSDQutC+0LvQvtC90L7QuiDQsdC70L7QutCwIGdyaWQnLCBsb2NhdGlvbn0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbCxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uU2l6ZSxcclxuICAgIFdhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb24sXHJcbiAgICBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFRleHRTZXZlcmFsSDEsXHJcbiAgICBUZXh0SW52YWxpZEgyUG9zaXRpb24sXHJcbiAgICBUZXh0SW52YWxpZEgzUG9zaXRpb24sXHJcbiAgICBHcmlkVG9vTXVjaE1hcmtldGluZ0Jsb2Nrc1xyXG59IiwiXHJcbmNsYXNzIExpbnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7Y29kZSwgZXJyb3IsIGxvY2F0aW9ufSkge1xyXG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludEVycm9yOyIsIlxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyDQndC10YDQsNC30YDQtdGI0LjQvNGL0LUg0L7RiNC40LHQutC4LCDQv9C+0YHQu9C1INC60L7RgtC+0YDRi9GFINC/0YDQtdC60YDQsNGJ0LDQtdC8INGA0LDQsdC+0YLRgy4g0JjRhSDRh9C40YHQu9C+INC80L7QttC10YIg0YHQvtC60YDQsNGJ0LDRgtGM0YHRj1xyXG4gKiDQv9C+INC80LXRgNC1INC00L7QsdCw0LLQu9C10L3QuNGPINC90L7QstGL0YUg0L/RgNCw0LLQuNC7INCyINC70LjQvdGC0LXRgC5cclxuICovXHJcbmNsYXNzIEludmFsaWRJbnB1dCBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiSW52YWxpZCBpbnB1dFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTm9UZXh0Tm9kZSBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiQXQgbGVhc3QgMSB0ZXh0IG5vZGUgZXhwZWN0ZWRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBJbnZhbGlkSW5wdXQsXHJcbiAgICBOb1RleHROb2RlXHJcbn0iLCIvKipcclxuICogQGZpbGVvdmVydmlldyDQkNC00LDQv9GC0LXRgCDRhNGD0L3QutGG0LjQuCBwYXJzZSDQuNC3INCx0LjQsdC70LjQvtGC0LXQutC4IGpzb24tc291cmNlLW1hcFxyXG4gKi9cclxuXHJcbmltcG9ydCB7cGFyc2V9IGZyb20gJ2pzb24tc291cmNlLW1hcCc7XHJcbmltcG9ydCBQUk9QUyBmcm9tICcuL3Byb3BuYW1lcy5qcyc7XHJcbmltcG9ydCB7SW52YWxpZElucHV0fSBmcm9tIFwiLi9lcnJvci9zeXN0ZW0uanNcIjtcclxuXHJcblxyXG5jb25zdCB7Q09OVEVOVH0gPSBQUk9QUztcclxuXHJcbmNvbnN0IHBvc2l0aW9uS2V5ID0gU3ltYm9sKCdQb3NpdGlvbicpO1xyXG5cclxuY2xhc3MgSnNvblNvdXJjZU1hcCB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3RyKSB7XHJcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XHJcbiAgICAgICAgdGhpcy5qc29uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvaW50ZXJzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRKc29uID0gKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlKHRoaXMuc3RyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuanNvbiA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJzID0gcmVzdWx0LnBvaW50ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkSW5wdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWF0Y2godGhpcy5qc29uLCAnJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmpzb247XHJcbiAgICB9O1xyXG5cclxuICAgIG1hdGNoID0gKG5vZGUsIHBhdGgpID0+IHtcclxuICAgICAgICBjb25zdCB7dmFsdWUsIHZhbHVlRW5kfSA9IHRoaXMucG9pbnRlcnNbcGF0aF07XHJcblxyXG4gICAgICAgIC8vICsxINC6IGNvbCwg0YIu0LouINCx0LjQsdC70LjQvtGC0LXQutCwINCy0LXQtNC10YIg0L7RgtGB0YfQtdGCINC+0YIgMC5cclxuICAgICAgICAvLyDQn9GA0Lgg0Y3RgtC+0LwgbGluZSDQsdC10Lcg0LjQt9C80LXQvdC10L3QuNGPLCDRgi7Qui4g0LjRgdGF0L7QtNC90YvQuSBKU09OINC+0LHQtdGA0L3Rg9C70LggKNC/0L7Qu9C+0LbQuNC70Lgg0LLQvdGD0YLRgNGMINGB0LLQvtC50YHRgtCy0LAgXCJjb250ZW50XCIpXHJcbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gW3ZhbHVlLCB2YWx1ZUVuZF0ubWFwKHZhbCA9PiAoe2xpbmU6IHZhbC5saW5lLCBjb2x1bW46IHZhbC5jb2x1bW4gKyAxfSkpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZVtDT05URU5UXTtcclxuXHJcbiAgICAgICAgbm9kZVtwb3NpdGlvbktleV0gPSB7c3RhcnQsIGVuZH07XHJcblxyXG4gICAgICAgIGlmICghY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2goY2hpbGQsIGAke3BhdGh9LyR7Q09OVEVOVH0vJHtpbmR9YCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaChjaGlsZHJlbiwgYCR7cGF0aH0vJHtDT05URU5UfWApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGtleSA9IHBvc2l0aW9uS2V5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKc29uU291cmNlTWFwOyIsImltcG9ydCBQUk9QUyBmcm9tIFwiLi9wcm9wbmFtZXMuanNcIjtcclxuaW1wb3J0IEpzb25Tb3VyY2VNYXAgZnJvbSAnLi9qc29uc291cmNlbWFwLmpzJztcclxuaW1wb3J0IEJlbU5vZGUgZnJvbSAnLi9iZW1ub2RlLmpzJztcclxuaW1wb3J0IFJ1bGVNZWRpYXRvciBmcm9tICcuL3J1bGVzL3J1bGVtZWRpYXRvci5qcyc7XHJcbmltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi9ydWxlcy9ydWxlYmFzZS5qc1wiO1xyXG5cclxuY29uc3Qge0NPTlRFTlR9ID0gUFJPUFM7XHJcbmNvbnN0IHBoYXNlcyA9IFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXM7XHJcblxyXG5jbGFzcyBMaW50ZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PCFSdWxlQmFzZT59IHJ1bGVDbGFzc2VzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVDbGFzc2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLnJ1bGVDbGFzc2VzID0gcnVsZUNsYXNzZXM7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWF0b3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKi9cclxuICAgIGxpbnQoc3RyKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0cmluZ1RyZWUgPSB0aGlzLmF0dGFjaFJvb3Qoc3RyKTtcclxuICAgICAgICBjb25zdCBtYXBwZXIgPSBuZXcgSnNvblNvdXJjZU1hcChzdHJpbmdUcmVlKTtcclxuICAgICAgICBjb25zdCByb290ID0gbWFwcGVyLmdldEpzb24oc3RyaW5nVHJlZSk7XHJcblxyXG4gICAgICAgIHRoaXMubmV4dChyb290KTtcclxuICAgICAgICB0aGlzLmNhbGxBbGwocGhhc2VzLmVuZCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gZmlsdGVyIGVycm9yc1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGNvbnN0IHJ1bGVzSW5zdGFuY2VzID0gdGhpcy5ydWxlQ2xhc3Nlcy5tYXAockNsYXNzID0+IG5ldyByQ2xhc3MoKSk7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWF0b3IgPSBuZXcgUnVsZU1lZGlhdG9yKHJ1bGVzSW5zdGFuY2VzKTtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qINCS0YXQvtC0INC80L7QttC10YIg0LHRi9GC0Ywg0L7QsdGK0LXQutGC0L7QvCDQuNC70Lgg0LzQsNGB0YHQuNCy0L7QvCAo0LTQtdGA0LXQstC+INC40LvQuCDQu9C10YEpLiDQlNC+0LHQsNCy0LjQvCDQstC40YDRgtGD0LDQu9GM0L3Ri9C5INC60L7RgNC10L3RjCwg0LLRgdC10LPQtNCwINCx0YvQu9C+INC00LXRgNC10LLQvi4gKi9cclxuICAgIGF0dGFjaFJvb3QgPSBzdHIgPT4gYHtcIiR7Q09OVEVOVH1cIjpcXG4ke3N0cn1cXG59YDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXHJcbiAgICAgKi9cclxuICAgIG5leHQgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJlbU5vZGUgPSBuZXcgQmVtTm9kZShub2RlKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY29udGVudEFzQXJyYXkobm9kZVtDT05URU5UXSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsbChwaGFzZXMuaW4sIGJlbU5vZGUpO1xyXG5cclxuICAgICAgICBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dChjaGlsZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsbChwaGFzZXMub3V0LCBiZW1Ob2RlKTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsbChwaGFzZSwgYmVtTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMubWVkaWF0b3IuY2FsbChwaGFzZSwgYmVtTm9kZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXJyb3JzKGVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEFsbChwaGFzZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMubWVkaWF0b3IuY2FsbEFsbChwaGFzZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXJyb3JzKGVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXJyb3JzKGVycm9ycykge1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gWy4uLmVycm9ycywgLi4udGhpcy5lcnJvcnNdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnRBc0FycmF5KGVsKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKVxyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcblxyXG4gICAgICAgIHJldHVybiBlbCA/IFtlbF0gOiBbXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGludGVyOyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIEJMT0NLOiBcImJsb2NrXCIsXHJcbiAgICBFTEVNOiBcImVsZW1cIixcclxuICAgIENPTlRFTlQ6IFwiY29udGVudFwiLFxyXG4gICAgTU9EUzogXCJtb2RzXCIsXHJcbiAgICBNSVg6IFwibWl4XCJcclxufTsiLCJpbXBvcnQgVGV4dFNpemVzIGZyb20gJy4vd2FybmluZy90ZXh0c2l6ZXMuanMnXHJcbmltcG9ydCBCdXR0b25TaXplIGZyb20gJy4vd2FybmluZy9idXR0b25zaXplLmpzJ1xyXG5pbXBvcnQgQnV0dG9uUG9zaXRpb24gZnJvbSAnLi93YXJuaW5nL2J1dHRvbnBvc2l0aW9uLmpzJ1xyXG5pbXBvcnQgUGxhY2Vob2xkZXJTaXplIGZyb20gJy4vd2FybmluZy9wbGFjZWhvbGRlcnNpemUuanMnXHJcbmltcG9ydCBTZXZlcmFsSDEgZnJvbSAnLi90ZXh0L3NldmVyYWxoMS5qcydcclxuaW1wb3J0IEgxSDIgZnJvbSAnLi90ZXh0L2gxaDIuanMnXHJcblxyXG5jb25zdCBydWxlcyA9IFtcclxuICAgIFRleHRTaXplcywgQnV0dG9uU2l6ZSwgQnV0dG9uUG9zaXRpb24sIFBsYWNlaG9sZGVyU2l6ZSxcclxuICAgIFNldmVyYWxIMSwgSDFIMl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlczsiLCJcclxuY2xhc3MgUnVsZUJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQndCw0LHQvtGAINGB0LXQu9C10LrRgtC+0YDQvtCyIChCZW1Ob2RlLnNlbGVjdG9yKSDRg9C30LvQvtCyLCDQvdCwINC60L7RgtC+0YDRi9GFINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQv9GA0LDQstC40LvQvi5cclxuICAgICAqINCV0YHQu9C4INC90LUg0LfQsNC00LDQvSAtINCx0YPQtNC10YIg0YHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvdCwINC60LDQttC00L7QvCDRg9C30LvQtSAoVE9ETykuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZWxlY3RvcnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3JzID0gW10pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqIEBlbnVte3N0cmluZ30gKi9cclxuUnVsZUJhc2UucHJvdG90eXBlLnBoYXNlcyA9IHtcclxuICAgIC8qINCS0YXQvtC00LjQvCDQsiDQvtGH0LXRgNC10LTQvdC+0Lkg0YPQt9C10Lsg0LTQtdGA0LXQstCwKi9cclxuICAgIGluOiAnaW4nLFxyXG4gICAgLyog0JLRi9GF0L7QtNC40LwgKi9cclxuICAgIG91dDogJ291dCcsXHJcbiAgICAvKiDQl9Cw0LrQsNC90YfQuNCy0LDQtdC8INC+0LHRhdC+0LQg0LTQtdGA0LXQstCwICovXHJcbiAgICBlbmQ6ICdlbmQnXHJcbn07XHJcblxyXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKEJlbU5vZGUpOiAoIUxpbnRFcnJvcnx1bmRlZmluZWQpfSAqL1xyXG5SdWxlQmFzZS5IYW5kbGVyVHlwZTtcclxuXHJcbi8qKiBAdHlwZWRlZiB7T2JqZWN0PFJ1bGVCYXNlLnByb3RvdHlwZS5waGFzZXMsIE9iamVjdDxzdHJpbmcsIFJ1bGVCYXNlLkhhbmRsZXJUeXBlPj59ICovXHJcblJ1bGVCYXNlLkhhbmRsZXJzTWFwVHlwZTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlQmFzZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSAnLi9ydWxlYmFzZS5qcyc7XHJcblxyXG5jb25zdCBwaGFzZXMgPSBSdWxlQmFzZS5wcm90b3R5cGUucGhhc2VzO1xyXG5cclxuY2xhc3MgUnVsZU1lZGlhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5idWlsZE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWFwKCkge1xyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gcnVsZS5nZXRTZWxlY3RvcnMoKTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnNNYXAgPSBydWxlLmdldFBoYXNlSGFuZGxlcnNNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHBoYXNlIGluIGhhbmRsZXJzTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNNYXBbcGhhc2VdO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShwaGFzZSwgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFuZGxlcnNNYXBba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyc01hcFtrZXldID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNNYXBba2V5XS5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEtleShwaGFzZSwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gcGhhc2UgKyAnJCcgKyBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0FycmF5PCFMaW50RXJyb3I+fVxyXG4gICAgICovXHJcbiAgICBjYWxsKHBoYXNlLCBiZW1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkocGhhc2UsIGJlbU5vZGUuc2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtrZXldIHx8IFtdO1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlckVycm9ycyA9IGhhbmRsZXIoYmVtTm9kZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWhhbmRsZXJFcnJvcnMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYW5kbGVyRXJyb3JzKSlcclxuICAgICAgICAgICAgICAgIGVycm9ycyA9IFsuLi5oYW5kbGVyRXJyb3JzLCAuLi5lcnJvcnNdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChoYW5kbGVyRXJyb3JzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQWxsKHBoYXNlKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChydWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IHJ1bGUuZ2V0UGhhc2VIYW5kbGVyc01hcCgpW3BoYXNlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goaGFuZGxlcihudWxsKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdWxlTWVkaWF0b3I7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7VGV4dEludmFsaWRIMlBvc2l0aW9ufSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcblxyXG5jbGFzcyBIMUgyIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd0ZXh0J10pO1xyXG5cclxuICAgICAgICB0aGlzLmgyTm9kZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmgxd2FzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW4obm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXQobm9kZS5tb2RzLCAndHlwZScpO1xyXG5cclxuICAgICAgICBpZiAoIXR5cGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdoMicpIHtcclxuICAgICAgICAgICAgdGhpcy5oMk5vZGVzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPINCf0YDQvtC00L7Qu9C20LDQtdC8INCw0L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0L7Qu9GM0LrQviDQtNC+INC/0LXRgNCy0L7Qs9C+IGgxXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdoMScgJiYgIXRoaXMuaDF3YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5oMXdhcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaDJOb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGV4dEludmFsaWRIMlBvc2l0aW9uKG5vZGUubG9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIMUgyOyIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1RleHRTZXZlcmFsSDF9IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcblxyXG5jbGFzcyBTZXZlcmFsSDEgZXh0ZW5kcyBSdWxlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbJ3RleHQnXSk7XHJcblxyXG4gICAgICAgIHRoaXMuaDF3YXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaGFzZUhhbmRsZXJzTWFwKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5pbl06IHRoaXMuaW4uYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdldChub2RlLm1vZHMsICd0eXBlJyk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlICE9PSAnaDEnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5oMXdhcykge1xyXG4gICAgICAgICAgICB0aGlzLmgxd2FzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dFNldmVyYWxIMShub2RlLmxvY2F0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V2ZXJhbEgxOyIsIlxyXG5jb25zdCBzaXplc1NjYWxlID0gW1wieHh4c1wiLCBcInh4c1wiLCBcInhzXCIsIFwic1wiLCBcIm1cIiwgXCJsXCIsIFwieGxcIiwgXCJ4eGxcIiwgXCJ4eHhsXCIsIFwieHh4eGxcIiwgXCJ4eHh4eGxcIl07XHJcblxyXG5jbGFzcyBTaXplIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpemVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY291bnRcclxuICAgICAqIEByZXR1cm4ge1NpemV9XHJcbiAgICAgKi9cclxuICAgIGFkZChjb3VudCkge1xyXG4gICAgICAgIGxldCBpbmQgPSBzaXplc1NjYWxlLmluZGV4T2YodGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgaWYgKH5pbmQpXHJcbiAgICAgICAgICAgIGluZCA9IGluZCArIGNvdW50O1xyXG5cclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplc1NjYWxlW2luZF07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKHNpemVCKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuc2l6ZSAmJiBzaXplQikgJiYgdGhpcy5zaXplID09PSBzaXplQjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGlzRGVmKHgpIHtcclxuICAgIHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXQob2JqLCAuLi5wcm9wcykge1xyXG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIC8vINGE0YPQvdC60YbQuNC4INC90LUg0L/RgNC10LTQv9C+0LvQsNCz0LDRjtGC0YHRj1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XHJcblxyXG4gICAgZm9yIChsZXQgcHJvcCBvZiBwcm9wcykge1xyXG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xyXG5cclxuICAgICAgICBpZiAoIWlzRGVmKHByb3ApKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICAgIFNpemUsXHJcbiAgICBnZXRcclxufSIsImltcG9ydCBSdWxlQmFzZSBmcm9tIFwiLi4vcnVsZWJhc2UuanNcIjtcclxuaW1wb3J0IHtTaXplLCBnZXR9IGZyb20gXCIuLi91dGlscy5qc1wiO1xyXG5pbXBvcnQge1dhcm5pbmdJbnZhbGlkQnV0dG9uUG9zaXRpb259IGZyb20gXCIuLi8uLi9lcnJvci9lcnJvcmxpc3QuanNcIjtcclxuXHJcbmNsYXNzIEJ1dHRvblBvc2l0aW9uIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ2J1dHRvbicsICdwbGFjZWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMgPSBuZXcgTWFwKCk7IC8vINGF0YDQsNC90LjQvCAxIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlcyA9IG5ldyBNYXAoKTsgLy8g0YXRgNCw0L3QuNC8IDEgYnV0dG9uXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUT0RPINGB0YfQuNGC0LDQtdC8LCDRh9GC0L4g0LIg0LHQu9C+0LrQtSB3YXJuaW5nINC90LUg0LHQvtC70LXQtSAxIGJ1dHRvbiDQuCDQvdC1INCx0L7Qu9C10LUgMSBwbGFjZWhvbGVyICjRhdC+0YLRjyDRjdGC0L4g0L3QtSDQvtCx0Y/Qt9C+0L3QviDQsdGL0YLRjCDRgtCw0LopXHJcbiAgICAgICAgLy8g0JIg0L/RgNC+0YLQuNCy0L3QvtC8INGB0LvRg9GH0LDQtSwg0L3QtdC/0L7QvdGP0YLQvdC+INC60LDQuiDQuNGFINC80LDRgtGH0LjRgtGMINC00YDRg9CzINGBINC00YDRg9Cz0L7QvCAo0L3QsNC/0YDQuNC80LXRgCDQsiDRgtCw0LrQvtC5INGB0LjRgtGD0LDRhtC40Lg6IGJ1dHRvbiwgcGxhY2Vob2xkZXIsIGJ1dHRvbilcclxuICAgICAgICAvLyDQuCwg0YHQvtC+0YLQstC10YLRgdGC0LLQtdC90L3Qviwg0LLRi9C00LDQstCw0YLRjCDQvtGI0LjQsdC60LhcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3BsYWNlaG9sZGVyJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGxhY2Vob2xkZXJOb2Rlcy5oYXMod2FybmluZykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludmFsaWRCdXR0b24gPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMuc2V0KHdhcm5pbmcsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkQnV0dG9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ0ludmFsaWRCdXR0b25Qb3NpdGlvbihpbnZhbGlkQnV0dG9uLmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzLmRlbGV0ZSh3YXJuaW5nKTtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uUG9zaXRpb247IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ0ludmFsaWRCdXR0b25TaXplfSBmcm9tIFwiLi4vLi4vZXJyb3IvZXJyb3JsaXN0LmpzXCI7XHJcbmltcG9ydCB7Tm9UZXh0Tm9kZX0gZnJvbSBcIi4uLy4uL2Vycm9yL3N5c3RlbS5qc1wiO1xyXG5pbXBvcnQge1RleHRJbnZhbGlkSDJQb3NpdGlvbn0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdFwiO1xyXG5cclxuY2xhc3MgQnV0dG9uU2l6ZSBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICdidXR0b24nLCAndGV4dCddKTtcclxuXHJcbiAgICAgICAgLy8g0KHRh9C40YLQsNC10LwsINGH0YLQviDQsdC70L7QutC4IHdhcm5pbmcg0LzQvtCz0YPRgiDQsdGL0YLRjCDQstC70L7QttC10L3QvdGL0LzQuC4g0JrQsNC20LTRi9C5INCy0LvQvtC20LXQvdC90YvQuSDQsdC70L7QuiB3YXJuaW5nINGB0L7Qt9C00LDQtdGCINGB0LLQvtC5IEVycm9yIGJvdW5kYXJ5LlxyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTsgLy8g0YHRgtC10Log0LHQu9C+0LrQvtCyIHdhcm5pbmdcclxuICAgICAgICB0aGlzLnRleHROb2RlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dE5vZGVzLmhhcyh3YXJuaW5nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5idXR0b25Ob2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTm9kZXMuc2V0KHdhcm5pbmcsIFtdKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnV0dG9uTm9kZXMgPSB0aGlzLmJ1dHRvbk5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgYnV0dG9uTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RUZXh0Tm9kZSA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuICAgICAgICBjb25zdCBidXR0b25zID0gdGhpcy5idXR0b25Ob2Rlcy5nZXQod2FybmluZyk7XHJcblxyXG4gICAgICAgIGlmICghYnV0dG9ucylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRleHROb2Rlcy5kZWxldGUod2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ob2Rlcy5kZWxldGUod2FybmluZyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8g0L/RgNC10LTQv9C+0LvQsNCz0LDQtdC8LCDRh9GC0L4g0YLQtdC60YHRgtC+0LLRi9C1INC90L7QtNGLINC+0LHRj9C30LDQvdGLINCx0YvRgtGMLCDRgi7Qui4g0LjQvdCw0YfQtSDRjdGC0LDQu9C+0L3QvdGL0Lkg0YDQsNC30LzQtdGAINC90LUg0L7Qv9GA0LXQtNC10LvQtdC9INC4INC/0L7QtdC00YPRgiDQtNGA0YPQs9C40LUg0L/RgNCw0LLQuNC70LAuINCf0YDQvtCy0LXRgNC40YLRjCDQv9GA0LXQtNC/0L7Qu9C+0LbQtdC90LjQtS5cclxuICAgICAgICBpZiAoIWZpcnN0VGV4dE5vZGUpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1RleHROb2RlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemVWYWxBID0gZ2V0KGZpcnN0VGV4dE5vZGUubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBzaXplID0gbmV3IFNpemUoc2l6ZVZhbEEpO1xyXG5cclxuICAgICAgICBzaXplLmFkZCgxKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemVWYWxCID0gZ2V0KGJ1dHRvbi5tb2RzLCAnc2l6ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzaXplLmNoZWNrKHNpemVWYWxCKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgV2FybmluZ0ludmFsaWRCdXR0b25TaXplKGJ1dHRvbi5sb2NhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhc3RXYXJuaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMud2FybmluZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5nc1tsZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uU2l6ZTsiLCJpbXBvcnQgUnVsZUJhc2UgZnJvbSBcIi4uL3J1bGViYXNlLmpzXCI7XHJcbmltcG9ydCB7U2l6ZSwgZ2V0fSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHtXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZX0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5cclxuY29uc3QgY29ycmVjdFNpemVzID0gWydzJywgJ20nLCAnbCddO1xyXG5cclxuY2xhc3MgUGxhY2Vob2xkZXJTaXplIGV4dGVuZHMgUnVsZUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoWyd3YXJuaW5nJywgJ3BsYWNlaG9sZGVyJ10pO1xyXG5cclxuICAgICAgICB0aGlzLndhcm5pbmdzID0gW107IC8vINGB0YLQtdC6INCx0LvQvtC60L7QsiB3YXJuaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VIYW5kbGVyc01hcCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMuaW5dOiB0aGlzLmluLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFt0aGlzLnBoYXNlcy5vdXRdOiB0aGlzLm91dC5iaW5kKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayA9PT0gJ3dhcm5pbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLmdldExhc3RXYXJuaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICghd2FybmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzaXplID0gZ2V0KG5vZGUubW9kcywgJ3NpemUnKTtcclxuICAgICAgICBjb25zdCBpbmQgPSBjb3JyZWN0U2l6ZXMuaW5kZXhPZihzaXplKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaW5kID09PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBXYXJuaW5nSW52YWxpZFBsYWNlaG9sZGVyU2l6ZShub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvdXQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJsb2NrICE9PSAnd2FybmluZycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHRoaXMud2FybmluZ3MucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGFjZWhvbGRlclNpemU7IiwiaW1wb3J0IFJ1bGVCYXNlIGZyb20gXCIuLi9ydWxlYmFzZS5qc1wiO1xyXG5pbXBvcnQge1NpemUsIGdldH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7V2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbH0gZnJvbSBcIi4uLy4uL2Vycm9yL2Vycm9ybGlzdC5qc1wiO1xyXG5pbXBvcnQge05vVGV4dE5vZGV9IGZyb20gXCIuLi8uLi9lcnJvci9zeXN0ZW0uanNcIjtcclxuXHJcbmNsYXNzIFRleHRTaXplcyBleHRlbmRzIFJ1bGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFsnd2FybmluZycsICd0ZXh0J10pO1xyXG5cclxuICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCwg0YfRgtC+INCx0LvQvtC60Lggd2FybmluZyDQvNC+0LPRg9GCINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4LiDQmtCw0LbQtNGL0Lkg0LLQu9C+0LbQtdC90L3Ri9C5INCx0LvQvtC6IHdhcm5pbmcg0YHQvtC30LTQsNC10YIg0YHQstC+0LkgRXJyb3IgYm91bmRhcnkuXHJcbiAgICAgICAgdGhpcy53YXJuaW5ncyA9IFtdOyAvLyDRgdGC0LXQuiDQsdC70L7QutC+0LIgd2FybmluZ1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGVzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlSGFuZGxlcnNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgW3RoaXMucGhhc2VzLmluXTogdGhpcy5pbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBbdGhpcy5waGFzZXMub3V0XTogdGhpcy5vdXQuYmluZCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbihub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuYmxvY2sgPT09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3YXJuaW5nID0gdGhpcy5nZXRMYXN0V2FybmluZygpO1xyXG5cclxuICAgICAgICBpZiAoIXdhcm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRleHROb2Rlcy5oYXMod2FybmluZykpXHJcbiAgICAgICAgICAgIHRoaXMudGV4dE5vZGVzLnNldCh3YXJuaW5nLCBbXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ibG9jayAhPT0gJ3dhcm5pbmcnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcm5pbmcgPSB0aGlzLndhcm5pbmdzLnBvcCgpO1xyXG4gICAgICAgIGNvbnN0IHRleHROb2RlcyA9IHRoaXMudGV4dE5vZGVzLmdldCh3YXJuaW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0Tm9kZXMuZGVsZXRlKHdhcm5pbmcpO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGVycm9yIGVtaXR0aW5nXHJcbiAgICAgICAgLy8gVE9ETyDQv9GA0LXQtNC/0L7Qu9Cw0LPQsNC10LwsINGH0YLQviDRgtC10LrRgdGC0L7QstGL0LUg0L3QvtC00Ysg0L7QsdGP0LfQsNC90Ysg0LHRi9GC0YwsINGCLtC6LiDQuNC90LDRh9C1INGN0YLQsNC70L7QvdC90YvQuSDRgNCw0LfQvNC10YAg0L3QtSDQvtC/0YDQtdC00LXQu9C10L0g0Lgg0L/QvtC10LTRg9GCINC00YDRg9Cz0LjQtSDQv9GA0LDQstC40LvQsC4g0J/RgNC+0LLQtdGA0LjRgtGMINC/0YDQtdC00L/QvtC70L7QttC10L3QuNC1LlxyXG4gICAgICAgIGlmICghdGV4dE5vZGVzKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9UZXh0Tm9kZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBbZmlyc3QsIC4uLm90aGVyXSA9IHRleHROb2RlcztcclxuICAgICAgICBjb25zdCBzaXplVmFsQSA9IGdldChmaXJzdC5tb2RzLCAnc2l6ZScpO1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBuZXcgU2l6ZShzaXplVmFsQSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHRleHQgb2Ygb3RoZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZVZhbEIgPSBnZXQodGV4dC5tb2RzLCAnc2l6ZScpO1xyXG5cclxuICAgICAgICAgICAgLy8g0JTQsNC20LUg0LXRgdC70Lgg0LIg0YDQsNC80LrQsNGFINC+0LTQvdC+0LPQviDQsdC70L7QutCwINC90LXRgdC60L7Qu9GM0LrQviDQvtGI0LjQsdC+0YfQvdGL0YUg0YHQu9C+0LIsINGC0L4g0LLQvtCy0YDQsNGJ0LDQtdC8INC+0LTQvdGDINC+0YjQuNCx0LrRgy5cclxuICAgICAgICAgICAgaWYgKCFzaXplLmNoZWNrKHNpemVWYWxCKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2FybmluZ1RleHRTaXplU2hvdWxkQmVFcXVhbChub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFdhcm5pbmcoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53YXJuaW5ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLndhcm5pbmdzW2xlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0U2l6ZXM7IiwiY29uc3QgdGVzdHMgPSBbXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcIm1cIn19XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG4gICAgYFxyXG4gICAge1xyXG4gICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibFwifX0sXHJcbiAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibVwifX0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgICAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibFwifX0sXHJcbiAgICAgICAgICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJtXCJ9fVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAgICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcIm1cIn19LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1wiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7XCJzaXplXCI6IFwibVwifX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcIm1cIn19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJtXCJ9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwibFwiIH0gfSxcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJidXR0b25cIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwieGxcIiB9IH1cclxuICAgIF1cclxufVxyXG4gICAgYCxcclxuXHJcbiAgICBgXHJcbiAgICB7XHJcbiAgICBcImJsb2NrXCI6IFwid2FybmluZ1wiLFxyXG4gICAgXCJjb250ZW50XCI6IFtcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJ0ZXh0XCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcImxcIiB9IH0sXHJcbiAgICAgICAgeyBcImJsb2NrXCI6IFwiYnV0dG9uXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcInNcIiB9IH0sXHJcbiAgICAgICAgeyBcImJsb2NrXCI6IFwiYnV0dG9uXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcInhsXCIgfSB9LFxyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcImJ1dHRvblwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJsXCIgfSB9XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG4gICAgYFxyXG4gICAge1xyXG4gICAgXCJibG9ja1wiOiBcIndhcm5pbmdcIixcclxuICAgIFwiY29udGVudFwiOiBbXHJcbiAgICAgICAgeyBcImJsb2NrXCI6IFwicGxhY2Vob2xkZXJcIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwibVwiIH0gfSxcclxuICAgICAgICB7XCJibG9ja1wiOiBcInRleHRcIiwgXCJtb2RzXCI6IHtcInNpemVcIjogXCJsXCJ9fSxcclxuICAgICAgICB7IFwiYmxvY2tcIjogXCJidXR0b25cIiwgXCJtb2RzXCI6IHsgXCJzaXplXCI6IFwibVwiIH0gfVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcImJ1dHRvblwiLCBcIm1vZHNcIjogeyBcInNpemVcIjogXCJtXCIgfSB9LFxyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcInBsYWNlaG9sZGVyXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcInhsXCIgfSB9XHJcbiAgICBdXHJcbn1cclxuICAgIGAsXHJcblxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcInBsYWNlaG9sZGVyXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcIm1cIiB9fVxyXG4gICAgXVxyXG59XHJcbiAgICBgLFxyXG5cclxuICAgIGBcclxuICAgIHtcclxuICAgIFwiYmxvY2tcIjogXCJ3YXJuaW5nXCIsXHJcbiAgICBcImNvbnRlbnRcIjogW1xyXG4gICAgICAgIHtcImJsb2NrXCI6IFwidGV4dFwiLCBcIm1vZHNcIjoge1wic2l6ZVwiOiBcImxcIn19LFxyXG4gICAgICAgIHsgXCJibG9ja1wiOiBcInBsYWNlaG9sZGVyXCIsIFwibW9kc1wiOiB7IFwic2l6ZVwiOiBcInhsXCIgfX1cclxuICAgIF1cclxufVxyXG4gICAgYCxcclxuXHJcblxyXG4gICAgYFxyXG4gICAgW1xyXG4gICAge1xyXG4gICAgICAgIFwiYmxvY2tcIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJtb2RzXCI6IHsgXCJ0eXBlXCI6IFwiaDFcIiB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiYmxvY2tcIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJtb2RzXCI6IHsgXCJ0eXBlXCI6IFwiaDFcIiB9XHJcbiAgICB9XHJcbl1cclxuICAgIGAsXHJcblxyXG4gICAgYFxyXG4gICAgW1xyXG4gICAge1xyXG4gICAgICAgIFwiYmxvY2tcIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJtb2RzXCI6IHsgXCJ0eXBlXCI6IFwiaDJcIiB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiYmxvY2tcIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJtb2RzXCI6IHsgXCJ0eXBlXCI6IFwiaDJcIiB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiYmxvY2tcIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJtb2RzXCI6IHsgXCJ0eXBlXCI6IFwiaDFcIiB9XHJcbiAgICB9XHJcbl1cclxuICAgIGBcclxuXTtcclxuXHJcbmNvbnN0IGFuc3dlcnMgPSB7fVxyXG5cclxuZXhwb3J0IHt0ZXN0cywgYW5zd2Vyc307Il0sInNvdXJjZVJvb3QiOiIifQ==