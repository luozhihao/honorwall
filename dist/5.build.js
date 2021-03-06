webpackJsonp([5],Array(40).concat([
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(41)
	  , core      = __webpack_require__(42)
	  , ctx       = __webpack_require__(43)
	  , hide      = __webpack_require__(45)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 41 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 42 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.3.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(44);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(46)
	  , createDesc = __webpack_require__(54);
	module.exports = __webpack_require__(50) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(47)
	  , IE8_DOM_DEFINE = __webpack_require__(49)
	  , toPrimitive    = __webpack_require__(53)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(50) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(48);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(50) && !__webpack_require__(51)(function(){
	  return Object.defineProperty(__webpack_require__(52)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(51)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(48)
	  , document = __webpack_require__(41).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(48);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 55 */,
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(57)
	  , enumBugKeys = __webpack_require__(70);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(58)
	  , toIObject    = __webpack_require__(59)
	  , arrayIndexOf = __webpack_require__(63)(false)
	  , IE_PROTO     = __webpack_require__(67)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(60)
	  , defined = __webpack_require__(62);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(61);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(59)
	  , toLength  = __webpack_require__(64)
	  , toIndex   = __webpack_require__(66);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(65)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(65)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(68)('keys')
	  , uid    = __webpack_require__(69);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(41)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 71 */,
/* 72 */,
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(62);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["VueStrap"] = factory();
		else
			root["VueStrap"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		var _Alert = __webpack_require__(23);
		
		var _Alert2 = _interopRequireDefault(_Alert);
		
		var _Carousel = __webpack_require__(30);
		
		var _Carousel2 = _interopRequireDefault(_Carousel);
		
		var _Slider = __webpack_require__(74);
		
		var _Slider2 = _interopRequireDefault(_Slider);
		
		var _Accordion = __webpack_require__(77);
		
		var _Accordion2 = _interopRequireDefault(_Accordion);
		
		var _Affix = __webpack_require__(80);
		
		var _Affix2 = _interopRequireDefault(_Affix);
		
		var _Aside = __webpack_require__(85);
		
		var _Aside2 = _interopRequireDefault(_Aside);
		
		var _checkboxGroup = __webpack_require__(91);
		
		var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);
		
		var _checkboxBtn = __webpack_require__(94);
		
		var _checkboxBtn2 = _interopRequireDefault(_checkboxBtn);
		
		var _Datepicker = __webpack_require__(97);
		
		var _Datepicker2 = _interopRequireDefault(_Datepicker);
		
		var _Dropdown = __webpack_require__(102);
		
		var _Dropdown2 = _interopRequireDefault(_Dropdown);
		
		var _Modal = __webpack_require__(105);
		
		var _Modal2 = _interopRequireDefault(_Modal);
		
		var _Option = __webpack_require__(114);
		
		var _Option2 = _interopRequireDefault(_Option);
		
		var _Panel = __webpack_require__(119);
		
		var _Panel2 = _interopRequireDefault(_Panel);
		
		var _Popover = __webpack_require__(124);
		
		var _Popover2 = _interopRequireDefault(_Popover);
		
		var _Progressbar = __webpack_require__(130);
		
		var _Progressbar2 = _interopRequireDefault(_Progressbar);
		
		var _radioBtn = __webpack_require__(133);
		
		var _radioBtn2 = _interopRequireDefault(_radioBtn);
		
		var _radioGroup = __webpack_require__(136);
		
		var _radioGroup2 = _interopRequireDefault(_radioGroup);
		
		var _Select = __webpack_require__(139);
		
		var _Select2 = _interopRequireDefault(_Select);
		
		var _Tab = __webpack_require__(153);
		
		var _Tab2 = _interopRequireDefault(_Tab);
		
		var _Tabset = __webpack_require__(158);
		
		var _Tabset2 = _interopRequireDefault(_Tabset);
		
		var _Tooltip = __webpack_require__(163);
		
		var _Tooltip2 = _interopRequireDefault(_Tooltip);
		
		var _Typeahead = __webpack_require__(168);
		
		var _Typeahead2 = _interopRequireDefault(_Typeahead);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var VueStrap = {
		  alert: _Alert2.default,
		  carousel: _Carousel2.default,
		  slider: _Slider2.default,
		  accordion: _Accordion2.default,
		  affix: _Affix2.default,
		  aside: _Aside2.default,
		  checkboxBtn: _checkboxBtn2.default,
		  checkboxGroup: _checkboxGroup2.default,
		  datepicker: _Datepicker2.default,
		  dropdown: _Dropdown2.default,
		  modal: _Modal2.default,
		  option: _Option2.default,
		  panel: _Panel2.default,
		  popover: _Popover2.default,
		  progressbar: _Progressbar2.default,
		  radioGroup: _radioGroup2.default,
		  radioBtn: _radioBtn2.default,
		  select: _Select2.default,
		  tab: _Tab2.default,
		  tabset: _Tabset2.default,
		  tooltip: _Tooltip2.default,
		  typeahead: _Typeahead2.default
		};
		
		module.exports = VueStrap;
	
	/***/ },
	/* 1 */,
	/* 2 */,
	/* 3 */,
	/* 4 */,
	/* 5 */,
	/* 6 */,
	/* 7 */,
	/* 8 */,
	/* 9 */,
	/* 10 */,
	/* 11 */,
	/* 12 */,
	/* 13 */,
	/* 14 */,
	/* 15 */,
	/* 16 */,
	/* 17 */,
	/* 18 */,
	/* 19 */,
	/* 20 */,
	/* 21 */,
	/* 22 */,
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(24)
		module.exports = __webpack_require__(28)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(29)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Alert.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Alert.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Alert.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Alert.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Alert.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 24 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(25);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cc8c6960&file=Alert.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Alert.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cc8c6960&file=Alert.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Alert.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".fade-transition {\n  -webkit-transition: opacity .3s ease;\n  transition: opacity .3s ease;\n}\n.fade-enter,\n.fade-leave {\n  height: 0;\n  opacity: 0;\n}\n.alert.top {\n  position: fixed;\n  top: 30px;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  z-index: 2;\n}\n.alert.top-right {\n  position: fixed;\n  top: 30px;\n  right: 50px;\n  z-index: 2;\n}", ""]);
		
		// exports
	
	
	/***/ },
	/* 26 */
	/***/ function(module, exports) {
	
		/*
			MIT License http://www.opensource.org/licenses/mit-license.php
			Author Tobias Koppers @sokra
		*/
		// css base code, injected by the css-loader
		module.exports = function() {
			var list = [];
		
			// return the list of modules as css string
			list.toString = function toString() {
				var result = [];
				for(var i = 0; i < this.length; i++) {
					var item = this[i];
					if(item[2]) {
						result.push("@media " + item[2] + "{" + item[1] + "}");
					} else {
						result.push(item[1]);
					}
				}
				return result.join("");
			};
		
			// import a list of modules into the list
			list.i = function(modules, mediaQuery) {
				if(typeof modules === "string")
					modules = [[null, modules, ""]];
				var alreadyImportedModules = {};
				for(var i = 0; i < this.length; i++) {
					var id = this[i][0];
					if(typeof id === "number")
						alreadyImportedModules[id] = true;
				}
				for(i = 0; i < modules.length; i++) {
					var item = modules[i];
					// skip already imported module
					// this implementation is not 100% perfect for weird media query combinations
					//  when a module is imported multiple times with different media queries.
					//  I hope this will never occur (Hey this way we have smaller bundles)
					if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
						if(mediaQuery && !item[2]) {
							item[2] = mediaQuery;
						} else if(mediaQuery) {
							item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
						}
						list.push(item);
					}
				}
			};
			return list;
		};
	
	
	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
			MIT License http://www.opensource.org/licenses/mit-license.php
			Author Tobias Koppers @sokra
		*/
		var stylesInDom = {},
			memoize = function(fn) {
				var memo;
				return function () {
					if (typeof memo === "undefined") memo = fn.apply(this, arguments);
					return memo;
				};
			},
			isOldIE = memoize(function() {
				return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
			}),
			getHeadElement = memoize(function () {
				return document.head || document.getElementsByTagName("head")[0];
			}),
			singletonElement = null,
			singletonCounter = 0,
			styleElementsInsertedAtTop = [];
		
		module.exports = function(list, options) {
			if(false) {
				if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
			}
		
			options = options || {};
			// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
			// tags it will allow on a page
			if (typeof options.singleton === "undefined") options.singleton = isOldIE();
		
			// By default, add <style> tags to the bottom of <head>.
			if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
		
			var styles = listToStyles(list);
			addStylesToDom(styles, options);
		
			return function update(newList) {
				var mayRemove = [];
				for(var i = 0; i < styles.length; i++) {
					var item = styles[i];
					var domStyle = stylesInDom[item.id];
					domStyle.refs--;
					mayRemove.push(domStyle);
				}
				if(newList) {
					var newStyles = listToStyles(newList);
					addStylesToDom(newStyles, options);
				}
				for(var i = 0; i < mayRemove.length; i++) {
					var domStyle = mayRemove[i];
					if(domStyle.refs === 0) {
						for(var j = 0; j < domStyle.parts.length; j++)
							domStyle.parts[j]();
						delete stylesInDom[domStyle.id];
					}
				}
			};
		}
		
		function addStylesToDom(styles, options) {
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				if(domStyle) {
					domStyle.refs++;
					for(var j = 0; j < domStyle.parts.length; j++) {
						domStyle.parts[j](item.parts[j]);
					}
					for(; j < item.parts.length; j++) {
						domStyle.parts.push(addStyle(item.parts[j], options));
					}
				} else {
					var parts = [];
					for(var j = 0; j < item.parts.length; j++) {
						parts.push(addStyle(item.parts[j], options));
					}
					stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
				}
			}
		}
		
		function listToStyles(list) {
			var styles = [];
			var newStyles = {};
			for(var i = 0; i < list.length; i++) {
				var item = list[i];
				var id = item[0];
				var css = item[1];
				var media = item[2];
				var sourceMap = item[3];
				var part = {css: css, media: media, sourceMap: sourceMap};
				if(!newStyles[id])
					styles.push(newStyles[id] = {id: id, parts: [part]});
				else
					newStyles[id].parts.push(part);
			}
			return styles;
		}
		
		function insertStyleElement(options, styleElement) {
			var head = getHeadElement();
			var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
			if (options.insertAt === "top") {
				if(!lastStyleElementInsertedAtTop) {
					head.insertBefore(styleElement, head.firstChild);
				} else if(lastStyleElementInsertedAtTop.nextSibling) {
					head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
				} else {
					head.appendChild(styleElement);
				}
				styleElementsInsertedAtTop.push(styleElement);
			} else if (options.insertAt === "bottom") {
				head.appendChild(styleElement);
			} else {
				throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
			}
		}
		
		function removeStyleElement(styleElement) {
			styleElement.parentNode.removeChild(styleElement);
			var idx = styleElementsInsertedAtTop.indexOf(styleElement);
			if(idx >= 0) {
				styleElementsInsertedAtTop.splice(idx, 1);
			}
		}
		
		function createStyleElement(options) {
			var styleElement = document.createElement("style");
			styleElement.type = "text/css";
			insertStyleElement(options, styleElement);
			return styleElement;
		}
		
		function createLinkElement(options) {
			var linkElement = document.createElement("link");
			linkElement.rel = "stylesheet";
			insertStyleElement(options, linkElement);
			return linkElement;
		}
		
		function addStyle(obj, options) {
			var styleElement, update, remove;
		
			if (options.singleton) {
				var styleIndex = singletonCounter++;
				styleElement = singletonElement || (singletonElement = createStyleElement(options));
				update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
				remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
			} else if(obj.sourceMap &&
				typeof URL === "function" &&
				typeof URL.createObjectURL === "function" &&
				typeof URL.revokeObjectURL === "function" &&
				typeof Blob === "function" &&
				typeof btoa === "function") {
				styleElement = createLinkElement(options);
				update = updateLink.bind(null, styleElement);
				remove = function() {
					removeStyleElement(styleElement);
					if(styleElement.href)
						URL.revokeObjectURL(styleElement.href);
				};
			} else {
				styleElement = createStyleElement(options);
				update = applyToTag.bind(null, styleElement);
				remove = function() {
					removeStyleElement(styleElement);
				};
			}
		
			update(obj);
		
			return function updateStyle(newObj) {
				if(newObj) {
					if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
						return;
					update(obj = newObj);
				} else {
					remove();
				}
			};
		}
		
		var replaceText = (function () {
			var textStore = [];
		
			return function (index, replacement) {
				textStore[index] = replacement;
				return textStore.filter(Boolean).join('\n');
			};
		})();
		
		function applyToSingletonTag(styleElement, index, remove, obj) {
			var css = remove ? "" : obj.css;
		
			if (styleElement.styleSheet) {
				styleElement.styleSheet.cssText = replaceText(index, css);
			} else {
				var cssNode = document.createTextNode(css);
				var childNodes = styleElement.childNodes;
				if (childNodes[index]) styleElement.removeChild(childNodes[index]);
				if (childNodes.length) {
					styleElement.insertBefore(cssNode, childNodes[index]);
				} else {
					styleElement.appendChild(cssNode);
				}
			}
		}
		
		function applyToTag(styleElement, obj) {
			var css = obj.css;
			var media = obj.media;
			var sourceMap = obj.sourceMap;
		
			if(media) {
				styleElement.setAttribute("media", media)
			}
		
			if(styleElement.styleSheet) {
				styleElement.styleSheet.cssText = css;
			} else {
				while(styleElement.firstChild) {
					styleElement.removeChild(styleElement.firstChild);
				}
				styleElement.appendChild(document.createTextNode(css));
			}
		}
		
		function updateLink(linkElement, obj) {
			var css = obj.css;
			var media = obj.media;
			var sourceMap = obj.sourceMap;
		
			if(sourceMap) {
				// http://stackoverflow.com/a/26603875
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
			}
		
			var blob = new Blob([css], { type: "text/css" });
		
			var oldSrc = linkElement.href;
		
			linkElement.href = URL.createObjectURL(blob);
		
			if(oldSrc)
				URL.revokeObjectURL(oldSrc);
		}
	
	
	/***/ },
	/* 28 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <div
		//     v-show="show"
		//     v-bind:class="{
		//       'alert':		true,
		//       'alert-success':(type == 'success'),
		//       'alert-warning':(type == 'warning'),
		//       'alert-info':	(type == 'info'),
		//       'alert-danger':	(type == 'danger'),
		//       'top': 			(placement === 'top'),
		//       'top-right': 	(placement === 'top-right')
		//     }"
		//     transition="fade"
		//     v-bind:style="{width:width}"
		//     role="alert">
		//     <button v-show="dismissable" type="button" class="close"
		//       @click="show = false">
		//       <span>&times;</span>
		//     </button>
		//     <slot></slot>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    type: {
		      type: String
		    },
		    dismissable: {
		      type: Boolean,
		      default: false
		    },
		    show: {
		      type: Boolean,
		      default: true,
		      twoWay: true
		    },
		    duration: {
		      type: Number,
		      default: 0
		    },
		    width: {
		      type: String
		    },
		    placement: {
		      type: String
		    }
		  },
		  watch: {
		    show: function show(val) {
		      var _this = this;
		
		      if (this._timeout) clearTimeout(this._timeout);
		      if (val && Boolean(this.duration)) {
		        this._timeout = setTimeout(function () {
		          return _this.show = false;
		        }, this.duration);
		      }
		    }
		  }
		};
		// </script>
	
		// <style>
		// .fade-transition {
		//   transition: opacity .3s ease;
		// }
		// .fade-enter,
		// .fade-leave {
		//   height: 0;
		//   opacity: 0;
		// }
		// .alert.top {
		//   position: fixed;
		//   top: 30px;
		//   margin: 0 auto;
		//   left: 0;
		//   right: 0;
		//   z-index: 2;
		// }
		// .alert.top-right {
		//   position: fixed;
		//   top: 30px;
		//   right: 50px;
		//   z-index: 2;
		// }
		// </style>
	
	/***/ },
	/* 29 */
	/***/ function(module, exports) {
	
		module.exports = "<div\n    v-show=\"show\"\n    v-bind:class=\"{\n      'alert':\t\ttrue,\n      'alert-success':(type == 'success'),\n      'alert-warning':(type == 'warning'),\n      'alert-info':\t(type == 'info'),\n      'alert-danger':\t(type == 'danger'),\n      'top': \t\t\t(placement === 'top'),\n      'top-right': \t(placement === 'top-right')\n    }\"\n    transition=\"fade\"\n    v-bind:style=\"{width:width}\"\n    role=\"alert\">\n    <button v-show=\"dismissable\" type=\"button\" class=\"close\"\n      @click=\"show = false\">\n      <span>&times;</span>\n    </button>\n    <slot></slot>\n  </div>";
	
	/***/ },
	/* 30 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(31)
		module.exports = __webpack_require__(33)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(73)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Carousel.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Carousel.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/template-rewriter.js?id=_v-1ce6791c&file=Carousel.vue!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Carousel.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Carousel.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/template-rewriter.js?id=_v-1ce6791c&file=Carousel.vue!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Carousel.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 31 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(32);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1ce6791c&file=Carousel.vue&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Carousel.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1ce6791c&file=Carousel.vue&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Carousel.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 32 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".carousel-control[_v-1ce6791c] {\n    cursor: pointer;\n  }", ""]);
		
		// exports
	
	
	/***/ },
	/* 33 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _toConsumableArray2 = __webpack_require__(34);
		
		var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
		
		var _EventListener = __webpack_require__(72);
		
		var _EventListener2 = _interopRequireDefault(_EventListener);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		exports.default = {
		  props: {
		    indicators: {
		      type: Boolean,
		      default: true
		    },
		    controls: {
		      type: Boolean,
		      default: true
		    },
		    interval: {
		      type: Number,
		      default: 5000
		    }
		  },
		  components: {
		    'indicator': {
		      inherit: true,
		      template: '<li v-for="i in indicator" @click="handleIndicatorClick($index)" v-bind:class="{\'active\':$index === activeIndex}"</li>',
		      methods: {
		        handleIndicatorClick: function handleIndicatorClick(index) {
		          if (this.isAnimating) return false;
		          this.isAnimating = true;
		          this.activeIndex = index;
		        }
		      }
		    }
		  },
		  data: function data() {
		    return {
		      indicator: [],
		      activeIndex: 0,
		      isAnimating: false
		    };
		  },
		
		  computed: {
		    slider: function slider() {
		      return this.$el.querySelectorAll('.item');
		    }
		  },
		  watch: {
		    activeIndex: function activeIndex(newVal, oldVal) {
		      newVal > oldVal ? this.slide('left', newVal, oldVal) : this.slide('right', newVal, oldVal);
		    }
		  },
		  methods: {
		    slide: function slide(direction, selected, prev) {
		      var _this = this;
		
		      if (this._prevSelectedEvent) this._prevSelectedEvent.remove();
		      if (this._selectedEvent) this._selectedEvent.remove();
		
		      var prevSelectedEl = this.slider[prev];
		      var selectedEl = this.slider[selected];
		      var transitionendFn = function transitionendFn() {
		        [].concat((0, _toConsumableArray3.default)(_this.slider)).forEach(function (el) {
		          return el.className = 'item';
		        });
		        selectedEl.classList.add('active');
		        _this.isAnimating = false;
		      };
		
		      direction === 'left' ? selectedEl.classList.add('next') : selectedEl.classList.add('prev');
		      // request property that requires layout to force a layout
		      var x = selectedEl.clientHeight;
		      this._prevSelectedEvent = _EventListener2.default.listen(prevSelectedEl, 'transitionend', transitionendFn);
		      this._selectedEvent = _EventListener2.default.listen(selectedEl, 'transitionend', transitionendFn);
		      prevSelectedEl.classList.add(direction);
		      selectedEl.classList.add(direction);
		    },
		    nextClick: function nextClick() {
		      if (this.isAnimating) return false;
		      this.isAnimating = true;
		      this.activeIndex + 1 < this.slider.length ? this.activeIndex += 1 : this.activeIndex = 0;
		    },
		    prevClick: function prevClick() {
		      if (this.isAnimating) return false;
		      this.isAnimating = true;
		      this.activeIndex === 0 ? this.activeIndex = this.slider.length - 1 : this.activeIndex -= 1;
		    }
		  },
		  ready: function ready() {
		    var _this2 = this;
		
		    var intervalID = null;
		    var el = this.$el;
		    function intervalManager(flag, func, time) {
		      flag ? intervalID = setInterval(func, time) : clearInterval(intervalID);
		    }
		    if (!!this.interval) {
		      intervalManager(true, this.nextClick, this.interval);
		      el.addEventListener('mouseenter', function () {
		        return intervalManager(false);
		      });
		      el.addEventListener('mouseleave', function () {
		        return intervalManager(true, _this2.nextClick, _this2.interval);
		      });
		    }
		  }
		};
		// </script>
	
		// <style scoped>
		//   .carousel-control {
		//     cursor: pointer;
		//   }
		// </style>
		// <template>
		// <div class="carousel slide" data-ride="carousel">
		//   <!-- Indicators -->
		//   <ol class="carousel-indicators" v-show="indicators">
		//     <indicator></indicator>
		//   </ol>
		//   <!-- Wrapper for slides -->
		//   <div class="carousel-inner" role="listbox">
		//     <slot></slot>
		//   </div>
		//   <!-- Controls -->
		//   <a v-show="controls" class="left carousel-control" @click="prevClick">
		//     <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
		//     <span class="sr-only">Previous</span>
		//   </a>
		//   <a v-show="controls" class="right carousel-control" @click="nextClick">
		//     <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
		//     <span class="sr-only">Next</span>
		//   </a>
		// </div>
		// </template>
	
		// <script>
	
	/***/ },
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var _from = __webpack_require__(35);
		
		var _from2 = _interopRequireDefault(_from);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		exports.default = function (arr) {
		  if (Array.isArray(arr)) {
		    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
		      arr2[i] = arr[i];
		    }
		
		    return arr2;
		  } else {
		    return (0, _from2.default)(arr);
		  }
		};
		
		exports.__esModule = true;
	
	/***/ },
	/* 35 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(36), __esModule: true };
	
	/***/ },
	/* 36 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(37);
		__webpack_require__(61);
		module.exports = __webpack_require__(45).Array.from;
	
	/***/ },
	/* 37 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var $at  = __webpack_require__(38)(true);
		
		// 21.1.3.27 String.prototype[@@iterator]()
		__webpack_require__(41)(String, 'String', function(iterated){
		  this._t = String(iterated); // target
		  this._i = 0;                // next index
		// 21.1.5.2.1 %StringIteratorPrototype%.next()
		}, function(){
		  var O     = this._t
		    , index = this._i
		    , point;
		  if(index >= O.length)return {value: undefined, done: true};
		  point = $at(O, index);
		  this._i += point.length;
		  return {value: point, done: false};
		});
	
	/***/ },
	/* 38 */
	/***/ function(module, exports, __webpack_require__) {
	
		var toInteger = __webpack_require__(39)
		  , defined   = __webpack_require__(40);
		// true  -> String#at
		// false -> String#codePointAt
		module.exports = function(TO_STRING){
		  return function(that, pos){
		    var s = String(defined(that))
		      , i = toInteger(pos)
		      , l = s.length
		      , a, b;
		    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
		    a = s.charCodeAt(i);
		    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
		      ? TO_STRING ? s.charAt(i) : a
		      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
		  };
		};
	
	/***/ },
	/* 39 */
	/***/ function(module, exports) {
	
		// 7.1.4 ToInteger
		var ceil  = Math.ceil
		  , floor = Math.floor;
		module.exports = function(it){
		  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
		};
	
	/***/ },
	/* 40 */
	/***/ function(module, exports) {
	
		// 7.2.1 RequireObjectCoercible(argument)
		module.exports = function(it){
		  if(it == undefined)throw TypeError("Can't call method on  " + it);
		  return it;
		};
	
	/***/ },
	/* 41 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var LIBRARY        = __webpack_require__(42)
		  , $export        = __webpack_require__(43)
		  , redefine       = __webpack_require__(48)
		  , hide           = __webpack_require__(49)
		  , has            = __webpack_require__(54)
		  , Iterators      = __webpack_require__(55)
		  , $iterCreate    = __webpack_require__(56)
		  , setToStringTag = __webpack_require__(57)
		  , getProto       = __webpack_require__(50).getProto
		  , ITERATOR       = __webpack_require__(58)('iterator')
		  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
		  , FF_ITERATOR    = '@@iterator'
		  , KEYS           = 'keys'
		  , VALUES         = 'values';
		
		var returnThis = function(){ return this; };
		
		module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
		  $iterCreate(Constructor, NAME, next);
		  var getMethod = function(kind){
		    if(!BUGGY && kind in proto)return proto[kind];
		    switch(kind){
		      case KEYS: return function keys(){ return new Constructor(this, kind); };
		      case VALUES: return function values(){ return new Constructor(this, kind); };
		    } return function entries(){ return new Constructor(this, kind); };
		  };
		  var TAG        = NAME + ' Iterator'
		    , DEF_VALUES = DEFAULT == VALUES
		    , VALUES_BUG = false
		    , proto      = Base.prototype
		    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
		    , $default   = $native || getMethod(DEFAULT)
		    , methods, key;
		  // Fix native
		  if($native){
		    var IteratorPrototype = getProto($default.call(new Base));
		    // Set @@toStringTag to native iterators
		    setToStringTag(IteratorPrototype, TAG, true);
		    // FF fix
		    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
		    // fix Array#{values, @@iterator}.name in V8 / FF
		    if(DEF_VALUES && $native.name !== VALUES){
		      VALUES_BUG = true;
		      $default = function values(){ return $native.call(this); };
		    }
		  }
		  // Define iterator
		  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
		    hide(proto, ITERATOR, $default);
		  }
		  // Plug for library
		  Iterators[NAME] = $default;
		  Iterators[TAG]  = returnThis;
		  if(DEFAULT){
		    methods = {
		      values:  DEF_VALUES  ? $default : getMethod(VALUES),
		      keys:    IS_SET      ? $default : getMethod(KEYS),
		      entries: !DEF_VALUES ? $default : getMethod('entries')
		    };
		    if(FORCED)for(key in methods){
		      if(!(key in proto))redefine(proto, key, methods[key]);
		    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
		  }
		  return methods;
		};
	
	/***/ },
	/* 42 */
	/***/ function(module, exports) {
	
		module.exports = true;
	
	/***/ },
	/* 43 */
	/***/ function(module, exports, __webpack_require__) {
	
		var global    = __webpack_require__(44)
		  , core      = __webpack_require__(45)
		  , ctx       = __webpack_require__(46)
		  , PROTOTYPE = 'prototype';
		
		var $export = function(type, name, source){
		  var IS_FORCED = type & $export.F
		    , IS_GLOBAL = type & $export.G
		    , IS_STATIC = type & $export.S
		    , IS_PROTO  = type & $export.P
		    , IS_BIND   = type & $export.B
		    , IS_WRAP   = type & $export.W
		    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
		    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
		    , key, own, out;
		  if(IS_GLOBAL)source = name;
		  for(key in source){
		    // contains in native
		    own = !IS_FORCED && target && key in target;
		    if(own && key in exports)continue;
		    // export native or passed
		    out = own ? target[key] : source[key];
		    // prevent global pollution for namespaces
		    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
		    // bind timers to global for call from export context
		    : IS_BIND && own ? ctx(out, global)
		    // wrap global constructors for prevent change them in library
		    : IS_WRAP && target[key] == out ? (function(C){
		      var F = function(param){
		        return this instanceof C ? new C(param) : C(param);
		      };
		      F[PROTOTYPE] = C[PROTOTYPE];
		      return F;
		    // make static versions for prototype methods
		    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
		    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
		  }
		};
		// type bitmap
		$export.F = 1;  // forced
		$export.G = 2;  // global
		$export.S = 4;  // static
		$export.P = 8;  // proto
		$export.B = 16; // bind
		$export.W = 32; // wrap
		module.exports = $export;
	
	/***/ },
	/* 44 */
	/***/ function(module, exports) {
	
		// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
		var global = module.exports = typeof window != 'undefined' && window.Math == Math
		  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
		if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	
	/***/ },
	/* 45 */
	/***/ function(module, exports) {
	
		var core = module.exports = {version: '1.2.6'};
		if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	
	/***/ },
	/* 46 */
	/***/ function(module, exports, __webpack_require__) {
	
		// optional / simple context binding
		var aFunction = __webpack_require__(47);
		module.exports = function(fn, that, length){
		  aFunction(fn);
		  if(that === undefined)return fn;
		  switch(length){
		    case 1: return function(a){
		      return fn.call(that, a);
		    };
		    case 2: return function(a, b){
		      return fn.call(that, a, b);
		    };
		    case 3: return function(a, b, c){
		      return fn.call(that, a, b, c);
		    };
		  }
		  return function(/* ...args */){
		    return fn.apply(that, arguments);
		  };
		};
	
	/***/ },
	/* 47 */
	/***/ function(module, exports) {
	
		module.exports = function(it){
		  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
		  return it;
		};
	
	/***/ },
	/* 48 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(49);
	
	/***/ },
	/* 49 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $          = __webpack_require__(50)
		  , createDesc = __webpack_require__(51);
		module.exports = __webpack_require__(52) ? function(object, key, value){
		  return $.setDesc(object, key, createDesc(1, value));
		} : function(object, key, value){
		  object[key] = value;
		  return object;
		};
	
	/***/ },
	/* 50 */
	/***/ function(module, exports) {
	
		var $Object = Object;
		module.exports = {
		  create:     $Object.create,
		  getProto:   $Object.getPrototypeOf,
		  isEnum:     {}.propertyIsEnumerable,
		  getDesc:    $Object.getOwnPropertyDescriptor,
		  setDesc:    $Object.defineProperty,
		  setDescs:   $Object.defineProperties,
		  getKeys:    $Object.keys,
		  getNames:   $Object.getOwnPropertyNames,
		  getSymbols: $Object.getOwnPropertySymbols,
		  each:       [].forEach
		};
	
	/***/ },
	/* 51 */
	/***/ function(module, exports) {
	
		module.exports = function(bitmap, value){
		  return {
		    enumerable  : !(bitmap & 1),
		    configurable: !(bitmap & 2),
		    writable    : !(bitmap & 4),
		    value       : value
		  };
		};
	
	/***/ },
	/* 52 */
	/***/ function(module, exports, __webpack_require__) {
	
		// Thank's IE8 for his funny defineProperty
		module.exports = !__webpack_require__(53)(function(){
		  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
		});
	
	/***/ },
	/* 53 */
	/***/ function(module, exports) {
	
		module.exports = function(exec){
		  try {
		    return !!exec();
		  } catch(e){
		    return true;
		  }
		};
	
	/***/ },
	/* 54 */
	/***/ function(module, exports) {
	
		var hasOwnProperty = {}.hasOwnProperty;
		module.exports = function(it, key){
		  return hasOwnProperty.call(it, key);
		};
	
	/***/ },
	/* 55 */
	/***/ function(module, exports) {
	
		module.exports = {};
	
	/***/ },
	/* 56 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var $              = __webpack_require__(50)
		  , descriptor     = __webpack_require__(51)
		  , setToStringTag = __webpack_require__(57)
		  , IteratorPrototype = {};
		
		// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
		__webpack_require__(49)(IteratorPrototype, __webpack_require__(58)('iterator'), function(){ return this; });
		
		module.exports = function(Constructor, NAME, next){
		  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
		  setToStringTag(Constructor, NAME + ' Iterator');
		};
	
	/***/ },
	/* 57 */
	/***/ function(module, exports, __webpack_require__) {
	
		var def = __webpack_require__(50).setDesc
		  , has = __webpack_require__(54)
		  , TAG = __webpack_require__(58)('toStringTag');
		
		module.exports = function(it, tag, stat){
		  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
		};
	
	/***/ },
	/* 58 */
	/***/ function(module, exports, __webpack_require__) {
	
		var store  = __webpack_require__(59)('wks')
		  , uid    = __webpack_require__(60)
		  , Symbol = __webpack_require__(44).Symbol;
		module.exports = function(name){
		  return store[name] || (store[name] =
		    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
		};
	
	/***/ },
	/* 59 */
	/***/ function(module, exports, __webpack_require__) {
	
		var global = __webpack_require__(44)
		  , SHARED = '__core-js_shared__'
		  , store  = global[SHARED] || (global[SHARED] = {});
		module.exports = function(key){
		  return store[key] || (store[key] = {});
		};
	
	/***/ },
	/* 60 */
	/***/ function(module, exports) {
	
		var id = 0
		  , px = Math.random();
		module.exports = function(key){
		  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
		};
	
	/***/ },
	/* 61 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var ctx         = __webpack_require__(46)
		  , $export     = __webpack_require__(43)
		  , toObject    = __webpack_require__(62)
		  , call        = __webpack_require__(63)
		  , isArrayIter = __webpack_require__(66)
		  , toLength    = __webpack_require__(67)
		  , getIterFn   = __webpack_require__(68);
		$export($export.S + $export.F * !__webpack_require__(71)(function(iter){ Array.from(iter); }), 'Array', {
		  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
		  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
		    var O       = toObject(arrayLike)
		      , C       = typeof this == 'function' ? this : Array
		      , $$      = arguments
		      , $$len   = $$.length
		      , mapfn   = $$len > 1 ? $$[1] : undefined
		      , mapping = mapfn !== undefined
		      , index   = 0
		      , iterFn  = getIterFn(O)
		      , length, result, step, iterator;
		    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
		    // if object isn't iterable or it's array with default iterator - use simple case
		    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
		      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
		        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
		      }
		    } else {
		      length = toLength(O.length);
		      for(result = new C(length); length > index; index++){
		        result[index] = mapping ? mapfn(O[index], index) : O[index];
		      }
		    }
		    result.length = index;
		    return result;
		  }
		});
	
	
	/***/ },
	/* 62 */
	/***/ function(module, exports, __webpack_require__) {
	
		// 7.1.13 ToObject(argument)
		var defined = __webpack_require__(40);
		module.exports = function(it){
		  return Object(defined(it));
		};
	
	/***/ },
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {
	
		// call something on iterator step with safe closing on error
		var anObject = __webpack_require__(64);
		module.exports = function(iterator, fn, value, entries){
		  try {
		    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
		  // 7.4.6 IteratorClose(iterator, completion)
		  } catch(e){
		    var ret = iterator['return'];
		    if(ret !== undefined)anObject(ret.call(iterator));
		    throw e;
		  }
		};
	
	/***/ },
	/* 64 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isObject = __webpack_require__(65);
		module.exports = function(it){
		  if(!isObject(it))throw TypeError(it + ' is not an object!');
		  return it;
		};
	
	/***/ },
	/* 65 */
	/***/ function(module, exports) {
	
		module.exports = function(it){
		  return typeof it === 'object' ? it !== null : typeof it === 'function';
		};
	
	/***/ },
	/* 66 */
	/***/ function(module, exports, __webpack_require__) {
	
		// check on default Array iterator
		var Iterators  = __webpack_require__(55)
		  , ITERATOR   = __webpack_require__(58)('iterator')
		  , ArrayProto = Array.prototype;
		
		module.exports = function(it){
		  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
		};
	
	/***/ },
	/* 67 */
	/***/ function(module, exports, __webpack_require__) {
	
		// 7.1.15 ToLength
		var toInteger = __webpack_require__(39)
		  , min       = Math.min;
		module.exports = function(it){
		  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
		};
	
	/***/ },
	/* 68 */
	/***/ function(module, exports, __webpack_require__) {
	
		var classof   = __webpack_require__(69)
		  , ITERATOR  = __webpack_require__(58)('iterator')
		  , Iterators = __webpack_require__(55);
		module.exports = __webpack_require__(45).getIteratorMethod = function(it){
		  if(it != undefined)return it[ITERATOR]
		    || it['@@iterator']
		    || Iterators[classof(it)];
		};
	
	/***/ },
	/* 69 */
	/***/ function(module, exports, __webpack_require__) {
	
		// getting tag from 19.1.3.6 Object.prototype.toString()
		var cof = __webpack_require__(70)
		  , TAG = __webpack_require__(58)('toStringTag')
		  // ES3 wrong here
		  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
		
		module.exports = function(it){
		  var O, T, B;
		  return it === undefined ? 'Undefined' : it === null ? 'Null'
		    // @@toStringTag case
		    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
		    // builtinTag case
		    : ARG ? cof(O)
		    // ES3 arguments fallback
		    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
		};
	
	/***/ },
	/* 70 */
	/***/ function(module, exports) {
	
		var toString = {}.toString;
		
		module.exports = function(it){
		  return toString.call(it).slice(8, -1);
		};
	
	/***/ },
	/* 71 */
	/***/ function(module, exports, __webpack_require__) {
	
		var ITERATOR     = __webpack_require__(58)('iterator')
		  , SAFE_CLOSING = false;
		
		try {
		  var riter = [7][ITERATOR]();
		  riter['return'] = function(){ SAFE_CLOSING = true; };
		  Array.from(riter, function(){ throw 2; });
		} catch(e){ /* empty */ }
		
		module.exports = function(exec, skipClosing){
		  if(!skipClosing && !SAFE_CLOSING)return false;
		  var safe = false;
		  try {
		    var arr  = [7]
		      , iter = arr[ITERATOR]();
		    iter.next = function(){ safe = true; };
		    arr[ITERATOR] = function(){ return iter; };
		    exec(arr);
		  } catch(e){ /* empty */ }
		  return safe;
		};
	
	/***/ },
	/* 72 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var EventListener = {
		  /**
		   * Listen to DOM events during the bubble phase.
		   *
		   * @param {DOMEventTarget} target DOM element to register listener on.
		   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
		   * @param {function} callback Callback function.
		   * @return {object} Object with a `remove` method.
		   */
		
		  listen: function listen(target, eventType, callback) {
		    if (target.addEventListener) {
		      target.addEventListener(eventType, callback, false);
		      return {
		        remove: function remove() {
		          target.removeEventListener(eventType, callback, false);
		        }
		      };
		    } else if (target.attachEvent) {
		      target.attachEvent('on' + eventType, callback);
		      return {
		        remove: function remove() {
		          target.detachEvent('on' + eventType, callback);
		        }
		      };
		    }
		  }
		};
		
		exports.default = EventListener;
	
	/***/ },
	/* 73 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"carousel slide\" data-ride=\"carousel\" _v-1ce6791c=\"\">\n  <!-- Indicators -->\n  <ol class=\"carousel-indicators\" v-show=\"indicators\" _v-1ce6791c=\"\">\n    <indicator _v-1ce6791c=\"\"></indicator>\n  </ol>\n  <!-- Wrapper for slides -->\n  <div class=\"carousel-inner\" role=\"listbox\" _v-1ce6791c=\"\">\n    <slot _v-1ce6791c=\"\"></slot>\n  </div>\n  <!-- Controls -->\n  <a v-show=\"controls\" class=\"left carousel-control\" @click=\"prevClick\" _v-1ce6791c=\"\">\n    <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\" _v-1ce6791c=\"\"></span>\n    <span class=\"sr-only\" _v-1ce6791c=\"\">Previous</span>\n  </a>\n  <a v-show=\"controls\" class=\"right carousel-control\" @click=\"nextClick\" _v-1ce6791c=\"\">\n    <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" _v-1ce6791c=\"\"></span>\n    <span class=\"sr-only\" _v-1ce6791c=\"\">Next</span>\n  </a>\n</div>";
	
	/***/ },
	/* 74 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(75)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(76)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Slider.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Slider.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Slider.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Slider.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Slider.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 75 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <div class="item">
		//     <slot></slot>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  data: function data() {
		    return {
		      index: 0,
		      show: false
		    };
		  },
		
		  computed: {
		    show: function show() {
		      return this.$parent.activeIndex === this.index;
		    }
		  },
		  ready: function ready() {
		    for (var c in this.$parent.$children) {
		      if (this.$parent.$children[c].$el == this.$el) {
		        this.index = parseInt(c, 10);
		        break;
		      }
		    }
		    //this.index = [...this.$el.parentNode.children].indexOf(this.$el)
		    this.$parent.indicator.push(this.index);
		    if (this.index === 0) {
		      this.$el.classList.add('active');
		    }
		  }
		};
		// </script>
	
	/***/ },
	/* 76 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"item\">\n    <slot></slot>\n  </div>";
	
	/***/ },
	/* 77 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(78)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(79)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Accordion.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Accordion.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Accordion.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Accordion.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Accordion.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 78 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <div class="panel-group">
		//     <slot></slot>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    oneAtATime: {
		      type: Boolean,
		      default: false
		    }
		  },
		  created: function created() {
		    var _this = this;
		
		    this.$on('isOpenEvent', function (child) {
		      if (_this.oneAtATime) {
		        _this.$children.forEach(function (item) {
		          if (child !== item) {
		            item.isOpen = false;
		          }
		        });
		      }
		    });
		  }
		};
		// </script>
	
	/***/ },
	/* 79 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"panel-group\">\n    <slot></slot>\n  </div>";
	
	/***/ },
	/* 80 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(81)
		module.exports = __webpack_require__(83)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(84)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Affix.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Affix.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Affix.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Affix.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Affix.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 81 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(82);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5035b9c4&file=Affix.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Affix.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5035b9c4&file=Affix.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Affix.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 82 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".vue-affix {\n    position: fixed;\n  }", ""]);
		
		// exports
	
	
	/***/ },
	/* 83 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _EventListener = __webpack_require__(72);
		
		var _EventListener2 = _interopRequireDefault(_EventListener);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		exports.default = {
		  props: {
		    offset: {
		      type: Number,
		      default: 0
		    }
		  },
		  data: function data() {
		    return {
		      affixed: false,
		      styles: {}
		    };
		  },
		
		  methods: {
		    scrolling: function scrolling() {
		      var scrollTop = this.getScroll(window, true);
		      var elementOffset = this.getOffset(this.$el);
		      if (!this.affixed && scrollTop > elementOffset.top) {
		        this.affixed = true;
		        this.styles = {
		          top: this.offset + 'px',
		          left: elementOffset.left + 'px',
		          width: this.$el.offsetWidth + 'px'
		        };
		      }
		      if (this.affixed && scrollTop < elementOffset.top) {
		        this.affixed = false;
		        this.styles = {};
		      }
		    },
		
		    // from https://github.com/ant-design/ant-design/blob/master/components/affix/index.jsx#L20
		    getScroll: function getScroll(w, top) {
		      var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
		      var method = 'scroll' + (top ? 'Top' : 'Left');
		      if (typeof ret !== 'number') {
		        var d = w.document;
		        // ie6,7,8 standard mode
		        ret = d.documentElement[method];
		        if (typeof ret !== 'number') {
		          // quirks mode
		          ret = d.body[method];
		        }
		      }
		      return ret;
		    },
		    getOffset: function getOffset(element) {
		      var rect = element.getBoundingClientRect();
		      var body = document.body;
		      var clientTop = element.clientTop || body.clientTop || 0;
		      var clientLeft = element.clientLeft || body.clientLeft || 0;
		      var scrollTop = this.getScroll(window, true);
		      var scrollLeft = this.getScroll(window);
		      return {
		        top: rect.top + scrollTop - clientTop,
		        left: rect.left + scrollLeft - clientLeft
		      };
		    }
		  },
		  ready: function ready() {
		    this._scrollEvent = _EventListener2.default.listen(window, 'scroll', this.scrolling);
		    this._resizeEvent = _EventListener2.default.listen(window, 'resize', this.scrolling);
		  },
		  beforeDestroy: function beforeDestroy() {
		    if (this._scrollEvent) {
		      this._scrollEvent.remove();
		    }
		    if (this._resizeEvent) {
		      this._resizeEvent.remove();
		    }
		  }
		};
		// </script>
	
		// <style>
		//   .vue-affix {
		//     position: fixed;
		//   }
		// </style>
		// <template>
		// <div>
		// <div v-bind:class="{'vue-affix': affixed}"
		//   v-bind:style="styles">
		//   <slot></slot>
		// </div>
		// </div>
		// </template>
	
		// <script>
	
	/***/ },
	/* 84 */
	/***/ function(module, exports) {
	
		module.exports = "<div>\n<div v-bind:class=\"{'vue-affix': affixed}\"\n  v-bind:style=\"styles\">\n  <slot></slot>\n</div>\n</div>";
	
	/***/ },
	/* 85 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(86)
		module.exports = __webpack_require__(88)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(90)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Aside.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Aside.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Aside.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Aside.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Aside.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 86 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(87);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2bc3b92c&file=Aside.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Aside.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2bc3b92c&file=Aside.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Aside.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 87 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".aside-open {\n    -webkit-transition: -webkit-transform 0.3s;\n    transition: -webkit-transform 0.3s;\n    transition: transform 0.3s;\n    transition: transform 0.3s, -webkit-transform 0.3s;\n  }\n  .aside-open.has-push-right {\n    -webkit-transform: translateX(-300px);\n            transform: translateX(-300px);\n  }\n  .aside {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      z-index: 1049;\n      overflow: auto;\n      background: #fff;\n  }\n  .aside.left {\n    left: 0;\n    right: auto;\n  }\n  .aside.right {\n    left: auto;\n    right: 0;\n  }\n\n  .slideleft-enter {\n    -webkit-animation:slideleft-in .3s;\n            animation:slideleft-in .3s;\n  }\n  .slideleft-leave {\n    -webkit-animation:slideleft-out .3s;\n            animation:slideleft-out .3s;\n  }\n  @-webkit-keyframes slideleft-in {\n    0% {\n      -webkit-transform: translateX(-100%);\n              transform: translateX(-100%);\n      opacity: 0;\n    }\n    100% {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      opacity: 1;\n    }\n  }\n  @keyframes slideleft-in {\n    0% {\n      -webkit-transform: translateX(-100%);\n              transform: translateX(-100%);\n      opacity: 0;\n    }\n    100% {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      opacity: 1;\n    }\n  }\n  @-webkit-keyframes slideleft-out {\n    0% {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      opacity: 1;\n    }\n    100% {\n      -webkit-transform: translateX(-100%);\n              transform: translateX(-100%);\n      opacity: 0;\n    }\n  }\n  @keyframes slideleft-out {\n    0% {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      opacity: 1;\n    }\n    100% {\n      -webkit-transform: translateX(-100%);\n              transform: translateX(-100%);\n      opacity: 0;\n    }\n  }\n  .slideright-enter {\n    -webkit-animation:slideright-in .3s;\n            animation:slideright-in .3s;\n  }\n  .slideright-leave {\n    -webkit-animation:slideright-out .3s;\n            animation:slideright-out .3s;\n  }\n  @-webkit-keyframes slideright-in {\n    0% {\n      -webkit-transform: translateX(100%);\n              transform: translateX(100%);\n      opacity: 0;\n    }\n    100% {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      opacity: 1;\n    }\n  }\n  @keyframes slideright-in {\n    0% {\n      -webkit-transform: translateX(100%);\n              transform: translateX(100%);\n      opacity: 0;\n    }\n    100% {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      opacity: 1;\n    }\n  }\n  @-webkit-keyframes slideright-out {\n    0% {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      opacity: 1;\n    }\n    100% {\n      -webkit-transform: translateX(100%);\n              transform: translateX(100%);\n      opacity: 0;\n    }\n  }\n  @keyframes slideright-out {\n    0% {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      opacity: 1;\n    }\n    100% {\n      -webkit-transform: translateX(100%);\n              transform: translateX(100%);\n      opacity: 0;\n    }\n  }\n\n  .aside:focus {\n      outline: 0\n  }\n\n  @media (max-width: 991px) {\n      .aside {\n          min-width:240px\n      }\n  }\n\n  .aside.left {\n      right: auto;\n      left: 0\n  }\n\n  .aside.right {\n      right: 0;\n      left: auto\n  }\n\n  .aside .aside-dialog .aside-header {\n      border-bottom: 1px solid #e5e5e5;\n      min-height: 16.43px;\n      padding: 6px 15px;\n      background: #337ab7;\n      color: #fff\n  }\n\n  .aside .aside-dialog .aside-header .close {\n      margin-right: -8px;\n      padding: 4px 8px;\n      color: #fff;\n      font-size: 25px;\n      opacity: .8\n  }\n\n  .aside .aside-dialog .aside-body {\n      position: relative;\n      padding: 15px\n  }\n\n  .aside .aside-dialog .aside-footer {\n      padding: 15px;\n      text-align: right;\n      border-top: 1px solid #e5e5e5\n  }\n\n  .aside .aside-dialog .aside-footer .btn+.btn {\n      margin-left: 5px;\n      margin-bottom: 0\n  }\n\n  .aside .aside-dialog .aside-footer .btn-group .btn+.btn {\n      margin-left: -1px\n  }\n\n  .aside .aside-dialog .aside-footer .btn-block+.btn-block {\n      margin-left: 0\n  }\n\n  .aside-backdrop {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      z-index: 1040;\n      opacity: 0;\n      -webkit-transition: opacity .3s ease;\n      transition: opacity .3s ease;\n      background-color: #000\n  }\n\n\n  .aside-backdrop.in {\n      opacity: .5;\n      filter: alpha(opacity=50)\n  }", ""]);
		
		// exports
	
	
	/***/ },
	/* 88 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _EventListener = __webpack_require__(72);
		
		var _EventListener2 = _interopRequireDefault(_EventListener);
		
		var _getScrollBarWidth = __webpack_require__(89);
		
		var _getScrollBarWidth2 = _interopRequireDefault(_getScrollBarWidth);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		// <template>
		//   <div class="aside"
		//     v-bind:style="{width:width + 'px'}"
		//     v-bind:class="{
		//     left:placement === 'left',
		//     right:placement === 'right'
		//     }"
		//     v-show="show"
		//     :transition="(this.placement === 'left') ? 'slideleft' : 'slideright'">
		//     <div class="aside-dialog">
		//       <div class="aside-content">
		//         <div class="aside-header">
		//           <button type="button" class="close" @click='close'><span>&times;</span></button>
		//           <h4 class="aside-title">{{header}}</h4>
		//         </div>
		//         <div class="aside-body">
		//           <slot></slot>
		//         </div>
		//       </div>
		//     </div>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    show: {
		      type: Boolean,
		      require: true,
		      twoWay: true
		    },
		    placement: {
		      type: String,
		      default: 'right'
		    },
		    header: {
		      type: String
		    },
		    width: {
		      type: Number,
		      default: '320'
		    }
		  },
		  watch: {
		    show: function show(val) {
		      var backdrop = document.createElement('div');
		      var body = document.body;
		      backdrop.className = 'aside-backdrop';
		      var scrollBarWidth = (0, _getScrollBarWidth2.default)();
		      if (val) {
		        body.appendChild(backdrop);
		        body.classList.add('modal-open');
		        if (scrollBarWidth !== 0) {
		          body.style.paddingRight = scrollBarWidth + 'px';
		        }
		        // request property that requires layout to force a layout
		        var x = backdrop.clientHeight;
		        backdrop.className += ' in';
		        this._clickEvent = _EventListener2.default.listen(backdrop, 'click', this.close);
		      } else {
		        if (this._clickEvent) this._clickEvent.remove();
		        backdrop = document.querySelector('.aside-backdrop');
		        try {
		          backdrop.className = 'aside-backdrop';
		          body.classList.remove('modal-open');
		          body.style.paddingRight = '0';
		          body.removeChild(backdrop);
		        } catch (e) {}
		      }
		    }
		  },
		  methods: {
		    close: function close() {
		      this.show = false;
		    }
		  }
		};
		// </script>
	
		// <style>
		//   .aside-open {
		//     transition: transform 0.3s;
		//   }
		//   .aside-open.has-push-right {
		//     transform: translateX(-300px);
		//   }
		//   .aside {
		//       position: fixed;
		//       top: 0;
		//       bottom: 0;
		//       z-index: 1049;
		//       overflow: auto;
		//       background: #fff;
		//   }
		//   .aside.left {
		//     left: 0;
		//     right: auto;
		//   }
		//   .aside.right {
		//     left: auto;
		//     right: 0;
		//   }
	
		//   .slideleft-enter {
		//     animation:slideleft-in .3s;
		//   }
		//   .slideleft-leave {
		//     animation:slideleft-out .3s;
		//   }
		//   @keyframes slideleft-in {
		//     0% {
		//       transform: translateX(-100%);
		//       opacity: 0;
		//     }
		//     100% {
		//       transform: translateX(0);
		//       opacity: 1;
		//     }
		//   }
		//   @keyframes slideleft-out {
		//     0% {
		//       transform: translateX(0);
		//       opacity: 1;
		//     }
		//     100% {
		//       transform: translateX(-100%);
		//       opacity: 0;
		//     }
		//   }
		//   .slideright-enter {
		//     animation:slideright-in .3s;
		//   }
		//   .slideright-leave {
		//     animation:slideright-out .3s;
		//   }
		//   @keyframes slideright-in {
		//     0% {
		//       transform: translateX(100%);
		//       opacity: 0;
		//     }
		//     100% {
		//       transform: translateX(0);
		//       opacity: 1;
		//     }
		//   }
		//   @keyframes slideright-out {
		//     0% {
		//       transform: translateX(0);
		//       opacity: 1;
		//     }
		//     100% {
		//       transform: translateX(100%);
		//       opacity: 0;
		//     }
		//   }
	
		//   .aside:focus {
		//       outline: 0
		//   }
	
		//   @media (max-width: 991px) {
		//       .aside {
		//           min-width:240px
		//       }
		//   }
	
		//   .aside.left {
		//       right: auto;
		//       left: 0
		//   }
	
		//   .aside.right {
		//       right: 0;
		//       left: auto
		//   }
	
		//   .aside .aside-dialog .aside-header {
		//       border-bottom: 1px solid #e5e5e5;
		//       min-height: 16.43px;
		//       padding: 6px 15px;
		//       background: #337ab7;
		//       color: #fff
		//   }
	
		//   .aside .aside-dialog .aside-header .close {
		//       margin-right: -8px;
		//       padding: 4px 8px;
		//       color: #fff;
		//       font-size: 25px;
		//       opacity: .8
		//   }
	
		//   .aside .aside-dialog .aside-body {
		//       position: relative;
		//       padding: 15px
		//   }
	
		//   .aside .aside-dialog .aside-footer {
		//       padding: 15px;
		//       text-align: right;
		//       border-top: 1px solid #e5e5e5
		//   }
	
		//   .aside .aside-dialog .aside-footer .btn+.btn {
		//       margin-left: 5px;
		//       margin-bottom: 0
		//   }
	
		//   .aside .aside-dialog .aside-footer .btn-group .btn+.btn {
		//       margin-left: -1px
		//   }
	
		//   .aside .aside-dialog .aside-footer .btn-block+.btn-block {
		//       margin-left: 0
		//   }
	
		//   .aside-backdrop {
		//       position: fixed;
		//       top: 0;
		//       right: 0;
		//       bottom: 0;
		//       left: 0;
		//       z-index: 1040;
		//       opacity: 0;
		//       transition: opacity .3s ease;
		//       background-color: #000
		//   }
	
		//   .aside-backdrop.in {
		//       opacity: .5;
		//       filter: alpha(opacity=50)
		//   }
		// </style>
	
	/***/ },
	/* 89 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		exports.default = function () {
		  if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
		    return 0;
		  }
		  var inner = document.createElement('p');
		  inner.style.width = '100%';
		  inner.style.height = '200px';
		
		  var outer = document.createElement('div');
		  outer.style.position = 'absolute';
		  outer.style.top = '0px';
		  outer.style.left = '0px';
		  outer.style.visibility = 'hidden';
		  outer.style.width = '200px';
		  outer.style.height = '150px';
		  outer.style.overflow = 'hidden';
		  outer.appendChild(inner);
		
		  document.body.appendChild(outer);
		  var w1 = inner.offsetWidth;
		  outer.style.overflow = 'scroll';
		  var w2 = inner.offsetWidth;
		  if (w1 === w2) w2 = outer.clientWidth;
		
		  document.body.removeChild(outer);
		
		  return w1 - w2;
		};
	
	/***/ },
	/* 90 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"aside\"\n    v-bind:style=\"{width:width + 'px'}\"\n    v-bind:class=\"{\n    left:placement === 'left',\n    right:placement === 'right'\n    }\"\n    v-show=\"show\"\n    :transition=\"(this.placement === 'left') ? 'slideleft' : 'slideright'\">\n    <div class=\"aside-dialog\">\n      <div class=\"aside-content\">\n        <div class=\"aside-header\">\n          <button type=\"button\" class=\"close\" @click='close'><span>&times;</span></button>\n          <h4 class=\"aside-title\">{{header}}</h4>\n        </div>\n        <div class=\"aside-body\">\n          <slot></slot>\n        </div>\n      </div>\n    </div>\n  </div>";
	
	/***/ },
	/* 91 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(92)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(93)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkboxGroup.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkboxGroup.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./checkboxGroup.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkboxGroup.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./checkboxGroup.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 92 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <div class="btn-group" data-toggle="buttons">
		//     <slot></slot>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    value: {
		      type: Array,
		      default: function _default() {
		        return [];
		      }
		    },
		    type: {
		      type: String,
		      default: 'default'
		    }
		  }
		};
		// </script>
	
	/***/ },
	/* 93 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"btn-group\" data-toggle=\"buttons\">\n    <slot></slot>\n  </div>";
	
	/***/ },
	/* 94 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(95)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(96)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkboxBtn.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkboxBtn.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./checkboxBtn.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkboxBtn.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./checkboxBtn.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 95 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <label class="btn"
		//   v-bind:class="{
		//     'active':checked,
		//     'btn-success':type == 'success',
		//     'btn-warning':type == 'warning',
		//     'btn-info':type == 'info',
		//     'btn-danger':type == 'danger',
		//     'btn-default':type == 'default',
		//     'btn-primary':type == 'primary'
		//   }">
		
		//     <input type="checkbox" autocomplete="off"
		//     :checked="checked"
		//     @click="handleClick"
		//     />
		
		//     <slot></slot>
		//   </label>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    value: {
		      type: String
		    },
		    checked: {
		      type: Boolean,
		      default: false
		    }
		  },
		  computed: {
		    type: function type() {
		      return this.$parent.type;
		    }
		  },
		  methods: {
		    handleClick: function handleClick() {
		      var parent = this.$parent;
		      var index = parent.value.indexOf(this.value);
		      index === -1 ? parent.value.push(this.value) : parent.value.splice(index, 1);
		      this.checked = !this.checked;
		    }
		  },
		  created: function created() {
		    if (this.checked) this.$parent.value.push(this.value);
		  }
		};
		// </script>
	
	/***/ },
	/* 96 */
	/***/ function(module, exports) {
	
		module.exports = "<label class=\"btn\"\n  v-bind:class=\"{\n    'active':checked,\n    'btn-success':type == 'success',\n    'btn-warning':type == 'warning',\n    'btn-info':type == 'info',\n    'btn-danger':type == 'danger',\n    'btn-default':type == 'default',\n    'btn-primary':type == 'primary'\n  }\">\n\n    <input type=\"checkbox\" autocomplete=\"off\"\n    :checked=\"checked\"\n    @click=\"handleClick\"\n    />\n\n    <slot></slot>\n  </label>";
	
	/***/ },
	/* 97 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(98)
		module.exports = __webpack_require__(100)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(101)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Datepicker.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Datepicker.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Datepicker.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Datepicker.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Datepicker.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 98 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(99);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-663cce78&file=Datepicker.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Datepicker.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-663cce78&file=Datepicker.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Datepicker.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 99 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".datepicker{\n    position: relative;\n    display: inline-block;\n}\n\n.datepicker-popup{\n    position: absolute;\n    border: 1px solid #ccc;\n    border-radius: 5px;\n    background: #fff;\n    margin-top: 2px;\n    z-index: 1000;\n    box-shadow: 0 6px 12px rgba(0,0,0,0.175);\n}\n.datepicker-inner{\n    width: 218px;\n\n}\n.datepicker-body{\n    padding: 10px 10px;\n}\n.datepicker-ctrl p,\n.datepicker-ctrl span,\n.datepicker-body span{\n    display: inline-block;\n    width: 28px;\n    line-height: 28px;\n    height: 28px;\n    border-radius: 4px;\n}\n.datepicker-ctrl p {\n    width: 65%;\n}\n.datepicker-ctrl span {\n  position: absolute;\n}\n.datepicker-body span {\n  text-align: center;\n}\n.datepicker-mouthRange span{\n  width: 48px;\n  height: 50px;\n  line-height: 45px;\n}\n.datepicker-item-disable {\n  background-color: white!important;\n  cursor: not-allowed!important;\n}\n.decadeRange span:first-child,\n.decadeRange span:last-child,\n.datepicker-item-disable,\n.datepicker-item-gray{\n    color: #999;\n}\n\n.datepicker-dateRange-item-active:hover,\n.datepicker-dateRange-item-active {\n    background: rgb(50, 118, 177)!important;\n    color: white!important;\n}\n.datepicker-mouthRange {\n  margin-top: 10px\n}\n.datepicker-mouthRange span,\n.datepicker-ctrl span,\n.datepicker-ctrl p,\n.datepicker-dateRange span {\n  cursor: pointer;\n}\n.datepicker-mouthRange span:hover,\n.datepicker-ctrl p:hover,\n.datepicker-ctrl i:hover,\n.datepicker-dateRange span:hover,\n.datepicker-dateRange-item-hover {\n    background-color : #eeeeee;\n}\n\n.datepicker-weekRange span{\n    font-weight: bold;\n}\n.datepicker-label{\n    background-color: #f8f8f8;\n    font-weight: 700;\n    padding: 7px 0;\n    text-align: center;\n}\n.datepicker-ctrl{\n    position: relative;\n    height: 30px;\n    line-height: 30px;\n    font-weight: bold;\n    text-align: center;\n}\n.month-btn{\n  font-weight: bold;\n  -webkit-user-select:none;\n    -moz-user-select:none;\n    -ms-user-select:none;\n    user-select:none;\n}\n.datepicker-preBtn{\n    left: 2px;\n}\n.datepicker-nextBtn{\n    right: 2px;\n}", ""]);
		
		// exports
	
	
	/***/ },
	/* 100 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _EventListener = __webpack_require__(72);
		
		var _EventListener2 = _interopRequireDefault(_EventListener);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		exports.default = {
		  props: {
		    value: {
		      type: String,
		      twoWay: true
		    },
		    format: {
		      default: 'MMMM/dd/yyyy'
		    },
		    disabledDaysOfWeek: {
		      type: Array,
		      default: function _default() {
		        return [];
		      }
		    },
		    width: {
		      type: String,
		      default: '200px'
		    }
		  },
		  data: function data() {
		    return {
		      weekRange: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		      dateRange: [],
		      decadeRange: [],
		      currDate: new Date(),
		      displayDayView: false,
		      displayMouthView: false,
		      displayYearView: false,
		      mouthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		    };
		  },
		
		  watch: {
		    currDate: function currDate() {
		      this.getDateRange();
		    }
		  },
		  methods: {
		    close: function close() {
		      this.displayDayView = this.displayMouthView = this.displayMouthView = false;
		    },
		    inputClick: function inputClick() {
		      if (this.displayMouthView || this.displayYearView) {
		        this.displayDayView = false;
		      } else {
		        this.displayDayView = !this.displayDayView;
		      }
		    },
		    preNextDecadeClick: function preNextDecadeClick(flag) {
		      var year = this.currDate.getFullYear();
		      var mouths = this.currDate.getMonth();
		      var date = this.currDate.getDate();
		
		      if (flag === 0) {
		        this.currDate = new Date(year - 10, mouths, date);
		      } else {
		        this.currDate = new Date(year + 10, mouths, date);
		      }
		    },
		    preNextMonthClick: function preNextMonthClick(flag) {
		      var year = this.currDate.getFullYear();
		      var month = this.currDate.getMonth();
		      var date = this.currDate.getDate();
		
		      if (flag === 0) {
		        var preMonth = this.getYearMonth(year, month - 1);
		        this.currDate = new Date(preMonth.year, preMonth.month, date);
		      } else {
		        var nextMonth = this.getYearMonth(year, month + 1);
		        this.currDate = new Date(nextMonth.year, nextMonth.month, date);
		      }
		    },
		    preNextYearClick: function preNextYearClick(flag) {
		      var year = this.currDate.getFullYear();
		      var mouths = this.currDate.getMonth();
		      var date = this.currDate.getDate();
		
		      if (flag === 0) {
		        this.currDate = new Date(year - 1, mouths, date);
		      } else {
		        this.currDate = new Date(year + 1, mouths, date);
		      }
		    },
		    yearSelect: function yearSelect(year) {
		      this.displayYearView = false;
		      this.displayMouthView = true;
		      this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate());
		    },
		    daySelect: function daySelect(date, el) {
		      if (el.$el.classList[0] === 'datepicker-item-disable') {
		        return false;
		      } else {
		        this.currDate = date;
		        this.value = this.stringify(this.currDate);
		        this.displayDayView = false;
		      }
		    },
		    switchMouthView: function switchMouthView() {
		      this.displayDayView = false;
		      this.displayMouthView = true;
		    },
		    switchDecadeView: function switchDecadeView() {
		      this.displayMouthView = false;
		      this.displayYearView = true;
		    },
		    mouthSelect: function mouthSelect(index) {
		      this.displayMouthView = false;
		      this.displayDayView = true;
		      this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate());
		    },
		    getYearMonth: function getYearMonth(year, month) {
		      if (month > 11) {
		        year++;
		        month = 0;
		      } else if (month < 0) {
		        year--;
		        month = 11;
		      }
		      return { year: year, month: month };
		    },
		    stringifyDecadeHeader: function stringifyDecadeHeader(date) {
		      var yearStr = date.getFullYear().toString();
		      var firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0;
		      var lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10;
		      return firstYearOfDecade + '-' + lastYearOfDecade;
		    },
		    stringifyDayHeader: function stringifyDayHeader(date) {
		      return this.mouthNames[date.getMonth()] + ' ' + date.getFullYear();
		    },
		    parseMouth: function parseMouth(date) {
		      return this.mouthNames[date.getMonth()];
		    },
		    stringifyYearHeader: function stringifyYearHeader(date) {
		      return date.getFullYear();
		    },
		    stringify: function stringify(date) {
		      var format = arguments.length <= 1 || arguments[1] === undefined ? this.format : arguments[1];
		
		      var year = date.getFullYear();
		      var month = date.getMonth() + 1;
		      var day = date.getDate();
		      var mouthName = this.parseMouth(date);
		
		      return format.replace(/yyyy/g, year).replace(/MMMM/g, mouthName).replace(/MMM/g, mouthName.substring(0, 3)).replace(/MM/g, ('0' + month).slice(-2)).replace(/dd/g, ('0' + day).slice(-2)).replace(/yy/g, year).replace(/M(?!a)/g, month).replace(/d/g, day);
		    },
		    parse: function parse(str) {
		      var date = new Date(str);
		      return isNaN(date.getFullYear()) ? null : date;
		    },
		    getDayCount: function getDayCount(year, month) {
		      var dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		
		      if (month === 1) {
		        if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
		          return 29;
		        }
		        return 28;
		      }
		
		      return dict[month];
		    },
		    getDateRange: function getDateRange() {
		      var _this = this;
		
		      this.dateRange = [];
		      this.decadeRange = [];
		      var time = {
		        year: this.currDate.getFullYear(),
		        month: this.currDate.getMonth(),
		        day: this.currDate.getDate()
		      };
		      var yearStr = time.year.toString();
		      var firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0 - 1;
		      for (var i = 0; i < 12; i++) {
		        this.decadeRange.push({
		          text: firstYearOfDecade + i
		        });
		      }
		
		      var currMonthFirstDay = new Date(time.year, time.month, 1);
		      var firstDayWeek = currMonthFirstDay.getDay() + 1;
		      if (firstDayWeek === 0) {
		        firstDayWeek = 7;
		      }
		      var dayCount = this.getDayCount(time.year, time.month);
		      if (firstDayWeek > 1) {
		        var preMonth = this.getYearMonth(time.year, time.month - 1);
		        var prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month);
		        for (var i = 1; i < firstDayWeek; i++) {
		          var dayText = prevMonthDayCount - firstDayWeek + i + 1;
		          this.dateRange.push({
		            text: dayText,
		            date: new Date(preMonth.year, preMonth.month, dayText),
		            sclass: 'datepicker-item-gray'
		          });
		        }
		      }
		
		      var _loop = function _loop(i) {
		        var date = new Date(time.year, time.month, i);
		        var week = date.getDay();
		        var sclass = '';
		        _this.disabledDaysOfWeek.forEach(function (el) {
		          if (week === parseInt(el, 10)) sclass = 'datepicker-item-disable';
		        });
		
		        if (i === time.day) {
		          if (_this.value) {
		            var valueDate = _this.parse(_this.value);
		            if (valueDate) {
		              if (valueDate.getFullYear() === time.year && valueDate.getMonth() === time.month) {
		                sclass = 'datepicker-dateRange-item-active';
		              }
		            }
		          }
		        }
		        _this.dateRange.push({
		          text: i,
		          date: date,
		          sclass: sclass
		        });
		      };
		
		      for (var i = 1; i <= dayCount; i++) {
		        _loop(i);
		      }
		
		      if (this.dateRange.length < 42) {
		        var nextMonthNeed = 42 - this.dateRange.length;
		        var nextMonth = this.getYearMonth(time.year, time.month + 1);
		
		        for (var i = 1; i <= nextMonthNeed; i++) {
		          this.dateRange.push({
		            text: i,
		            date: new Date(nextMonth.year, nextMonth.month, i),
		            sclass: 'datepicker-item-gray'
		          });
		        }
		      }
		    }
		  },
		  ready: function ready() {
		    var _this2 = this;
		
		    this.$dispatch('child-created', this);
		    this.currDate = this.parse(this.value) || this.parse(new Date());
		    this._closeEvent = _EventListener2.default.listen(window, 'click', function (e) {
		      if (!_this2.$el.contains(e.target)) _this2.close();
		    });
		  },
		  beforeDestroy: function beforeDestroy() {
		    if (this._closeEvent) this._closeEvent.remove();
		  }
		};
		// </script>
	
		// <style>
		// .datepicker{
		//     position: relative;
		//     display: inline-block;
		// }
	
		// .datepicker-popup{
		//     position: absolute;
		//     border: 1px solid #ccc;
		//     border-radius: 5px;
		//     background: #fff;
		//     margin-top: 2px;
		//     z-index: 1000;
		//     box-shadow: 0 6px 12px rgba(0,0,0,0.175);
		// }
		// .datepicker-inner{
		//     width: 218px;
	
		// }
		// .datepicker-body{
		//     padding: 10px 10px;
		// }
		// .datepicker-ctrl p,
		// .datepicker-ctrl span,
		// .datepicker-body span{
		//     display: inline-block;
		//     width: 28px;
		//     line-height: 28px;
		//     height: 28px;
		//     border-radius: 4px;
		// }
		// .datepicker-ctrl p {
		//     width: 65%;
		// }
		// .datepicker-ctrl span {
		//   position: absolute;
		// }
		// .datepicker-body span {
		//   text-align: center;
		// }
		// .datepicker-mouthRange span{
		//   width: 48px;
		//   height: 50px;
		//   line-height: 45px;
		// }
		// .datepicker-item-disable {
		//   background-color: white!important;
		//   cursor: not-allowed!important;
		// }
		// .decadeRange span:first-child,
		// .decadeRange span:last-child,
		// .datepicker-item-disable,
		// .datepicker-item-gray{
		//     color: #999;
		// }
	
		// .datepicker-dateRange-item-active:hover,
		// .datepicker-dateRange-item-active {
		//     background: rgb(50, 118, 177)!important;
		//     color: white!important;
		// }
		// .datepicker-mouthRange {
		//   margin-top: 10px
		// }
		// .datepicker-mouthRange span,
		// .datepicker-ctrl span,
		// .datepicker-ctrl p,
		// .datepicker-dateRange span {
		//   cursor: pointer;
		// }
		// .datepicker-mouthRange span:hover,
		// .datepicker-ctrl p:hover,
		// .datepicker-ctrl i:hover,
		// .datepicker-dateRange span:hover,
		// .datepicker-dateRange-item-hover {
		//     background-color : #eeeeee;
		// }
	
		// .datepicker-weekRange span{
		//     font-weight: bold;
		// }
		// .datepicker-label{
		//     background-color: #f8f8f8;
		//     font-weight: 700;
		//     padding: 7px 0;
		//     text-align: center;
		// }
		// .datepicker-ctrl{
		//     position: relative;
		//     height: 30px;
		//     line-height: 30px;
		//     font-weight: bold;
		//     text-align: center;
		// }
		// .month-btn{
		//   font-weight: bold;
		//   -webkit-user-select:none;
		//     -moz-user-select:none;
		//     -ms-user-select:none;
		//     user-select:none;
		// }
		// .datepicker-preBtn{
		//     left: 2px;
		// }
		// .datepicker-nextBtn{
		//     right: 2px;
		// }
		// </style>
		// <template>
		//   <div class="datepicker">
		//     <input class="form-control datepicker-input" type="text"
		//     v-bind:style="{width:width}"
		//     @click="inputClick"
		//     v-model="value"/>
		//       <div class="datepicker-popup" v-show="displayDayView">
		//           <div class="datepicker-inner">
		//               <div class="datepicker-body">
		//                   <div class="datepicker-ctrl">
		//                       <span class="month-btn datepicker-preBtn" @click="preNextMonthClick(0)">&lt;</span>
		//                       <span class="month-btn datepicker-nextBtn" @click="preNextMonthClick(1)">&gt;</span>
		//                       <p @click="switchMouthView">
		//                       {{stringifyDayHeader(currDate)}}
		//                       </p>
		//                   </div>
		//                   <div class="datepicker-weekRange">
		//                       <span v-for="w in weekRange">{{w}}</span>
		//                   </div>
		//                   <div class="datepicker-dateRange">
		//                       <span v-for="d in dateRange" v-bind:class="d.sclass" @click="daySelect(d.date,this)">{{d.text}}</span>
		//                   </div>
		//               </div>
		//           </div>
		//       </div>
		//       <div class="datepicker-popup" v-show="displayMouthView">
		//         <div class="datepicker-inner">
		//             <div class="datepicker-body">
		//                 <div class="datepicker-ctrl">
		//                     <span class="month-btn datepicker-preBtn" @click="preNextYearClick(0)">&lt;</span>
		//                     <span class="month-btn datepicker-nextBtn" @click="preNextYearClick(1)">&gt;</span>
		//                     <p @click="switchDecadeView">
		//                     {{stringifyYearHeader(currDate)}}
		//                     </p>
		//                 </div>
		//                 <div class="datepicker-mouthRange">
		//                 	<template v-for="m in mouthNames">
		// 	                    <span   v-bind:class="{'datepicker-dateRange-item-active':
		// 			                    (this.mouthNames[this.parse(this.value).getMonth()]  === m) &&
		// 			                    this.currDate.getFullYear() === this.parse(this.value).getFullYear()}"
		// 			                    @click="mouthSelect($index)"
		// 	                    >
		// 	                      {{m.substr(0,3)}}
		// 	                    </span>
		//                     </template>
		//                 </div>
		//             </div>
		//         </div>
		//       </div>
		//       <div class="datepicker-popup" v-show="displayYearView">
		//         <div class="datepicker-inner">
		//             <div class="datepicker-body">
		//                 <div class="datepicker-ctrl">
		//                     <span class="month-btn datepicker-preBtn" @click="preNextDecadeClick(0)">&lt;</span>
		//                     <span class="month-btn datepicker-nextBtn" @click="preNextDecadeClick(1)">&gt;</span>
		//                     <p>
		//                     {{stringifyDecadeHeader(currDate)}}
		//                     </p>
		//                 </div>
		//                 <div class="datepicker-mouthRange decadeRange">
		//                 	<template v-for="decade in decadeRange">
		//                 		<span v-bind:class="{'datepicker-dateRange-item-active':
		// 		                    this.parse(this.value).getFullYear() === decade.text}"
		// 	                    @click.stop="yearSelect(decade.text)">
		// 	                      {{decade.text}}
		// 	                    </span>
		// 					</template>
		//                 </div>
		//             </div>
		//         </div>
		//       </div>
		// </div>
		// </template>
	
		// <script>
	
	/***/ },
	/* 101 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"datepicker\">\n    <input class=\"form-control datepicker-input\" type=\"text\"\n    v-bind:style=\"{width:width}\"\n    @click=\"inputClick\"\n    v-model=\"value\"/>\n      <div class=\"datepicker-popup\" v-show=\"displayDayView\">\n          <div class=\"datepicker-inner\">\n              <div class=\"datepicker-body\">\n                  <div class=\"datepicker-ctrl\">\n                      <span class=\"month-btn datepicker-preBtn\" @click=\"preNextMonthClick(0)\">&lt;</span>\n                      <span class=\"month-btn datepicker-nextBtn\" @click=\"preNextMonthClick(1)\">&gt;</span>\n                      <p @click=\"switchMouthView\">\n                      {{stringifyDayHeader(currDate)}}\n                      </p>\n                  </div>\n                  <div class=\"datepicker-weekRange\">\n                      <span v-for=\"w in weekRange\">{{w}}</span>\n                  </div>\n                  <div class=\"datepicker-dateRange\">\n                      <span v-for=\"d in dateRange\" v-bind:class=\"d.sclass\" @click=\"daySelect(d.date,this)\">{{d.text}}</span>\n                  </div>\n              </div>\n          </div>\n      </div>\n      <div class=\"datepicker-popup\" v-show=\"displayMouthView\">\n        <div class=\"datepicker-inner\">\n            <div class=\"datepicker-body\">\n                <div class=\"datepicker-ctrl\">\n                    <span class=\"month-btn datepicker-preBtn\" @click=\"preNextYearClick(0)\">&lt;</span>\n                    <span class=\"month-btn datepicker-nextBtn\" @click=\"preNextYearClick(1)\">&gt;</span>\n                    <p @click=\"switchDecadeView\">\n                    {{stringifyYearHeader(currDate)}}\n                    </p>\n                </div>\n                <div class=\"datepicker-mouthRange\">\n                \t<template v-for=\"m in mouthNames\">\n\t                    <span   v-bind:class=\"{'datepicker-dateRange-item-active':\n\t\t\t                    (this.mouthNames[this.parse(this.value).getMonth()]  === m) &&\n\t\t\t                    this.currDate.getFullYear() === this.parse(this.value).getFullYear()}\"\n\t\t\t                    @click=\"mouthSelect($index)\"\n\t                    >\n\t                      {{m.substr(0,3)}}\n\t                    </span>\n                    </template>\n                </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"datepicker-popup\" v-show=\"displayYearView\">\n        <div class=\"datepicker-inner\">\n            <div class=\"datepicker-body\">\n                <div class=\"datepicker-ctrl\">\n                    <span class=\"month-btn datepicker-preBtn\" @click=\"preNextDecadeClick(0)\">&lt;</span>\n                    <span class=\"month-btn datepicker-nextBtn\" @click=\"preNextDecadeClick(1)\">&gt;</span>\n                    <p>\n                    {{stringifyDecadeHeader(currDate)}}\n                    </p>\n                </div>\n                <div class=\"datepicker-mouthRange decadeRange\">\n                \t<template v-for=\"decade in decadeRange\">\n                \t\t<span v-bind:class=\"{'datepicker-dateRange-item-active':\n\t\t                    this.parse(this.value).getFullYear() === decade.text}\"\n\t                    @click.stop=\"yearSelect(decade.text)\">\n\t                      {{decade.text}}\n\t                    </span>\n\t\t\t\t\t</template>\n                </div>\n            </div>\n        </div>\n      </div>\n</div>";
	
	/***/ },
	/* 102 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(103)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(104)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Dropdown.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Dropdown.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Dropdown.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Dropdown.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Dropdown.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 103 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _EventListener = __webpack_require__(72);
		
		var _EventListener2 = _interopRequireDefault(_EventListener);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		exports.default = {
		  methods: {
		    toggleDropdown: function toggleDropdown(e) {
		      e.preventDefault();
		      this.$el.classList.toggle('open');
		    }
		  },
		  ready: function ready() {
		    var el = this.$el;
		    var toggle = el.querySelector('[data-toggle="dropdown"]');
		    if (toggle) {
		      toggle.style.borderRadius = '4px';
		      toggle.addEventListener('click', this.toggleDropdown);
		    }
		    this._closeEvent = _EventListener2.default.listen(window, 'click', function (e) {
		      if (!el.contains(e.target)) el.classList.remove('open');
		    });
		  },
		  beforeDestroy: function beforeDestroy() {
		    if (this._closeEvent) this._closeEvent.remove();
		  }
		};
		// </script>
		// <template>
		//   <div class="btn-group">
		//     <slot></slot>
		//     <slot name="dropdown-menu"></slot>
		//   </div>
		// </template>
		// <script>
	
	/***/ },
	/* 104 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"btn-group\">\n    <slot></slot>\n    <slot name=\"dropdown-menu\"></slot>\n  </div>";
	
	/***/ },
	/* 105 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(106)
		module.exports = __webpack_require__(108)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(113)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Modal.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Modal.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Modal.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Modal.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Modal.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 106 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(107);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-72392c21&file=Modal.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Modal.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-72392c21&file=Modal.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Modal.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 107 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".modal {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n.modal.in {\n  background-color: rgba(0,0,0,0.5);\n}\n.modal.zoom .modal-dialog {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    top: 300px;\n    opacity: 0;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n}\n.modal.zoom.in .modal-dialog {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    -webkit-transform: translate3d(0, -300px, 0);\n    transform: translate3d(0, -300px, 0);\n    opacity: 1;\n}", ""]);
		
		// exports
	
	
	/***/ },
	/* 108 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _isInteger = __webpack_require__(109);
		
		var _isInteger2 = _interopRequireDefault(_isInteger);
		
		var _getScrollBarWidth = __webpack_require__(89);
		
		var _getScrollBarWidth2 = _interopRequireDefault(_getScrollBarWidth);
		
		var _EventListener = __webpack_require__(72);
		
		var _EventListener2 = _interopRequireDefault(_EventListener);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		// <template>
		//   <div role="dialog"
		//     v-bind:class="{
		//     'modal':true,
		//     'fade':effect === 'fade',
		//     'zoom':effect === 'zoom'
		//     }"
		//     >
		//     <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document"
		//       v-bind:style="{width: optionalWidth}">
		//       <div class="modal-content">
		//         <slot name="modal-header">
		//           <div class="modal-header">
		//             <button type="button" class="close" @click="close"><span>&times;</span></button>
		//             <h4 class="modal-title" >{{title}}</h4>
		//           </div>
		//         </slot>
		//         <slot name="modal-body">
		//           <div class="modal-body"></div>
		//         </slot>
		//         <slot name="modal-footer">
		//           <div class="modal-footer">
		//             <button type="button" class="btn btn-default" @click="close">Close</button>
		//             <button type="button" class="btn btn-primary" @click="callback">Save changes</button>
		//           </div>
		//         </slot>
		//       </div>
		//     </div>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    title: {
		      type: String,
		      default: ''
		    },
		    show: {
		      require: true,
		      type: Boolean,
		      twoWay: true
		    },
		    width: {
		      default: null
		    },
		    callback: {
		      type: Function,
		      default: function _default() {}
		    },
		    effect: {
		      type: String,
		      default: null
		    },
		    backdrop: {
		      type: Boolean,
		      default: true
		    },
		    large: {
		      type: Boolean,
		      default: false
		    },
		    small: {
		      type: Boolean,
		      default: false
		    }
		  },
		  ready: function ready() {
		    var _this = this;
		
		    this.$watch('show', function (val) {
		      var el = _this.$el;
		      var body = document.body;
		      var scrollBarWidth = (0, _getScrollBarWidth2.default)();
		      if (val) {
		        el.querySelector('.modal-content').focus();
		        el.style.display = 'block';
		        setTimeout(function () {
		          return el.classList.add('in');
		        }, 0);
		        body.classList.add('modal-open');
		        if (scrollBarWidth !== 0) {
		          body.style.paddingRight = scrollBarWidth + 'px';
		        }
		        if (_this.backdrop) {
		          _this._blurModalContentEvent = _EventListener2.default.listen(_this.$el, 'click', function (e) {
		            if (e.target === el) _this.show = false;
		          });
		        }
		      } else {
		        if (_this._blurModalContentEvent) _this._blurModalContentEvent.remove();
		        el.classList.remove('in');
		        setTimeout(function () {
		          el.style.display = 'none';
		          body.classList.remove('modal-open');
		          body.style.paddingRight = '0';
		        }, 300);
		      }
		    }, { immediate: true });
		  },
		
		  computed: {
		    optionalWidth: function optionalWidth() {
		      if (this.width === null) {
		        return null;
		      } else if ((0, _isInteger2.default)(this.width)) {
		        return this.width + "px";
		      }
		      return this.width;
		    }
		  },
		  methods: {
		    close: function close() {
		      this.show = false;
		    }
		  }
		};
		// </script>
		// <style>
		// .modal {
		//   transition: all 0.3s ease;
		// }
		// .modal.in {
		//   background-color: rgba(0,0,0,0.5);
		// }
		// .modal.zoom .modal-dialog {
		//     -webkit-transform: scale(0.1);
		//     -moz-transform: scale(0.1);
		//     -ms-transform: scale(0.1);
		//     transform: scale(0.1);
		//     top: 300px;
		//     opacity: 0;
		//     -webkit-transition: all 0.3s;
		//     -moz-transition: all 0.3s;
		//     transition: all 0.3s;
		// }
		// .modal.zoom.in .modal-dialog {
		//     -webkit-transform: scale(1);
		//     -moz-transform: scale(1);
		//     -ms-transform: scale(1);
		//     transform: scale(1);
		//     -webkit-transform: translate3d(0, -300px, 0);
		//     transform: translate3d(0, -300px, 0);
		//     opacity: 1;
		// }
		// </style>
	
	/***/ },
	/* 109 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(110), __esModule: true };
	
	/***/ },
	/* 110 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(111);
		module.exports = __webpack_require__(45).Number.isInteger;
	
	/***/ },
	/* 111 */
	/***/ function(module, exports, __webpack_require__) {
	
		// 20.1.2.3 Number.isInteger(number)
		var $export = __webpack_require__(43);
		
		$export($export.S, 'Number', {isInteger: __webpack_require__(112)});
	
	/***/ },
	/* 112 */
	/***/ function(module, exports, __webpack_require__) {
	
		// 20.1.2.3 Number.isInteger(number)
		var isObject = __webpack_require__(65)
		  , floor    = Math.floor;
		module.exports = function isInteger(it){
		  return !isObject(it) && isFinite(it) && floor(it) === it;
		};
	
	/***/ },
	/* 113 */
	/***/ function(module, exports) {
	
		module.exports = "<div role=\"dialog\"\n    v-bind:class=\"{\n    'modal':true,\n    'fade':effect === 'fade',\n    'zoom':effect === 'zoom'\n    }\"\n    >\n    <div v-bind:class=\"{'modal-dialog':true,'modal-lg':large,'modal-sm':small}\" role=\"document\"\n      v-bind:style=\"{width: optionalWidth}\">\n      <div class=\"modal-content\">\n        <slot name=\"modal-header\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" @click=\"close\"><span>&times;</span></button>\n            <h4 class=\"modal-title\" >{{title}}</h4>\n          </div>\n        </slot>\n        <slot name=\"modal-body\">\n          <div class=\"modal-body\"></div>\n        </slot>\n        <slot name=\"modal-footer\">\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" @click=\"close\">Close</button>\n            <button type=\"button\" class=\"btn btn-primary\" @click=\"callback\">Save changes</button>\n          </div>\n        </slot>\n      </div>\n    </div>\n  </div>";
	
	/***/ },
	/* 114 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(115)
		module.exports = __webpack_require__(117)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(118)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Option.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Option.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Option.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Option.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Option.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 115 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(116);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7f8c06b1&file=Option.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Option.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7f8c06b1&file=Option.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Option.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 116 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, "a span.check-mark {\n    position: absolute;\n    display: inline-block;\n    right: 15px;\n    margin-top: 5px;\n  }", ""]);
		
		// exports
	
	
	/***/ },
	/* 117 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <li style="position:relative">
		//     <a @mousedown.prevent="handleClick" style="cursor:pointer">
		//       <span v-el:v><slot></slot></span>
		//       <span class="glyphicon glyphicon-ok check-mark" v-show="chosen"></span>
		//     </a>
		//   </li>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    value: {
		      type: String
		    }
		  },
		  data: function data() {
		    return {
		      chosen: false
		    };
		  },
		
		  computed: {
		    chosen: function chosen() {
		      if (this.$parent.multiple) {
		        return this.$parent.value.indexOf(this.value) !== -1 ? true : false;
		      }
		      return this.$parent.value == this.value;
		    }
		  },
		  methods: {
		    handleClick: function handleClick() {
		      var parent = this.$parent;
		      if (parent.multiple) {
		        var index = parent.value.indexOf(this.value);
		        index === -1 ? parent.value.push(this.value) : parent.value.splice(index, 1);
		      } else {
		        parent.value = this.value;
		        parent.show = false;
		      }
		    }
		  }
		};
		// </script>
	
		// <style>
		//   a span.check-mark {
		//     position: absolute;
		//     display: inline-block;
		//     right: 15px;
		//     margin-top: 5px;
		//   }
		// </style>
	
	/***/ },
	/* 118 */
	/***/ function(module, exports) {
	
		module.exports = "<li style=\"position:relative\">\n    <a @mousedown.prevent=\"handleClick\" style=\"cursor:pointer\">\n      <span v-el:v><slot></slot></span>\n      <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"chosen\"></span>\n    </a>\n  </li>";
	
	/***/ },
	/* 119 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(120)
		module.exports = __webpack_require__(122)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(123)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Panel.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Panel.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Panel.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Panel.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Panel.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 120 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(121);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cef09010&file=Panel.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Panel.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cef09010&file=Panel.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Panel.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 121 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".accordion-toggle {\n  cursor: pointer;\n}\n\n.collapse-transition {\n-webkit-transition: max-height .5s ease;\ntransition: max-height .5s ease;\noverflow: hidden;\n}\n\n.collapse-enter, .collapse-leave {\n  max-height: 0!important;\n}", ""]);
		
		// exports
	
	
	/***/ },
	/* 122 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		// <div class="panel panel-default">
		//     <div class="panel-heading">
		//       <h4 class="panel-title">
		//         <a class="accordion-toggle"
		//           @click="toggleIsOpen()">
		//            {{ header }}
		//         </a>
		//       </h4>
		//     </div>
		//     <div class="panel-collapse"
		//       v-el:panel
		//       v-show="isOpen"
		//       transition="collapse"
		//     >
		//       <div class="panel-body">
		//         <slot></slot>
		//       </div>
		//     </div>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    isOpen: {
		      type: Boolean,
		      default: false
		    },
		    header: {
		      type: String
		    }
		  },
		  data: function data() {
		    return {
		      height: 0
		    };
		  },
		
		  methods: {
		    toggleIsOpen: function toggleIsOpen() {
		      this.isOpen = !this.isOpen;
		      this.$dispatch('isOpenEvent', this);
		    }
		  },
		  ready: function ready() {
		    var panel = this.$els.panel;
		    panel.style.display = 'block';
		    this.height = panel.offsetHeight;
		    panel.style.maxHeight = this.height + 'px';
		    if (!this.isOpen) panel.style.display = 'none';
		  }
		};
		// </script>
	
		// <style>
		// .accordion-toggle {
		//   cursor: pointer;
		// }
	
		// .collapse-transition {
		// transition: max-height .5s ease;
		// overflow: hidden;
		// }
	
		// .collapse-enter, .collapse-leave {
		//   max-height: 0!important;
		// }
	
		// </style>
	
	/***/ },
	/* 123 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h4 class=\"panel-title\">\n        <a class=\"accordion-toggle\"\n          @click=\"toggleIsOpen()\">\n           {{ header }}\n        </a>\n      </h4>\n    </div>\n    <div class=\"panel-collapse\"\n      v-el:panel\n      v-show=\"isOpen\"\n      transition=\"collapse\"\n    >\n      <div class=\"panel-body\">\n        <slot></slot>\n      </div>\n    </div>\n  </div>";
	
	/***/ },
	/* 124 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(125)
		module.exports = __webpack_require__(127)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(129)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Popover.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Popover.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Popover.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Popover.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Popover.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 125 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(126);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-d15a25ce&file=Popover.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Popover.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-d15a25ce&file=Popover.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Popover.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 126 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".scale-transition,\n.fade-transition {\n  display: block;\n}\n.scale-enter {\n  -webkit-animation:scale-in 0.15s ease-in;\n          animation:scale-in 0.15s ease-in;\n}\n.scale-leave {\n  -webkit-animation:scale-out 0.15s ease-out;\n          animation:scale-out 0.15s ease-out;\n}\n@-webkit-keyframes scale-in {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes scale-in {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes scale-out {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n}\n@keyframes scale-out {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n}", ""]);
		
		// exports
	
	
	/***/ },
	/* 127 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _popoverMixins = __webpack_require__(128);
		
		var _popoverMixins2 = _interopRequireDefault(_popoverMixins);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		exports.default = {
		  mixins: [_popoverMixins2.default]
		};
		// </script>
		// <style>
		// .scale-transition,
		// .fade-transition {
		//   display: block;
		// }
		// .scale-enter {
		//   animation:scale-in 0.15s ease-in;
		// }
		// .scale-leave {
		//   animation:scale-out 0.15s ease-out;
		// }
		// @keyframes scale-in {
		//   0% {
		//     transform: scale(0);
		//     opacity: 0;
		//   }
		//   100% {
		//     transform: scale(1);
		//     opacity: 1;
		//   }
		// }
		// @keyframes scale-out {
		//   0% {
		//     transform: scale(1);
		//     opacity: 1;
		//   }
		//   100% {
		//     transform: scale(0);
		//     opacity: 0;
		//   }
		// }
	
		// </style>
		// <template>
		//   <span v-el:trigger>
		//     <slot>
		//     </slot>
		//   </span>
		//   <div class="popover"
		//     v-bind:class="{
		//     'top':placement === 'top',
		//     'left':placement === 'left',
		//     'right':placement === 'right',
		//     'bottom':placement === 'bottom'
		//     }"
		//     v-el:popover
		//     v-show="show"
		//     :transition="effect">
		//       <div class="arrow"></div>
		//       <h3 class="popover-title" v-show="title">{{title}}</h3>
		//       <div class="popover-content">
		//         {{{content}}}
		//       </div>
		//   </div>
		// </template>
	
		// <script>
	
	/***/ },
	/* 128 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _EventListener = __webpack_require__(72);
		
		var _EventListener2 = _interopRequireDefault(_EventListener);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var PopoverMixin = {
		  props: {
		    trigger: {
		      type: String,
		      default: 'click'
		    },
		    effect: {
		      type: String,
		      default: 'fadein'
		    },
		    title: {
		      type: String
		    },
		    content: {
		      type: String
		    },
		    header: {
		      type: Boolean,
		      default: true
		    },
		    placement: {
		      type: String
		    }
		  },
		  data: function data() {
		    return {
		      position: {
		        top: 0,
		        left: 0
		      },
		      show: true
		    };
		  },
		
		  methods: {
		    toggle: function toggle() {
		      this.show = !this.show;
		    }
		  },
		  ready: function ready() {
		    var _this = this;
		
		    if (!this.$els.popover) return console.error("Couldn't find popover v-el in your component that uses popoverMixin.");
		    var popover = this.$els.popover;
		    var triger = this.$els.trigger.children[0];
		    if (this.trigger === 'hover') {
		      this._mouseenterEvent = _EventListener2.default.listen(triger, 'mouseenter', function () {
		        return _this.show = true;
		      });
		      this._mouseleaveEvent = _EventListener2.default.listen(triger, 'mouseleave', function () {
		        return _this.show = false;
		      });
		    } else if (this.trigger === 'focus') {
		      this._focusEvent = _EventListener2.default.listen(triger, 'focus', function () {
		        return _this.show = true;
		      });
		      this._blurEvent = _EventListener2.default.listen(triger, 'blur', function () {
		        return _this.show = false;
		      });
		    } else {
		      this._clickEvent = _EventListener2.default.listen(triger, 'click', this.toggle);
		    }
		
		    switch (this.placement) {
		      case 'top':
		        this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2;
		        this.position.top = triger.offsetTop - popover.offsetHeight;
		        break;
		      case 'left':
		        this.position.left = triger.offsetLeft - popover.offsetWidth;
		        this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2;
		        break;
		      case 'right':
		        this.position.left = triger.offsetLeft + triger.offsetWidth;
		        this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2;
		        break;
		      case 'bottom':
		        this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2;
		        this.position.top = triger.offsetTop + triger.offsetHeight;
		        break;
		      default:
		        console.log('Wrong placement prop');
		    }
		    popover.style.top = this.position.top + 'px';
		    popover.style.left = this.position.left + 'px';
		    popover.style.display = 'none';
		    this.show = !this.show;
		  },
		  beforeDestroy: function beforeDestroy() {
		    if (this._blurEvent) {
		      this._blurEvent.remove();
		      this._focusEvent.remove();
		    }
		    if (this._mouseenterEvent) {
		      this._mouseenterEvent.remove();
		      this._mouseleaveEvent.remove();
		    }
		    if (this._clickEvent) this._clickEvent.remove();
		  }
		};
		
		exports.default = PopoverMixin;
	
	/***/ },
	/* 129 */
	/***/ function(module, exports) {
	
		module.exports = "<span v-el:trigger>\n    <slot>\n    </slot>\n  </span>\n  <div class=\"popover\"\n    v-bind:class=\"{\n    'top':placement === 'top',\n    'left':placement === 'left',\n    'right':placement === 'right',\n    'bottom':placement === 'bottom'\n    }\"\n    v-el:popover\n    v-show=\"show\"\n    :transition=\"effect\">\n      <div class=\"arrow\"></div>\n      <h3 class=\"popover-title\" v-show=\"title\">{{title}}</h3>\n      <div class=\"popover-content\">\n        {{{content}}}\n      </div>\n  </div>";
	
	/***/ },
	/* 130 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(131)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(132)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Progressbar.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Progressbar.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Progressbar.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Progressbar.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Progressbar.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 131 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <div role="progressbar"
		//     v-bind:class="{
		//     'progress-bar' : true,
		//     'progress-bar-success':type == 'success',
		//     'progress-bar-warning':type == 'warning',
		//     'progress-bar-info':type == 'info',
		//     'progress-bar-danger':type == 'danger',
		//     'progress-bar-striped':striped,
		//     'active':animated
		//     }"
		//     v-bind:style="{width: now + '%'}">
		//     {{label ? now + '%':'' }}
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    now: {
		      type: Number,
		      require: true
		    },
		    label: {
		      type: Boolean,
		      default: false
		    },
		    type: {
		      type: String
		    },
		    striped: {
		      type: Boolean,
		      default: false
		    },
		    animated: {
		      type: Boolean,
		      default: false
		    }
		  }
		};
		// </script>
	
	/***/ },
	/* 132 */
	/***/ function(module, exports) {
	
		module.exports = "<div role=\"progressbar\"\n    v-bind:class=\"{\n    'progress-bar' : true,\n    'progress-bar-success':type == 'success',\n    'progress-bar-warning':type == 'warning',\n    'progress-bar-info':type == 'info',\n    'progress-bar-danger':type == 'danger',\n    'progress-bar-striped':striped,\n    'active':animated\n    }\"\n    v-bind:style=\"{width: now + '%'}\">\n    {{label ? now + '%':'' }}\n  </div>";
	
	/***/ },
	/* 133 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(134)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(135)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radioBtn.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radioBtn.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./radioBtn.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radioBtn.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./radioBtn.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 134 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <label class="btn"
		//   v-bind:class="{
		//     'active':active,
		//     'btn-success':type == 'success',
		//     'btn-warning':type == 'warning',
		//     'btn-info':type == 'info',
		//     'btn-danger':type == 'danger',
		//     'btn-default':type == 'default',
		//     'btn-primary':type == 'primary'
		//   }">
		
		//     <input type="radio" autocomplete="off"
		//       :checked="checked"
		//       @click="handleClick"
		//     />
		
		//     <slot></slot>
		
		//   </label>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    value: {
		      type: String
		    },
		    checked: {
		      type: Boolean,
		      default: false
		    }
		  },
		  computed: {
		    type: function type() {
		      return this.$parent.type;
		    },
		    active: function active() {
		      return this.$parent.value === this.value;
		    }
		  },
		  methods: {
		    handleClick: function handleClick() {
		      this.$parent.value = this.value;
		    }
		  },
		  created: function created() {
		    if (this.checked) this.$parent.value = this.value;
		  }
		};
		// </script>
	
	/***/ },
	/* 135 */
	/***/ function(module, exports) {
	
		module.exports = "<label class=\"btn\"\n  v-bind:class=\"{\n    'active':active,\n    'btn-success':type == 'success',\n    'btn-warning':type == 'warning',\n    'btn-info':type == 'info',\n    'btn-danger':type == 'danger',\n    'btn-default':type == 'default',\n    'btn-primary':type == 'primary'\n  }\">\n\n    <input type=\"radio\" autocomplete=\"off\"\n      :checked=\"checked\"\n      @click=\"handleClick\"\n    />\n\n    <slot></slot>\n\n  </label>";
	
	/***/ },
	/* 136 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(137)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(138)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radioGroup.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radioGroup.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./radioGroup.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radioGroup.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./radioGroup.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 137 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <div class="btn-group" data-toggle="buttons">
		//     <slot></slot>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    value: {
		      type: String,
		      twoWay: true
		    },
		    type: {
		      type: String,
		      default: 'default'
		    }
		  }
		};
		// </script>
	
	/***/ },
	/* 138 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"btn-group\" data-toggle=\"buttons\">\n    <slot></slot>\n  </div>";
	
	/***/ },
	/* 139 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(140)
		module.exports = __webpack_require__(142)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(152)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Select.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Select.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Select.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Select.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Select.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 140 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(141);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6a0dd090&file=Select.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Select.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6a0dd090&file=Select.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Select.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 141 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".bs_searchbox {\n  padding: 4px 8px;\n}\n.btn-group .dropdown-menu .notify {\n  position: absolute;\n  bottom: 5px;\n  width: 96%;\n  margin: 0 2%;\n  min-height: 26px;\n  padding: 3px 5px;\n  background: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);\n   pointer-events: none;\n  opacity: .9;\n}", ""]);
		
		// exports
	
	
	/***/ },
	/* 142 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _getIterator2 = __webpack_require__(143);
		
		var _getIterator3 = _interopRequireDefault(_getIterator2);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		// <template>
		//   <div class="btn-group" v-bind:class="{open:show}">
		//     <button v-el:btn type="button" class="btn btn-default dropdown-toggle"
		//       @click="toggleDropdown"
		//       @blur="show = (search ? show:false)"
		//     >
		//       <span class="placeholder" v-show="showPlaceholder">{{placeholder}}</span>
		//       <span class="content">{{ selectedItems }}</span>
		//       <span class="caret"></span>
		//     </button>
		//     <ul class="dropdown-menu">
		//       <template v-if="options.length">
		//         <li v-if="search" class="bs-searchbox">
		//           <input type="text" placeholder="Search" v-model="searchText" class="form-control" autocomplete="off">
		//         </li>
		//         <li v-for="option in options | filterBy searchText " v-bind:id="option.value" style="position:relative">
		//           <a @mousedown.prevent="select(option.value)" style="cursor:pointer">
		//             {{ option.label }}
		//             <span class="glyphicon glyphicon-ok check-mark" v-show="value.indexOf(option.value) !== -1"></span>
		//           </a>
		//         </li>
		//       </template>
		//       <slot v-else></slot>
		//       <div class="notify" v-show="showNotify" transition="fadein">Limit reached ({{limit}} items max).</div>
		//     </ul>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    options: {
		      type: Array,
		      default: function _default() {
		        return [];
		      }
		    },
		    value: {
		      twoWay: true
		    },
		    placeholder: {
		      type: String,
		      default: 'Nothing Selected'
		    },
		    multiple: {
		      type: Boolean,
		      default: false
		    },
		    search: { // Allow searching (only works when options are provided)
		      type: Boolean,
		      default: false
		    },
		    limit: {
		      type: Number,
		      default: 1024
		    },
		    closeOnSelect: { // only works when multiple==false
		      type: Boolean,
		      default: false
		    }
		  },
		  ready: function ready() {
		    if (this.multiple) {
		      this.value = [];
		    }
		  },
		  data: function data() {
		    return {
		      searchText: null,
		      show: false,
		      showNotify: false
		    };
		  },
		
		  computed: {
		    selectedItems: function selectedItems() {
		      if (!this.multiple) {
		        if (!this.options.length) {
		          var _iteratorNormalCompletion = true;
		          var _didIteratorError = false;
		          var _iteratorError = undefined;
		
		          try {
		            for (var _iterator = (0, _getIterator3.default)(this.$children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		              var c = _step.value;
		
		              if (c.value == this.value) {
		                return c.$els.v.innerText;
		              }
		            }
		          } catch (err) {
		            _didIteratorError = true;
		            _iteratorError = err;
		          } finally {
		            try {
		              if (!_iteratorNormalCompletion && _iterator.return) {
		                _iterator.return();
		              }
		            } finally {
		              if (_didIteratorError) {
		                throw _iteratorError;
		              }
		            }
		          }
		        } else {
		          for (var i = 0; i < this.options.length; i++) {
		            if (this.options[i].value === this.value) {
		              return this.options[i].label;
		            }
		          }
		        }
		        return "";
		      } else {
		        if (!this.options.length) {
		          var r = [];
		          var _iteratorNormalCompletion2 = true;
		          var _didIteratorError2 = false;
		          var _iteratorError2 = undefined;
		
		          try {
		            for (var _iterator2 = (0, _getIterator3.default)(this.$children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		              var c = _step2.value;
		
		              if (this.value.indexOf(c.value) !== -1) {
		                r.push(c.$els.v.innerText);
		              }
		            }
		          } catch (err) {
		            _didIteratorError2 = true;
		            _iteratorError2 = err;
		          } finally {
		            try {
		              if (!_iteratorNormalCompletion2 && _iterator2.return) {
		                _iterator2.return();
		              }
		            } finally {
		              if (_didIteratorError2) {
		                throw _iteratorError2;
		              }
		            }
		          }
		
		          return r.join(',');
		        } else {
		          // we were given bunch of options, so pluck them out to display
		          var foundItems = [];
		          var _iteratorNormalCompletion3 = true;
		          var _didIteratorError3 = false;
		          var _iteratorError3 = undefined;
		
		          try {
		            for (var _iterator3 = (0, _getIterator3.default)(this.options), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
		              var item = _step3.value;
		
		              if (this.value.indexOf(item.value) !== -1) foundItems.push(item.label);
		            }
		          } catch (err) {
		            _didIteratorError3 = true;
		            _iteratorError3 = err;
		          } finally {
		            try {
		              if (!_iteratorNormalCompletion3 && _iterator3.return) {
		                _iterator3.return();
		              }
		            } finally {
		              if (_didIteratorError3) {
		                throw _iteratorError3;
		              }
		            }
		          }
		
		          return foundItems.join(', ');
		        }
		      }
		    },
		    showPlaceholder: function showPlaceholder() {
		      return this.multiple ? this.value.length <= 0 : typeof this.value === 'undefined' || this.value == '';
		    }
		  },
		  watch: {
		    value: function value(val) {
		      var _this = this;
		
		      var timeout = undefined;
		      if (timeout) clearTimeout(timeout);
		      if (val.length > this.limit) {
		        this.showNotify = true;
		        this.value.pop();
		        timeout = setTimeout(function () {
		          return _this.showNotify = false;
		        }, 1000);
		      }
		    }
		  },
		  methods: {
		    select: function select(v) {
		      if (this.multiple != false) {
		        var index = this.value.indexOf(v);
		        if (index === -1) this.value.push(v);else this.value.$remove(v);
		      } else {
		        this.value = v;
		        if (this.closeOnSelect) {
		          this.toggleDropdown();
		        }
		      }
		    },
		    toggleDropdown: function toggleDropdown() {
		      this.show = !this.show;
		    }
		  }
		};
		// </script>
		// <style>
		// .bs_searchbox {
		//   padding: 4px 8px;
		// }
		// .btn-group .dropdown-menu .notify {
		//   position: absolute;
		//   bottom: 5px;
		//   width: 96%;
		//   margin: 0 2%;
		//   min-height: 26px;
		//   padding: 3px 5px;
		//   background: #f5f5f5;
		//   border: 1px solid #e3e3e3;
		//   box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
		//    pointer-events: none;
		//   opacity: .9;
		// }
		// </style>
	
	/***/ },
	/* 143 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(144), __esModule: true };
	
	/***/ },
	/* 144 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(145);
		__webpack_require__(37);
		module.exports = __webpack_require__(151);
	
	/***/ },
	/* 145 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(146);
		var Iterators = __webpack_require__(55);
		Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
	
	/***/ },
	/* 146 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var addToUnscopables = __webpack_require__(147)
		  , step             = __webpack_require__(148)
		  , Iterators        = __webpack_require__(55)
		  , toIObject        = __webpack_require__(149);
		
		// 22.1.3.4 Array.prototype.entries()
		// 22.1.3.13 Array.prototype.keys()
		// 22.1.3.29 Array.prototype.values()
		// 22.1.3.30 Array.prototype[@@iterator]()
		module.exports = __webpack_require__(41)(Array, 'Array', function(iterated, kind){
		  this._t = toIObject(iterated); // target
		  this._i = 0;                   // next index
		  this._k = kind;                // kind
		// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
		}, function(){
		  var O     = this._t
		    , kind  = this._k
		    , index = this._i++;
		  if(!O || index >= O.length){
		    this._t = undefined;
		    return step(1);
		  }
		  if(kind == 'keys'  )return step(0, index);
		  if(kind == 'values')return step(0, O[index]);
		  return step(0, [index, O[index]]);
		}, 'values');
		
		// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
		Iterators.Arguments = Iterators.Array;
		
		addToUnscopables('keys');
		addToUnscopables('values');
		addToUnscopables('entries');
	
	/***/ },
	/* 147 */
	/***/ function(module, exports) {
	
		module.exports = function(){ /* empty */ };
	
	/***/ },
	/* 148 */
	/***/ function(module, exports) {
	
		module.exports = function(done, value){
		  return {value: value, done: !!done};
		};
	
	/***/ },
	/* 149 */
	/***/ function(module, exports, __webpack_require__) {
	
		// to indexed object, toObject with fallback for non-array-like ES3 strings
		var IObject = __webpack_require__(150)
		  , defined = __webpack_require__(40);
		module.exports = function(it){
		  return IObject(defined(it));
		};
	
	/***/ },
	/* 150 */
	/***/ function(module, exports, __webpack_require__) {
	
		// fallback for non-array-like ES3 and non-enumerable old V8 strings
		var cof = __webpack_require__(70);
		module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
		  return cof(it) == 'String' ? it.split('') : Object(it);
		};
	
	/***/ },
	/* 151 */
	/***/ function(module, exports, __webpack_require__) {
	
		var anObject = __webpack_require__(64)
		  , get      = __webpack_require__(68);
		module.exports = __webpack_require__(45).getIterator = function(it){
		  var iterFn = get(it);
		  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
		  return anObject(iterFn.call(it));
		};
	
	/***/ },
	/* 152 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"btn-group\" v-bind:class=\"{open:show}\">\n    <button v-el:btn type=\"button\" class=\"btn btn-default dropdown-toggle\" \n      @click=\"toggleDropdown\"\n      @blur=\"show = (search ? show:false)\"\n    >\n      <span class=\"placeholder\" v-show=\"showPlaceholder\">{{placeholder}}</span>\n      <span class=\"content\">{{ selectedItems }}</span>\n      <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu\">\n      <template v-if=\"options.length\">\n        <li v-if=\"search\" class=\"bs-searchbox\">\n          <input type=\"text\" placeholder=\"Search\" v-model=\"searchText\" class=\"form-control\" autocomplete=\"off\">\n        </li>\n        <li v-for=\"option in options | filterBy searchText \" v-bind:id=\"option.value\" style=\"position:relative\">\n          <a @mousedown.prevent=\"select(option.value)\" style=\"cursor:pointer\">\n            {{ option.label }}\n            <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"value.indexOf(option.value) !== -1\"></span>\n          </a>\n        </li>\n      </template>\n      <slot v-else></slot>\n      <div class=\"notify\" v-show=\"showNotify\" transition=\"fadein\">Limit reached ({{limit}} items max).</div>\n    </ul>\n  </div>";
	
	/***/ },
	/* 153 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(154)
		module.exports = __webpack_require__(156)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(157)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tab.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tab.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/template-rewriter.js?id=_v-0c89e409&file=Tab.vue!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Tab.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tab.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/template-rewriter.js?id=_v-0c89e409&file=Tab.vue!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Tab.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 154 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(155);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0c89e409&file=Tab.vue&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tab.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0c89e409&file=Tab.vue&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tab.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 155 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".tab-content > .tab-pane[_v-0c89e409] {\n    display: block;\n  }", ""]);
		
		// exports
	
	
	/***/ },
	/* 156 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <div role="tabpanel" class="tab-pane"
		//       v-bind:class="{hide:!show}"
		//       v-show="show"
		//       :transition="transition"
		//   >
		//     <slot></slot>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    header: {
		      type: String
		    },
		    disabled: {
		      type: Boolean,
		      default: false
		    }
		  },
		  data: function data() {
		    return {
		      index: 0,
		      show: false
		    };
		  },
		
		  computed: {
		    show: function show() {
		      return this.$parent.activeIndex == this.index;
		    },
		    transition: function transition() {
		      return this.$parent.effect;
		    }
		  },
		  created: function created() {
		    this.$parent.renderData.push({
		      header: this.header,
		      disabled: this.disabled
		    });
		  },
		  ready: function ready() {
		    for (var c in this.$parent.$children) {
		      if (this.$parent.$children[c].$el == this.$el) {
		        this.index = c;
		        break;
		      }
		    }
		  }
		};
		// </script>
	
		// <style scoped>
		//   .tab-content > .tab-pane {
		//     display: block;
		//   }
		// </style>
	
	/***/ },
	/* 157 */
	/***/ function(module, exports) {
	
		module.exports = "<div role=\"tabpanel\" class=\"tab-pane\" v-bind:class=\"{hide:!show}\" v-show=\"show\" :transition=\"transition\" _v-0c89e409=\"\">\n    <slot _v-0c89e409=\"\"></slot>\n  </div>";
	
	/***/ },
	/* 158 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(159)
		module.exports = __webpack_require__(161)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(162)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tabset.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tabset.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/template-rewriter.js?id=_v-4765fae9&file=Tabset.vue!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Tabset.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tabset.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/template-rewriter.js?id=_v-4765fae9&file=Tabset.vue!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Tabset.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 159 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(160);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4765fae9&file=Tabset.vue&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tabset.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4765fae9&file=Tabset.vue&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tabset.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 160 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".nav-tabs[_v-4765fae9] {\n    margin-bottom: 15px\n  }", ""]);
		
		// exports
	
	
	/***/ },
	/* 161 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		// <template>
		//   <div>
		//     <!-- Nav tabs -->
		//      <ul class="nav nav-tabs" role="tablist">
		//             <li
		//                 v-for="r in renderData"
		//                 v-bind:class="{
		//                   'active': ($index === activeIndex),
		//                   'disabled': r.disabled
		//                 }"
		//                 @click.prevent="handleTabListClick($index, r)"
		//                 :disabled="r.disabled"
		//             >
		//                 <a href="#">{{{r.header}}}</a>
		//             </li>
		//      </ul>
		
		//      <!-- Tab panes -->
		//      <div class="tab-content" v-el:tabContent>
		//         <slot></slot>
		//      </div>
		//   </div>
		// </template>
		
		// <script>
		exports.default = {
		  props: {
		    effect: {
		      type: String,
		      default: 'fadein'
		    }
		  },
		  data: function data() {
		    return {
		      renderData: [],
		      activeIndex: 0
		    };
		  },
		
		  methods: {
		    handleTabListClick: function handleTabListClick(index, el) {
		      if (!el.disabled) this.activeIndex = index;
		    }
		  }
		};
		// </script>
	
		// <style scoped>
		//   .nav-tabs {
		//     margin-bottom: 15px
		//   }
		// </style>
	
	/***/ },
	/* 162 */
	/***/ function(module, exports) {
	
		module.exports = "<div _v-4765fae9=\"\">\n    <!-- Nav tabs -->\n     <ul class=\"nav nav-tabs\" role=\"tablist\" _v-4765fae9=\"\">\n            <li v-for=\"r in renderData\" v-bind:class=\"{\n                  'active': ($index === activeIndex),\n                  'disabled': r.disabled\n                }\" @click.prevent=\"handleTabListClick($index, r)\" :disabled=\"r.disabled\" _v-4765fae9=\"\">\n                <a href=\"#\" _v-4765fae9=\"\">{{{r.header}}}</a>\n            </li>\n     </ul>\n\n     <!-- Tab panes -->\n     <div class=\"tab-content\" v-el:tabcontent=\"\" _v-4765fae9=\"\">\n        <slot _v-4765fae9=\"\"></slot>\n     </div>\n  </div>";
	
	/***/ },
	/* 163 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(164)
		module.exports = __webpack_require__(166)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(167)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tooltip.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tooltip.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Tooltip.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Tooltip.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Tooltip.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 164 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(165);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-882f0112&file=Tooltip.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tooltip.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-882f0112&file=Tooltip.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tooltip.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 165 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".tooltip {\n    opacity: .9\n  }\n.fadein-enter {\n  -webkit-animation:fadein-in 0.3s ease-in;\n          animation:fadein-in 0.3s ease-in;\n}\n.fadein-leave {\n  -webkit-animation:fadein-out 0.3s ease-out;\n          animation:fadein-out 0.3s ease-out;\n}\n@-webkit-keyframes fadein-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadein-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fadein-out {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fadein-out {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}", ""]);
		
		// exports
	
	
	/***/ },
	/* 166 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _popoverMixins = __webpack_require__(128);
		
		var _popoverMixins2 = _interopRequireDefault(_popoverMixins);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		exports.default = {
		  mixins: [_popoverMixins2.default],
		  props: {
		    trigger: {
		      type: String,
		      default: 'hover'
		    },
		    effect: {
		      type: String,
		      default: 'scale'
		    }
		  }
		};
		// </script>
	
		// <style>
		//   .tooltip {
		//     opacity: .9
		//   }
		// .fadein-enter {
		//   animation:fadein-in 0.3s ease-in;
		// }
		// .fadein-leave {
		//   animation:fadein-out 0.3s ease-out;
		// }
		// @keyframes fadein-in {
		//   0% {
		//     opacity: 0;
		//   }
		//   100% {
		//     opacity: 1;
		//   }
		// }
		// @keyframes fadein-out {
		//   0% {
		//     opacity: 1;
		//   }
		//   100% {
		//     opacity: 0;
		//   }
		// }
	
		// </style>
		// <template>
		//   <span v-el:trigger>
		//     <slot>
		//     </slot>
		//   </span>
		//   <div class="tooltip"
		//     v-bind:class="{
		//     'top':    placement === 'top',
		//     'left':   placement === 'left',
		//     'right':  placement === 'right',
		//     'bottom': placement === 'bottom'
		//     }"
		//     v-el:popover
		//     v-show="show"
		//     :transition="effect"
		//     role="tooltip">
		//     <div class="tooltip-arrow"></div>
		//     <div class="tooltip-inner">
		//       {{{content}}}
		//     </div>
		//   </div>
		// </template>
	
		// <script>
	
	/***/ },
	/* 167 */
	/***/ function(module, exports) {
	
		module.exports = "<span v-el:trigger>\n    <slot>\n    </slot>\n  </span>\n  <div class=\"tooltip\"\n    v-bind:class=\"{\n    'top':    placement === 'top',\n    'left':   placement === 'left',\n    'right':  placement === 'right',\n    'bottom': placement === 'bottom'\n    }\"\n    v-el:popover\n    v-show=\"show\"\n    :transition=\"effect\"\n    role=\"tooltip\">\n    <div class=\"tooltip-arrow\"></div>\n    <div class=\"tooltip-inner\">\n      {{{content}}}\n    </div>\n  </div>";
	
	/***/ },
	/* 168 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(169)
		module.exports = __webpack_require__(171)
		
		if (module.exports.__esModule) module.exports = module.exports.default
		;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(173)
		if (false) {
		(function () {
		var hotAPI = require("vue-hot-reload-api")
		hotAPI.install(require("vue"))
		if (!hotAPI.compatible) return
		var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Typeahead.vue"
		hotAPI.createRecord(id, module.exports)
		module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Typeahead.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Typeahead.vue"], function () {
		var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Typeahead.vue")
		if (newOptions && newOptions.__esModule) newOptions = newOptions.default
		var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Typeahead.vue")
		hotAPI.update(id, newOptions, newTemplate)
		})
		})()
		}
	
	/***/ },
	/* 169 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
		
		// load the styles
		var content = __webpack_require__(170);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(27)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3ea9213b&file=Typeahead.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Typeahead.vue", function() {
					var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3ea9213b&file=Typeahead.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Typeahead.vue");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 170 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(26)();
		// imports
		
		
		// module
		exports.push([module.id, ".dropdown-menu > li > a {\n  cursor: pointer;\n}", ""]);
		
		// exports
	
	
	/***/ },
	/* 171 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _callAjax = __webpack_require__(172);
		
		var _callAjax2 = _interopRequireDefault(_callAjax);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var typeahead = {
		  created: function created() {
		    this.items = this.primitiveData;
		  },
		
		  partials: {
		    'default': '<span v-html="item | highlight query"></span>'
		  },
		  props: {
		    data: {
		      type: Array
		    },
		    limit: {
		      type: Number,
		      default: 8
		    },
		    async: {
		      type: String
		    },
		    template: {
		      type: String
		    },
		    templateName: {
		      type: String,
		      default: 'default'
		    },
		    key: {
		      type: String
		    },
		    matchCase: {
		      type: Boolean,
		      default: false
		    },
		    onHit: {
		      type: Function,
		      default: function _default(items) {
		        this.reset();
		        this.query = items;
		      }
		    },
		    placeholder: {
		      type: String
		    }
		  },
		  data: function data() {
		    return {
		      query: '',
		      showDropdown: false,
		      noResults: true,
		      current: 0,
		      items: []
		    };
		  },
		
		  computed: {
		    primitiveData: function primitiveData() {
		      var _this = this;
		
		      if (this.data) {
		        return this.data.filter(function (value) {
		          value = _this.matchCase ? value : value.toLowerCase();
		          return value.indexOf(_this.query) !== -1;
		        }).slice(0, this.limit);
		      }
		    }
		  },
		  ready: function ready() {
		    // register a partial:
		    if (this.templateName && this.templateName !== 'default') {
		      Vue.partial(this.templateName, this.template);
		    }
		  },
		
		  methods: {
		    update: function update() {
		      var _this2 = this;
		
		      if (!this.query) {
		        this.reset();
		        return false;
		      }
		      if (this.data) {
		        this.items = this.primitiveData;
		        this.showDropdown = this.items.length ? true : false;
		      }
		      if (this.async) {
		        (0, _callAjax2.default)(this.async + this.query, function (data) {
		          _this2.items = data[_this2.key].slice(0, _this2.limit);
		          _this2.showDropdown = _this2.items.length ? true : false;
		        });
		      }
		    },
		    reset: function reset() {
		      this.items = [];
		      this.query = '';
		      this.loading = false;
		      this.showDropdown = false;
		    },
		    setActive: function setActive(index) {
		      this.current = index;
		    },
		    isActive: function isActive(index) {
		      return this.current === index;
		    },
		    hit: function hit(e) {
		      console.log("e", e, "e.targetVm", e.targetVM);
		      e.preventDefault();
		      this.onHit(this.items[this.current], this);
		    },
		    up: function up() {
		      if (this.current > 0) this.current--;
		    },
		    down: function down() {
		      if (this.current < this.items.length - 1) this.current++;
		    }
		  },
		  filters: {
		    highlight: function highlight(value, phrase) {
		      return value.replace(new RegExp('(' + phrase + ')', 'gi'), '<strong>$1</strong>');
		    }
		  }
		}; // <template>
		// <div style="position: relative"
		//   v-bind:class="{'open':showDropdown}"
		//   >
		//   <input type="text" class="form-control"
		//     :placeholder="placeholder"
		//     autocomplete="off"
		//     v-model="query"
		//     @input="update"
		//     @keydown.up="up"
		//     @keydown.down="down"
		//     @keydown.enter= "hit"
		//     @keydown.esc="reset"
		//     @blur="showDropdown = false"
		//   />
		//   <ul class="dropdown-menu" v-el:dropdown>
		//     <li v-for="item in items" v-bind:class="{'active': isActive($index)}">
		//       <a @mousedown.prevent="hit" @mousemove="setActive($index)">
		//         <partial :name="templateName"></partial>
		//       </a>
		//     </li>
		//   </ul>
		// </div>
		
		// </template>
		
		// <script>
		
		exports.default = typeahead;
		// </script>
	
		// <style>
		// .dropdown-menu > li > a {
		//   cursor: pointer;
		// }
		// </style>
	
	/***/ },
	/* 172 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		exports.default = function (url, callback) {
		    var httpRequest = new XMLHttpRequest();
		    httpRequest.onreadystatechange = function () {
		        if (httpRequest.readyState === 4) {
		            if (httpRequest.status === 200) {
		                var data = JSON.parse(httpRequest.responseText);
		                if (callback) callback(data);
		            }
		        }
		    };
		    httpRequest.open('GET', url);
		    httpRequest.send();
		};
	
	/***/ },
	/* 173 */
	/***/ function(module, exports) {
	
		module.exports = "<div style=\"position: relative\"\n  v-bind:class=\"{'open':showDropdown}\"\n  >\n  <input type=\"text\" class=\"form-control\"\n    :placeholder=\"placeholder\"\n    autocomplete=\"off\"\n    v-model=\"query\"\n    @input=\"update\"\n    @keydown.up=\"up\"\n    @keydown.down=\"down\"\n    @keydown.enter= \"hit\"\n    @keydown.esc=\"reset\"\n    @blur=\"showDropdown = false\"\n  />\n  <ul class=\"dropdown-menu\" v-el:dropdown>\n    <li v-for=\"item in items\" v-bind:class=\"{'active': isActive($index)}\">\n      <a @mousedown.prevent=\"hit\" @mousemove=\"setActive($index)\">\n        <partial :name=\"templateName\"></partial>\n      </a>\n    </li> \n  </ul>\n</div>";
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=vue-strap.js.map

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(83)
	__vue_script__ = __webpack_require__(85)
	__vue_template__ = __webpack_require__(112)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\work\\Aptana Studio 3 Workspace\\HonorWall\\honorwall\\static\\src\\components\\plugin\\Select.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(84);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(30)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e9f1b076&file=Select.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Select.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e9f1b076&file=Select.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Select.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(29)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.bs_searchbox {\n  padding: 4px 8px;\n}\n.btn-group .dropdown-menu .notify {\n  position: absolute;\n  bottom: 5px;\n  width: 96%;\n  margin: 0 2%;\n  min-height: 26px;\n  padding: 3px 5px;\n  background: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);\n   pointer-events: none;\n  opacity: .9;\n}\n", "", {"version":3,"sources":["/./src/components/plugin/Select.vue.style"],"names":[],"mappings":";AAsKA;EACA,iBAAA;CACA;AACA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,aAAA;EACA,iBAAA;EACA,iBAAA;EACA,oBAAA;EACA,0BAAA;EACA,4CAAA;GACA,qBAAA;EACA,YAAA;CACA","file":"Select.vue","sourcesContent":["<template>\n  <div class=\"btn-group\" v-bind:class=\"{open:show}\">\n    <button v-el:btn type=\"button\" class=\"btn btn-default dropdown-toggle\" \n      @click=\"toggleDropdown\"\n      @blur=\"show = (search ? show:false)\"\n    >\n      <span class=\"placeholder\" v-show=\"showPlaceholder\">{{placeholder}}</span>\n      <span class=\"content\">{{ selectedItems }}</span>\n      <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu\">\n      <template v-if=\"options.length\">\n        <li v-if=\"search\" class=\"bs-searchbox\">\n          <input type=\"text\" placeholder=\"Search\" v-model=\"searchText\" class=\"form-control\" autocomplete=\"off\">\n        </li>\n        <li v-for=\"option in options | filterBy searchText \" v-bind:id=\"option.value\" style=\"position:relative\">\n          <a @mousedown.prevent=\"select(option.value)\" style=\"cursor:pointer\">\n            {{ option.label }}\n            <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"value.indexOf(option.value) !== -1\"></span>\n          </a>\n        </li>\n      </template>\n      <slot v-else></slot>\n      <div class=\"notify\" v-show=\"showNotify\" transition=\"fadein\">最多选择 ({{limit}} 个).</div>\n    </ul>\n  </div>\n</template>\n\n<script>\n  export default {\n    props: {\n      options: {\n        type: Array,\n        default() { return [] },\n      },\n      value: {\n        twoWay: true\n      },\n      placeholder: {\n        type: String,\n        default: 'Nothing Selected'\n      },\n      multiple: {\n        type: Boolean,\n        default: false\n      },\n      search: { // Allow searching (only works when options are provided)\n      \ttype: Boolean,\n      \tdefault: false\n      },\n      limit: {\n        type: Number,\n        default: 1024\n      },\n      closeOnSelect: { // only works when multiple==false\n        type: Boolean,\n        default: false\n      }\n    },\n    ready(){\n      if(this.multiple){\n        this.value=[]\n      }\n    },\n    data() {\n      return {\n        searchText: null,\n        show: false,\n        showNotify: false\n      }\n    },\n    computed: {\n      selectedItems() {\n        if (!this.multiple)\n        {\n          if(!this.options.length) {\n            for (var c of this.$children) {\n              if (c.value == this.value) {\n                return c.$els.v.innerText\n              }\n            }\n          } else {\n            for(var i=0; i<this.options.length; i++) {\n              if(this.options[i].value === this.value) {\n                return this.options[i].label;\n              }\n            }\n          }\n          return \"\"\n        }\n        else\n        {\n          if (!this.options.length){\n\t\t\tvar r=[]\n            for(var c of this.$children){\n              if(this.value.indexOf(c.value)!==-1){\n                  r.push(c.$els.v.innerText)\n              }\n            }\n            return r.join(',');\n          }else{\n\t\t\t// we were given bunch of options, so pluck them out to display\n\t\t\tvar foundItems = [];\n            for (var item of this.options){\n            \tif (this.value.indexOf(item.value) !== -1)\n                \tfoundItems.push(item.label);\n\t\t\t}\n            return foundItems.join(', ');\n          }\n        }\n      },\n      showPlaceholder() {\n      \treturn this.multiple ? this.value.length <= 0 : (typeof this.value==='undefined' || this.value=='');\n      }\n    },\n    watch: {\n      value(val) {\n        let timeout\n        if (timeout) clearTimeout(timeout)\n        if (val.length > this.limit) {\n          this.showNotify = true\n          this.value.pop()\n          timeout = setTimeout(()=> this.showNotify = false, 1000)\n        }\n      }\n    },\n    methods: {\n      select(v) {\n        if(this.multiple!=false){\n          var index = this.value.indexOf(v);\n          if (index === -1) {\n            this.value.push(v);\n          }\n          else {\n            this.value.$remove(v)\n          }\n        }else{\n          this.value=v\n          if(this.closeOnSelect) {\n            this.toggleDropdown();\n          }\n        }\n\n      },\n      toggleDropdown() {\n        this.show = !this.show\n\n        return false\n      }\n    },\n\n    ready () {\n      let _this = this\n      $(document).click(function(e){\n          var target = $(e.target);\n\n          if (target.closest(\".btn-group\").length === 0) {\n              if ($('.btn-group').hasClass('open')) {\n                  _this.show = false\n              }\n          }\n      });\n    }\n  }\n</script>\n<style>\n.bs_searchbox {\n  padding: 4px 8px;\n}\n.btn-group .dropdown-menu .notify {\n  position: absolute;\n  bottom: 5px;\n  width: 96%;\n  margin: 0 2%;\n  min-height: 26px;\n  padding: 3px 5px;\n  background: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);\n   pointer-events: none;\n  opacity: .9;\n}\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(86);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getIterator2 = __webpack_require__(90);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="btn-group" v-bind:class="{open:show}">
	//     <button v-el:btn type="button" class="btn btn-default dropdown-toggle"
	//       @click="toggleDropdown"
	//       @blur="show = (search ? show:false)"
	//     >
	//       <span class="placeholder" v-show="showPlaceholder">{{placeholder}}</span>
	//       <span class="content">{{ selectedItems }}</span>
	//       <span class="caret"></span>
	//     </button>
	//     <ul class="dropdown-menu">
	//       <template v-if="options.length">
	//         <li v-if="search" class="bs-searchbox">
	//           <input type="text" placeholder="Search" v-model="searchText" class="form-control" autocomplete="off">
	//         </li>
	//         <li v-for="option in options | filterBy searchText " v-bind:id="option.value" style="position:relative">
	//           <a @mousedown.prevent="select(option.value)" style="cursor:pointer">
	//             {{ option.label }}
	//             <span class="glyphicon glyphicon-ok check-mark" v-show="value.indexOf(option.value) !== -1"></span>
	//           </a>
	//         </li>
	//       </template>
	//       <slot v-else></slot>
	//       <div class="notify" v-show="showNotify" transition="fadein">最多选择 ({{limit}} 个).</div>
	//     </ul>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = (0, _defineProperty3.default)({
	  props: {
	    options: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    value: {
	      twoWay: true
	    },
	    placeholder: {
	      type: String,
	      default: 'Nothing Selected'
	    },
	    multiple: {
	      type: Boolean,
	      default: false
	    },
	    search: { // Allow searching (only works when options are provided)
	      type: Boolean,
	      default: false
	    },
	    limit: {
	      type: Number,
	      default: 1024
	    },
	    closeOnSelect: { // only works when multiple==false
	      type: Boolean,
	      default: false
	    }
	  },
	  ready: function ready() {
	    if (this.multiple) {
	      this.value = [];
	    }
	  },
	  data: function data() {
	    return {
	      searchText: null,
	      show: false,
	      showNotify: false
	    };
	  },
	
	  computed: {
	    selectedItems: function selectedItems() {
	      if (!this.multiple) {
	        if (!this.options.length) {
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;
	
	          try {
	            for (var _iterator = (0, _getIterator3.default)(this.$children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var c = _step.value;
	
	              if (c.value == this.value) {
	                return c.$els.v.innerText;
	              }
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }
	        } else {
	          for (var i = 0; i < this.options.length; i++) {
	            if (this.options[i].value === this.value) {
	              return this.options[i].label;
	            }
	          }
	        }
	        return "";
	      } else {
	        if (!this.options.length) {
	          var r = [];
	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;
	
	          try {
	            for (var _iterator2 = (0, _getIterator3.default)(this.$children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var c = _step2.value;
	
	              if (this.value.indexOf(c.value) !== -1) {
	                r.push(c.$els.v.innerText);
	              }
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }
	
	          return r.join(',');
	        } else {
	          // we were given bunch of options, so pluck them out to display
	          var foundItems = [];
	          var _iteratorNormalCompletion3 = true;
	          var _didIteratorError3 = false;
	          var _iteratorError3 = undefined;
	
	          try {
	            for (var _iterator3 = (0, _getIterator3.default)(this.options), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	              var item = _step3.value;
	
	              if (this.value.indexOf(item.value) !== -1) foundItems.push(item.label);
	            }
	          } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	              }
	            } finally {
	              if (_didIteratorError3) {
	                throw _iteratorError3;
	              }
	            }
	          }
	
	          return foundItems.join(', ');
	        }
	      }
	    },
	    showPlaceholder: function showPlaceholder() {
	      return this.multiple ? this.value.length <= 0 : typeof this.value === 'undefined' || this.value == '';
	    }
	  },
	  watch: {
	    value: function value(val) {
	      var _this2 = this;
	
	      var timeout = void 0;
	      if (timeout) clearTimeout(timeout);
	      if (val.length > this.limit) {
	        this.showNotify = true;
	        this.value.pop();
	        timeout = setTimeout(function () {
	          return _this2.showNotify = false;
	        }, 1000);
	      }
	    }
	  },
	  methods: {
	    select: function select(v) {
	      if (this.multiple != false) {
	        var index = this.value.indexOf(v);
	        if (index === -1) {
	          this.value.push(v);
	        } else {
	          this.value.$remove(v);
	        }
	      } else {
	        this.value = v;
	        if (this.closeOnSelect) {
	          this.toggleDropdown();
	        }
	      }
	    },
	    toggleDropdown: function toggleDropdown() {
	      this.show = !this.show;
	
	      return false;
	    }
	  }
	
	}, 'ready', function ready() {
	  var _this = this;
	  $(document).click(function (e) {
	    var target = $(e.target);
	
	    if (target.closest(".btn-group").length === 0) {
	      if ($('.btn-group').hasClass('open')) {
	        _this.show = false;
	      }
	    }
	  });
	});
	// </script>
	// <style>
	// .bs_searchbox {
	//   padding: 4px 8px;
	// }
	// .btn-group .dropdown-menu .notify {
	//   position: absolute;
	//   bottom: 5px;
	//   width: 96%;
	//   margin: 0 2%;
	//   min-height: 26px;
	//   padding: 3px 5px;
	//   background: #f5f5f5;
	//   border: 1px solid #e3e3e3;
	//   box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
	//    pointer-events: none;
	//   opacity: .9;
	// }
	// </style>
	/* generated by vue-loader */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(87);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	var $Object = __webpack_require__(42).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(40);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(50), 'Object', {defineProperty: __webpack_require__(46).f});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	__webpack_require__(107);
	module.exports = __webpack_require__(109);

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	var global        = __webpack_require__(41)
	  , hide          = __webpack_require__(45)
	  , Iterators     = __webpack_require__(96)
	  , TO_STRING_TAG = __webpack_require__(105)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(94)
	  , step             = __webpack_require__(95)
	  , Iterators        = __webpack_require__(96)
	  , toIObject        = __webpack_require__(59);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(97)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(98)
	  , $export        = __webpack_require__(40)
	  , redefine       = __webpack_require__(99)
	  , hide           = __webpack_require__(45)
	  , has            = __webpack_require__(58)
	  , Iterators      = __webpack_require__(96)
	  , $iterCreate    = __webpack_require__(100)
	  , setToStringTag = __webpack_require__(104)
	  , getPrototypeOf = __webpack_require__(106)
	  , ITERATOR       = __webpack_require__(105)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(101)
	  , descriptor     = __webpack_require__(54)
	  , setToStringTag = __webpack_require__(104)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(45)(IteratorPrototype, __webpack_require__(105)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(47)
	  , dPs         = __webpack_require__(102)
	  , enumBugKeys = __webpack_require__(70)
	  , IE_PROTO    = __webpack_require__(67)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(52)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(103).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(46)
	  , anObject = __webpack_require__(47)
	  , getKeys  = __webpack_require__(56);
	
	module.exports = __webpack_require__(50) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(41).document && document.documentElement;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(46).f
	  , has = __webpack_require__(58)
	  , TAG = __webpack_require__(105)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(68)('wks')
	  , uid        = __webpack_require__(69)
	  , Symbol     = __webpack_require__(41).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(58)
	  , toObject    = __webpack_require__(73)
	  , IE_PROTO    = __webpack_require__(67)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(108)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(97)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(65)
	  , defined   = __webpack_require__(62);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(47)
	  , get      = __webpack_require__(110);
	module.exports = __webpack_require__(42).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(111)
	  , ITERATOR  = __webpack_require__(105)('iterator')
	  , Iterators = __webpack_require__(96);
	module.exports = __webpack_require__(42).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(61)
	  , TAG = __webpack_require__(105)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"btn-group\" v-bind:class=\"{open:show}\">\n    <button v-el:btn type=\"button\" class=\"btn btn-default dropdown-toggle\" \n      @click=\"toggleDropdown\"\n      @blur=\"show = (search ? show:false)\"\n    >\n      <span class=\"placeholder\" v-show=\"showPlaceholder\">{{placeholder}}</span>\n      <span class=\"content\">{{ selectedItems }}</span>\n      <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu\">\n      <template v-if=\"options.length\">\n        <li v-if=\"search\" class=\"bs-searchbox\">\n          <input type=\"text\" placeholder=\"Search\" v-model=\"searchText\" class=\"form-control\" autocomplete=\"off\">\n        </li>\n        <li v-for=\"option in options | filterBy searchText \" v-bind:id=\"option.value\" style=\"position:relative\">\n          <a @mousedown.prevent=\"select(option.value)\" style=\"cursor:pointer\">\n            {{ option.label }}\n            <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"value.indexOf(option.value) !== -1\"></span>\n          </a>\n        </li>\n      </template>\n      <slot v-else></slot>\n      <div class=\"notify\" v-show=\"showNotify\" transition=\"fadein\">最多选择 ({{limit}} 个).</div>\n    </ul>\n  </div>\n";

/***/ },
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(119)
	__vue_script__ = __webpack_require__(121)
	__vue_template__ = __webpack_require__(122)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\work\\Aptana Studio 3 Workspace\\HonorWall\\honorwall\\static\\src\\components\\plugin\\Upload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(120);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(30)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4184136c&file=Upload.vue&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Upload.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4184136c&file=Upload.vue&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Upload.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(29)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n\r\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Upload.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <form id="file_form" class="form-horizontal">
	//         <div class="form-group">
	//             <label class="control-label col-sm-3">奖项类型：<span class="text-danger">*</span></label>
	//             <div class="col-sm-6">
	//                 <v-select :value.sync="type" :options="types" placeholder="请选择">
	//                 </v-select>
	//             </div>
	//         </div>
	//         <div class="form-group">
	//             <label class="control-label col-sm-3">项目名称：<span class="text-danger">*</span></label>
	//             <div class="col-sm-6">
	//                 <input type="text" class="form-control" v-model="name">
	//             </div>
	//         </div>
	//         <div class="form-group">
	//             <label class="control-label col-sm-3">项目文件：<span class="text-danger">*</span></label>
	//             <div class="col-sm-4">
	//                 <input type="text" class="form-control" onfocus="this.blur()" v-model="path">
	//                 <input id="file" type="file" name="file" v-show="false" @change="changeFn">
	//             </div>
	//             <div class="col-sm-2">
	//                 <button type="button" class="btn btn-default" @click="searchFn">浏览</button>
	//                 <button type="button" class="btn btn-default" @click="uploadFn">上传</button>
	//             </div>
	//         </div>
	//         <div class="form-group">
	//             <label class="control-label col-sm-3">应用场景：<span class="text-danger">*</span></label>
	//             <div class="col-sm-6">
	//                 <textarea class="form-control" rows="3" v-model="scene"></textarea>
	//             </div>
	//         </div>
	//         <div class="form-group">
	//             <label class="control-label col-sm-3">解决问题：<span class="text-danger">*</span></label>
	//             <div class="col-sm-6">
	//                 <textarea class="form-control" rows="3" v-model="solve"></textarea>
	//             </div>
	//         </div>
	//         <div class="form-group">
	//             <label class="control-label col-sm-3">包含技术：<span class="text-danger">*</span></label>
	//             <div class="col-sm-6">
	//                 <textarea class="form-control" rows="3" v-model="tech"></textarea>
	//             </div>
	//         </div>
	//         <div class="form-group text-center">
	//             <div class="col-sm-6 col-sm-offset-3">
	//                 <button type="button" class="btn btn-success btn-box" :disabled="!type || !name.trim() || !path.trim() || !scene.trim() || !solve.trim() || !tech.trim() ? true : false" @click="submitFn">提交</button>
	//             </div>
	//         </div>
	//     </form>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            types: [{ label: '新人奖', value: '1' }, { label: '创新奖', value: '2' }, { label: 'MVP奖', value: '3' }],
	            type: '',
	            name: '',
	            scene: '',
	            solve: '',
	            tech: '',
	            path: '',
	            road: ''
	        };
	    },
	
	    methods: {
	
	        // 提交
	
	        submitFn: function submitFn() {
	            this.$http({
	                url: '/honor/start_apply/',
	                method: 'POST',
	                data: {
	                    type: this.type,
	                    name: this.name,
	                    scene: this.scene,
	                    solve: this.solve,
	                    tech: this.tech,
	                    path: this.road
	                }
	            }).then(function (data) {});
	        },
	
	
	        // 浏览
	        searchFn: function searchFn() {
	            $('#file').trigger('click');
	        },
	
	
	        // 获取路径
	        changeFn: function changeFn() {
	            this.path = $('#file').val();
	        },
	
	
	        // 上传
	        uploadFn: function uploadFn() {
	            var _this = this,
	                formData = new FormData($('#file_form')[0]);
	
	            $.ajax({
	                url: '/honor/file_upload/',
	                type: 'POST',
	                processData: false,
	                contentType: false,
	                dataType: 'JSON',
	                data: formData
	            }).then(function (data) {
	                _this.road = data.data.path;
	            });
	        }
	    },
	    components: {
	        vSelect: __webpack_require__(82)
	    }
	};
	// </script>
	//
	// <style scoped>
	//
	// </style>
	/* generated by vue-loader */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = "\n    <form id=\"file_form\" class=\"form-horizontal\" _v-4184136c=\"\">\n        <div class=\"form-group\" _v-4184136c=\"\">\n            <label class=\"control-label col-sm-3\" _v-4184136c=\"\">奖项类型：<span class=\"text-danger\" _v-4184136c=\"\">*</span></label>\n            <div class=\"col-sm-6\" _v-4184136c=\"\">\n                <v-select :value.sync=\"type\" :options=\"types\" placeholder=\"请选择\" _v-4184136c=\"\">\n                </v-select>\n            </div>\n        </div>\n        <div class=\"form-group\" _v-4184136c=\"\">\n            <label class=\"control-label col-sm-3\" _v-4184136c=\"\">项目名称：<span class=\"text-danger\" _v-4184136c=\"\">*</span></label>\n            <div class=\"col-sm-6\" _v-4184136c=\"\">\n                <input type=\"text\" class=\"form-control\" v-model=\"name\" _v-4184136c=\"\">\n            </div>\n        </div>\n        <div class=\"form-group\" _v-4184136c=\"\">\n            <label class=\"control-label col-sm-3\" _v-4184136c=\"\">项目文件：<span class=\"text-danger\" _v-4184136c=\"\">*</span></label>\n            <div class=\"col-sm-4\" _v-4184136c=\"\">\n                <input type=\"text\" class=\"form-control\" onfocus=\"this.blur()\" v-model=\"path\" _v-4184136c=\"\">\n                <input id=\"file\" type=\"file\" name=\"file\" v-show=\"false\" @change=\"changeFn\" _v-4184136c=\"\">\n            </div>\n            <div class=\"col-sm-2\" _v-4184136c=\"\">\n                <button type=\"button\" class=\"btn btn-default\" @click=\"searchFn\" _v-4184136c=\"\">浏览</button>\n                <button type=\"button\" class=\"btn btn-default\" @click=\"uploadFn\" _v-4184136c=\"\">上传</button>\n            </div>\n        </div>\n        <div class=\"form-group\" _v-4184136c=\"\">\n            <label class=\"control-label col-sm-3\" _v-4184136c=\"\">应用场景：<span class=\"text-danger\" _v-4184136c=\"\">*</span></label>\n            <div class=\"col-sm-6\" _v-4184136c=\"\">\n                <textarea class=\"form-control\" rows=\"3\" v-model=\"scene\" _v-4184136c=\"\"></textarea>\n            </div>\n        </div>\n        <div class=\"form-group\" _v-4184136c=\"\">\n            <label class=\"control-label col-sm-3\" _v-4184136c=\"\">解决问题：<span class=\"text-danger\" _v-4184136c=\"\">*</span></label>\n            <div class=\"col-sm-6\" _v-4184136c=\"\">\n                <textarea class=\"form-control\" rows=\"3\" v-model=\"solve\" _v-4184136c=\"\"></textarea>\n            </div>\n        </div>\n        <div class=\"form-group\" _v-4184136c=\"\">\n            <label class=\"control-label col-sm-3\" _v-4184136c=\"\">包含技术：<span class=\"text-danger\" _v-4184136c=\"\">*</span></label>\n            <div class=\"col-sm-6\" _v-4184136c=\"\">\n                <textarea class=\"form-control\" rows=\"3\" v-model=\"tech\" _v-4184136c=\"\"></textarea>\n            </div>\n        </div>\n        <div class=\"form-group text-center\" _v-4184136c=\"\">\n            <div class=\"col-sm-6 col-sm-offset-3\" _v-4184136c=\"\">\n                <button type=\"button\" class=\"btn btn-success btn-box\" :disabled=\"!type || !name.trim() || !path.trim() || !scene.trim() || !solve.trim() || !tech.trim() ? true : false\" @click=\"submitFn\" _v-4184136c=\"\">提交</button>\n            </div>\n        </div>\n    </form>\n";

