import chai from 'chai';
import { jtl } from '../src/index.js';

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

    it('renders the html', function () {
        expect(jtl(json).toHtmlString())
            .eql(`<html lang="en"><head></head><body><div>first<span>second</span></div></body></html>`)
    });
});