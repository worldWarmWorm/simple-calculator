class Cookies {
    /**
     * 
     * @param {*} name - ключ куки
     * @returns 
     */
    get(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /**
     * 
     * @param {*} name - ключ куки
     * @param {*} value - значение куки
     * @param {*} options - настройки куки
     */
    set(name, value, options) {
        options = {
            path: '/'
        };
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        let updateCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        for (let optionKey in options) {
            updateCookie += `; ${optionKey}`;
            let optionValue = options[optionKey];
            if (optionValue != true) {
                updateCookie += `= ${optionValue}`;
            }
        }
        document.cookie = updateCookie;
    }

    /**
     * 
     * @param {*} name - ключ куки
     */
    unset(name) {
        this.set(name, '', { 'max-age': -1 });
    }
}

export default Cookies;