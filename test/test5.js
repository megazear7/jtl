import chai from 'chai';
import { jtl } from '../src/index.js';
import Element from 'html-element';

const document = Element.document;
const expect = chai.expect;

describe('Content with child elements', function () {
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
                        children: [
                            { content: "beginning" },
                            {
                                name: "span",
                                content: "element 1"
                            },
                            { content: "middle" },
                            {
                                name: "span",
                                content: "element 2"
                            },
                            { content: "end" },
                        ]
                    }
                ]
            }
        ]
    }

    const expectation = `<html lang="en"><head></head><body><div>beginning<span>element 1</span>middle<span>element 2</span>end</div></body></html>`;

    it('renders the html string', function () {
        expect(jtl(json).toHtmlString())
            .eql(expectation)
    });

    it('creates the HtmlElement', function () {
        expect(jtl(json, {}, document).toHtmlElement().outerHTML)
            .eql(expectation)
    });

    const unsafeExpectation = `<html lang="en"><head></head><body><div>beginning<span>element 1</span>middle<span>element 2</span>end</div></body></html>`;

    it('renders the unsafe html string', function () {
        expect(jtl(json, { veryUnsafe: true }).toHtmlString())
            .eql(unsafeExpectation)
    });

    it('creates the unsafe HtmlElement', function () {
        expect(jtl(json, { veryUnsafe: true }, document).toHtmlElement().outerHTML)
            .eql(unsafeExpectation)
    });
});