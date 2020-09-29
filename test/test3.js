import chai from 'chai';
import { jtl } from '../src/index.js';

const expect = chai.expect;

describe('List test', function () {
    const json = {
        name: "html",
        attrs: {
            "lang": "en"
        },
        children: [
            {
                name: "head",
                children: [
                    {
                        name: "style",
                        content: ".list { background: #934; }"
                    }, {
                        name: "script",
                        content: "console.log('Hello, World!');"
                    }
                ]
            }, {
                name: "body",
                children: [
                    {
                        name: "ul",
                        attrs: { class: "list" },
                        children: [
                            {
                                name: "li",
                                attrs: { class: "list-child" },
                                children: [
                                    {
                                        name: "a",
                                        attrs: { href: "www.google.com" },
                                        content: "First link"
                                    }
                                ]
                            }, {
                                name: "li",
                                attrs: { class: "list-child" },
                                children: [
                                    {
                                        name: "a",
                                        attrs: { href: "www.google.com" },
                                        content: "Second link"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    it('renders the html', function () {
        expect(jtl(json).toHtmlString())
            .eql(`<html lang="en"><head><style>.list { background: #934; }</style><script>console.log('Hello, World!');</script></head><body><ul class="list"><li class="list-child"><a href="www.google.com">First link</a></li><li class="list-child"><a href="www.google.com">Second link</a></li></ul></body></html>`)
    });
});