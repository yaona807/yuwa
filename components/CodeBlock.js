import Yuwa from 'yuwa';

export function CodeBlock({ code, language }) {
    return {
        tagName: 'div',
        classList: ['code-block'],
        children: [
            {
                tagName: 'pre',
                children: [
                    {
                        tagName: 'code',
                        classList: [language],
                        textContent: code
                    }
                ]
            }
        ]
    };
} 