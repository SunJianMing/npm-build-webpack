const glob = require('glob-all')

describe('checking generated html files',()=>{
    it('should generated html files',done=>{
        const files = glob.sync([
            './dist/home.html',
            './dist/about.html'
        ])
        if(files.length ==2) done()
        else throw new Error('no generated html files')
    })
})