let mode = require('../src/add.js')
let assert = require('assert');
describe('add', function () {
    it('should take less than 500ms', function (done) {
        assert.equal(mod.add(3,4),7)
   });
})