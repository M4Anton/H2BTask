export const debounce = (fun, wait) => {
    let timeout;

    return function execFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            fun(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
};