/***/ },
/* 123 */,
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(125)
	__vue_script__ = __webpack_require__(127)
	__vue_template__ = __webpack_require__(133)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\work\\Aptana Studio 3 Workspace\\HonorWall\\honorwall\\static\\src\\components\\Search.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(126);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(30)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-02b1ef98&file=Search.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Search.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-02b1ef98&file=Search.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Search.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(29)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n.honor-search[_v-02b1ef98] {\r\n    padding: 60px 200px;\r\n}\r\n\r\n.pointer[_v-02b1ef98] {\r\n    cursor: pointer;\r\n}\r\n\r\n.btn-small[_v-02b1ef98] {\r\n    padding: 0px 3px;\r\n    color: #5D5151;\r\n    border: none;\r\n    font-size: 12px;\r\n}\r\n\r\n.ml15[_v-02b1ef98] {\r\n    margin-left: 15px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Search.vue.style"],"names":[],"mappings":";AA0EA;IACA,oBAAA;CACA;;AAEA;IACA,gBAAA;CACA;;AAEA;IACA,iBAAA;IACA,eAAA;IACA,aAAA;IACA,gBAAA;CACA;;AAEA;IACA,kBAAA;CACA","file":"Search.vue","sourcesContent":["<template>\r\n    <div class=\"honor-search clearfix\">\r\n        <form class=\"form-inline\">\r\n            <div class=\"form-group\">\r\n                <label>搜索：</label>\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"姓名/项目/简介\">\r\n            </div>\r\n            <br>\r\n            <table class=\"table table-hover table-bordered mt30\">\r\n                <thead>\r\n                    <tr>\r\n                        <th width=\"10%\">姓名</th>\r\n                        <th width=\"15%\">项目名称</th>\r\n                        <th width=\"15%\">申报时间</th>\r\n                        <th width=\"30%\">项目简介</th>\r\n                        <th width=\"10%\">当前阶段</th>\r\n                        <th width=\"10%\">操作</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr v-for=\"list in lists\">\r\n                        <td v-text=\"list.name\"></td>\r\n                        <td v-text=\"list.product\" :title=\"list.product\"></td>\r\n                        <td v-text=\"list.time\"></td>\r\n                        <td v-text=\"list.introduce\" :title=\"list.introduce\"></td>\r\n                        <td v-text=\"list.status\"></td>\r\n                        <td>\r\n                            <button type=\"button\" class=\"btn btn-default btn-small\" @click=\"modifyFn\">\r\n                                <span class=\"glyphicon glyphicon-pencil\"></span>\r\n                            </button>\r\n                            <button type=\"button\" class=\"btn btn-default btn-small ml15\">\r\n                                <span class=\"glyphicon glyphicon-eye-open\"></span>\r\n                            </button>\r\n                            <a :href=\"list.link\" target=\"_blank\" class=\"btn btn-default btn-small glyphicon glyphicon-arrow-down pointer ml15\"></a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </form>\r\n\r\n        <edit-modal></edit-modal>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    data () {\r\n        return {\r\n            lists: []\r\n        }\r\n    },\r\n    methods: {\r\n        modifyFn () {\r\n            this.$broadcast('open-modal')\r\n        }\r\n    },\r\n    ready () {\r\n        this.$http({\r\n            url: '/honor/apply_list/',\r\n            method: 'POST'\r\n        })\r\n        .then(function (response) {\r\n            if (response.data.status === 200) {\r\n                this.lists = response.data.data\r\n            }\r\n        })\r\n    },\r\n    components: {\r\n        editModal: require('./plugin/Modify.vue')\r\n    }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.honor-search {\r\n    padding: 60px 200px;\r\n}\r\n\r\n.pointer {\r\n    cursor: pointer;\r\n}\r\n\r\n.btn-small {\r\n    padding: 0px 3px;\r\n    color: #5D5151;\r\n    border: none;\r\n    font-size: 12px;\r\n}\r\n\r\n.ml15 {\r\n    margin-left: 15px;\r\n}\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="honor-search clearfix">
	//         <form class="form-inline">
	//             <div class="form-group">
	//                 <label>搜索：</label>
	//                 <input type="text" class="form-control" placeholder="姓名/项目/简介">
	//             </div>
	//             <br>
	//             <table class="table table-hover table-bordered mt30">
	//                 <thead>
	//                     <tr>
	//                         <th width="10%">姓名</th>
	//                         <th width="15%">项目名称</th>
	//                         <th width="15%">申报时间</th>
	//                         <th width="30%">项目简介</th>
	//                         <th width="10%">当前阶段</th>
	//                         <th width="10%">操作</th>
	//                     </tr>
	//                 </thead>
	//                 <tbody>
	//                     <tr v-for="list in lists">
	//                         <td v-text="list.name"></td>
	//                         <td v-text="list.product" :title="list.product"></td>
	//                         <td v-text="list.time"></td>
	//                         <td v-text="list.introduce" :title="list.introduce"></td>
	//                         <td v-text="list.status"></td>
	//                         <td>
	//                             <button type="button" class="btn btn-default btn-small" @click="modifyFn">
	//                                 <span class="glyphicon glyphicon-pencil"></span>
	//                             </button>
	//                             <button type="button" class="btn btn-default btn-small ml15">
	//                                 <span class="glyphicon glyphicon-eye-open"></span>
	//                             </button>
	//                             <a :href="list.link" target="_blank" class="btn btn-default btn-small glyphicon glyphicon-arrow-down pointer ml15"></a>
	//                         </td>
	//                     </tr>
	//                 </tbody>
	//             </table>
	//         </form>
	//
	//         <edit-modal></edit-modal>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            lists: []
	        };
	    },
	
	    methods: {
	        modifyFn: function modifyFn() {
	            this.$broadcast('open-modal');
	        }
	    },
	    ready: function ready() {
	        this.$http({
	            url: '/honor/apply_list/',
	            method: 'POST'
	        }).then(function (response) {
	            if (response.data.status === 200) {
	                this.lists = response.data.data;
	            }
	        });
	    },
	
	    components: {
	        editModal: __webpack_require__(128)
	    }
	};
	// </script>
	//
	// <style scoped>
	// .honor-search {
	//     padding: 60px 200px;
	// }
	//
	// .pointer {
	//     cursor: pointer;
	// }
	//
	// .btn-small {
	//     padding: 0px 3px;
	//     color: #5D5151;
	//     border: none;
	//     font-size: 12px;
	// }
	//
	// .ml15 {
	//     margin-left: 15px;
	// }
	// </style>
	/* generated by vue-loader */

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(129)
	__vue_script__ = __webpack_require__(131)
	__vue_template__ = __webpack_require__(132)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\work\\Aptana Studio 3 Workspace\\HonorWall\\honorwall\\static\\src\\components\\plugin\\Modify.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(130);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(30)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-35ef5c83&file=Modify.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Modify.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-35ef5c83&file=Modify.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Modify.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(29)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n    \r\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Modify.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <modal :show.sync="viewModal" effect="zoom" width="800px">
	//         <div slot="modal-header" class="modal-header">
	//             <button type="button" class="close" @click="closeFn">
	//                 <span>×</span>
	//             </button>
	//             <h4 class="modal-title">
	//                 申报查看
	//             </h4>
	//         </div>
	//         <div slot="modal-body" class="modal-body">
	//             <upload></upload>
	//         </div>
	//         <div slot="modal-footer" class="modal-footer">
	//
	//         </div>
	//     </modal>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            viewModal: false
	        };
	    },
	
	    methods: {
	
	        // 关闭弹窗
	
	        closeFn: function closeFn() {
	            this.viewModal = false;
	        }
	    },
	    components: {
	        modal: __webpack_require__(81).modal,
	        upload: __webpack_require__(118)
	    },
	    events: {
	        'open-modal': function openModal() {
	            this.viewModal = true;
	        }
	    }
	};
	// </script>
	//
	// <style>
	//
	// </style>
	/* generated by vue-loader */

