import chai from 'chai';
import { jtl } from '../src/index.js';
import Element from 'html-element';

const document = Element.document;
const expect = chai.expect;

describe('self closing tag test', function () {
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
                    { name: "br" }
                ]
            }
        ]
    }

    const expectation = `<html lang="en"><head></head><body><br></body></html>`;

    it('renders the html', function () {
        expect(jtl(json).toHtmlString())
            .eql(expectation)
    });

    it('creates the HtmlElement', function () {
        expect(jtl(json, document).toHtmlElement().outerHTML)
            .eql(expectation)
    });
});