import Yuwa from '../lib/yuwa.js';

function createTableHeader({ headers }) {
    return {
        tagName: 'tr',
        children: headers.map(header => ({
            tagName: 'th',
            textContent: header
        }))
    };
}

function createTableBody({ rows }) {
    return {
        tagName: 'tbody',
        children: rows.map(row => ({
            tagName: 'tr',
            children: row.map(cell => ({
                tagName: 'td',
                textContent: cell
            }))
        }))
    };
}

export function Table({ headers, rows }) {
    return {
        tagName: 'table',
        classList: ['table'],
        children: [
            {
                tagName: 'thead',
                children: [Yuwa.withProps(createTableHeader, { headers })]
            },
            Yuwa.withProps(createTableBody, { rows })
        ]
    };
} 