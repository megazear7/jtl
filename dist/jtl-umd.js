function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jtl = {}));
})(this, function (exports) {
  'use strict';

  function jtl(json) {
    return new JTL(json);
  }

  var SELF_CLOSING_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

  var JTL = /*#__PURE__*/function () {
    function JTL(json) {
      _classCallCheck(this, JTL);

      if (_typeof(json) !== 'object') {
        throw new Error('The first parameter of the JTL constructor must be a object');
      }

      this.json = json;
    }

    _createClass(JTL, [{
      key: "toHtmlString",
      value: function toHtmlString() {
        if (this.json === undefined) {
          throw new Error('the toHtmlString method of the JTL object was called without any json configuration.');
        }

        return this._buildElement(this.json);
      }
    }, {
      key: "_buildElement",
      value: function _buildElement(json) {
        var _this = this;

        var htmlStringArr = [];

        if (SELF_CLOSING_TAGS.includes(json.name)) {
          htmlStringArr.push(this._buildElementCloseTag(json));
        } else {
          htmlStringArr.push(this._buildElementOpenTag(json));

          if (json.content) {
            htmlStringArr.push(json.content);
          }

          if (json.children) {
            json.children.forEach(function (child) {
              return htmlStringArr.push(_this._buildElement(child));
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
        if (json.attrs) {
          return ' ' + Object.keys(json.attrs).map(function (key) {
            return "".concat(key, "=\"").concat(json.attrs[key], "\"");
          }).join(' ');
        } else {
          return '';
        }
      }
    }]);

    return JTL;
  }();

  exports.jtl = jtl;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
