function createDom(tag_data) {
    const elem = document.createElement(tag_data.tag_name);

    Object.keys(tag_data).forEach(key => {
        if (!tag_data[key]) {
            return;
        }

        switch(key) {
            case 'class_list':
                tag_data[key].forEach(class_name => {
                    elem.classList.add(class_name);
                });
                break;
            case 'style':
                Object.assign(elem.style, tag_data[key]);
                break;
            case 'on':
                Object.keys(tag_data[key]).forEach(event_name => {
                    elem.addEventListener(event_name, tag_data[key][event_name]);
                });
                break;
            case 'children':
                tag_data[key].forEach(child => {
                    elem.appendChild(createDom(child));
                });
                break;
            default:
                elem[key] = tag_data[key];
                break;
        };
    });

    // 更新用関数を追加
    tag_data.update = function() {
        const parent = elem.parentElement;
        parent.insertBefore(createDom(tag_data), elem);
        elem.remove();
    }

    return elem;
}

export function render(tag_data_list) {
    document.body.appendChild(createDom({
        id: 'root',
        tag_name: 'div',
        children: tag_data_list
    }));
}