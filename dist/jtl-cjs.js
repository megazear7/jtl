'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function jtl(json) {
    return new JTL(json);
}

const SELF_CLOSING_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

class JTL {
    constructor(json) {
        if (typeof json !== 'object') {
            throw new Error('The first parameter of the JTL constructor must be a object');
        }

        this.json = json;
    }

    toHtmlString() {
        if (this.json === undefined) {
            throw new Error('the toHtmlString method of the JTL object was called without any json configuration.')
        }

        return this._buildElement(this.json);
    }

    _buildElement(json) {
        let htmlStringArr = [];

        if (SELF_CLOSING_TAGS.includes(json.name)) {
            htmlStringArr.push(this._buildElementCloseTag(json));
        } else {
            htmlStringArr.push(this._buildElementOpenTag(json));

            if (json.content) {
                htmlStringArr.push(json.content);
            }

            if (json.children) {
                json.children.forEach(child => htmlStringArr.push(this._buildElement(child)));
            }

            htmlStringArr.push(this._buildElementCloseTag(json));
        }

        return htmlStringArr.join('');
    }

    _buildElementOpenTag(json) {
        return `<${json.name}${this._buildElementAttrs(json)}>`;
    }

    _buildElementCloseTag(json) {
        return `</${json.name}>`;
    }

    _buildElementAttrs(json) {
        if (json.attrs) {
            return ' ' + Object.keys(json.attrs).map(key => `${key}="${json.attrs[key]}"`).join(' ');
        } else {
            return '';
        }
    }
}

exports.jtl = jtl;
