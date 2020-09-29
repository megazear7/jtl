import chai from 'chai';
import { jtl } from '../src/index.js';

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

    it('renders the html', function () {
        expect(jtl(json).toHtmlString())
            .eql(`<html lang="en"><head></head><body><div>firstbeginning<span>element 1</span>middle<span>element 2</span>end</div></body></html>`)
    });
});