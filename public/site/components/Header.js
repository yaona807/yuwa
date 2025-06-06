import Yuwa from '../lib/yuwa.js';

export function Header() {
    return {
        tagName: 'header',
        classList: ['header'],
        children: [
            {
                tagName: 'h1',
                textContent: 'yuwa.js'
            },
            {
                tagName: 'p',
                classList: ['description'],
                textContent: 'シンプルで軽量なUIフレームワーク'
            }
        ]
    };
} 