class Yuwa {
    /**
     * DOM要素を作成する関数
     * 
     * @param {Object|Function} tagData - タグの設定情報またはタグを生成する関数
     * @param {string} tagData.tagName - 作成する要素のタグ名
     * @param {string[]} [tagData.classList] - 要素に追加するクラス名の配列
     * @param {Object} [tagData.style] - 要素に適用するスタイル
     * @param {Object} [tagData.on] - イベントリスナーを設定するオブジェクト
     * @param {Object} [tagData.componentEvent] - コンポーネントイベントを設定するオブジェクト
     * @param {Array} [tagData.children] - 子要素の配列
     * @returns {HTMLElement|null} 作成されたDOM要素
     */
    #createElement(tagData) {
        // 関数が渡された場合は実行して結果を取得
        let original = null;
        if (typeof tagData === 'function') {
            original = tagData;
            tagData = tagData();
        }

        // nullまたはundefinedの場合は早期リターン
        if (tagData === null || tagData === undefined) {
            return null;
        }

        // 必須パラメータのチェック
        if (!tagData.tagName) {
            console.error('tagName is required');
            return null;
        }

        const elem = document.createElement(tagData.tagName);

        // プロパティを処理
        Object.entries(tagData).forEach(([key, value]) => {
            if (!value) {
                return;
            }

            switch (key) {
                case 'tagName':
                    // tagNameは読み取り専用なのでスキップ
                    break;
                case 'classList':
                    value.forEach(className => elem.classList.add(className));
                    break;
                case 'style':
                    Object.assign(elem.style, value);
                    break;
                case 'on':
                    Object.entries(value).forEach(([event, handler]) => elem.addEventListener(event, handler));
                    break;
                case 'componentEvents':
                    if (!elem._componentEvents) {
                        elem._componentEvents = {};
                    }
                    Object.entries(value).forEach(([event, handler]) => {
                        elem._componentEvents[event] = handler;
                    });
                    break;
                case 'children':
                    value.forEach(child => {
                        if (!child) {
                            return;
                        }
                        const dom = this.#createElement(child);
                        if (dom) {
                            elem.appendChild(dom);
                        }
                    });
                    break;
                default:
                    const descriptor = Object.getOwnPropertyDescriptor(elem, key);
                    if (descriptor) {
                        if (descriptor.set) {
                            descriptor.set.call(elem, value);
                        }
                    } else {
                        elem[key] = value;
                    }
            }
        });

        // 更新用関数を追加（要素の再レンダリングを可能にする）
        tagData.update = function() {
            const parent = elem.parentElement;
            if (!parent) {
                console.warn('Element has no parent, cannot update');
                return;
            }

            if (original) {
                // 元の関数がある場合はそれを実行して新しい要素を作成
                const dom = this.#createElement(original);
                if (dom) {
                    parent.insertBefore(dom, elem);
                }
            } else {
                // 元の関数がない場合は現在のタグデータから新しい要素を作成
                parent.insertBefore(this.#createElement(tagData), elem);
            }

            elem.remove();
        }

        return elem;
    }

    /**
     * 指定されたタグデータのリストをDOMにレンダリングする
     * 
     * @param {Array} tagDataList - レンダリングするタグデータの配列
     * @returns {void}
     */
    render(tagDataList) {
        if (!Array.isArray(tagDataList)) {
            console.error('tagDataList must be an array');
            return;
        }

        // 既存のルート要素があれば削除
        const existingRoot = document.querySelector('#root');
        if (existingRoot) {
            existingRoot.remove();
        }

        // ルート要素を作成してbodyに追加
        document.body.appendChild(this.#createElement({
            id: 'root',
            tagName: 'div',
            children: tagDataList
        }));
    }

    /**
     * コンポーネントにプロパティを付与する関数
     * 
     * @param {Function} component - タグデータを生成する関数
     * @param {...any} props - コンポーネントに渡すプロパティ
     * @returns {Function} プロパティ付きのコンポーネント関数
     */
    withProps(component, ...props) {
        return function() {
            return component(...props);
        }
    }

    /**
     * カスタムイベントを発火させる関数
     * 
     * @param {string} eventName - 発火させるイベント名
     * @param {...any} args - イベントハンドラーに渡す引数
     * @returns {void}
     */
    emit(eventName, ...args) {
        if (typeof eventName !== 'string') {
            console.error('eventName must be a string');
            return;
        }

        const root = document.querySelector('#root');
        if (!root) {
            console.warn('Root element not found');
            return;
        }

        // ルート要素の子要素を幅優先探索で走査
        Array.from(root.children).forEach(child => {
            const targets = [child];

            while (targets.length > 0) {
                const target = targets.shift();

                // コンポーネントイベントハンドラーが設定されている場合は実行
                if (target._componentEvents && typeof target._componentEvents[eventName] === 'function') {
                    target._componentEvents[eventName](...args);
                }

                // 子要素を探索キューに追加
                targets.push(...Array.from(target.children));
            }
        });
    }
}

export default new Yuwa();