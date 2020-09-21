// //mocha 测试
// const globAll = require('glob-all')
// describe('Checking generated css files',()=>{
//     it('should generated css files',(done)=>{
//         const files = globAll.sync([
//             './dist/js/about_*.js',
//             './dist/css/about_*.css',
//             './dist/js/home_*.js',
//             './dist/css'
//         ])
//         if(files.length>0){
//             done()
//         }else{
//             throw new Error('no css files generated')
//         }
//     })
// })
const glob = require('glob-all')

describe('checking generated js css files',()=>{
    it('should generated css js files',(done)=>{
        const files = glob.sync([
            './dist/css/about_*.css',
            './dist/css/home_*.css',
            './dist/js/about_*.js',
            './dist/js/home_*.js',
            './dist/js/vendors_*.js'
        ])
        if(files.length == 5){
            done()
        }else{
            throw new Error('no css js generated files')
        }
    })
})