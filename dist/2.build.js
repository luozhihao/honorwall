webpackJsonp([2],Array(33).concat([
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(34)
	__vue_script__ = __webpack_require__(36)
	__vue_template__ = __webpack_require__(102)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\work\\Aptana Studio 3 Workspace\\HonorWall\\honorwall\\static\\src\\components\\Assess.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(30)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a95a8158&file=Assess.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Assess.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a95a8158&file=Assess.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Assess.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(29)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n.honor-assess[_v-a95a8158] {\r\n    padding: 60px 200px;\r\n}\r\n\r\n.honor-assess .btn-group[_v-a95a8158] {\r\n    width: 100%;\r\n}\r\n\r\n.honor-assess .btn-group > .btn[_v-a95a8158] {\r\n    width: 80%;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.product-wrap[_v-a95a8158] {\r\n    width: 200px;\r\n    position: relative;\r\n    left: 50%;\r\n    margin-left: -100px;\r\n}\r\n\r\n.assess-box[_v-a95a8158] {\r\n    height: 200px;\r\n    width: 100%;\r\n    text-align: center;\r\n    font-size: 32px;\r\n    line-height: 200px;\r\n    border: 1px dashed #ccc;\r\n    color: #ccc;\r\n    margin-top: 50px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Assess.vue.style"],"names":[],"mappings":";AA+HA;IACA,oBAAA;CACA;;AAEA;IACA,YAAA;CACA;;AAEA;IACA,WAAA;IACA,oBAAA;CACA;;AAEA;IACA,aAAA;IACA,mBAAA;IACA,UAAA;IACA,oBAAA;CACA;;AAEA;IACA,cAAA;IACA,YAAA;IACA,mBAAA;IACA,gBAAA;IACA,mBAAA;IACA,wBAAA;IACA,YAAA;IACA,iBAAA;CACA","file":"Assess.vue","sourcesContent":["<template>\r\n    <div class=\"honor-assess clearfix\">\r\n        <form class=\"form-horizontal\">\r\n            <div class=\"form-group select-product\">\r\n                <div class=\"product-wrap\">\r\n                    <v-select :value.sync=\"product\" :options=\"products\" placeholder=\"请选择项目\">\r\n                    </v-select>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\" v-for=\"list in lists\">\r\n                <label class=\"control-label col-sm-2\" v-text=\"list.name + ':'\"></label>\r\n                <div class=\"col-sm-10\">\r\n                    <radio-group :value.sync=\"list.active\" type=\"default\">\r\n                        <radio v-for=\"choice in list.choices\" :value=\"choice.choice_id\">{{ choice.label }}</radio>\r\n                    </radio-group>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group text-center\" v-if=\"lists.length\">\r\n                <button type=\"button\" class=\"btn btn-success btn-box\" @click=\"confirmFn\">提交</button>\r\n            </div>\r\n            <div class=\"assess-box\" v-if=\"showBox\">\r\n                评价内容显示区\r\n            </div>\r\n        </form>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    data () {\r\n        return {\r\n            products: [],\r\n            product: '',\r\n            lists: [],\r\n            showBox: true\r\n        }\r\n    },\r\n    methods: {\r\n\r\n        // 确认评价\r\n        confirmFn () {\r\n            let arr = [],\r\n                _this = this\r\n\r\n            this.lists.forEach(function (e){\r\n                if (e.active === '') {\r\n                    _this.$dispatch('show-notify', '有未完成的评价项')\r\n\r\n                    return false\r\n                } else {\r\n                    arr.push({\r\n                        item_id: e.item_id,\r\n                        active_id: e.active\r\n                    })\r\n                }\r\n            })\r\n\r\n            if (arr.length === this.lists.length) {\r\n                this.$http({\r\n                    url: '/honor/choice_result/',\r\n                    method: 'POST',\r\n                    data: {\r\n                        product_id: this.product,\r\n                        choices: JSON.stringify(arr)\r\n                    }\r\n                })\r\n                .then(function (response) {\r\n                    if (response.data.status === 200) {\r\n                        this.product = ''\r\n                        this.lists = []\r\n                        this.showBox = true\r\n\r\n                        this.$dispatch('show-success')\r\n                    } else {\r\n                        this.$dispatch('show-error')\r\n                    }\r\n                })\r\n            }\r\n        },\r\n\r\n        // 刷新\r\n        refresh () {\r\n            this.$http({\r\n                url: '/honor/product_list/',\r\n                method: 'POST'\r\n            })\r\n            .then(function (response) {\r\n                if (response.data.status === 200) {\r\n                    this.products = response.data.data\r\n                }\r\n            })\r\n        }\r\n    },\r\n    components: {\r\n        radioGroup: require('vue-strap').radioGroup,\r\n        radio: require('vue-strap').radioBtn,\r\n        vSelect: require('./plugin/Select.vue')\r\n    },\r\n    ready () {\r\n        this.refresh()\r\n    },\r\n    watch: {\r\n        'product' (newVal) {\r\n            if (newVal !== '') {\r\n                this.$http({\r\n                    url: '/honor/choice_list/',\r\n                    method: 'POST',\r\n                    data: {\r\n                        product: newVal\r\n                    }\r\n                })\r\n                .then(function (response) {\r\n                    if (response.data.status === 200) {\r\n                        this.showBox = false\r\n                        this.lists = response.data.data\r\n                    }\r\n                })\r\n            } else {\r\n                this.refresh()\r\n            }\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.honor-assess {\r\n    padding: 60px 200px;\r\n}\r\n\r\n.honor-assess .btn-group {\r\n    width: 100%;\r\n}\r\n\r\n.honor-assess .btn-group > .btn {\r\n    width: 80%;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.product-wrap {\r\n    width: 200px;\r\n    position: relative;\r\n    left: 50%;\r\n    margin-left: -100px;\r\n}\r\n\r\n.assess-box {\r\n    height: 200px;\r\n    width: 100%;\r\n    text-align: center;\r\n    font-size: 32px;\r\n    line-height: 200px;\r\n    border: 1px dashed #ccc;\r\n    color: #ccc;\r\n    margin-top: 50px;\r\n}\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(37);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//     <div class="honor-assess clearfix">
	//         <form class="form-horizontal">
	//             <div class="form-group select-product">
	//                 <div class="product-wrap">
	//                     <v-select :value.sync="product" :options="products" placeholder="请选择项目">
	//                     </v-select>
	//                 </div>
	//             </div>
	//
	//             <div class="form-group" v-for="list in lists">
	//                 <label class="control-label col-sm-2" v-text="list.name + ':'"></label>
	//                 <div class="col-sm-10">
	//                     <radio-group :value.sync="list.active" type="default">
	//                         <radio v-for="choice in list.choices" :value="choice.choice_id">{{ choice.label }}</radio>
	//                     </radio-group>
	//                 </div>
	//             </div>
	//             <div class="form-group text-center" v-if="lists.length">
	//                 <button type="button" class="btn btn-success btn-box" @click="confirmFn">提交</button>
	//             </div>
	//             <div class="assess-box" v-if="showBox">
	//                 评价内容显示区
	//             </div>
	//         </form>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            products: [],
	            product: '',
	            lists: [],
	            showBox: true
	        };
	    },
	
	    methods: {
	
	        // 确认评价
	
	        confirmFn: function confirmFn() {
	            var arr = [],
	                _this = this;
	
	            this.lists.forEach(function (e) {
	                if (e.active === '') {
	                    _this.$dispatch('show-notify', '有未完成的评价项');
	
	                    return false;
	                } else {
	                    arr.push({
	                        item_id: e.item_id,
	                        active_id: e.active
	                    });
	                }
	            });
	
	            if (arr.length === this.lists.length) {
	                this.$http({
	                    url: '/honor/choice_result/',
	                    method: 'POST',
	                    data: {
	                        product_id: this.product,
	                        choices: (0, _stringify2.default)(arr)
	                    }
	                }).then(function (response) {
	                    if (response.data.status === 200) {
	                        this.product = '';
	                        this.lists = [];
	                        this.showBox = true;
	
	                        this.$dispatch('show-success');
	                    } else {
	                        this.$dispatch('show-error');
	                    }
	                });
	            }
	        },
	
	
	        // 刷新
	        refresh: function refresh() {
	            this.$http({
	                url: '/honor/product_list/',
	                method: 'POST'
	            }).then(function (response) {
	                if (response.data.status === 200) {
	                    this.products = response.data.data;
	                }
	            });
	        }
	    },
	    components: {
	        radioGroup: __webpack_require__(40).radioGroup,
	        radio: __webpack_require__(40).radioBtn,
	        vSelect: __webpack_require__(41)
	    },
	    ready: function ready() {
	        this.refresh();
	    },
	
	    watch: {
	        'product': function product(newVal) {
	            if (newVal !== '') {
	                this.$http({
	                    url: '/honor/choice_list/',
	                    method: 'POST',
	                    data: {
	                        product: newVal
	                    }
	                }).then(function (response) {
	                    if (response.data.status === 200) {
	                        this.showBox = false;
	                        this.lists = response.data.data;
	                    }
	                });
	            } else {
	                this.refresh();
	            }
	        }
	    }
	};
	// </script>
	//
	// <style scoped>
	// .honor-assess {
	//     padding: 60px 200px;
	// }
	//
	// .honor-assess .btn-group {
	//     width: 100%;
	// }
	//
	// .honor-assess .btn-group > .btn {
	//     width: 80%;
	//     margin-bottom: 20px;
	// }
	//
	// .product-wrap {
	//     width: 200px;
	//     position: relative;
	//     left: 50%;
	//     margin-left: -100px;
	// }
	//
	// .assess-box {
	//     height: 200px;
	//     width: 100%;
	//     text-align: center;
	//     font-size: 32px;
	//     line-height: 200px;
	//     border: 1px dashed #ccc;
	//     color: #ccc;
	//     margin-top: 50px;
	// }
	// </style>
	/* generated by vue-loader */

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(39)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.3.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 40 */,
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(42)
	__vue_script__ = __webpack_require__(44)
	__vue_template__ = __webpack_require__(101)
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(43);
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(29)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.bs_searchbox {\n  padding: 4px 8px;\n}\n.btn-group .dropdown-menu .notify {\n  position: absolute;\n  bottom: 5px;\n  width: 96%;\n  margin: 0 2%;\n  min-height: 26px;\n  padding: 3px 5px;\n  background: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);\n   pointer-events: none;\n  opacity: .9;\n}\n", "", {"version":3,"sources":["/./src/components/plugin/Select.vue.style"],"names":[],"mappings":";AAsKA;EACA,iBAAA;CACA;AACA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,aAAA;EACA,iBAAA;EACA,iBAAA;EACA,oBAAA;EACA,0BAAA;EACA,4CAAA;GACA,qBAAA;EACA,YAAA;CACA","file":"Select.vue","sourcesContent":["<template>\n  <div class=\"btn-group\" v-bind:class=\"{open:show}\">\n    <button v-el:btn type=\"button\" class=\"btn btn-default dropdown-toggle\" \n      @click=\"toggleDropdown\"\n      @blur=\"show = (search ? show:false)\"\n    >\n      <span class=\"placeholder\" v-show=\"showPlaceholder\">{{placeholder}}</span>\n      <span class=\"content\">{{ selectedItems }}</span>\n      <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu\">\n      <template v-if=\"options.length\">\n        <li v-if=\"search\" class=\"bs-searchbox\">\n          <input type=\"text\" placeholder=\"Search\" v-model=\"searchText\" class=\"form-control\" autocomplete=\"off\">\n        </li>\n        <li v-for=\"option in options | filterBy searchText \" v-bind:id=\"option.value\" style=\"position:relative\">\n          <a @mousedown.prevent=\"select(option.value)\" style=\"cursor:pointer\">\n            {{ option.label }}\n            <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"value.indexOf(option.value) !== -1\"></span>\n          </a>\n        </li>\n      </template>\n      <slot v-else></slot>\n      <div class=\"notify\" v-show=\"showNotify\" transition=\"fadein\">最多选择 ({{limit}} 个).</div>\n    </ul>\n  </div>\n</template>\n\n<script>\n  export default {\n    props: {\n      options: {\n        type: Array,\n        default() { return [] },\n      },\n      value: {\n        twoWay: true\n      },\n      placeholder: {\n        type: String,\n        default: 'Nothing Selected'\n      },\n      multiple: {\n        type: Boolean,\n        default: false\n      },\n      search: { // Allow searching (only works when options are provided)\n      \ttype: Boolean,\n      \tdefault: false\n      },\n      limit: {\n        type: Number,\n        default: 1024\n      },\n      closeOnSelect: { // only works when multiple==false\n        type: Boolean,\n        default: false\n      }\n    },\n    ready(){\n      if(this.multiple){\n        this.value=[]\n      }\n    },\n    data() {\n      return {\n        searchText: null,\n        show: false,\n        showNotify: false\n      }\n    },\n    computed: {\n      selectedItems() {\n        if (!this.multiple)\n        {\n          if(!this.options.length) {\n            for (var c of this.$children) {\n              if (c.value == this.value) {\n                return c.$els.v.innerText\n              }\n            }\n          } else {\n            for(var i=0; i<this.options.length; i++) {\n              if(this.options[i].value === this.value) {\n                return this.options[i].label;\n              }\n            }\n          }\n          return \"\"\n        }\n        else\n        {\n          if (!this.options.length){\n\t\t\tvar r=[]\n            for(var c of this.$children){\n              if(this.value.indexOf(c.value)!==-1){\n                  r.push(c.$els.v.innerText)\n              }\n            }\n            return r.join(',');\n          }else{\n\t\t\t// we were given bunch of options, so pluck them out to display\n\t\t\tvar foundItems = [];\n            for (var item of this.options){\n            \tif (this.value.indexOf(item.value) !== -1)\n                \tfoundItems.push(item.label);\n\t\t\t}\n            return foundItems.join(', ');\n          }\n        }\n      },\n      showPlaceholder() {\n      \treturn this.multiple ? this.value.length <= 0 : (typeof this.value==='undefined' || this.value=='');\n      }\n    },\n    watch: {\n      value(val) {\n        let timeout\n        if (timeout) clearTimeout(timeout)\n        if (val.length > this.limit) {\n          this.showNotify = true\n          this.value.pop()\n          timeout = setTimeout(()=> this.showNotify = false, 1000)\n        }\n      }\n    },\n    methods: {\n      select(v) {\n        if(this.multiple!=false){\n          var index = this.value.indexOf(v);\n          if (index === -1) {\n            this.value.push(v);\n          }\n          else {\n            this.value.$remove(v)\n          }\n        }else{\n          this.value=v\n          if(this.closeOnSelect) {\n            this.toggleDropdown();\n          }\n        }\n\n      },\n      toggleDropdown() {\n        this.show = !this.show\n\n        return false\n      }\n    },\n\n    ready () {\n      let _this = this\n      $(document).click(function(e){\n          var target = $(e.target);\n\n          if (target.closest(\".btn-group\").length === 0) {\n              if ($('.btn-group').hasClass('open')) {\n                  _this.show = false\n              }\n          }\n      });\n    }\n  }\n</script>\n<style>\n.bs_searchbox {\n  padding: 4px 8px;\n}\n.btn-group .dropdown-menu .notify {\n  position: absolute;\n  bottom: 5px;\n  width: 96%;\n  margin: 0 2%;\n  min-height: 26px;\n  padding: 3px 5px;\n  background: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);\n   pointer-events: none;\n  opacity: .9;\n}\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(45);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getIterator2 = __webpack_require__(63);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(46);
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(47), __esModule: true };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	var $Object = __webpack_require__(39).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(49);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(58), 'Object', {defineProperty: __webpack_require__(54).f});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(50)
	  , core      = __webpack_require__(39)
	  , ctx       = __webpack_require__(51)
	  , hide      = __webpack_require__(53)
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
/* 50 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(52);
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
/* 52 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(54)
	  , createDesc = __webpack_require__(62);
	module.exports = __webpack_require__(58) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(55)
	  , IE8_DOM_DEFINE = __webpack_require__(57)
	  , toPrimitive    = __webpack_require__(61)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(58) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(56);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(58) && !__webpack_require__(59)(function(){
	  return Object.defineProperty(__webpack_require__(60)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(59)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(56)
	  , document = __webpack_require__(50).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(56);
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
/* 62 */
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	__webpack_require__(96);
	module.exports = __webpack_require__(98);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	var global        = __webpack_require__(50)
	  , hide          = __webpack_require__(53)
	  , Iterators     = __webpack_require__(69)
	  , TO_STRING_TAG = __webpack_require__(93)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(67)
	  , step             = __webpack_require__(68)
	  , Iterators        = __webpack_require__(69)
	  , toIObject        = __webpack_require__(70);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(74)(Array, 'Array', function(iterated, kind){
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
/* 67 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(71)
	  , defined = __webpack_require__(73);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(72);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(75)
	  , $export        = __webpack_require__(49)
	  , redefine       = __webpack_require__(76)
	  , hide           = __webpack_require__(53)
	  , has            = __webpack_require__(77)
	  , Iterators      = __webpack_require__(69)
	  , $iterCreate    = __webpack_require__(78)
	  , setToStringTag = __webpack_require__(92)
	  , getPrototypeOf = __webpack_require__(94)
	  , ITERATOR       = __webpack_require__(93)('iterator')
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
/* 75 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53);

/***/ },
/* 77 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(79)
	  , descriptor     = __webpack_require__(62)
	  , setToStringTag = __webpack_require__(92)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(53)(IteratorPrototype, __webpack_require__(93)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(55)
	  , dPs         = __webpack_require__(80)
	  , enumBugKeys = __webpack_require__(90)
	  , IE_PROTO    = __webpack_require__(87)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(60)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(91).appendChild(iframe);
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(54)
	  , anObject = __webpack_require__(55)
	  , getKeys  = __webpack_require__(81);
	
	module.exports = __webpack_require__(58) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(82)
	  , enumBugKeys = __webpack_require__(90);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(77)
	  , toIObject    = __webpack_require__(70)
	  , arrayIndexOf = __webpack_require__(83)(false)
	  , IE_PROTO     = __webpack_require__(87)('IE_PROTO');
	
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(70)
	  , toLength  = __webpack_require__(84)
	  , toIndex   = __webpack_require__(86);
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(85)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 85 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(85)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(88)('keys')
	  , uid    = __webpack_require__(89);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(50)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 89 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(50).document && document.documentElement;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(54).f
	  , has = __webpack_require__(77)
	  , TAG = __webpack_require__(93)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(88)('wks')
	  , uid        = __webpack_require__(89)
	  , Symbol     = __webpack_require__(50).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(77)
	  , toObject    = __webpack_require__(95)
	  , IE_PROTO    = __webpack_require__(87)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(73);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(97)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(74)(String, 'String', function(iterated){
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(85)
	  , defined   = __webpack_require__(73);
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(55)
	  , get      = __webpack_require__(99);
	module.exports = __webpack_require__(39).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(100)
	  , ITERATOR  = __webpack_require__(93)('iterator')
	  , Iterators = __webpack_require__(69);
	module.exports = __webpack_require__(39).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(72)
	  , TAG = __webpack_require__(93)('toStringTag')
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
/* 101 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"btn-group\" v-bind:class=\"{open:show}\">\n    <button v-el:btn type=\"button\" class=\"btn btn-default dropdown-toggle\" \n      @click=\"toggleDropdown\"\n      @blur=\"show = (search ? show:false)\"\n    >\n      <span class=\"placeholder\" v-show=\"showPlaceholder\">{{placeholder}}</span>\n      <span class=\"content\">{{ selectedItems }}</span>\n      <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu\">\n      <template v-if=\"options.length\">\n        <li v-if=\"search\" class=\"bs-searchbox\">\n          <input type=\"text\" placeholder=\"Search\" v-model=\"searchText\" class=\"form-control\" autocomplete=\"off\">\n        </li>\n        <li v-for=\"option in options | filterBy searchText \" v-bind:id=\"option.value\" style=\"position:relative\">\n          <a @mousedown.prevent=\"select(option.value)\" style=\"cursor:pointer\">\n            {{ option.label }}\n            <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"value.indexOf(option.value) !== -1\"></span>\n          </a>\n        </li>\n      </template>\n      <slot v-else></slot>\n      <div class=\"notify\" v-show=\"showNotify\" transition=\"fadein\">最多选择 ({{limit}} 个).</div>\n    </ul>\n  </div>\n";

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "\n    <div class=\"honor-assess clearfix\" _v-a95a8158=\"\">\n        <form class=\"form-horizontal\" _v-a95a8158=\"\">\n            <div class=\"form-group select-product\" _v-a95a8158=\"\">\n                <div class=\"product-wrap\" _v-a95a8158=\"\">\n                    <v-select :value.sync=\"product\" :options=\"products\" placeholder=\"请选择项目\" _v-a95a8158=\"\">\n                    </v-select>\n                </div>\n            </div>\n\n            <div class=\"form-group\" v-for=\"list in lists\" _v-a95a8158=\"\">\n                <label class=\"control-label col-sm-2\" v-text=\"list.name + ':'\" _v-a95a8158=\"\"></label>\n                <div class=\"col-sm-10\" _v-a95a8158=\"\">\n                    <radio-group :value.sync=\"list.active\" type=\"default\" _v-a95a8158=\"\">\n                        <radio v-for=\"choice in list.choices\" :value=\"choice.choice_id\" _v-a95a8158=\"\">{{ choice.label }}</radio>\n                    </radio-group>\n                </div>\n            </div>\n            <div class=\"form-group text-center\" v-if=\"lists.length\" _v-a95a8158=\"\">\n                <button type=\"button\" class=\"btn btn-success btn-box\" @click=\"confirmFn\" _v-a95a8158=\"\">提交</button>\n            </div>\n            <div class=\"assess-box\" v-if=\"showBox\" _v-a95a8158=\"\">\n                评价内容显示区\n            </div>\n        </form>\n    </div>\n";

/***/ }
]));
//# sourceMappingURL=2.build.js.map