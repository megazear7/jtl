import chai from 'chai';
import { jtl } from '../src/index.js';
import Element from 'html-element';

const document = Element.document;
const expect = chai.expect;

describe('simple hello world', function () {
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
                    { name: "h1", content: "Hello, World!" }
                ]
            }
        ]
    }

    const expectation = `<html lang="en"><head></head><body><h1>Hello, World!</h1></body></html>`;

    it('renders the html', function () {
        expect(jtl(json).toHtmlString())
            .eql(expectation)
    });

    it('creates the HtmlElement', function () {
        expect(jtl(json, {}, document).toHtmlElement().outerHTML)
            .eql(expectation)
    });

    const unsafeExpectation = `<html lang="en"><head></head><body><h1>Hello, World!</h1></body></html>`;

    it('renders the unsafe html string', function () {
        expect(jtl(json, { veryUnsafe: true }).toHtmlString())
            .eql(unsafeExpectation)
    });

    it('creates the unsafe HtmlElement', function () {
        expect(jtl(json, { veryUnsafe: true }, document).toHtmlElement().outerHTML)
            .eql(unsafeExpectation)
    });
});