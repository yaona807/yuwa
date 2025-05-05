import Yuwa from '../../../lib/index.js';
import { Header } from './Header.js';
import { Section } from './Section.js';
import { CodeBlock } from './CodeBlock.js';
import { Note } from './Note.js';

function createFeatureItem({ text }) {
    return {
        tagName: 'li',
        textContent: text
    };
}

function createFeatures() {
    return {
        tagName: 'ul',
        children: [
            Yuwa.withProps(createFeatureItem, { text: 'シンプルなAPI' }),
            Yuwa.withProps(createFeatureItem, { text: '軽量な実装' }),
            Yuwa.withProps(createFeatureItem, { text: 'モジュール化された設計' }),
            Yuwa.withProps(createFeatureItem, { text: 'イベントシステム' })
        ]
    };
}

function createInstallation() {
    return {
        tagName: 'div',
        children: [
            {
                tagName: 'p',
                textContent: 'GitHubからインストール:'
            },
            Yuwa.withProps(CodeBlock, { 
                code: `# npmを使用する場合
npm install github:yaona807/yuwa

# yarnを使用する場合
yarn add github:yaona807/yuwa

# pnpmを使用する場合
pnpm add github:yaona807/yuwa`, 
                language: 'bash' 
            }),
            {
                tagName: 'p',
                textContent: 'または、リポジトリをクローンして使用することもできます:'
            },
            Yuwa.withProps(CodeBlock, { 
                code: `git clone https://github.com/yaona807/yuwa.git
cd yuwa
npm install`, 
                language: 'bash' 
            })
        ]
    };
}

function createApiReference() {
    return {
        tagName: 'div',
        children: [
            {
                tagName: 'h3',
                textContent: 'render'
            },
            Yuwa.withProps(CodeBlock, {
                code: `import Yuwa from 'yuwa';

// シンプルな要素のレンダリング
const element = {
    tagName: 'div',
    textContent: 'Hello World'
};
Yuwa.render([element]);

// 複数の要素をレンダリング
const elements = [
    {
        tagName: 'h1',
        textContent: 'Title'
    },
    {
        tagName: 'p',
        textContent: 'Content'
    }
];
Yuwa.render(elements);

// コンポーネントのレンダリング
function Component() {
    return {
        tagName: 'div',
        children: [
            {
                tagName: 'p',
                textContent: 'Component Content'
            }
        ]
    };
}
Yuwa.render([Component]);`,
                language: 'javascript'
            }),
            {
                tagName: 'h3',
                textContent: 'withProps'
            },
            Yuwa.withProps(CodeBlock, {
                code: `import Yuwa from 'yuwa';

// シンプルなコンポーネント
function Greeting({ name }) {
    return {
        tagName: 'p',
        textContent: \`Hello, \${name}!\`
    };
}

// Propsを渡してコンポーネントを作成
const greeting = Yuwa.withProps(Greeting, { name: 'World' });
Yuwa.render([greeting]);

// 複数のPropsを持つコンポーネント
function UserCard({ name, age, email }) {
    return {
        tagName: 'div',
        classList: ['user-card'],
        children: [
            {
                tagName: 'h3',
                textContent: name
            },
            {
                tagName: 'p',
                textContent: \`Age: \${age}\`
            },
            {
                tagName: 'p',
                textContent: \`Email: \${email}\`
            }
        ]
    };
}

const userCard = Yuwa.withProps(UserCard, {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
});
Yuwa.render([userCard]);`,
                language: 'javascript'
            }),
            {
                tagName: 'h3',
                textContent: 'emit'
            },
            Yuwa.withProps(CodeBlock, {
                code: `import Yuwa from 'yuwa';

// イベントの発火
Yuwa.emit('userLogin', { userId: 123, username: 'john' });

// 複数のデータを持つイベント
Yuwa.emit('formSubmit', {
    formId: 'contact',
    data: {
        name: 'John',
        email: 'john@example.com',
        message: 'Hello!'
    }
});

// コンポーネント内でのイベント発火と受け取り
function Button({ text }) {
    return {
        tagName: 'button',
        textContent: text,
        on: {
            click: () => {
                Yuwa.emit('buttonClicked', { text });
            }
        }
    };
}

// イベントを使用したコンポーネント間の通信
function ParentComponent() {
    const element = {
        tagName: 'div',
        children: [
            Yuwa.withProps(Button, { text: 'Click me' }),
            {
                tagName: 'p',
                textContent: 'Child component events will be logged here'
            }
        ],
        componentEvents: {
            buttonClicked: (data) => {
                element.children[1].textContent = \`Button clicked: \${data.text}\`;
                element.update();
            }
        }
    };

    return element;
}

Yuwa.render([ParentComponent]);`,
                language: 'javascript'
            })
        ]
    };
}

function createNotes() {
    return {
        tagName: 'div',
        children: [
            Yuwa.withProps(Note, { 
                content: 'このフレームワークは現在開発中です。' 
            })
        ]
    };
}

export function Documentation() {
    return {
        tagName: 'div',
        classList: ['documentation'],
        children: [
            Header,
            Yuwa.withProps(Section, { 
                title: 'はじめに', 
                content: [{
                    tagName: 'p',
                    textContent: 'yuwa.jsは、シンプルで軽量なUIフレームワークです。'
                }]
            }),
            Yuwa.withProps(Section, { 
                title: '特徴', 
                content: [createFeatures]
            }),
            Yuwa.withProps(Section, { 
                title: 'インストール', 
                content: [createInstallation]
            }),
            Yuwa.withProps(Section, { 
                title: 'APIリファレンス', 
                content: [createApiReference]
            }),
            Yuwa.withProps(Section, { 
                title: '注意事項', 
                content: [createNotes]
            })
        ]
    };
} 