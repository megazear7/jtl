import chai from 'chai';
import { jtl } from '../src/index.js';

const expect = chai.expect;

describe('simple hello world', function () {
const json = {
    name: "html",
    attr: {
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

  it('renders the html', function () {
    expect(jtl(json).toHtmlString())
    .eql(`<html lang="en"><head></head><body><h1>Hello, World!</h1></body>`)
  });
});