const assert = require('assert')
describe('webpack.base.js test case',()=>{
    const baseConfig = require('../../lib/webpack.base')
    it('entry',()=>{
        assert.equal(baseConfig.entry.home.indexOf('test/smoke/template/src/views/home/index.js')>-1,true)
        assert.equal(baseConfig.entry.about.indexOf('test/smoke/template/src/views/about/index.js')>-1,true)
    })
})