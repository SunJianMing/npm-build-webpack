import React from 'react'
import ReactDom from 'react-dom'
import './index.less'
function App(){
    return <h1 className='about'>About</h1>
}

ReactDom.render(<App/>,document.querySelector('#root'))