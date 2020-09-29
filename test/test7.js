import chai from 'chai';
import { jtl } from '../src/index.js';
import Element from 'html-element';

const document = Element.document;
const expect = chai.expect;

describe('XSS attack does not work', function () {
    const json = {
        name: "div",
        children: [
            {
                name: "span",
                content: "<script>console.log('hello, world');</script>"
            }
        ]
    }

    const expectation = `<div><span></span></div>`;

    it('renders the html string', function () {
        expect(jtl(json).toHtmlString())
            .eql(expectation)
    });

    it('creates the HtmlElement', function () {
        expect(jtl(json, {}, document).toHtmlElement().outerHTML)
            .eql(expectation)
    });

    const unsafeExpectation = `<div><span></span></div>`;

    it('renders the unsafe html string', function () {
        expect(jtl(json, { veryUnsafe: true }).toHtmlString())
            .eql(unsafeExpectation)
    });

    it('creates the unsafe HtmlElement', function () {
        expect(jtl(json, { veryUnsafe: true }, document).toHtmlElement().outerHTML)
            .eql(unsafeExpectation)
    });
});