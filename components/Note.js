import Yuwa from '../../lib/index.js';

export function Note({ content }) {
    return {
        tagName: 'div',
        classList: ['note'],
        children: [
            {
                tagName: 'p',
                textContent: content
            }
        ]
    };
} 