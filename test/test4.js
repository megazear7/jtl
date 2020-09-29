import chai from 'chai';
import { jtl } from '../src/index.js';
import Element from 'html-element';

const document = Element.document;
const expect = chai.expect;

describe('Interspersed content with child elements', function () {
    const json = {
        name: "html",
        attrs: {
            "lang": "en"
        },
        children: [
            { name: "head" },
            {
                name: "body",
                children: [
                    {
                        name: "div",
                        content: "first",
                        children: [
                            {
                                name: "span",
                                content: "second"
                            }
                        ]
                    }
                ]
            }
        ]
    }

    const expectation = `<html lang="en"><head></head><body><div>first<span>second</span></div></body></html>`;

    it('renders the html string', function () {
        expect(jtl(json).toHtmlString())
            .eql(expectation)
    });

    it('creates the HtmlElement', function () {
        expect(jtl(json, document).toHtmlElement().outerHTML)
            .eql(expectation)
    });
});