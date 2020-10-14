const SELF_CLOSING_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
const UNSAFE_TAGS = ['script'];

function jtl(json, options, document) {
    return new JTL(json, options, document);
}

class JTL {
    constructor(json, { veryUnsafe = false } = {}, document) {
        if (typeof json !== 'object') {
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

    toHtmlString() {
        return new JTLStringBuilder(this.json, { veryUnsafe: this.veryUnsafe }).buildElement();
    }

    toHtmlElement() {
        if (!this.document) {
            throw new JtlError('window.document is undefined and no document was passed into the jtl method. If you are running this in Node.JS then you will need to pass in a window.document shim into the second parameter of the jtl method.');
        }

        return new JTLElementBuilder(this.json, { veryUnsafe: this.veryUnsafe }, this.document).buildElement();
    }
}

class JTLStringBuilder {
    constructor(json, { veryUnsafe = false } = {}) {
        this.json = json;
        this.veryUnsafe = veryUnsafe;
    }

    buildElement() {
        return this._buildElement(this.json);
    }

    _buildNode(json) {
        if (json.name) {
            return this._buildElement(json);
        } else {
            if (!json.content) {
                throw new JtlFormatError('A node must either have a name or content property or both.');
            }

            return removeTags(json.content);
        }
    }

    _buildElement(json) {
        if (UNSAFE_TAGS.includes(json.name) && !this.veryUnsafe) {
            return '';
        }

        let htmlStringArr = [];

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

                json.children.forEach(child => {
                    let node = this._buildNode(child);

                    if (node) {
                        htmlStringArr.push(node);
                    }
                });
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
            return ' ' + Object.keys(json.attrs).map(key => {
                if (typeof json.attrs[key] !== 'string') {
                    throw new JtlFormatError('All properties of the "attrs" property must by strings.');
                }

                if ((!key.startsWith('on')) || this.veryUnsafe) {
                    return `${key}="${json.attrs[key]}"`;
                } else {
                    return '';
                }
            }).filter(str => str).join(' ');
        } else {
            return '';
        }
    }
}

class JTLElementBuilder {
    constructor(json, { veryUnsafe = false } = {}, document) {
        this.json = json;
        this.veryUnsafe = veryUnsafe;
        this.document = document;
    }

    buildElement() {
        return this._buildElement(this.json);
    }

    _buildNode(json) {
        if (json.name) {
            return this._buildElement(json);
        } else {
            if (!json.content) {
                throw new JtlFormatError('A node must either have a name or content property or both.');
            }

            return this.document.createTextNode(removeTags(json.content));
        }
    }

    _buildElement(json) {
        if (UNSAFE_TAGS.includes(json.name) && !this.veryUnsafe) {
            return undefined;
        }

        let element = this.document.createElement(json.name);

        if (json.attrs) {
            if (typeof json.attrs !== 'object') {
                throw new JtlFormatError('"attrs" propery of an element must be an array.');
            }

            Object.keys(json.attrs).forEach(key => {
                if (typeof json.attrs[key] !== 'string') {
                    throw new JtlFormatError('All properties of the "attrs" property must by strings.');
                }

                if ((!key.startsWith('on')) || this.veryUnsafe) {
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

                json.children.forEach(child => {
                    let node = this._buildNode(child);

                    if (node) {
                        element.appendChild(node);
                    }
                });
            }
        }

        return element;
    }
}

class JtlError extends Error {
    constructor(message) {
        super(message);
        this.name = "JtlError";
    }
}

class JtlFormatError extends JtlError {
    constructor(message) {
        super(message);
        this.name = "JtlFormatError";
    }
}

let tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

let tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');

function removeTags(html) {
    let oldHtml;
    do {
        oldHtml = html;
        html = html.replace(tagOrComment, '');
    } while (html !== oldHtml);
    return html.replace(/</g, '&lt;');
}

export { jtl };