/***/ },
/* 132 */
/***/ function(module, exports) {

	module.exports = "\r\n    <modal :show.sync=\"viewModal\" effect=\"zoom\" width=\"800px\">\r\n        <div slot=\"modal-header\" class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" @click=\"closeFn\">\r\n                <span>×</span>\r\n            </button>\r\n            <h4 class=\"modal-title\">\r\n                申报查看\r\n            </h4>\r\n        </div>\r\n        <div slot=\"modal-body\" class=\"modal-body\">\r\n            <upload></upload>\r\n        </div>\r\n        <div slot=\"modal-footer\" class=\"modal-footer\">\r\n            \r\n        </div>\r\n    </modal>\r\n";

/***/ },
/* 133 */
/***/ function(module, exports) {

	module.exports = "\n    <div class=\"honor-search clearfix\" _v-02b1ef98=\"\">\n        <form class=\"form-inline\" _v-02b1ef98=\"\">\n            <div class=\"form-group\" _v-02b1ef98=\"\">\n                <label _v-02b1ef98=\"\">搜索：</label>\n                <input type=\"text\" class=\"form-control\" placeholder=\"姓名/项目/简介\" _v-02b1ef98=\"\">\n            </div>\n            <br _v-02b1ef98=\"\">\n            <table class=\"table table-hover table-bordered mt30\" _v-02b1ef98=\"\">\n                <thead _v-02b1ef98=\"\">\n                    <tr _v-02b1ef98=\"\">\n                        <th width=\"10%\" _v-02b1ef98=\"\">姓名</th>\n                        <th width=\"15%\" _v-02b1ef98=\"\">项目名称</th>\n                        <th width=\"15%\" _v-02b1ef98=\"\">申报时间</th>\n                        <th width=\"30%\" _v-02b1ef98=\"\">项目简介</th>\n                        <th width=\"10%\" _v-02b1ef98=\"\">当前阶段</th>\n                        <th width=\"10%\" _v-02b1ef98=\"\">操作</th>\n                    </tr>\n                </thead>\n                <tbody _v-02b1ef98=\"\">\n                    <tr v-for=\"list in lists\" _v-02b1ef98=\"\">\n                        <td v-text=\"list.name\" _v-02b1ef98=\"\"></td>\n                        <td v-text=\"list.product\" :title=\"list.product\" _v-02b1ef98=\"\"></td>\n                        <td v-text=\"list.time\" _v-02b1ef98=\"\"></td>\n                        <td v-text=\"list.introduce\" :title=\"list.introduce\" _v-02b1ef98=\"\"></td>\n                        <td v-text=\"list.status\" _v-02b1ef98=\"\"></td>\n                        <td _v-02b1ef98=\"\">\n                            <button type=\"button\" class=\"btn btn-default btn-small\" @click=\"modifyFn\" _v-02b1ef98=\"\">\n                                <span class=\"glyphicon glyphicon-pencil\" _v-02b1ef98=\"\"></span>\n                            </button>\n                            <button type=\"button\" class=\"btn btn-default btn-small ml15\" _v-02b1ef98=\"\">\n                                <span class=\"glyphicon glyphicon-eye-open\" _v-02b1ef98=\"\"></span>\n                            </button>\n                            <a :href=\"list.link\" target=\"_blank\" class=\"btn btn-default btn-small glyphicon glyphicon-arrow-down pointer ml15\" _v-02b1ef98=\"\"></a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </form>\n\n        <edit-modal _v-02b1ef98=\"\"></edit-modal>\n    </div>\n";

/***/ }
]));
//# sourceMappingURL=5.build.js.map