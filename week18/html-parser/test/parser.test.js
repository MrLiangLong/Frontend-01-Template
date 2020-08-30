import {parseHTML} from '../src/parser.js'
let assert = require('assert');

it('parse a single element',()=>{
    let doc = parseHTML('<div></div>');
    let div = doc.children[0];
    assert.equal(div.tagName,'div');
    assert.equal(div.children.length,0);
    assert.equal(div.type,"element");
    assert.equal(div.attributes.length,2);
})

it('parse a single element with content',()=>{
    let doc = parseHTML('<div>text</div>');
    let div = doc.children[0].children[0];
    console.log(div)
    assert.equal(div.type,"text");
    assert.equal(div.content,'t');
})
