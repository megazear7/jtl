import chai from 'chai';
import { jtl } from '../src/index.js';
import Element from 'html-element';

const document = Element.document;
const expect = chai.expect;

describe('Partial html document', function () {
    const json = {
        name: "div",
        children: [
            {
                name: "span",
                content: "hello"
            }
        ]
    }

    it('renders the html string', function () {
        expect(jtl(json).toHtmlString())
            .eql(`<div><span>hello</span></div>`)
    });

    it('creates the HtmlElement', function () {
        expect(jtl(json, document).toHtmlElement().outerHTML)
            .eql(`<div><span>hello</span></div>`)
    });
});