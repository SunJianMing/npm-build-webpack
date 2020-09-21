const webpack = require('webpack');
const path = require('path')
const rimraf = require('rimraf')
const Mocha = require('mocha')
const mocha = new Mocha({
    timeout:'10000'
})

process.chdir(path.join(__dirname,'./template'))

rimraf('./dist',function(){
    const prodConfig = require('../../lib/webpack.pro')
    webpack(prodConfig,(err,stats)=>{
        if(err){
            console.log(err)
            process.exit(2)
        }
        console.log(stats.toString({
            colors:true,
            modules:false,
            children:false
        }))
        mocha.addFile(path.join(__dirname,'./html-test.js'))
        mocha.run()
    })
})