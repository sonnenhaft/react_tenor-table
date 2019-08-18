import React from 'react';
import style from 'styled-components';

const Table = style.table`
    font-family: sans-serif;
    border-collapse: collapse;
    & th,
    & td {
        padding: 4px;
        border: 1px solid grey;
        min-width: 75px;
        max-width: 75px;
        
        white-space: nowrap;
        overflow: hidden;
    }
    & td[contenteditable]:hover {
        outline-color: #4D90FE; 
        outline-offset: -2px;
        outline-style: auto;
        outline-width: 5px;
    }
    & th {
        background: black;
        color: white;
        text-align: center;
    }
    & td {
        text-align: right;
    }
`;

const getData = (C, D, F, G) => {
    const E = D * C * 5 / 1000;
    const H = G + C / 10000;
    const I = (H - G) * 10000;
    const J = I * D;
    const K = C * 25;
    const L = K + J;

    return { E, H, I, J, K, L };
};


function getValues() {
    const map = { D: 1, W: 7, M: 30, Y: 365 };

    return `1D 1000
1W 1200
1M 1400
3M 1600
6M 1800
1Y -1600
2Y -1400
5Y 1600
10Y 1800
20Y 2000
20Y 2200`.split('\n').map((item, idx) => {
        const [A, risk] = item.split(' ');
        const [number, prefix] = A.replace(/([0-9]+)(.*)/g, '$1_$2').split('_');
        const B = number * map[prefix];
        const C = Math.round(Math.random() * 100) - 50;
        const D = Number(risk);
        const F = D * (1 + C * 5 / 1000);
        const G = 0.05 + 0.003 * idx;

        const { E, H, I, J, K, L } = getData(C, D, F, G);
        return { A, B, C, D, E, F, G, H, I, J, K, L }
    });
}

const splitDigits = n => n.toLocaleString();
const addEconomicalNegativeBrackets = n => n > 0 ? splitDigits(n) :
    <span style={{ color: 'red' }}>({splitDigits(-n)})</span>;
const round2Digits = n => (Math.round(n * 100) / 100).toFixed(2);
const showAsPercent = n => round2Digits(n * 100) + '%';
const simpleAndBrackets = n => addEconomicalNegativeBrackets(Math.round(n));
const tenorStyle = { background: 'black', color: 'white', fontWeight: 'bold', textAlign: 'center' };
const meta = [
    { key: 'A', label: 'Tenor', format: n => n, total: 'Total', style: tenorStyle },
    { key: 'B', label: 'Sort label', format: n => n, total: ' ' },
    { key: 'C', label: 'Random', format: n => n, total: ' ' },
    { key: 'D', label: 'Risk', format: splitDigits },
    { key: 'E', label: 'NB Risk', format: addEconomicalNegativeBrackets, style: { background: '#ffe598' } },
    { key: 'F', label: 'Live Risk', format: addEconomicalNegativeBrackets, editable: true },
    { key: 'G', label: 'Close(%)', format: showAsPercent, total: 'avg' },
    { key: 'H', label: 'Live(%)', format: showAsPercent, total: 'avg' },
    { key: 'I', label: 'Move(BP)', format: round2Digits, total: 'avg' },
    { key: 'J', label: 'Live PL', format: simpleAndBrackets, style: { background: '#f7caac' } },
    { key: 'K', label: 'NB PL', format: simpleAndBrackets, style: { background: '#f7caac' } },
    { key: 'L', label: 'PL', format: simpleAndBrackets, style: { background: '#ffe598' } },
];

export class TenorTable extends React.Component {
    state = { values: getValues() };

    componentWillMount() {
        this.interval = setInterval(() => {
            this.setState({ values: getValues() })
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    editNumberFromContentEditable = item => (e) => {
        const text = e.target.innerText;

        // may be we can catch some unnecessary values here,
        // but in general better to parse user's data, rather than to show "error data"
        const n = Number(text.replace(/[^0-9]+/g, ''));

        const F = isNaN(n) ? 0 : text.includes('(') ? -n : n;
        const C = Math.round((F / item.D - 1) / 5 * 1000);
        const { E, H, I, J, K, L } = getData(C, item.D, F, item.G);

        // in this size of sources it is fine to mutate here,
        // in bigger up, most of time, would be better to extract
        // this action somewhere
        Object.assign(item, { C, E, H, I, J, K, L, tempTotalF: F });
        this.forceUpdate();
    };

    render() {
        return <Table>
            <tr>{meta.map(({ key, label }) => <th key={key}>{label}</th>)}</tr>

            {this.state.values.map((item, index) => <tr key={index}>
                {meta.map(({ format, key, style, editable }) => {
                    // I agree that content editable here is not the best choice, but suddenly, during dev,
                    // I liked how it looks and performs and how much code require
                    return editable
                        ? <td style={{ ...style, cursor: 'pencil', background: '#dadada' }} key={key} contentEditable
                              onInput={this.editNumberFromContentEditable(item)}>
                            {format(item[key])}
                        </td>
                        : <td style={style} key={key}>{format(item[key])}</td>
                })}
            </tr>)}
            <tr>{meta.map(({ total, format, key }) => {
                return <th key={key}>{total && total !== 'avg' ? total : format(this.state.values
                    .reduce((sum, item) => {
                        return sum + (item.hasOwnProperty('tempTotal' + key) ? item['tempTotal' + key] : item[key])
                    }, 0) / (total === 'avg' ? this.state.values.length : 1))}</th>
            })}</tr>
        </Table>;
    }
}