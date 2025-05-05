import Yuwa from 'yuwa';

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