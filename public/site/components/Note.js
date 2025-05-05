import Yuwa from '../lib/yuwa.js';

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