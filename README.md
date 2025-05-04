# yuwa.js

シンプルで軽量なUIフレームワーク

## 特徴

- シンプルなAPI
- 軽量な実装
- モジュール化された設計
- イベントシステム

## インストール

```bash
# npmを使用する場合
npm install github:yaona807/yuwa

# yarnを使用する場合
yarn add github:yaona807/yuwa

# pnpmを使用する場合
pnpm add github:yaona807/yuwa
```

または、リポジトリをクローンして使用することもできます：

```bash
git clone https://github.com/yaona807/yuwa.git
cd yuwa
npm install
```

## APIリファレンス

### render

```javascript
import Yuwa from 'yuwa';

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
Yuwa.render([Component]);
```

### withProps

```javascript
import Yuwa from 'yuwa';

// シンプルなコンポーネント
function Greeting({ name }) {
    return {
        tagName: 'p',
        textContent: `Hello, ${name}!`
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
                textContent: `Age: ${age}`
            },
            {
                tagName: 'p',
                textContent: `Email: ${email}`
            }
        ]
    };
}

const userCard = Yuwa.withProps(UserCard, {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
});
Yuwa.render([userCard]);
```

### emit

```javascript
import Yuwa from 'yuwa';

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
                element.children[1].textContent = `Button clicked: ${data.text}`;
                element.update();
            }
        }
    };

    return element;
}

Yuwa.render([ParentComponent]);
```

## 注意事項

このフレームワークは現在開発中です。 