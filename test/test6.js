import chai from 'chai';
import { jtl } from '../src/index.js';

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

    it('renders the html', function () {
        expect(jtl(json).toHtmlString())
            .eql(`<div><span>hello</span></div>`)
    });
});