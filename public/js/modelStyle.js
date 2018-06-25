const styleRepo = (function () {
    "use strict";

    const storageOfStyle = styleStorage.getAll();

    //fill if empty
    if (storageOfStyle.length === 0) {

        storageOfStyle.push({value: "dark-layout", name: "Style 1", default: true});
        storageOfStyle.push({value: "light-layout", name: "Style 2", default: false});
        styleStorage.persist(storageOfStyle);
    }

    function changeDefaultStyle(defaultValue) {
        let list = storageOfStyle;
        for (let i = 0; i < list.length; ++i) {
            if (list[i].value == defaultValue) {
                list[i].default = true;
            } else {
                list[i].default = false;
            }
        }
        styleStorage.persist(storageOfStyle);
    }

    function getAllStyleValues() {
        let list = storageOfStyle;

        return list.map(x => x.value)
    }

    function getDefault() {
        let list = storageOfStyle;
        for (let i = 0; i < list.length; ++i) {
            if (list[i].default) {
                return list[i]
            }
        }
        return null;
    }

    function getStorage() {
        return storageOfStyle;
    }

    return {getStorage, changeDefaultStyle, getDefault, getAllStyleValues};
})();




