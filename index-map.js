'use strict';

/**
 * Index map proxy options.
 * @typedef {Object} IndexMapProxyOptions
 * @property {string} [separator="/"] A string used to separate the parent path from the current path in the resulting String.
 * @property {string} [path="__path"] The path property name.
 */

/**
 * Proxies the index map dictionary.
 * @template T
 * @param {T} dictionary The dictionary to be proxilized.
 * @param  {IndexMapProxyOptions} options The index map proxy options.
 * @returns {T} The proxied dictionary.
 */
function indexMap(dictionary, { separator = '/', path = '__path' } = {}) {
    /**
     * Join de path parts if exsists
     * @param {Array} parts Path parts to be joined
     * @returns {string|undefined} The path string if had more than one part
     */
    function joinPath(parts) {
        return parts.length === 0 ? undefined : parts.join(separator);
    }

    /**
     * Gets the dictionary proxy handler
     * @param {string} [parentPath] A string to prefix the current path and value.
     * @returns {ProxyHandler} The handler for the dictionary proxy.
     */
    function getProxyHandler(parentPath) {
        return {
            get(target, key) {
                const pathParts = [];
                if (typeof parentPath === 'string') {
                    pathParts.push(parentPath);
                }
                const currentPath = target[path];
                if (typeof currentPath === 'string') {
                    pathParts.push(currentPath);
                }
                const currentValue = target[key];
                if (typeof currentValue === 'string') {
                    pathParts.push(currentValue);
                    const fullPath = joinPath(pathParts);
                    return fullPath;
                }
                if (typeof currentValue === 'object' && currentValue !== null) {
                    const fullPath = joinPath(pathParts);
                    return new Proxy(currentValue, getProxyHandler(fullPath));
                }
                return currentValue;
            },
        };
    }
    return new Proxy(dictionary, getProxyHandler());
}

module.exports = indexMap;
