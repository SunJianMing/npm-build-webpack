const assert = require('assert')
describe('webpack.base.js test case',()=>{
    const baseConfig = require('../../lib/webpack.base')
    console.log(baseConfig)
    it('entry',()=>{
        assert.equal(baseConfig.entry.home,'/Users/sunjianming/Desktop/github/webpack/mr_b_w/test/smoke/template/src/views/home/index.js')
        // assert.equal(baseConfig.entry.about,'/Users/sunjianming/Desktop/github/webpack/mr_b_w/test/smoke/template/src/views/about/index.js')
    })
})