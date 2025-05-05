import Yuwa from 'yuwa';

export function Section({ title, content }) {
    return {
        tagName: 'div',
        classList: ['section'],
        children: [
            {
                tagName: 'h2',
                textContent: title
            },
            {
                tagName: 'div',
                children: content
            }
        ]
    };
} 