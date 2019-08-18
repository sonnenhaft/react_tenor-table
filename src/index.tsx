import { createElement } from 'react'
import { render } from 'react-dom'
import { TenorTable } from './TenorTable'

render(
    createElement(TenorTable),
    document.getElementById('root')
)