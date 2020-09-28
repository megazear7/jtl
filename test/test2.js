import chai from 'chai';
import { jtl } from '../src/index.js';

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

    it('renders the html', function () {
        expect(jtl(json).toHtmlString())
            .eql(`<html lang="en"><head></head><body></br></body></html>`)
    });
});