function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jtl = {}));
})(this, function (exports) {
  'use strict';

  var SELF_CLOSING_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  var UNSAFE_TAGS = ['script'];

  function jtl(json, options, document) {
    return new JTL(json, options, document);
  }

  var JTL = /*#__PURE__*/function () {
    function JTL(json) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$veryUnsafe = _ref.veryUnsafe,
          veryUnsafe = _ref$veryUnsafe === void 0 ? false : _ref$veryUnsafe;

      var document = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, JTL);

      if (_typeof(json) !== 'object') {
        throw new JtlError('The first parameter of the JTL constructor must be a object');
      }

      this.json = json;
      this.veryUnsafe = veryUnsafe;

      if (document) {
        this.document = document;
      } else if (typeof window !== 'undefined' && window.document) {
        this.document = window.document;
      } else {
        this.document = undefined;
      }
    }

    _createClass(JTL, [{
      key: "toHtmlString",
      value: function toHtmlString() {
        return new JTLStringBuilder(this.json, {
          veryUnsafe: this.veryUnsafe
        }).buildElement();
      }
    }, {
      key: "toHtmlElement",
      value: function toHtmlElement() {
        if (!this.document) {
          throw new JtlError('window.document is undefined and no document was passed into the jtl method. If you are running this in Node.JS then you will need to pass in a window.document shim into the second parameter of the jtl method.');
        }

        return new JTLElementBuilder(this.json, {
          veryUnsafe: this.veryUnsafe
        }, this.document).buildElement();
      }
    }]);

    return JTL;
  }();

  var JTLStringBuilder = /*#__PURE__*/function () {
    function JTLStringBuilder(json) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$veryUnsafe = _ref2.veryUnsafe,
          veryUnsafe = _ref2$veryUnsafe === void 0 ? false : _ref2$veryUnsafe;

      _classCallCheck(this, JTLStringBuilder);

      this.json = json;
      this.veryUnsafe = veryUnsafe;
    }

    _createClass(JTLStringBuilder, [{
      key: "buildElement",
      value: function buildElement() {
        return this._buildElement(this.json);
      }
    }, {
      key: "_buildNode",
      value: function _buildNode(json) {
        if (json.name) {
          return this._buildElement(json);
        } else {
          if (!json.content) {
            throw new JtlFormatError('A node must either have a name or content property or both.');
          }

          return removeTags(json.content);
        }
      }
    }, {
      key: "_buildElement",
      value: function _buildElement(json) {
        var _this = this;

        if (UNSAFE_TAGS.includes(json.name) && !this.veryUnsafe) {
          return '';
        }

        var htmlStringArr = [];

        if (typeof json.name !== 'string') {
          throw new JtlError('_buildElement called without json.name being a string, it was: ' + json.name);
        }

        if (SELF_CLOSING_TAGS.includes(json.name)) {
          htmlStringArr.push(this._buildElementOpenTag(json));
        } else {
          htmlStringArr.push(this._buildElementOpenTag(json));

          if (json.content) {
            if (typeof json.content !== 'string') {
              throw new JtlFormatError('Content propery of an element must be a string.');
            }

            htmlStringArr.push(removeTags(json.content));
          }

          if (json.children) {
            if (!Array.isArray(json.children)) {
              throw new JtlFormatError('Child property must be an array of objects');
            }

            json.children.forEach(function (child) {
              var node = _this._buildNode(child);

              if (node) {
                htmlStringArr.push(node);
              }
            });
          }

          htmlStringArr.push(this._buildElementCloseTag(json));
        }

        return htmlStringArr.join('');
      }
    }, {
      key: "_buildElementOpenTag",
      value: function _buildElementOpenTag(json) {
        return "<".concat(json.name).concat(this._buildElementAttrs(json), ">");
      }
    }, {
      key: "_buildElementCloseTag",
      value: function _buildElementCloseTag(json) {
        return "</".concat(json.name, ">");
      }
    }, {
      key: "_buildElementAttrs",
      value: function _buildElementAttrs(json) {
        var _this2 = this;

        if (json.attrs) {
          return ' ' + Object.keys(json.attrs).map(function (key) {
            if (typeof json.attrs[key] !== 'string') {
              throw new JtlFormatError('All properties of the "attrs" property must by strings.');
            }

            if (!key.startsWith('on') || _this2.veryUnsafe) {
              return "".concat(key, "=\"").concat(json.attrs[key], "\"");
            } else {
              return '';
            }
          }).filter(function (str) {
            return str;
          }).join(' ');
        } else {
          return '';
        }
      }
    }]);

    return JTLStringBuilder;
  }();

  var JTLElementBuilder = /*#__PURE__*/function () {
    function JTLElementBuilder(json) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$veryUnsafe = _ref3.veryUnsafe,
          veryUnsafe = _ref3$veryUnsafe === void 0 ? false : _ref3$veryUnsafe;

      var document = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, JTLElementBuilder);

      this.json = json;
      this.veryUnsafe = veryUnsafe;
      this.document = document;
    }

    _createClass(JTLElementBuilder, [{
      key: "buildElement",
      value: function buildElement() {
        return this._buildElement(this.json);
      }
    }, {
      key: "_buildNode",
      value: function _buildNode(json) {
        if (json.name) {
          return this._buildElement(json);
        } else {
          if (!json.content) {
            throw new JtlFormatError('A node must either have a name or content property or both.');
          }

          return this.document.createTextNode(removeTags(json.content));
        }
      }
    }, {
      key: "_buildElement",
      value: function _buildElement(json) {
        var _this3 = this;

        if (UNSAFE_TAGS.includes(json.name) && !this.veryUnsafe) {
          return undefined;
        }

        var element = this.document.createElement(json.name);

        if (json.attrs) {
          if (_typeof(json.attrs) !== 'object') {
            throw new JtlFormatError('"attrs" propery of an element must be an array.');
          }

          Object.keys(json.attrs).forEach(function (key) {
            if (typeof json.attrs[key] !== 'string') {
              throw new JtlFormatError('All properties of the "attrs" property must by strings.');
            }

            if (!key.startsWith('on') || _this3.veryUnsafe) {
              element.setAttribute(key, json.attrs[key]);
            }
          });
        }

        if (!SELF_CLOSING_TAGS.includes(json.name)) {
          if (json.content) {
            if (typeof json.content !== 'string') {
              throw new JtlFormatError('"content" propery of an element must be a string.');
            }

            element.appendChild(this.document.createTextNode(removeTags(json.content)));
          }

          if (json.children) {
            if (!Array.isArray(json.children)) {
              throw new JtlFormatError('"children" property must be an array of objects');
            }

            json.children.forEach(function (child) {
              var node = _this3._buildNode(child);

              if (node) {
                element.appendChild(node);
              }
            });
          }
        }

        return element;
      }
    }]);

    return JTLElementBuilder;
  }();

  var JtlError = /*#__PURE__*/function (_Error) {
    _inherits(JtlError, _Error);

    var _super = _createSuper(JtlError);

    function JtlError(message) {
      var _this4;

      _classCallCheck(this, JtlError);

      _this4 = _super.call(this, message);
      _this4.name = "JtlError";
      return _this4;
    }

    return JtlError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var JtlFormatError = /*#__PURE__*/function (_JtlError) {
    _inherits(JtlFormatError, _JtlError);

    var _super2 = _createSuper(JtlFormatError);

    function JtlFormatError(message) {
      var _this5;

      _classCallCheck(this, JtlFormatError);

      _this5 = _super2.call(this, message);
      _this5.name = "JtlFormatError";
      return _this5;
    }

    return JtlFormatError;
  }(JtlError);

  var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
  var tagOrComment = new RegExp('<(?:' // Comment body.
  + '!--(?:(?:-*[^->])*--+|-?)' // Special "raw text" elements whose content should be elided.
  + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*' + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*' // Regular name
  + '|/?[a-z]' + tagBody + ')>', 'gi');

  function removeTags(html) {
    var oldHtml;

    do {
      oldHtml = html;
      html = html.replace(tagOrComment, '');
    } while (html !== oldHtml);

    return html.replace(/</g, '&lt;');
  }

  exports.jtl = jtl;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
